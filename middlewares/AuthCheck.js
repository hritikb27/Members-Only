function AuthCheck(req,res,next){
    if(req.isAuthenticated()){
        next();
    };
    res.redirect('/login');
};

module.exports = AuthCheck;