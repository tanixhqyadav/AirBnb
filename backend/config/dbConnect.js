const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1);
    }
};

module.exports = dbConnect;
