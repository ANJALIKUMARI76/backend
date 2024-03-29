const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    PhoneNo: {
        type: Number,
        required: true,
    },
    hash_password: {
        type: String,
    }
});
user.virtual("password").set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 10)

})
user.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password)
    }
}
module.exports = mongoose.model('User', user)