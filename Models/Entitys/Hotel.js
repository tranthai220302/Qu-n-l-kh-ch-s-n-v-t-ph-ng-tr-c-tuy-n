import { Sequelize, DataTypes } from "sequelize";
const Hotel = (sequelize) => sequelize.define('Hotel', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    numStars : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description : {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    isBreakfast : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false
    },
    isParking : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false
    },
    isPaymentOff : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false
    },
    timeCheckOut : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    timeCheckIn : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    numReservations : {
        type : DataTypes.INTEGER,
        defaultValue : 0,
    },
    isAnimals : {
        type : DataTypes.BOOLEAN,
        default : true
    },
    isConfirm : {
        type : DataTypes.INTEGER,
        defaultValue : 0
    }
})


export default Hotel;