import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;
  if (!token || !jwt.verify(token, process.env.SECRET + "")) {
    return NextResponse.json(
      { success: false, error: "Invalid token! Please log in!" },
      { status: 400 }
    );
  } else {
    const userData = jwt.decode(token);
    if (typeof userData === "string")
      return NextResponse.json({
        success: false,
        error: "Error decoding token!",
      });
    let user = await prisma.user.findFirst({
      where: { userId: userData?.userId },
      select: {
        email: true,
        userId: true,
      },
    });
    return NextResponse.json({ success: true, user });
  }
};
