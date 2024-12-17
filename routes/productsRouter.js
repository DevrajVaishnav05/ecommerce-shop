const express = require('express');

const router = express.Router();
const productModel = require("../models/productModel");
const ownerLoggedln = require("../middlewares/ownerLoggedln");


const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


router.get("/", ownerLoggedln,async function (req, res) {
    const products = await productModel.find();
    res.render("product/index",{products});
})
router.get("/create", ownerLoggedln, function (req, res) {
    res.render("product/create");
})

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/update'),
    filename: (req, file, cb) => {
        crypto.randomBytes(12, (err, bytes) => {
            if (err) return cb(err);
            cb(null, `${bytes.toString('hex')}${path.extname(file.originalname)}`);
        });
    }
});

const upload = multer({ storage });

router.post("/store", ownerLoggedln, upload.single("image"), async (req, res) => { // Change "images" to "image"
    try {
        const { name, price, discount, bgcolor, textcolor } = req.body;

        await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            textcolor,
            image: req.file.filename
        });
        res.redirect("/products");
    } catch (error) {
        res.redirect('/products/create');
    }
});


router.get("/edit/:id", ownerLoggedln, async function (req, res) {
    try {
        let product = await productModel.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render("product/edit",{product});
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Server error");
    }
});

router.get("/update", ownerLoggedln,async function (req, res) {
    // const products = await productModel.find();
    // res.render("product/index",{products});
    
})
router.get("/delete/:productId", ownerLoggedln, async function (req, res) {
      await productModel.findByIdAndDelete(req.params.productId);
    res.redirect('/products');
})

module.exports = router;
