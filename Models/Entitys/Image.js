import { Sequelize, DataTypes } from "sequelize";
const Image = (sequelize) => sequelize.define('Image', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    filename:{
        type: DataTypes.STRING,
        allowNull: false
    },
})


export default Image;