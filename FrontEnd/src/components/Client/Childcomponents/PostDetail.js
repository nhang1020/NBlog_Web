import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail } from '../../../redux/silceReducers/postSlice';
import { imagesPostRemainingSelector, postDetailRemainingSelector } from '../../../redux/selector';
import Lighbox from '../../componentsCustom/Lightbox';
import { convertImage } from '../../../utils/constants';
const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const [post, setPost]=useState({});
    const post = useSelector(postDetailRemainingSelector);
    const images = useSelector(imagesPostRemainingSelector);
    const [idx, setIdx] = useState(0);
    const [imgIndex, setImgIndex] = useState(-1);
    const getPhoto = (index, postId) => {
        setImgIndex(index);
        setIdx(postId);
    }
    useEffect(() => {
        dispatch(getPostDetail(id)).then((res) => {

        })
    }, []);

    useEffect(() => {
        // console.log(images);
        if (!post) {
            console.log("d");
        } else {
            console.log(post);
        }
    }, [images, post])

    return (
        <div className='mid-content'>

            <PostCard item={post} key={0} listImages={images} getPhoto={getPhoto} />

            <Lighbox index={imgIndex} setIndex={setImgIndex}
                photos={images
                    .filter(i => i.postId === idx)
                    .map(m => ({ src: convertImage(m.image) }))} />
        </div>
    )
}

export default PostDetail