import { Friends } from "../model/Friends_Model.js";
import { User } from "../model/User_Model.js";

export const friendsRequest = async (req, res) => {
  try {
    const { receiver } = req.body;
    const sender = req.user._id;

    // Check if request already exists
    const existing = await Friends.findOne({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });
    if (existing) {
      return res.status(400).json({ message: "Request already exists" });
    }

    // Create friend request
    const friendRequest = await Friends.create({
      sender: sender,
      receiver: receiver,
      status: "pending",
    });

    if (!friendRequest) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Friend request sent successfully",
      data: friendRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const friNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    const friends = await Friends.find({
      receiver: userId,
      status: { $ne: "accepted" },
    });

    const senderIds = [...new Set(friends.map((f) => f.sender))]; //removed duplicate

    if (senderIds.length === 0) {
      return res.status(404).json({ message: "friend request not found" });
    }

    const users = await User.find({
      _id: { $in: senderIds },
    }).select("-password");

    if (users.length === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ data: users, request: friends });
  } catch (error) {
    res.status(500).json({ message: `error: ${error.message}` });
  }
};

export const requestconform = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await Friends.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "send a request" });
    }

    const update_req = await Friends.findOneAndUpdate(user._id, {
      status: "accepted",
    });

    await User.findByIdAndUpdate(
      user.receiver,
      { $push: { friends: user.sender } },
      { returnDocument: "after" },
    );

    const add_friends = await User.findByIdAndUpdate(
      user.sender,
      { $push: { friends: user.receiver } },
      { returnDocument: "after" },
    );

    res.status(200).json({ message: "user request updated successfully" });
  } catch (error) {
    res.status(800).json({ message: "Internal Server Error" });
  }
};

export const requestController = async (req, res) => {
  try {
    const response = await Friends.find();

    if (!response) {
      return res.status(404).json({ message: "Not Found" });
    }

    const requests = response.filter((item) => item.status !== "friends");

    const data = res
      .status(200)
      .json({ message: "request found ", data: requests });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
