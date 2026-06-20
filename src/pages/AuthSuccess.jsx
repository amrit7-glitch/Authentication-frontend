import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This page sits between the OAuth redirect and /profile.
// The browser needs a moment after the redirect to store
// the httpOnly cookies before we make API calls.
function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Small delay ensures cookies from the redirect are stored
    const timer = setTimeout(() => {
      navigate("/profile", { replace: true });
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-bold text-indigo-400 animate-pulse">
        Signing you in...
      </h2>
    </div>
  );
}

export default AuthSuccess;