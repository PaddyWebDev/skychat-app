import bcrypt from "bcryptjs";
import prisma from "@/libraries/prismadb";
import { NextRequest, NextResponse } from "next/server";
const { json } = NextResponse;
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!email || !name || !password)
      return json({ message: "Missing Details" }, { status: 422 });

    const HashedPassword = await bcrypt.hash(password, 12);

    const User = await prisma.user.create({
      data: {
        name,
        email,
        password: HashedPassword,
      },
    });

    return json({ User }, { status: 200 });
  } catch (error: any) {
    return json(
      { message: "Internal Server Error", ErrorMessage: error.message },
      { status: 500 }
    );
  }
}
