import { Sequelize, DataTypes } from "sequelize";
const Customer = (sequelize) => sequelize.define('Customer', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true, 
    },
    emailBook: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameBook: {
      type: DataTypes.STRING,
    },
    genDerBook: {
      type: DataTypes.STRING,
    },
    phoneBook: {
      type: DataTypes.INTEGER
    },
    addressBooking : {
      type : DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATEONLY, 
    },
    updatedAt: {
      type: DataTypes.DATEONLY, 
    },
});

export default Customer;