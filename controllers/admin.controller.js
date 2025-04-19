const { updateDoctorStatus, updateStaffStatus } = require('../models/admin.model');

exports.updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status, usertype } = req.body;

    const adminId = req.user.id;

    const validStatuses = ['pending', 'active', 'inactive'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        let updated;

        if (usertype === 'doctor') {
            updated = await updateDoctorStatus(id, status, adminId);
        } else if (usertype === 'staff') {
            updated = await updateStaffStatus(id, status, adminId);
        } else {
            return res.status(400).json({ message: 'Invalid usertype' });
        }

        if (!updated) {
            return res.status(404).json({ message: 'User not found or no change' });
        }

        res.status(200).json({ message: `User status updated to ${status}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update status', error: err.message });
    }
};
