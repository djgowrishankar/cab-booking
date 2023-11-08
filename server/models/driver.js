const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const DriversSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        // match: [
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 
        //     "Please provide a valid email",
        // ],
    },
    phoneno: {
        type: String,
    },
    password: {
        type: String,
        minlength: 6,
    },
    // resetPasswordToken: String,
    // resetPasswordExpire: {
    //     type: Date,
    //     default: Date.now,
    //     expires: 86400,
    // },
    drivers_photo: {
        type: String,
    },
    drivers_licence_no: {
        type: String,
    },
        model:{
        type: String,
    },
    plate_number: {
        type: String,
    },
    insurance_company: {
        type: String,
    }
});

DriversSchema.pre('save', async function(done) {
    if (!this.isModified("password")) {
        done();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    done();
});

DriversSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
 };

DriversSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, "bde604aefab1a5d10fe90ecd445ff7fbf8458c8e3b40050535ece6d5c600c912f919795e23d0b3a12f8c57d97154198b411fbed35e0800515a4f2190352b7948");
    // jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    // });
};

DriversSchema.methods.getResetPasswordToken = async function () {
    let resetToken = crypto.randomBytes(32).toString("hex");

    this.resetPasswordToken = await bcrypt.hash(resetToken, Number(10));
    return resetToken;
}

DriversSchema.methods.getCalculatedRating = function () {
    let sum = 0;
    function aver(value) {
        sum+=value;
    }
    if(this.drivers_rating.length <= 50){
        return "N/A";
    }
    else {
        this.drivers_rating.forEach(aver);
        return (sum/this.drivers_rating.length).toString;
    }
}


module.exports = mongoose.model('Driver', DriversSchema);