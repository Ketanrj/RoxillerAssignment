import { useLocation, useNavigate } from "react-router"
import axios from "../../api/axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

type Props = {}

const UPDATE_URL = '/api/user/newrating'

function Addrating({ }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const {auth} = useAuth();
    const [newrating, setRating] = useState(1)
    const { storeId, name, address, rating } = location.state || {};
    const options = [1, 2, 3, 4, 5];

    const handleSubmit = async () => {
        try {
            const res = await axios.post(UPDATE_URL, {storeId, newrating}, {
                headers: {
                    Authorization: auth.token
                }
            });
            if(res.status === 200){
                console.log(res.data.message)
                navigate('/Userstorelistings');
            }
        } catch (error) {
            console.error('Error in updating Rating', error);
        }
    }


    return (
        <div className="w-full max-w-4xl py-1 bg-white font-satoshi">
            <header className="bg-white border-b mx-4 border-slate-200 px-6 py-4">
                <h1 className="text-xl font-semibold text-slate-900">Add Rating to Store</h1>
            </header>
            <main className='flex flex-col mx-auto px-8 py-8'>
                <div className="flex w-full flex-col border border-slate-300 overflow-clip rounded-lg bg-white">
                    <div className="flex w-full justify-start p-2 bg-slate-100 border-b border-slate-300">
                        <p className="text-md px-2 font-normal text-slate-700">Store Details</p>
                    </div>
                    <div className="px-4 py-2">
                        <div className="flex flex-col my-2">
                            <label id="name" className="text-slate-400 text-sm font-normal">Store Name</label>
                            <h4 id="name" className="text-md font-normal text-slate-700">{name}</h4>
                        </div>
                        <div className="flex flex-col my-2">
                            <label id="address" className="text-slate-400 text-sm font-normal">Store Address</label>
                            <h4 id="address" className="text-md font-normal text-slate-700">{address}</h4>
                        </div>
                        <div className="flex flex-row gap-6 py-2 mt-2">
                            <div className="flex flex-col">
                                <label id="rating" className="text-slate-400 text-sm font-normal">Current rating</label>
                                <h4 id="rating" className="text-md font-medium text-slate-700">{rating}</h4>
                            </div>
                            <div className="flex flex-col">
                                <label id="rating" className="text-slate-400 text-sm font-normal">Add rating</label>
                                <select name="rating" id="rating" onChange={(e) => setRating(Number(e.target.value))}>
                                    {options.map((opt) => {
                                        return <option value={opt} key={opt}>{opt}</option>
                                    })}
                                </select>
                            </div>
                            <div className="flex flex-col mt-2">
                                <button type="submit" onClick={handleSubmit} className="px-3 py-1 border border-gray-200 text-shadow-2xs hover:bg-primary-border bg-primary rounded-md text-sm text-white cursor-pointer">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Addrating