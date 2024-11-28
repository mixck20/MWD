db.users.insertOne({
    firstName: "Cabrinnie",
    lastName: "Dagdag",
    age: 21,
    contact: {
        phone: "09123456789",
        email: "brinnie@ua.edu.ph"
    },
    courses: ["CSS", "JS", "PYTHON"],
    department: "none"
});

// Insert multiple records in mondgoDB

db.users.insertMany([{
    firstName: "Stephen",
    lastName: "Hawking",
    age: 76,
    contact: {
        phone: "09123456789",
        email: "stephenhawking@ua.edu.ph"
    },
    courses: ["PYTHON", "REACT", "PHP"],
    department: "none"
},
{
    firstName: "Neil",
    lastName: "Armstrong",
    age: 82,
    contact: {
        phone: "09123456789",
        email: "neilarmstrong@ua.edu.ph"
    },
    courses: ["REACT", "LAVAREL", "SASS"],
    department: "none"
}]);


//Selecting records in mongoDB
db.users.find();

//Selecting records in mongoDB with criteria
db.users.find({firstName: "Stephen"});

db.users.find({department: "none", age: 82});

// Update a record in MongoDB

db.users.insertOne({
    firstName: "Test",
    lastName: "Test",
    age: 0,
    contact: {
        phone: "09123456789",
        email: "tes.edu.ph"
    },
    courses: [],
    department: "none"
});

db.user.updateOne({firstName: "Test"},
    {
        $set: {
            firstName: "Bill",
            lastName: "Gates",
            age: 65,
            contact: {
                phone: "09123456789",
                email: "billgates.edu.ph"
            },
            courses: ["PHP", "LAVAREL", "HTML"],
            department: "Operations",
            status: "Active"
        }     
});





// find records with comparison operators
db.users.find({})