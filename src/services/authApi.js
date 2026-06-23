const API_URL = import.meta.env.VITE_API_URL;

// Helper to get token
const getToken = () => localStorage.getItem("accessToken");

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  
  if (data.data?.accessToken) {
    localStorage.setItem("accessToken", data.data.accessToken);
  }

  return data;
};

export const getProfile = async () => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const logoutUser = async () => {
  
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const resetPassword = async (token, password) => {
  const response = await fetch(`${API_URL}/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};