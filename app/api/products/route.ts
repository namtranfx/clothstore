import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  const skip = (page - 1) * limit; // Số bài báo cần bỏ qua để đạt tới trang hiện tại

  // Lấy danh sách bài báo với phân trang
  const products = await prisma.products.findMany({
    skip: skip,
    take: limit,
    orderBy: { product_name: 'asc' } // Sắp xếp theo rank nếu cần
  });

  // Đếm tổng số bài báo để tính tổng số trang
  const totalProducts = await prisma.products.count();
  const totalPages = Math.ceil(totalProducts / limit);

  return NextResponse.json({ products, totalPages });
}
interface requestData {
    product_name: string, 
    product_description: string, 
    price: string, 
    quantity: string, 
    category: string, 
    ProductImages: ProductImages[]
}

export async function POST(req: NextRequest) {
    const data: requestData = await req.json();
    //console.log("data post: ", data);
    try {
        const newProduct = await prisma.products.create({
        data: {
            product_name: data.product_name,
            product_description: data.product_description,
            price: parseInt(data.price),
            quantity: parseInt(data.quantity),
            category: data.category,
            ProductImages: {
                create: data.ProductImages.map((img: ProductImages) => ({ image_url: img.image_url })),
            },
        },
        });
        return NextResponse.json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' });
    }
    
};
