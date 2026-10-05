// server/engine/recommendationEngine.js
/**
 * Recommendation Engine for Growth Pathways:
 * - Late Bloomer: 5-step Growth Recovery Roadmap
 * - Top Performer: "Beyond the Syllabus" Innovation & Research Pathways
 */

export function generateLateBloomerRoadmap(student) {
  const { topics = [] } = student;
  
  // Find current weak and mastered topics
  const variablesTopic = topics.find(t => t.name.toLowerCase() === 'variables') || { mastery: 88 };
  const functionsTopic = topics.find(t => t.name.toLowerCase() === 'functions') || { mastery: 48 };
  const arraysTopic = topics.find(t => t.name.toLowerCase() === 'arrays') || { mastery: 52 };
  const loopsTopic = topics.find(t => t.name.toLowerCase() === 'loops') || { mastery: 65 };

  const isStep1Done = (variablesTopic.mastery >= 75);
  const isStep2Done = (functionsTopic.mastery >= 70 && arraysTopic.mastery >= 70);

  const steps = [
    {
      step: 1,
      title: 'Strengthen Basics',
      subtitle: 'Variables, Data Types, Operators',
      status: isStep1Done ? 'completed' : 'active',
      progress: variablesTopic.mastery,
      icon: 'CheckCircle2',
      topics: ['Variables', 'Primitive Types', 'Operators & Expressions'],
      actionText: isStep1Done ? 'Mastered (88%)' : 'Resume Basics Drill',
      estimatedHours: '3 hrs',
      description: 'Solidify foundational memory models, stack allocations, and operator precedences.'
    },
    {
      step: 2,
      title: 'Master Core Concepts',
      subtitle: 'Loops, Functions, Arrays',
      status: isStep1Done ? (isStep2Done ? 'completed' : 'active') : 'locked',
      progress: Math.round((functionsTopic.mastery + arraysTopic.mastery + loopsTopic.mastery) / 3),
      icon: 'Flame',
      topics: ['Functions (48%)', 'Arrays (52%)', 'Nested Loops (65%)'],
      actionText: isStep2Done ? 'Mastered (75%)' : 'Current Target: Practice Functions',
      estimatedHours: '5 hrs',
      description: 'Eliminate parameter passing confusion, array boundary errors, and nested loop bugs.'
    },
    {
      step: 3,
      title: 'Practice & Build',
      subtitle: 'Problem Solving + Mini Project',
      status: isStep2Done ? 'active' : 'locked',
      progress: isStep2Done ? 30 : 0,
      icon: 'Code2',
      topics: ['Modular CLI Calculator', 'Student Record System', 'Mini Game Logic'],
      actionText: isStep2Done ? 'Start Mini Project' : 'Unlocks after Step 2 (≥70% Mastery)',
      estimatedHours: '8 hrs',
      description: 'Combine functions, loops, and 1D/2D arrays into a cohesive working terminal application.'
    },
    {
      step: 4,
      title: 'Advanced Learning',
      subtitle: 'Data Structures + OOP',
      status: 'locked',
      progress: 0,
      icon: 'Layers',
      topics: ['Linked Lists', 'Stacks & Queues', 'Classes & Objects'],
      actionText: 'Locked: Complete Step 3',
      estimatedHours: '12 hrs',
      description: 'Transition into dynamic memory management, pointer manipulation, and object modeling.'
    },
    {
      step: 5,
      title: 'Real World Challenge',
      subtitle: 'Hackathons + Projects',
      status: 'locked',
      progress: 0,
      icon: 'Trophy',
      topics: ['Open Source Contributions', 'Algorithmic Optimization', 'Hackathon Track'],
      actionText: 'Locked: Complete Step 4',
      estimatedHours: '15 hrs',
      description: 'Compete in campus hackathons, solve real client problems, and prepare portfolio.'
    }
  ];

  const weakAreas = topics.map(t => {
    let priority = '🟢 Strong';
    let color = 'emerald';
    if (t.mastery < 60) {
      priority = '🔴 High Priority';
      color = 'rose';
    } else if (t.mastery < 75) {
      priority = '🟡 Medium Priority';
      color = 'amber';
    }
    return {
      name: t.name,
      mastery: t.mastery,
      priority,
      color,
      recommendedAction: t.mastery < 60 
        ? `Immediate drill: 5 practice questions on ${t.name}`
        : t.mastery < 75
        ? `Revision & 1 timed quiz`
        : `Topic consolidated, explore extensions`
    };
  });

  return {
    mode: 'Late Bloomer Recovery Mode',
    headline: 'Your Growth Recovery Plan',
    subheadline: 'Step-by-step foundation rebuilding mapped to your unique growth curve.',
    steps,
    weakAreas,
    activeStepIndex: steps.findIndex(s => s.status === 'active')
  };
}

