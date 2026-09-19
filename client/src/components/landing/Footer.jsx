import raymondLogo from "../../assets/logos/raymondLogo.png";

function Footer() {

  return (

    <footer className="bg-raymond-navy">

      <div className="container-custom py-8">

        <div className="
          flex
          flex-col
          gap-6
          md:flex-row
          md:items-center
          md:justify-between
        ">


          {/* Brand */}

          <div className="flex items-center gap-4">

            <div className="
              flex
              h-12
              items-center
              rounded-lg
              bg-white
              px-3
            ">

              <img
                src={raymondLogo}
                alt="Raymond Limited"
                className="h-7 w-auto object-contain"
              />

            </div>


            <div>

              <p className="
                text-sm
                font-semibold
                text-white
              ">

                Gate Pass Management System

              </p>


              <p className="
                mt-1
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-slate-400
              ">

                Raymond Internal Access Portal

              </p>

            </div>

          </div>



          {/* Copyright */}

          <p className="
            text-sm
            text-slate-400
          ">

            © {new Date().getFullYear()} Raymond Limited.
            Internal Use Only.

          </p>



          {/* Access */}

          <p className="
            text-xs
            font-medium
            text-slate-500
          ">

            Authorized Personnel Access Only

          </p>


        </div>

      </div>

    </footer>

  );

}


export default Footer;