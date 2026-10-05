// server/engine/mistakeAnalyzer.js
/**
 * Mistake Analyzer Engine ("Why am I losing marks?")
 * Dissects recurring mistake clusters and prescribes hyper-targeted micro-drills.
 */

export function analyzeMistakes(student) {
  const { mistakes = [] } = student;

  const enrichedMistakes = mistakes.map(m => {
    let severity = 'Medium';
    let severityColor = 'amber';
    if (m.frequency >= 5) {
      severity = 'High';
      severityColor = 'rose';
    } else if (m.frequency <= 2) {
      severity = 'Low';
      severityColor = 'emerald';
    }

    return {
      id: m.id,
      topic: m.topic,
      errorPattern: m.errorPattern,
      frequency: m.frequency,
      severity,
      severityColor,
      rootCause: m.rootCause || 'Conceptual gap in memory model or loop scope mechanics',
      sampleSnippet: m.sampleSnippet || 'void swap(int a, int b) { int t = a; a = b; b = t; } // Pass by value error',
      recommendedPractice: m.recommendedPractice || `Solve 5 focused practice exercises on ${m.topic}`,
      estimatedTimeToFix: `${m.frequency * 6} mins`,
      impactOnScore: `+${Math.min(15, m.frequency * 3)}% estimated score recovery`
    };
  });

  const totalMistakesLogged = mistakes.reduce((acc, m) => acc + m.frequency, 0);
  const primaryCulprit = enrichedMistakes.sort((a, b) => b.frequency - a.frequency)[0] || {
    topic: 'Functions',
    errorPattern: 'Parameter passing by value instead of reference',
    recommendedPractice: 'Practice 5 parameter-passing problems before moving forward.'
  };

  return {
    headline: 'Why am I losing marks?',
    summary: `System detected ${totalMistakesLogged} errors across ${enrichedMistakes.length} distinct recurring patterns.`,
    primaryCulprit,
    mistakesList: enrichedMistakes
  };
}
