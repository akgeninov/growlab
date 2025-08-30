import React from 'react'
import CardsData from './CardsData';

const dataPaket = [
  {
    jenisPaket: "Paket Basic",
    hargaNormal: "Rp 3.000.000",
    hargaDiskon: "Rp 1.990.000",
    benefit: ["Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet"],
    bestOffer: false,
  },
  {
    jenisPaket: "Paket Premium",
    hargaNormal: "Rp 7.000.000",
    hargaDiskon: "Rp 4.990.000",
    benefit: ["Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet"],
    bestOffer: true,
  },
  {
    jenisPaket: "Sesuaikan Dengan Keinginanmu",
    hargaNormal: "",
    hargaDiskon: "Rp 7.000.000",
    benefit: ["Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet"],
    bestOffer: false,
  }
]


function LanggananCards() {
  return (
    <div className={` flex flex-col lg:flex-row  justify-center items-center text-center h-fit max-w-[400px] max-h-[6000px] gap-[50px] lg:gap-[30px] xl:gap-[50px] mb-[50px] px-[30px] min-[375px]:px-[35px] md:px-[30px] `} >
      {dataPaket?.map((item, index) => (
        <CardsData
          key={index}
          jenisPaket={item.jenisPaket}
          hargaNormal={item.hargaNormal}
          hargaDiskon={item.hargaDiskon}
          benefit={item.benefit}
          bestOffer={item.bestOffer}
        />
      ))}
    </div>  
  );
}

export default LanggananCards;
