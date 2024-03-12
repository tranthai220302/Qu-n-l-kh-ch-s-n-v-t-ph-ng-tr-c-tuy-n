import { Sequelize, DataTypes } from "sequelize";
const Favourite = (sequelize) => sequelize.define('Favourite', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})


export default Favourite;