import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Phone,
  Building2,
  BriefcaseBusiness,
  UserRound,
  Building,
  Calendar,
  Clock,
  FileText,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { createGatePass } from "../../services/gatePassService";


const CreateGatePass = () => {

  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const [formData, setFormData] = useState({
    visitorName: "",
    visitorPhone: "",
    visitorCompany: "",
    purpose: "",
    personToMeet: "",
    department: "",
    validFrom: "",
    validUntil: "",
    remarks: "",
  });


  /* =========================================
     HANDLE INPUT CHANGE
  ========================================= */

  const handleChange = (e) => {

    const { name, value } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    if (error) {
      setError("");
    }

  };


  /* =========================================
     HANDLE SUBMIT
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        visitorName: formData.visitorName.trim(),
        visitorPhone: formData.visitorPhone.trim(),
        visitorCompany: formData.visitorCompany.trim() || null,
        purpose: formData.purpose.trim(),
        personToMeet: formData.personToMeet.trim() || null,
        department: formData.department.trim() || null,
        validFrom: formData.validFrom,
        validUntil: formData.validUntil || null,
        remarks: formData.remarks.trim() || null,
      };

      console.log(
        "Sending Gate Pass Payload:",
        payload
      );

      const response = await createGatePass(payload);

      if (response.success) {

        navigate(
          `/gate-pass/${response.data.id}`
        );

      }

    } catch (error) {

      console.error(
        "Create Gate Pass Error:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
        "Unable to create gate pass."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="mx-auto max-w-[1100px]">


      {/* ================= HEADER ================= */}

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <button
            onClick={() => navigate("/dashboard")}
            className="
              mb-3
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              transition
              hover:text-[#c8102e]
            "
          >

            <ArrowLeft size={17} />

            Back to Dashboard

          </button>


          <h1 className="text-2xl font-bold tracking-tight text-slate-800">

            Create Gate Pass

          </h1>


          <p className="mt-1 text-sm text-slate-500">

            Register visitor details and generate a new gate pass.

          </p>

        </div>


        <div className="
          inline-flex
          items-center
          gap-2
          rounded-lg
          border
          border-red-100
          bg-red-50
          px-4
          py-2
          text-sm
          font-medium
          text-[#c8102e]
        ">

          <CheckCircle2 size={17} />

          New Visitor Entry

        </div>

      </div>



      {/* ================= FORM ================= */}

      <form
        onSubmit={handleSubmit}
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >


        {/* ================= FORM HEADER ================= */}

        <div className="
          border-b
          border-slate-100
          px-6
          py-5
          sm:px-8
        ">

          <h2 className="text-lg font-semibold text-slate-800">

            Visitor Information

          </h2>


          <p className="mt-1 text-sm text-slate-500">

            Fill in the required details to issue a gate pass.

          </p>

        </div>



        <div className="space-y-8 p-6 sm:p-8">


          {/* ================= ERROR ================= */}

          {error && (

            <div className="
              rounded-xl
              border
              border-red-100
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            ">

              {error}

            </div>

          )}



          {/* ================= PERSONAL DETAILS ================= */}

          <section>

            <div className="mb-5">

              <h3 className="text-sm font-semibold text-slate-700">

                Personal Details

              </h3>

              <p className="mt-1 text-xs text-slate-400">

                Basic information about the visitor.

              </p>

            </div>


            <div className="grid gap-5 md:grid-cols-2">


              {/* Visitor Name */}

              <FormInput
                label="Visitor Name"
                name="visitorName"
                value={formData.visitorName}
                onChange={handleChange}
                placeholder="Enter visitor full name"
                icon={User}
                required
              />


              {/* Phone */}

              <FormInput
                label="Phone Number"
                name="visitorPhone"
                value={formData.visitorPhone}
                onChange={handleChange}
                placeholder="Enter phone number"
                icon={Phone}
                required
                type="tel"
              />


              {/* Company */}

              <FormInput
                label="Company / Organization"
                name="visitorCompany"
                value={formData.visitorCompany}
                onChange={handleChange}
                placeholder="Enter company name"
                icon={Building2}
              />


            </div>

          </section>



          {/* DIVIDER */}

          <div className="border-t border-slate-100" />



          {/* ================= VISIT DETAILS ================= */}

          <section>

            <div className="mb-5">

              <h3 className="text-sm font-semibold text-slate-700">

                Visit Details

              </h3>

              <p className="mt-1 text-xs text-slate-400">

                Information regarding the visitor's purpose and destination.

              </p>

            </div>


            <div className="grid gap-5 md:grid-cols-2">


              {/* Purpose */}

              <FormInput
                label="Purpose of Visit"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="e.g. Business Meeting"
                icon={BriefcaseBusiness}
                required
              />


              {/* Person To Meet */}

              <FormInput
                label="Person to Meet"
                name="personToMeet"
                value={formData.personToMeet}
                onChange={handleChange}
                placeholder="Enter employee name"
                icon={UserRound}
              />


              {/* Department */}

              <FormInput
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Human Resources"
                icon={Building}
              />


            </div>

          </section>



          {/* DIVIDER */}

          <div className="border-t border-slate-100" />



          {/* ================= VALIDITY ================= */}

          <section>

            <div className="mb-5">

              <h3 className="text-sm font-semibold text-slate-700">

                Pass Validity

              </h3>

              <p className="mt-1 text-xs text-slate-400">

                Define the validity period of this gate pass.

              </p>

            </div>


            <div className="grid gap-5 md:grid-cols-2">


              {/* Valid From */}

              <DateInput
                label="Valid From"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleChange}
                icon={Calendar}
                required
              />


              {/* Valid Until */}

              <DateInput
                label="Valid Until"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleChange}
                icon={Clock}
              />


            </div>

          </section>



          {/* DIVIDER */}

          <div className="border-t border-slate-100" />



          {/* ================= REMARKS ================= */}

          <section>

            <label className="mb-2 block text-sm font-semibold text-slate-700">

              Additional Remarks

            </label>


            <div className="relative">

              <FileText
                size={18}
                className="
                  absolute
                  left-4
                  top-4
                  text-slate-400
                "
              />


              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Add any additional information or remarks..."
                rows="4"
                disabled={loading}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-slate-200
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-slate-700
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#c8102e]
                  focus:ring-4
                  focus:ring-red-50
                "
              />

            </div>

          </section>


        </div>



        {/* ================= ACTIONS ================= */}

        <div className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-slate-100
          bg-slate-50
          px-6
          py-5
          sm:flex-row
          sm:justify-end
          sm:px-8
        ">


          <button
            type="button"
            disabled={loading}
            onClick={() => navigate("/dashboard")}
            className="
              h-11
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:bg-slate-100
            "
          >

            Cancel

          </button>


          <button
            type="submit"
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
              shadow-[0_8px_20px_rgba(200,16,46,0.18)]
              transition
              hover:bg-[#ad0d27]
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >

            {loading ? (

              <>

                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Creating Pass...

              </>

            ) : (

              <>

                Create Gate Pass

              </>

            )}

          </button>


        </div>


      </form>


    </div>

  );

};



/* =========================================
   FORM INPUT COMPONENT
========================================= */

const FormInput = ({
  label,
  icon: Icon,
  required,
  ...props
}) => {

  return (

    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">

        {label}

        {required && (

          <span className="ml-1 text-[#c8102e]">

            *

          </span>

        )}

      </label>


      <div className="relative">

        <Icon
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
          {...props}
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
            text-slate-700
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-[#c8102e]
            focus:ring-4
            focus:ring-red-50
          "
        />

      </div>

    </div>

  );

};



/* =========================================
   DATE INPUT
========================================= */

const DateInput = ({
  label,
  icon: Icon,
  required,
  ...props
}) => {

  return (

    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">

        {label}

        {required && (

          <span className="ml-1 text-[#c8102e]">

            *

          </span>

        )}

      </label>


      <div className="relative">

        <Icon
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            pointer-events-none
          "
        />


        <input
          type="datetime-local"
          {...props}
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
            text-slate-700
            outline-none
            transition
            focus:border-[#c8102e]
            focus:ring-4
            focus:ring-red-50
          "
        />

      </div>

    </div>

  );

};


export default CreateGatePass;