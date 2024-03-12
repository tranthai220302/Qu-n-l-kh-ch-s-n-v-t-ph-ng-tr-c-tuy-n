import { Sequelize, DataTypes } from "sequelize";
const PriceRoom = (sequelize) => sequelize.define('PriceRoom', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numberPerson:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    numRoom : {
        type : DataTypes.INTEGER,
        allowNull: false
    }
})


export default PriceRoom;