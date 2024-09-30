
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const {sequelize} = require('../utils/mysql');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [3, 30],
                msg: 'Username must be between 3 and 30 characters long.',
            },
            notEmpty: {
                msg: 'Username cannot be empty.',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Must be a valid email address.',
            },
            notEmpty: {
                msg: 'Email cannot be empty.',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 100],
                msg: 'Password must be between 6 and 100 characters long.',
            },
            notEmpty: {
                msg: 'Password cannot be empty.',
            },
        },
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
});
User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;
