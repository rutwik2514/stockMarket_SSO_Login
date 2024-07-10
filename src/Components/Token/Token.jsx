import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Token() {
    const { token } = useParams();
    localStorage.setItem("user", token);
    const navigate = useNavigate();
    navigate("/home")
  return (
    <p>Loading...</p>
  )
}

export default Token