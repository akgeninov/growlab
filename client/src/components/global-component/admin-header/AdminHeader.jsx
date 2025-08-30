import AdminProfileDisplay from "../admin-profile-display/AdminProfileDisplay";
import { icon } from "../../../constants";

function AdminHeader({ title, buttonPelamar, showSearchBar }) {
  
  // Fungsi untuk menangani klik pada tombol "Info Semua Pelamar"
  const handleInfoPelamarClick = () => {
    window.location.href = "admin/karir/pelamar";
  };

  return (
    <>
      <AdminProfileDisplay />
      <div className="flex my-12 justify-between items-center max-[769px]:flex-col lg:flex-row md:items-start lg:items-center min-[320px]:max-md:gap-5 min-[320px]:max-md:my-8">
        <p className="text-4xl font-bold min-[320px]:max-md:text-lg min-[320px]:max-md:border border-black min-[320px]:max-md:p-3 min-[320px]:max-md:rounded-xl min-[320px]:max-md:border-b-4 min-[320px]:max-md:border-r-4">{title}</p>
        {buttonPelamar && (
          <div 
            className="flex flex-row w-fit h-fit items-center gap-3 border-2 border-black p-2 rounded-xl min-[320px]:max-md:border-b-4 min-[320px]:max-md:border-r-4 cursor-pointer"
            onClick={handleInfoPelamarClick} // Menambahkan onClick dengan fungsi handleInfoPelamarClick
          >
            <img
              src={icon.people}
              alt="iconpelamar"
              className="w-8 h-8 min-[320px]:max-md:w-6 min-[320px]:max-md:h-6"
            />            
            <p className="font-heebo text-[20px] min-[425px]:max-md:text-[15px] min-[320px]:max-[425px]:text-[14px] font-bold">
              Info Semua Pelamar
            </p>
          </div>
        )}
        {showSearchBar && (
          <div className="w-1/3 min-[320px]:max-lg:w-[100%] lg:w-1/3 max-lg:mt-2 lg:mt-0 h-full p-2 flex border border-black rounded-lg">
            <img src={icon.searchIcon} alt="search" />
            <input
              type="search"
              className="w-full pl-2 bg-transparent focus:outline-none"
              placeholder="Cari"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminHeader;
