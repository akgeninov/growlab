// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { icon } from "../../../constants";
import React, { useState, Suspense } from "react";
import { api } from "../../../api/api";
import AdminHeader from "../../global-component/admin-header/AdminHeader";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw
} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useEffect } from "react";
import toolbarStyles from "../../global-component/admin-toolbar-style/toolbarStyles";
import Swal from 'sweetalert2';


function KarirForm({edit}) {
  const [departemenList, setDepartemenList] = useState([]);
  const [periodePekerjaanList, setPeriodePekerjaanList] = useState([]);
  const [tipePekerjaanList, setTipePekerjaanList] = useState([]);
  const [jenjangPekerjaanList, setJenjangPekerjaanList] = useState([]);
  const [deskripsiState, setDeskripsiState] = useState(EditorState.createEmpty());
  const [persyaratanState, setPersyaratanState] = useState(EditorState.createEmpty());
  const [data, setData] = useState({});
  const [isDataAdded, setIsDataAdded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (edit) {
      fetchDataById();
    }
    fetchDepartemenList();
    fetchPeriodePekerjaanList();
    fetchTipePekerjaanList();
    fetchJenjangPekerjaanList();
  }, [edit]);

  useEffect(() => {
    console.log("Data state has been updated: ", data);
  }, [data]);

  const fetchDataById = async () => {
    const id = window.location.pathname.split('/').pop();
  
    try {
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/${id}`);
  
      if (response.data && response.data.data) {
        const data = response.data.data;
        const formattedDate = new Date(data.batas_lamar).toISOString().split('T')[0];
        data.batas_lamar = formattedDate;
  
        setData(data);

  
        // Ubah string deskripsi_lowongan_pekerjaan menjadi EditorState
        const deskripsiState = EditorState.createWithContent(
          ContentState.createFromText(data.deskripsi_lowongan_pekerjaan)
        );
        setDeskripsiState(deskripsiState);
  
        // Ubah string persyaratan_lowongan_pekerjaan menjadi EditorState
        const persyaratanState = EditorState.createWithContent(
          ContentState.createFromText(data.persyaratan_lowongan_pekerjaan)
        );
        setPersyaratanState(persyaratanState);
  
      } else {
      }
    } catch (error) {
    }
  };
  

  const fetchDepartemenList = async () => {
    try {
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/departemen`);
  
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setDepartemenList(response.data.data);
      } else {
      }
    } catch (error) {
    }
  };
  

  const fetchPeriodePekerjaanList = async () => {
    try {
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/periode-pekerjaan`);
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setPeriodePekerjaanList(response.data.data);
      } else {
      }
    } catch (error) {
    }
  };
  

  const fetchTipePekerjaanList = async () => {
    try {
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/tipe-pekerjaan`);
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setTipePekerjaanList(response.data.data);
      } else {
      }
    } catch (error) {
    }
  };
  

  const fetchJenjangPekerjaanList = async () => {
    try {
      const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/lowongan/jenjang-pekerjaan`);
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setJenjangPekerjaanList(response.data.data);
      } else {
      }
    } catch (error) {
    }
  };
  

  const showDeleteSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Data berhasil dihapus',
      text: 'Silakan Cek Dashboard',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
  
    const id = window.location.pathname.split('/').pop();
  
    try {
      const response = await api.delete(`${process.env.REACT_APP_API_BASE_URL}/lowongan/${id}`);
      // Tampilkan alert bahwa data berhasil dihapus
      Swal.fire({
        icon: 'success',
        title: 'Data berhasil dihapus!',
        text: 'Silakan Cek Dashboard',
        showConfirmButton: false,
        timer: 1500
      });
      setData({});
      setTimeout(() => {
        window.location.href = '/admin/karir'; // Redirect to karir after 5 seconds
      }, 3000);
    } catch (error) {
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleChangeDeskripsi = (newState) => {
    const contentState = newState.getCurrentContent();
    const plainText = contentState.getPlainText();
    setDeskripsiState(newState);
    setData(prevData => ({
      ...prevData,
      deskripsi_lowongan_pekerjaan: plainText
    }));
    console.log("Deskripsi State Updated: ", plainText);
  };

  const handleChangePersyaratan = (newState) => {
    const contentState = newState.getCurrentContent();
    const plainText = contentState.getPlainText();
    setPersyaratanState(newState);
    setData(prevData => ({
      ...prevData,
      persyaratan_lowongan_pekerjaan: plainText
    }));
    console.log("Persyaratan State Updated: ", plainText);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Log final state data before sending
    console.log("Final Data to be Sent: ", data);

    try {
      const response = await api.put(`${process.env.REACT_APP_API_BASE_URL}/lowongan/${data.id}`, data);

      console.log("Server response: ", response);

      setIsSaving(false);
      Swal.fire({
        icon: 'success',
        title: 'Perubahan Telah Disimpan',
        text: 'Silakan Cek Dashboard',
        showConfirmButton: false,
        timer: 1500
      });

      setData({});
      setTimeout(() => {
        window.location.href = '/admin/karir';
      }, 3000);
    } catch (error) {
      console.error("Error saving changes: ", error);
      setIsSaving(false);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan Perubahan',
        text: 'Silakan coba lagi',
        showConfirmButton: true,
      });
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!data.nama_lowongan_pekerjaan || !data.batas_lamar || !data.id_departemen_pekerjaan || !data.id_periode_pekerjaan || !data.id_tipe_pekerjaan || !data.id_jenjang_pekerjaan || !deskripsiState.getCurrentContent().hasText() || !persyaratanState.getCurrentContent().hasText() || !data.link_form_pendaftaran) {
      Swal.fire({
        icon: 'error',
        title: 'Formulir belum lengkap!',
        text: 'Mohon lengkapi semua kolom yang wajib diisi',
      });
      return;
    }

  
  
    const deskripsiPekerjaanJSON = convertToRaw(deskripsiState.getCurrentContent());
    const persyaratanJSON = convertToRaw(persyaratanState.getCurrentContent());
  
    const deskripsiPekerjaanText = deskripsiPekerjaanJSON.blocks.map(block => block.text).join('\n');
    const persyaratanText = persyaratanJSON.blocks.map(block => block.text).join('\n');
    const newData = {
      ...data,
      deskripsi_lowongan_pekerjaan: deskripsiPekerjaanText,
      persyaratan_lowongan_pekerjaan: persyaratanText
    };
  
    try {
      const response = await api.post(`${process.env.REACT_APP_API_BASE_URL}/lowongan/create`, newData);
      setIsDataAdded(true);
      Swal.fire({
        icon: 'success',
        title: 'Lowongan Baru Telah Ditambahkan',
        text: 'Silakan Cek Dashboard',
        showConfirmButton: false,
        timer: 1500
      });
      setData({});
      setTimeout(() => {
        window.location.href = '/admin/karir'; // Redirect to karir after 5 seconds
      }, 3000);
    } catch (error) {
      // Handle error
    }
  };

  const handlePelamar = () => {
    // Misalkan 'data' adalah objek yang berisi informasi termasuk 'nama_lowongan_pekerjaan'
    const linkFormPendaftaran = data.link_form_pendaftaran;
    const namaLowongan = data.nama_lowongan_pekerjaan; // Ambil nilai nama_lowongan_pekerjaan dari 'data'

    if (linkFormPendaftaran && namaLowongan) {
        // Navigasi ke halaman pelamar dengan link form pendaftaran dan query parameter nama_lowongan_pekerjaan
        window.location.href = `admin/karir/pelamar-form?nama_lowongan_pekerjaan=${encodeURIComponent(namaLowongan)}`;
    } else {
        console.error("Link form pendaftaran atau nama lowongan pekerjaan tidak tersedia.");
    }
  };
  
  const isLinkForm = (link) => {
    return link.startsWith('http://') || link.startsWith('https://');
  };
  

  return (
    <div className="w-4/5 min-[320px]:max-md:w-[90%] flex flex-col grow-0 px-28 py-8 min-[320px]:max-md:py-2 md:max-lg:px-16 min-[320px]:max-md:px-1">
      {edit ? 
       <AdminHeader title="Lowongan" /> :

      (
        <AdminHeader title="Tambah Lowongan" />
      )}
      <form action="" onSubmit={handleSubmit} method="post">
        {edit && (
          <div className="flex flex-row gap-5 mb-8 justify-center md:justify-start ">
          <button
            className={`flex flex-row w-fit h-fit items-center gap-3 border-2 border-black p-2 rounded-xl min-[320px]:max-md:border-b-4 min-[320px]:max-md:border-r-4 ${isEditing ? 'bg-[#66E99A]' : ''}`}
            onClick={isEditing ? handleSave : handleEdit}
          >
            <img
              src={isEditing ? icon.iconSave : icon.iconEditSquare}
              alt="icon"
              className="w-8 h-8 min-[320px]:max-md:w-6 min-[320px]:max-md:h-6"
            />
            <p className="font-heebo text-[20px] min-[425px]:max-md:text-[15px] min-[320px]:max-[425px]:text-[14px] font-bold">
              {isEditing ? "Simpan" : "Edit Lowongan"}
            </p>
          </button>
          <button className="flex flex-row w-fit h-fit items-center gap-3 border-2 border-black p-2 rounded-xl min-[320px]:max-md:border-b-4 min-[320px]:max-md:border-r-4" onClick={handleDelete}>
            <img
              src={icon.iconDelete}
              alt="iconedit"
              className="w-8 h-8 min-[320px]:max-md:w-6 min-[320px]:max-md:h-6"
              />            
            <p className="font-heebo text-[20px] min-[425px]:max-md:text-[15px] min-[320px]:max-[425px]:text-[14px] font-bold">
              Hapus Lowongan
            </p>
          </button>
          <button className="flex flex-row w-fit h-fit items-center gap-3 border-2 border-black p-2 rounded-xl min-[320px]:max-md:border-b-4 min-[320px]:max-md:border-r-4" onClick={handlePelamar}>
            <img
              src={icon.people}
              alt="iconpelamar"
              className="w-8 h-8 min-[320px]:max-md:w-6 min-[320px]:max-md:h-6"
              />            
            <p className="font-heebo text-[20px] min-[425px]:max-md:text-[15px] min-[320px]:max-[425px]:text-[14px] font-bold">
              Info Pelamar
            </p>
          </button>
        </div>
        )}

        <div className="my-4">
          <p className="font-heebo text-[20px] min-[425px]:max-md:text-[18px] min-[320px]:max-[425px]:text-[16px] font-bold">Posisi</p>
          <input
            type="text"
            name="nama_lowongan_pekerjaan"
            value={data.nama_lowongan_pekerjaan}
            onChange={handleChange}
            className="my-2 w-full h-8 px-2 bg-transparent border border-gray-400 rounded-md"
            readOnly={!isEditing && edit}
          />
        </div>
        <div className="my-4">
          <p className="font-heebo text-[20px] min-[425px]:max-md:text-[18px] min-[320px]:max-[425px]:text-[16px] font-bold">Batas Lamar</p>
          <input
            type="date"
            name="batas_lamar"
            value={data.batas_lamar}
            onChange={handleChange}
            className="my-2 w-full h-8 px-2 bg-transparent border border-gray-400 rounded-md"
            readOnly={!isEditing && edit}
          />
        </div>
        <div className="my-4">
          <p className="font-heebo text-[20px] min-[425px]:max-md:text-[18px] min-[320px]:max-[425px]:text-[16px] font-bold">Bidang</p>
          <select
          name="id_departemen_pekerjaan"
          value={data.id_departemen_pekerjaan}
          onChange={handleChange}
          className="my-2 w-full h-8 px-2 bg-transparent border border-gray-400 rounded-md"
          disabled={!isEditing && edit}
        >
          <option value="">Pilih Bidang</option>
          {departemenList.map((departemen) => (
            <option key={departemen.id} value={departemen.id}>
              {departemen.nama_departemen_pekerjaan}
            </option>
          ))}
          </select>
        </div>
        <div className="my-4">
          <p className="font-heebo text-[20px] min-[425px]:max-md:text-[18px] min-[320px]:max-[425px]:text-[16px] font-bold">Periode Pekerjaan</p>
          <select
          name="id_periode_pekerjaan"
          value={data.id_periode_pekerjaan}
          onChange={handleChange}
          disabled={!isEditing && edit}
          className="my-2 w-full h-8 px-2 bg-transparent border border-gray-400 rounded-md"
        >
          <option value="">Pilih Periode Pekerjaan</option>
          {periodePekerjaanList.map((periode_pekerjaan) => (
            <option key={periode_pekerjaan.id} value={periode_pekerjaan.id}>
              {periode_pekerjaan.nama_periode_perkerjaan}
            </option>
          ))}
        </select>
        </div>
        <div className="my-4">
          <p className="font-heebo text-[20px] min-[425px]:max-md:text-[18px] min-[320px]:max-[425px]:text-[16px] font-bold">Tipe Pekerjaan</p>
          <select
          name="id_tipe_pekerjaan"
          value={data.id_tipe_pekerjaan}
          onChange={handleChange}
          disabled={!isEditing && edit}
          className="my-2 w-full h-8 px-2 bg-transparent border border-gray-400 rounded-md"
        >
          <option value="">Pilih Tipe Pekerjaan</option>
          {tipePekerjaanList.map((tipe_pekerjaan) => (
            <option key={tipe_pekerjaan.id} value={tipe_pekerjaan.id}>
              {tipe_pekerjaan.nama_tipe__perkerjaan}
            </option>
          ))}
        </select>
        </div>
        <div className="my-4">
          <p className="font-heebo text-[20px] min-[425px]:max-md:text-[18px] min-[320px]:max-[425px]:text-[16px] font-bold">Jenjang Pekerjaan</p>
          <select
          name="id_jenjang_pekerjaan"
          value={data.id_jenjang_pekerjaan}
          onChange={handleChange}
          disabled={!isEditing && edit}
          className="my-2 w-full h-8 px-2 bg-transparent border border-gray-400 rounded-md"
        >
          <option value="">Pilih Jenjang Pekerjaan</option>
          {jenjangPekerjaanList.map((jenjang_pekerjaan) => (
            <option key={jenjang_pekerjaan.id} value={jenjang_pekerjaan.id}>
              {jenjang_pekerjaan.nama_jenjang__pekerjaan
              }
            </option>
          ))}
        </select>
        </div>
        <div className="my-4">
          <p className="font-heebo text-[20px] min-[425px]:max-md:text-[18px] min-[320px]:max-[425px]:text-[16px] font-bold">Deskripsi Pekerjaan</p>
          <div className="resize-none my-2 w-full px-2 py-2 bg-transparent border border-gray-400 rounded-md">
            <Suspense fallback={<div>............</div>}>
            {/* {loaded && ( */}
            <Editor
                editorState={deskripsiState}
                readOnly={!isEditing && edit}
                onEditorStateChange={handleChangeDeskripsi}
                toolbarClassName=""
                toolbarStyle={toolbarStyles}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'history'],
                  textAlign: {
                    inDropdown: true,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: ['left', 'center', 'right', 'justify'],
                    left: { className: undefined },
                    center: { className: undefined },
                    right: { className: undefined },
                    justify: { className: undefined },
                  },
                    inline: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['bold', 'italic', 'underline', 'strikethrough'],
                      bold: { className: undefined },
                      italic: {className: undefined },
                      underline: {className: undefined },
                      strikethrough: {className: undefined },
                    },
                    blockType: {
                      inDropdown: true,
                      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                    },
                    fontSize: {
                      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                    },
                    fontFamily: {
                      options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                    },
                    list: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['unordered', 'ordered'],
                      unordered: {className: undefined },
                      ordered: {className: undefined },
                      indent: {className: undefined },
                      outdent: {className: undefined },
                    },
                    history: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['undo', 'redo'],
                      undo: {className: undefined },
                      redo: {className: undefined },
                    },

                }}
              />
              {/* )} */}
              </Suspense>
          </div>
        </div>
        <div className="my-4">
          <p className="font-heebo text-[20px] min-[425px]:max-md:text-[18px] min-[320px]:max-[425px]:text-[16px] font-bold">Persyaratan</p>
          <div className="resize-none my-2 w-full px-2 py-2 bg-transparent border border-gray-400 rounded-md">
            <Suspense fallback={<div>............</div>}>
            {/* {loaded && ( */}
            <Editor
                editorState={persyaratanState}
                readOnly={!isEditing && edit}
                onEditorStateChange={handleChangePersyaratan}
                toolbarClassName=""
                toolbarStyle={toolbarStyles}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'history'],
                  textAlign: {
                    inDropdown: true,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: ['left', 'center', 'right', 'justify'],
                    left: { className: undefined },
                    center: { className: undefined },
                    right: { className: undefined },
                    justify: { className: undefined },
                  },
                    inline: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['bold', 'italic', 'underline', 'strikethrough'],
                      bold: { className: undefined },
                      italic: {className: undefined },
                      underline: {className: undefined },
                      strikethrough: {className: undefined },
                    },
                    blockType: {
                      inDropdown: true,
                      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                    },
                    fontSize: {
                      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                    },
                    fontFamily: {
                      options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                    },
                    list: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['unordered', 'ordered'],
                      unordered: {className: undefined },
                      ordered: {className: undefined },
                      indent: {className: undefined },
                      outdent: {className: undefined },
                    },
                    history: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['undo', 'redo'],
                      undo: {className: undefined },
                      redo: {className: undefined },
                    },

                }}
              />
              {/* )} */}
              </Suspense>
          </div>
        </div>
        <div className="my-4">
          <p className="font-heebo text-[20px] min-[425px]:max-md:text-[18px] min-[320px]:max-[425px]:text-[16px] font-bold">Link Form Pendaftaran</p>
          <input
            type="text"
            name="link_form_pendaftaran"
            value={data.link_form_pendaftaran}
            onChange={handleChange}
            className="my-2 w-full h-8 px-2 bg-transparent border border-gray-400 rounded-md"
            readOnly={!isEditing && edit}
          />
        </div>
        <div className="flex my-12 justify-center">
          <button
            type="submit"
            className="w-1/4 min-[320px]:max-xl:w-1/2 h-16 bg-whiteSmoke500 rounded-2xl border border-black shadow-xl "
            hidden={edit}
          >
            <p className="font-heebo text-[20px] min-[425px]:max-md:text-[18px] min-[320px]:max-[425px]:text-[16px] font-bold">Submit</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default KarirForm;