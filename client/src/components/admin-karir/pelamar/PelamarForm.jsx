import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { api } from "../../../api/api";
import AdminHeader from "../../global-component/admin-header/AdminHeader";
import Swal from 'sweetalert2';

function Pelamar() {
  const [pelamarData, setPelamarData] = useState([]);
  const [lowonganData, setLowonganData] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const namaLowongan = params.get('nama_lowongan_pekerjaan');

  useEffect(() => {
    fetchPelamarData();
    fetchLowonganData();
  }, []);

  const fetchLowonganData = async () => {
    try {
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/allLowongan`);
      if (response.data && response.data.data) {
        setLowonganData(response.data.data);
      } else {
        setLowonganData([]);
      }
    } catch (error) {
      console.error("Error fetching lowongan data:", error);
      setLowonganData([]);
    }
  };

  const fetchPelamarData = async () => {
    try {
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/pelamar/allPelamar`);
      if (response.data && response.data.data) {
        setPelamarData(response.data.data);
      } else {
        setPelamarData([]);
      }
    } catch (error) {
      console.error("Error fetching pelamar data:", error);
      setPelamarData([]);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`${process.env.REACT_APP_API_BASE_URL}/pelamar/${id}`);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The pelamar has been deleted.',
        });
        fetchPelamarData(); // Refresh the data after deletion
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an error deleting the pelamar.',
        });
      }
    }
  };

  // Filter pelamar data based on lowongan data
  const filteredPelamarData = pelamarData.filter(pelamar => {
    return pelamar.posisi === namaLowongan;
  });

  return (
    <div className="w-4/5 min-[320px]:max-md:w-[90%] flex flex-col grow-0 px-28 py-8 min-[320px]:max-md:py-2 md:max-lg:px-16 min-[320px]:max-md:px-1">
      <AdminHeader title="Pelamar" />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-50">
            <tr className="border border-gray-300">
              <th scope="col" className="sticky-col-aksi px-2 py-1 text-center uppercase tracking-wider border border-gray-300">Aksi</th>
              <th scope="col" className="sticky-col-no px-2 py-1 text-center uppercase tracking-wider border border-gray-300">No.</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Nama Lengkap</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Email</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Alamat Domisili</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Nomor Telepon</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Tempat, Tanggal Lahir</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Jenis Kelamin</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Status Pendidikan</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Jenjang Pendidikan</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Nama Perguruan Tinggi</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Program Studi</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Pengalaman</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Posisi</th>
              <th scope="col" className="px-6 py-3 text-center uppercase tracking-wider border border-gray-300">Link Form Pendaftaran</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPelamarData.length > 0 ? (
              filteredPelamarData.map((pelamar, index) => (
                <tr key={pelamar.id} className="border border-gray-300">
                  <td className="sticky-col-aksi px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">
                    <button
                      onClick={() => handleDelete(pelamar.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
                  </td>
                  <td className="sticky-col-no px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.nama_lengkap}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.alamat_domisili}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.nomor_telepon}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.tempat_tanggalLahir}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.jenis_kelamin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.status_pendidikan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.jenjang_pendidikan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.nama_perguruanTinggi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.program_studi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.pengalaman}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{pelamar.posisi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">
                    <a
                      href={pelamar.link_form}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                      {pelamar.link_form}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                  Tidak ada data pelamar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pelamar;
