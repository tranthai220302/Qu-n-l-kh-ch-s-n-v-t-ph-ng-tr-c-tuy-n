import { Sequelize, DataTypes } from "sequelize";
const HotelOwner = (sequelize) => sequelize.define('HotelOwner', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    businessDoc :{
        type: DataTypes.TEXT('long')
    }
})


export default HotelOwner;