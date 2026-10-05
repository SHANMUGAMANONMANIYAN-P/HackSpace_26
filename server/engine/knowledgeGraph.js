// server/engine/knowledgeGraph.js
/**
 * Prerequisite Knowledge Graph & Conflict Resolver
 * Powers the "WHAT SHOULD I NOT STUDY NOW?" feature by evaluating prerequisite graphs.
 */

export const TOPIC_KNOWLEDGE_GRAPH = {
  'Advanced AI': {
    prerequisites: ['Python Basics', 'Functions', 'Data Structures', 'Machine Learning'],
    difficulty: 'Expert',
    category: 'AI & Data Science',
    description: 'Deep Learning, Transformers, Reinforcement Learning, and Multi-Agent Systems.',
    recommendedSequence: ['Python Basics', 'Functions', 'Data Structures', 'Machine Learning', 'Advanced AI']
  },
  'Machine Learning': {
    prerequisites: ['Python Basics', 'Functions', 'Linear Algebra & Statistics'],
    difficulty: 'Advanced',
    category: 'AI & Data Science',
    description: 'Supervised & Unsupervised Learning, Regression, Classification, and Scikit-Learn.',
    recommendedSequence: ['Python Basics', 'Functions', 'Linear Algebra & Statistics', 'Machine Learning']
  },
  'Advanced Graph Algorithms': {
    prerequisites: ['Arrays', 'Functions', 'Recursion', 'Basic Trees'],
    difficulty: 'Expert',
    category: 'Data Structures',
    description: 'Dijkstra, Bellman-Ford, Tarjan SCC, Max Flow, and Route Optimization.',
    recommendedSequence: ['Arrays', 'Functions', 'Recursion', 'Basic Trees', 'Advanced Graph Algorithms']
  },
  'Dynamic Programming': {
    prerequisites: ['Recursion', 'Arrays', 'Time Complexity'],
    difficulty: 'Advanced',
    category: 'Algorithms',
    description: 'Memoization, Tabulation, Knapsack, and Optimal Substructure Problems.',
    recommendedSequence: ['Arrays', 'Recursion', 'Time Complexity', 'Dynamic Programming']
  },
  'Pointers & Memory Allocation': {
    prerequisites: ['Variables', 'Data Types', 'Functions'],
    difficulty: 'Intermediate',
    category: 'Systems & C',
    description: 'Dynamic memory allocation (malloc/free), pointer arithmetic, and heap management.',
    recommendedSequence: ['Variables', 'Data Types', 'Functions', 'Pointers & Memory Allocation']
  },
  'Object Oriented Programming': {
    prerequisites: ['Variables', 'Functions', 'Arrays'],
    difficulty: 'Intermediate',
    category: 'Core Programming',
    description: 'Encapsulation, Inheritance, Polymorphism, and Abstract Classes.',
    recommendedSequence: ['Variables', 'Functions', 'Arrays', 'Object Oriented Programming']
  },
  'Functions': {
    prerequisites: ['Variables', 'Data Types', 'Loops'],
    difficulty: 'Foundation',
    category: 'Core Programming',
    description: 'Scope, Parameter Passing, Return Values, and Modular Code.',
    recommendedSequence: ['Variables', 'Data Types', 'Loops', 'Functions']
  },
  'Arrays': {
    prerequisites: ['Variables', 'Loops'],
    difficulty: 'Foundation',
    category: 'Core Programming',
    description: 'Contiguous memory, 1D/2D arrays, indexing, and linear traversal.',
    recommendedSequence: ['Variables', 'Loops', 'Arrays']
  }
};

/**
 * Checks whether a student is ready to study a specific topic,
 * identifying missing or weak prerequisites.
 */
export function evaluatePrerequisites(studentTopics = [], targetTopic = 'Advanced AI') {
  const node = TOPIC_KNOWLEDGE_GRAPH[targetTopic];
  if (!node) {
    return {
      isRecommended: true,
      targetTopic,
      reason: 'No strict prerequisite constraints detected.',
      weakPrerequisites: [],
      recommendedPath: [targetTopic]
    };
  }

  // Create a map of student topic masteries
  const masteryMap = {};
  studentTopics.forEach(t => {
    masteryMap[t.name.toLowerCase()] = t.mastery;
  });

  const weakPrereqs = [];

  node.prerequisites.forEach(prereq => {
    const key = prereq.toLowerCase();
    const mastery = masteryMap[key] !== undefined ? masteryMap[key] : (masteryMap[prereq] || 50);
    // Prerequisite is considered weak if mastery < 70%
    if (mastery < 70) {
      weakPrereqs.push({
        name: prereq,
        currentMastery: mastery,
        requiredMastery: 75
      });
    }
  });

  const isRecommended = weakPrereqs.length === 0;

  return {
    isRecommended,
    targetTopic,
    difficulty: node.difficulty,
    category: node.category,
    description: node.description,
    weakPrerequisites: weakPrereqs,
    recommendedPath: node.recommendedSequence,
    alertTitle: isRecommended 
      ? `✅ Ready for ${targetTopic}` 
      : `⚠️ ${targetTopic} is not your current priority.`,
    alertReason: isRecommended
      ? `You have demonstrated strong mastery (≥75%) in all prerequisite topics.`
      : `Your prerequisite concepts (${weakPrereqs.map(p => p.name).join(', ')}) need more practice first before advancing.`,
    pedagogicalRationale: isRecommended
      ? `Proceed directly with hands-on application and projects.`
      : `Strengthening ${weakPrereqs[0]?.name || 'fundamentals'} first will prevent cognitive overload and ensure long-term retention.`
  };
}
