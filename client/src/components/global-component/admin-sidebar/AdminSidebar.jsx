import { icon, logo } from "../../../constants";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const menusByAccessId = {
  1: [ // accessId 1 = Karir
    { icon: icon.iconHome, label: "Dashboard", route: "/admin/dashboard" },
    { icon: icon.iconKarir, label: "Karir", route: "/admin/karir" },
  ],
  2: [ // accessId 2 = Kelas Bisnis
    { icon: icon.iconHome, label: "Dashboard", route: "/admin/dashboard" },
    { icon: icon.iconCourse, label: "Kelas Bisnis", route: "/admin/kelas-bisnis" },
  ],
  3: [ // accessId 3 = Artikel
    { icon: icon.iconHome, label: "Dashboard", route: "/admin/dashboard" },
    { icon: icon.iconArticle, label: "Artikel", route: "/admin/artikel" },
  ],
  99: [ // Super Admin (lihat semua menu)
    { icon: icon.iconHome, label: "Dashboard", route: "/admin/dashboard" },
    { icon: icon.iconCourse, label: "Kelas Bisnis", route: "/admin/kelas-bisnis" },
    { icon: icon.iconArticle, label: "Artikel", route: "/admin/artikel" },
    { icon: icon.iconKarir, label: "Karir", route: "/admin/karir" },
    { icon: icon.person, label: "List Admin", route: "/admin/list-admin" },
  ],
};

function AdminSidebar() {
  const navigate = useNavigate();

  // Ambil accessId dari localStorage
  const rawAccessId = localStorage.getItem("accessId");
  const accessId =
    rawAccessId === null || rawAccessId === "null"
      ? 99 // kalau null → super admin
      : parseInt(rawAccessId, 10);

  const menus = menusByAccessId[accessId] || [];

  function iconClickHandler() {
    navigate("/admin");
  }

  function activeNavHandler({ isActive }) {
    return {
      fontWeight: isActive ? "700" : "300",
      border: isActive ? "1px solid black" : "",
      boxShadow: isActive
        ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        : "",
      borderRadius: isActive ? "0.5rem" : "",
    };
  }

  return (
    <aside className="w-full md:w-3/12 2xl:w-1/5 md:h-screen md:sticky md:top-0 flex flex-col items-center bg-whiteSmoke500 border-b-2 border-black md:border md:border-gray-300 shadow-md rounded-3xl md:rounded-none">
      <img
        onClick={iconClickHandler}
        className="w-20 md:w-[100px] aspect-square mt-6 md:my-8 shrink-0 cursor-pointer"
        src={logo.growlab}
        alt="growlab"
      />
      <div className="w-full px-4 flex md:block justify-around">
        {menus.map((menu) => (
          <NavLink
            to={menu.route}
            key={menu.label}
            className="flex flex-row justify-center items-center m-4 py-2 px-4 md:px-0"
            style={activeNavHandler}
          >
            <img
              className="w-[24px] md:w-4 lg:w-[24px]"
              src={menu.icon}
              alt={menu.label}
            />
            <p className="hidden md:block ml-2 basis-1/2 text-sm lg:text-base">
              {menu.label}
            </p>
            <img
              className="hidden md:block -rotate-90"
              src={icon.chevronSmallDownLight}
              alt="arrow"
            />
          </NavLink>
        ))}

        {/* Logout button selalu tampil */}
        <NavLink
          to="/cms/login"
          onClick={(e) => {
            e.preventDefault();
            Swal.fire({
              title: "Apakah Anda yakin?",
              text: "Anda akan keluar dari akun ini",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ya, keluar",
              cancelButtonText: "Batal",
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem("token");
                localStorage.removeItem("accessId");
                localStorage.removeItem("username");
                window.location.href = "/cms/login";
              }
            });
          }}
          key="Logout"
          className="flex flex-row justify-center items-center m-4 py-2 px-4 md:px-0"
          style={activeNavHandler}
        >
          <img
            className="w-[24px] md:w-4 lg:w-[24px]"
            src={icon.logout}
            alt="Logout"
          />
          <p className="hidden md:block ml-2 basis-1/2 text-sm lg:text-base">
            Logout
          </p>
          <img
            className="hidden md:block -rotate-90"
            src={icon.chevronSmallDownLight}
            alt="arrow"
          />
        </NavLink>
      </div>
    </aside>
  );
}

export default AdminSidebar;
