function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md glass-card rounded-3xl p-8 md:p-10">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
                        {title}
                    </h1>

                    <p className="text-slate-400 text-lg">
                        {subtitle}
                    </p>
                </div>

                {children}

            </div>
        </div>
    );
}

export default AuthLayout;