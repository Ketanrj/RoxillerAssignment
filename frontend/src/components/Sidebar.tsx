import { useEffect, useState } from "react";
import { Link } from "react-router";
import image from '../assets/png.png'
import {
    Home,
    Store,
    User,
} from "lucide-react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import LogoutButton from "./LogoutButton";

const ME_URL = 'api/auth/me'

type User = {
    name: string;
    email: string;
    role: string
}

const Sidebar = () => {
    const [active, setActive] = useState("Home");
    const [user, setUser] = useState<User>()
    const { auth } = useAuth();


    const menuItems = [
        { name: "Home", icon: <Home size={18} />, nav: '/' },
        { name: "Store", icon: <Store size={18} />, nav: '/store' },
        { name: "Users", icon: <User size={18} />, nav: '/user' },
    ];

    useEffect(() => {
        const userDetails = async () => {
            const res = await axios.get(ME_URL, {
                headers: {
                    Authorization: auth.token
                }
            })
            if (res.status != 200) {
                throw new Error('Unable to list store details', res.data);
            }
            return setUser(res.data)
        }

        userDetails();
    }, [])


    return (
        <div className="flex flex-col w-[16rem] h-screen max-h-svh border-r border-slate-200 text-slate-700">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-4 border-b border-b-slate-200">
                <div className="w-8 h-8  rounded-full">
                    <img src={image} alt="" />
                </div>
                <span className="font-semibold text-slate-800">Store</span>
            </div>

            {/* Main Menu */}
            <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
                {/* Top Section */}
                <div className="py-1">
                    {menuItems.map((item) => (
                        <Link key={item.name} to={item.nav}>
                            <button
                                key={item.name}
                                onClick={() => setActive(item.name)}
                                className={`flex w-full cursor-pointer items-center mt-2 px-3 py-2 text-sm font-medium rounded-md transition ${active === item.name
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {item.icon}
                                <span key={item.name} className="px-2">{item.name}</span>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
            {/* Footer */}
            <div className="flex w-full flex-col mt-auto items-center justify-between cursor-pointer">
                {/* Profile */}
                <div className=" border-b border-t w-full items-center justify-center py-2 border-slate-300 my-2">
                    <LogoutButton  />
                </div>
                <div className="flex justify-between gap-3  w-full  py-2 space-y-2 bg-slate-50 ">
                    <div className="border h-fit rounded-full ml-2 text-white bg-slate-400 p-2">
                        <User />
                    </div>


                    <Link to={'/profilepage'}>
                        <div className="flex flex-col gap-0.5 px-2">
                            <div className="flex items-center w-full">
                                <span className="flex text-sm font-medium text-slate-800">
                                    {user?.name}
                                </span>
                                <span className="flex text-xs ml-2 border border-slate-200 bg-slate-100 rounded-md px-2  text-primary">
                                    {user?.role}
                                </span>
                            </div>
                            <span className="text-sm font-medium text-slate-800" >{user?.email}</span>

                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
