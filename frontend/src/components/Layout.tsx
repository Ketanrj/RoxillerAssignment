import { Outlet } from "react-router"


type Props = {}

function Layout({}: Props) {
  return (
    <main>
        <Outlet/>
    </main>
  )
}

export default Layout 