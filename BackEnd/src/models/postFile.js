'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PostFile extends Model {
        static associate(models) {
            // define relationship here
            PostFile.belongsTo(models.Product, { foreignKey: 'postId' });
        }
    };
    PostFile.init({
        postId: DataTypes.INTEGER,
        folderName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'PostFile',
    });
    return PostFile;
};