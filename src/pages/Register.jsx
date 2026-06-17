import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authApi";

import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

function Register() {
    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const response =
                await registerUser({
                    name,
                    email,
                    password,
                });

            if (!response.success) {
                setError(response.message);
                return;
            }

            setSuccess(response.message);

            setName("");
            setEmail("");
            setPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (err) {
            setError(
                err.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Start your journey today"
        >
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-2xl mb-6 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-4 rounded-2xl mb-6 text-sm">
                    {success}
                    <p className="mt-2 text-xs">
                        Redirecting to login...
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

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

                <Button disabled={loading}>
                    {loading
                        ? "Creating Account..."
                        : "Register"}
                </Button>
            </form>

            <p className="text-center mt-8 text-slate-400">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                >
                    Login
                </Link>
            </p>
        </AuthLayout>
    );
}

export default Register;