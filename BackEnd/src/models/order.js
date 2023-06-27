'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // define relationship here
            Order.belongsTo(models.User, { foreignKey: 'customerId', as: 'customerData' });
            Order.belongsTo(models.AllCode, { foreignKey: 'status', targetKey: 'keyMap', as: 'statusData' });
            Order.belongsTo(models.Product, { foreignKey: 'productId', as: 'statusData' });
        }
    };
    Order.init({
        customerId: DataTypes.STRING,
        sellerId: DataTypes.STRING,
        productId: DataTypes.INT,
        quantity: DataTypes.INT,
        totalPrice: DataTypes.BIGINT,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};