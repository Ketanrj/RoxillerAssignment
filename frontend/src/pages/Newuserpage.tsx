import {useState } from "react";
import InputComponent from "../components/ui/InputComponent";
import axios from "../api/axios";
import { useNavigate } from "react-router";

const NEW_USER_URL = 'api/admin/user/new'
const ACCESS_TOKEN = 'accessToken';
const token = localStorage.getItem(ACCESS_TOKEN);

type Props = {}

type User = {
    name: string;
    email: string;
    address: string;
    password: string;
    role: string;
}


function Newuserpage({ }: Props) {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        address: '',
        password: '',
        role: '',
    });

    const UserRoles = ['NORMAL_USER', 'ADMIN', 'STORE_OWNER']

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post(NEW_USER_URL, user, {
                headers: { Authorization: token }
            })
            if (res.status !== 400) {
                alert("User Created Successfully")
            }
            navigate('/user');
        } catch (err : any) {
            throw new Error("Error while creating user", err)
        }
    }


    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50">
            <div className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white p-8 shadow shadow-slate-100">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Add a Store</h2>
                    <p className="text-sm text-slate-500">Please enter store details</p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="flex w-full space-x-3">
                        <InputComponent
                            required={true}
                            className="flex-1"
                            value={user?.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            label="Name"
                            placeholder="Store name"
                        />

                        {/* Email */}
                        <InputComponent
                            required={true}
                            className="flex-1"
                            type="email"
                            value={user?.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            label="Email"
                            placeholder="store@email.com"
                        />
                    </div>
                    <div className="flex w-full items-center justify-center space-x-3">
                        {/* Address */}
                        <InputComponent
                            required={true}
                            className="flex-1"
                            value={user?.address}
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                            label="Address"
                            placeholder="123 Street, City"
                        />
                        <div className=" items-center ">
                            <label htmlFor="" className="font-medium">
                                Role
                            </label>
                            <select
                                required={true}
                                className="flex w-[8rem]  h-10 bg-white border border-slate-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={user.role || ""}
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                            >
                                <option value={undefined} className="text-slate-500">
                                    Select Role
                                </option>
                                {UserRoles?.map((role) => (
                                    <option
                                        value={role}
                                        className="text-slate-800"
                                        key={role}
                                    >
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <InputComponent
                            required={true}
                            button={true}
                            type="password"
                            className="flex-1"
                            value={user?.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            label="Password"
                            placeholder="*****"
                        />

                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className={`w-full rounded-xl bg-primary px-4 py-3 text-white font-medium  shadow hover:shadow-sm transition duration-200 cursor-pointer`}
                        >
                            Create Store
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Newuserpage