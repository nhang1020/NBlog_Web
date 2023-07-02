import React from 'react';
import { Table, Space, Tag } from 'antd';
import FormUser from './FormUser';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Chinese Score',
        dataIndex: 'chinese',
        sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
        },
    },
    {
        title: 'Math Score',
        dataIndex: 'math',
        sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
        },
    },
    {
        title: 'English Score',
        dataIndex: 'english',
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },

    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Delete</a>
                <a>Edit {record.name}</a>
            </Space>
        )
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: '3',
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        key: '4',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];
const UserManage = () => {

    return (
        <>
            <FormUser />
            <Table
                columns={columns}
                dataSource={data}
                className='container mt-5'
            />
        </>
    )
}

export default UserManage