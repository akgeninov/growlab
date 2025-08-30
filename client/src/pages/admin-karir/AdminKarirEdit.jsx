import React from 'react'
import KarirForm from '../../components/admin-karir/karir-form/KarirForm'
import AdminSidebar from '../../components/global-component/admin-sidebar/AdminSidebar'
import AdminTopbar from '../../components/global-component/admin-topbar/AdminTopbar'

function AdminKarirEdit() {
  return (
    <div className="flex flex-row min-[320px]:max-md:flex-col min-[320px]:max-md:items-center ">
      <AdminSidebar />
      <AdminTopbar />
      <KarirForm edit={true} />
    </div>
  )
}

export default AdminKarirEdit