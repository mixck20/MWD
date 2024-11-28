const express = require("express");
const mongoose = require("mongoose");
const server = express();
const port = 4000;

// Mongoose setup and connection
mongoose.connect("mongodb+srv://admin:admin123@ua-database.dsfp2.mongodb.net/practice?retryWrites=true&w=majority&appName=UA-DATABASE");

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to mongoDB"));

// SCHEMA
const taskSchema = new mongoose.Schema({
    name: String, 
    status:  {
        type: String, 
        default: "pending"
    }
});

// MODEL
const Task = mongoose.model("Task", taskSchema);

// Middleware
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Operations

// Create a new task
server.post("/tasks", (req, res) => {
    Task.findOne({name: req.body.name}).then((result, err) => {
        if (result !== null && result.name === req.body.name) {
            return res.send({
                code: "ERROR",
                message: "Duplicate Found!",
                data: result
            });
        } else {
            let newTask = new Task({
                name: req.body.name
            });

            newTask.save().then((savedTask, saveErr) => {
                if (saveErr) {
                    return console.error(saveErr);
                } else {
                    return res.send({
                        code: 200,
                        message: "Task Created!",
                        data: savedTask
                    });
                }
            });
        }
    });
});

// Get all tasks
server.get("/tasks", (req, res) => {
    Task.find({}).then((result) => {
        return res.send({
            code: 200,
            message: "LIST OF ALL TASKS!",
            result: result
        });
    }).catch((err) => {
        return res.send({
            message: "ERROR",
            error: err
        });
    });
});

// Get a specific task using its ID
server.get("/task/search/:taskId", (req, res) => {
    Task.findById(req.params.taskId).then((result) => {
        if (result == null) {
            res.send({
                message: "Cannot find task with the given ID."
            });
        } else {
            res.send({
                message: "ONE TASK RETRIEVED!",
                result: result
            });
        }
    }).catch((err) => {
        return res.send({
            message: "There is a server error.",
            error: err
        });
    });
});

// Delete via ID
server.get("/tasks/delete/:taskId", (req, res) => {
    Task.findByIdAndDelete (req.params.taskId).then ((result, err) => {
        if(err){
            return res.send({
                message: "There is a server error."
            })
        }else{
            if(result == null){
                return res.send({
                    message: "Cannot find task with the given ID."
                })
            }else{  
                return res.send({
                    message: "ONE TASK DELETED!",
                    result: result
                })
            }
        }
    })
})

// Get all "Pending" Status
server.get("/tasks/list-of-pending", (req, res) => {
    Task.find({status: "Pending"}).then((result, err) => {
        if(err){
            return res.send({message: "Cannot find tasks with Pending status."})
        }else{
            return res.send({
                    message: "Tasks with Pending Status retrieved.",
                result: result
            })
        }
    })
})
    

// Get all "Complete" Status
server.get("/tasks/list-of-completed", (req, res) => {
    Task.find({status: "Completed"}).then((result, err) => {
        if(err){
            return res.send({message: "Cannot find tasks with Completed status."})
        }else{
            return res.send({
                    message: "Tasks with Completed Status retrieved.",
                result: result
            })
        }
    })
})

// Start the server
server.listen(port, () => console.log(`Server is now running at port ${port}.`));
