const User = require("../models/User-Model.js");
const Enroll = require("../models/Enrollment-Model.js")
const bcryptjs = require("bcryptjs");
const auth = require("../auth.js");

module.exports.registerUser = (req, res) => {
    let newUser = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: bcryptjs.hashSync(req.body.password, 10)


    })

    return newUser.save()
    .then(result => {
        res.send({
            code: "REGISTRATION-SUCCESS",
            message: "You are now registered!",
            result: result

        })
    })
    .catch(error => {
        res.send({
            code: "REGISTRATION FAILED",
            message: "We've encountered an error during the registration. Please try again!",
            result: error
        })

    })
}

//User Login
module.exports.loginUser = (req, res) => {
    let {email, password} = req.body;
    return User.findOne({email: email}).then(result => {
        if(result == null){
            return res.send({
                code: "USER-NOT-REGISTERED",
                message: "Please register to login."
            })
        }else{
            const isPasswordCorrect = bcryptjs.compareSync(password, result.password);
            if(isPasswordCorrect){
                return res.send ({
                    code: "USER_LOGIN_SUCCESS",
                    token: auth.createAccessToken(result) 
                })
            }else{
                return res.send({
                    code: "PASSWORD-INCORRECT",
                    message: "Password is not correct. Please try again."
                })
            }
        }
    })
}

// Check email if existing 
module.exports.checkEmail = (req, res) => {
    let {email} = req.body;
    return User.find({email: email}).then(result =>{
        if(result.length > 0){
            return res.send({
                code: "EMAIL_EXIST",
                message: "The user is registered."
            })
        }else{
            return res.send({
                code: "EMAIL-NOT-EXISTING",
                message: "The user is not registered"

            })
        }
    })
}

// Get-User
module.exports.getProfile = (req, res) => {
    let { id } = req.body;

    return User.findById(id)
        .then(result => {
            if (result) {
                let user = result.toObject();
                user.password = '*****';
                return res.send({
                    code: "USER-FOUND",
                    message: "User details retrieved successfully.",
                    result: user
                });
            } else {
                return res.send({
                    code: "USER-NOT-FOUND",
                    message: "Cannot find user with the provided ID"
                });
            }
        })
        .catch(error => {
            res.send({
                code: "ERROR",
                message: "An error occurred while retrieving the user.",
                result: error
            })
        })
}

// Enroll a user
module.exports.enroll = (req, res) => {
    const {id} = req.user;
    
    let newEnrollment = new Enroll({
        userId: id,
        enrollCourse: req.body.enrollCourse,
        totalPrice: req.body.totalPrice
    })

    return newEnrollment.save().then((result, err) =>{
        if(err){
            res.send({
                code:"ENROLLMENT-FAILED",
                message: "There is a problem during your enrollment, please try again!"
            })
        }else{
            res.send({
                code:"ENROLLMENT-FAILED",
                message: "Congratulations!, you are now enrolled!",
                result: result
         })
        }
    })
}

