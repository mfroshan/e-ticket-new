import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

export const ProtectedRoute = ({ children }) => {
  const { checkTokenValidity } = useAuth();
  const [isTokenValid, setIsTokenValid] = useState(null);

  const validateToken = async () => {
    try {
      const isValid = await checkTokenValidity();
      setIsTokenValid(isValid);
    } catch (error) {
      console.error("Error checking token validity:", error);
      setIsTokenValid(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, [checkTokenValidity]);

  if (isTokenValid === null) {
    return null;
  }

  if (!isTokenValid) {
    toast.warning('User is not Authorized');
    return <Navigate to="/login" />;
  }

  return children;
};
