// server/services/genaiService.js
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || '';
let aiClient = null;

if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Could not initialize Gemini AI client, fallback mode active:', err.message);
  }
}

/**
 * Generates personalized AI Mentor responses grounded in student trajectory
 */
export async function generateMentorAdvice({ student, studentProfile, fingerprint, weakTopics, recentAttempts, userMessage }) {
  const isLateBloomer = fingerprint?.classification?.toLowerCase().includes('late bloomer') || fingerprint?.improvementTrend >= 15;
  const isTopper = studentProfile?.currentScore >= 88 || fingerprint?.classification?.toLowerCase().includes('top performer');

  // Try real Gemini API if key is present
  if (aiClient && apiKey) {
    try {
      const prompt = `You are GrowthMind AI Mentor.
Student Context:
- Name: ${student.name}
- Classification: ${fingerprint?.classification || 'Developing'}
- Current Score: ${studentProfile?.currentScore || 75}%
- Growth Momentum: +${fingerprint?.improvementTrend || 20}%
- Weak Topics: ${weakTopics.map(t => `${t.name} (${t.mastery}%)`).join(', ')}
- Core Goal: ${studentProfile?.goals || 'Master fundamentals'}

Student asks: "${userMessage}"

Provide an encouraging, concise (2-3 paragraphs max), actionable, pedagogical recommendation. If asking what NOT to study, explain prerequisite gaps. If asking why score changed, explain factors based on consistency and mistake control. Do not use generic LMS advice.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response && response.text) {
        return {
          reply: response.text,
          source: 'gemini-2.5-flash',
          suggestedActions: isLateBloomer 
            ? ['Practice Functions Drill (3 Qs)', 'What should I NOT study now?', 'View Recovery Roadmap']
            : ['Explore Graph Algorithms', 'Route Optimization Project', 'View Hackathon Track']
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent heuristic fallback:', err.message);
    }
  }

  // Intelligent context-grounded fallback
  const userMsgLower = (userMessage || '').toLowerCase();
  let reply = '';
  let actions = [];

  if (userMsgLower.includes('not study') || userMsgLower.includes('priority')) {
    const primaryWeak = weakTopics[0]?.name || 'Functions';
    reply = `⚠️ **Smart Learning Priority Alert**: You should **NOT** jump directly into **Advanced AI / Deep Learning** right now. Your prerequisite concepts in **${primaryWeak} (${weakTopics[0]?.mastery || 48}%)** and **Arrays (${weakTopics[1]?.mastery || 52}%)** are still developing. 

Strengthening these core foundations first will eliminate recursion bugs and make advanced algorithms 10x easier to master!`;
    actions = ['Start Functions Drill (3 Qs)', 'View Recovery Plan', 'Explain Parameter Passing'];
  } else if (userMsgLower.includes('why') && (userMsgLower.includes('score') || userMsgLower.includes('change') || userMsgLower.includes('losing'))) {
    reply = `📈 **Why your score shifted (+${fingerprint?.improvementTrend || 28}% Momentum)**:
1. **Daily Habit**: Maintained an active **${studentProfile?.streakDays || 7}-day streak**.
2. **Foundations**: Variables and simple loops mastered at 88%+ accuracy.
3. **Resilience**: Your upward slope proves exceptional grit. You are classified as a **${fingerprint?.classification || 'Late Bloomer – High Growth Potential'}**!`;
    actions = ['View Growth Fingerprint', 'Practice Functions', 'Check Mistakes'];
  } else if (isTopper) {
    reply = `🚀 **Beyond the Syllabus Recommendation**: You have maintained an elite **${studentProfile?.currentScore || 92}% accuracy** across all core modules! 

I recommend bypassing basic revision and tackling **Advanced Graph Algorithms (Dijkstra/Tarjan)** and building the **High-Throughput Route Optimization Engine**!`;
    actions = ['Launch Route Optimization Project', 'Explore Research Paper', 'Register for Hackathon'];
  } else {
    const targetTopic = weakTopics[0]?.name || 'Functions';
    reply = `🎯 **Today's Highest Priority Mission for ${student.name}**:
Focus on **${targetTopic}**. Your current mastery is **${weakTopics[0]?.mastery || 48}%** with recurring parameter passing confusion. 

Spend 20 minutes completing the 3-question diagnostic drill to unlock Step 3 in your Growth Recovery Roadmap!`;
    actions = [`Start ${targetTopic} Drill`, 'What should I NOT study now?', 'Why am I losing marks?'];
  }

  return {
    reply,
    source: 'growthmind-engine',
    suggestedActions: actions
  };
}
