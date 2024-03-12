import { Sequelize, DataTypes } from "sequelize";
const BookingPriceRoom = (sequelize) => sequelize.define('BookingPriceRoom', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numRoom : {
        type : DataTypes.INTEGER,
    }
})


export default BookingPriceRoom;