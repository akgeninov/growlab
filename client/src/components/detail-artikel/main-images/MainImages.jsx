import React, { useEffect, useState } from "react";

function MainImages() {
  const [artikel, setArtikel] = useState(null);

  useEffect(() => {
      const dataFromStorage = JSON.parse(localStorage.getItem("artikel"));
      if(dataFromStorage) {
        setArtikel(dataFromStorage);
      }
    }, []);
  return (
    <div className="flex max-w-[358px] md:max-w-[1080px]  w-full px-[5px] xl:p-0  justify-center items-center mt-[32px] md:mt-[52px]">
      <img
        src={artikel?.images_link || "/fallback.jpg"}
        alt={artikel?.judul || "main images"}
        className="w-full rounded-[10px] object-cover"
      />
    </div>
  );
}

export default MainImages;
