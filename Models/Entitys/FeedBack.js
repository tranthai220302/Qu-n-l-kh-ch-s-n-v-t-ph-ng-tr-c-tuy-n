import { Sequelize, DataTypes } from "sequelize";
const FeedBack = (sequelize) => sequelize.define('FeedBack', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    feedback:{
        type: DataTypes.STRING,
        allowNull: false
    },
})


export default FeedBack;