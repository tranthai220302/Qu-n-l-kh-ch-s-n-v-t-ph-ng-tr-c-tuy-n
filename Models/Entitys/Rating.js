import { Sequelize, DataTypes } from "sequelize";
const Rating = (sequelize) => sequelize.define('Rating', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    score : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
})


export default Rating;