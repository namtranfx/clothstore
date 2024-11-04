import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface requestData {
  store_name: string;
  cover_image_url: string;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const data: requestData = await req.json();
  const { id } = await params;
  try {
    const updatedBanner = await prisma.storeInfo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        store_name: data.store_name,
        cover_image_url: data.cover_image_url,
      },
    });
    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.error("Error updating Banner:", error);
    return NextResponse.json({ error: "Failed to update banner" });
  }
}
