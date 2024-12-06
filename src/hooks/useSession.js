import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const baseUrl = process.env.NODE_ENV === 'development' 
  ? "http://localhost:5000/"
  : "https://zealthy-7851dac922ca.herokuapp.com/";

export const useSession = (redirectTo = null) => {
  const [sessionStatus, setSessionStatus] = useState({ authenticated: true });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkSession = async () => {
    setSessionStatus({ authenticated: true });
    setLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return { sessionStatus, loading, checkSession };
};
