"use client";
import AddToCartBtn from "../Button/AddToCartBtn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { ProductImages, Products } from "@/lib/interface";
import Image from "next/image";
interface ProductPageProps {
  product: Products;
}

const ProductPage: React.FC<ProductPageProps> = (product) => {
  console.log("Product page: ", product);
  return (
    <div className="mt-12 grid md:grid-cols-6 grid-cols-1 text-center items-center">
      <div className="md:col-start-2 md:col-span-3 flex flex-col items-center">
        <ProductPreview product={product.product} />
      </div>
      <div className="mt-12 text-[1.5rem] md:text-[2rem] md:col-start-5 self-start md:text-start">
        <p className="font-semibold">{product.product.product_name}</p>
        <p className="text-[1.5rem]">${product.product.price}</p>
        <p className="font-extralight my-4 text-[1.5rem]">
          {product.product.product_description}
        </p>
        <p className="text-[1.25rem]">Quantity: {product.product.quantity}</p>
        <AddToCartBtn />
      </div>
    </div>
  );
};

export default ProductPage;
interface ProductPreviewProps {
  product: Products;
}
const ProductPreview: React.FC<ProductPreviewProps> = ({ product }) => {
  console.log("product preview: ", product);
  return (
    <Carousel className="mt-6 w-[280px] md:w-[480px]">
      <CarouselContent>
        {product.ProductImages.map((prodimg: ProductImages) => {
          return (
            <CarouselItem key={prodimg.id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-2">
                    <Image
                      src={prodimg.image_url}
                      alt={"product details"}
                      className="h-[320px] md:h-[480px] relative "
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
