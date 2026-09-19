import {
  LogIn,
  UserPlus,
  TicketCheck,
  Printer,
  Database,
} from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    icon: LogIn,
    title: "Access System",
    description:
      "Authorized Raymond personnel access the centralized gate pass management system.",
  },
  {
    step: "02",
    icon: UserPlus,
    title: "Register Visitor",
    description:
      "Enter the required visitor, contact, purpose, host, and visit details.",
  },
  {
    step: "03",
    icon: TicketCheck,
    title: "Generate Pass",
    description:
      "The system creates a unique gate pass number for the visitor.",
  },
  {
    step: "04",
    icon: Printer,
    title: "Print & Issue",
    description:
      "Print the generated gate pass and issue it to the visitor.",
  },
  {
    step: "05",
    icon: Database,
    title: "Access Records",
    description:
      "Visitor records remain available for search, filtering, review, and data export.",
  }
];

function Workflow() {
  return (
    <section
      id="workflow"
      className="border-y border-slate-200 bg-slate-50 py-16 lg:py-20"
    >

      <div className="container-custom">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.16em] text-raymond-red">
            System Workflow
          </p>

          <h2 className="mt-3 text-3xl font-bold text-raymond-navy md:text-4xl">
            How the Gate Pass System Works
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-500 md:text-base">
            A simple and structured workflow for managing visitor registration
            and gate pass processing.
          </p>

        </div>

        {/* Workflow Steps */}

        <div className="relative mt-12">

          {/* Connecting line */}

          <div className="absolute left-[10%] right-[10%] top-10 hidden h-px bg-slate-300 lg:block" />

          <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-5">

            {workflowSteps.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.step}
                  className="relative text-center"
                >

                  {/* Step Number */}

                  <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-2">

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-raymond-red text-[10px] font-bold text-white">
                      {item.step}
                    </span>

                  </div>

                  {/* Icon */}

                  <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-card">

                    <Icon
                      size={25}
                      className="text-raymond-red"
                    />

                  </div>

                  {/* Text */}

                  <h3 className="mt-5 text-sm font-bold text-raymond-navy">
                    {item.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[210px] text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

        {/* Bottom Note */}

        <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-slate-200 bg-white px-6 py-5 text-center shadow-card">

          <p className="text-sm leading-6 text-slate-600">
            Visitor entries created through the system are maintained as digital
            records and can be accessed by authorized personnel whenever
            required.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Workflow;