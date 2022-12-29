const express = require("express");
const {userRegister, userLogin, userLogout, updatePassword, userData, userUpdate, userUpdateRole, findAllUsers, getSingleUser, deleteUser} = require("../controller/userController");
const { checkLogin , roleCheck } = require("../middleware/auth");
const Route = express.Router();

Route.route('/register').post(userRegister);
Route.route('/login').post(userLogin);
Route.route('/logout').get(userLogout);
Route.route('/updatePassword').put(checkLogin,updatePassword);
Route.route('/getUser').get(checkLogin,userData);
Route.route('/getUser/update').put(checkLogin, userUpdate);
Route.route('/updateRole').put(checkLogin, userUpdateRole);
Route.route("/admin/user").get(checkLogin, roleCheck, findAllUsers);
Route.route("/admin/user/:id").get(checkLogin, roleCheck, getSingleUser);
Route.route("/admin/userDelete/:id").delete(checkLogin, roleCheck, deleteUser);



module.exports = Route;
