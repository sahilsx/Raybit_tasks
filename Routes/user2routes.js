const UUserRoutes = require('express').Router();

const{
    UsersHandler,
    LoginHandler,
    forgotPasswordHandler,
    resetPasswordHandler
}=require('../controller/usercontroller/user2');

UUserRoutes.post('/reset-password', resetPasswordHandler);
UUserRoutes.post('/signup', UsersHandler);
UUserRoutes.post('/login', LoginHandler);
UUserRoutes.post('/forgot-password', forgotPasswordHandler);
module.exports = UUserRoutes;