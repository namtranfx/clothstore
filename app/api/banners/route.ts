import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  // Get banner data
  const banners = await prisma.storeInfo.findMany();

  return NextResponse.json({ banners});
}