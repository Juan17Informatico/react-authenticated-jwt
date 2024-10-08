import { Outlet } from "react-router-dom"

export const BaseDashBoard = () => {
  return (
    <>
      <div>
          <h1>BaseDashboard</h1>
          <Outlet />
      </div>
    </>
  )
}
