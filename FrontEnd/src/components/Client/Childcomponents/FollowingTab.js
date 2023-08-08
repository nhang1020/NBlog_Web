import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsRemainingSelector, postImagesRemainingSelector, relationshipsRemainingSelector, userInfoSelector } from '../../../redux/selector';
import { convertImage } from '../../../utils/constants';
import Lighbox from '../../componentsCustom/Lightbox';
import PostCard from './PostCard';


const FollowingTab = () => {
    const dispatch = useDispatch();
    const [listPosts, setListPosts] = useState([]);
    const [listImages, setListImages] = useState([]);
    const posts = useSelector(postsRemainingSelector);
    const images = useSelector(postImagesRemainingSelector);
    const [offset, setOffset] = useState(0);
    const [idx, setIdx] = useState(0);
    const [imgIndex, setImgIndex] = useState(-1);
    const relationships = useSelector(relationshipsRemainingSelector);
    const user = useSelector(userInfoSelector);

    useEffect(() => {
        let userFollow = relationships.filter(item => {
            if (item.performerId == user.id) {
                return item
            }
        })
        console.log(userFollow);
        setListPosts(posts.filter(item => {
            if (userFollow.some(u => u.receiverId == item.userId)) {
                return item;
            }
        }))
        setListImages(images);

    }, [posts, images]);

    const getPhoto = (index, postId) => {
        setImgIndex(index);
        setIdx(postId);
    }
    return (
        <>

            <div className='m-3'>
                {listPosts && listPosts.length > 0 && listPosts.map((item, index) => {
                    return (
                        <PostCard item={item} key={index} listImages={listImages} getPhoto={getPhoto} />
                    )
                })
                }
            </div>
            <Lighbox index={imgIndex} setIndex={setImgIndex}
                photos={listImages
                    .filter(i => i.postId === idx)
                    .map(m => ({ src: convertImage(m.image) }))} />


        </>
    )
}

export default FollowingTab