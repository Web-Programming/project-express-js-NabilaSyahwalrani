var express = require('express');
var router = express.Router();
var products = require('../../data/products.json');
var productsController = require('../controllers/product');

router.get("/all", productsController.index);
router.get("/id", productsController.detail);

//  Search Produk
router.get('/search', function (req, res) {
  const q = req.query.q ? req.query.q.toLowerCase() : '';
  let filtered = products;

  if (q) {
    filtered = products.filter((p) =>
      p.name.toLowerCase().includes(q)
    );
  }

  res.render('index', {
    title: q ? `Hasil pencarian: ${q}` : 'Toko Online Sederhana',
    products: filtered,
    query: req.query.q,
  });
});  

// GET detail produk by id 
router.get('/:id', function (req, res, next) {
  const productId = parseInt(req.params.id); // id dari URL
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).send('Produk tidak ditemukan!');
  }

  res.render('product-detail', {
    title: product.name,
    product: product,
  });
});

router.get('/:productId/review/:reviewId', function(req, res, next) {
  const productId = req.params.productId;
  const reviewId = req.params.reviewId;
  
  // Kirim kedua parameter ke view untuk ditampilkan
  res.render('review-detail', {
      title: `Ulasan ${reviewId} untuk Produk ${productId}`,
      productId: productId,
      reviewId: reviewId
  });
});


module.exports = router;
