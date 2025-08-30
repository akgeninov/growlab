import React from 'react';
import { icon } from "../../../../../constants";
import ButtonBorderWhitesmoke500 from '../../../../global-component/button/button-borderwhitesmoke500/ButtonBorderWhitesmoke500';
import ButtonBlack500 from '../../../../global-component/button/button-black500/ButtonBlack500';
import LanggananButtonBlack from './LanggananButtonBlack';

//untuk dua kondisi
function CardsData({ jenisPaket, hargaNormal, hargaDiskon, benefit, bestOffer }) { 
    const cardStyle = bestOffer?"bg-[#F4F4F4] text-black":"bg-[#3F4041] text-white";
    const iconCheck = bestOffer? icon.checkBlackSolid : icon.checkWhiteSolid;
    const iconColor = bestOffer? "#5E5F60" : "#DEDEDE";
    const ButtonType = bestOffer? LanggananButtonBlack:ButtonBorderWhitesmoke500;

  return (
    //card
    <div className={`${cardStyle} relative flex flex-col  rounded-lg  h-full min-h-[536px]  w-full min-w-[200px] md:min-w-[400px] lg:min-w-[250px] xl:min-w-[344px]  px-[30px] py-[30px] `}>
      {bestOffer && ( 
            //label best offer
            <div className="absolute top-[-15px] bg-[#417496] w-[130px] min-[425px]:w-[189px] lg:w-[150px] xl:w-[189px] left-1/2 transform -translate-x-1/2 flex justify-center items-center px-2 py-1 rounded-full">
                <img src={icon.crownsolid} alt="Crown" className=" w-4 h-4 mr-2 fill-white" />
                <div className=" text-white text-[12px] min-[425px]:text-[16px] lg:text-[14px] xl:text-[16px] ">
                    Best Offer
                </div>
            </div>
            )}
      <h2 className="text-[24px] text-wrap:wrap lg:text-[18px] xl:text-[24px] font-bold text-center mt-[20px] lg:mt-[5px] xl:mt-[20px] ">{jenisPaket}</h2>
      <div className="flex flex-col items-center mt-[20px] mb-[30px] ">

          <p className={`${bestOffer?"text-[#5E5F60]":"text-[#DEDEDE]"} line-through  text-[18px] lg:text-[15px] xl:text-[18px] text-center mb-[10px]`}>{hargaNormal}</p>
          <p className="text-[24px] min-[425px]:text-[32px] lg:text-[24px] xl:text-[32px] font-bold text-center">{hargaDiskon}</p>

      </div>
      <div className="text-[14px] lg:text-[12px] xl:text-[14px] flex flex-col items-left text-left ">
        <p className=" font-bold ">Apa yang akan kamu dapatkan?</p>
            <ul className="mt-4">
                {benefit.map((item, index) => (
                    <li key={index} className="mb-2">
                    <div className="flex flex-row items-center gap-2">
                    <img
                        src={iconCheck}
                        alt="centang"
                        className="object-cover h-3 w-3"
                        style={{ fill:iconColor }}
                    />
                    <span>{item}</span>
                    </div>
                </li>
                ))}
            </ul>
      </div>
      <div className=" bottom-0 flex w-full  justify-center items-center mt-auto py-5" >
        <ButtonType
                  TEXT_BUTTON={"Pilih Paket"}
                  WIDTH={"max-w-[300px]"}
                  HEIGHT={"max-h-[56px]"}
                  RESPONSIF={"flex"}
                />
      </div>
    </div>
  );
}

export default CardsData;