import {
  UserRoundPlus,
  TicketCheck,
  Database,
} from "lucide-react";


const systemPoints = [

  {
    icon: UserRoundPlus,
    title: "Visitor Registration",
    description:
      "Capture visitor and visit-related information digitally at the point of entry.",
  },

  {
    icon: TicketCheck,
    title: "Gate Pass Generation",
    description:
      "Generate and issue a unique gate pass for every registered visitor.",
  },

  {
    icon: Database,
    title: "Centralized Records",
    description:
      "Maintain a structured digital record of visitor entries for future reference.",
  },

];


function AboutSystem() {

  return (

    <section
      id="about-system"
      className="border-y border-slate-200 bg-slate-50 py-16 lg:py-20"
    >

      <div className="container-custom">

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">


          {/* LEFT */}

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.16em] text-raymond-red">
              About the System
            </p>


            <h2 className="mt-3 text-3xl font-bold leading-tight text-raymond-navy md:text-4xl">

              Simplifying visitor entry and gate pass operations.

            </h2>


            <div className="mt-5 max-w-2xl space-y-3 text-sm leading-7 text-slate-600 md:text-base">

              <p>
                The Raymond Gate Pass Management System is an internal
                digital platform designed to streamline visitor entry
                registration and gate pass processing across Raymond
                facilities.
              </p>


              <p>
                Authorized personnel can register visitor details,
                generate gate passes, maintain entry records, and access
                visitor information through one centralized system.
              </p>


              <p>
                By bringing visitor registration and record management
                into a structured digital workflow, the system supports
                efficient day-to-day gate operations and easier access
                to historical visitor information.
              </p>

            </div>


            {/* Internal Notice */}

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">

              <span className="text-base">
                ⚠
              </span>


              <div>

                <p className="text-sm font-semibold text-amber-900">
                  Internal Use Only
                </p>


                <p className="mt-1 text-sm text-amber-800">
                  This system is intended exclusively for authorized
                  Raymond personnel and internal operational use.
                </p>

              </div>

            </div>


          </div>


          {/* RIGHT */}

          <div className="space-y-4">

            {systemPoints.map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="
                    flex
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-card
                    transition
                    hover:border-red-200
                    hover:shadow-soft
                  "
                >

                  <div className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-50
                  ">

                    <Icon
                      size={21}
                      className="text-raymond-red"
                    />

                  </div>


                  <div>

                    <h3 className="font-bold text-raymond-navy">
                      {item.title}
                    </h3>


                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>

                  </div>


                </div>

              );

            })}

          </div>


        </div>

      </div>

    </section>

  );

}


export default AboutSystem;