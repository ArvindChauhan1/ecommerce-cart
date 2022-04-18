const mongoose = require('mongoose');


const productModel = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  image:{
    id: { type: Number },
    url: { type: String }
  },
  price: { type: Number },
});

const cartModel = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  product_id: { type: String },
  quantity: { type: Number }
});

module.exports = { Product: mongoose.model("Product", productModel), Cart: mongoose.model("Cart", cartModel) }
// module.exports = 