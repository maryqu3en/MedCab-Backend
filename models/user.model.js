const prisma = require('../config/prisma');
const { hashPassword, comparePassword } = require('../utils/bcrypt.utils');
const { generateToken, deleteToken } = require('../utils/jwt.utils');

exports.register = async ({ name, email, password, usertype, phone, specialty, role }) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw { status: 409, message: 'Email already in use' };

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: { name, email, password: hashed, user_type: usertype }
    });

    if (usertype === 'doctor') {
        await prisma.doctor.create({ data: { id: user.id, phone, specialty } });
    } else if (usertype === 'staff') {
        await prisma.staff.create({ data: { id: user.id, phone, role } });
    } else if (usertype !== 'admin') {
        throw { status: 400, message: 'Invalid user type' };
    }

    const token = await generateToken(user);
    return { user, token };
};

exports.login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw { status: 404, message: 'User not found' };

    const match = await comparePassword(password, user.password);
    if (!match) throw { status: 401, message: 'Invalid credentials' };

    const token = await generateToken(user);
    return { user, token };
};

exports.logout = async (token) => {
    await deleteToken(token);
};

exports.getAllUsers = async () => {
    return await prisma.user.findMany();
};

exports.getUserById = async (id) => {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) throw { status: 404, message: 'User not found' };
    return user;
};

exports.updateUser = async (id, data) => {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) throw { status: 404, message: 'User not found' };

    // Optional: rehash password if provided
    if (data.password) {
        data.password = await hashPassword(data.password);
    }

    return await prisma.user.update({
        where: { id: parseInt(id) },
        data
    });
};

exports.deleteUser = async (id) => {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) throw { status: 404, message: 'User not found' };
    await prisma.user.delete({ where: { id: parseInt(id) } });
};

exports.getUserProfile = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
            doctor: true,
            staff: true,
        },
    });
    if (!user) throw { status: 404, message: 'User not found' };
    return user;
};

exports.updateUserProfile = async (id, data) => {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) throw { status: 404, message: 'User not found' };

    // Optional: rehash password if provided
    if (data.password) {
        data.password = await hashPassword(data.password);
    }

    return await prisma.user.update({
        where: { id: parseInt(id) },
        data
    });
};

