import axios from '../utils/axios';

const getAllCodeService = () => {
    return axios.post(`/api/get-allcode`);
}
const createUserService = (data) => {
    return axios.post(`/api/create-user`, data);
}
const getUsersService = (limit) => {
    return axios.get(`/api/get-users?limit=${limit}`);
}
const deleteService = (userId) => {
    return axios.delete(`/api/delete-user?id=${userId}`);
}
export {
    getAllCodeService,
    createUserService,
    getUsersService,
    deleteService
}