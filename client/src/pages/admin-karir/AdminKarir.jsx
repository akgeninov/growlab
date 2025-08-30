import AdminSidebar from "../../components/global-component/admin-sidebar/AdminSidebar";
import AdminKarirSection from "../../components/admin-karir/AdminKarirSection";
import AdminTopbar from "../../components/global-component/admin-topbar/AdminTopbar";

function AdminKarir() {
  return (
    <div className="flex flex-row min-[320px]:max-md:flex-col min-[320px]:max-md:items-center ">
      <AdminSidebar />
      <AdminTopbar />
      <AdminKarirSection />
    </div>
  );
}

export default AdminKarir;