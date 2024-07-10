import axios from "axios";
 /* eslint-disable */

export const handleSubmitSignIn = async (userName, password) => {
  try {
    const res = await axios.post("http://ec2-16-171-150-119.eu-north-1.compute.amazonaws.com:3001/api/auth/signin", {
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
export const handleSamlSignIn = async () => {
  try {
    console.log("came to saml sign")
    const res = await fetch("http://ec2-16-171-150-119.eu-north-1.compute.amazonaws.com:3001/api/auth/saml/login");
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
    const res = await axios.post("http://ec2-16-171-150-119.eu-north-1.compute.amazonaws.com:3001/api/auth/signup", {
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