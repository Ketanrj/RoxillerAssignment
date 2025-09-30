import { useState, type FormEventHandler } from 'react'
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router';
import InputComponent from '../components/ui/InputComponent';
import axios from '../api/axios';
import { Link } from 'react-router';

type Props = {}

// const RESET_PASS_URL = `/api/auth/resetpassword/`

function Resetpassword({ }: Props) {
    const [isLoading, setisLoading] = useState(true);
    const [isSubmitting, setisSubmitting] = useState(false);
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const [passwords, setPassword] = useState({
        password: '',
        confirmpassword: ''
    });

    const { password, confirmpassword } = passwords;

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setisSubmitting(true);

        try {
            const res = await axios.patch(`/api/auth/resetpassword/${token}`, { password, confirmpassword }); // 
            if (res.status === 200) {
                console.log(res.data.message);
                setMessage(res.data.message);
            } else {
                console.log('Server Error', res.data.message);
            }
        } catch (error) {
            console.error("Error in updating data", error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setisSubmitting(false); // stop loading 
            setisLoading(false); // stop loading 
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 ">
            {isLoading ? (
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-slate-50 shadow-sm">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-800 font-stretch-extra-condensed">Reset Password</h2>
                        <p className="text-sm mt-2 text-slate-400">
                            Please enter your New Password<Link to={'/login'}><span className="font-medium mx-1 text-primary">Go Back Login!</span></Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <InputComponent label="Enter Password" type='password' button placeholder="********" value={passwords.password} onChange={(e) => setPassword({ ...passwords, password: e.target.value })} />
                        <InputComponent label="Enter Confirm Password" type='password' button placeholder="********" value={passwords.confirmpassword} onChange={(e) => setPassword({ ...passwords, confirmpassword: e.target.value })} />
                        <div>
                            <button
                                type="submit"
                                className="w-full text-shadow-2xs rounded-xl justify-items-center bg-primary px-4 py-2 text-white font-medium shadow hover:opacity-90 transition duration-300 cursor-pointer"
                            >
                                {isSubmitting ?
                                    <Loader2 size={20} className="animate-spin" />
                                    : "Set Password"}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (<div className='p-4 border-slate-300 rounded-2xl bg-slate-100'>
                <p className='font-medium gap-2'>
                        {message}<Link to={'/login'}> <span className='text-primary font-medium'>Login</span></Link>
                </p>
            </div>)}
        </div>
    )
}

export default Resetpassword;