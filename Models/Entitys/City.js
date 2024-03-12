import { Sequelize, DataTypes } from "sequelize";
const CityImg = (sequelize) => sequelize.define('CityImg', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    filename:{
        type: DataTypes.STRING,
        allowNull: false
    },
    name : {
        type : DataTypes.STRING
    }
})


export default CityImg;