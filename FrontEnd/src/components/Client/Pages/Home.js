import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Badge, Card, Avatar } from 'antd';
import ModalQuickPost from '../Childcomponents/ModalQuickPost'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../redux/silceReducers/postSlice';
import { postsRemainingSelector } from '../../../redux/selector';
import './styles/HomePage.scss';
import { formatDate } from '../../componentsCustom/customTime'

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(postsRemainingSelector)
    const [listPosts, setListPosts] = useState([]);
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])
    useEffect(() => {
        setListPosts(posts);
    }, [posts])

    return (
        <>
            <Badge.Ribbon text="Hippies" color="cyan">
                <Card title="Pushes open the window" className='mb-5' size="large">
                    <ModalQuickPost />
                </Card>
            </Badge.Ribbon>
            {listPosts && listPosts.length > 0 &&
                listPosts.map((item, index) => {
                    return (
                        <Card key={index} className='mt-2'>
                            <div className='card-header'>
                                <NavLink to={`/user/info?id=${item.userData.id}`}>
                                    {item.userData.avatar ? '' :
                                        <Avatar className='avatar mr-3' src="https://xsgames.co/randomusers/avatar.php?g=pixel" size="large" />
                                    }
                                </NavLink>
                                <div className='text'>
                                    <NavLink to={`/user/info?id=${item.userData.id}`} className='nav-link'>
                                        {item.userData.firstName + ' ' + item.userData.lastName}
                                    </NavLink>
                                    <p className='time'>{formatDate(item.createdAt)}</p>
                                </div>

                                <div className='more'>

                                </div>

                            </div>

                            <div>
                                {item.contents}
                            </div>
                        </Card>
                    )
                })
            }
        </>
    )
}

export default Home