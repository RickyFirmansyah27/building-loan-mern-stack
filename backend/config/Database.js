import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'sipbogev2',
  process.env.MYSQL_USER || 'sipbogev2',
  process.env.MYSQL_PASSWORD || 'root',
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
);

export default sequelize;
