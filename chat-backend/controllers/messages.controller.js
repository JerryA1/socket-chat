const Message = require("../models/message");

// ----------------------------------------------------------------------

const getChat = async (req, res) => {
  const uid = req.uid;
  const messageFrom = req.params.from;

  const last30 = await Message.find({
    $or: [
      { from: uid, to: messageFrom },
      { from: messageFrom, to: uid },
    ],
  })
    .sort({ createdAt: "asc" })
    .limit(30);

  res.json({ status: "success", message: "chat loaded", meta: { last30 } });
};

module.exports = {
  getChat,
};
