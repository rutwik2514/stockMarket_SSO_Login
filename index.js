import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import samlStrategy from "passport-saml";
import authRoutes from "./routes/auth_routes.js";
import stockRoutes from "./routes/stock_routes.js";
import fs from "fs"
const app = express();
dotenv.config();

//connecting database
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO).then(()=>{
  console.log("Database connected")
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true,
  exposedHeaders: ['Access-Control-Allow-Origin']
}));


// Configure express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport SAML Strategy
console.log("issuer is is", process.env.SAML_ISSUER)
// Serialize/deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(
  new samlStrategy.Strategy(
    {
      issuer: process.env.SAML_ISSUER,
      protocol:"http://",
      path: "/api/auth/saml/callback",
      entryPoint: process.env.SAML_ENTRY_POINT,
      logoutCallbackUrl: '/api/auth/saml/logout/callback',
      cert: fs.readFileSync("./saml.pem", "utf-8"),
    },
    async (profile, done) => {
      try {
        console.log("savving");
        return done(null, profile);
      } catch (err) {
        return done(err);
      }
    }
  )
);



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stock", stockRoutes);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
