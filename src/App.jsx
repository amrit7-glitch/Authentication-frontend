import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />
                <Route
    path="/reset-password/:token"
    element={<ResetPassword />}
/>
 <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />


            </Routes>
        </BrowserRouter>
    );
}

export default App;