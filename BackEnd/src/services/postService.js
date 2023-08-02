import db from '../models/index';

let getPostsService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await db.Post.findAll({
                order: [['createdAt', 'DESC']],
                offset: +data.offset,
                limit: +data.limit,
                where: data.userId ? { userId: data.userId } : {},
                include: [
                    // { model: db.AllCode, as: 'topicData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.AllCode, as: 'privacyData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'userData', attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'] },
                ],
                raw: true,
                nest: true
            });
            // const idsArray = posts.map((item) => item.id);

            let haveImages = false;

            let images = data.offset == 0 ?
                await db.sequelize.query(`SELECT postFiles.*, users.id as userId FROM postFiles, posts, users  WHERE posts.id = postfiles.postId and users.id = posts.userId and(postFiles.postId in (SELECT posts.id FROM users, posts WHERE users.id=posts.userId))
                `) : [];
            images.length ? haveImages = true : false;


            let likes = await db.Like.findAll();
            resolve({
                errCode: 0,
                data: posts,
                images: images[0],
                likes: likes,
                haveImages: haveImages
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
                    { model: db.AllCode, as: 'privacyData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.User, as: 'userData', attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'] },
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
            let images = await db.PostFile.findAll();
            let likes = await db.Like.findAll();
            resolve({
                errCode: 0,
                message: 'OK',
                post: post ? post : {},
                images: images,
                likes: likes
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
                await db.Comment.destroy({ where: { postId: id } })
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
let commentPostService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Comment.create({
                postId: data.postId,
                userId: data.userId,
                content: data.content,
                parentComment: data.parentComment ? data.parentComment : null
            })
            let comments = await db.Comment.findOne({
                where: { id: response.id },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.User, as: 'userComment', attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'] }
                ],
                raw: true,
                nest: true
            });
            resolve({
                errCode: 0,
                message: 'OK',
                comment: comments,
            });
        }
        catch (error) {
            reject(error)
        }
    })
}
let getCommentsService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.postId) {
                resolve({
                    errCode: 1,
                    message: "Missing parameters"
                })
            }
            let comments = await db.Comment.findAll({
                offset: 0,
                // limit: ,
                where: { postId: data.postId },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.User, as: 'userComment', attributes: ['id', 'firstName', 'lastName', 'avatar', 'role'] }
                ],
                raw: true,
                nest: true
            });
            resolve({
                errCode: 0,
                comments: comments
            })
        } catch (error) {
            reject(error)
        }
    })
}

let likeExists = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let like = await db.Like.findOne({ where: { postId: data.postId, userId: data.userId } });
            if (like) {
                resolve({
                    check: true,
                    idComment: like.id
                });
            } else {
                resolve({
                    check: false,
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
let likePostService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.postId || !data.userId) {
                resolve({
                    errCode: 1,
                    message: "Missing parameters"
                })
            }
            let res = await likeExists(data);
            let response = {};
            if (res.check) {
                await db.Like.destroy({ where: { postId: data.postId, userId: data.userId } })
                response = res.idComment;
            }
            else {
                response = await db.Like.create({
                    postId: data.postId,
                    userId: data.userId,
                })
            }

            resolve({
                errCode: 0,
                message: 'OK',
                like: response,
                check: res.check
            });
        }
        catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createPostService,
    getPostsService,
    deletePostService,
    commentPostService,
    getCommentsService,
    likePostService,
}