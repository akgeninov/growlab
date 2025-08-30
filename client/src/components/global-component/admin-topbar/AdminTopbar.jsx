import { icon, logo } from "../../../constants";
import { NavLink, useNavigate } from "react-router-dom";
import AdminProfileTop from "../admin-profile-display/AdminProfileTop";

const menus = [
  {
    icon: icon.iconHome,
    label: "Dashboard",
    route: "/admin/dashboard",
  },
  {
    icon: icon.iconCourse,
    label: "Kelas Bisnis",
    route: "/admin/kelas-bisnis",
  },
  {
    icon: icon.iconArticle,
    label: "Artikel",
    route: "/admin/artikel",
  },
  {
    icon: icon.iconKarir,
    label: "Karir",
    route: "/admin/karir",
  },
];

function AdminTopbar() {
  const navigate = useNavigate();

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
    <nav className="h-1/5 w-full bg-white position-fixed sticky top-0 flex flex-col items-center border-r shadow-md md:hidden z-10 min-[320px]:max-lg:rounded-b-3xl border-b-4 border-black ">
      <AdminProfileTop />
      <img
        onClick={iconClickHandler}
        className="w-[50px] h-[50px] my-6 mb-4 shrink-0 cursor-pointer"
        src={logo.growlab}
        alt="growlab"
      />
      <div className="flex w-full px-4 md-max-lg:flex-row justify-between">
        {menus.map((menu) => (
          <NavLink
            to={menu.route}
            key={menu.label}
            className="flex flex-row justify-center items-center m-4 py-2 md:text-[12px] lg:text-[16px] px-3 min-[320px]:max-md:m-2 min-[320px]:max-md:mb-4 "
            style={activeNavHandler}
          >
            <img className="w-[24px]" src={menu.icon} alt={menu.label} />
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default AdminTopbar;
