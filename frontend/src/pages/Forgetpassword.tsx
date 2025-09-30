import { useState, type FormEventHandler } from 'react'
import { Loader2 } from 'lucide-react';
import InputComponent from '../components/ui/InputComponent';
import axios from '../api/axios';
import { Link } from 'react-router';

type Props = {}

const FORGET_PASS_URL = '/api/auth/forgetPassword'

function Forgetpassword({ }: Props) {
    const [isloading, setisLoading] = useState(true);
    const [isSubmitting, setisSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setisSubmitting(true);   

        try {
            const res = await axios.post(FORGET_PASS_URL, { email }); // 
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
            setisLoading(false);
            setisSubmitting(false); // stop loading 
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 ">
            {isloading ? (
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-slate-50 shadow-sm">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-800 font-stretch-extra-condensed">Forget Password</h2>
                        <p className="text-sm text-slate-400">
                            Please enter your email to <span className="font-medium text-slate-900">Receive Password Reset Link</span>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <InputComponent label="Enter your email" placeholder="john@gmail.com" value={email} onChange={(e) => setEmail(e.target.value )} />
                        <div>
                            <button
                                type="submit"
                                className="w-full text-shadow-2xs rounded-xl justify-items-center bg-primary px-4 py-2 text-white font-medium shadow hover:opacity-90 transition duration-300 cursor-pointer"
                            >
                                {isSubmitting ?
                                    <Loader2 size={20} className="animate-spin" />
                                    : "Get Reset Link"}
                            </button>
                        </div>
                    </form>
                </div>
            ) : <div className='p-4 border-slate-300 rounded-2xl bg-slate-50'>
                <p className='font-medium p-2 text-slate-900'>
                    <Link to={'https://mailtrap.io/home'}>
                        {message}
                    </Link>
                </p>
            </div>}
        </div>
    )
}

export default Forgetpassword