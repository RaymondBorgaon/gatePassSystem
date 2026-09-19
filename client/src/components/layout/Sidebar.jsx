import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FilePlus2,
  Users,
  LogOut,
  ShieldCheck,
  ChevronRight,
  FileBarChart,
  X,
} from "lucide-react";


const Sidebar = ({ isOpen, onClose }) => {

  const navigate = useNavigate();


  /* =========================================
     SIDEBAR MENU
  ========================================= */

  const menuItems = [

    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    {
      name: "Create Gate Pass",
      icon: FilePlus2,
      path: "/create-pass",
    },

    {
      name: "Visitor Records",
      icon: Users,
      path: "/visitor-records",
    },

    {
      name: "Reports",
      icon: FileBarChart,
      path: "/reports",
    },

  ];


  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = () => {

    const confirmed = window.confirm(
      "Are you sure you want to sign out?"
    );


    if (!confirmed) return;


    // Remove authentication token
    localStorage.removeItem("token");


    // Remove user information if stored
    localStorage.removeItem("user");


    // Close sidebar on mobile
    onClose();


    // Redirect to login page
    navigate("/login", {
      replace: true,
    });

  };


  return (

    <>

      {/* ================= MOBILE OVERLAY ================= */}

      {isOpen && (

        <div
          onClick={onClose}
          className="
            fixed inset-0 z-40
            bg-black/40
            backdrop-blur-[1px]
            lg:hidden
          "
        />

      )}



      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50

          flex
          h-screen
          w-[260px]
          flex-col

          border-r
          border-slate-200
          bg-white

          transition-transform
          duration-300
          ease-in-out

          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:sticky
          lg:top-0
          lg:z-auto
          lg:translate-x-0
        `}
      >


        {/* ================= LOGO ================= */}

        <div
          className="
            flex
            h-[82px]
            items-center
            justify-between

            border-b
            border-slate-100

            px-7
          "
        >

          <div>

            <h1
              className="
                text-xl
                font-bold
                tracking-[0.18em]
                text-[#c8102e]
              "
            >
              RAYMOND
            </h1>


            <p
              className="
                mt-1
                text-[9px]
                font-semibold
                tracking-[0.18em]
                text-slate-400
              "
            >
              GATE PASS SYSTEM
            </p>

          </div>



          {/* MOBILE CLOSE BUTTON */}

          <button
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-lg

              text-slate-500

              hover:bg-slate-100

              lg:hidden
            "
            aria-label="Close navigation menu"
          >

            <X size={20} />

          </button>

        </div>



        {/* ================= SECURITY PORTAL ================= */}

        <div className="px-5 pt-6">

          <div
            className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-4
            "
          >

            <div className="flex items-center gap-3">


              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center

                  rounded-lg
                  bg-[#c8102e]
                "
              >

                <ShieldCheck
                  size={19}
                  className="text-white"
                />

              </div>



              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Security Portal
                </p>


                <p
                  className="
                    mt-0.5
                    text-xs
                    text-slate-500
                  "
                >
                  Authorized Access Only
                </p>

              </div>


            </div>

          </div>

        </div>



        {/* ================= NAVIGATION ================= */}

        <div className="mt-7 flex-1 px-4">

          <p
            className="
              mb-3
              px-3

              text-[10px]
              font-bold
              tracking-[0.16em]
              text-slate-400
            "
          >
            NAVIGATION
          </p>



          <nav className="space-y-1">


            {menuItems.map((item) => {

              const Icon = item.icon;


              return (

                <NavLink

                  key={item.name}

                  to={item.path}

                  onClick={onClose}

                  className={({ isActive }) =>

                    `
                    group

                    flex
                    items-center
                    justify-between

                    rounded-lg

                    px-3
                    py-3

                    text-sm
                    font-medium

                    transition-all
                    duration-200

                    ${isActive

                      ? "bg-[#c8102e] text-white shadow-[0_8px_20px_rgba(200,16,46,0.16)]"

                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"

                    }
                    `

                  }

                >


                  <div className="flex items-center gap-3">

                    <Icon size={18} />

                    <span>
                      {item.name}
                    </span>

                  </div>



                  <ChevronRight
                    size={15}
                    className="
                      opacity-0
                      transition
                      group-hover:opacity-100
                    "
                  />


                </NavLink>

              );

            })}


          </nav>

        </div>



        {/* ================= LOGOUT SECTION ================= */}

        <div
          className="
            border-t
            border-slate-100
            p-4
          "
        >


          <button

            onClick={handleLogout}

            className="
              flex
              w-full
              items-center
              gap-3

              rounded-lg

              px-3
              py-3

              text-sm
              font-medium
              text-slate-500

              transition

              hover:bg-red-50
              hover:text-[#c8102e]
            "

          >

            <LogOut size={18} />

            <span>
              Sign Out
            </span>

          </button>


        </div>


      </aside>

    </>

  );

};


export default Sidebar;