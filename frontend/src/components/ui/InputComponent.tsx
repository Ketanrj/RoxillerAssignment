import { EyeIcon, EyeClosedIcon } from 'lucide-react';
import { useState } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    button?: boolean;
    className?: string;
    autoComplete?: string;
    required?: boolean;
}

const InputComponent = ({ label, button, className, required, ...props }: Props) => {

    const [passwordType, setPasswordType] = useState(false)

    return (
        <div className={`flex flex-col gap-0.5 font-satoshi ${className}`}>
            <div className='flex'> {label &&
                <label className='block text-sm font-semibold text-gray-700'>{label}</label>}
                {required && <span className="text-red-400 mx-0.5">*</span>
                }</div>
            <div className='mt-0 relative'>
                <input {...props} className='w-full relative rounded-lg outline-none border border-gray-300 px-3 py-2 text-gray-800 focus:border-primary-border focus:outline-0 focus:transition duration-300 ease-in-out  focus:ring-primary-border focus:ring-2 focus:ring-offset-0 sm:text-sm' type={passwordType ? `password` : `text`} />
                {button &&
                    <button type='button' className='absolute cursor-pointer p-3 bg-gray-50 border border-gray-200 inset-y-0 right-0 rounded-r-lg flex items-center text-gray-800' onClick={() => setPasswordType(!passwordType)}>
                        {passwordType ? (<EyeClosedIcon />) : (<EyeIcon />)}
                    </button>}
            </div>
        </div>
    )
}

export default InputComponent;