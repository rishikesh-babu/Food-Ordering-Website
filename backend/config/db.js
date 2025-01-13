const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect(process.env.MONGO_URI, {})
        .then((res) => {
            console.log('Connected to DB')
        })
        .catch((err) => {
            console.log('err in DB :>> ', err);
        })
}
 
module.exports = { connectDB }