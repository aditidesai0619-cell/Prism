import { CohereClient } from "cohere-ai";
import { ALL_DIMENSIONS, EssayEvaluationResult } from "@/types";

const client = new CohereClient({ token: process.env.COHERE_API_KEY });

const ESSAY_SYSTEM_PROMPT = `You are a senior UPSC Civil Services essay examiner and mentor with 20+ years of experience.

You evaluate UPSC essay answers with focus on structure, coherence, balance, and multidimensional coverage.

When evaluating, return a valid JSON object with this exact structure:
{
  "score": <number between 0 and 10, can be decimal like 7.5>,
  "strengths": [<2-4 specific strengths as strings>],
  "weaknesses": [<2-4 specific weaknesses as strings>],
  "suggestions": [<3-5 actionable improvement suggestions as strings>],
  "covered_dimensions": [<dimensions from the provided list that are addressed in the essay>],
  "missing_dimensions": [<dimensions from the list absent from the essay>],
  "structure_feedback": "<A paragraph evaluating: 1) Introduction quality — does it set context and thesis clearly? 2) Body structure — are paragraphs logically sequenced? Is there balance between viewpoints? Does each paragraph develop one idea? 3) Conclusion — does it synthesize without mere repetition? Overall flow and coherence assessment.>"
}

Scoring rubric for essays:
- 9-10: Exceptional — compelling thesis, rich multidimensional analysis, balanced perspectives, fluid prose
- 7-8: Good — clear structure, multiple angles covered, minor flow or depth gaps
- 5-6: Average — basic structure present but lacks depth, balance, or coherent flow
- 3-4: Below average — poor structure, one-sided, limited analysis
- 1-2: Poor — disorganized, superficial, off-topic

The 14 dimensions to check: ${ALL_DIMENSIONS.join(", ")}

Be specific and cite actual lines or sections from the essay in your feedback.`;

export async function evaluateEssay(
  topic: string,
  essay: string,
  wordLimit: number
): Promise<EssayEvaluationResult> {
  const actualWordCount = essay.trim().split(/\s+/).length;

  const userMessage = `Essay Topic: ${topic}

Word Limit: ${wordLimit} words
Actual Word Count: ${actualWordCount} words

Essay:
${essay}

Please evaluate this UPSC essay and return ONLY a JSON object matching the required structure. No additional text before or after the JSON.`;

  const response = await client.chat({
    model: "command-a-03-2025",
    preamble: ESSAY_SYSTEM_PROMPT,
    message: userMessage,
    maxTokens: 1800,
  });

  const text = response.text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse AI essay evaluation response");
  }

  const result = JSON.parse(jsonMatch[0]) as EssayEvaluationResult;

  return {
    score: Math.max(0, Math.min(10, result.score ?? 0)),
    strengths: result.strengths ?? [],
    weaknesses: result.weaknesses ?? [],
    suggestions: result.suggestions ?? [],
    covered_dimensions: result.covered_dimensions ?? [],
    missing_dimensions: result.missing_dimensions ?? [],
    structure_feedback: result.structure_feedback ?? "",
  };
}
