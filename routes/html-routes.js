const path = require("path");

module.exports = (app)=>{
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../public/html/signup.html"))
    })

    app.get("/login", function(req, res){
        res.sendFile(path.join(__dirname, "../public/html/login.html"))
    })

    app.get("/main", function(req, res){
        res.sendFile(path.join(__dirname, "../public/html/main.html"))
    })
}