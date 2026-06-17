function Button({
    children,
    disabled
}) {
    return (
        <button
            disabled={disabled}
            className="
                w-full
                bg-gradient-to-r
                from-indigo-600
                to-violet-600
                text-white
                py-4
                rounded-2xl
                font-bold
                text-lg
                hover:shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]
                hover:opacity-95
                active:scale-[0.98]
                transition-all
                duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:active:scale-100
            "
        >
            {children}
        </button>
    );
}

export default Button;