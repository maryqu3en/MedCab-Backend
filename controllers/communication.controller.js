const communicationModel = require('../models/communication.model');

exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await communicationModel.getMessagesByRoomId(roomId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get messages', error });
  }
};

exports.postMessage = async (req, res) => {
  try {
    const { roomId, senderId, message } = req.body;
    const newMessage = await communicationModel.createMessage(roomId, senderId, message);

    req.app.get('io').to(roomId).emit('receiveMessage', newMessage); 

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error });
  }
};
