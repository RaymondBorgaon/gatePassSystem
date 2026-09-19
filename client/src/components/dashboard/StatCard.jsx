const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  variant = "default",
}) => {
  const variants = {
    default: {
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      valueColor: "text-slate-800",
    },

    red: {
      iconBg: "bg-red-50",
      iconColor: "text-[#c8102e]",
      valueColor: "text-slate-800",
    },

    green: {
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      valueColor: "text-slate-800",
    },

    amber: {
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      valueColor: "text-slate-800",
    },
  };

  const style = variants[variant];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3
            className={`mt-3 text-3xl font-bold tracking-tight ${style.valueColor}`}
          >
            {value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.iconBg} ${style.iconColor}`}
        >
          <Icon size={21} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
};

export default StatCard;