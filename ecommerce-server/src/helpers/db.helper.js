//for config
const { MYSQL_DB_CONFIG } = require("../config/db.config");

//for mysql connection
const mysql = require("mysql2/promise");

//for Sequelize ORM
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  const { HOST, USER, PORT, PASSWORD, DB } = MYSQL_DB_CONFIG;

  const connection = await mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
  });

  await connection.query(`Create database if not exists \`${DB}\`;`);

  //connect to db
  const sequelize = new Sequelize(DB, USER, PASSWORD, {
    dialect: "mysql",
    host: HOST,
  });

  db.Category = require("../category/category.model" )(
    sequelize
  );
  db.Product = require("../product/product.model" )(
    sequelize
  );
  db.Category.hasMany(db.Product);
  db.Product.belongsTo(db.Category);
  db.Variant = require("../variant/variant.model" )(
    sequelize
  );
  db.Product.hasMany(db.Variant);
  db.Variant.belongsTo(db.Product);
  await sequelize.sync({ alter: true });
}
