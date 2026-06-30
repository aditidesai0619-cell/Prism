import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 12);
    await prisma.user.create({ data: { email, password: hash } });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[signup] error:", message);
    if (message.includes("ECONNREFUSED") || message.includes("connect") || message.includes("database")) {
      return NextResponse.json(
        { error: "Database connection failed. Check DATABASE_URL in .env.local and run: npx prisma db push" },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: `Server error: ${message}` }, { status: 500 });
  }
}
