import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleSubmitSignIn, handleSamlSignIn } from "../../Api/auth";
import Lottie from "lottie-react";
import Signin from "../../Assets/Signin.json";

function SignIn() {
  const [userName, setUsername] = useState({});
  const [password, setPassword] = useState({});

  const navigate = useNavigate();


  const handleSubmit = async () => {
    const response = await handleSubmitSignIn(userName, password);
    if (response?.error == null) {
      navigate("/home");
    } else {
      toast.error(response.error);
      return;
    }
  };

  const handleSamlLogin = async () => {
    try {
      // const samlLoginUrl = "http://localhost:3001/api/auth/saml/login";
      window.location.replace("http://ec2-16-171-150-119.eu-north-1.compute.amazonaws.com:3001/api/auth/saml/login")
      

    } catch (error) {
      console.error("Error during SAML login:", error);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-[#FFFBF5] to-[#F7EFE5]">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <Lottie animationData={Signin} className="max-w-lg" />
      </div>
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-gradient-to-r from-[#FFFBF5] to-[#F7EFE5] p-6">
        <div className="w-full max-w-md bg-[#FFFBF5] rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#7743DB]">Sign In</h2>
          <input
            placeholder="Username"
            className="w-full mb-4 p-3 border border-[#C3ACD0] rounded-lg"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
          />
          <input
            placeholder="Password"
            className="w-full mb-4 p-3 border border-[#C3ACD0] rounded-lg"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button
            className="w-full p-3 bg-[#7743DB] text-white rounded-lg hover:bg-[#C3ACD0] hover:text-black"
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <button
            className="w-full p-3 bg-[#7743DB] text-white rounded-lg hover:bg-[#C3ACD0] hover:text-black mt-4"
            onClick={handleSamlLogin}
          >
            SSO Login
          </button>
          <div className="flex items-center justify-between mt-6 text-[#7743DB]">
            <div>Don't have an account?</div>
            <Link to="/sign-up">
              <span className="text-[#7743DB] hover:underline">Sign Up</span>
            </Link>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default SignIn;
