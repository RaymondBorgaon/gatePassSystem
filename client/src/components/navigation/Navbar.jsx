import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

import raymondLogo from "../../assets/logos/raymondLogo.png";

function Navbar() {

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const navLinks = [
    {
      label: "About System",
      href: "#about-system",
    },
    {
      label: "Capabilities",
      href: "#capabilities",
    },
    {
      label: "Workflow",
      href: "#workflow",
    },
  ];


  const handleNavigation = (href) => {

    setMobileMenuOpen(false);

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });

  };


  return (

    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

      <div className="container-custom flex h-[76px] items-center justify-between">


        {/* ================= LOGO ================= */}

        <div className="flex items-center">

          <img
            src={raymondLogo}
            alt="Raymond Limited"
            className="h-[42px] w-auto object-contain sm:h-[50px]"
          />

        </div>



        {/* ================= DESKTOP NAVIGATION ================= */}

        <nav className="hidden items-center gap-8 lg:flex">

          {navLinks.map((link) => (

            <button
              key={link.label}
              onClick={() => handleNavigation(link.href)}
              className="
                text-sm
                font-medium
                text-slate-600
                transition-colors
                duration-200
                hover:text-raymond-red
              "
            >

              {link.label}

            </button>

          ))}

        </nav>



        {/* ================= DESKTOP LOGIN ================= */}

        <button
          onClick={() => navigate("/login")}
          className="
  group
  hidden
  items-center
  gap-2
  rounded-xl
  bg-raymond-red
  px-5
  py-2.5
  text-sm
  font-semibold
  text-white
  shadow-red
  transition-all
  duration-200
  hover:-translate-y-0.5
  hover:bg-raymond-darkRed
  lg:flex
"
        >

          Authorized Login

          <ArrowRight
            size={17}
            className="
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />

        </button>



        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            text-slate-700
            transition
            hover:bg-slate-100
            lg:hidden
          "
          aria-label="Toggle navigation menu"
        >

          {mobileMenuOpen ? (

            <X size={22} />

          ) : (

            <Menu size={22} />

          )}

        </button>


      </div>



      {/* ================= MOBILE MENU ================= */}

      {mobileMenuOpen && (

        <div
          className="
            border-t
            border-slate-100
            bg-white
            px-5
            py-5
            shadow-lg
            lg:hidden
          "
        >

          <nav className="flex flex-col gap-1">


            {navLinks.map((link) => (

              <button
                key={link.label}
                onClick={() =>
                  handleNavigation(link.href)
                }
                className="
                  rounded-lg
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-medium
                  text-slate-700
                  transition
                  hover:bg-slate-50
                  hover:text-raymond-red
                "
              >

                {link.label}

              </button>

            ))}


            {/* Mobile Login */}

            <button
              onClick={() => {

                setMobileMenuOpen(false);

                navigate("/login");

              }}
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-raymond-red
                px-5
                py-3
                text-sm
                font-semibold
                text-white
              "
            >

              Staff Login

              <ArrowRight size={17} />

            </button>


          </nav>

        </div>

      )}


    </header>

  );

}


export default Navbar;