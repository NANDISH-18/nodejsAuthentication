const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/authenticationapp');
mongoose.connect('mongodb+srv://nandishmohanty:Mohanty1818@cluster0.vugqe6n.mongodb.net/?retryWrites=true&w=majority')

const db = mongoose.connection;

// Connection error handling
db.on('error', console.error.bind(console, "Error in connecting to the database"));

// Connection error successful
db.once('open', function(){
    console.log("Successfully connected to the database");
})