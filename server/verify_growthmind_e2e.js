// server/verify_growthmind_e2e.js
import http from 'http';

const BASE_URL = 'http://localhost:5000';

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    let payload = null;
    if (body) {
      payload = JSON.stringify(body);
      options.headers['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, body: parsed, raw: data });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body: null, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (payload) req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('🚀 RUNNING COMPLETE GROWTHMIND E2E TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Single URL & Health Check
    console.log('--- 1. SINGLE URL & HEALTH VERIFICATION ---');
    const rootRes = await request('GET', '/');
    assert(rootRes.status === 200 && rootRes.raw.includes('<!DOCTYPE html>'), 'Single URL (http://localhost:5000) serves client index.html (Status 200)');
    
    const healthRes = await request('GET', '/api/health');
    assert(healthRes.status === 200 && healthRes.body.status === 'ONLINE', 'Health endpoint /api/health responds status: ONLINE');

    // 2. Demo Switcher Endpoint
    console.log('\n--- 2. DEMO PERSONAS & SWITCHER VERIFICATION ---');
    const personasRes = await request('GET', '/api/demo/personas');
    assert(personasRes.status === 200 && personasRes.body.personas.length >= 6, `Demo personas endpoint returns ${personasRes.body.personas?.length} pre-configured personas`);

    const switchRes = await request('POST', '/api/demo/switch', { personaId: 'usr-tharun' });
    assert(switchRes.status === 200 && switchRes.body.token, '1-Click Demo Switcher returns authenticated token for Tharun');

    // 3. Demo Persona: Tharun (Late Bloomer)
    console.log('\n--- 3. DEMO PERSONA: THARUN (LATE BLOOMER) ---');
    const tharunAuth = await request('POST', '/api/auth/login', { email: 'tharun.growth@mind.edu', password: 'password123' });
    assert(tharunAuth.status === 200 && tharunAuth.body.token, 'Tharun logs in successfully with JWT');
    const tharunToken = tharunAuth.body.token;

    const tharunDash = await request('GET', '/api/student/dashboard', null, tharunToken);
    assert(tharunDash.status === 200, 'Tharun fetches student dashboard');
    const studentData = tharunDash.body.student;
    assert(studentData.fingerprint.classification.includes('Late Bloomer'), `Tharun pattern type classified as Late Bloomer (${studentData.fingerprint?.classification})`);
    assert(studentData.lateBloomerRoadmap && studentData.lateBloomerRoadmap.steps.length === 5, `Tharun has 5-step Late Bloomer Recovery Roadmap (${studentData.lateBloomerRoadmap.steps.length} steps)`);
    assert(studentData.notToStudy && studentData.notToStudy.targetTopic, `Tharun has "What Should I NOT Study Now?" blocker active (Target: ${studentData.notToStudy?.targetTopic})`);
    assert(studentData.mistakeAnalysis && studentData.mistakeAnalysis.mistakesList.length > 0, `Tharun has Mistake Log Analysis active (${studentData.mistakeAnalysis.mistakesList[0]?.topic}: ${studentData.mistakeAnalysis.mistakesList[0]?.frequency} errors)`);
    assert(studentData.scoreExplanation && studentData.scoreExplanation.reasons.length > 0, `Tharun has Score Change Explainer active (${studentData.scoreExplanation.reasons.length} causal factors identified)`);

    // 4. Demo Persona: Aadhya (Top Performer)
    console.log('\n--- 4. DEMO PERSONA: AADHYA (TOP PERFORMER) ---');
    const aadhyaAuth = await request('POST', '/api/auth/login', { email: 'aadhya.top@mind.edu', password: 'password123' });
    assert(aadhyaAuth.status === 200, 'Aadhya logs in successfully');
    const aadhyaDash = await request('GET', '/api/student/dashboard', null, aadhyaAuth.body.token);
    assert(aadhyaDash.body.student.fingerprint.classification.includes('Top Performer'), `Aadhya classified as Top Performer (${aadhyaDash.body.student.fingerprint?.classification})`);
    assert(aadhyaDash.body.student.topPerformerRoadmap && aadhyaDash.body.student.topPerformerRoadmap.categories.length > 0, `Aadhya receives Beyond-the-Syllabus Advanced Tracks (${aadhyaDash.body.student.topPerformerRoadmap.categories.length} categories)`);

    // 5. Demo Persona: Prof. Sharma (Faculty)
    console.log('\n--- 5. DEMO PERSONA: PROF. SHARMA (FACULTY) ---');
    const facultyAuth = await request('POST', '/api/auth/login', { email: 'sharma.faculty@mind.edu', password: 'password123' });
    assert(facultyAuth.status === 200 && facultyAuth.body.user.role === 'FACULTY', 'Faculty logs in with FACULTY role');
    const facultyDash = await request('GET', '/api/faculty/dashboard', null, facultyAuth.body.token);
    assert(facultyDash.status === 200, 'Faculty fetches dashboard');
    const facultyData = facultyDash.body.faculty;
    assert(facultyData.growthComparison && facultyData.growthComparison.length >= 4, `Faculty views student cohort matrix (${facultyData.growthComparison.length} students tracked)`);
    
    // Check that Tharun is in Faculty Matrix with high growth
    const tharunInFaculty = facultyData.growthComparison.find(s => s.name === 'Tharun' || s.studentId === 'usr-tharun');
    assert(tharunInFaculty && tharunInFaculty.growthMomentum >= 15, `Tharun flagged with high growth momentum (+${tharunInFaculty?.growthMomentum}%) in Faculty matrix`);

    // 6. Test Case 1: Fresh Student Registration & Onboarding Drill
    console.log('\n--- 6. TEST CASE 1: FRESH REGISTRATION & ONBOARDING ---');
    const freshEmail = `kavya.test.${Date.now()}@mind.edu`;
    const regRes = await request('POST', '/api/auth/register', {
      name: 'Kavya S',
      email: freshEmail,
      password: 'Password123!',
      confirmPassword: 'Password123!',
      role: 'STUDENT',
      department: 'Computer Science & Engineering',
      year: 'Year 2',
      semester: 'Semester 3'
    });
    assert(regRes.status === 201 && regRes.body.token, 'New student registers successfully');
    const freshToken = regRes.body.token;
    assert(regRes.body.user.isOnboarded === false, 'Fresh student isOnboarded is false initially');

    // Submit Onboarding Diagnostic
    const onboardRes = await request('POST', '/api/onboarding/complete', {
      department: 'Computer Science & Engineering',
      year: 'Year 2',
      semester: 'Semester 3',
      subjects: ['Data Structures', 'C Programming'],
      goals: 'Master Algorithms & Systems Architecture',
      diagnosticAnswers: [0, 2, 1] // simulated answers
    }, freshToken);

    assert(onboardRes.status === 200 && onboardRes.body.profile.isOnboarded === true, 'Diagnostic submitted & onboarding marked completed');
    assert(onboardRes.body.fingerprint && onboardRes.body.fingerprint.growthScore > 0, `Fresh student gets real calculated Growth Score (${onboardRes.body.fingerprint?.growthScore})`);

    // Verify Fresh Student Dashboard
    const freshDash = await request('GET', '/api/student/dashboard', null, freshToken);
    assert(freshDash.status === 200, 'Fresh student accesses personal dashboard');
    assert(freshDash.body.student.name === 'Kavya S', 'Dashboard correctly identifies Kavya S');

    // 7. Interactive Assessment & Dynamic Learning Path
    console.log('\n--- 7. INTERACTIVE QUIZ & DYNAMIC PATH UPDATE ---');
    const asmListRes = await request('GET', '/api/assessments', null, freshToken);
    assert(asmListRes.status === 200 && asmListRes.body.assessments.length > 0, `Assessment library retrieved (${asmListRes.body.assessments?.length} drills available)`);

    const targetAsm = asmListRes.body.assessments.find(a => a.id === 'asm-func') || asmListRes.body.assessments[0];
    const asmDetail = await request('GET', `/api/assessments/${targetAsm.id}`, null, freshToken);
    assert(asmDetail.status === 200 && asmDetail.body.assessment.questions.length > 0, `Retrieved questions for ${targetAsm.title}`);

    // Submit quiz with 100% correct answers (for asm-func: q-func-1: 1, q-func-2: 1, q-func-3: 0)
    const quizSubmission = {
      answers: [
        { questionId: 'q-func-1', selectedIndex: 1 },
        { questionId: 'q-func-2', selectedIndex: 1 },
        { questionId: 'q-func-3', selectedIndex: 0 }
      ]
    };
    const submitRes = await request('POST', `/api/assessments/${targetAsm.id}/submit`, quizSubmission, freshToken);
    assert(submitRes.status === 200 && submitRes.body.quizResult.scorePercent === 100, `Quiz submitted successfully (Score: ${submitRes.body.quizResult?.scorePercent}%, XP: +${submitRes.body.quizResult?.xpEarned})`);
    assert(submitRes.body.dynamicPathMessage.includes('Learning Path'), 'Dynamic Learning Path recalculation triggered');

    // 8. Test Isolation: Student 1 vs Student 2 Data
    console.log('\n--- 8. TEST STUDENT 1 VS STUDENT 2 ISOLATION ---');
    const freshEmail2 = `nikhil.test.${Date.now()}@mind.edu`;
    const regRes2 = await request('POST', '/api/auth/register', {
      name: 'Nikhil R',
      email: freshEmail2,
      password: 'Password123!',
      confirmPassword: 'Password123!',
      role: 'STUDENT',
      department: 'Electrical Engineering',
      year: 'Year 3'
    });
    const freshToken2 = regRes2.body.token;
    const student2Dash = await request('GET', '/api/student/dashboard', null, freshToken2);
    
    assert(freshDash.body.student.id !== student2Dash.body.student.id, 'Student 1 ID is distinct from Student 2 ID');
    assert(freshDash.body.student.name !== student2Dash.body.student.name, 'Student 1 Name is distinct from Student 2 Name');
    assert(freshDash.body.student.currentScore !== student2Dash.body.student.currentScore, 'Student 1 score is distinct from Student 2 score');

    // 9. Goals CRUD Operations
    console.log('\n--- 9. STUDENT GOALS CRUD OPERATIONS ---');
    const newGoal = await request('POST', '/api/student/goals', {
      description: 'Master Binary Search Trees and Graph Traversals',
      target: 'Score ≥85% in Advanced DSA Drill',
      duePeriod: '14 Days'
    }, freshToken);
    assert(newGoal.status === 201 && newGoal.body.goal.description.includes('Binary Search Trees'), 'Goal created successfully');

    const updatedGoal = await request('PUT', `/api/student/goals/${newGoal.body.goal.id}`, {
      progress: 75,
      status: 'In Progress'
    }, freshToken);
    assert(updatedGoal.status === 200 && updatedGoal.body.goal.progress === 75, 'Goal progress updated to 75%');

    // 10. AI Mentor Chat
    console.log('\n--- 10. AI MENTOR CHAT ENGINE ---');
    const mentorRes = await request('POST', '/api/mentor/chat', {
      message: 'Why was Recursion locked in my roadmap and how can I fix it?'
    }, tharunToken);
    assert(mentorRes.status === 200 && mentorRes.body.reply.length > 20, `AI Mentor responded intelligently: "${mentorRes.body.reply.substring(0, 75)}..."`);

    // 11. Admin Dashboard
    console.log('\n--- 11. ADMIN DASHBOARD VERIFICATION ---');
    const adminAuth = await request('POST', '/api/auth/login', { email: 'admin@growthmind.edu', password: 'admin123' });
    assert(adminAuth.status === 200 && adminAuth.body.user.role === 'ADMIN', 'Admin logs in with ADMIN role');
    const adminDash = await request('GET', '/api/admin/overview', null, adminAuth.body.token);
    assert(adminDash.status === 200 && adminDash.body.overview.totalUsers > 5, `Admin fetches overview metrics (${adminDash.body.overview.totalUsers} users tracked)`);

    // 12. Security Protection (Unauthorized access check)
    console.log('\n--- 12. SECURITY / 401 VERIFICATION ---');
    const unauthRes = await request('GET', '/api/student/dashboard');
    assert(unauthRes.status === 401, 'Unauthenticated access to /api/student/dashboard returns 401 Unauthorized');

    console.log('\n====================================================');
    console.log(`🏁 TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
    console.log('====================================================');

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  }
}

runTests();
