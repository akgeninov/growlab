import React, { useEffect, useState } from "react";

function ContentArtikel() {
  const [artikel, setArtikel] = useState(null);

  useEffect(() => {
    const dataFromStorage = JSON.parse(localStorage.getItem("artikel"));
    if(dataFromStorage) {
      setArtikel(dataFromStorage);
    }
  }, []);
  return (
    <div className="flex flex-col max-w-[358px] md:max-w-[1080px]  w-full px-[5px] xl:px-0 justify-center items-start mt-[52px] ">
      <p className="text-[16px] md:text-[18px] font-light leading-[28px]">
        {artikel?.deskripsi || "Konten tidak tersedia"}
      </p>
    </div>
  );
}

export default ContentArtikel;
