// const express = require("express");
// const bodyParser = require("body-parser");


// var app = express();
// app.set("view engine","ejs");
// app.use(express.static('public'));
// app.use(express.urlencoded({extended:true})); //for bodyparser
// var items = [];
// var example="working";
// app.get("/",function(req,res){
//     res.render("list",{ejes : items});
// });

// app.post("/",function(req,res){
//     var item = req.body.task;
//     items.push(item);
//     res.redirect("/");
// });


// app.listen(4000,function(){
//     console.log("Server Started");
// })

const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
const todoSchema = new mongoose.Schema({
    name: String
});
const Todo = mongoose.model("Todo",todoSchema);

const task1 = new Todo({
    name: "Read newspaper"
});
const task2 = new Todo({
    name: "Learn DSA"
});
const task3 = new Todo({
    name: "Learn React"
});
const task4 = new Todo({
    name: "Update resume"
});

async function saveTodo(){
    try {
        
        await task2.save();
        await task3.save();
        await task4.save();
        console.log("Save successful");
    } catch(error) {
        console.error("Error while saving: ", error);
    }
}
//saveTodo();

async function findTodo() {
    try {
        const data = await Todo.find();
        return data;
    } catch(error) {
        console.error("Error: ", error);
        return [];
    }
}
app.get("/", async function(req,res){
    const data = await findTodo();
    res.render("list",{ejes: data});

});
app.listen("3000",function(){
    console.log("Server started");
});