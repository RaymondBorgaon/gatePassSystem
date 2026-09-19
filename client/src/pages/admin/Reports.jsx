import {
  useState,
} from "react";

import {
  CalendarDays,
  FileBarChart,
  Users,
  CheckCircle2,
  Clock3,
  XCircle,
  Search,
  Loader2,
  RefreshCw,
  CalendarRange,
} from "lucide-react";

import {
  getReportSummary,
} from "../../services/reportService";


const Reports = () => {

  const getToday = () => {

    const today = new Date();

    return today
      .toISOString()
      .split("T")[0];

  };


  const getFirstDayOfMonth = () => {

    const today = new Date();

    return new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )
      .toISOString()
      .split("T")[0];

  };


  /* =========================================
     STATES
  ========================================= */

  const [startDate, setStartDate] =
    useState(getFirstDayOfMonth());

  const [endDate, setEndDate] =
    useState(getToday());

  const [reportData, setReportData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");



  /* =========================================
     GENERATE REPORT
  ========================================= */

  const handleGenerateReport = async () => {

    if (!startDate || !endDate) {

      setError(
        "Please select both start date and end date."
      );

      return;

    }


    if (
      new Date(startDate) >
      new Date(endDate)
    ) {

      setError(
        "Start date cannot be greater than end date."
      );

      return;

    }


    try {

      setLoading(true);

      setError("");


      const response =
        await getReportSummary({
          startDate,
          endDate,
        });


      if (response.success) {

        setReportData(
          response.data
        );

      }

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to generate report."
      );

    } finally {

      setLoading(false);

    }

  };



  /* =========================================
     RESET REPORT
  ========================================= */

  const handleReset = () => {

    setStartDate(
      getFirstDayOfMonth()
    );

    setEndDate(
      getToday()
    );

    setReportData(null);

    setError("");

  };



  /* =========================================
     FORMAT DATE
  ========================================= */

  const formatDate = (date) => {

    if (!date) return "-";


    return new Date(date)
      .toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

  };



  return (

    <div className="mx-auto max-w-[1400px]">


      {/* ================= HEADER ================= */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >


        <div>

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-[#c8102e]
              "
            >

              <FileBarChart size={22} />

            </div>


            <div>

              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-800
                "
              >

                Reports & Analytics

              </h1>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >

                Generate gate pass statistics for a selected date range.

              </p>

            </div>

          </div>

        </div>


        {reportData && (

          <button
            onClick={handleReset}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:bg-slate-50
            "
          >

            <RefreshCw size={17} />

            Reset Report

          </button>

        )}


      </div>



      {/* ================= DATE FILTER CARD ================= */}

      <div
        className="
          mb-7
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
        "
      >


        <div
          className="
            mb-5
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-red-50
              text-[#c8102e]
            "
          >

            <CalendarRange size={19} />

          </div>


          <div>

            <h2
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >

              Select Report Period

            </h2>


            <p
              className="
                mt-0.5
                text-xs
                text-slate-400
              "
            >

              Choose the date range for gate pass analysis.

            </p>

          </div>

        </div>



        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-end
          "
        >


          {/* START DATE */}

          <div className="flex-1">

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-600
              "
            >

              Start Date

            </label>


            <div className="relative">

              <CalendarDays
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-11
                  pr-4
                  text-sm
                  text-slate-600
                  outline-none
                  transition
                  focus:border-[#c8102e]
                  focus:ring-4
                  focus:ring-red-50
                "
              />

            </div>

          </div>



          {/* END DATE */}

          <div className="flex-1">

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-600
              "
            >

              End Date

            </label>


            <div className="relative">

              <CalendarDays
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-11
                  pr-4
                  text-sm
                  text-slate-600
                  outline-none
                  transition
                  focus:border-[#c8102e]
                  focus:ring-4
                  focus:ring-red-50
                "
              />

            </div>

          </div>



          {/* GENERATE BUTTON */}

          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#c8102e]
              px-6
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#a80d26]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {loading ? (

              <Loader2
                size={17}
                className="animate-spin"
              />

            ) : (

              <Search size={17} />

            )}


            {loading
              ? "Generating..."
              : "Generate Report"
            }

          </button>


        </div>


      </div>



      {/* ================= ERROR ================= */}

      {error && (

        <div
          className="
            mb-6
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-red-100
            bg-red-50
            px-5
            py-4
            text-sm
            text-red-600
          "
        >

          <XCircle size={18} />

          {error}

        </div>

      )}



      {/* ================= EMPTY STATE ================= */}

      {!reportData && !loading && (

        <div
          className="
            flex
            min-h-[350px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-200
            bg-white
            px-5
            text-center
          "
        >

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-[#c8102e]
            "
          >

            <FileBarChart size={28} />

          </div>


          <h3
            className="
              mt-5
              text-lg
              font-semibold
              text-slate-700
            "
          >

            Generate Your Report

          </h3>


          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-slate-400
            "
          >

            Select a start date and end date, then generate
            a report to view gate pass statistics.

          </p>

        </div>

      )}



      {/* ================= LOADING ================= */}

      {loading && (

        <div
          className="
            flex
            min-h-[350px]
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-white
          "
        >

          <div className="text-center">

            <Loader2
              size={34}
              className="
                mx-auto
                animate-spin
                text-[#c8102e]
              "
            />


            <p
              className="
                mt-4
                text-sm
                text-slate-400
              "
            >

              Generating report...

            </p>

          </div>

        </div>

      )}



      {/* ================= REPORT DATA ================= */}

      {reportData && !loading && (

        <>


          {/* DATE RANGE INFO */}

          <div
            className="
              mb-6
              flex
              flex-col
              gap-3
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  bg-red-50
                  text-[#c8102e]
                "
              >

                <CalendarRange size={18} />

              </div>


              <div>

                <p
                  className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >

                  Report Period

                </p>


                <p
                  className="
                    mt-1
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >

                  {formatDate(
                    reportData.dateRange?.startDate
                  )}

                  {" - "}

                  {formatDate(
                    reportData.dateRange?.endDate
                  )}

                </p>

              </div>

            </div>


            <span
              className="
                inline-flex
                w-fit
                rounded-full
                bg-green-50
                px-3
                py-1.5
                text-xs
                font-semibold
                text-green-600
              "
            >

              Report Generated Successfully

            </span>

          </div>



          {/* ================= STATISTICS ================= */}

          <div
            className="
              grid
              gap-5
              sm:grid-cols-2
              xl:grid-cols-5
            "
          >


            {/* TOTAL */}

            <ReportCard
              title="Total Gate Passes"
              value={
                reportData.statistics?.totalGatePasses || 0
              }
              icon={
                <Users size={21} />
              }
              iconClass="
                bg-red-50
                text-[#c8102e]
              "
            />


            {/* ACTIVE */}

            <ReportCard
              title="Active"
              value={
                reportData.statistics?.activeGatePasses || 0
              }
              icon={
                <CheckCircle2 size={21} />
              }
              iconClass="
                bg-emerald-50
                text-emerald-600
              "
            />


            {/* COMPLETED */}

            <ReportCard
              title="Completed"
              value={
                reportData.statistics?.completedGatePasses || 0
              }
              icon={
                <CheckCircle2 size={21} />
              }
              iconClass="
                bg-blue-50
                text-blue-600
              "
            />


            {/* EXPIRED */}

            <ReportCard
              title="Expired"
              value={
                reportData.statistics?.expiredGatePasses || 0
              }
              icon={
                <Clock3 size={21} />
              }
              iconClass="
                bg-amber-50
                text-amber-600
              "
            />


            {/* CANCELLED */}

            <ReportCard
              title="Cancelled"
              value={
                reportData.statistics?.cancelledGatePasses || 0
              }
              icon={
                <XCircle size={21} />
              }
              iconClass="
                bg-red-50
                text-red-500
              "
            />


          </div>



          {/* ================= SUMMARY SECTION ================= */}

          <div
            className="
              mt-7
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >


            <div
              className="
                border-b
                border-slate-100
                px-6
                py-5
              "
            >

              <h2
                className="
                  text-base
                  font-semibold
                  text-slate-700
                "
              >

                Gate Pass Summary

              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >

                Overview of gate pass activity during the selected period.

              </p>

            </div>



            <div className="divide-y divide-slate-100">


              <SummaryRow
                label="Total Gate Passes"
                value={
                  reportData.statistics?.totalGatePasses || 0
                }
              />


              <SummaryRow
                label="Active Gate Passes"
                value={
                  reportData.statistics?.activeGatePasses || 0
                }
                valueClass="text-emerald-600"
              />


              <SummaryRow
                label="Completed Gate Passes"
                value={
                  reportData.statistics?.completedGatePasses || 0
                }
                valueClass="text-blue-600"
              />


              <SummaryRow
                label="Expired Gate Passes"
                value={
                  reportData.statistics?.expiredGatePasses || 0
                }
                valueClass="text-amber-600"
              />


              <SummaryRow
                label="Cancelled Gate Passes"
                value={
                  reportData.statistics?.cancelledGatePasses || 0
                }
                valueClass="text-red-500"
              />


            </div>


          </div>


        </>

      )}


    </div>

  );

};



/* =========================================
   REPORT CARD
========================================= */

const ReportCard = ({
  title,
  value,
  icon,
  iconClass,
}) => {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >


      <div
        className="
          flex
          items-start
          justify-between
        "
      >


        <div>

          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >

            {title}

          </p>


          <h3
            className="
              mt-3
              text-3xl
              font-bold
              tracking-tight
              text-slate-800
            "
          >

            {value}

          </h3>

        </div>


        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${iconClass}
          `}
        >

          {icon}

        </div>


      </div>


    </div>

  );

};



/* =========================================
   SUMMARY ROW
========================================= */

const SummaryRow = ({
  label,
  value,
  valueClass = "text-slate-700",
}) => {

  return (

    <div
      className="
        flex
        items-center
        justify-between
        px-6
        py-4
      "
    >

      <span
        className="
          text-sm
          text-slate-500
        "
      >

        {label}

      </span>


      <span
        className={`
          text-sm
          font-bold
          ${valueClass}
        `}
      >

        {value}

      </span>


    </div>

  );

};


export default Reports;