import { useState } from "react";
import { forgotPassword } from "../services/authApi";

import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

function ForgotPassword() {
    const [email, setEmail] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setMessage("");

            const response =
                await forgotPassword(email);

            if (!response.success) {
                setError(response.message);
                return;
            }

            setMessage(response.message);

        } catch (err) {
            setError(
                err.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Forgot Password"
            subtitle="We'll send a reset link to your email"
        >
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-2xl mb-6 text-sm">
                    {error}
                </div>
            )}

            {message && (
                <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-4 rounded-2xl mb-6 text-sm">
                    {message}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <Input
                    type="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <Button disabled={loading}>
                    {loading
                        ? "Sending Link..."
                        : "Send Reset Link"}
                </Button>
            </form>
        </AuthLayout>
    );
}

export default ForgotPassword;