import express from "express";
import userController from '../controllers/userController';
import postController from '../controllers/postController';
import appController from '../controllers/appController';
let router = express.Router();
let initWebRoutes = (app) => {
    //Login
    router.post('/api/login', appController.handleLogin);
    router.post('/api/send-email', appController.handleSendEmail);
    router.post('/api/check-exists-email', appController.checkExistsEmail);
    router.post('/api/login-social', appController.handleLoginSocial);
    //api all code
    router.post('/api/get-allcode', appController.getAllCode);
    //api user
    router.get('/api/get-users', userController.getUsers);
    router.post('/api/create-user', userController.createUser);
    router.delete('/api/delete-user', userController.deleteUser);

    //api posts
    router.post('/api/create-post', postController.createPost);
    router.get('/api/get-posts', postController.getPosts);

    return app.use("/", router)
}

module.exports = initWebRoutes;