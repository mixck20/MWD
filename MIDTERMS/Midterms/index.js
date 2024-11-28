const express = require("express");
const mongoose = require("mongoose");
const server = express();
const port = 4000;

// Mongoose setup and connection
mongoose.connect("mongodb+srv://admin:admin123@ua-database.rk8rn.mongodb.net/users?retryWrites=true&w=majority&appName=UA-DATABASE");

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to MongoDB"));

// SCHEMA
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
});

// MODEL
const User = mongoose.model("User", userSchema);

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// CRUD Operations

// User Registration
server.post("/register", (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(savedUser => {
            res.send({
                code: 200,
                message: "User registered successfully!",
                data: savedUser
            });
        })
        .catch(err => {
            res.status(500).send({ message: "Error registering user", error: err });
        });
});

// Retrieve all users
server.get("/users", (req, res) => {
    User.find()
        .then(users => {
            res.send({
                code: 200,
                message: "All users retrieved successfully!",
                data: users
            });
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving users", error: err });
        });
});

// Finding a User by Email
server.get("/search", (req, res) => {
    const { email } = req.query;
    
    if (!email) {
        return res.status(400).send({ message: "Email is required to search for a user." });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.status(404).send({ message: "User not found" });
            } else {
                res.send({
                    message: "User found!",
                    data: user
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Server error", error: err });
        });
});

// Updating User Information by ID
server.put("/edit/:userId", (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                res.status(404).send({ message: "User not found" });
            } else {
                res.send({
                    message: "User information updated successfully!",
                    data: updatedUser
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Server error", error: err });
        });
});

// Deleting a User by ID
server.delete("/delete/:userId", (req, res) => {
    User.findByIdAndDelete(req.params.userId)
        .then(deletedUser => {
            if (!deletedUser) {
                res.status(404).send({ message: "User not found" });
            } else {
                res.send({
                    message: "User deleted successfully!",
                    data: deletedUser
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Server error", error: err });
        });
});

// Start the server
server.listen(port, () => console.log(`Server is now running at port ${port}.`));
