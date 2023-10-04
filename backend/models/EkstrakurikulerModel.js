import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Ekstrakurikuler = db.define('ekstrakurikuler',{
    name: DataTypes.STRING,
    jumlah: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Ekstrakurikuler;

// (async()=>{
//     await db.sync();
// })();