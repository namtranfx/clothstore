import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { StoreInfo } from "@/lib/interface";
import Image from "next/image";

interface HeroProps {
  storeInfo: StoreInfo;
  h: number;
  isHome: boolean;
}
const Hero: React.FC<HeroProps> = ({ storeInfo, h, isHome }) => {
  return (
    <div className="font-DMSans relative items-center flex flex-col mt-12">
      <Image
        width={920}
        height={h}
        src={storeInfo.cover_image_url}
        alt="Hero banner"
        className="w-full rounded-xl"
      />
      <div className="absolute top-[40%] text-white flex flex-col items-center">
        <p className="md:text-[6rem] text-[1.75rem] font-light text-center">
          {storeInfo.store_name}
        </p>
        {isHome && (
          <Link href={"men-clothing"}>
            <Button
              variant={"secondary"}
              className="h-6 mt-2 md:h-10 md:text-[1.5rem] md:mt-4 md:p-4 font-light"
            >
              Buy Now
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
