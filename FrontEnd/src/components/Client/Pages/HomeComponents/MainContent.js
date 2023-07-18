import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { postsRemainingSelector, postImagesRemainingSelector, userInfoSelector } from '../../../../redux/selector';
import { NavLink } from 'react-router-dom'
import { Card, Avatar, Button, Skeleton, Modal, Popover, Popconfirm } from 'antd';
import { LikeOutlined, MessageOutlined, LikeFilled } from '@ant-design/icons'

import { formatDateEn, formatDateVi } from '../../../componentsCustom/customTime';

import { deletePost, getPosts } from '../../../../redux/silceReducers/postSlice';
import { v1 } from 'uuid'
const Buffer = require('buffer/').Buffer;
const icons = [<i className="bi bi-globe-americas"></i>, <i className="bi bi-person-heart"></i>, <i className="bi bi-file-earmark-lock2"></i>]

const MainContent = React.memo(() => {
    const dispatch = useDispatch();
    const [listPosts, setListPosts] = useState([]);
    const [listImages, setListImages] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const language = useSelector(state => state.app.language);
    const user = useSelector(userInfoSelector);
    // const { t } = useTranslation();
    const posts = useSelector(postsRemainingSelector);
    const images = useSelector(postImagesRemainingSelector);
    const loading = useSelector(state => state.post.loading);

    useEffect(() => {
        if (!posts.length || !images.length) {
            dispatch(getPosts());
        }
    }, [dispatch]);
    useEffect(() => {
        setListPosts(posts);
        setListImages(images);
    }, [posts, images]);

    const convertImage = (image) => {
        let base64String = ''
        if (image) {
            base64String = new Buffer(image, 'base64').toString('binary');
        }
        return base64String;
    }

    const hanldeDeletePost = (id) => {
        dispatch(deletePost(id));
    }
    return (
        <>
            {loading === false ?
                <div className='m-3'>
                    {listPosts && listPosts.length > 0 &&
                        listPosts.map((item, index) => {
                            return (
                                <Card key={index} className='mt-3 card-custom'>
                                    <div className='card-header'>
                                        <div className='flex-heder'>
                                            <div className='avatar'>
                                                <NavLink to={`/user/info/${item.userData.id}`}>
                                                    {item.userData.avatar ?
                                                        <Avatar src={convertImage(item.userData.avatar)} size="large" />
                                                        :
                                                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" size="large" />
                                                    }
                                                </NavLink>
                                            </div>
                                            <div className='text'>
                                                <NavLink to={`/user/info/${item.userData.id}`} className='nav-link'>
                                                    {language === 'vi' ? `${item.userData.lastName} ${item.userData.firstName}` : `${item.userData.firstName} ${item.userData.lastName}`}
                                                </NavLink>
                                                <p className='time'>
                                                    {language === 'vi' ? formatDateVi(item.createdAt) : formatDateEn(item.createdAt)} &#x2022; &nbsp;

                                                    {item.privacy === 'P0' ? icons[0] : ''}
                                                    {item.privacy === 'P1' ? icons[1] : ''}
                                                    {item.privacy === 'P2' ? icons[2] : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='more'>
                                            {user && user.id === item.userData.id ?
                                                <Popover placement="bottomRight"
                                                    content={
                                                        <Popconfirm
                                                            title="Thông báo"
                                                            description="Bạn có chắc bài viết này không"
                                                            okText="Có"
                                                            cancelText="Không"
                                                            onConfirm={() => hanldeDeletePost(item.id)}
                                                            key={v1()}
                                                        >
                                                            <Button className='border-0'>Xóa bài viết</Button>
                                                        </Popconfirm>
                                                    } trigger="click">
                                                    <Button className='border-0'><i className="bi bi-three-dots-vertical"></i></Button>
                                                </Popover>
                                                : ''}
                                        </div>
                                    </div>

                                    <div className='card-body'>
                                        {item.contents}
                                    </div>
                                    {
                                        listImages.some(img => img.postId === item.id) === true ?

                                            <div className='mt-3'>
                                                <Carousel data-bs-theme="dark" interval={null} className='carousel'>
                                                    {listImages && listImages.length > 0 &&
                                                        listImages.map((imageItem, imgIndex) => {
                                                            return imageItem.postId === item.id ?
                                                                <Carousel.Item key={imgIndex}>
                                                                    <img
                                                                        className="d-block "
                                                                        src={convertImage(imageItem.image)}
                                                                        alt="silde"
                                                                    />
                                                                </Carousel.Item>

                                                                : ''
                                                        })
                                                    }
                                                </Carousel>
                                            </div>
                                            : ''}
                                    <div className='card-action'>
                                        <hr />
                                        <div className='action-butoon'>
                                            <Button className='border-0' onClick={() => setIsLiked(!isLiked)}>
                                                {isLiked ? <LikeFilled /> : <LikeOutlined />}
                                            </Button>
                                            120
                                            <Button className='border-0'><MessageOutlined /></Button>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>

                : <Card> <Skeleton avatar active /></Card>}
        </>
    )
})

export default MainContent