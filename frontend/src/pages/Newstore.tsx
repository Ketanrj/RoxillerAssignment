import { useEffect, useState, type ChangeEvent } from "react";
import InputComponent from "../components/ui/InputComponent";
import axios from "../api/axios";
import { isAxiosError, type AxiosError } from "axios";
import { Navigate, useNavigate } from "react-router";

const OWNER_LIST_URL = 'api/admin/user/ownerlist'
const CREATE_STORE = 'api/admin/store/create'
const token = localStorage.getItem('accessToken')

type Props = {}

type Store = {
    name: string;
    email: string;
    address: string;
    ownerId: string;
}

type StoreOwner = {
    id: string;
    name: string;
}

function Newstore({ }: Props) {
    const [store, setStore] = useState<Store>({
        name: '',
        email: '',
        address: '',
        ownerId: ''
    });

    const navigate = useNavigate();


    const [storeOwner, setStoreOwner] = useState<StoreOwner[]>([]);

    useEffect(() => {
        const getOwnerList = async () => {
            const response = await axios.get(OWNER_LIST_URL, {
                headers: { Authorization: token }
            })
            console.log(response.data);
            if (response.status !== 400) {
                setStoreOwner(response.data.ownerList)
            }
        }
        getOwnerList()
    }, [])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post(CREATE_STORE, store, {
                headers: { Authorization: token }
            })
            if (res.status !== 400) {
                alert("Store Created Successfully")
            }
            navigate('/store');
        } catch (error) {
            console.error(error)
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
                            value={store?.name}
                            onChange={(e) => setStore({ ...store, name: e.target.value })}
                            label="Name"
                            placeholder="Store name"
                        />

                        {/* Email */}
                        <InputComponent
                        required={true}
                            className="flex-1"
                            type="email"
                            value={store?.email}
                            onChange={(e) => setStore({ ...store, email: e.target.value })}
                            label="Email"
                            placeholder="store@email.com"
                        />
                    </div>
                    <div className="flex w-full items-center justify-center space-x-3">
                        {/* Address */}
                        <InputComponent
                        required={true}
                            className="flex-1"
                            value={store?.address}
                            onChange={(e) => setStore({ ...store, address: e.target.value })}
                            label="Address"
                            placeholder="123 Street, City"
                        />
                        <div className=" items-center mt-6">
                            <select
                            required={true}
                                className="flex w-2xs  h-10 bg-white border border-slate-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={store.ownerId || ""}
                                onChange={(e) => setStore({ ...store, ownerId: e.target.value })}
                            >
                                <option value="" className="text-slate-500">
                                    Select a store owner
                                </option>
                                {storeOwner?.map((item) => (
                                    <option
                                        value={item.id}
                                        className="text-slate-800"
                                        key={item.id}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

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

export default Newstore