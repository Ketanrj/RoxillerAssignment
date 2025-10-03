import type { FormEvent } from "react";
import { Link } from "react-router";
import type { FieldErrors, UseFormRegister, UseFormSetError } from "react-hook-form";
import type { User } from "../pages/Signuppage";
import { LoaderCircle } from "lucide-react";
import InputComponent from "./ui/InputComponent";

type Props = {
  register: UseFormRegister<User>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setError: UseFormSetError<User>;
  errors: FieldErrors<User>;
  isSubmitting: boolean;
  succesMessage: string;
};

function Signup({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  succesMessage,
}: Props): React.ReactNode {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm shadow-gray-50">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create your Account</h2>
          <p className="text-sm text-gray-400">Signup to Store</p>
          {succesMessage && (
            <p className="text-green-500 mt-2">{succesMessage}</p>
          )}
        </div>

        <form className="space-y-4 text-gray-600" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-row gap-4">
            <div className="flex-1 flex-col">
              <InputComponent
                label="Name"
                autoComplete="off"
                id="name"
                type="text"
                {...register("name")}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
             <div className="flex-1 flex-col">
            <InputComponent
              label="Email"
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
            </div>
          </div>

          {/* Address */}
          <div>
            <InputComponent
              label="Address"
              id="address"
              type="text"
              {...register("address")}
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <InputComponent
              label="Password"
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              button={true}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            {errors.root?.serverError?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.root.serverError.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-white font-medium shadow hover:bg-indigo-500 transition duration-300 ease-linear cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Sign up"
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
