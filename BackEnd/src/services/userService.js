import db from '../models/index';
import bcrypt from 'bcryptjs';

var salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resovle, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resovle(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}
let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: userEmail } });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}


let createUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already exists. Please try another email!'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                let response =
                    await db.User.create({
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        birth: data.birth,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        role: data.role,
                        avatar: data.avatar,
                        status: data.status
                    },)
                let resUser = await db.User.findOne({ where: { id: response.id }, nest: true })
                resolve({
                    errCode: 0,
                    message: 'OK',
                    user: resUser
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getUsersSevice = async (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = null;
            if (limit === 'All' || !limit || limit === 'all' || isNaN(limit)) {
                users = await db.User.findAll({
                    attributes: { exclude: ['password'] },
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
            } else {
                console.log(limit);
                users = await db.User.findAll({
                    limit: +limit,
                    attributes: { exclude: ['password'] },
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
            }
            resolve({
                data: users,
                errCode: 0,
                message: 'OK'
            });
        } catch (error) {
            reject(error);
        }
    })
}
let deleteUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId }, raw: false });
            if (!user) {
                resolve({
                    errCode: 2,
                    message: `The user doesn't exists.`
                })
            } else {
                await user.destroy();
                resolve({
                    errCode: 0,
                    message: 'Delete user is succeed!',
                    userId
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createUserService,
    getUsersSevice,
    deleteUserService
}