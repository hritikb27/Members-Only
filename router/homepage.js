const express = require("express");
const Router = express.Router();

const Content = require("../models/content");

Router.use(express.urlencoded({extended:true}));

Router.get('/', async (req,res)=>{
    const AllContent = await Content.find();
    console.log(req.user);
    let access;
    let admin;
    if(req.user){
        access = req.user.memberStatus;
        admin = req.user.Admin;
    }
    res.render('index', {posts: AllContent, user: req.user, access: access, admin: admin});
});

Router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/login')
})

module.exports = Router;