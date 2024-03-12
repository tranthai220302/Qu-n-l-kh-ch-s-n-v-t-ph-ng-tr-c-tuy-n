import { Sequelize, DataTypes } from "sequelize";
const Services = (sequelize) => sequelize.define('Services', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name :{
        type: DataTypes.STRING
    }
})


export default Services;