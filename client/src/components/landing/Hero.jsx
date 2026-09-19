import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  QrCode,
} from "lucide-react";

function Hero() {
  const navigate = useNavigate();

  const scrollToWorkflow = () => {
    document.getElementById("workflow")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-red-50 blur-3xl" />

        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />
      </div>

      <div className="container-custom relative grid min-h-[calc(100vh-72px)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-12">

        {/* LEFT SIDE */}
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2">
            <ShieldCheck
              size={15}
              className="text-raymond-red"
            />

            <span className="text-xs font-bold tracking-[0.12em] text-raymond-darkRed">
              INTERNAL ACCESS PORTAL
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-raymond-navy sm:text-5xl lg:text-[56px]">

            Raymond Gate Pass

            <span className="mt-1 block text-raymond-red">
              Management System
            </span>

          </h1>

          {/* Main Description */}
          <p className="mt-5 max-w-xl text-lg leading-7 text-slate-600">
            A centralized platform for managing visitor entry, gate pass
            generation, and visitor records across Raymond facilities.
          </p>

          {/* Supporting Description */}
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
            The system supports authorized staff in registering visitors,
            issuing gate passes, maintaining entry records, and accessing
            visitor information efficiently from one place.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/login")}
              className="group flex items-center gap-3 rounded-xl bg-raymond-red px-6 py-3.5 text-sm font-semibold text-white shadow-red transition-all hover:-translate-y-0.5 hover:bg-raymond-darkRed"
            >
              Authorized Login

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={scrollToWorkflow}
              className="rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-raymond-red hover:text-raymond-red"
            >
              View Workflow
            </button>

          </div>

          {/* Indicators */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">

            <div className="flex items-center gap-2 text-sm text-slate-600">

              <CheckCircle2
                size={17}
                className="text-emerald-600"
              />

              Streamlined gate operations

            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2
                size={17}
                className="text-emerald-600"
              />

              Centralized visitor records
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        {/* ================= RIGHT SECTION ================= */}

        <div className="relative flex items-center justify-center lg:justify-end">

          {/* Outer Visual Container */}

          <div
            className="
      relative
      h-[360px]
      w-full
      max-w-[500px]
      rounded-[32px]
      border
      border-red-100
      bg-gradient-to-br
      from-red-50
      via-white
      to-slate-100
    "
          >

            {/* Soft background glow */}

            <div
              className="
        absolute
        left-1/2
        top-1/2
        h-[220px]
        w-[220px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-red-100/40
        blur-3xl
      "
            />


            {/* ================= SMALL GATE PASS ================= */}

            <div
              className="
        absolute
        left-1/2
        top-1/2
        w-[250px]
        -translate-x-1/2
        -translate-y-1/2
        overflow-hidden
        rounded-[18px]
        bg-white
        shadow-[0_18px_45px_rgba(15,23,42,0.18)]
      "
            >


              {/* CARD HEADER */}

              <div className="bg-raymond-red px-4 py-3.5 text-white">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[10px] font-extrabold tracking-[0.22em]">
                      RAYMOND
                    </p>

                    <p className="mt-1 text-[7px] tracking-[0.12em] text-red-100">
                      VISITOR GATE PASS
                    </p>

                  </div>


                  <div className="text-right">

                    <p className="text-[6px] text-red-100">
                      PASS NO.
                    </p>

                    <p className="mt-1 text-[7px] font-semibold">
                      RAY-GP-2026-00128
                    </p>

                  </div>

                </div>

              </div>



              {/* CARD BODY */}

              <div className="p-4">


                {/* Visitor + QR */}

                <div className="flex items-start justify-between">


                  <div>

                    {/* Avatar */}

                    <div
                      className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-slate-100
                text-sm
                font-bold
                text-slate-500
              "
                    >
                      A
                    </div>


                    <h3 className="mt-2.5 text-sm font-bold text-raymond-navy">
                      Arjun Mehta
                    </h3>


                    <p className="mt-1 text-[9px] text-slate-500">
                      ABC Technologies Pvt. Ltd.
                    </p>

                  </div>



                  {/* QR */}

                  <div
                    className="
              flex
              h-[52px]
              w-[52px]
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-slate-50
            "
                  >

                    <QrCode
                      size={31}
                      className="text-raymond-navy"
                    />

                  </div>


                </div>



                {/* Divider */}

                <div className="my-3.5 h-px bg-slate-100" />



                {/* Visitor Details */}

                <div className="space-y-2 text-[9px]">


                  <div className="flex justify-between gap-3">

                    <span className="text-slate-400">
                      Purpose
                    </span>

                    <span className="font-medium text-slate-700">
                      Business Meeting
                    </span>

                  </div>


                  <div className="flex justify-between gap-3">

                    <span className="text-slate-400">
                      Host / Department
                    </span>

                    <span className="font-medium text-slate-700">
                      Rajesh Kumar · IT
                    </span>

                  </div>


                  <div className="flex justify-between gap-3">

                    <span className="text-slate-400">
                      Entry Gate
                    </span>

                    <span className="font-medium text-slate-700">
                      Main Gate
                    </span>

                  </div>


                  <div className="flex justify-between gap-3">

                    <span className="text-slate-400">
                      Valid On
                    </span>

                    <span className="font-medium text-slate-700">
                      02 Sep 2026
                    </span>

                  </div>


                </div>


              </div>



              {/* CARD FOOTER */}

              <div
                className="
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          px-4
          py-2.5
        "
              >

                <span className="text-[8px] italic text-slate-400">
                  Return pass at exit
                </span>


                <span
                  className="
            rounded-full
            border
            border-emerald-200
            bg-emerald-50
            px-2
            py-0.5
            text-[8px]
            font-semibold
            text-emerald-700
          "
                >
                  ACTIVE
                </span>

              </div>


            </div>



            {/* ================= FLOATING STATUS ================= */}

            <div
              className="
        absolute
        right-[-20px]
        top-8
        hidden
        rounded-2xl
        border
        border-slate-100
        bg-white
        px-4
        py-3
        shadow-[0_10px_30px_rgba(15,23,42,0.12)]
        sm:block
      "
            >

              <div className="flex items-center gap-2.5">


                <div
                  className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-emerald-50
          "
                >

                  <CheckCircle2
                    size={16}
                    className="text-emerald-600"
                  />

                </div>


                <div>

                  <p className="text-sm font-bold text-slate-800">
                    Pass Generated
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Visitor successfully registered
                  </p>

                </div>


              </div>

            </div>


          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;