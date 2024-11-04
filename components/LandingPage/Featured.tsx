import React from "react";
import { ProductCard } from "../CustomCard/CustomCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
import { Products } from "@/lib/interface";

interface FeatureProps {
  featureProducts: Products[];
}

const Featured: React.FC<FeatureProps> = ({ featureProducts }) => {
  return (
    <section className="flex flex-col items-center mt-12 font-Outfit">
      <p className="text-[1.5rem] md:text-[3rem] font-normal">Featured</p>
      <ProductList products={featureProducts} />
      <Link href={"/featured"} className="my-16 font-light text-[1.5rem]">
        Shop more...
      </Link>
    </section>
  );
};

export default Featured;
interface ProductListProps {
  products: Products[];
}
export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <>
      <div className="md:col-start-2 md:col-span-4 product-carousel">
        {products?.slice(0, 3).map((product: Products) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Carousel className="md:hidden mt-6 max-w-[16rem]">
        <CarouselContent>
          {products.slice(0, 3).map((product: Products) => (
            <CarouselItem key={product.id}>
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};
