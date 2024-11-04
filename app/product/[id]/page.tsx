'use client';
import { getProductByID } from '@/app/action';
import ProductPage from '@/components/ProductPage/page';
import React, { use, useEffect, useState } from 'react'

const Page = ({params}: {params: Promise<{id: string}>}) => {
    const { id } = use(params);
    const [product, setProduct] = useState<Products>();
    useEffect( () => {
        const getProduct = async (id:string) => {
            const data = await getProductByID(parseInt(id));
            //console.log("getproduct: ", data);
            if (data?.prod==null) return;
            setProduct(data.prod);
        }
        getProduct(id);
    }, []);
    console.log("Page: ", product);
  return (
    <>
        
        {product && <ProductPage product={product}/>}
    </>
  )
}

export default Page