import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../Api/auth';
function Token() {
    const { id } = useParams();
    const navigate = useNavigate();

    const setToken = async() =>{
      const res = await getToken(id);
      console.log("res is", res)
      if(res.error==null){
        localStorage.setItem("user",res.token)
        navigate("/home")
      }
      else{
        window.alert("Something went wrong")
      }
    }
    useEffect(() => {
        setToken();
        // eslint-disable-next-line
    }, [id, navigate]);
  return (
    <p>{id}</p>
  )
}

export default Token