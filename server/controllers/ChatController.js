import ChatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  console.log("hi");
  console.log("newChat",newChat) ; 
  try {
    const result = await newChat.save();
    console.log(result) ; 
    res.status(200).json(result);
  } catch (error) {
    console.log(error) ; 
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    console.log(chat) ; 
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    console.log(chat) ;
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};