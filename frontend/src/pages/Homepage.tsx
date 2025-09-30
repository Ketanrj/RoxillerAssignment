import { Outlet } from "react-router"
import Sidebar from "../components/Sidebar"
import useAuth from "../hooks/useAuth"

type Props = {}

function Homepage({ }: Props) {
  const {auth} = useAuth();

  console.log(auth)
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <section className="w-full h-full flex justify-start">
        <Outlet />
      </section>
    </div>
  )
}

export default Homepage