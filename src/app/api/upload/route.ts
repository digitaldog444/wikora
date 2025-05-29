import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file: any = formData.get("file");

  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;
  if (!token || !jwt.verify(token, process.env.SECRET + "")) {
    return NextResponse.json(
      { success: false, error: "Invalid token! Please log in!" },
      { status: 400 }
    );
  }
  const userData = jwt.decode(token);
  if (typeof userData === "string")
    return NextResponse.json({
      success: false,
      error: "Error decoding token!",
    });
  // Success
  let noFile = false;
  if (file == null || !file || !(file instanceof Blob)) {
    noFile = true;
  }

  console.log("file");
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filePath = `./public/uploads/${userData?.userId}/${file.name}`;
  fs.mkdirSync(`./public/uploads/${userData?.userId}`, { recursive: true });
  fs.writeFileSync(filePath, buffer);
  return NextResponse.json({
    success: true,
    path: `/uploads/${userData?.userId}/${file.name}`,
  });
};
