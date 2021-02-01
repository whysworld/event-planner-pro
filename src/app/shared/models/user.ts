import { Sequelize, DataTypes, Model } from "sequelize";
const getUserModel = (sequelize: Sequelize): any => {
  class User extends Model {}

  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      zip_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      instagram: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      knot: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name
      tableName: "users"
    }
  );
};

export default getUserModel;
