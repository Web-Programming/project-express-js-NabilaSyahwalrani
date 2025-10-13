const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product'); //memanggil controller produk

function requireJson(req, res, next){
    if(req.headers['content-type'] != 'application/json'){
      return res.status(406).json({
                status:false, 
                message: "Header harus application/json"
            });
    }
    next();
  }

//url create - POST (/api/produk)
router.post('/',productController.create);
//url read all - GET (/api/produk)
router.get('/',productController.all); //done
//url read one - detail - GET (/api/produk/:id)
router.get('/:id',productController.detailproduk);
//url update - PUT (/api/produk/:id)
router.put('/:id',productController.update);
//url delete - DELETE (/api/produk/:id)
router.delete('/:id',productController.remove);

module.exports = router;