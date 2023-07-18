import postService from '../services/postService';


let createPost = async (req, res) => {
    let data = req.body;
    if (!data.contents || !data.userId || !data.topic || !data.privacy) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing require parameters',
        })
    }
    try {
        let response = await postService.createPostService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
let getPosts = async (req, res) => {
    try {
        let response = await postService.getPostsService();
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
let deletePost = async (req, res) => {
    try {
        let response = await postService.deletePostService(req.query.id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
module.exports = {
    createPost,
    getPosts,
    deletePost
}