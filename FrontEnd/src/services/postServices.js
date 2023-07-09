import axios from '../utils/axios';

const createPostService = (data) => {
    return axios.post(`/api/create-post`, data);
}
const getPostsService = () => {
    return axios.get(`/api/get-posts`);
}
export {
    createPostService,
    getPostsService
}