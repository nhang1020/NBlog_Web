import db from '../models/index';

let getPostsService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await db.Post.findAll({
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.AllCode, as: 'topicData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.AllCode, as: 'privacyData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'userData', attributes: ['id', 'firstName', 'lastName'] }
                ],
                raw: true,
                nest: true
            });
            resolve({
                errCode: 0,
                data: posts,
            })
        } catch (error) {
            reject(error)
        }
    })
}

let createPostService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Post.create({
                userId: data.userId,
                topic: data.topic,
                contents: data.contents,
                theme: data.theme,
                privacy: data.privacy,
            })
            let post = await db.Post.findOne({
                where: { id: response.id },
                include: [
                    { model: db.AllCode, as: 'topicData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.AllCode, as: 'privacyData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'userData', attributes: ['id', 'firstName', 'lastName'] }
                ],
                raw: true,
                nest: true
            });
            resolve({
                errCode: 0,
                message: 'OK',
                post: post
            });
        }
        catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createPostService,
    getPostsService
}