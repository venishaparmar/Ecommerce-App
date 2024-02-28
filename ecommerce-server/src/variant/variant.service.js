const db = require("../helpers/db.helper");

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  changeStatus,
  searchBySku,
};

async function getAll() {
  return await db.Variant.findAll(
    {include:[
      {
          model: db.Product
      }
    ]}
  );
}

async function getById(id) {
  const variant = await getVariant(id);
  if (!variant) throw 'Variant not found';
  return variant;
}

async function create(params) {
  if (await db.Variant.findOne({ where: { sku: params.sku } })) {
    throw `Variant with SKU ${params.sku} already exists`;
  }

  const variant = await db.Variant.create(params);
  return variant;
}

async function update(id, params) {
  const variant = await getVariant(id);

  if (params.sku && params.sku !== variant.sku && await db.Variant.findOne({ where: { sku: params.sku } })) {
    throw `Variant with SKU ${params.sku} already exists`;
  }

  Object.assign(variant, params);
  await variant.save();

  return variant;
}

async function del(id) {
  const variant = await getVariant(id);
  await variant.destroy();
}

async function changeStatus(id) {
  const variant = await getVariant(id);
  variant.variant_status = !variant.variant_status;
  await variant.save();
  return variant;
}

async function searchBySku(sku) {
  return await db.Variant.findOne({ where: { sku } });
}

async function getVariant(id) {
  const variant = await db.Variant.findByPk(id);
  if (!variant) throw 'Variant not found';
  return variant;
}
