'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('galleries', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.STRING
            },
            folderName: {
                type: Sequelize.STRING
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('galleries');
    }
};