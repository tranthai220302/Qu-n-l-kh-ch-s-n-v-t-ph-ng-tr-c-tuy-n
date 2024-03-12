import { Sequelize, DataTypes } from "sequelize";
const Question = (sequelize) => sequelize.define('Question', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question:{
        type: DataTypes.STRING,
        allowNull: false
    },
})


export default Question;