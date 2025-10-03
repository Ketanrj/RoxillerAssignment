import { useNavigate } from 'react-router';
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'
import { LogOutIcon } from 'lucide-react';

type Props = {}

const LOGOUT_URL = 'api/auth/logout'

function LogoutButton({ }: Props) {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.post(LOGOUT_URL, {}, {
                headers: {
                    Authorization: auth.token
                }
            })
            if (res.status == 200) {
                console.log(res.data.message);
                navigate('/login')
            }
        } catch (error) {
            console.error('Error in loggin out user', error)
        }
    }

    return (
        <div className='flex w-full justify-center'>
            <button
                onClick={handleLogout}
                className='flex px-4 w-full py-3 gap-2 bg-slate-100 border-t border-b border-slate-300 text-slate-800 text-sm cursor-pointer hover:text-red-500'><LogOutIcon size={20}/>Logout</button>
        </div>
    )
}

export default LogoutButton