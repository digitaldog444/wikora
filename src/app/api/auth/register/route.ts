import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  let { email, password } = await req.json();
  let user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    return NextResponse.json({ success: false, error: "User already exists!" });
  }
  // User doesn't exist, create
  const hashedPassword = bcrypt.hashSync(password, process.env.SECRET + "");
  await prisma.user.create({ data: { email, password: hashedPassword } });
  return NextResponse.json({ success: true });
};
