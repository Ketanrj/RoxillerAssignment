import { Avatar } from '../components/ui/Avatar'
import InputComponent from '../components/ui/InputComponent'
import { ChevronLeft, Edit2 } from 'lucide-react'
import { Link } from 'react-router'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { z } from 'zod'
import axios from '../api/axios'

export const userSchema = z.object({
    name: z.string().min(2, { message: 'Name Should be at least 4 characters' }).optional(),
    email: z.email({ message: 'Enter Valid Email Address' }).optional(),
})

type Props = {}
const UPDATE_URL = 'api/auth/update'
const PASSWORD_UPDATE_URL = 'api/auth/updatepassword'

type Userdata = z.infer<typeof userSchema>;

function Profilepage({ }: Props) {
    const { auth } = useAuth();
    const [updateData, setupdateData] = useState<Userdata>({
        name: auth.name,
        email: auth.email
    });
    const [password, setPassword] = useState({
        password: auth.password
    });

    
    const handlePasswordChange = async () => {
        try {
            const res = await axios.patch(PASSWORD_UPDATE_URL, password,
                {
                    headers: {
                        Authorization: auth.token,
                    }
                })
            if (res.status == 200) {
                console.log(res.data.message);
            }else{
                console.log('Server Error', res.data.message)
            }
        } catch (error) {
            console.error("Error in updating data", error);
        }
    }

    const handleChange = async () => {
        try {
            const res = await axios.patch(UPDATE_URL, updateData,
                {
                    headers: {
                        Authorization: auth.token,
                    }
                })
            if (res.status == 200) {
                console.log(res.data.message);
            }
        } catch (error) {
            console.error("Error in updating data", error);
        }
    }
    return (
        <section className='flex flex-col items-start mx-8 mt-4'>
            <div className="flex mt-4 ">
                <Link to={auth.role === 'ADMIN' ? '/dashboard' : auth.role === 'NORMAL_USER' ? '/Userstorelistings' : '/Ownerdashboard' }>
                    <button className='flex font-normal border border-gray-200 text-shadow-2xs transition duration-300 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 px-2 py-1 rounded-lg cursor-pointer hover:text-gray-700 text-gray-600 items-center gap-0.5'><ChevronLeft />Home</button>
                </Link>
            </div>
            <section className="flex flex-col max-w-4xl w-full border rounded-xl border-gray-200 text-gray-900 p-4 gap-2 my-4 ">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between w-full border-b-1 border-gray-200 py-2">
                    <div>
                        <h2 className="text-xl font-bold">Profile</h2>
                        <p className="text-sm text-gray-600">Settings for your personal profile</p>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-2 py-2">
                        <button className="px-4 py-2 bg-slate-100 text-slate-800 border border-slate-300 rounded-md text-sm cursor-pointer">
                            Cancel
                        </button>
                        <button
                            onClick={handleChange}
                            type='submit'
                            className="px-4 py-2 border border-gray-200 text-shadow-2xs hover:bg-primary-border bg-primary rounded-md text-sm text-white cursor-pointer">
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Avatar Section */}
                <div className="flex flex-wrap items-center gap-4 justify-between py-2">
                    <Avatar
                        size="md"
                        title={auth.name}
                        subtitle={auth.email}
                        role={auth.role}
                    />

                </div>
                {/*Name, Email, Password */}
                <div className="flex flex-wrap items-center gap-4 py-2 justify-between">
                    <InputComponent
                        className='w-full'
                        label='Full Name'
                        required
                        value={updateData?.name}
                        onChange={(e) => setupdateData({ ...updateData, name: e.target.value })}
                    />
                    <InputComponent
                        className='w-full'
                        label='Email'
                        required
                        value={updateData?.email}
                        onChange={(e) => setupdateData({ ...updateData, email: e.target.value })}
                    />
                    <div className="w-full flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="flex flex-wrap items-center gap-2 ">
                            <InputComponent
                                button={true}
                                id='pass'
                                type="password"
                                value={password?.password || ""}
                                className="flex-1 rounded-md outline-none py-2 text-gray-800 focus:border-primary-border focus:outline-0 focus:transition duration-300 ease-in-out  focus:ring-primary-border focus:ring-2 focus:ring-offset-0 sm:text-sm text-sm"
                                onChange={(e) => setPassword({...password, password: e.target.value})}
                            />
                            <button
                            id='pass'
                                type='submit'
                                onClick={handlePasswordChange}
                                className="flex text-sm items-center gap-1 cursor-pointer rounded-md  bg-slate-100 text-slate-800 px-3 border border-slate-300">
                                <Edit2 size={16} />
                                <span className='py-2'>Change Password</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-auto px-4 border border-gray-200 rounded-xl h-full bg-gray-50 py-2">
                    <div className='border-b-1 border-gray-200 pb-2'>
                        <h2 className="text-xl text-red-600 font-bold">Danger Zone</h2>
                        <p className="text-sm text-gray-600">Delete User Account</p>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-2 mt-auto py-2">
                        <p className="flex text-sm text-gray-600">By deleting your account you will lose all your data and access to any workspaces that you are associated with.</p>
                        <button className="px-4 py-2 mt-2 bg-white border border-gray-300 text-shadow-2xs rounded-md text-sm shadow-2xs cursor-pointer">
                            Request account deletion
                        </button>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Profilepage
