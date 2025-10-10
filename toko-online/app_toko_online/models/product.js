const mongoose = require('mongoose');

// Buat schema product
const productSchema = new mongoose.Schema({
    //tidak perlu membuat properti id karena akan dibuat otomatis
    //dengan nama _id
    name:{
        type: String,
        required: [true, 'Nama produk harus diisi'],
        trim: true, //menghilangkan spasi di awal dan akhir
    },
    price:{
        type: Number,
        required: [true, 'Harga produk harus diisi'], 
        min: [1000, 'Harga produk minimal 1000'],
        //max: [100000000, 'Harga produk maksimal 100000000'],
    },
    description:{
        type: String,
        required: false, //menambahkan kolom wajib diisi atau tidak   
    },
    stock:{
        type: Number,
        default: 0,   
    },
    createdAt:{
        type: Date,  
        default: Date.now, 
    }
});

//membuat model dari schema product
const Product = mongoose.model('Product', productSchema);

module.exports = Product;