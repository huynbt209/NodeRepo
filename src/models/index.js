const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require('dotenv').config()
const basename = path.basename(__filename);
const db = {};

let sequelize;
const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_DIALECT} = process.env;
sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, { DATABASE_HOST, dialect:DATABASE_DIALECT });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
