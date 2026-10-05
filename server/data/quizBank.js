// server/data/quizBank.js
/**
 * Interactive Quiz Question Bank
 * Supports interactive assessments that dynamically update growth scores and topic masteries.
 */

export const QUIZ_BANK = {
  'Functions': [
    {
      id: 'func-1',
      topic: 'Functions',
      difficulty: 'Easy',
      question: 'In C/C++, when passing an argument by value to a function, what actually happens to the variable in the caller function?',
      codeSnippet: `void increment(int x) {\n    x = x + 1;\n}\nint main() {\n    int a = 5;\n    increment(a);\n    printf("%d", a);\n}`,
      options: [
        'Variable a becomes 6 because x is modified',
        'Variable a remains 5 because a copy of the value is passed',
        'A compile-time error occurs due to parameter mismatch',
        'Variable a becomes 0 due to stack cleanup'
      ],
      correctIndex: 1,
      explanation: 'In pass-by-value, a separate copy of the parameter is allocated on the stack. Changes made inside increment() do not affect variable `a` in `main()`.'
    },
    {
      id: 'func-2',
      topic: 'Functions',
      difficulty: 'Medium',
      question: 'Which syntax correctly defines a function that modifies the original integer in the caller via pointer passing in C?',
      codeSnippet: `// Which signature allows modifying original 'num'?`,
      options: [
        'void update(int num);',
        'void update(int *num) { *num += 10; }',
        'int update(const int num);',
        'void update(int &num); // In pure C'
      ],
      correctIndex: 1,
      explanation: 'Using `int *num` receives the memory address. Dereferencing with `*num = ...` mutates the memory cell at the caller location.'
    },
    {
      id: 'func-3',
      topic: 'Functions',
      difficulty: 'Medium',
      question: 'What is the base case condition required to prevent infinite recursion in this countdown function?',
      codeSnippet: `void countdown(int n) {\n    printf("%d ", n);\n    // Missing Base Case\n    countdown(n - 1);\n}`,
      options: [
        'if (n == 0) return;',
        'if (n > 0) countdown(n - 1);',
        'while (n != 0) { n--; }',
        'if (n == 100) exit(0);'
      ],
      correctIndex: 0,
      explanation: '`if (n <= 0) return;` or `if (n == 0) return;` terminates recursion once zero is reached, avoiding stack overflow.'
    }
  ],
  'Arrays': [
    {
      id: 'arr-1',
      topic: 'Arrays',
      difficulty: 'Easy',
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
      id: 'arr-2',
      topic: 'Arrays',
      difficulty: 'Medium',
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
  ],
  'Loops': [
    {
      id: 'loop-1',
      topic: 'Loops',
      difficulty: 'Medium',
      question: 'How many times will "GrowthMind" be printed in this nested loop?',
      codeSnippet: `for(int i = 0; i < 3; i++) {\n    for(int j = 0; j < 4; j++) {\n        printf("GrowthMind\\n");\n    }\n}`,
      options: [
        '7 times (3 + 4)',
        '12 times (3 * 4)',
        '4 times',
        '16 times'
      ],
      correctIndex: 1,
      explanation: 'Outer loop runs 3 times; for each iteration the inner loop executes 4 times. Total = 3 * 4 = 12 times.'
    }
  ],
  'Data Structures': [
    {
      id: 'ds-1',
      topic: 'Data Structures',
      difficulty: 'Hard',
      question: 'Which data structure provides O(1) average time complexity for both insertion and key lookup?',
      codeSnippet: `// Key-value store requirement`,
      options: [
        'Hash Table / Map',
        'Binary Search Tree',
        'Singly Linked List',
        'Sorted Array'
      ],
      correctIndex: 0,
      explanation: 'A Hash Table uses hash functions to map keys directly to buckets for O(1) expected lookup and insert operations.'
    }
  ]
};
