
import User from "../models/user_model.js";
import { validemail } from "../middleware/Validate.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Portfolio from "../models/portfolio_model.js";

export const signUp = async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;
  const profile = await User.findOne({ userName });
  if (profile) {
    return res.status(500).json({ message: "user already exists" });
  }

  //checking mail already exsists
  const checkForMail = await User.findOne({ email });
  if (checkForMail) {
    return res.status(500).json({ message: "mail is already registered" });
  }

  ///validations
  if (!validemail(email)) {
    return res.status(500).json({ message: "Invalid email:Please check again" });

  }
  if (confirmPassword != password) {
    res.status(500).json({ message: "Password and confirmPassword must be same" });
    return;
  }
  if (password.length < 6) {
    return res.status(500).json({ message: "Password should have minimum 6 characters" });
  }

  //saving in database
  const newPassword = password + process.env.PEPPER;
  const hashedPassword = await bcrypt.genSalt(10).then((salt) => bcrypt.hash(newPassword, salt));
  const user = new User({ userName, email, password: hashedPassword });
  const portfolio = new Portfolio({ userId: user._id, balance: 1000, portfolio: [] });
  try {
    console.log("saving");
    await portfolio.save();
    user.portfolio = portfolio._id;
    await user.save();
    return res.status(201).json({ message: "user created successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName)
  const findUser = await User.findOne({ userName });
  if (!findUser) {
    res.status(500).json({ message: "User does not exist" });
    return;
  }

  const newPassword = password + process.env.PEPPER;
  const validatePassword = await bcrypt.compare(newPassword, findUser.password);
  if (!validatePassword) {
    res.status(401).json({ message: "Inavalid Password, Please try again" });
    return;
  }
  try {
    const id = findUser._id;
    const token = jwt.sign({ id }, process.env.JWTSECRET);
    return res.status(200).send({ message: "User logged in succesfuly", token });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const getToken = (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(500).json({ message: "Please Provide ID" });
    }
    const token = jwt.sign({ id }, process.env.JWTSECRET);
    return res.status(200).send({ message: "User logged in succesfuly", token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
  }



}

export const fetchUser = (req, res) => {
  res.status(200).json({ message: req.decoded_token });
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.decoded_token.id);
    return res.status(200).json({ user: user });
  } catch (e) {
    return res.status(500).json({ user: "No user found" });
  }


}
export const updateUsername = async (req, res) => {
  const { updateUserName } = req.body;
  try {
    const user = await User.findById(req.decoded_token.id);
    user.userName = updateUserName;
    await user.save();
    return res.status(200).json({ message: "Updated successfully" });
  } catch (e) {
    return res.status(500).json({ message: "No user found" });
  }

}