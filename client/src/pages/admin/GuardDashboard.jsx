import { Link } from "react-router-dom";

import {
  Users,
  ShieldCheck,
  LogIn,
  LogOut,
  Plus,
  ArrowRight,
  Clock3,
  FileText,
  MapPin,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/dashboardService";

import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";


const GuardDashboard = () => {

  /* =========================================
     STATE
  ========================================= */

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =========================================
     FETCH DASHBOARD DATA
  ========================================= */

  const fetchDashboardStats = async () => {

    try {

      setLoading(true);

      setError("");


      const response = await getDashboardStats();


      setDashboardData(response.data);

    } catch (error) {

      console.error(
        "Dashboard API Error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Failed to load dashboard data."
      );

    } finally {

      setLoading(false);

    }

  };


  /* =========================================
     FETCH ON COMPONENT MOUNT
  ========================================= */

  useEffect(() => {

    fetchDashboardStats();

  }, []);


  /* =========================================
     LOADING STATE
  ========================================= */

  if (loading) {

    return (

      <>

        <div className="flex min-h-[500px] items-center justify-center">

          <div className="text-center">

            <div
              className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-[#c8102e]
              "
            />

            <p className="mt-4 text-sm text-slate-500">

              Loading dashboard...

            </p>

          </div>

        </div>

      </>

    );

  }


  /* =========================================
     ERROR STATE
  ========================================= */

  if (error) {

    return (

      <>

        <div className="flex min-h-[500px] items-center justify-center">

          <div className="max-w-md text-center">

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-red-50
              "
            >

              <XCircle
                size={28}
                className="text-[#c8102e]"
              />

            </div>


            <h2 className="mt-4 text-lg font-semibold text-slate-800">

              Unable to load dashboard

            </h2>


            <p className="mt-2 text-sm text-slate-500">

              {error}

            </p>


            <button
              onClick={fetchDashboardStats}
              className="
                mt-5
                rounded-lg
                bg-[#c8102e]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#ae0d28]
              "
            >

              Try Again

            </button>

          </div>

        </div>

      </>

    );

  }


  /* =========================================
     EXTRACT API DATA
  ========================================= */

  const statistics =
    dashboardData?.statistics || {};


  const recentGatePasses =
    dashboardData?.recentGatePasses || [];


  const totalGatePasses =
    statistics.totalGatePasses || 0;


  const activeGatePasses =
    statistics.activeGatePasses || 0;


  const completedGatePasses =
    statistics.completedGatePasses || 0;


  const expiredGatePasses =
    statistics.expiredGatePasses || 0;


  const cancelledGatePasses =
    statistics.cancelledGatePasses || 0;


  const todayGatePasses =
    statistics.todayGatePasses || 0;


  /* =========================================
     FORMAT DATE
  ========================================= */

  const formatTime = (date) => {

    if (!date) return "-";


    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

  };


  /* =========================================
     GET VISITOR STATUS
  ========================================= */

  const getDisplayStatus = (status) => {

    switch (status) {

      case "ACTIVE":
        return "Active";

      case "COMPLETED":
        return "Completed";

      case "EXPIRED":
        return "Expired";

      case "CANCELLED":
        return "Cancelled";

      default:
        return status;

    }

  };


  /* =========================================
     STATUS STYLE
  ========================================= */

  const getStatusStyle = (status) => {

    switch (status) {

      case "ACTIVE":

        return "bg-emerald-50 text-emerald-600";


      case "COMPLETED":

        return "bg-blue-50 text-blue-600";


      case "EXPIRED":

        return "bg-amber-50 text-amber-600";


      case "CANCELLED":

        return "bg-red-50 text-red-600";


      default:

        return "bg-slate-100 text-slate-500";

    }

  };


  return (

    <>


      {/* =========================================
          PAGE HEADING
      ========================================= */}

      <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

        <div>

          <p className="text-xs font-bold tracking-[0.16em] text-[#c8102e]">

            SECURITY OPERATIONS

          </p>


          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">

            Welcome!

          </h1>


          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">

            Manage visitor entries, issue gate passes, and monitor today's
            visitor activity from the Main Gate.

          </p>

        </div>


        <Link
          to="/create-pass"
          className="
            inline-flex
            h-12
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#c8102e]
            px-5
            text-sm
            font-semibold
            text-white
            shadow-[0_10px_25px_rgba(200,16,46,0.2)]
            transition
            hover:bg-[#ae0d28]
            hover:shadow-[0_12px_30px_rgba(200,16,46,0.28)]
          "
        >

          <Plus size={19} />

          Create New Gate Pass

        </Link>

      </section>



      {/* =========================================
          STATISTICS
      ========================================= */}

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">


        {/* Visitors Today */}

        <StatCard
          title="Visitors Today"
          value={todayGatePasses}
          description="Total visitor registrations today"
          icon={Users}
          variant="red"
        />


        {/* Active Passes */}

        <StatCard
          title="Active Passes"
          value={activeGatePasses}
          description="Currently valid gate passes"
          icon={ShieldCheck}
          variant="green"
        />


        {/* Expired Passes */}

        <StatCard
          title="Expired Passes"
          value={expiredGatePasses}
          description="Gate passes that have expired"
          icon={Clock3}
          variant="amber"
        />


        {/* Completed Visits */}

        <StatCard
          title="Completed Visits"
          value={completedGatePasses}
          description="Visitors successfully checked out"
          icon={LogOut}
          variant="default"
        />

      </section>



      {/* =========================================
          MIDDLE SECTION
      ========================================= */}

      <section className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">


        {/* =========================================
            QUICK ACTION
        ========================================= */}

        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            bg-[#c8102e]
            p-7
            text-white
            shadow-[0_15px_35px_rgba(200,16,46,0.18)]
          "
        >

          <div className="relative z-10">


            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-white/15
                backdrop-blur-sm
              "
            >

              <Plus size={23} />

            </div>


            <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-red-100">

              QUICK ACTION

            </p>


            <h3 className="mt-2 text-xl font-semibold">

              Register a New Visitor

            </h3>


            <p className="mt-2 text-sm leading-relaxed text-red-100">

              Enter visitor details and generate a gate pass for authorized
              entry.

            </p>


            <Link
              to="/create-pass"
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#c8102e]
                transition
                hover:bg-red-50
              "
            >

              Create Gate Pass

              <ArrowRight size={16} />

            </Link>

          </div>


          {/* Decorative Circle */}

          <div
            className="
              absolute
              -right-14
              -top-14
              h-44
              w-44
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -bottom-20
              -left-10
              h-40
              w-40
              rounded-full
              bg-black/5
            "
          />

        </div>



        {/* =========================================
            DAILY OVERVIEW
        ========================================= */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
            xl:col-span-2
          "
        >

          <div className="flex items-start justify-between">


            <div>

              <p className="text-xs font-bold tracking-[0.14em] text-slate-400">

                DAILY OVERVIEW

              </p>


              <h3 className="mt-2 text-lg font-semibold text-slate-800">

                Main Gate Activity

              </h3>


              <p className="mt-1 text-sm text-slate-500">

                Summary of visitor movement for today.

              </p>

            </div>


            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                bg-slate-50
              "
            >

              <FileText
                size={20}
                className="text-slate-500"
              />

            </div>

          </div>



          {/* Overview Statistics */}

          <div className="mt-7 grid grid-cols-3 divide-x divide-slate-100">


            {/* Total */}

            <div className="pr-4">

              <p className="text-3xl font-bold text-slate-800">

                {totalGatePasses}

              </p>


              <p className="mt-1 text-xs text-slate-500">

                Total Gate Passes

              </p>

            </div>



            {/* Completed */}

            <div className="px-4">

              <p className="text-3xl font-bold text-emerald-600">

                {completedGatePasses}

              </p>


              <p className="mt-1 text-xs text-slate-500">

                Completed Visits

              </p>

            </div>



            {/* Active */}

            <div className="pl-4">

              <p className="text-3xl font-bold text-amber-500">

                {activeGatePasses}

              </p>


              <p className="mt-1 text-xs text-slate-500">

                Active Passes

              </p>

            </div>

          </div>



          {/* Bottom Info */}

          <div
            className="
              mt-7
              flex
              flex-col
              gap-3
              border-t
              border-slate-100
              pt-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div className="flex items-center gap-2 text-sm text-slate-500">

              <MapPin
                size={16}
                className="text-[#c8102e]"
              />

              Main Gate · Raymond Facility

            </div>




          </div>

        </div>

      </section>



      {/* =========================================
          RECENT VISITORS
      ========================================= */}

      <section
        className="
          mt-7
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
        "
      >


        {/* =========================================
            TABLE HEADER
        ========================================= */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            border-slate-100
            p-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div>

            <p className="text-xs font-bold tracking-[0.14em] text-slate-400">

              VISITOR ACTIVITY

            </p>


            <h3 className="mt-2 text-lg font-semibold text-slate-800">

              Recent Visitor Registrations

            </h3>


            <p className="mt-1 text-sm text-slate-500">

              Latest entries registered at the Main Gate.

            </p>

          </div>


          <Link
            to="/visitor-records"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#c8102e]
              transition
              hover:gap-3
            "
          >

            View All Records

            <ArrowRight size={16} />

          </Link>

        </div>



        {/* =========================================
            TABLE
        ========================================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">


            {/* Table Head */}

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-400">

                  VISITOR

                </th>


                <th className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-400">

                  PURPOSE

                </th>


                <th className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-400">

                  HOST / DEPARTMENT

                </th>


                <th className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-400">

                  ENTRY TIME

                </th>


                <th className="px-6 py-4 text-left text-[11px] font-bold tracking-wider text-slate-400">

                  STATUS

                </th>

              </tr>

            </thead>



            {/* Table Body */}

            <tbody className="divide-y divide-slate-100">


              {recentGatePasses.length > 0 ? (


                recentGatePasses.map((visitor) => {


                  const initials =
                    visitor.visitorName
                      ?.split(" ")
                      .map((word) =>
                        word.charAt(0)
                      )
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();


                  return (

                    <tr
                      key={visitor.id}
                      className="
                        transition-colors
                        hover:bg-slate-50
                      "
                    >


                      {/* Visitor */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">


                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-red-50
                              text-xs
                              font-bold
                              text-[#c8102e]
                            "
                          >

                            {initials || "NA"}

                          </div>


                          <div>

                            <p className="text-sm font-semibold text-slate-700">

                              {visitor.visitorName}

                            </p>


                            <p className="mt-0.5 text-xs text-slate-400">

                              {visitor.visitorCompany ||
                                "Individual Visitor"}

                            </p>

                          </div>

                        </div>

                      </td>



                      {/* Purpose */}

                      <td className="px-6 py-4 text-sm text-slate-600">

                        {visitor.purpose}

                      </td>



                      {/* Host */}

                      <td className="px-6 py-4 text-sm text-slate-600">

                        {visitor.personToMeet ||
                          visitor.department ||
                          "-"}

                      </td>



                      {/* Entry Time */}

                      <td className="px-6 py-4 text-sm font-medium text-slate-600">

                        {formatTime(visitor.createdAt)}

                      </td>



                      {/* Status */}

                      <td className="px-6 py-4">

                        <span
                          className={`
                            inline-flex
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${getStatusStyle(visitor.status)}
                          `}
                        >

                          {getDisplayStatus(visitor.status)}

                        </span>

                      </td>


                    </tr>

                  );

                })


              ) : (


                <tr>

                  <td
                    colSpan="5"
                    className="
                      px-6
                      py-12
                      text-center
                      text-sm
                      text-slate-400
                    "
                  >

                    No recent visitor registrations found.

                  </td>

                </tr>


              )}

            </tbody>

          </table>

        </div>

      </section>


    </>

  );

};


export default GuardDashboard;