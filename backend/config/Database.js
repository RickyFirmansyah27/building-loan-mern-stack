import { Sequelize } from "sequelize";

const db = new Sequelize('sipbogev02', 'root','', {
    host:"localhost",
    dialect: "mysql"
});

export default db;