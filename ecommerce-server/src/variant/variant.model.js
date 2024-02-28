const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    price: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING, allowNull: false },
    barcode_number: { type: DataTypes.STRING, allowNull: false },
    unit: { type: DataTypes.STRING, allowNull: false },
    variant_status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  };
  return sequelize.define("variant", attributes);
}