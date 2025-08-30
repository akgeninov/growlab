import { icon, kelasBisnisPic } from "../../../../constants";
import { Link } from "react-router-dom";

function KelasBisnisCard({ el, index, star, isTambahKelasBaru }) {
    if (isTambahKelasBaru) {
    return (
      <Link
        to="/admin/kelas-bisnis/create"
        className="w-[358px] md:w-[232px] h-[436px] flex flex-col items-center justify-center overflow-hidden rounded-[10px] bg-whiteSmoke500 shadow-customSm hover:bg-gray-100 transition"
      >
        <img
          src={icon.iconAdd}
          alt="tambah"
          className="w-16 h-16 opacity-60"
        />
        <p className="mt-4 text-[18px] font-semibold text-gray-600">Tambah Kelas</p>
      </Link>
    );
  }
  
  let starsArr = new Array(Math.floor(Number(star) * 2)).fill("half");
  starsArr =
    star - Math.floor(Number(star)) > 0 && star - Math.floor(Number(star)) < 0.5
      ? [...starsArr, "half"]
      : [...starsArr];

  return (
    <Link
      to={`/admin/kelas-bisnis/${
        isTambahKelasBaru ? "create" : "edit/" + el.id
      }`}
      key={index}
      className="w-[358px] md:w-[232px] h-[436px] flex flex-col items-center justify-start overflow-hidden rounded-[10px] bg-whiteSmoke500 shadow-customSm"
    >
      <div className="w-full h-[176px] flex justify-center items-center">
        <img
          src={isTambahKelasBaru ? icon.iconAdd : `${el.images_link}`}
          loading="lazy"
          // src={
          //   `${process.env.REACT_APP_SERVER_URL}/kelas/${el.image}` ||
          //   kelasBisnisPic.pic1
          // }
          alt="main"
          className={`object-contain md:flex ${
            el.id === 0 ? "w-1/2 h-1/2" : "w-full h-full"
          }`}
        />
      </div>
      <div className="w-full px-4 flex flex-col items-start gap-[16px]">
        <h1 className="line-clamp-2 text-[18px] font-bold mt-4">{el?.nama ?? "Nama tidak tersedia"}</h1>
        <div className="w-full flex justify-center items-center">
          <div className="w-fit flex md:grid grid-cols-2 gap-x-[8px] md:gap-x-[50px] gap-y-[8px] ">
            <div className="w-max flex items-center gap-1">
              <img
                src={icon.bookOpenSold}
                alt="bok"
                className=" w-[16px] h-[16px]"
              />
              <p className="text-[14px] font-light leading-[20px] shrink-0">
                {el.tipe || "Materi Eksklusif"}
              </p>
            </div>
            <div className=" w-max flex items-center gap-1 ">
              <img src={icon.signal} alt="bok" className="w-[16px] h-[16px]" />
              <p className="text-[14px] font-light leading-[20px] shrink-0">
                {el.kelas_level.nama}
              </p>
            </div>
            <div className=" w-max flex items-center gap-1 ">
              <img
                src={icon.userCircle}
                alt="bok"
                className="w-[16px] h-[16px]"
              />
              <p className="text-[14px] font-light leading-[20px] shrink-0">
                {el.kelas_regists.length} Pendaftar
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start items-center gap-[8px]">
          <div className="rating rating-sm rating-half gap-0">
            {starsArr.length !== 0 ? (
              starsArr.map((star, index) =>
                index % 2 === 0 ? (
                  <input
                    type="radio"
                    key={star + index}
                    className="bg-yellow-500 mask mask-star-2 mask-half-1"
                  />
                ) : (
                  <input
                    type="radio"
                    key={star + index}
                    className="bg-yellow-500 mask mask-star-2 mask-half-2"
                  />
                )
              )
            ) : (
              <>
                <input
                  type="radio"
                  className="bg-slate-200 mask mask-star-2 mask-half-1"
                />
                <input
                  type="radio"
                  className="bg-slate-200 mask mask-star-2 mask-half-2"
                />
              </>
            )}
          </div>
          <p className="text-[14px] font-light leading-[20px] mt-1">
            {star ?? 0}
          </p>
        </div>
        <div className="w-full flex flex-col items-start gap-[4px]">
          {true ? (
            <div className="w-full flex justify-start gap-[2px]">
              <p className="text-[14px] font-light leading-[20px] line-through">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(el.harga)}
              </p>
              <p className="text-[14px] font-medium leading-[20px] text-[#BA0000]">
                {100}%
              </p>
            </div>
          ) : null}
          <p className="text-[22px] font-bold leading-[32px] text-indigoDye500">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(el.harga - (el.harga * 100) / 100)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default KelasBisnisCard;
