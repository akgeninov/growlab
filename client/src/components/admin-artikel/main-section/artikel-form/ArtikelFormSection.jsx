import { icon } from "../../../../constants";
import { useState, useRef } from "react";
import AdminHeader from "../../../global-component/admin-header/AdminHeader";

function ArtikelFormSection() {
  const bannerRef = useRef();

  function uploadBannerClickHandler() {
    bannerRef.current.click();
  }

  return (
    <div className="w-4/5 flex flex-col grow-0 px-28 py-8">
      <AdminHeader title="Tambah Artikel" />
      <form action="">
        <div className="my-4">
          <p className="font-bold">Judul Artikel</p>
          <input
            type="text"
            className="my-2 w-1/2 h-8 px-2 bg-transparent border border-gray-400 rounded-md"
          />
        </div>
        <div className="my-4">
          <p className="font-bold">Penerbit Artikel</p>
          <input
            type="text"
            className="my-2 w-1/4 h-8 px-2 bg-transparent border border-gray-400 rounded-md"
          />
        </div>
        <div className="my-4">
          <p className="font-bold">Tanggal</p>
          <input
            type="date"
            className="my-2 w-1/6 h-8 px-2 bg-transparent border border-gray-400 rounded-md"
          />
        </div>
        <div className="my-4">
          <p className="font-bold">Gambar Banner</p>
          <input
            type="file"
            accept="image/*"
            ref={bannerRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={uploadBannerClickHandler}
            className="flex flex-col justify-center aspect-video mt-2 mb-6 px-2 w-1/3 border border-gray-400 rounded-md bg-transparent"
          >
            <img
              src={icon.iconUpload}
              alt="upload"
              className="h-1/6 max-h-6 aspect-w-1 aspect-h-1 border-solid self-end"
            />
            <p className="h-2/3 w-full self-center flex items-center justify-center pb-4">
              upload a picture
            </p>
          </button>
        </div>
        <div className="my-4">
          <p className="font-bold">Deskripsi Kelas</p>
          <textarea className="resize-none my-2 w-1/2 h-24 px-2 py-2 bg-transparent border border-gray-400 rounded-md" />
        </div>
      </form>
    </div>
  );
}

export default ArtikelFormSection;
