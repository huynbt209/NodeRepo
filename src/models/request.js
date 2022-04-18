const createModel = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', 
    {
      request_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
      },
      request_type: {
        type: DataTypes.STRING,
      },
      time_off: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.FLOAT,
      },
      content: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    },
  );
  Request.associate = function (models) {
    Request.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
  return Request
}
module.exports = createModel
