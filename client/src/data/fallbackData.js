// client/src/data/fallbackData.js
export const INITIAL_STUDENTS = [
  {
    id: 'student-tharun',
    name: 'Tharun',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    email: 'tharun.growth@mind.edu',
    role: 'student',
    age: 20,
    educationLevel: 'Undergraduate',
    department: 'Computer Science & Engineering',
    semester: 'Year 2 / Semester 4',
    learningGoals: 'Master Data Structures and crack Tier-1 Tech Internships',
    currentSkillLevel: 'Intermediate Foundations',
    currentScore: 75,
    streakDays: 7,
    learningHours: 24.5,
    topicsCompletedCount: 14,
    assessmentsCompletedCount: 18,
    totalXP: 2450,
    currentLevel: '💪 Improving',
    levelProgress: 68,
    challengeHandling: 72,
    growthScore: 78,
    momentumPercentage: 28,
    growthFactors: {
      performance: 75,
      improvementRate: 93,
      consistency: 50,
      topicMastery: 61,
      practiceActivity: 70
    },
    fingerprint: {
      classification: 'Late Bloomer',
      title: 'Late Bloomer – High Growth Potential',
      subtitle: 'Strong Upward Velocity ↑',
      badgeColor: 'emerald',
      growthCategory: 'late_bloomer',
      explanation: 'You may not have started at the top, but your consistent improvement (+28%) proves exceptional resilience and high growth potential.',
      radarMetrics: [
        { subject: 'Current Performance', value: 75, fullMark: 100 },
        { subject: 'Improvement Rate', value: 93, fullMark: 100 },
        { subject: 'Consistency', value: 70, fullMark: 100 },
        { subject: 'Mistake Control', value: 45, fullMark: 100 },
        { subject: 'Topic Mastery', value: 61, fullMark: 100 },
        { subject: 'Challenge Handling', value: 72, fullMark: 100 },
      ]
    },
    dailyMission: {
      id: 'mission-tharun-1',
      title: 'Master Parameter Passing in Functions',
      description: 'Complete 3 focused practice questions on Functions and review yesterday\'s Arrays topic.',
      estimatedTime: '20 mins',
      targetScore: '80%',
      xpReward: 150,
      topic: 'Functions',
      completed: false
    },
    tests: [
      { testName: 'Diagnostic 1', score: 40, date: '2026-08-10' },
      { testName: 'Unit Test 1', score: 48, date: '2026-08-25' },
      { testName: 'Midterm 1', score: 57, date: '2026-09-12' },
      { testName: 'Progress Test', score: 68, date: '2026-09-28' },
      { testName: 'Current Assessment', score: 75, date: '2026-10-04' }
    ],
    topics: [
      { id: 'top-func', name: 'Functions', mastery: 48, score: 48, attempts: 12, correct: 6, wrong: 6, priority: '🔴 High Priority', subject: 'C Programming', recommendedAction: 'Practice 5 parameter-passing questions' },
      { id: 'top-arr', name: 'Arrays', mastery: 52, score: 52, attempts: 14, correct: 8, wrong: 6, priority: '🔴 High Priority', subject: 'C Programming', recommendedAction: 'Solve 1D/2D array indexing exercises' },
      { id: 'top-str', name: 'Strings', mastery: 64, score: 64, attempts: 9, correct: 6, wrong: 3, priority: '🟡 Medium Priority', subject: 'C Programming', recommendedAction: 'Review null-termination rules' },
      { id: 'top-loop', name: 'Loops', mastery: 72, score: 72, attempts: 15, correct: 11, wrong: 4, priority: '🟡 Medium Priority', subject: 'C Programming', recommendedAction: 'Practice nested loop trace' },
      { id: 'top-var', name: 'Variables', mastery: 88, score: 88, attempts: 16, correct: 15, wrong: 1, priority: '🟢 Strong', subject: 'C Programming', recommendedAction: 'Mastered - ready for pointer mechanics' },
      { id: 'top-ptr', name: 'Pointers', mastery: 42, score: 42, attempts: 8, correct: 3, wrong: 5, priority: '🔴 High Priority', subject: 'C Programming', recommendedAction: 'Review address-of operator & dereferencing' }
    ],
    mistakes: [
      {
        id: 'mst-1',
        topic: 'Functions',
        errorPattern: 'Repeated mistake: Confusing pass-by-value with pass-by-reference in C.',
        frequency: 6,
        rootCause: 'Assuming modifying a local parameter mutates the original variable in caller.',
        sampleSnippet: 'void swap(int a, int b) { int t = a; a = b; b = t; }',
        recommendedPractice: 'Practice 5 parameter-passing problems before moving forward.'
      },
      {
        id: 'mst-2',
        topic: 'Loops',
        errorPattern: 'Nested loop variable shadowing / incorrect loop bounds.',
        frequency: 4,
        rootCause: 'Reusing counter variable or missing boundary decrement.',
        sampleSnippet: 'for(int i=0; i<N; i++) { for(int i=0; i<M; i++) ... }',
        recommendedPractice: 'Complete 3 nested matrix traversal exercises.'
      },
      {
        id: 'mst-3',
        topic: 'Arrays',
        errorPattern: 'Off-by-one indexing error accessing arr[N] on array of size N.',
        frequency: 5,
        rootCause: 'Index boundary confusion between 1-based size and 0-based index.',
        sampleSnippet: 'int arr[5]; arr[5] = 10; // Out of bounds!',
        recommendedPractice: 'Solve 4 array boundary check questions.'
      }
    ],
    badges: [
      { id: 'bdg-1', title: '7-Day Streak', icon: 'Flame', description: 'Maintained 7 consecutive active study days', unlocked: true },
      { id: 'bdg-2', title: 'Growth Rocket', icon: 'TrendingUp', description: 'Improved overall score by +25% in one semester', unlocked: true },
      { id: 'bdg-3', title: 'Variables Master', icon: 'CheckCircle2', description: 'Scored 88%+ in Variables & Types', unlocked: true },
      { id: 'bdg-4', title: 'Functions Crusher', icon: 'Target', description: 'Master Functions & Parameter Passing', unlocked: false }
    ],
    weeklyActivity: [
      { day: 'Mon', hours: 3.5, questions: 12 },
      { day: 'Tue', hours: 4.0, questions: 15 },
      { day: 'Wed', hours: 2.5, questions: 8 },
      { day: 'Thu', hours: 4.5, questions: 18 },
      { day: 'Fri', hours: 3.0, questions: 10 },
      { day: 'Sat', hours: 5.0, questions: 22 },
      { day: 'Sun', hours: 2.0, questions: 6 }
    ]
  },
  {
    id: 'student-aadhya',
    name: 'Aadhya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    email: 'aadhya.top@mind.edu',
    role: 'student',
    age: 21,
    educationLevel: 'Undergraduate',
    department: 'Computer Science & Engineering',
    semester: 'Year 3 / Semester 6',
    learningGoals: 'Publish a systems research paper and compete in international ACM-ICPC',
    currentSkillLevel: 'Expert High Performer',
    currentScore: 92,
    streakDays: 24,
    learningHours: 48.0,
    topicsCompletedCount: 32,
    assessmentsCompletedCount: 42,
    totalXP: 6850,
    currentLevel: '🏆 Expert',
    levelProgress: 94,
    challengeHandling: 96,
    growthScore: 95,
    momentumPercentage: 4,
    growthFactors: {
      performance: 92,
      improvementRate: 70,
      consistency: 100,
      topicMastery: 94,
      practiceActivity: 100
    },
    fingerprint: {
      classification: 'Top Performer',
      title: 'High Performer – Beyond Syllabus',
      subtitle: 'Elite Mastery & Innovation Ready',
      badgeColor: 'purple',
      growthCategory: 'topper',
      explanation: 'You have mastered the core syllabus with high accuracy. Ready for advanced research, real-world systems, and competitive challenges.',
      radarMetrics: [
        { subject: 'Current Performance', value: 92, fullMark: 100 },
        { subject: 'Improvement Rate', value: 75, fullMark: 100 },
        { subject: 'Consistency', value: 98, fullMark: 100 },
        { subject: 'Mistake Control', value: 92, fullMark: 100 },
        { subject: 'Topic Mastery', value: 94, fullMark: 100 },
        { subject: 'Challenge Handling', value: 96, fullMark: 100 },
      ]
    },
    dailyMission: {
      id: 'mission-aadhya-1',
      title: 'Advanced Graph Optimization & Dijkstra Heuristics',
      description: 'Solve one challenging dynamic graph problem and benchmark cache-locality performance.',
      estimatedTime: '45 mins',
      targetScore: '95%',
      xpReward: 300,
      topic: 'Advanced Graph Algorithms',
      completed: false
    },
    tests: [
      { testName: 'Diagnostic 1', score: 88, date: '2026-08-10' },
      { testName: 'Unit Test 1', score: 90, date: '2026-08-25' },
      { testName: 'Midterm 1', score: 91, date: '2026-09-12' },
      { testName: 'Progress Test', score: 92, date: '2026-09-28' },
      { testName: 'Current Assessment', score: 94, date: '2026-10-04' }
    ],
    topics: [
      { id: 'top-ds', name: 'Data Structures', mastery: 94, score: 94, attempts: 30, correct: 29, wrong: 1, priority: '🟢 Strong', subject: 'Advanced CS', recommendedAction: 'Unlocked: Build Route Optimization Project' },
      { id: 'top-algo', name: 'Algorithms', mastery: 92, score: 92, attempts: 28, correct: 26, wrong: 2, priority: '🟢 Strong', subject: 'Advanced CS', recommendedAction: 'Unlocked: Dynamic Programming Challenge' },
      { id: 'top-py', name: 'Python Basics', mastery: 96, score: 96, attempts: 25, correct: 25, wrong: 0, priority: '🟢 Strong', subject: 'AI Foundations', recommendedAction: 'Ready for Advanced AI & Transformer models' },
      { id: 'top-graph', name: 'Graph Theory', mastery: 89, score: 89, attempts: 22, correct: 20, wrong: 2, priority: '🟢 Strong', subject: 'Advanced CS', recommendedAction: 'Explore Tarjan SCC and Max Flow algorithms' },
      { id: 'top-sys', name: 'Systems & OS', mastery: 91, score: 91, attempts: 24, correct: 22, wrong: 2, priority: '🟢 Strong', subject: 'Systems', recommendedAction: 'Lock-free concurrency research' }
    ],
    mistakes: [
      {
        id: 'mst-a1',
        topic: 'Graph Theory',
        errorPattern: 'Edge case: Integer overflow on large Dijkstra cumulative weights.',
        frequency: 2,
        rootCause: 'Using 32-bit int instead of 64-bit int for large edge cost summations.',
        sampleSnippet: 'int dist = u.weight + edge.cost; // Potential overflow',
        recommendedPractice: 'Use long long / uint64_t and handle negative weight cycles with Bellman-Ford.'
      }
    ],
    badges: [
      { id: 'bdg-a1', title: '24-Day Streak', icon: 'Flame', description: 'Exceptional 24-day daily consistency', unlocked: true },
      { id: 'bdg-a2', title: 'Master of Graphs', icon: 'Award', description: 'Scored 92%+ in Graph Algorithms', unlocked: true },
      { id: 'bdg-a3', title: 'Hackathon Finalist', icon: 'Trophy', description: 'Qualified for National Hackathon', unlocked: true },
      { id: 'bdg-a4', title: 'Peer Mentor Star', icon: 'Star', description: 'Helped 12 junior peers in Foundation tracks', unlocked: true }
    ],
    weeklyActivity: [
      { day: 'Mon', hours: 7.0, questions: 35 },
      { day: 'Tue', hours: 6.5, questions: 28 },
      { day: 'Wed', hours: 8.0, questions: 40 },
      { day: 'Thu', hours: 7.5, questions: 32 },
      { day: 'Fri', hours: 6.0, questions: 25 },
      { day: 'Sat', hours: 9.0, questions: 45 },
      { day: 'Sun', hours: 4.0, questions: 18 }
    ]
  },
  {
    id: 'student-rohan',
    name: 'Rohan',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    email: 'rohan.dev@mind.edu',
    role: 'student',
    age: 20,
    educationLevel: 'Undergraduate',
    department: 'Information Technology',
    semester: 'Year 2 / Semester 3',
    learningGoals: 'Become a Full Stack Web Developer',
    currentSkillLevel: 'Developing Learner',
    currentScore: 61,
    streakDays: 4,
    learningHours: 16.0,
    topicsCompletedCount: 9,
    assessmentsCompletedCount: 11,
    totalXP: 1400,
    currentLevel: '📚 Foundation',
    levelProgress: 45,
    challengeHandling: 58,
    growthScore: 64,
    momentumPercentage: 12,
    growthFactors: {
      performance: 61,
      improvementRate: 50,
      consistency: 30,
      topicMastery: 56,
      practiceActivity: 45
    },
    fingerprint: {
      classification: 'Developing Learner',
      title: 'Developing Learner – Steady Growth',
      subtitle: 'Building core competencies',
      badgeColor: 'blue',
      growthCategory: 'developing',
      explanation: 'You are steadily developing foundational skills and demonstrating steady progress in web technologies.',
      radarMetrics: [
        { subject: 'Current Performance', value: 61, fullMark: 100 },
        { subject: 'Improvement Rate', value: 50, fullMark: 100 },
        { subject: 'Consistency', value: 40, fullMark: 100 },
        { subject: 'Mistake Control', value: 55, fullMark: 100 },
        { subject: 'Topic Mastery', value: 56, fullMark: 100 },
        { subject: 'Challenge Handling', value: 58, fullMark: 100 },
      ]
    },
    dailyMission: {
      id: 'mission-rohan-1',
      title: 'JavaScript DOM & Event Listeners Practice',
      description: 'Solve 4 interactive DOM manipulation problems and review scope.',
      estimatedTime: '25 mins',
      targetScore: '75%',
      xpReward: 120,
      topic: 'JavaScript Basics',
      completed: false
    },
    tests: [
      { testName: 'Diagnostic 1', score: 49, date: '2026-08-10' },
      { testName: 'Unit Test 1', score: 52, date: '2026-08-25' },
      { testName: 'Midterm 1', score: 55, date: '2026-09-12' },
      { testName: 'Progress Test', score: 58, date: '2026-09-28' },
      { testName: 'Current Assessment', score: 61, date: '2026-10-04' }
    ],
    topics: [
      { id: 'top-html', name: 'HTML & CSS Layouts', mastery: 78, score: 78, attempts: 10, correct: 8, wrong: 2, priority: '🟢 Strong', subject: 'Web Development', recommendedAction: 'Mastered flexbox & grid' },
      { id: 'top-js-dom', name: 'JavaScript DOM', mastery: 58, score: 58, attempts: 12, correct: 7, wrong: 5, priority: '🔴 High Priority', subject: 'Web Development', recommendedAction: 'Practice event propagation & bubbling' },
      { id: 'top-async', name: 'Async JS & Promises', mastery: 46, score: 46, attempts: 9, correct: 4, wrong: 5, priority: '🔴 High Priority', subject: 'Web Development', recommendedAction: 'Study Promise states and async/await syntax' },
      { id: 'top-sql', name: 'SQL Joins', mastery: 62, score: 62, attempts: 8, correct: 5, wrong: 3, priority: '🟡 Medium Priority', subject: 'Databases', recommendedAction: 'Review INNER vs LEFT OUTER joins' }
    ],
    mistakes: [
      {
        id: 'mst-r1',
        topic: 'Async JS & Promises',
        errorPattern: 'Uncaught Promise Rejection: Missing .catch() or try/catch around await.',
        frequency: 4,
        rootCause: 'Assuming network requests always resolve with HTTP 200.',
        sampleSnippet: 'const res = await fetch(url); const data = await res.json(); // No error handler',
        recommendedPractice: 'Add structured try/catch blocks and handle status >= 400.'
      }
    ],
    badges: [
      { id: 'bdg-r1', title: 'HTML Hero', icon: 'CheckCircle2', description: 'Built 3 semantic web pages', unlocked: true },
      { id: 'bdg-r2', title: '4-Day Streak', icon: 'Flame', description: '4 consecutive active study days', unlocked: true }
    ],
    weeklyActivity: [
      { day: 'Mon', hours: 2.0, questions: 8 },
      { day: 'Tue', hours: 3.0, questions: 12 },
      { day: 'Wed', hours: 1.5, questions: 5 },
      { day: 'Thu', hours: 2.5, questions: 10 },
      { day: 'Fri', hours: 3.0, questions: 11 },
      { day: 'Sat', hours: 2.5, questions: 9 },
      { day: 'Sun', hours: 1.5, questions: 4 }
    ]
  },
  {
    id: 'student-priya',
    name: 'Priya',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'priya.cons@mind.edu',
    role: 'student',
    age: 20,
    educationLevel: 'Undergraduate',
    department: 'Computer Science & Engineering',
    semester: 'Year 2 / Semester 4',
    learningGoals: 'Master Database Systems, Operating Systems, and Cloud Platforms',
    currentSkillLevel: 'Consistent Disciplined Learner',
    currentScore: 78,
    streakDays: 16,
    learningHours: 32.0,
    topicsCompletedCount: 22,
    assessmentsCompletedCount: 26,
    totalXP: 3800,
    currentLevel: '🔥 Consistent',
    levelProgress: 82,
    challengeHandling: 80,
    growthScore: 82,
    momentumPercentage: 10,
    growthFactors: {
      performance: 78,
      improvementRate: 60,
      consistency: 90,
      topicMastery: 79,
      practiceActivity: 75
    },
    fingerprint: {
      classification: 'Consistent Learner',
      title: 'Consistent Learner – High Discipline',
      subtitle: 'Steady & Reliable Progress',
      badgeColor: 'cyan',
      growthCategory: 'consistent',
      explanation: 'Your daily practice habits and low error volatility ensure sustained academic momentum.',
      radarMetrics: [
        { subject: 'Current Performance', value: 78, fullMark: 100 },
        { subject: 'Improvement Rate', value: 65, fullMark: 100 },
        { subject: 'Consistency', value: 92, fullMark: 100 },
        { subject: 'Mistake Control', value: 78, fullMark: 100 },
        { subject: 'Topic Mastery', value: 79, fullMark: 100 },
        { subject: 'Challenge Handling', value: 80, fullMark: 100 },
      ]
    },
    dailyMission: {
      id: 'mission-priya-1',
      title: 'Database Indexing & B-Trees',
      description: 'Complete 4 exercises on composite indexes and query execution plans.',
      estimatedTime: '30 mins',
      targetScore: '85%',
      xpReward: 180,
      topic: 'DBMS Indexing',
      completed: false
    },
    tests: [
      { testName: 'Diagnostic 1', score: 72, date: '2026-08-10' },
      { testName: 'Unit Test 1', score: 74, date: '2026-08-25' },
      { testName: 'Midterm 1', score: 75, date: '2026-09-12' },
      { testName: 'Progress Test', score: 76, date: '2026-09-28' },
      { testName: 'Current Assessment', score: 78, date: '2026-10-04' }
    ],
    topics: [
      { id: 'top-db-norm', name: 'Normalization & 3NF', mastery: 85, score: 85, attempts: 18, correct: 16, wrong: 2, priority: '🟢 Strong', subject: 'DBMS', recommendedAction: 'Mastered functional dependencies' },
      { id: 'top-db-idx', name: 'B-Tree Indexing', mastery: 74, score: 74, attempts: 15, correct: 11, wrong: 4, priority: '🟡 Medium Priority', subject: 'DBMS', recommendedAction: 'Study clustered vs secondary index costs' },
      { id: 'top-os-proc', name: 'Process Synchronization', mastery: 76, score: 76, attempts: 16, correct: 12, wrong: 4, priority: '🟡 Medium Priority', subject: 'Operating Systems', recommendedAction: 'Practice semaphores & mutex deadlocks' },
      { id: 'top-os-mem', name: 'Virtual Memory & Paging', mastery: 80, score: 80, attempts: 14, correct: 12, wrong: 2, priority: '🟢 Strong', subject: 'Operating Systems', recommendedAction: 'Explore page replacement algorithms' }
    ],
    mistakes: [
      {
        id: 'mst-p1',
        topic: 'Process Synchronization',
        errorPattern: 'Deadlock condition analysis: Missing circular wait check.',
        frequency: 3,
        rootCause: 'Overlooking resource allocation graph cycle validation.',
        sampleSnippet: 'wait(sem1); wait(sem2); // Inverted locking order',
        recommendedPractice: 'Verify total ordering rule for lock acquisition.'
      }
    ],
    badges: [
      { id: 'bdg-p1', title: '16-Day Streak', icon: 'Flame', description: '16 consecutive active study days', unlocked: true },
      { id: 'bdg-p2', title: 'DBMS Specialist', icon: 'Database', description: 'Scored 85%+ in Relational Normalization', unlocked: true }
    ],
    weeklyActivity: [
      { day: 'Mon', hours: 4.5, questions: 20 },
      { day: 'Tue', hours: 4.0, questions: 18 },
      { day: 'Wed', hours: 5.0, questions: 24 },
      { day: 'Thu', hours: 4.5, questions: 22 },
      { day: 'Fri', hours: 4.0, questions: 19 },
      { day: 'Sat', hours: 6.0, questions: 28 },
      { day: 'Sun', hours: 4.0, questions: 16 }
    ]
  }
];

