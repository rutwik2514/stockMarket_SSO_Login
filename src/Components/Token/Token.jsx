 /* eslint-disable */

import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../Api/auth';
function Token() {
    const { token } = useParams();
    const navigate = useNavigate();

    const setToken = async() =>{
        localStorage.setItem("user",token)
        navigate("/home")
    }
    useEffect(() => {
        setToken();
    }, []);
  return (
    <p>Loading...</p>
  )
}

export default Token