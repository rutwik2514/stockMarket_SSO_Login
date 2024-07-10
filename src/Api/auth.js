import axios from "axios";
 /* eslint-disable */
let url = process.env.REACT_APP_API_URI
console.log("url is", url)
export const handleSubmitSignIn = async (userName, password) => {
  try {
    const res = await axios.post(`${url}/api/auth/signin`, {
      userName: userName,
      password: password,
    });

    const { token } = res.data;
    localStorage.setItem("user", token);
    return { error: null };
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    console.log(errorMessage);
    return { error: errorMessage };
  }
};


export const handleSubmitSignUp = async (
  userName,
  email,
  password,
  confirmPassword
) => {
  try {
    const res = await axios.post(`${url}/api/auth/signup`, {
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    // console.log(res);
    return { error: null };
  } catch (error) {
    return { error: error?.res?.data?.message };
  }
};