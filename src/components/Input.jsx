function Input({
    type,
    placeholder,
    value,
    onChange
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="
                w-full
                bg-slate-900/50
                border
                border-slate-700/50
                text-white
                placeholder:text-slate-500
                rounded-2xl
                px-5
                py-4
                outline-none
                transition-all
                duration-300
                focus:border-indigo-500/50
                focus:ring-4
                focus:ring-indigo-500/10
                focus:bg-slate-900
            "
        />
    );
}

export default Input;