const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    status: { type: DataTypes.STRING, defaultValue: 'Pending' },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    paymentStatus: { type: DataTypes.STRING, defaultValue: 'Unpaid' }
});

module.exports = Order;
