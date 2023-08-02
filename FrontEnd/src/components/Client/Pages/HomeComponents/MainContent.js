import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsRemainingSelector, postImagesRemainingSelector, userInfoSelector } from '../../../../redux/selector';
import { NavLink } from 'react-router-dom'
import { Card, Avatar, Button, Skeleton, Popover, Popconfirm, message, Spin } from 'antd';
import Comment from './MainComponents/Comment';
import { formatDateEn, formatDateVi } from '../../../componentsCustom/customTime';
import { deletePost, getPosts } from '../../../../redux/silceReducers/postSlice';
import { v1 } from 'uuid'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from "react-infinite-scroll-component";
import { convertImage } from '../../../../utils/constants';
import { icons } from '../../../../utils/constants';
import './MainComponents/MainContent.scss';
import Lighbox from '../../../componentsCustom/Lightbox';

const MainContent = React.memo(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const [listPosts, setListPosts] = useState([]);
    const [listImages, setListImages] = useState([]);
    const language = useSelector(state => state.app.language);
    const user = useSelector(userInfoSelector);
    const { t } = useTranslation();
    const posts = useSelector(postsRemainingSelector);
    const images = useSelector(postImagesRemainingSelector);
    const [offset, setOffset] = useState(0);
    const [idx, setIdx] = useState(0);
    const [imgIndex, setImgIndex] = useState(-1);
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
        if (!posts.length || !images.length) {
            dispatch(getPosts({
                offset: offset,
                limit: 5
            }));
        }
    }, [dispatch]);
    useEffect(() => {
        startTransition(() => {
            setListPosts(posts);
            setListImages(images);
        })

    }, [posts, images]);

    const hanldeDeletePost = (id) => {
        dispatch(deletePost(id)).then((res) => {
            if (res.payload.errCode === 0) {
                messageApi.success("Xóa thành công")
            } else {
                messageApi.error(res.payload.message);
            }
        });
    }
    const fetchMoreData = () => {
        dispatch(getPosts({ offset: offset + 5, limit: 5 })).then((res) => {
            let list = listPosts.concat(res.payload.data);
            setListPosts(list)
        });
        setOffset((prevOffset) => prevOffset + 5);
    };
    const getPhoto = (index, postId) => {
        setImgIndex(index);
        setIdx(postId);
    }
    const createClass = (list) => {
        let length = list.length;
        if (length === 1) {
            return 'one-item'
        } else if (length === 2) {
            return 'two-items'
        } else {
            return 'photo'
        }
    }
    return (
        <>
            {contextHolder}
            {isPending ? <Spin style={{ width: '100%' }} /> : null}
            <InfiniteScroll
                dataLength={listPosts.length + 5}
                next={fetchMoreData}
                hasMore={true}
                loader={<Card className='m-3' title='Loading...'> <Skeleton avatar active /></Card>}
            >
                <div className='m-3'>
                    {listPosts && listPosts.length > 0 && listPosts.map((item, index) => {
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
                                                {language === 'vi' ? `${item.userData.lastName} ${item.userData.firstName}`
                                                    : `${item.userData.firstName} ${item.userData.lastName}`}
                                            </NavLink>
                                            <p className='time'>
                                                {language === 'vi' ? formatDateVi(item.createdAt) : formatDateEn(item.createdAt)} &#x2022; &nbsp;

                                                {item.privacy === 'P0' ? icons[0] : ''}
                                                {item.privacy === 'P1' ? icons[1] : ''}
                                                {item.privacy === 'P2' ? icons[2] : ''}
                                            </p>
                                        </div>
                                        {item.userData.role === 'R0' ?
                                            <Popover content={t("admin")} placement='topLeft'>
                                                <i className="bi bi-patch-check-fill text-primary m-2"></i>
                                            </Popover> : ''}
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

                                <div className={`card-body theme-${item.theme}`}>
                                    <p>{item.contents}</p>
                                </div>
                                <div className='images'>
                                    {
                                        listImages && listImages.some(img => img.postId === item.id) === true ?

                                            <div className='mt-3'>

                                                {listImages && listImages.length > 0 &&
                                                    listImages
                                                        .filter(i => i.postId == item.id)
                                                        .map
                                                        ((imageItem, imgIndex) => {
                                                            return imageItem.postId === item.id ?
                                                                <div key={imgIndex} className={`${createClass(listImages
                                                                    .filter(i => i.postId == item.id))} ${listImages
                                                                        .filter(i => i.postId == item.id).length === 5 &&
                                                                        (imgIndex === 3 || imgIndex === 4) ? 'another-items' : ''} ${listImages
                                                                            .filter(i => i.postId == item.id).length === 4 && imgIndex === 3 ? 'fourth-item' : ''}`}

                                                                    style={{ background: `url(${convertImage(imageItem.image)})` }}
                                                                    onClick={() => getPhoto(imgIndex, item.id)}></div>
                                                                : null
                                                        })
                                                }
                                                {/* {
                                                    listImages
                                                        .filter(i => i.postId == item.id)
                                                        .map(m => ({ src: convertImage(m.image) })).length > 5 && (
                                                        <div className='more-photos'
                                                            onClick={() => getPhoto(6, item.id)}
                                                        >
                                                            <h3>+{listImages
                                                                .filter(i => i.postId == item.id)
                                                                .map(m => ({ src: convertImage(m.image) })).length - 5}
                                                            </h3>
                                                        </div>
                                                    )
                                                } */}
                                            </div>
                                            : ''}
                                </div>
                                <div className='card-action'>
                                    <hr />
                                    <Comment post={item} />
                                </div>
                            </Card>
                        )
                    })
                    }
                </div>
                <Lighbox index={imgIndex} setIndex={setImgIndex}
                    photos={listImages
                        .filter(i => i.postId == idx)
                        .map(m => ({ src: convertImage(m.image) }))} />
            </InfiniteScroll>
        </>
    )
})

export default MainContent