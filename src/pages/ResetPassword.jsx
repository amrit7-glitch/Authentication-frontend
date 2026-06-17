import { useState } from "react";
import {
    useParams,
    useNavigate
} from "react-router-dom";

import { resetPassword }
    from "../services/authApi";

import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

function ResetPassword() {
    const { token } =
        useParams();

    const navigate =
        useNavigate();

    const [password,
        setPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const [loading,
        setLoading] =
        useState(false);

    const [message,
        setMessage] =
        useState("");

    const [error,
        setError] =
        useState("");

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        if (
            password !==
            confirmPassword
        ) {
            setError(
                "Passwords do not match"
            );
            return;
        }

        try {
            setLoading(true);
            setError("");
            setMessage("");

            const response =
                await resetPassword(
                    token,
                    password
                );

            if (!response.success) {
                setError(
                    response.message
                );
                return;
            }

            setMessage(
                response.message
            );

            setTimeout(() => {
                navigate("/login");
            }, 2000);

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
            title="Reset Password"
            subtitle="Choose a new password"
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
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(
                            e.target.value
                        )
                    }
                />

                <Button disabled={loading}>
                    {loading
                        ? "Updating Password..."
                        : "Reset Password"}
                </Button>
            </form>
        </AuthLayout>
    );
}

export default ResetPassword;