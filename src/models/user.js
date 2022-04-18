const createModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', 
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
      },
      full_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      time_off_total: {
        type: DataTypes.FLOAT,
      },
      time_off_remain: {
        type: DataTypes.FLOAT,
      },
      is_locked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    },
  );
  User.associate = function (models) {
    User.belongsTo(models.Role, { foreignKey: "role_id", as: "role" });
    User.hasMany(models.Request, { foreignKey: "user_id", as: "request"});
  }
  return User
}
module.exports = createModel
