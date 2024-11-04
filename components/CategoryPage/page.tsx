"use client";
import { getLandingData, getProductsByCategory } from "@/app/action";
import { ProductCard } from "../CustomCard/CustomCard";
import Hero from "../LandingPage/Hero";
import { useEffect, useState } from "react";
import { Products, StoreInfo } from "@/lib/interface";

interface ProductListPageProps {
  category: string;
}
const ProductListPage: React.FC<ProductListPageProps> = ({ category }) => {
  const [pageInfo, setPageInfo] = useState<StoreInfo>();
  const [featureProds, setFProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await getLandingData(category);
      const data2 = await getProductsByCategory(category);
      setPageInfo(data.PageInfo[0]);
      setFProducts(data2.prodlist);
    };
    fetchDataAsync();
  }, [category]);
  return (
    <>
      {pageInfo && <Hero storeInfo={pageInfo} h={200} isHome={false} />}
      <div className="md:col-start-2 md:col-span-4 product-carousel">
        {featureProds?.map((product: Products) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};
export default ProductListPage;
