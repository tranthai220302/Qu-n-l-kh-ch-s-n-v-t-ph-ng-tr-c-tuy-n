import { Sequelize, DataTypes } from "sequelize";
const User = (sequelize) => sequelize.define('User', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true, 
    } ,
    password :{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    genDer: {
      type: DataTypes.STRING,
    },
    avatar:{
      type: DataTypes.TEXT('long')
    },
    phone: {
      type: DataTypes.INTEGER
    },
    birthDate : {
      type: DataTypes.DATEONLY  
    },
    createdAt: {
      type: DataTypes.DATEONLY, 
    },
    updatedAt: {
      type: DataTypes.DATEONLY, 
    },
    idRole : {
      type : DataTypes.INTEGER
    }
});

export default User;