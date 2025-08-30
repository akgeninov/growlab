import { api } from "../../api/api";
import KarirCard from "./karir-card/KarirCard";
import AdminHeader from "../global-component/admin-header/AdminHeader";
import { icon } from "../../constants";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import KarirForm from "./karir-form/KarirForm";
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css';

function AdminKarirSection() {
  const [dataKarir, setDataKarir] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleEditClick = (data) => {
    setEditData(data);
  };

  const handleAddClick = () => {
    setEditData(null);
    setIsAdding(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/allLowongan`);
        setDataKarir(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      checkNewApplicants();
    }, 10000);

    return () => clearInterval(interval);
  }, [dataKarir]);

  const checkNewApplicants = async () => {
    try {
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/pelamar/allPelamar`);
      const newApplicants = response.data;
      // Compare previous applicant data with new data
      if (newApplicants.length > dataKarir.length) {
        setShowToast(true); // Show toast if there are new applicants
        toast.info('Ada pelamar baru!');
      }
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const handlePelamarButtonClick = () => {
    setShowToast(false); // Hide the toast when the button is clicked
  };

  return (
    <div className="w-full h-full flex justify-center">
      {isAdding ? (
        <KarirForm />
      ) : (
        <div className="w-full min-[320px]:max-md:w-[90%] flex flex-col grow-0 px-28 py-8 min-[320px]:max-md:py-2 md:max-lg:px-16 min-[320px]:max-md:px-1">
          <AdminHeader title="List Lowongan" buttonPelamar={handlePelamarButtonClick} />
          <Link
            onClick={handleAddClick}
            className="flex flex-row justify-start bg-whiteSmoke500 shadow-xl border-2 border-black rounded-xl mb-5 gap-4 min-[320px]:max-md:border-b-4 min-[320px]:max-md:border-r-4"
          >
            <div className="flex flex-row gap-4 my-9 mx-4 items-center">
              <img
                src={icon.iconPlus}
                alt="add"
                className="w-8 h-8 border"
                />
              <div className="flex flex-col gap-2">
                <h1 className="font-heebo text-[22px] min-[320px]:max-md:text-[18px] font-bold">Tambahkan Lowongan</h1>
                <p className="font-heebo text-[16px] font-medium">Deskripsi</p>
              </div>
            </div>
          </Link>
          <div className="flex flex-col gap-4">
            <KarirCard cardsData={dataKarir} onEditClick={handleEditClick} />
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default AdminKarirSection;
