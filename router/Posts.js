const express = require("express");
const Router = express.Router();
const AuthCheck = require('../middlewares/AuthCheck');

const Content = require("../models/content");

Router.get('/addPost', AuthCheck, (req,res,next)=>{
    res.render('addPost');
});

Router.post('/addPost', (req,res)=>{
    const post = new Content({
        title: req.body.title,
        body: req.body.post,
        author: "Hritik"
    });

    post.save();

    res.redirect('/');
})

Router.get('/delete/:id', (req,res)=>{
    Content.findByIdAndDelete(req.params.id, (err, doc)=>{
        if(err){
            console.log(err)
        }else{
            console.log(doc)
        }
    });
    res.redirect('/');
})

module.exports = Router;