import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  let { email, password } = await req.json();
  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Invalid Credentials!" },
      { status: 400 }
    );
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.SECRET + ""
    );
    return NextResponse.json({ success: true, token }).cookies.set(
      "jwt",
      token,
      { path: "/" }
    );
  } else {
    return NextResponse.json(
      { success: false, error: "Invalid Credentials!" },
      { status: 400 }
    );
  }
};
