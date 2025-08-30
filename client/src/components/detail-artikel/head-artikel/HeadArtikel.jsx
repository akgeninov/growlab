import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function HeadArtikel() {
  const { title } = useParams();
  const [dateArtikel, setDateArtikel] = useState(null);
  const [artikel, setArtikel] = useState(null);

  const convertDate = (date) => {
    const dateObject = new Date(date);

    const formattedDate = `${dateObject.getDate()} ${dateObject.toLocaleString(
      "default",
      { month: "long" }
    )} ${dateObject.getFullYear()}`;
    setDateArtikel(formattedDate);
  };

  useEffect(() => {
    const dataFromStorage = JSON.parse(localStorage.getItem("artikel"));

    if (dataFromStorage) {
      setArtikel(dataFromStorage);
      convertDate(dataFromStorage.tanggal);
    }
  }, []);

  return (
    <div className="flex flex-col max-w-[358px] md:max-w-[1080px] px-[5px] xl:px-0  w-full  justify-center items-start mt-[52px] gap-[24px]">
      <h1 className="text-[24px] md:text-[48px] font-bold leading-[36px] md:leading-[72px]">
        {title}
      </h1>
      <div className="gap-[16px] flex items-center justify-start w-full text-[14px] font-light leading-[20px]">
        <p>{dateArtikel ? dateArtikel : "no data"}</p>
        <p className="text-whiteSmoke600">|</p>
        <p>By Growlab Team</p>
      </div>
    </div>
  );
}

export default HeadArtikel;
