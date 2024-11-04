"use client";
import LandingPage from "@/components/LandingPage/page";
import { useEffect, useState } from "react";
import { getLandingData, getProductsByCategory } from "./action";

export default function Home() {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>();
  const [featureProds, setFProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await getLandingData("home");
      const data2 = await getProductsByCategory("featured");
      setStoreInfo((data.PageInfo)[0]);
      setFProducts(data2.prodlist);
    };
    fetchDataAsync();
  }, []);
  return <div>{storeInfo && featureProds && <LandingPage LandingData={storeInfo} featuredProducts={featureProds}/>}</div>;
}
