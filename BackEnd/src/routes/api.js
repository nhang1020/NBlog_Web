import express from "express";
import connectQuery from "../config/connectDBQuery";
let router = express.Router();
let initWebRoutes = (app) => {
    //api
    router.get('/', async (req, res) => {
        let result = await connectQuery.query("SELECT * from chuyennganh")
        return res.send(result[0]);
    })
    return app.use("/", router)
}

module.exports = initWebRoutes;