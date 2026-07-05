import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { evaluateAnswer } from "@/lib/ai/evaluator";
import { EvaluationInput } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: EvaluationInput = await request.json();
    const { question, word_limit, answer_text, parent_id, version_number } = body;

    if (!question?.trim() || !answer_text?.trim() || !word_limit) {
      return NextResponse.json(
        { error: "Question, word limit, and answer are required" },
        { status: 400 }
      );
    }

    const result = await evaluateAnswer(question, answer_text, word_limit);

    const saved = await prisma.evaluation.create({
      data: {
        question: question.trim(),
        answerText: answer_text.trim(),
        wordLimit: word_limit,
        score: result.score,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        suggestions: result.suggestions,
        overallFeedback: result.overall_feedback,
        coveredDimensions: result.covered_dimensions,
        missingDimensions: result.missing_dimensions,
        idealStructure: result.ideal_structure,
        wordEconomy: result.word_economy,
        versionNumber: version_number ?? 1,
        parentId: parent_id ?? null,
      },
    });

    const evaluation = {
      id: saved.id,
      question: saved.question,
      answer_text: saved.answerText,
      word_limit: saved.wordLimit,
      score: saved.score,
      strengths: saved.strengths,
      weaknesses: saved.weaknesses,
      suggestions: saved.suggestions,
      overall_feedback: saved.overallFeedback,
      covered_dimensions: saved.coveredDimensions,
      missing_dimensions: saved.missingDimensions,
      ideal_structure: saved.idealStructure,
      word_economy: saved.wordEconomy,
      version_number: saved.versionNumber,
      parent_id: saved.parentId,
      created_at: saved.createdAt.toISOString(),
    };

    return NextResponse.json({ evaluation }, { status: 200 });
  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
