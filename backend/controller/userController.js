const asyncError = require("../middleware/asyncError");
const User = require("../models/userModel");
const errorHandler = require('../utils/errorHandler');
const bcryptjs = require("bcryptjs");
//register
const userRegister = asyncError(async (req, res, next) => {
    const { email, password, name } = req.body;

    const userData = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "sample_punlic_id",
            url: "sample url"
        }
    })

    const jwttoken = userData.generateJWT();

    res.status(201).cookie("token", jwttoken, {
        HttpOnly: true,
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        )
    }).json({
        status: true,
        message: "User Registered Successfully",
        access_key: jwttoken
    })
});

//login
const userLogin = asyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler("Please fill email and password", 400))
    }

    const loginData = await User.findOne({ email });
    const jwttoken = loginData.generateJWT();
    if (!loginData) {
        return next(new errorHandler("Invalid Details", 401))
    }

    const passCheck = await bcryptjs.compare(password, loginData.password);

    if (!passCheck) {
        return next(new errorHandler("Invalid Details", 401))
    }
    res.status(200).cookie("token", jwttoken, {
        HttpOnly: true,
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        )
    }).json({
        status: true,
        message: "Login Success",
        access_key: jwttoken
    })
})

const userLogout = asyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        HttpOnly: true
    }).status(200).json({
        status: true,
        message: "Logout Succeess"
    })
})

//get user data
const userData = asyncError(async (req, res, next) => {
    const userDetail = await User.findById(req.user.id);
    if (!userDetail) {
        return next(new errorHandler("Something went wrong", 500));
    }
    res.status(200).json({
        status: true,
        userDetail
    })

})

//update password
const updatePassword = asyncError(async (req, res, next) => {
    const { oldpass, newpass, cnfpass } = req.body;
    const userData = await User.findById(req.user.id);
    const checkPass = await bcryptjs.compare(oldpass, userData.password);
    if (!checkPass) {
        return next(new errorHandler("Invalid Password", 400));
    }
    if (newpass != cnfpass) {
        return next(new errorHandler("Confirm Password not matched", 400))
    }
    userData.password = newpass;
    await userData.save();
    res.status(200).json({
        status: true,
        message: "Password updated successfully"
    })
})

//update user profile

const userUpdate = asyncError(async (req, res, next) => {
    const updateData = {
        name: req.body.name,
        email: req.body.email
    };

    const userSave = await User.findByIdAndUpdate(req.user.id, updateData, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    });
    res.status(200).json({
        status: true,
        message: "User data updated successfully"
    });
})

//update user role

const userUpdateRole = asyncError(async (req, res, next) => {
    const updateData = {
        role: req.body.role
    };

    const userSave = await User.findByIdAndUpdate(req.user.id, updateData, {
        new: true,
        runValidators: true,
        userFindAndModify: false
    });
    res.status(200).json({
        status: true,
        message: "User Role updated successfully"
    });
})

const findAllUsers = asyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

const getSingleUser = asyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: true,
        user
    })
})
const deleteUser = asyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    user.remove();
    res.status(200).json({
        status: true,
        message:"User deleted successfully"
    })
})


module.exports = { userRegister, userLogin, userLogout, updatePassword, userData, userUpdate, userUpdateRole , getSingleUser , findAllUsers ,deleteUser};