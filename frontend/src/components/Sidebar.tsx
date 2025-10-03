import { useState } from "react";
import { Link } from "react-router";
import image from '../assets/png.png'
import {
    Home,
    Store,
    User,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import LogoutButton from "./LogoutButton";
import { Avatar } from "./ui/Avatar";




const Sidebar = () => {
    const [active, setActive] = useState("Home");
    const { auth } = useAuth();

    const menuItems = [
        { name: "Home", icon: <Home size={18} />, nav: '/dashboard', role: "ALL" },
        { name: "Store", icon: <Store size={18} />, nav: '/store', role: "ADMIN" },
        { name: "Users", icon: <User size={18} />, nav: '/user', role: "ADMIN" },
    ];


    return (
        <div className="flex flex-col w-xs h-screen max-h-svh border-r border-slate-200 text-slate-700">
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
                        <Link key={item.name} to={auth.role == 'ADMIN' ? item.nav : auth.role === 'NORMAL_USER' ? '/Userstorelistings' : '/Ownerdashboard'}>
                            {item.role === auth.role || item.role == "ALL" ? <button
                                key={item.name}
                                onClick={() => setActive(item.name)}
                                className={`flex w-full cursor-pointer items-center mt-2 px-3 py-2 text-sm font-medium rounded-md transition ${active === item.name
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {item.icon}
                                <span key={item.name} className="px-2">{item.name}</span>
                            </button> : ''}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex justify-center py-2 mb-1">
                <LogoutButton />
            </div>
            {/* Footer */}
            <Link to={'/profilepage'}>           
            <div className="flex w-full items-center justify-between py-2 cursor-pointer  px-2 bg-slate-100 border border-slate-300 space-y-2">
                {/* Profile */}
                <div className="flex h-fit justify-between">
                    <Avatar title={auth.name} subtitle={auth.email} role={auth.role} />
                </div>
            </div>
            </Link>
        </div>
    );
};

export default Sidebar;
