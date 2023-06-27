'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            // define relationship here
            Post.belongsTo(models.AllCode, { foreignKey: 'topic', targetKey: 'keyMap', as: 'topicData' });
            Post.belongsTo(models.User, { foreignKey: 'userId', as: 'userData' });
            Post.hasMany(models.PostFile, { foreignKey: 'postId' });
        }
    };
    Post.init({
        userId: DataTypes.STRING,
        topic: DataTypes.STRING,
        contents: DataTypes.TEXT('long'),
        theme: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};