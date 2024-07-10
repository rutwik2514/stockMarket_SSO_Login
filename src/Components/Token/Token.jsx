import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Token() {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("user", token);
        navigate("/home");
    }, [token, navigate]);
  return (
    <p>{token}</p>
  )
}

export default Token