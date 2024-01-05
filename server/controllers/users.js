import mongoose from "mongoose";
import users from "../models/auth.js";
import LoginHistory from "../models/LoginHistory.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await LoginHistory.find();
    const historyList = [];
    history.forEach((user) => {
      historyList.push({
        _id: user.userId,
        timestamp: user.timestamp,
        ip: user.ip,
        userDevice: user.userDevice,
        userOs: user.userOs,
        userBrowser: user.userBrowser,
      });
    });
    // console.log(historyList)
    res.status(200).json(historyList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};