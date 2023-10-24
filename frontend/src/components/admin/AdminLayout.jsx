import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeaderComp from './AdminHeader'

export default function AdminLayout(props) {
  return (
    <>
    <AdminHeaderComp {...props}/>
    <Outlet/>
    </>
  )
}
