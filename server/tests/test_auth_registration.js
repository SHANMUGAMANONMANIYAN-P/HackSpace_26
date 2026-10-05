// server/tests/test_auth_registration.js
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
          resolve({ status: res.statusCode, body: parsed, raw: data });
        } catch (e) {
          resolve({ status: res.statusCode, body: null, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (payload) req.write(payload);
    req.end();
  });
}

async function testRegistrationSuite() {
  console.log('🧪 Running Account Creation & Authentication Stress Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, desc) {
    if (condition) {
      console.log(`  ✅ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${desc}`);
      failed++;
    }
  }

  // 1. Missing fields
  const r1 = await request('POST', '/api/auth/register', { name: '', email: '', password: '' });
  assert(r1.status === 400, 'Registration with empty fields returns 400 Bad Request');

  // 2. Short password
  const r2 = await request('POST', '/api/auth/register', { name: 'Test User', email: 'test@mind.edu', password: '123' });
  assert(r2.status === 400 && r2.body.message.includes('6 characters'), 'Password < 6 chars returns 400 with helpful message');

  // 3. Password mismatch
  const r3 = await request('POST', '/api/auth/register', { name: 'Test User', email: 'test@mind.edu', password: 'password123', confirmPassword: 'password999' });
  assert(r3.status === 400 && r3.body.message.includes('do not match'), 'Password mismatch returns 400 with mismatch message');

  // 4. Duplicate email check
  const duplicateEmail = 'tharun.growth@mind.edu';
  const r4 = await request('POST', '/api/auth/register', { name: 'Fake Tharun', email: duplicateEmail, password: 'password123', confirmPassword: 'password123' });
  assert(r4.status === 409 && r4.body.message.includes('already exists'), 'Duplicate email registration returns 409 Conflict');

  // 5. Successful fresh registration
  const uniqueEmail = `growth.student.${Date.now()}@university.edu`;
  const r5 = await request('POST', '/api/auth/register', {
    name: 'Ananya Ramesh',
    email: uniqueEmail,
    password: 'password123',
    confirmPassword: 'password123',
    department: 'Artificial Intelligence & Data Science',
    year: 'Year 2',
    semester: 'Semester 3',
    role: 'STUDENT'
  });
  assert(r5.status === 201 && r5.body.token, 'Fresh student account created successfully with JWT token');
  assert(r5.body.user.name === 'Ananya Ramesh', 'User object returns correct student name');
  assert(r5.body.user.isOnboarded === false, 'Fresh student isOnboarded flag is false (ready for diagnostic flow)');

  // 6. Login with new account
  const r6 = await request('POST', '/api/auth/login', { email: uniqueEmail, password: 'password123' });
  assert(r6.status === 200 && r6.body.token, 'Newly registered student logs in with password verification');

  // 7. Forgot password
  const r7 = await request('POST', '/api/auth/forgot-password', { email: uniqueEmail });
  assert(r7.status === 200 && r7.body.success, 'Forgot password triggers recovery feedback');

  // 8. Profile Update
  const r8 = await request('PUT', '/api/auth/profile', {
    department: 'Artificial Intelligence & Data Science',
    year: 'Year 2',
    semester: 'Semester 4',
    goals: 'Crack Tier 1 AI Engineer Internship',
    interests: ['Machine Learning', 'Python', 'Data Structures']
  }, r6.body.token);
  assert(r8.status === 200 && r8.body.success, 'Profile details updated successfully');

  console.log(`\n🏁 Registration Test Summary: ${passed} Passed | ${failed} Failed`);
  process.exit(failed > 0 ? 1 : 0);
}

testRegistrationSuite();
