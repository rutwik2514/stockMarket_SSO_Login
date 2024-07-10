import express from "express";
import jwt from "jsonwebtoken";

export const checkAuthorization = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (token == null || !token || token == undefined) {
    res.status(403).send({ message: "Something went wrong" });
    return;
  }
  const request_token = jwt.verify(token, process.env.JWTSECRET);
  req.decoded_token = request_token;
  // console.log("jijijijijddd");
  // console.log(token);
  if (!request_token) {
    res.status(403).send({ message: "Something went wrong" });
    return;
  }
  next();
};
