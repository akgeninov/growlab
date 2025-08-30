import React from "react";
import AdminSidebar from "../../components/global-component/admin-sidebar/AdminSidebar";
import AddAdminForm from "../../components/admin-list-admin/AdminForm";

const AddAdmin = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <AddAdminForm />
    </div>
  );
};

export default AddAdmin;
