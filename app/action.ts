'use server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function getLandingData(category: string) {
    const PageInfo = await prisma.storeInfo.findMany({
        where: {
            category: category
        }
    })
    
    return {PageInfo};
}

export async function getProductsByCategory(category: string) {
    const prodlist = await prisma.products.findMany({
        where: {
            category: category,
            quantity: {
                gt: 0,
            },
        },
        include: {
            ProductImages: true,
        },
    });
    return {prodlist};
}
export async function getProductByID(id:number) {
    const prod = await prisma.products.findUnique({
        where:{
            id: id,
        },
        include: {
            ProductImages: true,
        },
    })
    return {prod};
}
export async function getBannerByID(id:number) {
    const banner = await prisma.storeInfo.findUnique({
        where: {
            id: id,
        }
    });
    return {banner};
}