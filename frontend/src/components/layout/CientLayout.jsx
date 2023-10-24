import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComp from './header'

export default function CientLayout() {
  return (
    <>
    <HeaderComp/>
    <Outlet/>
    </>
  )
}
