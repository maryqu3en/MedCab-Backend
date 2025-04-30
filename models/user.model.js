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

exports.getUserProfile = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            user_type: true,
            createdAt: true,
            updatedAt: true,
            Doctor: {
                select: {
                    phone: true,
                    specialty: true,
                },
            },
            Staff: {
                select: {
                    phone: true,
                    role: true,
                },
            },
        },
    });
    if (!user) throw { status: 404, message: 'User not found' };
    return user;
};

exports.getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            user_type: true,
            createdAt: true,
            updatedAt: true,
            Doctor: {
                select: {
                    phone: true,
                    specialty: true,
                },
            },
            Staff: {
                select: {
                    phone: true,
                    role: true,
                },
            },
        },
    });
};

exports.getAllDoctors = async () => {
    return await prisma.doctor.findMany({
        include: {
            User: {
                select: {
                    name: true,
                    email: true
                },
            },
        },
    });
};

exports.getAllStaff = async () => {
    return await prisma.staff.findMany({
        include: {
            User: {
                select: {
                    name: true,
                    email: true
                },
            },
        },
    });
};



exports.updateUser = async (id, data) => {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) throw { status: 404, message: 'User not found' };

    if (data.password) {
        data.password = await hashPassword(data.password);
    }
    
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
        },
    });

    if (user.user_type === 'doctor' && (data.phone || data.specialty)) {
        await prisma.doctor.update({
            where: { id: user.id },
            data: {
                phone: data.phone,
                specialty: data.specialty,
            },
        });
    }

    if (user.user_type === 'staff' && (data.phone || data.role)) {
        await prisma.staff.update({
            where: { id: user.id },
            data: {
                phone: data.phone,
                role: data.role,
            },
        });
    }

    return updatedUser;
};

exports.getUserById = async (id) => {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) throw { status: 404, message: 'User not found' };
    return user;
};


exports.deleteUser = async (id) => {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) throw { status: 404, message: 'User not found' };
    await prisma.user.delete({ where: { id: parseInt(id) } });
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

