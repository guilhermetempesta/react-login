import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api, apiLogin, apiLogout, apiResetPassword } from '../services/api'
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken'); 
    
    if (recoveredUser && accessToken) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    
    if (response.status === 200) {
      const loggedUser = response.data.user;
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem('user', JSON.stringify(loggedUser));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      
      setUser(loggedUser);
      setErrorMessage(null);
      navigate("/");
    } else {
      setErrorMessage(response.data.message);
    }        
  };

  const logout = async () => {
    console.log('logout');
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await apiLogout(refreshToken);
      
    if (response.status === 204) {    
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      api.defaults.headers.Authorization = null;
      setUser(null);
      setErrorMessage(null);
      navigate("/login");
    } else {
      setErrorMessage(response.data.message);
    } 
  };
  
  const resetPassword = async (email) => {
    console.log('resetPassword');
    const response = await apiResetPassword(email);
    if (response.status === 200) {
      setErrorMessage(null);
      navigate("/login");
    } else {
      setErrorMessage(response.data.message);
    }
  }

  return (
    <AuthContext.Provider 
      value={{ authenticated: !!user, user, loading, errorMessage, login, logout, 
        resetPassword }}>
      {children}
    </AuthContext.Provider>   
  );
};