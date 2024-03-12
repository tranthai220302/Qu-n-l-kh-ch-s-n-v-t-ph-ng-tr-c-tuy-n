import { Sequelize, DataTypes } from "sequelize";
const Item = (sequelize) => sequelize.define('Item', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})


export default Item;