import express from "express";
import passport from "passport";
import User from "../models/user_model.js";
import Portfolio from "../models/portfolio_model.js";
import {
  getUserDetails,
  signIn,
  signUp,
  fetchUser,
  updateUsername,
  getToken,
} from "../controllers/auth_controllers.js";
import { checkAuthorization } from "../middleware/VerifyUser.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// Regular JWT routes (assuming these are working fine)
router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/fetchUser", checkAuthorization, fetchUser);
router.post("/getUserDetails", checkAuthorization, getUserDetails);
router.post("/updateUser", checkAuthorization, updateUsername);
router.post("/getToken",getToken)
// SAML routes
router.get(
  "/saml/login",
  passport.authenticate("saml", {
    failureRedirect: "/sign-in", // Replace with your failure redirect URL
    failureFlash: true,
  }),
  (req,res)=>{
    return res.redirect('http://localhost:3000');
  }
);


//SAML Callback Function
router.post(
  "/saml/login/callback",
  passport.authenticate("saml", {
    failureRedirect: "/sign-in",
    failureFlash: true,
  }),
  async(req, res) => {
    console.log("Came in callback", req.user)
    const email = req.user.email;
    const userName = req.user.userName
    if(!email || !userName){
      return res.status(500).json({ message: "Internal server error" });

    }
    const exsistingUser = await User.findOne({ email: email });
    let id;
    if(exsistingUser){
        id = exsistingUser._id;

    }
    else {
      const password = process.env.DEFAULT_PASSWORD; // Set a default password or generate a random one
      const newPassword = password + process.env.PEPPER;
      const hashedPassword = await bcrypt.genSalt(10).then((salt) => bcrypt.hash(newPassword, salt));
      const newUser = new User({ userName, email, password: hashedPassword });
      const portfolio = new Portfolio({ userId: newUser._id, balance: 1000, portfolio: [] });
      id = newUser._id;
      try {
        await portfolio.save();
        newUser.portfolio = portfolio._id;
        await newUser.save();
        console.log("User and portfolio created successfully");
      } catch (e) {
        console.error("Error creating user and portfolio:", e);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    try {
      const token = jwt.sign({ id }, process.env.JWTSECRET);
      // res.cookie('jwtToken', token, { httpOnly: false,secure:false,sameSite:'none'});
      return res.redirect(`https://frontend--tradewise-rutwik.netlify.app/setToken/${id}`);
    } catch (e) {
      console.error("Error generating JWT token:", e);
      return res.status(500).json({ message: "Internal Server error" });
    }

  }
);





export default router;
