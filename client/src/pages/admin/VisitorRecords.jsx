import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Search,
  Filter,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
  RefreshCw,
  Loader2,
  X,
  Download,
} from "lucide-react";

import {
  getAllGatePasses,
  deleteGatePass,
} from "../../services/gatePassService";

import {
  exportGatePasses,
} from "../../services/exportService";


const VisitorRecords = () => {

  const navigate = useNavigate();


  /* =========================================
     STATES
  ========================================= */

  const [gatePasses, setGatePasses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");


  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState(null);


  const [deleteLoading, setDeleteLoading] =
    useState(null);


  const [exportLoading, setExportLoading] =
    useState(false);



  /* =========================================
     FETCH GATE PASSES
  ========================================= */

  const fetchGatePasses = async (
    customPage = page
  ) => {

    try {

      setLoading(true);

      setError("");


      const params = {

        page: customPage,

        limit: 10,

      };


      if (search.trim()) {

        params.search =
          search.trim();

      }


      if (status) {

        params.status = status;

      }


      const response =
        await getAllGatePasses(params);


      if (response.success) {

        setGatePasses(
          response.data
        );

        setPagination(
          response.pagination
        );

      }

    } catch (error) {

      console.error(
        "Fetch Gate Pass Error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Unable to fetch visitor records."
      );

    } finally {

      setLoading(false);

    }

  };



  /* =========================================
     INITIAL LOAD
  ========================================= */

  useEffect(() => {

    fetchGatePasses(1);

  }, []);



  /* =========================================
     HANDLE SEARCH
  ========================================= */

  const handleSearch = (e) => {

    e.preventDefault();

    setPage(1);

    fetchGatePasses(1);

  };



  /* =========================================
     STATUS FILTER
  ========================================= */

  const handleStatusChange = (e) => {

    setStatus(e.target.value);

  };


  useEffect(() => {

    const timeout = setTimeout(() => {

      setPage(1);

      fetchGatePasses(1);

    }, 300);


    return () =>
      clearTimeout(timeout);

  }, [status]);



  /* =========================================
     CLEAR FILTERS
  ========================================= */

  const clearFilters = () => {

    setSearch("");

    setStatus("");

    setPage(1);


    setTimeout(() => {

      fetchGatePasses(1);

    }, 0);

  };



  /* =========================================
     EXPORT CSV
  ========================================= */

  const handleExport = async () => {

    try {

      setExportLoading(true);


      const params = {};


      if (search.trim()) {

        params.search =
          search.trim();

      }


      if (status) {

        params.status = status;

      }


      const response =
        await exportGatePasses(params);


      const blob =
        new Blob(
          [response.data],
          {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          }
        );


      const url =
        window.URL.createObjectURL(blob);


      const link =
        document.createElement("a");


      link.href = url;


      link.setAttribute(

        "download",

        `gate-passes-${Date.now()}.xlsx`

      );


      document.body.appendChild(link);


      link.click();


      link.remove();


      window.URL.revokeObjectURL(url);


    } catch (error) {

      console.error(error);


      alert(
        "Failed to export gate pass records."
      );

    } finally {

      setExportLoading(false);

    }

  };



  /* =========================================
     DELETE GATE PASS
  ========================================= */

  const handleDelete = async (
    id,
    visitorName
  ) => {

    const confirmed =
      window.confirm(
        `Are you sure you want to delete the gate pass for ${visitorName}?`
      );


    if (!confirmed) return;


    try {

      setDeleteLoading(id);


      const response =
        await deleteGatePass(id);


      if (response.success) {

        fetchGatePasses(page);

      }

    } catch (error) {

      console.error(
        "Delete Gate Pass Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Unable to delete gate pass."
      );

    } finally {

      setDeleteLoading(null);

    }

  };



  /* =========================================
     PAGINATION
  ========================================= */

  const handlePageChange = (
    newPage
  ) => {

    if (
      newPage < 1 ||
      newPage >
      pagination?.totalPages
    ) {
      return;
    }


    setPage(newPage);

    fetchGatePasses(newPage);

  };



  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="mx-auto max-w-[1400px]">


      {/* ================= HEADER ================= */}

      <div className="
        mb-7
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      ">


        {/* PAGE TITLE */}

        <div>

          <h1 className="
            text-2xl
            font-bold
            tracking-tight
            text-slate-800
          ">

            Visitor Records

          </h1>


          <p className="
            mt-1
            text-sm
            text-slate-500
          ">

            Manage and review all visitor gate passes.

          </p>

        </div>



        {/* HEADER ACTIONS */}

        <div className="
          flex
          flex-wrap
          items-center
          gap-3
        ">


          {/* EXPORT CSV */}

          <button
            onClick={handleExport}
            disabled={exportLoading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#c8102e]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#a80d26]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {exportLoading ? (

              <Loader2
                size={17}
                className="animate-spin"
              />

            ) : (

              <Download size={17} />

            )}

            {exportLoading
              ? "Exporting..."
              : "Export Records"
            }

          </button>



          {/* REFRESH */}

          <button
            onClick={() =>
              fetchGatePasses(page)
            }
            disabled={loading}
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
              disabled:opacity-60
            "
          >

            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>


        </div>


      </div>



      {/* ================= FILTERS ================= */}

      <div className="
        mb-6
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
      ">


        <div className="
          flex
          flex-col
          gap-4
          lg:flex-row
        ">


          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="flex-1"
          >

            <div className="relative">

              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by pass number, visitor name, phone or company..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  pl-11
                  pr-4
                  text-sm
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#c8102e]
                  focus:ring-4
                  focus:ring-red-50
                "
              />

            </div>

          </form>



          {/* STATUS FILTER */}

          <div className="
            flex
            gap-3
          ">


            <div className="
              relative
              min-w-[190px]
            ">

              <Filter
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <select
                value={status}
                onChange={handleStatusChange}
                className="
                  h-11
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-10
                  pr-4
                  text-sm
                  text-slate-600
                  outline-none
                  focus:border-[#c8102e]
                  focus:ring-4
                  focus:ring-red-50
                "
              >

                <option value="">
                  All Status
                </option>

                <option value="ACTIVE">
                  Active
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

                <option value="EXPIRED">
                  Expired
                </option>

                <option value="CANCELLED">
                  Cancelled
                </option>

              </select>

            </div>



            {/* CLEAR FILTER */}

            {(search || status) && (

              <button
                onClick={clearFilters}
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  text-sm
                  font-medium
                  text-slate-500
                  transition
                  hover:bg-slate-50
                "
              >

                <X size={16} />

                Clear

              </button>

            )}


          </div>


        </div>


      </div>



      {/* ================= ERROR ================= */}

      {error && (

        <div className="
          mb-6
          rounded-xl
          border
          border-red-100
          bg-red-50
          px-5
          py-4
          text-sm
          text-red-600
        ">

          {error}

        </div>

      )}



      {/* ================= TABLE ================= */}

      <div className="
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-sm
      ">


        {/* TABLE HEADER */}

        <div className="
          flex
          items-center
          justify-between
          border-b
          border-slate-100
          px-5
          py-4
        ">


          <div className="
            flex
            items-center
            gap-3
          ">


            <div className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-red-50
              text-[#c8102e]
            ">

              <Users size={18} />

            </div>


            <div>

              <h2 className="
                text-sm
                font-semibold
                text-slate-700
              ">

                Gate Pass Records

              </h2>


              <p className="
                mt-0.5
                text-xs
                text-slate-400
              ">

                {pagination?.totalRecords || 0} total records

              </p>

            </div>


          </div>


        </div>



        {/* ================= LOADING ================= */}

        {loading ? (

          <div className="
            flex
            min-h-[350px]
            items-center
            justify-center
          ">

            <Loader2
              size={30}
              className="
                animate-spin
                text-[#c8102e]
              "
            />

          </div>

        ) : gatePasses.length === 0 ? (


          /* ================= EMPTY STATE ================= */

          <div className="
            flex
            min-h-[350px]
            flex-col
            items-center
            justify-center
            px-5
            text-center
          ">


            <div className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-400
            ">

              <Users size={25} />

            </div>


            <h3 className="
              mt-4
              text-base
              font-semibold
              text-slate-700
            ">

              No visitor records found

            </h3>


            <p className="
              mt-1
              text-sm
              text-slate-400
            ">

              No gate passes match your current filters.

            </p>


            <button
              onClick={() =>
                navigate("/create-pass")
              }
              className="
                mt-5
                rounded-lg
                bg-[#c8102e]
                px-4
                py-2
                text-sm
                font-semibold
                text-white
              "
            >

              Create Gate Pass

            </button>


          </div>

        ) : (

          <>


            {/* ================= DESKTOP TABLE ================= */}

            <div className="
              hidden
              overflow-x-auto
              lg:block
            ">


              <table className="
                w-full
                text-left
              ">


                <thead className="
                  bg-slate-50
                  text-xs
                  uppercase
                  tracking-wide
                  text-slate-400
                ">

                  <tr>

                    <th className="px-5 py-4 font-semibold">
                      Pass Number
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Visitor
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Company
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Purpose
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Valid From
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Status
                    </th>

                    <th className="
                      px-5
                      py-4
                      text-right
                      font-semibold
                    ">
                      Actions
                    </th>

                  </tr>

                </thead>



                <tbody className="
                  divide-y
                  divide-slate-100
                ">


                  {gatePasses.map((gatePass) => (

                    <tr
                      key={gatePass.id}
                      className="
                        transition
                        hover:bg-slate-50/70
                      "
                    >


                      {/* PASS NUMBER */}

                      <td className="px-5 py-4">

                        <p className="
                          text-sm
                          font-semibold
                          text-[#c8102e]
                        ">

                          {gatePass.passNumber}

                        </p>

                      </td>



                      {/* VISITOR */}

                      <td className="px-5 py-4">

                        <p className="
                          text-sm
                          font-medium
                          text-slate-700
                        ">

                          {gatePass.visitorName}

                        </p>


                        <p className="
                          mt-1
                          text-xs
                          text-slate-400
                        ">

                          {gatePass.visitorPhone}

                        </p>

                      </td>



                      {/* COMPANY */}

                      <td className="
                        px-5
                        py-4
                        text-sm
                        text-slate-500
                      ">

                        {gatePass.visitorCompany || "-"}

                      </td>



                      {/* PURPOSE */}

                      <td className="
                        max-w-[180px]
                        truncate
                        px-5
                        py-4
                        text-sm
                        text-slate-500
                      ">

                        {gatePass.purpose}

                      </td>



                      {/* VALID FROM */}

                      <td className="
                        px-5
                        py-4
                        text-sm
                        text-slate-500
                      ">

                        {formatDate(
                          gatePass.validFrom
                        )}

                      </td>



                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={gatePass.status}
                        />

                      </td>



                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="
                          flex
                          justify-end
                          gap-2
                        ">


                          {/* VIEW */}

                          <button
                            onClick={() =>
                              navigate(
                                `/gate-pass/${gatePass.id}`
                              )
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              text-slate-400
                              transition
                              hover:bg-blue-50
                              hover:text-blue-600
                            "
                            title="View Gate Pass"
                          >

                            <Eye size={17} />

                          </button>



                          {/* DELETE */}

                          <button
                            disabled={
                              deleteLoading ===
                              gatePass.id
                            }
                            onClick={() =>
                              handleDelete(
                                gatePass.id,
                                gatePass.visitorName
                              )
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              text-slate-400
                              transition
                              hover:bg-red-50
                              hover:text-red-600
                              disabled:opacity-50
                            "
                            title="Delete Gate Pass"
                          >

                            {deleteLoading ===
                              gatePass.id ? (

                              <Loader2
                                size={16}
                                className="animate-spin"
                              />

                            ) : (

                              <Trash2 size={17} />

                            )}

                          </button>


                        </div>

                      </td>


                    </tr>

                  ))}


                </tbody>


              </table>


            </div>



            {/* ================= MOBILE CARDS ================= */}

            <div className="
              divide-y
              divide-slate-100
              lg:hidden
            ">


              {gatePasses.map((gatePass) => (

                <div
                  key={gatePass.id}
                  className="p-5"
                >


                  <div className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  ">


                    <div>

                      <p className="
                        text-sm
                        font-bold
                        text-[#c8102e]
                      ">

                        {gatePass.passNumber}

                      </p>


                      <h3 className="
                        mt-2
                        text-sm
                        font-semibold
                        text-slate-700
                      ">

                        {gatePass.visitorName}

                      </h3>


                      <p className="
                        mt-1
                        text-xs
                        text-slate-400
                      ">

                        {gatePass.visitorPhone}

                      </p>


                    </div>


                    <StatusBadge
                      status={gatePass.status}
                    />


                  </div>



                  <div className="
                    mt-4
                    grid
                    grid-cols-2
                    gap-4
                  ">


                    <div>

                      <p className="
                        text-xs
                        text-slate-400
                      ">

                        Purpose

                      </p>


                      <p className="
                        mt-1
                        text-sm
                        text-slate-600
                      ">

                        {gatePass.purpose}

                      </p>

                    </div>



                    <div>

                      <p className="
                        text-xs
                        text-slate-400
                      ">

                        Valid From

                      </p>


                      <p className="
                        mt-1
                        text-sm
                        text-slate-600
                      ">

                        {formatDate(
                          gatePass.validFrom
                        )}

                      </p>

                    </div>


                  </div>



                  <div className="
                    mt-5
                    flex
                    gap-3
                  ">


                    {/* VIEW */}

                    <button
                      onClick={() =>
                        navigate(
                          `/gate-pass/${gatePass.id}`
                        )
                      }
                      className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-slate-200
                        py-2
                        text-sm
                        font-medium
                        text-slate-600
                      "
                    >

                      <Eye size={16} />

                      View

                    </button>



                    {/* DELETE */}

                    <button
                      disabled={
                        deleteLoading ===
                        gatePass.id
                      }
                      onClick={() =>
                        handleDelete(
                          gatePass.id,
                          gatePass.visitorName
                        )
                      }
                      className="
                        flex
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-red-100
                        px-4
                        text-red-500
                        disabled:opacity-50
                      "
                    >

                      {deleteLoading ===
                        gatePass.id ? (

                        <Loader2
                          size={17}
                          className="animate-spin"
                        />

                      ) : (

                        <Trash2 size={17} />

                      )}

                    </button>


                  </div>


                </div>

              ))}


            </div>


          </>

        )}



        {/* ================= PAGINATION ================= */}

        {!loading &&
          gatePasses.length > 0 &&
          pagination && (

            <div className="
              flex
              flex-col
              gap-4
              border-t
              border-slate-100
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            ">


              <p className="
                text-sm
                text-slate-400
              ">

                Page {pagination.currentPage} of{" "}

                {pagination.totalPages}

              </p>



              <div className="flex gap-2">


                {/* PREVIOUS */}

                <button
                  disabled={
                    !pagination.hasPreviousPage
                  }
                  onClick={() =>
                    handlePageChange(
                      page - 1
                    )
                  }
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    text-slate-500
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >

                  <ChevronLeft size={17} />

                </button>



                {/* NEXT */}

                <button
                  disabled={
                    !pagination.hasNextPage
                  }
                  onClick={() =>
                    handlePageChange(
                      page + 1
                    )
                  }
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    text-slate-500
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >

                  <ChevronRight size={17} />

                </button>


              </div>


            </div>

          )}


      </div>


    </div>

  );

};




/* =========================================
   STATUS BADGE
========================================= */

const StatusBadge = ({ status }) => {

  const styles = {

    ACTIVE:
      "bg-emerald-50 text-emerald-600",

    COMPLETED:
      "bg-blue-50 text-blue-600",

    EXPIRED:
      "bg-amber-50 text-amber-600",

    CANCELLED:
      "bg-red-50 text-red-600",

  };


  return (

    <span
      className={`
        inline-flex
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ${styles[status] || "bg-slate-100 text-slate-600"}
      `}
    >

      {status}

    </span>

  );

};




/* =========================================
   DATE FORMAT
========================================= */

const formatDate = (date) => {

  if (!date) return "-";


  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

};


export default VisitorRecords;