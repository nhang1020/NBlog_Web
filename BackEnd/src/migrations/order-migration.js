'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            customerId: {
                type: Sequelize.STRING
            },
            sellerId: {
                type: Sequelize.STRING
            },
            productId: {
                type: Sequelize.INT
            },
            quantity: {
                type: Sequelize.INT
            },
            totalPrice: {
                type: Sequelize.BIGINT
            },
            status: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('orders');
    }
};