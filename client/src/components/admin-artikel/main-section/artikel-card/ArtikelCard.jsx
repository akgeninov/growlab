import { icon, newsPic } from "../../../../constants";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

function ArtikelCard({ el, isCreateCard }) {
  if  (isCreateCard){
    return (
      <Link
      to="/admin/artikel/create"
      className="w-[358px] md:w-[232px] h-[380px] flex flex-col items-center justify-start overflow-hidden rounded-[10px] bg-whiteSmoke500 shadow-customSm relative justify-center"
    >
      <div className="flex flex-col items-center text-neutral-600">
          <Plus size={48} />
          <p className="mt-2 text-sm font-medium">Tambah Artikel</p>
        </div>
    </Link>
    );
  }
  return (
    <div className="w-[358px] md:w-[232px] h-[380px] flex flex-col items-center justify-start overflow-hidden rounded-[10px] bg-whiteSmoke500 shadow-customSm relative">
      <img
        src={el.images_link}
        alt={el.judul}
        className="w-full h-full object-cover"
      />
      <div className="h-3/6 absolute bottom-0 w-full bg-neutral-600 text-white p-3">
        <p className="text-xs font-extralight">
          {el.createdAt
            ? new Date(el.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : ""}
        </p>
        <p className="font-bold my-1 line-clamp-2">{el.judul}</p>
        <p className="text-xs font-thin line-clamp-5">{el.deskripsi}</p>
      </div>
    </div>
  );
}

export default ArtikelCard;
