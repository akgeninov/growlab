import { icon } from "../../../constants";
import KelasBisnisCard from "./kelas-bisnis-card/KelasBisnisCard";
import AdminHeader from "../../global-component/admin-header/AdminHeader";
import { useState, useEffect } from "react";
import { api } from "../../../api/api";

function KelasBisnisMainSection() {
  const tambahKelasDummy = {
    id: 0,
    nama: "Tambah Kelas",
    harga: 0,
    images_link: "",
    tipe: "Materi",
    kelas_level: { nama: "Pemula" },
    kelas_regists: [],
  };

  const dummyEl = {
    id: 2,
    nama: "Kelas Dummy",
    harga: 125000,
    images_link: "https://via.placeholder.com/150",
    tipe: "Webinar",
    kelas_level: { nama: "Menengah" },
    kelas_regists: [{}, {}, {}], // 3 pendaftar
  };

  return (
    <div className="w-4/5 flex flex-col grow-0 px-28 py-8">
      <AdminHeader title="List Kelas Bisnis" showSearchBar />
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        {/* Card khusus tambah kelas */}
        <KelasBisnisCard
          isTambahKelasBaru={true}
          el={tambahKelasDummy}
          index={0}
          star={0}
        />

        {/* Dummy cards */}
        <KelasBisnisCard el={dummyEl} index={1} star={0} />
        <KelasBisnisCard el={dummyEl} index={2} star={0.5} />
        <KelasBisnisCard el={dummyEl} index={3} star={1} />
        <KelasBisnisCard el={dummyEl} index={4} star={1.5} />
        <KelasBisnisCard el={dummyEl} index={5} star={2} />
        <KelasBisnisCard el={dummyEl} index={6} star={2.5} />
        <KelasBisnisCard el={dummyEl} index={7} star={3} />
        <KelasBisnisCard el={dummyEl} index={8} star={3.5} />
        <KelasBisnisCard el={dummyEl} index={9} star={4} />
        <KelasBisnisCard el={dummyEl} index={10} star={4.5} />
        <KelasBisnisCard el={dummyEl} index={11} star={5} />
      </div>
    </div>
  );
}

export default KelasBisnisMainSection;
