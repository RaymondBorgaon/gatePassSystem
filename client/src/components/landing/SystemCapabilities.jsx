import {

  UserPlus,
  Ticket,
  Search,
  Printer,
  Download,
  Filter,

} from "lucide-react";


const capabilities = [

  {
    icon: UserPlus,
    title: "Visitor Registration",
    description:
      "Register visitor details including contact information, purpose of visit, host details, and visit validity.",
  },

  {
    icon: Ticket,
    title: "Gate Pass Generation",
    description:
      "Automatically generate a unique gate pass number for every registered visitor.",
  },

  {
    icon: Search,
    title: "Record Search",
    description:
      "Quickly search visitor records using details such as name, contact number, or gate pass number.",
  },

  {
    icon: Filter,
    title: "Smart Filtering",
    description:
      "Filter visitor records by date, visit status, department, and other relevant information.",
  },

  {
    icon: Printer,
    title: "Pass Printing",
    description:
      "Generate a printable visitor gate pass that can be issued directly at the entry point.",
  },

  {
    icon: Download,
    title: "Data Export",
    description:
      "Export visitor records for reporting, operational review, and internal documentation.",
  },

];


function SystemCapabilities() {

  return (

    <section
      id="capabilities"
      className="py-16 lg:py-20"
    >

      <div className="container-custom">


        {/* Heading */}

        <div className="max-w-2xl">

          <p className="text-sm font-bold uppercase tracking-[0.16em] text-raymond-red">
            System Capabilities
          </p>


          <h2 className="mt-3 text-3xl font-bold leading-tight text-raymond-navy md:text-4xl">

            Everything required to manage visitor entry in one system.

          </h2>


          <p className="mt-4 text-sm leading-7 text-slate-500 md:text-base">

            The platform brings essential gate pass and visitor record
            management activities together into a single, structured
            digital workflow.

          </p>

        </div>


        {/* Cards */}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {capabilities.map((capability) => {

            const Icon = capability.icon;

            return (

              <div
                key={capability.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-red-200
                  hover:shadow-soft
                "
              >

                <div className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-50
                  transition-colors
                  group-hover:bg-raymond-red
                ">

                  <Icon
                    size={21}
                    className="
                      text-raymond-red
                      transition-colors
                      group-hover:text-white
                    "
                  />

                </div>


                <h3 className="mt-4 text-base font-bold text-raymond-navy">

                  {capability.title}

                </h3>


                <p className="mt-2 text-sm leading-6 text-slate-500">

                  {capability.description}

                </p>


              </div>

            );

          })}

        </div>


      </div>

    </section>

  );

}


export default SystemCapabilities;