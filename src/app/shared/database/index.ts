import { Sequelize, Dialect } from "sequelize";
import getUserModel from "../models/user";
import getEventModel from "../models/event";
import config from "../config";

interface DB{
  sequelize?: Sequelize,
  User?: any,
  Event?: any
}
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect as Dialect,
 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
 
const db: DB = {
  sequelize: sequelize,
  User: getUserModel(sequelize),
  Event: getEventModel(sequelize)
};

export default db;