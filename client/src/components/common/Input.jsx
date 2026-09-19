const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="w-full">

      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">

        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            h-12
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            text-slate-700
            outline-none
            transition-all
            placeholder:text-slate-400
            focus:border-[#c8102e]
            focus:ring-4
            focus:ring-red-50
            ${Icon ? "pl-11" : ""}
          `}
          {...props}
        />

      </div>

    </div>
  );
};

export default Input;