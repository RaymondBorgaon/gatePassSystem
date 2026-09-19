import { Link } from "react-router-dom";
import { Building2, ShieldCheck } from "lucide-react";

import raymondLogo from "../../assets/logos/raymondLogo.png";

const AuthLayout = ({
  children,
  title,
  subtitle,
  type = "login",
}) => {
  return (
    <div className="min-h-screen bg-[#f5f6f8] lg:h-screen lg:overflow-hidden">

      {/* ================= TOP NAVBAR ================= */}

      <header className="h-[72px] border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6 lg:px-12">


          {/* Raymond Logo */}

          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src={raymondLogo}
              alt="Raymond Limited"
              className="h-10 w-auto object-contain"
            />
          </Link>


          {/* System Identity */}

          <div className="hidden items-center gap-3 sm:flex">

            <div className="h-8 w-px bg-slate-200" />

            <div className="text-right">

              <p className="text-sm font-semibold text-slate-700">
                Gate Pass Management System
              </p>

              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Internal Access Portal
              </p>

            </div>

          </div>


        </div>

      </header>



      {/* ================= MAIN ================= */}

      <main
        className="
          mx-auto
          flex
          min-h-[calc(100vh-72px)]
          max-w-[1600px]
          items-center
          justify-center
          px-5
          py-6
          lg:h-[calc(100vh-72px)]
          lg:min-h-0
          lg:py-5
        "
      >

        <div
          className="
            grid
            w-full
            max-w-[1180px]
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200
            bg-white
            shadow-[0_20px_60px_rgba(15,23,42,0.08)]
            lg:h-[calc(100vh-120px)]
            lg:max-h-[680px]
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >


          {/* ================= LEFT BRANDING ================= */}

          <div
            className="
              relative
              hidden
              overflow-hidden
              bg-[#172033]
              p-10
              text-white
              lg:flex
              lg:flex-col
              lg:justify-between
            "
          >


            {/* Background Decorations */}

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.035]" />

            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#c8102e]/15 blur-3xl" />

            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-tl-full border-l border-t border-white/[0.04]" />


            {/* Top Content */}

            <div className="relative">


              {/* Internal Portal Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  py-2
                "
              >

                <ShieldCheck
                  size={15}
                  className="text-[#e11d3f]"
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Raymond Internal System
                </span>

              </div>


              {/* Main Heading */}

              <h1 className="mt-9 text-[42px] font-bold leading-[1.12] tracking-tight">

                Gate Pass

                <span className="block">
                  Management
                </span>

                <span className="block text-[#e11d3f]">
                  System
                </span>

              </h1>


              {/* Description */}

              <p className="mt-6 max-w-[380px] text-[15px] leading-7 text-slate-400">

                A centralized platform for managing visitor entry,
                issuing gate passes, and maintaining visitor records
                across Raymond facilities.

              </p>


            </div>



            {/* Bottom Section */}

            <div className="relative">


              {/* Portal Info */}

              <div className="mb-8 flex items-start gap-4">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                  "
                >

                  <Building2
                    size={18}
                    className="text-[#e11d3f]"
                  />

                </div>


                <div>

                  <p className="text-sm font-semibold text-white">
                    Centralized Visitor Management
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Manage visitor registration, gate pass generation,
                    and visitor records from one centralized system.
                  </p>

                </div>

              </div>


              {/* Footer */}

              <div className="border-t border-white/[0.07] pt-5">

                <p className="text-[11px] text-slate-500">
                  © 2026 Raymond Limited
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-600">
                  Internal Use Only
                </p>

              </div>


            </div>


          </div>



          {/* ================= RIGHT AUTH SECTION ================= */}

          <div
            className="
              flex
              items-center
              justify-center
              overflow-y-auto
              px-6
              py-8
              sm:px-12
              lg:px-16
              lg:py-6
            "
          >

            <div
              className={`
                w-full
                ${type === "register"
                  ? "max-w-[460px]"
                  : "max-w-[420px]"
                }
              `}
            >


              {/* Mobile Branding */}

              <div className="mb-8 lg:hidden">

                <div className="inline-flex items-center gap-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#c8102e] text-white">

                    <ShieldCheck size={18} />

                  </div>


                  <div>

                    <p className="text-sm font-bold text-[#172033]">
                      Gate Pass Management System
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
                      Internal Access Portal
                    </p>

                  </div>

                </div>

              </div>



              {/* Page Heading */}

              <div className="mb-6">

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c8102e]">

                  {type === "login"
                    ? "Authorized Access"
                    : "Account Registration"}

                </p>


                <h2 className="mt-2 text-[30px] font-bold tracking-tight text-[#172033]">

                  {title}

                </h2>


                <p className="mt-2 text-sm leading-6 text-slate-500">

                  {subtitle}

                </p>

              </div>


              {children}


            </div>

          </div>


        </div>

      </main>

    </div>
  );
};

export default AuthLayout;