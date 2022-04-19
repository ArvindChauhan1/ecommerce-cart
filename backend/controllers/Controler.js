const { Product, Cart } = require("../models/Model")

// creating product
exports.createProduct = async (req, res) => {

    try {
        // Get user input
        const { name, price, image, description } = req.body;

        // Validate user input
        if (!(price && name && image)) {
            res.status(400).send("All input is required");
            return
        }


        // Create product in our database
        const product = await Product.create({
            name,
            description,
            image,
            price: parseInt(price),
        });

        console.log('cc')

        res.status(201).json({
            success: true,
            message: "product created successfully",
            data: product
        });
    } catch (err) {
        console.log(err);
    }
    // Our create product logic ends here
}

exports.getAllProduct = async (req, res) => {
    const product = await Product.find({})

    res.status(200).send({
        product
    })
}

// update product 
exports.updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return (res.status(500).json({
            success: false,
            message: "Product not found",
        }))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        product
    })
}
// get product
exports.getProduct = async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return (res.status(500).json({
            success: false,
            message: "Product not found",
        }))
    }
    res.status(200).json({
        success: true,
        product
    })
}

exports.getCart = async (req, res) => {
    let cart = await Cart.find({})
    let product = await Product.find({})
    cart = cart.map((e) => {
        e.product = product.find(d => (d._id.toString() === e.product_id))
        return e
    })
    res.status(200).send({
        success: true,
        cart
    })
}

exports.updateCart = async (req, res) => {
    const { product_id } = req.params
    let cart = await Cart.findOne({ product_id })
    if (cart === null) {
        cart = await Cart.create({ product_id, quantity: 1 })
        res.status(200).send({
            success: true,
            cart
        })
        return
    }
    cart = await Cart.findOneAndUpdate({ product_id }, { $inc: { 'quantity': 1 } }, {
        new: true,
    })
    res.status(200).send({
        success: true,
        cart
    })
}

exports.deleteCart = async (req, res) => {
    const { product_id } = req.params
    let cart = await Cart.findOne({ product_id })
    if (cart.quantity === 1) {
        cart = await Cart.findOneAndRemove({ product_id })
        res.status(200).send({
            success: true,
            message: 'deleted'
        })
        return
    }
    cart = await Cart.findOneAndUpdate({ product_id }, { $inc: { 'quantity': -1 } }, {
        new: true,
    })
    res.status(200).send({
        success: true,
        cart
    })
}
