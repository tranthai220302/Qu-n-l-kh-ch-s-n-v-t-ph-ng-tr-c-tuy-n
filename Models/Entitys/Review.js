import { Sequelize, DataTypes } from "sequelize";
const Review = (sequelize) => sequelize.define('Review', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    desc:{
        type: DataTypes.STRING,
        allowNull: false
    },
    img : {
        type : DataTypes.STRING(1000),
        defaultValue : ''
    }
})


export default Review;