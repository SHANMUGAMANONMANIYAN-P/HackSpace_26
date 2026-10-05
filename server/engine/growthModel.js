// server/engine/growthModel.js
/**
 * Mathematical Growth Score & Momentum Modeling Engine
 * Calculates multi-dimensional growth beyond simple average marks.
 */

export function calculateGrowthScore(student) {
  const {
    currentScore = 70,
    tests = [],
    consistencyStreak = 5,
    topicMasteryAvg = 65,
    practiceActivityHours = 14,
  } = student;

  // 1. Performance Component (Weight: 25%)
  const performanceFactor = Math.min(100, Math.max(0, currentScore));

  // 2. Improvement Rate / Momentum Component (Weight: 30%)
  // Calculate trajectory slope across tests
  let improvementRate = 0;
  if (tests && tests.length >= 2) {
    const firstScore = tests[0].score;
    const lastScore = tests[tests.length - 1].score;
    const rawDelta = lastScore - firstScore;
    // Normalize delta: +30% improvement gives full 100 points
    improvementRate = Math.min(100, Math.max(0, (rawDelta / 30) * 100));
  } else {
    improvementRate = 50;
  }

  // 3. Consistency Component (Weight: 15%)
  // 14-day streak gives 100 points
  const consistencyFactor = Math.min(100, (consistencyStreak / 14) * 100);

  // 4. Topic Mastery Component (Weight: 20%)
  const topicMasteryFactor = Math.min(100, Math.max(0, topicMasteryAvg));

  // 5. Practice Activity Component (Weight: 10%)
  // 20 hours/month gives 100 points
  const practiceFactor = Math.min(100, (practiceActivityHours / 20) * 100);

  // Weighted formula:
  // G = 0.25*P + 0.30*Imp + 0.15*Cons + 0.20*Mast + 0.10*Prac
  const weightedGrowthScore = Math.round(
    0.25 * performanceFactor +
    0.30 * improvementRate +
    0.15 * consistencyFactor +
    0.20 * topicMasteryFactor +
    0.10 * practiceFactor
  );

  // Calculate percentage momentum
  let momentumPercentage = 0;
  if (tests && tests.length >= 2) {
    const first = tests[0].score;
    const last = tests[tests.length - 1].score;
    momentumPercentage = Math.round(last - first);
  }

  return {
    growthScore: weightedGrowthScore,
    momentumPercentage,
    factors: {
      performance: Math.round(performanceFactor),
      improvementRate: Math.round(improvementRate),
      consistency: Math.round(consistencyFactor),
      topicMastery: Math.round(topicMasteryFactor),
      practiceActivity: Math.round(practiceFactor)
    }
  };
}
