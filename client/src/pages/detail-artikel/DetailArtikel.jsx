import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavigasiArtikel from "../../components/detail-artikel/navigasi-artikel/NavigasiArtikel";
import HeadArtikel from "../../components/detail-artikel/head-artikel/HeadArtikel";
import ShareArtikel from "../../components/detail-artikel/share-artikel/ShareArtikel";
import MainImages from "../../components/detail-artikel/main-images/MainImages";
import ContentArtikel from "../../components/detail-artikel/content-artikel/ContentArtikel";

function DetailArtikel() {
  const { title, kategori } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center shrink-0 mb-[60px] md:mb-[160px]">
      <NavigasiArtikel />
      <HeadArtikel />
      <ShareArtikel />
      <MainImages />
      <ContentArtikel />
    </div>
  );
}

export default DetailArtikel;
