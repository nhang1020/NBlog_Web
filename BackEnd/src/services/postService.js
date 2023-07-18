import db from '../models/index';

let getPostsService = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await db.Post.findAll({
                order: [['createdAt', 'DESC']],
                offset: 0,
                limit: 10,
                include: [
                    { model: db.AllCode, as: 'topicData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.AllCode, as: 'privacyData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'userData', attributes: ['id', 'firstName', 'lastName', 'avatar'] }
                ],
                raw: true,
                nest: true
            });
            let images = await db.PostFile.findAll()
            resolve({
                errCode: 0,
                data: posts,
                images: images
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
            if (data.listImage) {
                const list = data.listImage.map((item, index) => ({
                    postId: post.id,
                    image: item
                }))
                await db.PostFile.bulkCreate(list)
            }
            let images = await db.PostFile.findAll()
            resolve({
                errCode: 0,
                message: 'OK',
                post: post ? post : {},
                images: images
            });
        }
        catch (error) {
            reject(error)
        }
    })
}
let deletePostService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    message: `Missing required parameter`
                })
            }
            let post = await db.Post.findOne({ where: { id: id }, raw: false });
            if (!post) {
                resolve({
                    errCode: 2,
                    message: `The post isn't exists.`
                })
            } else {
                await post.destroy();
                await db.PostFile.destroy({ where: { postId: id } })
                resolve({
                    id: post.id,
                    errCode: 0,
                    message: 'Delete post is success.'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createPostService,
    getPostsService,
    deletePostService
}