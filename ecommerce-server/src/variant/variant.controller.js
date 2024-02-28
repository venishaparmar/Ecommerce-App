const variantService = require("./variant.service");

exports.create = async (req, res, next) => {
  try {
    const variant = await variantService.create(req.body);
    res.status(201).json({ message: 'Variant created successfully', data: variant });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const variants = await variantService.getAll();
    res.status(200).json({ message: 'Variants retrieved successfully', data: variants });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const variant = await variantService.getById(req.params.id);
    res.status(200).json({ message: 'Variant retrieved successfully', data: variant });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const variant = await variantService.update(req.params.id, req.body);
    res.status(200).json({ message: 'Variant updated successfully', data: variant });
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res, next) => {
    variantService
    .changeStatus(req.params.id)
    .then((response) =>
      res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};
exports.del = (req, res, next) => {
    variantService
    .del(req.params.id)
    .then((response) =>
      res.status(200).send({ message: "Success", data: response })
    )
    .catch(next);
};

exports.searchBySku = async (req, res, next) => {
  try {
    const variant = await variantService.searchBySku(req.params.sku);
    if (!variant) {
      res.status(404).json({ message: 'Variant not found' });
    } else {
      res.status(200).json({ message: 'Variant found', data: variant });
    }
  } catch (error) {
    next(error);
  }
};
