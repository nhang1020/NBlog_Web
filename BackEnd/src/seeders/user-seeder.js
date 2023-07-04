'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
                email: "nhangnhanh1234@gmail.com",
                password: "123",
                firstName: "Nhàng",
                lastName: "Thanh",
                address: "An Giang",
                phoneNumber: "0972667944",
                gender: "F",
                avatar: "zxc",
                role: "R0",
                profile: "Null",
                token: "",
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
