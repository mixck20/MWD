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
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    genre: String,
});

// MODEL
const Book = mongoose.model("Book", bookSchema);

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// CRUD Operations

// Create a new book
server.post("/books/add", (req, res) => {
    const newBook = new Book(req.body);
    newBook.save()
        .then(savedBook => {
            res.send({
                code: 200,
                message: "Book Added!",
                data: savedBook
            });
        })
        .catch(err => {
            res.send({ message: "Error adding book", error: err });
        });
});

// Get all books or search by title
server.get("/books/search", (req, res) => {
    const { title } = req.query;
    const query = title ? { title: { $regex: title, $options: "i" } } : {};
    
    Book.find(query)
        .then(result => {
            res.send({
                code: 200,
                message: "Books retrieved!",
                result: result
            });
        })
        .catch(err => {
            res.send({ message: "Error retrieving books", error: err });
        });
});

// Get a book by ID
server.get("/books/search/:bookId", (req, res) => {
    Book.findById(req.params.bookId)
        .then(result => {
            if (!result) {
                res.send({ message: "Cannot find book with the given ID." });
            } else {
                res.send({
                    message: "Book retrieved!",
                    result: result
                });
            }
        })
        .catch(err => {
            res.send({ message: "Server error.", error: err });
        });
});

// Update a book by ID
server.put("/books/update/:bookId", (req, res) => {
    Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true })
        .then(updatedBook => {
            if (!updatedBook) {
                res.send({ message: "Cannot find book with the given ID." });
            } else {
                res.send({
                    message: "Book updated!",
                    result: updatedBook
                });
            }
        })
        .catch(err => {
            res.send({ message: "Server error.", error: err });
        });
});

// Delete a book by ID
server.delete("/books/delete/:bookId", (req, res) => {
    Book.findByIdAndDelete(req.params.bookId)
        .then(result => {
            if (!result) {
                res.send({ message: "Cannot find book with the given ID." });
            } else {
                res.send({
                    message: "Book deleted!",
                    result: result
                });
            }
        })
        .catch(err => {
            res.send({ message: "Server error.", error: err });
        });
});

// Extra objectives

// Get all books with price not lower than 1000 Pesos
server.get("/books/highPrice", (req, res) => {
    Book.find({ price: { $gte: 1000 } })
        .then(result => {
            res.send({
                message: "Books with high prices retrieved.",
                result: result
            });
        })
        .catch(err => {
            res.send({ message: "Error retrieving books", error: err });
        });
});

// Get all books with price lower than 1000 Pesos
server.get("/books/lowPrice", (req, res) => {
    Book.find({ price: { $lt: 1000 } })
        .then(result => {
            res.send({
                message: "Books with low prices retrieved.",
                result: result
            });
        })
        .catch(err => {
            res.send({ message: "Error retrieving books", error: err });
        });
});

// Get all books according to their genre
server.post("/books/search/genre", (req, res) => {
    const { genre } = req.body;

    Book.find({ genre: new RegExp(genre, 'i') })
        .then((result) => {
            res.status(200).send({
                code: 200,
                message: `LIST OF BOOKS WITH GENRE "${genre}"!`,
                result: result,
            });
        })
        .catch((err) => {
            return res.status(500).send({
                code: "ERROR",
                message: "Error retrieving books by genre",
                error: err,
            });
        });
});
// Start the server
server.listen(port, () => console.log(`Server is now running at port ${port}.`));
