import { reviewPic, icon } from "../../../constants";
import { useEffect, useState } from "react";
import AdminHeader from "../../global-component/admin-header/AdminHeader";
import ArtikelCard from "./artikel-card/ArtikelCard";
import { api } from "../../../api/api";

function ArtikelMainSection() {
  const [artikelList, setArtikelList] = useState([]);

  const fetchAllArtikel = async () => {
    try {
      const response = await api.get(
        `${process.env.REACT_APP_API_BASE_URL}/artikel/allArtikel`
      );
      console.log("Fetched artikel list:", response.data.data);
      setArtikelList(response.data.data);
    } catch (error){
      console.error("Gagal mengambil artikel:", error);
    }
  };

  useEffect(() => {
    fetchAllArtikel();
  }, []);

  return (
    <div className="w-4/5 flex flex-col grow-0 px-28 py-8">
      <AdminHeader title="List Artikel" showSearchBar />
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        <ArtikelCard isCreateCard />
        {artikelList.map((el) => (
          <ArtikelCard key={el.id} el={el} />
        ))}
      </div>
    </div>
  );
}

export default ArtikelMainSection;
