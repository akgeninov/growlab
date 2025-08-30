import React from 'react'
import PelamarForm from '../../components/admin-karir/pelamar/PelamarForm'
import AdminSidebar from '../../components/global-component/admin-sidebar/AdminSidebar'
import AdminTopbar from '../../components/global-component/admin-topbar/AdminTopbar'

function AdminKarirPelamar() {
  return (
    <div className="flex flex-row min-[320px]:max-md:flex-col min-[320px]:max-md:items-center ">
      <AdminSidebar />
      <AdminTopbar />
      <PelamarForm />
    </div>
  )
}

export default AdminKarirPelamar