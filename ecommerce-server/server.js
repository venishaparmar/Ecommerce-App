const express = require('express');
const cors = require( 'cors' );
const error = require('./src/middleware/error')
const category = require('./src/category/category.route');
const product = require('./src/product/product.route');
const variant = require('./src/variant/variant.route');
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());
app.use(error.errorHandler);
app.use("/category",category);
app.use("/product",product);
app.use('/variant',variant);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))