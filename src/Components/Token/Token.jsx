import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
function Token() {
    const { token } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        let token =  Cookies.get("jwtToken")
        console.log("jwt token is", Cookies.get("jwtToken"));
        localStorage.setItem("user", token);
        navigate("/home")
    }, [token, navigate]);
  return (
    <p>{token}</p>
  )
}

export default Token