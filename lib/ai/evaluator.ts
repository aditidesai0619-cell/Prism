import { CohereClient } from "cohere-ai";
import { ALL_DIMENSIONS, EvaluationResult } from "@/types";

const client = new CohereClient({ token: process.env.COHERE_API_KEY });

const SYSTEM_PROMPT = `You are an expert UPSC (Union Public Service Commission) answer evaluator with 20+ years of experience as a mentor and IAS officer.

You evaluate answers with the precision of a senior UPSC examiner, providing structured, actionable feedback.

When evaluating, always return a valid JSON object with this exact structure:
{
  "score": <number between 0 and 10, can be decimal like 7.5>,
  "strengths": [<2-4 specific strengths as strings>],
  "weaknesses": [<2-4 specific weaknesses as strings>],
  "suggestions": [<3-5 actionable improvement suggestions as strings>],
  "overall_feedback": "<2-3 sentence mentor-level summary>",
  "covered_dimensions": [<dimensions from the list that are addressed in the answer>],
  "missing_dimensions": [<dimensions from the list that are absent but would improve the answer>],
  "ideal_structure": "<A structural outline/framework for an ideal answer to this question. Format as: Intro: [key framing point] | Body: • [key point 1] • [key point 2] • [dimension 1] angle • [dimension 2] angle | Conclusion: [key takeaway]. Keep it to 4-6 bullet points total — this is a skeleton, not a full answer.>",
  "word_economy": "<One specific sentence about whether words were used efficiently relative to the word limit. Example: 'You used 180/200 words but only covered 2 dimensions — redistribute words to address at least 3-4 dimensions.' or 'Excellent economy: 190 words, 5 dimensions covered with no padding.'"
}

Scoring rubric:
- 9-10: Exceptional — comprehensive, well-structured, covers all key dimensions
- 7-8: Good — solid understanding, minor gaps
- 5-6: Average — addresses the question but lacks depth or dimensions
- 3-4: Below average — significant gaps, poor structure
- 1-2: Poor — does not address question adequately

The dimensions to check: ${ALL_DIMENSIONS.join(", ")}

Be honest, specific, and mentor-like. Never be vague. Always cite specific parts of the answer.`;

export async function evaluateAnswer(
  question: string,
  answer: string,
  wordLimit: number
): Promise<EvaluationResult> {
  const actualWordCount = answer.trim().split(/\s+/).length;

  const userMessage = `Question: ${question}

Word Limit: ${wordLimit} words
Actual Word Count: ${actualWordCount} words

Answer:
${answer}

Please evaluate this UPSC answer and return ONLY a JSON object matching the required structure. No additional text before or after the JSON.`;

  const response = await client.chat({
    model: "command-a-03-2025",
    preamble: SYSTEM_PROMPT,
    message: userMessage,
    maxTokens: 1800,
  });

  const text = response.text;

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse AI evaluation response");
  }

  const result = JSON.parse(jsonMatch[0]) as EvaluationResult;

  return {
    score: Math.max(0, Math.min(10, result.score ?? 0)),
    strengths: result.strengths ?? [],
    weaknesses: result.weaknesses ?? [],
    suggestions: result.suggestions ?? [],
    overall_feedback: result.overall_feedback ?? "",
    covered_dimensions: result.covered_dimensions ?? [],
    missing_dimensions: result.missing_dimensions ?? [],
    ideal_structure: result.ideal_structure ?? "",
    word_economy: result.word_economy ?? "",
  };
}
