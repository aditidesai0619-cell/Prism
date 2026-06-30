import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { evaluateEssay } from "@/lib/ai/essayEvaluator";
import { EssayEvaluationInput } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: EssayEvaluationInput = await request.json();
    const { topic, word_limit, essay_text } = body;

    if (!topic?.trim() || !essay_text?.trim() || !word_limit) {
      return NextResponse.json(
        { error: "Topic, word limit, and essay text are required" },
        { status: 400 }
      );
    }

    const result = await evaluateEssay(topic, essay_text, word_limit);

    const saved = await prisma.essayEvaluation.create({
      data: {
        userId: session.user.id,
        topic: topic.trim(),
        wordLimit: word_limit,
        essayText: essay_text.trim(),
        score: result.score,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        suggestions: result.suggestions,
        coveredDimensions: result.covered_dimensions,
        missingDimensions: result.missing_dimensions,
        structureFeedback: result.structure_feedback,
      },
    });

    const evaluation = {
      id: saved.id,
      user_id: saved.userId,
      topic: saved.topic,
      word_limit: saved.wordLimit,
      essay_text: saved.essayText,
      score: saved.score,
      strengths: saved.strengths,
      weaknesses: saved.weaknesses,
      suggestions: saved.suggestions,
      covered_dimensions: saved.coveredDimensions,
      missing_dimensions: saved.missingDimensions,
      structure_feedback: saved.structureFeedback,
      created_at: saved.createdAt.toISOString(),
    };

    return NextResponse.json({ evaluation }, { status: 200 });
  } catch (error) {
    console.error("Essay evaluation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
