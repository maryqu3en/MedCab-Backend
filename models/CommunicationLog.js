const mongoose = require('mongoose');

const CommunicationLogSchema = new mongoose.Schema({
  SenderID: { type: String, required: true },
  ReceiverID: { type: String, required: true },
  Message: {
    type: String, // Actual message content
    required: true,
  },
  MessageType: {
    type: String,
    enum: ['text', 'updateNotification'],
    default: 'text',
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
  Attachments: [
    {
      filename: String,
      path: String,
      uploadedAt: { type: Date, default: Date.now },
    },
  ], // Optional for files or media
});

module.exports = mongoose.model('CommunicationLog', CommunicationLogSchema);




// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//     const CommunicationLog = sequelize.define('CommunicationLog', {
//         ID: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//         },
//         Message: { 
//             type: DataTypes.TEXT, 
//             allowNull: false 
//         },
//         Timestamp: { 
//             type: DataTypes.DATE, 
//             defaultValue: DataTypes.NOW 
//         },
//         MessageType: { 
//             type: DataTypes.ENUM('text', 'updateNotification'), 
//             allowNull: false 
//         },
//     });

//     CommunicationLog.associate = (models) => {
//         CommunicationLog.belongsTo(models.Staff, { foreignKey: 'SenderID', as: 'Sender' });
//         CommunicationLog.belongsTo(models.Staff, { foreignKey: 'ReceiverID', as: 'Receiver' });
//     };

//     return CommunicationLog;
// };
