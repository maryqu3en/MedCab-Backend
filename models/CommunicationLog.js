const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CommunicationLog = sequelize.define('CommunicationLog', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        Message: { 
            type: DataTypes.TEXT, 
            allowNull: false 
        },
        Timestamp: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        },
        MessageType: { 
            type: DataTypes.ENUM('text', 'updateNotification'), 
            allowNull: false 
        },
    });

    CommunicationLog.associate = (models) => {
        CommunicationLog.belongsTo(models.Staff, { foreignKey: 'SenderID', as: 'Sender' });
        CommunicationLog.belongsTo(models.Staff, { foreignKey: 'ReceiverID', as: 'Receiver' });
    };

    return CommunicationLog;
};
