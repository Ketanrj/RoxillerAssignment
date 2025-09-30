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
        <div className='flex w-full justify-center items-center px-2'>
            <button
                onClick={handleLogout}
                className='flex w-full cursor-pointer items-center mt-2 gap-2 px-3 py-2 text-sm font-medium rounded-md transition text-red-500 bg-red-100'><LogOutIcon size={20}/>Logout</button>
        </div>
    )
}

export default LogoutButton