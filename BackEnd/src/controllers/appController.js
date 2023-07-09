import appServices from '../services/appServices';
import emailServices from '../services/emailServices'
let getAllCode = async (req, res) => {
    try {
        let data = await appServices.getAllCodeService(req.body);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing  inputs parmeter!'
        });
    }
    let userData = await appServices.handleLoginService(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {},
    })
}

let handleLoginSocial = async (req, res) => {
    let userData = await appServices.handleLoginSocialService(req.body);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {},
    })
}



let handleSendEmail = async (req, res) => {
    let data = req.body;
    try {
        if (!data.firstName || !data.email || !data.lastName || !data.otp) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing  inputs parmeter!'
            });
        }
        let response = await emailServices.sendEmail(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }

}
let checkExistsEmail = async (req, res) => {
    if (!req.body.email) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing require parameters',
        })
    }
    try {

        let response = await emailServices.checkExistsEmailService(req.body.email);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}
module.exports = {
    getAllCode,
    handleLogin,
    handleSendEmail,
    checkExistsEmail,
    handleLoginSocial
}