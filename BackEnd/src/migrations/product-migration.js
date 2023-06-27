'use strict'; Product
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            productName: {
                type: Sequelize.STRING
            },
            category: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INT
            },
            quality: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.BIGINT
            },
            description: {
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('products');
    }
};