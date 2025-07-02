import { userModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";

const model = new userModel();

export class UserController {
  signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res
          .json({ success: false, message: "All fields are required" });
      }
      const expense = await model.createUser({ name, email, password });
      if (!expense) {
        return res
          .json({ success: false, message: "User creation failed" });
      }
      res.json({ success: true, message: "User created" });
    } catch (err) {
      res
        .json({
          success: false,
          message: "Internal Server Error",
          error: err.message,
        });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .json({ success: false, message: "All fields are required" });
      }
      const user = await model.verifyUser({ email, password });
      if (!user) {
        return res
          .json({ success: false, message: "Invalid credentials" });
      }
      const tocken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.jwtKey,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("jwttocken", tocken,{
        httpOnly: true,
        secure: false, 
        maxAge: 3600000
      });
      res.send({ success: true, message: "Login Successfull" });
    } catch (err) {
      res
        .json({
          success: false,
          message: "Internal Server Error",
          error: err.message,
        });
    }
  };

  logout = async (req, res) => {
    try {
      res.clearCookie("jwttocken");
      res.send({ success: true, message: "Logout successfull" });
    } catch (error) {
      res
        .send({ success: false, message: "Internal server error" });
    }
  };
}