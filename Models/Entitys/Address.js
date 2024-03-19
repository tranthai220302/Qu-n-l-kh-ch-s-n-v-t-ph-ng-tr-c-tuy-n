import { Sequelize, DataTypes } from "sequelize";
const Address = (sequelize) => sequelize.define('Address', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    province:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    district : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ward : {    
        type: DataTypes.STRING, 
        allowNull: false,
    },
    numberHome : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lat : {
        type : DataTypes.FLOAT,
        allowNull : true
    },
    lng : {
        type : DataTypes.FLOAT,
        allowNull : true
    }
})


export default Address;