'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PostFile extends Model {
        static associate(models) {
            // define relationship here
            PostFile.belongsTo(models.Post, { foreignKey: 'postId' });
        }
    };
    PostFile.init({
        postId: DataTypes.INT,
        folderName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'postFile',
    });
    return PostFile;
};