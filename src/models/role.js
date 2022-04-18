const createModel = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', 
    {
      role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    },
  );
  Role.associate = function (models) {
    Role.hasMany(models.User, { foreignKey: "role_id", as: "user" });
  }
  return Role
}
module.exports = createModel
