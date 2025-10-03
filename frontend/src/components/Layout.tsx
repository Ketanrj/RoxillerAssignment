import { Outlet } from "react-router"


type Props = {}

function Layout({}: Props) {
  return (
    <main>
      <h1></h1>
        <Outlet/>
    </main>
  )
}

export default Layout 