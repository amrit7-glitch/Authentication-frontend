import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/authApi";

import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await loginUser({
                email,
                password,
            });

            navigate("/profile");
        } catch (err) {
            setError(
                err.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
    window.location.href =
        `${import.meta.env.VITE_API_URL}/auth/google`;
};

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Login to your account"
        >
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-2xl mb-6 text-sm">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <div className="text-right">
                    <Link
                        to="/forgot-password"
                        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button disabled={loading}>
                    {loading
                        ? "Authenticating..."
                        : "Login"}
                </Button>
            </form>

           <button
    onClick={handleGoogleLogin}
    className="
        w-full
        bg-slate-900/50
        border
        border-slate-700/50
        text-white
        py-4
        rounded-2xl
        mt-6
        hover:bg-slate-800
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-3
        font-medium
    "
>
    Continue with Google
</button>

            <p className="text-center mt-8 text-slate-400">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                >
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}

export default Login;