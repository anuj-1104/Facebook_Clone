import { Friends } from "../model/Friends_Model.js";
import { User } from "../model/User_Model.js";

export const friendsRequest = async (req, res) => {
  try {
    const { request } = req.body;
    const sender = req.user;

    // const postdata = new Friends({
    //   request: request.request,
    //   sender: user,
    // });

    const existing = await Friends.findOne({
      sender,
      request,
      status: "unfriend",
    });

    if (existing) {
      res.status(400).json({ message: "Request already existing" });
    }
    const friendsRequest = new Friends({
      sender,
      reciver: request,
      status: "unfriend",
    });

    const response = await friendsRequest.save();

    if (!response) {
      res.status(404).json({ message: "user not found" });
    }

    // const user_find = await User.findOne({ _id: response.request });

    // await User.updateOne(
    //   { _id: user_find._id },
    //   { $push: { friends: response.sender } },
    // );

    //handle a friends request & response .
    res.status(200).json({ message: "friend request sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error " });
  }
};

export const friNotification = async (_, res) => {
  try {
    const friends = await Friends.find({});
    const senderIds = friends
      .filter((data) => data.status !== "friends")
      .map((f) => f.sender);


      //set the correct status code
    if (!senderIds) {
      return res.status(301).json({ message: "friend request not found" });
    }

    const response = await User.find({
      _id: { $in: senderIds },
    }).select("-password");

    if (response.length <= 0) {
      return res.status(301).json({ message: "Notification not found " });
    }

    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ message: `error: ${error}` });
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
      status: "friends",
    });

    await User.findByIdAndUpdate(
      user.reciver,
      { $push: { friends: user.sender } },
      { returnDocument: "after" },
    );

    const add_friends = await User.findByIdAndUpdate(
      user.sender,
      { $push: { friends: user.reciver } },
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

    res.status(200).json({ message: "request found ", data: response });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
