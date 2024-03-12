import { Sequelize, DataTypes } from "sequelize";
const CategoryItem = (sequelize) => sequelize.define('CategoryItem', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
})


export default CategoryItem;