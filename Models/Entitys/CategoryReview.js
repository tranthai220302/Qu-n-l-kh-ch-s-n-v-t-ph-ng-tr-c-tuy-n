import { Sequelize, DataTypes } from "sequelize";
const CategoryRating = (sequelize) => sequelize.define('CategoryRating', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
})


export default CategoryRating;