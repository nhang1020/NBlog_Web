import axios from '../utils/axios';

const createPostService = (data) => {
    return axios.post(`/api/create-post`, data);
}
const getPostsService = () => {
    return axios.get(`/api/get-posts`);
}
const deletePostService = (id) => {
    return axios.delete(`/api/delete-post?id=${id}`);
}
export {
    createPostService,
    getPostsService,
    deletePostService
}