import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Gedung from './GedungModel.js'; 

const RekBooking = db.define('bookingreq', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  gedungId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  namaGedung: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  jamMulai: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jamSelesai: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  request: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "accepted",
  },
}, {
  freezeTableName: true,
});

RekBooking.belongsTo(Gedung, {
  foreignKey: 'gedungId',
  targetKey: 'id',
});

export default RekBooking;
