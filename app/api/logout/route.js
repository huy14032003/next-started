import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req) {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("token", "", { maxAge: 0 });
  return res;
}
