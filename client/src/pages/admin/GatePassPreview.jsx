import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  User,
  Phone,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import { getGatePassById } from "../../services/gatePassService";

const GatePassPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gatePass, setGatePass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGatePass = async () => {
      try {
        const response = await getGatePassById(id);
        setGatePass(response.data);
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data?.message ||
          "Failed to load gate pass"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGatePass();
  }, [id]);

  const formatDateTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handlePrint = () => {
    const originalTitle = document.title;

    const fileName = gatePass.passNumber
      ? `Gate-Pass-${gatePass.passNumber}`
      : "Gate-Pass";

    document.title = fileName;

    window.print();

    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading gate pass...
        </p>
      </div>
    );
  }

  if (!gatePass) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="text-xl font-bold">
          Gate Pass Not Found
        </h2>

        <button
          onClick={() => navigate("/visitor-records")}
          className="mt-4 rounded-lg bg-[#c8102e] px-5 py-2 text-white"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between print:hidden">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-lg border border-slate-200
              bg-white hover:bg-slate-50
            "
          >
            <ArrowLeft size={20} />
          </button>

          <div>

            <h1 className="text-2xl font-bold text-slate-800">
              Gate Pass Preview
            </h1>

            <p className="text-sm text-slate-500">
              Review and print visitor gate pass
            </p>

          </div>

        </div>


        <button
          onClick={handlePrint}
          className="
            flex items-center gap-2
            rounded-lg bg-[#c8102e]
            px-5 py-3
            font-semibold text-white
            hover:bg-[#a80d26]
          "
        >
          <Printer size={18} />

          Print Gate Pass

        </button>

      </div>


      {/* GATE PASS */}

      <div className="flex justify-center">

        <div
          id="gate-pass"
          className="
            gate-pass-print
            w-full max-w-[580px]
            overflow-hidden
            rounded-xl
            border border-slate-300
            bg-white
            shadow-lg
          "
        >

          {/* TOP HEADER */}

          <div className="
            flex items-center justify-between
            bg-[#c8102e]
            px-6 py-4
            text-white
          ">

            <div>

              <h1 className="
                text-xl font-bold
                tracking-[0.18em]
              ">
                RAYMOND
              </h1>

              <p className="
                mt-1 text-[9px]
                tracking-[0.18em]
                text-white/80
              ">
                VISITOR GATE PASS
              </p>

            </div>


            <div className="text-right">

              <p className="
                text-[9px]
                tracking-wider
                text-white/70
              ">
                PASS NUMBER
              </p>

              <p className="
                mt-1 text-sm
                font-bold
                tracking-wide
              ">
                {gatePass.passNumber}
              </p>

            </div>

          </div>


          {/* VISITOR NAME */}

          <div className="
            border-b border-slate-200
            px-6 py-4
          ">

            <p className="
              text-[9px]
              font-bold
              tracking-[0.15em]
              text-slate-400
            ">
              VISITOR
            </p>

            <h2 className="
              mt-1 text-lg
              font-bold
              text-slate-800
            ">
              {gatePass.visitorName}
            </h2>

          </div>


          {/* DETAILS GRID */}

          <div className="
            grid grid-cols-2
            gap-x-6 gap-y-4
            px-6 py-5
          ">

            <DetailItem
              icon={<Phone size={15} />}
              label="PHONE"
              value={gatePass.visitorPhone}
            />


            <DetailItem
              icon={<Building2 size={15} />}
              label="COMPANY"
              value={gatePass.visitorCompany || "N/A"}
            />


            <DetailItem
              icon={<BriefcaseBusiness size={15} />}
              label="PURPOSE"
              value={gatePass.purpose}
            />


            <DetailItem
              icon={<User size={15} />}
              label="PERSON TO MEET"
              value={gatePass.personToMeet || "N/A"}
            />


            <DetailItem
              icon={<Building2 size={15} />}
              label="DEPARTMENT"
              value={gatePass.department || "N/A"}
            />


            <DetailItem
              icon={<CalendarDays size={15} />}
              label="VALID FROM"
              value={formatDateTime(gatePass.validFrom)}
            />


            <DetailItem
              icon={<CalendarDays size={15} />}
              label="VALID TILL"
              value={formatDateTime(gatePass.validUntil)}
            />

          </div>


          {/* STATUS */}

          <div className="
            flex items-center justify-center
            border-t border-dashed
            border-slate-300
            px-6 py-3
          ">




            <div className="
              flex items-center gap-1.5
              rounded-full
              bg-green-50
              px-3 py-1.5
            ">

              <CheckCircle2
                size={15}
                className="text-green-600"
              />

              <span className="
                text-[10px]
                font-bold
                text-green-700
              ">
                {gatePass.status}
              </span>

            </div>

          </div>


          {/* FOOTER */}

          <div className="
            border-t border-slate-100
            bg-slate-50
            px-5 py-2
            text-center
          ">

            <p className="
              text-[8px]
              tracking-wider
              text-slate-400
            ">
              RAYMOND GATE PASS MANAGEMENT SYSTEM
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};


/* ================================
   DETAIL ITEM
================================ */

const DetailItem = ({ icon, label, value }) => {

  return (

    <div className="flex items-start gap-2.5">

      <div className="
        mt-0.5
        flex h-7 w-7
        shrink-0
        items-center
        justify-center
        rounded-md
        bg-red-50
        text-[#c8102e]
      ">

        {icon}

      </div>


      <div className="min-w-0">

        <p className="
          text-[8px]
          font-bold
          tracking-wider
          text-slate-400
        ">

          {label}

        </p>


        <p className="
          mt-0.5
          break-words
          text-xs
          font-semibold
          text-slate-700
        ">

          {value}

        </p>

      </div>

    </div>

  );

};


export default GatePassPreview;