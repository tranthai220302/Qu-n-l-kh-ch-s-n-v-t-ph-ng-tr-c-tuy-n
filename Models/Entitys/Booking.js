import { Sequelize, DataTypes } from "sequelize";
const Booking = (sequelize) => sequelize.define('Booking', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateCheckIn : {
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    dateCheckOut : {
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    numAudults : {
        type : DataTypes.STRING,
        allowNull : false
    },
    numChildrens : {
        type : DataTypes.STRING,
        allowNull : false
    },
    priceTotal : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    pinCode : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
})


export default Booking;