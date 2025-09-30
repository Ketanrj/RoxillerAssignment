import { User } from "lucide-react";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const COUNT_USER_URL = 'api/admin/user/count'

type Usercount = {
    adminUsers: number;
    NormalUsers: number;
    StoreOwners: number;
}

const Usercount = () => {
    const [getcount, setCount] = useState<Usercount>();
    const {auth} = useAuth();

    useEffect(() => {
        const getCount = async () => {
            try {
                const response = await axios.get(COUNT_USER_URL, {
                    headers: {
                        Authorization: auth.token
                    },
                });

                if (response.status == 200) {
                    setCount(response.data);
                    console.log(response.data);
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
        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-2xl shadow-slate-100 cursor-pointer transition-shadow duration-300">
            <div className="flex flex-col justify-between">
                <div className='flex gap-2 mb-2'>
                    <User size={20} className="text-slate-600" />
                    <p className="inline-block text-sm font-medium text-slate-600 mb-2">Total Users</p>
                </div>
                <h3 className="text-3xl font-semibold text-primary mb-4">
                    {((getcount?.NormalUsers || 0) + (getcount?.adminUsers || 0) + (getcount?.StoreOwners || 0)).toLocaleString()}
                </h3>

                {/* User breakdown */}
                <div className="flex justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span>Normal: <span className="text-primary">{getcount?.NormalUsers}</span></span>
                    <span>Admin: <span className="text-primary">{getcount?.adminUsers}</span></span>
                    <span>Owners: <span className="text-primary">{getcount?.StoreOwners}</span></span>
                </div>
            </div>
        </div>
    )
};

export default Usercount