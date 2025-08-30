// Menggunakan halaman loading
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import HeroSection from "../../../components/one-career-lowongan/HeroSection/HeroSection";
import DetailSection from "../../../components/one-career-lowongan/DetailSection/DetailSection";
import BarSection from "../../../components/one-career-lowongan/BarSection/BarSection";

function PelamarForm() {
    return (
      <div className="flex flex-col justify-center items-center shrink-0">
        <h2>Formulir Pelamar</h2>
        <form>
          {/* Add form fields here */}
        </form>
      </div>
    );
  }
export default PelamarForm;


// Menggunakan Local Storage
// import React , { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { api } from "../../../api/api";
// import HeroSection from "../../../components/one-career-lowongan/HeroSection/HeroSection";
// import DetailSection from "../../../components/one-career-lowongan/DetailSection/DetailSection";

// function OneCareerLowongan() {
//   const { id_lowongan } = useParams();
//   const navigate = useNavigate();

//   const storedLowonganDetail = JSON.parse(localStorage.getItem('lowonganDetail')) || [];
//   const [lowonganDetail, setLowonganDetail] = useState(storedLowonganDetail);

//   useEffect(() => {
//     getLowongan();
//   }, []);

//   const getLowongan = async () => {
//     try {
//       const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/`+id_lowongan)
//       setLowonganDetail(response.data.data);
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem('lowonganDetail', JSON.stringify(lowonganDetail));
//   }, [lowonganDetail]);

//   return (
//     <div className="flex flex-col justify-center items-center shrink-0 ">
//         <HeroSection lowongan = {lowonganDetail}/>
//         <DetailSection lowongan = {lowonganDetail}/>
//     </div>
//   );
//   // return <div>{JSON.stringify(lowonganDetail)}</div>;
// }

// export default OneCareerLowongan;