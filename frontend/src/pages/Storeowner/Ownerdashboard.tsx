import { ArrowDown, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const OWNER_DASH_URL = '/api/storeowner/dashboard'

type users = {
    name: string;
    rating: number;
}

type Store  = {
    storeName: string;
    address: string;
    averageRating: number;
    users: users[],
    totalRatings: number
}

function Ownerdashboard() {
    const [loading, SetLoading] = useState(true);
    const [storeDetails, setStoreDetails] = useState<Store>();
    const { auth } = useAuth();

    useEffect(() => {
        const getuserList = async () => {
            try {
                const res = await axios.get(OWNER_DASH_URL, {
                    headers: {
                        Authorization: auth?.token
                    }
                })
                if (res.status == 200) {
                    setStoreDetails(res.data);
                    SetLoading(false);
                }
            } catch (error) {
                console.error('Error in fetching user Details', error)
            }
        }
        getuserList();
    },[])

    return (
        <div className="flex h-screen w-full font-satoshi bg-slate-50">
            <div className="flex flex-col w-full">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 px-6 py-4">
                    <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
                </header>

                {/* Content */}
                {loading ? <div className='flex items-center m-auto'><Loader2 className='animate-spin text-primary transition duration-300' /></div>
                    : <main className="flex-1 max-w-xl p-6 overflow-auto">
                        <div className="flex w-full flex-col border border-slate-300 overflow-clip rounded-lg bg-white">
                            <div className="flex w-full justify-start p-2 bg-slate-100 border-b border-slate-300">
                                <p className="text-md px-2 font-normal text-slate-700">Store Details</p>
                            </div>
                            <div className="px-4 py-2">
                                <div className="flex flex-col my-2 mt-2">
                                    <label id="name" className="text-slate-400 text-sm font-normal">Store Name</label>
                                    <h4 id="name" className="text-md font-normal text-slate-700">{storeDetails?.storeName}</h4>
                                </div>
                                <div className="flex flex-col my-2">
                                    <label id="address" className="text-slate-400 text-sm font-normal">Store Address</label>
                                    <h4 id="address" className="text-md font-normal text-slate-700">{storeDetails?.address}</h4>
                                </div>
                                <div className="flex flex-row gap-6 py-2 mt-2">
                                    <div className="flex flex-col">
                                        <label id="rating" className="text-slate-400 text-sm font-normal">Total Users Rated</label>
                                        <h4 id="rating" className="text-md font-medium text-slate-700">{storeDetails?.totalRatings}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-8 justify-between  mt-4">
                            <div className="overflow-x-auto border border-slate-300 rounded-xl overflow-hidden">
                                <table className="w-full ">
                                    <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Sr.No
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                UserName
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                <div
                                                    className="flex items-center gap-1 cursor-pointer"
                                                // onClick={handleSort}
                                                >
                                                    Rating
                                                    <ArrowDown size={12} className="text-slate-400" />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {storeDetails?.users.map((u, idx) => (
                                            <tr key={u.name} className="hover:bg-slate-50 justify-center">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                {idx+1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                {u.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-slate-900">
                                                {u.rating}
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>}
            </div>
        </div>
    )
}

export default Ownerdashboard


// View a list of users who have submitted ratings for their store.
// See the average rating of their store. 