export const INITIAL_FACULTY = {
  id: 'faculty-sharma',
  name: 'Prof. Sharma',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  title: 'Professor & Head of Department',
  department: 'Computer Science & Engineering',
  institution: 'Metropolitan Institute of Technology',
  totalStudents: 64,
  stats: {
    averageScore: 76.4,
    averageGrowthMomentum: '+13.8%',
    topPerformersCount: 14,
    lateBloomersCount: 18,
    developingLearnersCount: 22,
    needsSupportCount: 10
  },
  difficultTopics: [
    { name: 'Pointers & Dynamic Memory', subject: 'C Programming', averageMastery: 45, failureRate: '42%', strugglingStudents: 27 },
    { name: 'Functions & Parameter Passing', subject: 'C Programming', averageMastery: 53, failureRate: '34%', strugglingStudents: 22 },
    { name: 'Async JavaScript & Promises', subject: 'Web Dev', averageMastery: 58, failureRate: '29%', strugglingStudents: 18 },
    { name: 'Nested Loops & Boundary Traversal', subject: 'C Programming', averageMastery: 66, failureRate: '21%', strugglingStudents: 14 }
  ],
  commonMistakesCohort: [
    { errorPattern: 'Pass-by-value modifying parameter copy instead of caller variable', frequency: 84, affectedTopics: 'Functions (C Programming)' },
    { errorPattern: 'Off-by-one array buffer overflow on index arr[N]', frequency: 68, affectedTopics: 'Arrays & Memory' },
    { errorPattern: 'Uncaught asynchronous promise rejections', frequency: 45, affectedTopics: 'Web & APIs' },
    { errorPattern: 'Deadlock circular wait on inverted semaphore acquisition', frequency: 32, affectedTopics: 'Operating Systems' }
  ]
};
