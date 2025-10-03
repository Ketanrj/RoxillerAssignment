import { useForm, type SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import Login from '../components/Login'
import { useLocation, useNavigate } from 'react-router'
import { LoginSchema } from '../schema/user'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from '../api/axios'
import { isAxiosError } from 'axios'
import useAuth from '../hooks/useAuth'


export type userLogin = z.infer<typeof LoginSchema>
const LOGIN_URL = '/api/auth/login'

type Props = {}

function Loginpage({ }: Props): React.ReactNode {

  const [succesMessage, setsuccessMessage] = useState('');
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<userLogin>(
    { resolver: zodResolver(LoginSchema) }
  )

  const onSubmit: SubmitHandler<userLogin> = async (data) => {
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (response.status == 200) {
        const result = await response.data;
        setsuccessMessage('Logged in SuccessFully')
        setAuth({ name: result.name, email: result.email, role: result.role, token: result.token });
        if (result.role === "ADMIN") navigate("/dashboard", { replace: true });
        else if (result.role === "NORMAL_USER") navigate("/Userstorelistings", { replace: true });
        else if (result.role === "STORE_OWNER") navigate("/ownerdashboard", { replace: true });
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Server Error';
        setError('root', {
          message: errorMessage
        })
      } else {
        setError("root.serverError", { message: "Unexpected server error" });
      }
    }
    return;
  }


  return (
    <div className="">
      <Login succesMessage={succesMessage} register={register} errors={errors} isSubmitting={isSubmitting} handleSubmit={handleSubmit(onSubmit)} />
    </div>
  )
}

export default Loginpage