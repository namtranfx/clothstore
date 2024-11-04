import Link from "next/link";
import React from "react";
import AddToCartBtn from "../Button/AddToCartBtn";
import Image from "next/image";
import { Products } from "@/lib/interface";

interface ProductCardProps {
  product: Products;
  custom?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      key={product?.id}
      className="flex flex-col cursor-pointer items-center text-center"
    >
      <Link target="_blank" href={`/product/${product.id}`}>
        <Image
          src={product.ProductImages[0].image_url}
          width={200}
          height={300}
          alt={product.product_name}
          className="w-48 h-[320px] md:h-[480px] object-contain md:w-full relative rounded-xl"
        />
        <p className="mt-6 font-medium text-[1.25rem] md:text-[1.75rem]">
          {product.product_name}
        </p>
        <p className="text-[1.25rem]">${product.price}</p>
      </Link>
      <AddToCartBtn />
    </div>
  );
};
