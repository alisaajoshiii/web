const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, defaultValue: 'placeholder.png' },
    category: { type: DataTypes.STRING, defaultValue: 'General' }
});

module.exports = Product;
