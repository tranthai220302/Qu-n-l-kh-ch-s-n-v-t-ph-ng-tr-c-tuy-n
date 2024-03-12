import { Sequelize, DataTypes } from "sequelize";
const Category = (sequelize) => sequelize.define('Category', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    img : {
        type : DataTypes.TEXT('long')
    },
    desc : {
        type : DataTypes.TEXT('long')
    }
})


export default Category;