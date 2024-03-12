import { Sequelize, DataTypes } from "sequelize";
const Address = (sequelize) => sequelize.define('address', {
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
    imgProvince : {
        type : DataTypes.TEXT('long')
    },
    imgDistrict : {
        type: DataTypes.TEXT('long')
    }
})


export default Address;