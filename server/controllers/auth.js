import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";
import LoginHistory from "../models/LoginHistory.js";

export const signup = async (req, res) => {
  const { name, email, password, ip, userBrowser, userOs, userDevice} = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      "test",
      { expiresIn: "1h" }
    );
    // const {ip, userAgent, userBrowser, userOs, userDevice } = req.userInfo;
    const loginHistory = new LoginHistory({
      userId: newUser._id,
      timestamp: new Date(),
      ip,
      userBrowser,
      userOs,
      userDevice,
    });
    await loginHistory.save()

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

export const login = async (req, res) => {
  const { email, password, ip, userBrowser, userOs, userDevice } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      "test",
      { expiresIn: "1h" }
    );
    // const { ip, userAgent, userBrowser, userOs, userDevice } = req.userInfo;
    const loginHistory = new LoginHistory({
      userId: existinguser._id,
      timestamp: new Date(),
      ip,
      userBrowser,
      userOs,
      userDevice,
    });

    await loginHistory.save();

    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};
