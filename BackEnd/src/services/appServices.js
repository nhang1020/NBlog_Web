
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

let handleLoginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'role', 'password', 'firstName', 'lastName', 'avatar'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let checkPassword = bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.message = "OK";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Password is wrong!'
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = 'User not found';
                }
            } else {
                userData.errCode = 1;
                userData.message = 'Your email not exist';
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let handleLoginSocialService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkEmail(data.email)
            if (isExist) {
                //login
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'role', 'firstName', 'lastName', 'avatar'],
                    where: { email: data.email },
                    raw: true
                })
                if (user) {
                    userData.errCode = 0;
                    userData.message = "OK"
                    userData.user = user;
                }
            } else {
                let response =
                    await db.User.create({
                        email: data.email,
                        firstName: data.family_name,
                        lastName: data.given_name,
                        role: 'R1',
                        status: 1
                    },)
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'role', 'firstName', 'lastName', 'avatar'],
                    where: { email: response.email },
                    raw: true
                })
                if (user) {
                    userData.errCode = 0;
                    userData.message = "OK"
                    userData.user = user;
                }
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

//getAllCode
let getAllCodeService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allcode = await db.sequelize.query(`SELECT * FROM allcodes`, {
                nest: true
            });
            resolve({
                errCode: 0,
                data: allcode,
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCodeService,
    handleLoginService,
    handleLoginSocialService
}