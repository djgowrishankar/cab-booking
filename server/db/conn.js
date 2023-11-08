const mongoose = require("mongoose");
const Db = "mongodb+srv://djgowrishankar004:9442354868@cluster0.pmvtwtt.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(Db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log("Connected to MongoDB")
};

module.exports = connectDB;