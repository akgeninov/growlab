import AdminSidebar from "../../components/global-component/admin-sidebar/AdminSidebar";
import ArtikelFormSection from "../../components/admin-artikel/main-section/artikel-form/ArtikelFormSection";

function ArtikelForm() {
  return (
    <div className="flex">
      <AdminSidebar />
      <ArtikelFormSection />
    </div>
  );
}

export default ArtikelForm;
