import { useState, type ReactNode } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '../schema/user'
import Signup from '../components/Signup'
import { useForm, type SubmitHandler } from 'react-hook-form'
import axios from '../api/axios'
import isAxiosError from 'axios'
import Container from '../components/Container'


export type User = z.infer<typeof userSchema>
const REGISTER_URL = '/api/auth/signup'


export default function Signuppage(): ReactNode {
  const [succesMessage, setsuccessMessage] = useState('');
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<User>(
    {
      resolver: zodResolver(userSchema),
      mode: "onBlur",
    }
  )


  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' }
        });

      if (response.status == 200) {
        setsuccessMessage('User Created!')
        new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (err: any) {
      if (await isAxiosError(err)) {
        const backendMessage = err.response?.data?.message || "Something went wrong";

        setError("root.serverError", { message: backendMessage });
      } else {
        setError("root.serverError", { message: "Unexpected server error" });
      }
    }
    return;
  }

  return (
    <>
    <Container>
            <Signup succesMessage={succesMessage} handleSubmit={handleSubmit(onSubmit)} errors={errors} isSubmitting={isSubmitting} setError={setError} register={register} />
    </Container>
    </>
  )
}
