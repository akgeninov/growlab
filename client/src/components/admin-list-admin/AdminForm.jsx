import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import Swal from "sweetalert2";

const AdminForm = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        roleId: "",
        accessId: "",
    });

    const [roles, setRoles] = useState([]);
    const [access, setAccess] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    // Ambil daftar role
    useEffect(() => {
        fetchRoles();
        fetchAccess();
    }, []);

    const fetchRoles = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get(
                `${process.env.REACT_APP_API_BASE_URL}/roles/getAllRoles`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data && res.data.data) {
                setRoles(res.data.data);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal ambil roles",
                text: error.response?.data?.message || "Terjadi kesalahan",
            });
        }
    };

    const fetchAccess = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await api.get(
                `${process.env.REACT_APP_API_BASE_URL}/access/getAllAccesses`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data && res.data.data) {
                setAccess(res.data.data);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal ambil akses",
                text: error.response?.data?.message || "Terjadi kesalahan",
            });
        }
    };

    // handle input
    const handleChange = (e) => {
        const { name, value } = e.target;

        // khusus roleId & accessId, convert ke number biar sesuai backend
        if (name === "roleId" || name === "accessId") {
            setData({ ...data, [name]: parseInt(value) || "" });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const payload = {
            ...data,
            roleId: data.roleId || null,
            accessId: data.accessId || null,
        };

        console.log("📤 Data dikirim:", payload);

        try {
            const token = localStorage.getItem("token");
            const res = await api.post(
                `${process.env.REACT_APP_API_BASE_URL}/cms/register`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Admin baru berhasil ditambahkan",
            });
            navigate("/admin/list-admin");
        } catch (error) {
            console.log("❌ Error dari backend:", error.response?.data);
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: error.response?.data?.message || "Terjadi kesalahan",
            });
        } finally {
            setIsSaving(false);
        }
    };



    return (
        <div className="w-4/6 2xl:w-4/5 flex flex-col grow-0 px-28 py-8 justify-center">
            <h2 className="text-2xl font-semibold mb-4">Tambah Admin</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nama Admin</label>
                    <input
                        type="text"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Role</label>
                    <select
                        name="roleId"
                        value={data.roleId}
                        onChange={(e) => {
                            handleChange(e);

                            // kalau pilih Super Admin, reset accessId
                            const selectedRole = roles.find((r) => r.id === parseInt(e.target.value));
                            if (selectedRole?.nama_role === "admin_super") {
                                setData((prev) => ({ ...prev, accessId: "" }));
                            }
                        }}
                        required
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Pilih Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.nama_role === "admin"
                                    ? "Admin"
                                    : role.nama_role === "admin_super"
                                        ? "Super Admin"
                                        : role.nama_role}
                            </option>
                        ))}
                    </select>
                </div>

                {roles.find((r) => r.id === data.roleId)?.nama_role === "admin" && (
                    <div>
                        <label className="block mb-1 font-medium">Akses</label>
                        <select
                            name="accessId"
                            value={data.accessId}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">Pilih Akses</option>
                            {access.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.access === "karir"
                                        ? "Karir"
                                        : item.access === "kelas-bisnis"
                                            ? "Kelas Bisnis"
                                            : item.access === "artikel"
                                                ? "Artikel"
                                                : item.access}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/list-admin")}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {isSaving ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminForm;
