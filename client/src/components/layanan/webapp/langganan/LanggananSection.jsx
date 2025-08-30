import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LanggananCards from "./langganan-cards/LanggananCards";

function LanggananSection() {

    useEffect(() => {
        AOS.init();
      }, []);
      
  return (
    <div className=" flex flex-col  bg-serviceSection w-full   2xl:max-w-[1600px] lg:mt-[160px] px-[10px] lg:px-0  gap-[52px] bg-cover h-full xl:h-[1000px] items-center relative xl:overflow-y-visible mt-[60px] ">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="flex flex-col items-center justify-center  mt-[80px] gap-[16px] w-full lg:w-[564px] mb-0 sm:mb-[52px]"
      >
        <h1 className="text-[22px] md:text-[35px] lg:text-[40px] font-bold  text-center leading-[32px] md:leading-[44px] lg:leading-[60px] text-whiteSmoke500">
          Pilih Paket yang Paling Sesuai <br/>
          dengan Kebutuhanmu
        </h1>
        </div>
            <LanggananCards bestOffer={true}/>
    </div>
  )
}

export default LanggananSection