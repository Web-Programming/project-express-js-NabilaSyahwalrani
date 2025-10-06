//install paket mongoose meggunakan npm : npm install mongoose
const mongoose = require('mongoose');
const dbURI = "mongodb://localhost:27017/paw2-si5c";

mongoose.connect(dbURI, {});

mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", () => {
    console.log("Mongoose connection error: ", err);
});

mongoose.connection.on("disconected", () => {
    console.log("Mongoose disconected");
});