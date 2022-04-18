const router = require('express').Router();

const { createProduct, getAllProduct, updateCart, getCart, deleteCart, updateProduct, getProduct } = require('../controllers/Controler')

router.route("/product").get(getAllProduct);
router.route("/product/create").post(createProduct);
router.route("/product/:id").put(updateProduct).get(getProduct);

router.route("/cart").get(getCart);
router.route("/cart/:product_id").put(updateCart).delete(deleteCart);


module.exports = router;