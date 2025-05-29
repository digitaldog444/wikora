import { PrismaClient } from "@/generated/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const { content, pageId, slug, title } = await req.json();
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
  if (pageId === -1) {
    //Create a new page
    await prisma.page.create({
      data: {
        content,
        slug,
        title,
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    // Update existing page
    // Archive current page
    let page = await prisma.page.findFirst({ where: { pageId } });
    if (!page) {
      // Page doesn't exist!
      let newPage = await prisma.page.create({
        data: {
          slug,
          content,
          title,
        },
      });
      await prisma.edit.create({
        data: {
          content,
          pageId: newPage.pageId,
          userId: userData?.userId,
        },
      });
      return NextResponse.json({ success: true }, { status: 200 });
    }
    // Page exists
    await prisma.archivedPage.create({
      data: {
        content,
        pageId: page.pageId,
        userId: userData?.userId,
      },
    });
    await prisma.page.update({
      where: { pageId: page.pageId },
      data: {
        content,
        slug,
        title,
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  }
};

export const GET = async () => {
  let pages = await prisma.page.findMany();
  return NextResponse.json({ success: true, pages }, { status: 200 });
};
