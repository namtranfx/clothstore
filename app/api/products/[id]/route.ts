import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);
  if (req.method === "DELETE") {
    try {
      const deletedProduct = await prisma.products.delete({
        where: {
          id: Number(id),
        },
      });
      return NextResponse.json(deletedProduct);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to delete product" });
    }
  } else {
    // res.setHeader('Allow', ['DELETE']);
    // res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

interface requestData {
  product_name: string;
  product_description: string;
  price: string;
  quantity: string;
  category: string;
  ProductImages: ProductImages[];
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data: requestData = await req.json();
  const { id } = params;
  try {
    const updatedProduct = await prisma.products.update({
      where: {
        id: parseInt(id),
      },
      data: {
        product_name: data.product_name,
        product_description: data.product_description,
        price: parseInt(data.price),
        quantity: parseInt(data.quantity),
        category: data.category,
        ProductImages: {
          create: data.ProductImages.map((img: ProductImages) => ({
            image_url: img.image_url,
          })),
        },
      },
    });
    // Xoá tất cả các `ProductImages` cũ liên kết với sản phẩm
    await prisma.productImages.deleteMany({
        where: { product_id: Number(id) },
    });
    // Thêm các `ProductImages` mới
    await prisma.productImages.createMany({
        data: data.ProductImages.map((image: { image_url: string }) => ({
          product_id: Number(id),
          image_url: image.image_url,
        })),
      });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" });
  }
}
