// server/db/database.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '../data/growthmind_db.json');

// Ensure data directory exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

/**
 * In-Memory & File-Persistent Relational Database
 */
class Database {
  constructor() {
    this.data = {
      users: [],
      student_profiles: [],
      topics: [],
      assessments: [],
      attempts: [],
      learning_activities: [],
      growth_fingerprints: [],
      recommendations: [],
      goals: [],
      achievements: [],
      mistake_logs: [],
    };
    this.init();
  }

  init() {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = { ...this.data, ...parsed };
      } catch (err) {
        console.warn('Could not load existing database file, initializing seeds:', err.message);
        this.seedInitialData();
      }
    } else {
      this.seedInitialData();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving database to file:', err.message);
    }
  }

  seedInitialData() {
    const salt = bcrypt.genSaltSync(10);
    const standardPasswordHash = bcrypt.hashSync('password123', salt);
    const adminPasswordHash = bcrypt.hashSync('admin123', salt);

    // 1. Users
    this.data.users = [
      {
        id: 'usr-tharun',
        name: 'Tharun',
        email: 'tharun.growth@mind.edu',
        passwordHash: standardPasswordHash,
        role: 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        createdAt: '2026-08-01T00:00:00Z',
      },
      {
        id: 'usr-aadhya',
        name: 'Aadhya',
        email: 'aadhya.top@mind.edu',
        passwordHash: standardPasswordHash,
        role: 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        createdAt: '2026-08-01T00:00:00Z',
      },
      {
        id: 'usr-rohan',
        name: 'Rohan',
        email: 'rohan.dev@mind.edu',
        passwordHash: standardPasswordHash,
        role: 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
        createdAt: '2026-08-01T00:00:00Z',
      },
      {
        id: 'usr-priya',
        name: 'Priya',
        email: 'priya.cons@mind.edu',
        passwordHash: standardPasswordHash,
        role: 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        createdAt: '2026-08-01T00:00:00Z',
      },
      {
        id: 'usr-sharma',
        name: 'Prof. Sharma',
        email: 'sharma.faculty@mind.edu',
        passwordHash: standardPasswordHash,
        role: 'FACULTY',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        createdAt: '2026-08-01T00:00:00Z',
      },
      {
        id: 'usr-admin',
        name: 'System Admin',
        email: 'admin@growthmind.edu',
        passwordHash: adminPasswordHash,
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        createdAt: '2026-08-01T00:00:00Z',
      }
    ];

    // 2. Student Profiles
    this.data.student_profiles = [
      {
        studentId: 'usr-tharun',
        department: 'Computer Science & Engineering',
        year: 'Year 2',
        semester: 'Semester 4',
        academicDetails: 'B.Tech CSE Undergraduate',
        interests: ['Systems Programming', 'C/C++', 'Data Structures'],
        goals: 'Master Data Structures and secure Tier-1 Tech Internship',
        isOnboarded: true,
        currentScore: 75,
        streakDays: 7,
        learningHours: 24.5,
        totalXP: 2450,
        createdAt: '2026-08-01T00:00:00Z',
        updatedAt: '2026-10-04T00:00:00Z',
      },
      {
        studentId: 'usr-aadhya',
        department: 'Computer Science & Engineering',
        year: 'Year 3',
        semester: 'Semester 6',
        academicDetails: 'B.Tech CSE Undergraduate - Honors',
        interests: ['Advanced Algorithms', 'Distributed Systems', 'Research'],
        goals: 'Publish systems research paper and compete in ACM-ICPC',
        isOnboarded: true,
        currentScore: 92,
        streakDays: 24,
        learningHours: 48.0,
        totalXP: 6850,
        createdAt: '2026-08-01T00:00:00Z',
        updatedAt: '2026-10-04T00:00:00Z',
      },
      {
        studentId: 'usr-rohan',
        department: 'Information Technology',
        year: 'Year 2',
        semester: 'Semester 3',
        academicDetails: 'B.Tech IT Undergraduate',
        interests: ['Web Development', 'JavaScript', 'Databases'],
        goals: 'Become a Full Stack Web Developer',
        isOnboarded: true,
        currentScore: 61,
        streakDays: 4,
        learningHours: 16.0,
        totalXP: 1400,
        createdAt: '2026-08-01T00:00:00Z',
        updatedAt: '2026-10-04T00:00:00Z',
      },
      {
        studentId: 'usr-priya',
        department: 'Computer Science & Engineering',
        year: 'Year 2',
        semester: 'Semester 4',
        academicDetails: 'B.Tech CSE Undergraduate',
        interests: ['Database Systems', 'Operating Systems', 'Cloud'],
        goals: 'Master DBMS and Cloud Infrastructure',
        isOnboarded: true,
        currentScore: 78,
        streakDays: 16,
        learningHours: 32.0,
        totalXP: 3800,
        createdAt: '2026-08-01T00:00:00Z',
        updatedAt: '2026-10-04T00:00:00Z',
      }
    ];

    // 3. Topics
    this.data.topics = [
      { id: 'top-var', name: 'Variables', subject: 'C', difficulty: 'Foundation', prerequisites: [] },
      { id: 'top-loop', name: 'Loops', subject: 'C', difficulty: 'Foundation', prerequisites: ['Variables'] },
      { id: 'top-func', name: 'Functions', subject: 'C', difficulty: 'Intermediate', prerequisites: ['Variables', 'Loops'] },
      { id: 'top-arr', name: 'Arrays', subject: 'C', difficulty: 'Intermediate', prerequisites: ['Variables', 'Loops'] },
      { id: 'top-ptr', name: 'Pointers & Dynamic Memory', subject: 'C', difficulty: 'Advanced', prerequisites: ['Variables', 'Functions'] },
      { id: 'top-cpp-oop', name: 'C++ OOP & Memory', subject: 'C++', difficulty: 'Intermediate', prerequisites: ['Pointers & Dynamic Memory'] },
      { id: 'top-cpp-stl', name: 'STL Containers', subject: 'C++', difficulty: 'Intermediate', prerequisites: ['C++ OOP & Memory'] },
      { id: 'top-py-bas', name: 'Python Basics', subject: 'Python', difficulty: 'Foundation', prerequisites: [] },
      { id: 'top-py-func', name: 'Python Functions & Lambdas', subject: 'Python', difficulty: 'Intermediate', prerequisites: ['Python Basics'] },
      { id: 'top-java-oop', name: 'Java Classes & Objects', subject: 'Java', difficulty: 'Foundation', prerequisites: [] },
      { id: 'top-java-coll', name: 'Java Collections', subject: 'Java', difficulty: 'Intermediate', prerequisites: ['Java Classes & Objects'] },
      { id: 'top-sql-join', name: 'SQL Joins & Aggregations', subject: 'SQL', difficulty: 'Intermediate', prerequisites: [] },
      { id: 'top-sql-idx', name: 'SQL Indexing & Optimization', subject: 'SQL', difficulty: 'Advanced', prerequisites: ['SQL Joins & Aggregations'] },
      { id: 'top-ds-bas', name: 'Data Structures Basics', subject: 'Data Structures', difficulty: 'Intermediate', prerequisites: ['Arrays', 'Functions'] },
      { id: 'top-ds-trees', name: 'Binary Search Trees', subject: 'Data Structures', difficulty: 'Advanced', prerequisites: ['Data Structures Basics'] },
      { id: 'top-ds-graph', name: 'Advanced Graph Algorithms', subject: 'Data Structures', difficulty: 'Expert', prerequisites: ['Data Structures Basics', 'Binary Search Trees'] },
      { id: 'top-ml', name: 'Machine Learning', subject: 'Python', difficulty: 'Advanced', prerequisites: ['Python Basics', 'Functions'] },
      { id: 'top-ai-adv', name: 'Advanced AI', subject: 'Python', difficulty: 'Expert', prerequisites: ['Python Basics', 'Functions', 'Data Structures Basics', 'Machine Learning'] },
    ];

    // 4. Assessments & Question Bank
    this.data.assessments = [
      {
        id: 'asm-func',
        title: 'Functions & Parameter Passing Diagnostic Drill',
        subject: 'C',
        topic: 'Functions',
        difficulty: 'Intermediate',
        createdAt: '2026-08-10T00:00:00Z',
        questions: [
          {
            id: 'q-func-1',
            question: 'In C/C++, when passing an argument by value to a function, what actually happens to the variable in the caller function?',
            codeSnippet: `void increment(int x) {\n    x = x + 1;\n}\nint main() {\n    int a = 5;\n    increment(a);\n    printf("%d", a);\n}`,
            options: [
              'Variable a becomes 6 because x is modified',
              'Variable a remains 5 because a copy of the value is passed',
              'A compile-time error occurs due to parameter mismatch',
              'Variable a becomes 0 due to stack cleanup'
            ],
            correctIndex: 1,
            explanation: 'In pass-by-value, a separate copy of the parameter is allocated on the stack. Changes made inside increment() do not affect variable a in main().'
          },
          {
            id: 'q-func-2',
            question: 'Which syntax correctly defines a function that modifies the original integer in the caller via pointer passing in C?',
            codeSnippet: `// Which signature allows modifying original 'num'?`,
            options: [
              'void update(int num);',
              'void update(int *num) { *num += 10; }',
              'int update(const int num);',
              'void update(int &num); // In pure C'
            ],
            correctIndex: 1,
            explanation: 'Using int *num receives the memory address. Dereferencing with *num = ... mutates the memory cell at caller location.'
          },
          {
            id: 'q-func-3',
            question: 'What is the base case condition required to prevent infinite recursion in this countdown function?',
            codeSnippet: `void countdown(int n) {\n    printf("%d ", n);\n    // Missing Base Case\n    countdown(n - 1);\n}`,
            options: [
              'if (n == 0) return;',
              'if (n > 0) countdown(n - 1);',
              'while (n != 0) { n--; }',
              'if (n == 100) exit(0);'
            ],
            correctIndex: 0,
            explanation: 'if (n <= 0) return; or if (n == 0) return; terminates recursion once zero is reached, avoiding stack overflow.'
          }
        ]
      },
      {
        id: 'asm-arr',
        title: 'Array Boundary & Index Traversal Drill',
        subject: 'C',
        topic: 'Arrays',
        difficulty: 'Intermediate',
        createdAt: '2026-08-12T00:00:00Z',
        questions: [
          {
            id: 'q-arr-1',
            question: 'In a 0-indexed array of size N (e.g., int arr[10]), what is the valid index range for elements?',
            codeSnippet: `int arr[10];`,
            options: [
              '1 to 10',
              '0 to 9',
              '0 to 10',
              '-1 to 9'
            ],
            correctIndex: 1,
            explanation: 'For size N, valid indices are always 0 through N - 1. Accessing arr[10] causes an off-by-one buffer overrun error.'
          },
          {
            id: 'q-arr-2',
            question: 'What is the time complexity of accessing an element in an array by its index, e.g. arr[i]?',
            codeSnippet: `int val = arr[42];`,
            options: [
              'O(1) Constant Time',
              'O(N) Linear Time',
              'O(log N) Logarithmic Time',
              'O(N^2) Quadratic Time'
            ],
            correctIndex: 0,
            explanation: 'Arrays allocate contiguous memory blocks. The address is calculated instantly via baseAddress + i * sizeof(type), yielding O(1) random access.'
          }
        ]
      },
      {
        id: 'asm-cpp-oop',
        title: 'C++ Object-Oriented Principles & Virtual Functions',
        subject: 'C++',
        topic: 'C++ OOP & Memory',
        difficulty: 'Intermediate',
        createdAt: '2026-08-15T00:00:00Z',
        questions: [
          {
            id: 'q-cpp-1',
            question: 'What is the purpose of declaring a destructor as `virtual` in a C++ base class?',
            codeSnippet: `class Base {\npublic:\n    virtual ~Base() {}\n};`,
            options: [
              'To allow multiple inheritance',
              'To ensure the derived class destructor is invoked when deleting via a base pointer',
              'To prevent instantiation of the base class',
              'To allocate memory on the heap instead of stack'
            ],
            correctIndex: 1,
            explanation: 'Virtual destructors guarantee that when an object of a derived class is deleted through a base class pointer, the derived destructor is properly executed first.'
          },
          {
            id: 'q-cpp-2',
            question: 'Which STL container in C++ provides average O(1) constant time lookups by hashing keys?',
            options: ['std::map', 'std::unordered_map', 'std::vector', 'std::list'],
            correctIndex: 1,
            explanation: 'std::unordered_map uses a hash table providing O(1) average time complexity, whereas std::map is implemented via red-black trees with O(log N) complexity.'
          }
        ]
      },
      {
        id: 'asm-py-bas',
        title: 'Python Core Structures, Dictionaries & Comprehensions',
        subject: 'Python',
        topic: 'Python Basics',
        difficulty: 'Foundation',
        createdAt: '2026-08-18T00:00:00Z',
        questions: [
          {
            id: 'q-py-1',
            question: 'What is the output of the list comprehension `[x**2 for x in range(4) if x % 2 == 0]` in Python?',
            options: ['[0, 4]', '[0, 1, 4, 9]', '[4, 16]', '[0, 2]'],
            correctIndex: 0,
            explanation: 'range(4) produces 0, 1, 2, 3. The condition filters even numbers (0, 2), and squaring them gives [0, 4].'
          },
          {
            id: 'q-py-2',
            question: 'What is the time complexity of looking up a key in a Python dictionary with N entries on average?',
            options: ['O(1) Average', 'O(N) Linear', 'O(log N)', 'O(N^2)'],
            correctIndex: 0,
            explanation: 'Python dictionaries are implemented as highly optimized hash tables with O(1) average lookup time.'
          }
        ]
      },
      {
        id: 'asm-java-oop',
        title: 'Java Object Models, Interfaces & Collections',
        subject: 'Java',
        topic: 'Java Classes & Objects',
        difficulty: 'Intermediate',
        createdAt: '2026-08-20T00:00:00Z',
        questions: [
          {
            id: 'q-java-1',
            question: 'Which interface in the Java Collections Framework prohibits duplicate elements?',
            options: ['List', 'Set', 'Queue', 'Map'],
            correctIndex: 1,
            explanation: 'The Set interface represents a collection containing no duplicate elements (e.g., HashSet, TreeSet).'
          },
          {
            id: 'q-java-2',
            question: 'What does the `final` keyword signify when applied to a class declaration in Java?',
            options: ['The class cannot be instantiated', 'The class cannot be subclassed (inherited)', 'All methods must be static', 'The class is garbage collected immediately'],
            correctIndex: 1,
            explanation: 'A final class cannot be extended by any other class, ensuring security and immutability (like java.lang.String).'
          }
        ]
      },
      {
        id: 'asm-sql-join',
        title: 'SQL Relational Queries, Joins & Grouping',
        subject: 'SQL',
        topic: 'SQL Joins & Aggregations',
        difficulty: 'Intermediate',
        createdAt: '2026-08-22T00:00:00Z',
        questions: [
          {
            id: 'q-sql-1',
            question: 'Which SQL clause is used to filter rows AFTER an aggregation (GROUP BY) has been calculated?',
            options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
            correctIndex: 1,
            explanation: 'HAVING filters aggregate values (e.g. HAVING COUNT(*) > 5), whereas WHERE filters individual rows before aggregation.'
          },
          {
            id: 'q-sql-2',
            question: 'Which JOIN returns all rows from the left table and matched rows from the right table, filling with NULL where unmatched?',
            options: ['INNER JOIN', 'LEFT OUTER JOIN', 'FULL JOIN', 'CROSS JOIN'],
            correctIndex: 1,
            explanation: 'LEFT JOIN returns all records from the left table and matched records from the right table.'
          }
        ]
      },
      {
        id: 'asm-ds-trees',
        title: 'Data Structures: Binary Search Trees & Graph Algorithms',
        subject: 'Data Structures',
        topic: 'Binary Search Trees',
        difficulty: 'Advanced',
        createdAt: '2026-08-25T00:00:00Z',
        questions: [
          {
            id: 'q-ds-1',
            question: 'In a balanced Binary Search Tree (BST) with N nodes, what is the worst-case search time complexity?',
            options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
            correctIndex: 1,
            explanation: 'A balanced BST maintains height proportional to log2(N), guaranteeing O(log N) search, insert, and delete.'
          },
          {
            id: 'q-ds-2',
            question: 'Which graph traversal algorithm uses a Queue data structure to explore nodes layer by layer?',
            options: ['Depth First Search (DFS)', 'Breadth First Search (BFS)', 'Dijkstra with Priority Queue', 'Topological Sort'],
            correctIndex: 1,
            explanation: 'BFS uses a FIFO Queue to visit neighbors level by level, finding shortest unweighted paths.'
          }
        ]
      },
      {
        id: 'asm-diag-init',
        title: 'Initial Student Growth Diagnostic Assessment',
        subject: 'Core Computer Science',
        topic: 'CS Fundamentals',
        difficulty: 'Foundation',
        createdAt: '2026-08-01T00:00:00Z',
        questions: [
          {
            id: 'q-init-1',
            question: 'Which of the following data types in C typically occupies 4 bytes of memory on a 64-bit architecture?',
            options: ['char', 'int', 'double', 'short'],
            correctIndex: 1,
            explanation: 'Standard `int` is 4 bytes (32 bits), `char` is 1 byte, `double` is 8 bytes, and `short` is 2 bytes.'
          },
          {
            id: 'q-init-2',
            question: 'What will be the output of a for loop running from i = 0 while i < 5 with i++?',
            options: ['Runs 4 times', 'Runs 5 times (0,1,2,3,4)', 'Runs 6 times', 'Infinite loop'],
            correctIndex: 1,
            explanation: 'It iterates through values 0, 1, 2, 3, 4, which is exactly 5 iterations.'
          },
          {
            id: 'q-init-3',
            question: 'Which mechanism is required in C to pass an array to a function?',
            options: ['Passed by copy of all elements', 'Passed by pointer to first element (base address)', 'Passed by reference automatically as in Python', 'Cannot pass arrays to functions in C'],
            correctIndex: 1,
            explanation: 'Arrays decay to a pointer to their first element when passed as function arguments.'
          }
        ]
      }
    ];

    // 5. Attempts
    this.data.attempts = [
      { id: 'att-th-1', studentId: 'usr-tharun', assessmentId: 'asm-diag-init', score: 40, topicScores: { Variables: 60, Loops: 40, Functions: 20 }, timestamp: '2026-08-10T10:00:00Z' },
      { id: 'att-th-2', studentId: 'usr-tharun', assessmentId: 'asm-func', score: 48, topicScores: { Functions: 48 }, timestamp: '2026-08-25T14:30:00Z' },
      { id: 'att-th-3', studentId: 'usr-tharun', assessmentId: 'asm-arr', score: 57, topicScores: { Arrays: 57 }, timestamp: '2026-09-12T11:00:00Z' },
      { id: 'att-th-4', studentId: 'usr-tharun', assessmentId: 'asm-func', score: 68, topicScores: { Functions: 68 }, timestamp: '2026-09-28T16:00:00Z' },
      { id: 'att-th-5', studentId: 'usr-tharun', assessmentId: 'asm-func', score: 75, topicScores: { Functions: 75, Variables: 88 }, timestamp: '2026-10-04T12:00:00Z' },
      
      { id: 'att-ad-1', studentId: 'usr-aadhya', assessmentId: 'asm-diag-init', score: 88, topicScores: { Variables: 95, Loops: 90, Functions: 85 }, timestamp: '2026-08-10T10:00:00Z' },
      { id: 'att-ad-2', studentId: 'usr-aadhya', assessmentId: 'asm-func', score: 92, topicScores: { Functions: 92 }, timestamp: '2026-09-12T10:00:00Z' },
      { id: 'att-ad-3', studentId: 'usr-aadhya', assessmentId: 'asm-arr', score: 94, topicScores: { Arrays: 94 }, timestamp: '2026-10-04T10:00:00Z' },
    ];

    // 6. Growth Fingerprints
    this.data.growth_fingerprints = [
      {
        studentId: 'usr-tharun',
        performance: 75,
        improvementTrend: 28, // +28%
        consistency: 70,
        mastery: 61,
        growthScore: 78,
        classification: 'Late Bloomer – High Growth Potential',
        radarMetrics: [
          { subject: 'Current Performance', value: 75, fullMark: 100 },
          { subject: 'Improvement Rate', value: 93, fullMark: 100 },
          { subject: 'Consistency', value: 70, fullMark: 100 },
          { subject: 'Mistake Control', value: 45, fullMark: 100 },
          { subject: 'Topic Mastery', value: 61, fullMark: 100 },
          { subject: 'Challenge Handling', value: 72, fullMark: 100 },
        ],
        updatedAt: '2026-10-04T12:00:00Z',
      },
      {
        studentId: 'usr-aadhya',
        performance: 92,
        improvementTrend: 4,
        consistency: 98,
        mastery: 94,
        growthScore: 95,
        classification: 'Top Performer – Beyond Syllabus',
        radarMetrics: [
          { subject: 'Current Performance', value: 92, fullMark: 100 },
          { subject: 'Improvement Rate', value: 75, fullMark: 100 },
          { subject: 'Consistency', value: 98, fullMark: 100 },
          { subject: 'Mistake Control', value: 92, fullMark: 100 },
          { subject: 'Topic Mastery', value: 94, fullMark: 100 },
          { subject: 'Challenge Handling', value: 96, fullMark: 100 },
        ],
        updatedAt: '2026-10-04T10:00:00Z',
      }
    ];

    // 7. Goals
    this.data.goals = [
      {
        id: 'gol-th-1',
        studentId: 'usr-tharun',
        description: 'Master C Functions & Parameter Passing',
        target: 'Achieve ≥75% mastery on Functions',
        status: 'In Progress',
        progress: 48,
        duePeriod: '30 Days',
        createdAt: '2026-09-01T00:00:00Z',
      },
      {
        id: 'gol-th-2',
        studentId: 'usr-tharun',
        description: 'Build Mini Project: Student Record Manager',
        target: 'Complete Step 3 in Growth Recovery Plan',
        status: 'Locked (Requires Step 2)',
        progress: 10,
        duePeriod: '60 Days',
        createdAt: '2026-09-01T00:00:00Z',
      },
      {
        id: 'gol-ad-1',
        studentId: 'usr-aadhya',
        description: 'Implement High-Throughput Route Optimization Engine',
        target: 'Complete A* Heuristic Engine handling 50k nodes',
        status: 'In Progress',
        progress: 65,
        duePeriod: '45 Days',
        createdAt: '2026-09-01T00:00:00Z',
      }
    ];

    // 8. Achievements / Badges
    this.data.achievements = [
      { id: 'ach-th-1', studentId: 'usr-tharun', badge: '7-Day Streak', icon: 'Flame', description: '7 active study days in a row', XP: 100, timestamp: '2026-10-03T00:00:00Z' },
      { id: 'ach-th-2', studentId: 'usr-tharun', badge: 'Growth Rocket', icon: 'TrendingUp', description: 'Improved score by +25% in one semester', XP: 250, timestamp: '2026-10-04T00:00:00Z' },
      { id: 'ach-ad-1', studentId: 'usr-aadhya', badge: '24-Day Streak', icon: 'Flame', description: '24 active study days in a row', XP: 300, timestamp: '2026-10-04T00:00:00Z' },
      { id: 'ach-ad-2', studentId: 'usr-aadhya', badge: 'Master of Graphs', icon: 'Award', description: 'Scored 92%+ in Graph Algorithms', XP: 400, timestamp: '2026-09-20T00:00:00Z' }
    ];

    // 9. Mistake Logs
    this.data.mistake_logs = [
      {
        id: 'mst-th-1',
        studentId: 'usr-tharun',
        topic: 'Functions',
        errorPattern: 'Repeated mistake: Confusing pass-by-value with pass-by-reference in C.',
        frequency: 6,
        rootCause: 'Assuming modifying a local parameter mutates the original variable in caller.',
        sampleSnippet: 'void swap(int a, int b) { int t = a; a = b; b = t; }',
        recommendedPractice: 'Practice 5 parameter-passing problems before moving forward.',
      },
      {
        id: 'mst-th-2',
        studentId: 'usr-tharun',
        topic: 'Loops',
        errorPattern: 'Nested loop variable shadowing / incorrect loop bounds.',
        frequency: 4,
        rootCause: 'Reusing counter variable or missing boundary decrement.',
        sampleSnippet: 'for(int i=0; i<N; i++) { for(int i=0; i<M; i++) ... }',
        recommendedPractice: 'Complete 3 nested matrix traversal exercises.',
      },
      {
        id: 'mst-th-3',
        studentId: 'usr-tharun',
        topic: 'Arrays',
        errorPattern: 'Off-by-one indexing error accessing arr[N] on array of size N.',
        frequency: 5,
        rootCause: 'Index boundary confusion between 1-based size and 0-based index.',
        sampleSnippet: 'int arr[5]; arr[5] = 10; // Out of bounds!',
        recommendedPractice: 'Solve 4 array boundary check questions.',
      }
    ];

    // 10. Learning Activities
    this.data.learning_activities = [
      { id: 'act-th-1', studentId: 'usr-tharun', activityType: 'PRACTICE_DRILL', topicId: 'top-func', duration: 25, status: 'COMPLETED', timestamp: '2026-10-04T12:00:00Z' },
      { id: 'act-th-2', studentId: 'usr-tharun', activityType: 'ASSESSMENT', topicId: 'top-arr', duration: 20, status: 'COMPLETED', timestamp: '2026-09-28T16:00:00Z' }
    ];

    this.save();
  }

  // Database Access Methods
  findUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  createUser(user) {
    this.data.users.push(user);
    this.save();
    return user;
  }

  updateUser(id, updates) {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.data.users[idx] = { ...this.data.users[idx], ...updates };
      this.save();
      return this.data.users[idx];
    }
    return null;
  }

  getStudentProfile(studentId) {
    return this.data.student_profiles.find(p => p.studentId === studentId);
  }

  createStudentProfile(profile) {
    this.data.student_profiles.push(profile);
    this.save();
    return profile;
  }

  updateStudentProfile(studentId, updates) {
    const idx = this.data.student_profiles.findIndex(p => p.studentId === studentId);
    if (idx !== -1) {
      this.data.student_profiles[idx] = { ...this.data.student_profiles[idx], ...updates, updatedAt: new Date().toISOString() };
      this.save();
      return this.data.student_profiles[idx];
    }
    return null;
  }

  getGrowthFingerprint(studentId) {
    return this.data.growth_fingerprints.find(f => f.studentId === studentId);
  }

  upsertGrowthFingerprint(fingerprint) {
    const idx = this.data.growth_fingerprints.findIndex(f => f.studentId === fingerprint.studentId);
    if (idx !== -1) {
      this.data.growth_fingerprints[idx] = { ...this.data.growth_fingerprints[idx], ...fingerprint, updatedAt: new Date().toISOString() };
    } else {
      this.data.growth_fingerprints.push({ ...fingerprint, updatedAt: new Date().toISOString() });
    }
    this.save();
    return fingerprint;
  }

  getStudentAttempts(studentId) {
    return this.data.attempts.filter(a => a.studentId === studentId);
  }

  createAttempt(attempt) {
    this.data.attempts.push(attempt);
    this.save();
    return attempt;
  }

  getStudentGoals(studentId) {
    return this.data.goals.filter(g => g.studentId === studentId);
  }

  createGoal(goal) {
    this.data.goals.push(goal);
    this.save();
    return goal;
  }

  updateGoal(goalId, updates) {
    const idx = this.data.goals.findIndex(g => g.id === goalId);
    if (idx !== -1) {
      this.data.goals[idx] = { ...this.data.goals[idx], ...updates };
      this.save();
      return this.data.goals[idx];
    }
    return null;
  }

  getStudentMistakes(studentId) {
    return this.data.mistake_logs.filter(m => m.studentId === studentId);
  }

  upsertMistake(mistake) {
    const idx = this.data.mistake_logs.findIndex(m => m.studentId === mistake.studentId && m.topic === mistake.topic);
    if (idx !== -1) {
      this.data.mistake_logs[idx] = { ...this.data.mistake_logs[idx], ...mistake };
    } else {
      this.data.mistake_logs.push(mistake);
    }
    this.save();
  }

  getStudentAchievements(studentId) {
    return this.data.achievements.filter(a => a.studentId === studentId);
  }

  createAchievement(ach) {
    this.data.achievements.push(ach);
    this.save();
    return ach;
  }

  getAllTopics() {
    return this.data.topics;
  }

  getAllAssessments() {
    return this.data.assessments;
  }

  getAssessmentById(id) {
    return this.data.assessments.find(a => a.id === id);
  }

  createAssessment(assessment) {
    this.data.assessments.push(assessment);
    this.save();
    return assessment;
  }

  getAllStudentsWithProfiles() {
    const students = this.data.users.filter(u => u.role === 'STUDENT');
    return students.map(u => {
      const profile = this.getStudentProfile(u.id) || {};
      const fingerprint = this.getGrowthFingerprint(u.id) || { growthScore: 70, improvementTrend: 10, classification: 'Developing Learner' };
      const attempts = this.getStudentAttempts(u.id);
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        avatar: u.avatar,
        role: u.role,
        department: profile.department || 'Computer Science',
        currentScore: profile.currentScore || 70,
        growthMomentum: fingerprint.improvementTrend || 10,
        classification: fingerprint.classification || 'Developing Learner',
        streakDays: profile.streakDays || 5,
        totalAttempts: attempts.length,
        isOnboarded: profile.isOnboarded !== false
      };
    });
  }

  getAllUsers() {
    return this.data.users.map(({ passwordHash, ...safeUser }) => safeUser);
  }

  deleteUser(id) {
    this.data.users = this.data.users.filter(u => u.id !== id);
    this.data.student_profiles = this.data.student_profiles.filter(p => p.studentId !== id);
    this.data.growth_fingerprints = this.data.growth_fingerprints.filter(f => f.studentId !== id);
    this.data.attempts = this.data.attempts.filter(a => a.studentId !== id);
    this.data.goals = this.data.goals.filter(g => g.studentId !== id);
    this.save();
    return true;
  }

  updateUserRole(id, role) {
    const user = this.data.users.find(u => u.id === id);
    if (user) {
      user.role = role;
      this.save();
      return user;
    }
    return null;
  }
}

export const db = new Database();
