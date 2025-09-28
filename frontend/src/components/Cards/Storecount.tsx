import { Store } from "lucide-react";
import axios from "../../api/axios";
import { useEffect, useState } from "react";


const COUNT_USER_URL = 'api/admin/store/count'
const ACCESS_TOKEN = 'accessToken';
const token = localStorage.getItem(ACCESS_TOKEN);



const Storecount = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const getCount = async () => {
            try {
                const response = await axios.get(COUNT_USER_URL, {
                    headers: {
                        Authorization: token
                    },
                });

                if (response.status == 200) {
                    setCount(response.data);
                } else {
                    throw new Error(response.statusText);
                }
            } catch (err: any) {
                throw new Error('Error getting user count', err)
            }
            return;
        }

        getCount();
    }, [])

    return (
        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-2xl shadow-slate-100 cursor-pointer ">
            <div className="flex flex-col justify-between">
                <div className='flex gap-2 mb-2'>
                    <Store size={20} className="text-slate-600" />
                    <p className="inline-block text-sm font-medium text-slate-600 mb-2">Total Stores</p>
                </div>
                <h3 className="text-3xl font-semibold text-primary">{count}</h3>
            </div>
        </div>
    )
};

export default Storecount