import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const prisma = new PrismaClient();

export const GET = async (req: NextRequest, { params }: any) => {
  const { slug } = params;
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  if (!token || token == "") {
    return NextResponse.json(
      { success: false, error: "Invalid token, please log in!" },
      { status: 400 }
    );
  }
  if (!jwt.verify(token, process.env.SECRET + "")) {
    return NextResponse.json(
      { success: false, error: "Invalid Token, please log in!" },
      { status: 400 }
    );
  }
  const userData = jwt.decode(token);
  if (typeof userData === "string") {
    return NextResponse.json(
      { success: false, error: "Error decoding token!" },
      { status: 400 }
    );
  }
  // Token is valid
  let user = await prisma.user.findFirst({
    where: { userId: userData?.userId },
  });
  if (!user) {
    return NextResponse.json({
      success: false,
      error: "Invalid token, please log in",
    });
  }
  if (user.canView) {
    try {
      let page = await prisma.page.findFirst({ where: { slug } });
      return NextResponse.json({ success: true, page }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error }, { status: 400 });
    }
  } else {
    return NextResponse.json({
      success: false,
      error: "You can't view this page!",
    });
  }
};
