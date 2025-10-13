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

//CRUD Controller
//membuat rest api
const all = async (req, res) => {
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
      message: "Gagal memuat produk",
      error: err.message
    });
  }
};

//CRUD Controller
//Create/Insert Data
const create = async (req, res) => {
  try {
    //1. ambil data dari request body
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock || 0
    });

    //2. simpan data ke mongodb melalui model product
    const product = await newProduct.save();

    //3. kirim response sukses ke user
    res.status(200).json({
      status: true,
      message: "Produk berhasil disimpan",
      data: product
    });

  }catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({
        status: false,
        message: err.message,
    });
  }else{
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  }
};

//read one / detail product
const detailproduk = async(req, res) => {
  try {
      //ambil id
      const productId = req.params.id;
      //cari berdasarkan id 
      const product = await Product.findById(productId);
      
      //kirim respon error jika produk tdk ditemukan
      if(!product) {
          return res.status(404).json({
              status: false,
              message: "Produk tidak ditemukan"
          });
      }
      //kirim respon sukses
      res.status(200).json({
          status:true,
          message: "Detail produk berhasil diambil",
          data:product
      });

  }catch (err) {
      res.status(500).json({
          status: false,
          message: "Gagal memuat detail produk"
      });
  }
};

//update data
const update = async (req, res) => {
  try{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //mengembalikan data yang sudah diupdate
      runValidators: true //menjalankan validasi sesuai schema saat update
    });

    if(!product){
      res.status(404).json({
        status: false,
        message: "Produk tidak ditemukan",
      });
    }
    //kirim respon sukses
    res.status(200).json({
      status: true, message: "Produk berhasil diupdate", data: product
    });

  }catch(err){
    if(err.name === 'CastError'){
      res.status(400).json({
        status: false, message: "Format ID tidak valid"
      });
    }else if(err.name === "ValidationError"){
      res.status(400).json({
        status: false, message: err.message
      })
    }else{
      res.status(500).json({
        status: false, message: "Internal server error"
      })
    }
  }
};

//delete data
const remove = async (req, res) => {
  try{
    //hapus menggunakan method findByIdAndDelete
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product){
      return res.status(404).json({
        status: false,
        message: "Produk tidak ditemukan",
      });
    }
    //kirim respon sukses
    res.status(200).json({
      status: true,
      message: "Produk berhasil dihapus",
    });
  }catch(err){
    if(err.name === 'CastError'){
      res.status(400).json({
        status: false, message: "Format ID tidak valid"
      });
    }else{
      res.status(500).json({
        status: false, message: "Internal server error"
      });
    }
  }
};

module.exports = {index, detail, all, create, detailproduk, update, remove};

