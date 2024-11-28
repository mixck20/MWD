// Repetition Control Structures
// While Loop

let loop1 = 0;

while(loop1 <= 5){
    console.log("WHILE: " + loop1);
    loop1++;
}

// Do-While Loop
let loop2 = 0;

do{
    console.log("DO: " + loop2);
    loop2++;
}while(loop2 <= 5)

// For Loop
for(let i = 0; i <= 10; i++){
    console.log("FOR: " + i);
}

let name = "jOhn doE";

console.log(name.length);

for(let i = 0; i < name.length; i++){
    console.log(name[i]);
}