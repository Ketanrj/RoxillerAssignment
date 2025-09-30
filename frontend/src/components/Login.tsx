import { type FormEventHandler } from "react";
import { Link } from "react-router";
import { Loader2 } from "lucide-react";
import { type UseFormRegister } from "react-hook-form";
import { type userLogin } from "../pages/Loginpage";
import { type FieldErrors } from "react-hook-form";
import InputComponent from "./ui/InputComponent";

type Props = {
  register: UseFormRegister<userLogin>;
  handleSubmit: FormEventHandler<HTMLFormElement>
  isSubmitting: boolean;
  errors: FieldErrors<userLogin>
  succesMessage: string;

}

function Login({ register, handleSubmit, isSubmitting, errors, succesMessage }: Props): React.ReactNode {

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-gray-50 shadow-sm">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 font-stretch-extra-condensed">Welcome back</h2>
          <p className="text-sm text-gray-400">
            Please enter your details to <span className="font-medium">Log in</span>
          </p>
          {succesMessage !== '' ? <p className="text-sm font-normal text-green-400 mt-2">{succesMessage}</p> : ''}
          {errors.root && (<p className="text-sm font-normal text-red-400 mt-2">{errors.root.message}</p>)}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <InputComponent label="Enter your email" {...register("email")} placeholder="john@gmail.com" />
            {errors.email && (<p className="text-sm font-normal text-red-400 mt-2">{errors.email.message}</p>)}
          </div>
          <div>
            {/* Password Input */}
            <InputComponent button={true} {...register("password")} label="Password" placeholder="••••••••" />
            {errors.password && (<p className="text-sm font-normal text-red-400 mt-2">{errors.password.message}</p>)}
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-shadow-2xs rounded-xl justify-items-center bg-primary px-4 py-2 text-white font-medium shadow hover:opacity-90 transition duration-300 cursor-pointer"
            >
              {isSubmitting ?
                <Loader2 size={20} className="animate-spin" />
                : "Log in"}
            </button>
            <div className="flex justify-end">
                  <Link to={'/forgetpassword'}><span className="flex text-primary text-sm mt-1">Forget Password?</span></Link>
            </div>
          </div>
        </form>
        {/* Footer */}
        <div className="mt-4">
          <span className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to={'/register'} className="text-primary hover:underline">
              Create account
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
