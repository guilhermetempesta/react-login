import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3300/api",
})

export const apiLogin = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response;
  } catch(error) {
    return error.response;
  } 
}

export const apiLogout = async (token) => {
  try {
    const refreshToken = token;
    const response = await api.post('/logout', { refreshToken });
    return response;
  } catch(error) {
    return error.response;
  }
}

export const apiResetPassword = async (email) => {
  try {
    const response = await api.patch('/reset-password', { email });
    return response;
  } catch(error) {
    return error.response;
  }
}