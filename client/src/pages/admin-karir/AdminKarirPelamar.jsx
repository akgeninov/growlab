import React from 'react'
import Pelamar from '../../components/admin-karir/pelamar/Pelamar'
import AdminSidebar from '../../components/global-component/admin-sidebar/AdminSidebar'
import AdminTopbar from '../../components/global-component/admin-topbar/AdminTopbar'

function AdminKarirPelamar() {
  return (
    <div className="flex flex-row min-[320px]:max-md:flex-col min-[320px]:max-md:items-center ">
      <AdminSidebar />
      <AdminTopbar />
      <Pelamar />
    </div>
  )
}

export default AdminKarirPelamar