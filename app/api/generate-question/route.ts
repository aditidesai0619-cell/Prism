import { NextResponse } from "next/server";
import { CohereClient } from "cohere-ai";

const client = new CohereClient({ token: process.env.COHERE_API_KEY });

const TOPICS = [
  "governance and accountability in India",
  "environment, ecology, and climate change",
  "ethics and integrity in public service",
  "Indian economy and inclusive development",
  "social justice and marginalized communities",
  "science, technology, and innovation policy",
  "India's foreign policy and international relations",
  "internal security and left-wing extremism",
  "agriculture, food security, and rural development",
  "urbanization, infrastructure, and smart cities",
  "education policy and human development",
  "health policy and public health systems",
  "women empowerment and gender equality",
  "federalism and centre-state relations",
  "disaster management and resilience",
  "corruption and anti-corruption mechanisms",
  "constitutional values and democratic institutions",
  "water resources and river management",
];

export async function POST() {
  try {
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

    const response = await client.chat({
      model: "command-a-03-2025",
      message: `Generate one UPSC mains exam style question on the topic: "${topic}". It should be thought-provoking, multidimensional, and analytical (not factual recall). Use a directive: Discuss / Critically examine / Analyze / Evaluate / Comment on. End with a word limit in parentheses, e.g. (150 words) or (250 words). Return ONLY the question, nothing else, no numbering, no explanation.`,
      maxTokens: 120,
    });

    const question = response.text.trim();
    return NextResponse.json({ question, topic });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[generate-question] error:", message);
    return NextResponse.json({ error: "Failed to generate question" }, { status: 500 });
  }
}
