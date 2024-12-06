import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const baseUrl = process.env.NODE_ENV === 'development' 
  ? "http://localhost:5000/"
  : "https://zealthy-7851dac922ca.herokuapp.com/";

export const useSession = (redirectTo = '/') => {
  const [sessionStatus, setSessionStatus] = useState({ authenticated: false });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      const response = await fetch(baseUrl + 'check-auth', {
        credentials: 'include'
      });

      const data = await response.json();
      setSessionStatus(data);

      if (!data.authenticated && redirectTo) {
        navigate(redirectTo);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setSessionStatus({ authenticated: false });
      if (redirectTo) {
        navigate(redirectTo);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return { sessionStatus, loading, checkSession };
};
