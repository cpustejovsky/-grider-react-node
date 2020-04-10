const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.send("you hit the home page!")
})
let PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("listening on port 5000"))