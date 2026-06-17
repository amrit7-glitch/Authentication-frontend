import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../services/authApi";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();

                if (!response.success) {
                    setError(response.message);
                    return;
                }

                setUser(response.data);
            } catch (err) {
                setError(
                    err.message ||
                    "Failed to fetch profile"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl font-bold text-indigo-400 animate-pulse">
                    Loading...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-2xl max-w-md w-full text-center">
                    <p className="font-bold mb-2">Error</p>
                    {error}
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-400">
                No user data found
            </div>
        );
    }

    return (
        <div className="min-h-screen">

            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                    <h1 className="text-2xl font-black text-white tracking-tighter">
                        AUTH<span className="text-indigo-500">PRO</span>
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="bg-slate-800 text-slate-200 px-5 py-2.5 rounded-xl font-medium hover:bg-red-500/10 hover:text-red-400 border border-slate-700 hover:border-red-500/50 transition-all duration-300"
                    >
                        Logout
                    </button>

                </div>
            </nav>

            <div className="max-w-3xl mx-auto px-4 py-12">

                <div className="glass-card rounded-3xl p-8 md:p-10">

                    <div className="flex flex-col md:flex-row items-center gap-6 mb-12">

                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center text-4xl font-black shadow-lg shadow-indigo-500/20">
                            {user.name?.charAt(0)}
                        </div>

                        <div className="text-center md:text-left">
                            <h2 className="text-4xl font-extrabold text-white tracking-tight mb-1">
                                {user.name}
                            </h2>

                            <p className="text-indigo-400 font-medium">
                                {user.email}
                            </p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
                                User ID
                            </p>

                            <p className="font-mono text-slate-200">
                                {user.id}
                            </p>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
                                Role
                            </p>

                            <p className="text-emerald-400 font-bold">
                                {user.role?.toUpperCase()}
                            </p>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:col-span-2">
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
                                Email Address
                            </p>

                            <p className="text-slate-200 font-medium text-lg">
                                {user.email}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;