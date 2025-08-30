import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminProfileDisplay from "../global-component/admin-profile-display/AdminProfileDisplay";

const MainListAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/cms/getAllUser");
      setAdmins(res.data.data || []);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setAdmins([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus admin ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:1000/api/cms/deleteUser/${id}`);
      // setelah delete, refresh data
      fetchAdmins();
      alert("Admin berhasil dihapus");
    } catch (err) {
      console.error("Error deleting admin:", err);
      alert("Gagal menghapus admin");
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-4/6 2xl:w-4/5 flex flex-col grow-0 px-28 py-8">
      <AdminProfileDisplay />
      <div>
        {/* <h3 className="text-2xl text-neutral-400 mb-2">{username}</h3>
        <h2 className="text-3xl ">Hi, {username}</h2> */}
        <div className="flex justify-between my-12">
          <p className="text-4xl font-semibold">Data Admin</p>
          <input
            type="text"
            className="w-[340px] border-2 border-neutral-400 bg-whiteSmoke500 rounded-lg py-1 px-2"
            placeholder="Cari"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button 
          onClick={() => navigate("/admin/add-admin")}
          className="py-1 px-2 bg-greenWhatsapp border border-black rounded-lg"
        >
          + Tambah Data
        </button>

        <div className="overflow-x-auto mt-12">
          <table className="table table-xs border-b border-black">
            <thead>
              <tr className="text-xl font-semibold text-black">
                <th>No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Access</th>
                <th>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin, index) => (
                  <tr key={admin.id}>
                    <th>{index + 1}</th>
                    <td>{admin.username}</td>
                    <td>{admin.email}</td>
                    <td>{admin.roleId}</td>
                    <td></td>
                    <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                    <td className="flex flex-row gap-2">
                      {/* <button className="py-1 px-2 bg-orange-500 text-white">
                        Edit
                      </button> */}
                      <button className="py-1 px-2 bg-red-500 text-white">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Tidak ada data admin
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainListAdmin;
