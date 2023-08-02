import React, { useEffect, useState, useTransition } from 'react'
import { Card } from 'react-bootstrap'
import { followUser, getFollows, getUsers } from '../../../redux/silceReducers/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRemainingSelector, relationshipsRemainingSelector, userInfoSelector } from '../../../redux/selector'
import { convertImage, noAvatar } from '../../../utils/constants';
import { Button, Input, Popover, Radio, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom';
import userSlice from '../../../redux/silceReducers/userSlice';
import './styles/MakeFriend.scss';

const MakeFriend = () => {
    const [isPending, startTransition] = useTransition();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [listUsers, setListUsers] = useState([]);
    const users = useSelector(getUsersRemainingSelector);
    const user = useSelector(userInfoSelector);
    const language = useSelector(state => state.app.language);
    const relationships = useSelector(relationshipsRemainingSelector);

    useEffect(() => {
        startTransition(() => {
            if (!users.length) {
                dispatch(getUsers({
                    limit: 10,
                    userId: user.id
                }));
            }
            if (!relationships.length) {
                dispatch(getFollows())
            }
        })
        dispatch(userSlice.actions.searchUser(''));
        dispatch(userSlice.actions.statusFilterChange('all'));
    }, []);

    useEffect(() => {
        setListUsers(users);
    }, [users])

    const hanldeFollow = (receiverId) => {
        dispatch(followUser({
            performerId: user.id,
            receiverId
        }))
    }
    const onChangeSearch = (e) => {
        dispatch(userSlice.actions.searchUser(e.target.value));
    }
    const onChangeRadio = (e) => {
        dispatch(userSlice.actions.statusFilterChange(e.target.value));
    }
    return (
        <div className='container-user'>
            {isPending ? <Spin style={{ width: '100%' }} /> : null}
            <div className='filter-user'>
                <div className='search'>

                    <Input className='rounded-pill search-user' placeholder='Tìm kiếm mọi người' onChange={onChangeSearch} />
                </div>
                <Radio.Group defaultValue={'all'} className='radio-filter' onChange={onChangeRadio}>
                    <Space direction='vertical'>
                        <Radio value={'all'} >Tất cả</Radio>
                        <Radio value={'followed'} >Đang theo dõi</Radio>
                        <Radio value={'unfollowed'} >Chưa theo dõi</Radio>
                    </Space>
                </Radio.Group>
            </div>
            <div className='row'>
                {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                    return (
                        <Card
                            className='card-user' key={index}>
                            <NavLink to={`/user/info/${item.id}`} className='nav-link img'>
                                <Card.Img variant="top" src={item.avatar && item.avatar.data.length ? convertImage(item.avatar) : noAvatar} />
                            </NavLink>
                            <Card.Body>
                                <NavLink to={`/user/info/${item.id}`} className='nav-link '>
                                    <h6>{language === 'vi' ? `${item.lastName} ${item.firstName} ` :
                                        `${item.firstName} ${item.lastName} `}
                                        {item.role === 'R0' ?
                                            <Popover content={t("admin")} placement='topLeft'>
                                                <i className="bi bi-patch-check-fill text-primary"></i>
                                            </Popover> : ''}
                                    </h6>
                                </NavLink>
                                {relationships.length > 0 && relationships.some(relate => relate.performerId == user.id && relate.receiverId == item.id) === true ?

                                    <Button onClick={() => hanldeFollow(item.id)} className='col-12 mt-4 followed btn-user'>
                                        Đang theo dõi
                                    </Button>
                                    :
                                    <Button onClick={() => hanldeFollow(item.id)} className='col-12 mt-4 non-follow btn-user'>
                                        Theo dõi
                                    </Button>
                                }
                                <Button onClick={() => dispatch(userSlice.actions.removeUser(item.id))} className='col-12 mt-2 remove btn-user'>
                                    {t("remove")}
                                </Button>

                            </Card.Body>
                        </Card>
                    )
                })
                }
            </div>
        </div >
    )
}

export default MakeFriend