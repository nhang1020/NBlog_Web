
import axios from '../utils/axios';

const getUserDetailService = (id) => {
    return axios.get(`/api/get-user-detail?id=${id}`);
}
const editUserService = (data) => {
    return axios.put(`/api/edit-user`, data);
}

export {
    getUserDetailService,
    editUserService
}