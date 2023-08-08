import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector, userPostsRemainingSelector } from '../../../../redux/selector';
import { NavLink } from 'react-router-dom'
import { Card, Avatar, Button, Popover, Popconfirm, Spin, Empty } from 'antd';
import Comment from '../HomeComponents/MainComponents/Comment';
import { formatDateEn, formatDateVi } from '../../../componentsCustom/customTime';
import { deletePost, getUserPosts } from '../../../../redux/silceReducers/postSlice';
import { v1 } from 'uuid'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from "react-infinite-scroll-component";
import { convertImage, createClass } from '../../../../utils/constants';
import { icons } from '../../../../utils/constants';
import Lighbox from '../../../componentsCustom/Lightbox';
import ShowMoreText from "react-show-more-text";
import PostCard from '../../Childcomponents/PostCard';
const MainContent = React.memo((props) => {
    const [isPending, startTransition] = useTransition();
    const dispatch = useDispatch();
    const [listPosts, setListPosts] = useState([]);
    const [listImages, setListImages] = useState([]);
    const language = useSelector(state => state.app.language);
    const user = useSelector(userInfoSelector);
    const { t } = useTranslation();
    const posts = useSelector(userPostsRemainingSelector);
    const images = useSelector(state => state.post.images);
    const [offset, setOffset] = useState(0);
    const [idx, setIdx] = useState(0);
    const [imgIndex, setImgIndex] = useState(-1);
    useEffect(() => {
        // if (!posts.length || !images.length) {
        startTransition(() => {
            dispatch(getUserPosts({
                offset: offset,
                limit: 5,
                userId: props.userId
            }));
        })
        // }
    }, [dispatch]);

    useEffect(() => {
        startTransition(() => {
            setListPosts(posts);
            setListImages(images);
        })
    }, [posts, images]);

    const hanldeDeletePost = (id) => {
        dispatch(deletePost(id));
    }
    const fetchMoreData = () => {
        startTransition(() => {
            dispatch(getUserPosts({ offset: offset + 5, limit: 5, userId: props.userId }));
        })
        setOffset((prevOffset) => prevOffset + 5);
    };
    const getPhoto = (index, postId) => {
        setImgIndex(index);
        setIdx(postId);
    }
    return (
        <>
            {isPending ? <Spin style={{ width: '100%' }} /> : listPosts.length === 0 ? <Empty description="Chưa có bài viết nào" /> : null}

            <InfiniteScroll
                dataLength={listPosts.length + 5}
                next={fetchMoreData}
                hasMore={true}
                loader={isPending ? <Spin style={{ width: '100%' }} /> : null}
            >
                <div className='m-3'>
                    {listPosts && listPosts.length > 0 && listPosts.map((item, index) => {
                        return item.userId === +props.userId ? (
                            user.id !== +props.userId && item.privacy === "P2" ? null :
                                <PostCard item={item} key={index} listImages={listImages} getPhoto={getPhoto} />
                        ) : null
                    })
                    }
                </div>
                <Lighbox index={imgIndex} setIndex={setImgIndex}
                    photos={listImages
                        .filter(i => i.postId === idx)
                        .map(m => ({ src: convertImage(m.image) }))} />
            </InfiniteScroll>
        </>
    )
})

export default MainContent