import { useState, useEffect } from 'react';
import { api } from "../../../api/api";
import { format } from 'date-fns';
import { icon } from "../../../constants";
import { Link } from "react-router-dom";

function DataKarirCard({ cardsData, index }) {
  const [departemen, setDepartemen] = useState([]);
  const [periodePekerjaan, setPeriodePekerjaan] = useState([]);
  const [tipePekerjaan, setTipePekerjaan] = useState([]);
  const [jenjangPekerjaan, setJenjangPekerjaan] = useState([]);
  
  useEffect(() => {
    fetchDepartemen();
    fetchPeriodePekerjaan();
    fetchTipePekerjaan();
    fetchJenjangPekerjaan();
  }, []);

  const fetchDepartemen = async () => {
    try {
      // Fetch data departemen
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/departemen`);
      setDepartemen(response.data.data || []); // Menggunakan array kosong sebagai fallback jika response.data.data null/undefined
    } catch (error) {
    }
  };

  const fetchPeriodePekerjaan = async () => {
    try {
      // Fetch data periode pekerjaan
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/periode-pekerjaan`);
      setPeriodePekerjaan(response.data.data || []); // Menggunakan array kosong sebagai fallback jika response.data.data null/undefined
    } catch (error) {
    }
  };
  

  const fetchTipePekerjaan = async () => {
    try {
      // Fetch data tipe pekerjaan
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/tipe-pekerjaan`);
      setTipePekerjaan(response.data.data || []); // Menggunakan array kosong sebagai fallback jika response.data.data null/undefined
    } catch (error) {
    }
  };
  

  const fetchJenjangPekerjaan = async () => {
    try {
      // Fetch data jenjang pekerjaan
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/jenjang-pekerjaan`);
      setJenjangPekerjaan(response.data.data || []); // Menggunakan array kosong sebagai fallback jika response.data.data null/undefined
    } catch (error) {
    }
  };
  

  if (!cardsData || !Array.isArray(cardsData.data)) {
    return null; // or display an error message
  }
  return (
    <div className="flex flex-col gap-5 ">
      {cardsData.data.map((data) => {
      const namaDepartemen = Array.isArray(departemen) && departemen.length > 0
        ? departemen.find(dep => dep.id === data.id_departemen_pekerjaan)?.nama_departemen_pekerjaan || 'Nama Departemen Tidak Ditemukan'
        : 'Departemen Sedang Dimuat...';
            const namaPeriodePekerjaan = periodePekerjaan.find(periode => periode.id === data.id_periode_pekerjaan)?.nama_periode_perkerjaan || 'Nama Periode Pekerjaan Tidak Ditemukan';
            const namaTipePekerjaan = tipePekerjaan.find(tipe => tipe.id === data.id_tipe_pekerjaan)?.nama_tipe__perkerjaan || 'Nama Tipe Pekerjaan Tidak Ditemukan';
            const namaJenjangPekerjaan = jenjangPekerjaan.find(jenjang => jenjang.id === data.id_jenjang_pekerjaan)?.nama_jenjang__pekerjaan || 'Nama Jenjang Pekerjaan Tidak Ditemukan';
            const formattedBatasLamar = format(new Date(data.batas_lamar), 'dd MMMM yyyy');
        
        return (
      <Link
      to={`/admin/karir/edit/${data.id}`}
      key={data.id}
      className="flex justify-start bg-whiteSmoke500 shadow-xl  border-2 border-black rounded-xl relative"
      >
      <div className="w-full px-6 min-[320px]:max-md:px-3 flex flex-row min-[320px]:max-lg:flex-col lg:flex-row items-start my-[16px] min-[320px]:max-lg:gap-5 ">
        <div className="flex flex-col gap-9 min-[320px]:max-lg:gap-5 lg:gap-9 ">
          <div className="flex flex-col gap-[12px] min-[320px]:max-lg:gap-1 ">
            <h1 className="font-heebo text-[22px] font-bold min-[320px]:max-lg:text-[20px] lg:text-[22px] ">
              {data.nama_lowongan_pekerjaan}
            </h1>
            <p className="font-heebo text-[16px] font-semibold text-[#12517C] min-[320px]:max-lg:text-[14px] lg:text-[16px] ">
              {namaDepartemen}
            </p>
          </div>
          <div className="flex flex-row gap-6 min-[320px]:max-lg:gap-2 lg:gap-6 ">
            <div className="flex flex-row gap-2 min-[320px]:max-lg:gap-1 ">
              <img
                src={icon.Briefcase}
                alt="logo-jenjang"
                className="w-5 h-5 min-[320px]:max-[425px]:w-4 min-[320px]:max-[425px]:h-4"
              />
              <p className="font-heebo text-[16px] min-[320px]:max-lg:text-[12px] lg:text-[16px] font-light" >
                {namaJenjangPekerjaan}
              </p>
            </div>
            <div className="flex flex-row gap-2 min-[320px]:max-lg:gap-1 ">
              <img
                src={icon.OfficeBuilding}
                alt="logo-tipe-pekerjaan"
                className="w-5 h-5 min-[320px]:max-[425px]:w-4 min-[320px]:max-[425px]:h-4"
              />
              <p className="font-heebo text-[16px] min-[320px]:max-lg:text-[12px] lg:text-[16px] font-light" >
                {namaTipePekerjaan}
              </p>
            </div>
            <div className="flex flex-row gap-2 min-[320px]:max-lg:gap-1 ">
              <img
                src={icon.UserCircle}
                alt="logo-persyaratan"
                className="w-5 h-5 min-[320px]:max-[425px]:w-4 min-[320px]:max-[425px]:h-4"
              />
              <p className="font-heebo text-[16px] min-[320px]:max-lg:text-[12px] lg:text-[16px] font-light" >
                {namaPeriodePekerjaan}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row inset-y-0 right-0 absolute min-[320px]:max-lg:relative lg:absolute items-center px-9 min-[320px]:max-lg:px-1 lg:px-9 gap-10 min-[320px]:max-lg:gap-2 lg:gap-10 min-[320px]:max-lg:bottom-0 min-[320px]:max-lg:w-full lg:w-fit justify-between ">
          <div className="flex flex-col gap-1">  
            <p className="font-heebo text-[16px] min-[320px]:max-lg:text-[12px] lg:text-[16px] font-light ">Batas Lamar :</p>
            <p className="font-heebo text-[16px] min-[320px]:max-lg:text-[14px] lg:text-[16px] font-semibold">{formattedBatasLamar}</p>
          </div>
          <div  >
            <img
              src={icon.chevronSmallDownLight}
              alt="arrow"
              className="-rotate-90"
            />
          </div>
        </div>
      </div>
      </Link>
    );
  })}
</div>
);
}

export default DataKarirCard;