export function generateTopPerformerRoadmap(student) {
  const { currentScore = 92 } = student;

  const beyondSyllabusCategories = [
    {
      id: 'adv-topics',
      category: '🚀 Advanced Topics',
      title: 'Advanced Graph Algorithms & Memory Optimization',
      difficulty: 'Expert',
      xpReward: 350,
      tags: ['Dijkstra', 'Tarjan SCC', 'Cache Locality', 'Zero-Copy'],
      description: 'Dive deep into asymptotic complexity reduction, cache-aware data structures, and shortest-path graph optimization.',
      actionText: 'Start Advanced Module'
    },
    {
      id: 'projects',
      category: '💻 Real-world Projects',
      title: 'Build a High-Throughput Route Optimization Engine',
      difficulty: 'Industry-Grade',
      xpReward: 500,
      tags: ['C++', 'Graph Theory', 'Microservices', 'Benchmarking'],
      description: 'Implement an A* heuristic navigation engine handling 50k nodes with sub-10ms response latency.',
      actionText: 'Launch Project Workspace'
    },
    {
      id: 'hackathons',
      category: '🏆 Hackathons',
      title: 'National AI & Systems Hackathon 2026',
      difficulty: 'Competitive',
      xpReward: 600,
      tags: ['AI Agents', 'Distributed Systems', 'Live Demo'],
      description: 'Compete in the 48-hour challenge building autonomous multi-agent developer workflows.',
      actionText: 'Register Team / Enter'
    },
    {
      id: 'certifications',
      category: '📜 Industry Certifications',
      title: 'AWS Certified Solutions Architect & C++ Expert',
      difficulty: 'Professional',
      xpReward: 400,
      tags: ['Cloud Architecture', 'Security', 'Scalability'],
      description: 'Fast-track voucher and mock assessment series to validate enterprise cloud architecture skills.',
      actionText: 'Take Diagnostic Mock'
    },
    {
      id: 'research',
      category: '🔬 Research Opportunities',
      title: 'Survey on Memory-Efficient Dynamic Programming',
      difficulty: 'Academic',
      xpReward: 450,
      tags: ['Latex', 'Paper Reading', 'Empirical Study'],
      description: 'Collaborate with university lab on space-reduction heuristics in bioinformatics sequence alignment.',
      actionText: 'View Paper Draft'
    },
    {
      id: 'comp-prog',
      category: '🧠 Competitive Programming',
      title: 'Codeforces Div 1 & ICPC Regional Mock Series',
      difficulty: 'Hard',
      xpReward: 300,
      tags: ['Segment Trees', 'FFT', 'Game Theory'],
      description: 'Daily timed sprint problems targeting 2100+ rating tier with detailed editorial debriefs.',
      actionText: 'Solve Problem of the Day'
    },
    {
      id: 'mentoring',
      category: '👥 Peer Mentoring & Leadership',
      title: 'Lead C Programming Foundations Study Circle',
      difficulty: 'Leadership',
      xpReward: 250,
      tags: ['Mentorship', 'Code Review', 'Leadership Badge'],
      description: 'Host a weekly 30-min code review session helping late-bloomer peers resolve parameter passing bugs.',
      actionText: 'Open Peer Room'
    }
  ];

  return {
    mode: 'Top Performer Mode',
    headline: 'Beyond the Syllabus',
    subheadline: 'You have consistently exceeded standard benchmarks (92%). Basic lessons have been bypassed in favor of industry, research, and innovation tracks.',
    categories: beyondSyllabusCategories,
    unlockedTier: 'Tier 5: Innovation & Research',
    nextLevelTarget: 'Tier 6: Published Paper & Industry Fellow'
  };
}
