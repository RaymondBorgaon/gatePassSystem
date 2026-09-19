import {
  Bell,
  Menu,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

const DashboardHeader = ({ onMenuClick }) => {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex h-[82px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-6 lg:px-8">

      {/* Mobile Menu Button */}

      <button
        onClick={onMenuClick}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-lg border border-slate-200
          text-slate-500 transition
          hover:bg-slate-50
          lg:hidden
        "
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>


      {/* Desktop System Info */}

      <div className="hidden lg:block">
        <p className="text-sm text-slate-400">
          Raymond Limited
        </p>

        <h2 className="mt-1 text-base font-semibold text-slate-800">
          Gate Pass Management System
        </h2>
      </div>


      {/* Right Section */}

      <div className="ml-auto flex items-center gap-3 sm:gap-5">

        {/* Date */}

        <div className="hidden items-center gap-3 border-r border-slate-200 pr-5 xl:flex">

          <CalendarDays
            size={18}
            className="text-[#c8102e]"
          />

          <div>
            <p className="text-sm font-medium text-slate-700">
              {currentDate}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Main Gate Operations
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default DashboardHeader;