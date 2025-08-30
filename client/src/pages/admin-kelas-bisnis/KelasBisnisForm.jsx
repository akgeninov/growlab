import KelasBisnisFormSection from "../../components/admin-kelas-bisnis/main-section/kelas-bisnis-form/KelasBisnisFormSection";
import AdminSidebar from "../../components/global-component/admin-sidebar/AdminSidebar";
import { useParams } from "react-router-dom";

function KelasBisnisForm() {
  const { id } = useParams();

  return (
    <div className="flex">
      <AdminSidebar />
      <KelasBisnisFormSection id={id} />
    </div>
  );
}

export default KelasBisnisForm;
