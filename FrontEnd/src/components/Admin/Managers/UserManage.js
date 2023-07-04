import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import FormUser from './FormUser';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser } from '../../../redux/silceReducers/adminReducers';
import { usersRemainingSelector } from '../../../redux/selector';

import { v1 } from 'uuid';

const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Full name',
        dataIndex: 'fullName',
        sorter: {
            compare: (a, b) => a.fullName - b.fullName,
            multiple: 1,
        },
    },
    {
        title: 'Adress',
        dataIndex: 'address',
        sorter: {
            compare: (a, b) => a.address - b.address,
            multiple: 1,
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',

    },

];
const UserManage = () => {
    const dispatch = useDispatch();
    // const [users, setUsers] = useState([]);
    let users = useSelector(usersRemainingSelector);
    const data = [];
    users.map((item, index) => {
        let obj = {};
        obj.key = index;
        obj.email = item.email;
        obj.fullName = `${item.firstName} ${item.lastName}`;
        obj.address = item.address;
        obj.status = item.status;
        obj.action = <a onClick={() => handleDeleteUser(item.id)}>Delete</a>;
        data.push(obj);
    })
    useEffect(() => {
        dispatch(getUsers("All"));
    }, []);
    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
    }
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