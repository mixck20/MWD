// JS Objects and JSON

let personArray = ["Cabrinnie", 19, true];
console.log(personArray);

let personObject = {
    name: "Cabrinnie",
    age: 19,
    isRegister: true
}

console.log(personObject);

let student = {
    firstName: "Cabrinnie",
    middleName: "idk",
    lastName: "Dagdag",
    year: 2,
    setion: "A",
    address: {
        street: "Magellan St.",
        houseNo: "750",
        brgy: "Scared Heart",
        city: "Quezon City",
        province: "Metro Manila",
        country: "Philippines"
    },
    contact: [{phone: "09123456789", email: "cd@ua.edu.ph"}]


}

// Accessing object property value using 
console.log(student.firstName); //Output: Cabrinnie
console.log(student.address); //Output: Quezon City

console.log(student.contact); //Output: cd@ua.edu.ph

// 
//
//
//

function Pet(name, breed, age, color){
    this.name = name,
    this.breed = breed,
    this.age = age,
    this.color = color,
    this.talk = function(){
        if(this.animalType == "dog"){
            console.log("Woof Woof!");
    }else if (this.animalType == "bird"){
        console.log("Tweet Tweet!");
    }
}
}

let mazzie = new Pet("Mazzie", "Shih Tzu", "(age)", "White");
console.log(mazzie);

mazzie.animalType = "dog"

let milo = new Pet("Milo", "Shih Tzu", 2, "Brown");
console.log(milo);

milo.animalType = "dog"

let rio = new Pet("Rio", "Parrot", 1, "Red");
console.log(rio);
console.log(rio.color);

rio.animalType = "bird"
console.log(rio);
console.log(mazzie.talk());
console.log(rio.talk());

//ES6 Updates
//Template Literal vs Cocatenation
//

let name = "Cabrinnie";
console.log("My name is " + name);

console.log(`My name is ${name}!`);

console.log(`i have a pet named ${mazzie.name} and he is ${mazzie.age}.`);

