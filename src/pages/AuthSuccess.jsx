import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken) {
      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Clean the tokens out of the URL immediately
      window.history.replaceState({}, "", "/auth/success");

      navigate("/profile", { replace: true });
    } else {
      navigate("/login?error=auth_failed", { replace: true });
    }
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