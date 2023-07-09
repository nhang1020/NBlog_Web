import userService from '../services/userService';


let getUsers = async (req, res) => {
    try {
        let response = await userService.getUsersSevice(req.query.limit);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}

let createUser = async (req, res) => {
    let data = req.body;
    if (!data.email || !data.password || !data.firstName || !data.lastName) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing require parameters',
        })
    }
    try {
        let response = await userService.createUserService(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
let deleteUser = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameters',
        })
    }
    let message = await userService.deleteUserService(req.query.id);
    return res.status(200).json(message);
}
module.exports = {
    createUser,
    getUsers,
    deleteUser,
}