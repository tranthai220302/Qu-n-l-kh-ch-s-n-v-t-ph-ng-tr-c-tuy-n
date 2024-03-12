import { Sequelize, DataTypes } from "sequelize";
const Room = (sequelize) => sequelize.define('Room', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isSmoke : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false    
    },
    numPersonMax : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
})


export default Room;