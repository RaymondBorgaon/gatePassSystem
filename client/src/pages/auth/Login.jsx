import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import { loginUser } from "../../services/authService";


const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
    rememberMe: false,
  });


  /* =========================================
     HANDLE INPUT CHANGE
  ========================================= */

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));


    // Remove error when user starts typing

    if (error) {
      setError("");
    }

  };


  /* =========================================
     HANDLE LOGIN
  ========================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!formData.employeeId.trim()) {

      setError("Please enter your Employee ID.");

      return;

    }


    if (!formData.password.trim()) {

      setError("Please enter your password.");

      return;

    }


    try {

      setLoading(true);

      setError("");


      const response = await loginUser({

        employeeId: formData.employeeId.trim(),

        password: formData.password,

      });


      if (response.success) {

        localStorage.setItem(
          "token",
          response.token
        );


        navigate("/dashboard", {
          replace: true,
        });

      }

    } catch (error) {

      setError(

        error.response?.data?.message ||

        "Unable to login. Please try again."

      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <AuthLayout
      type="login"
      title="Welcome back"
      subtitle="Sign in using your authorized Raymond credentials to continue."
    >


      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >


        {/* =========================================
            ERROR MESSAGE
        ========================================= */}

        {error && (

          <div
            className="
              rounded-lg
              border
              border-red-100
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >

            {error}

          </div>

        )}



        {/* =========================================
            EMPLOYEE ID
        ========================================= */}

        <div>

          <label className="mb-1.5 block text-sm font-semibold text-slate-700">

            Employee ID / Username

          </label>


          <div className="relative">

            <User
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />


            <input
              type="text"
              name="employeeId"
              placeholder="Enter your Employee ID"
              value={formData.employeeId}
              onChange={handleChange}
              disabled={loading}
              required
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                pl-11
                pr-4
                text-sm
                text-slate-700
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#c8102e]
                focus:ring-4
                focus:ring-red-50
                disabled:cursor-not-allowed
                disabled:bg-slate-50
              "
            />

          </div>

        </div>



        {/* =========================================
            PASSWORD
        ========================================= */}

        <div>

          <label className="mb-1.5 block text-sm font-semibold text-slate-700">

            Password

          </label>


          <div className="relative">

            <Lock
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />


            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                pl-11
                pr-12
                text-sm
                text-slate-700
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#c8102e]
                focus:ring-4
                focus:ring-red-50
                disabled:cursor-not-allowed
                disabled:bg-slate-50
              "
            />


            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                transition
                hover:text-slate-700
                disabled:cursor-not-allowed
              "
            >

              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}

            </button>

          </div>

        </div>



        {/* =========================================
            SIGN IN BUTTON
        ========================================= */}

        <button
          type="submit"
          disabled={loading}
          className="
            mt-2
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#c8102e]
            text-sm
            font-semibold
            text-white
            shadow-[0_10px_25px_rgba(200,16,46,0.22)]
            transition
            hover:bg-[#ad0d27]
            hover:shadow-[0_12px_30px_rgba(200,16,46,0.3)]
            active:scale-[0.99]
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >

          {loading ? (

            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              Signing In...

            </>

          ) : (

            <>

              Sign In

              <ArrowRight size={18} />

            </>

          )}

        </button>


      </form>



      {/* =========================================
          NOTICE
      ========================================= */}

      <div className="mt-5">

        <p className="text-center text-[11px] leading-5 text-slate-400">

          This system is restricted to authorized Raymond personnel.

        </p>

      </div>


    </AuthLayout>

  );

};


export default Login;