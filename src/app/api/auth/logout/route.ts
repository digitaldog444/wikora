import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({ success: true }).cookies.delete("jwt");
};
