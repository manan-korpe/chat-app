import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export async function contacts(req, res, next) {
  try {
    if (!req.user)
      return res.status(400).json({ message: "something want wrong" });

    const user = await User.find(
      { _id: req.user._id },
      { contects: 1, username: 1, _id: 0 }
    ).populate("contects");

    res.status(200).json({ message: "data finded", data: { user } });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function sendMessage(req, res, next) {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "user not found" });

    if (!req.user)
      return res.status(400).json({ message: "something want wrong" });

    const reciverUser = await User.findOne({ _id: req.params.id });
    if (!reciverUser)
      return res.status(400).json({ message: "reciver user not found" });

    const isInContect = await User.findOne({
      _id: req.user._id,
      contects: reciverUser._id,
    });

    if (!isInContect)
      return res.status(400).json({ message: "user not in your contect" });

    if (!req.body.message)
      return res.status(400).json({ message: "Enter valid message" });

    const messageDb = new Message({
      senderId: req.user._id,
      reciverId: reciverUser._id,
      message: req.body.message,
    });
    await messageDb.save();

    if (!messageDb)
      return res.status(401).json({ message: "something want wrong" });

    res.status(201).json({ message: "message sanded succssfuly",data:messageDb});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function historyMessage(req, res, next) {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "user not found" });

    if (!req.user)
      return res.status(400).json({ message: "something want wrong" });

    const reciverUser = await User.findOne({ _id: req.params.id });
    if (!reciverUser)
      return res.status(400).json({ message: "user not found" });

    const messageHistory = await Message.find({
      $or: [
        { senderId: req.user._id, reciverId: reciverUser._id },
        { senderId: reciverUser._id, reciverId: req.user._id },
      ],
    });

    if (messageHistory.length == 0)
      return res
        .status(400)
        .json({ message: "you dose not have chat history" });

    res
      .status(200)
      .json({ message: "chat history finded", data: messageHistory });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
}
