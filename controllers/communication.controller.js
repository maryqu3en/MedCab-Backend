const communicationModel = require('../models/communication.model');

exports.getLogsByRoomId = async (req, res) => {
    const { roomId } = req.params;

    try {
        const logs = await communicationModel.getLogsByRoomId(roomId);
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching communication logs:', error);
        res.status(500).json({ message: 'Failed to fetch communication logs', error: error.message });
    }
};