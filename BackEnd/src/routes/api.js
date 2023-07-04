import express from "express";
import userController from '../controllers/userController';
let router = express.Router();
let initWebRoutes = (app) => {
    //api all code
    router.post('/api/get-allcode', userController.getAllCode);
    //api user
    router.get('/api/get-users', userController.getUsers);
    router.post('/api/create-user', userController.createUser);
    router.delete('/api/delete-user', userController.deleteUser);

    return app.use("/", router)
}

module.exports = initWebRoutes;