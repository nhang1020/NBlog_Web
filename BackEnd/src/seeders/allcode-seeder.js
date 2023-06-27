'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('allcodes', [
            {
                keyMap: "R0",
                type: "Role",
                valueEn: "Admin",
                valueVi: "Quản trị viên",
            },
            {
                keyMap: "R1",
                type: "Role",
                valueEn: "User",
                valueVi: "Người dùng",
            },
            //
            {
                keyMap: "F",
                type: "Gender",
                valueEn: "Male",
                valueVi: "Nam",
            },
            {
                keyMap: "M",
                type: "Gender",
                valueEn: "Female",
                valueVi: "Nữ",
            },
            {
                keyMap: "O",
                type: "Gender",
                valueEn: "Other",
                valueVi: "Khác",
            },
            //
            {
                keyMap: "S0",
                type: "Status",
                valueEn: "Wait for confirmation",
                valueVi: "Chờ xác nhận",
            },
            {
                keyMap: "S1",
                type: "Status",
                valueEn: "Confirmed",
                valueVi: "Đã xác nhận",
            },
            {
                keyMap: "S2",
                type: "Status",
                valueEn: "Received",
                valueVi: "Đã nhận",
            },
            //
            {
                keyMap: "C0",
                type: "Category",
                valueEn: "Electronic device",
                valueVi: "Đồ điện tử",
            },
            {
                keyMap: "C1",
                type: "Category",
                valueEn: "Houseware",
                valueVi: "Đồ gia dụng",
            },
            {
                keyMap: "C2",
                type: "Category",
                valueEn: "Fashion",
                valueVi: "Thời trang",
            },
            {
                keyMap: "C3",
                type: "Category",
                valueEn: "Other",
                valueVi: "Khác",
            },
            //
            {
                keyMap: "A0",
                type: "Action",
                valueEn: "Follow",
                valueVi: "Theo dõi",
            },
            {
                keyMap: "A1",
                type: "Action",
                valueEn: "Block",
                valueVi: "Chặn",
            },
            //
            {
                keyMap: "Q0",
                type: "Quality",
                valueEn: "New",
                valueVi: "Mới",
            },
            {
                keyMap: "Q1",
                type: "Quality",
                valueEn: "Used",
                valueVi: "Đã qua sử dụng",
            },
            //
            {
                keyMap: "T0",
                type: "Topic",
                valueEn: "Post",
                valueVi: "Bài đăng",
            },
            {
                keyMap: "T1",
                type: "Topic",
                valueEn: "Job",
                valueVi: "Việc làm",
            },
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
