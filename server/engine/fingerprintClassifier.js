// server/engine/fingerprintClassifier.js
/**
 * Student Growth Fingerprint & Classification Engine
 * Analyzes multi-dimensional trajectory metrics and classifies without punitive labeling.
 */

export function classifyGrowthFingerprint(student) {
  const {
    currentScore = 70,
    tests = [],
    consistencyStreak = 5,
    mistakes = [],
    topics = [],
    challengeHandling = 70
  } = student;

  // Calculate trajectory momentum
  let rawDelta = 0;
  let isMonotonicallyIncreasing = true;
  if (tests && tests.length >= 2) {
    rawDelta = tests[tests.length - 1].score - tests[0].score;
    for (let i = 1; i < tests.length; i++) {
      if (tests[i].score < tests[i - 1].score) {
        isMonotonicallyIncreasing = false;
      }
    }
  }

  // Calculate radar metrics (0-100)
  const metricPerformance = Math.min(100, Math.max(0, currentScore));
  const metricImprovement = Math.min(100, Math.max(0, rawDelta > 0 ? Math.round((rawDelta / 30) * 100) : 20));
  const metricConsistency = Math.min(100, Math.round((consistencyStreak / 14) * 100));
  
  // Mistake pattern score (fewer unresolved repeated errors = higher score)
  const repeatedErrors = mistakes.filter(m => m.frequency >= 3).length;
  const metricMistakeControl = Math.max(20, 100 - repeatedErrors * 20);

  // Topic mastery score
  const avgMastery = topics.length > 0 
    ? Math.round(topics.reduce((acc, t) => acc + t.mastery, 0) / topics.length) 
    : 60;
  const metricTopicMastery = avgMastery;

  const metricChallenge = Math.min(100, Math.max(20, challengeHandling || 65));

  const radarMetrics = [
    { subject: 'Current Performance', value: metricPerformance, fullMark: 100 },
    { subject: 'Improvement Rate', value: metricImprovement, fullMark: 100 },
    { subject: 'Consistency', value: metricConsistency, fullMark: 100 },
    { subject: 'Mistake Control', value: metricMistakeControl, fullMark: 100 },
    { subject: 'Topic Mastery', value: metricTopicMastery, fullMark: 100 },
    { subject: 'Challenge Handling', value: metricChallenge, fullMark: 100 },
  ];

  // Classification Logic
  let classification = 'Developing Learner';
  let badgeColor = 'blue';
  let title = 'Developing Learner';
  let subtitle = 'Building core competencies';
  let explanation = 'You are steadily developing foundational skills and demonstrating steady progress.';
  let growthCategory = 'developing';

  if (currentScore >= 88) {
    classification = 'Top Performer';
    badgeColor = 'purple';
    title = 'High Performer – Beyond Syllabus';
    subtitle = 'Elite Mastery & Innovation Ready';
    explanation = 'You have mastered the core syllabus with high accuracy. Ready for advanced research, real-world systems, and competitive challenges.';
    growthCategory = 'topper';
  } else if (rawDelta >= 20 || (isMonotonicallyIncreasing && rawDelta >= 15)) {
    classification = 'Late Bloomer';
    badgeColor = 'emerald';
    title = 'Late Bloomer – High Growth Potential';
    subtitle = 'Strong Upward Velocity ↑';
    explanation = 'You may not have started at the top, but your consistent improvement (+ ' + rawDelta + '%) proves exceptional resilience and high growth potential.';
    growthCategory = 'late_bloomer';
  } else if (consistencyStreak >= 10 && metricImprovement >= 50) {
    classification = 'Consistent Learner';
    badgeColor = 'cyan';
    title = 'Consistent Learner – High Discipline';
    subtitle = 'Steady & Reliable Progress';
    explanation = 'Your daily practice habits and low error volatility ensure sustained academic momentum.';
    growthCategory = 'consistent';
  } else if (rawDelta >= 10 && currentScore >= 70) {
    classification = 'Fast Learner';
    badgeColor = 'indigo';
    title = 'Fast Learner – Rapid Acumen';
    subtitle = 'Quick Concept Absorption';
    explanation = 'You quickly grasp new abstractions and resolve previous mistakes with minimal repetition.';
    growthCategory = 'fast';
  } else if (currentScore < 50 && rawDelta <= 5) {
    classification = 'Needs Support';
    badgeColor = 'amber';
    title = 'Needs Targeted Guidance';
    subtitle = 'Pacing Adjustment Needed';
    explanation = 'Targeted micro-lessons and prerequisite reinforcement will help unlock steady progress.';
    growthCategory = 'needs_support';
  }

  return {
    classification,
    title,
    subtitle,
    explanation,
    badgeColor,
    growthCategory,
    radarMetrics,
    scores: {
      performance: metricPerformance,
      improvement: metricImprovement,
      consistency: metricConsistency,
      mistakeControl: metricMistakeControl,
      topicMastery: metricTopicMastery,
      challengeHandling: metricChallenge
    }
  };
}
