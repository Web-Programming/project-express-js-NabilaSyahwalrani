var products = require('../../data/products.json');
var Product = require('../models/product'); // panggil model product
const index = async (req, res) => {
    try {
        // untuk mengambil seluruh data dari collection
        const prod = await Product.find({}); 
        
        // render ke halaman index dengan data produk
        res.render("index", { 
          title: "Toko Online Sederhana", 
          products: prod 
        });
      } catch (err) {
        res.status(500).send("Gagal mengambil data produk");
      }
    };

const detail = async (req, res) => {
};

//membuat rest api
const apiAll = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: true,
      message: "Data produk berhasil diambil",
      data: products
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal mengambil data produk",
      error: err.message
    });
  }
};

module.exports = {index, detail};

