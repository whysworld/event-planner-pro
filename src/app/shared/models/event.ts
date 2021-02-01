import { Sequelize, DataTypes, Model } from "sequelize";

const getEventModel = (sequelize: Sequelize): any => {
  class Event extends Model {}

  return Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      time: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      exact: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      guest: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "events"
    }
  );
};

export default getEventModel;
