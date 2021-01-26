const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app)=>{
    app.get("/", function(req, res){
        if(req.user){
            res.redirect("/main")
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"))
    })

    app.get("/login", function(req, res){
        if(req.user){
            res.redirect("/main")
        }
        res.sendFile(path.join(__dirname, "../public/login.html"))
    })

    app.get("/main", isAuthenticated, function(req, res){
        res.sendFile(path.join(__dirname, "../public/main.html"))
    })
}