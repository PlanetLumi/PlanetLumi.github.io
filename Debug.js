//
// converts a file into an array of words
//
function readFileIntoArray(fileName) {
    try {
        // Read the file content synchronously
        const data = fs.readFileSync(fileName, 'utf8');

        // Split the content by whitespace and return the array of words
        return data.split(/\s+/);

    } catch (err) {
        console.error("Error reading the file:", err);
        return [];  // Catches any errors
    }
}
//
// function to check if a password is easily brute forcible 
//
function bruteForce(userPassword, passwords, words, count, pass) { 

    // checks if a users password is in a list of common passwords
    for (let i = 0; i < passwords.length; i++) {
        if (passwords.includes(userPassword)) {
            console.log("Common Password Found!");
            console.log(words[i]);
            console.log("Try to change your password, such as adding a number to the end of your password.");
            count = count + 1;
            return count;
        }
    }

    // checks if a password is a single word (passwords shouldn't be words? they usually cant have spaces)
    for (let i = 0; i < words.length; i++) {
        if (words[i] === userPassword) {
            console.log("This is one word!");
            console.log(words[i]);
            console.log("Try to use more than one word or a word that is not real.");
            count = count + 1;
            return count;
        }
    }
    pass = true;
    return pass;
}
//
// checks in a user password conforms to some common eligibility checks
//
function checkEligibility(userPassword, symbols, numbers, count, pass) {
    // if a password contains numbers
    if (!userPassword.includes(numbers)) {
        console.log("Your password must contain at least one number.");
        count = count + 1;
        return count;
    }
    // if a password contains symbols
    if (!userPassword.includes(symbols)) {
        console.log("Your password must contain at least one symbol.");
        console.log("Try to add a symbol such as: '! or *'.");
        count = count + 1;
        return count;
    }
    // if the password is a reasonable length
    if (userPassword.length < 8) {
        console.log("Your password must be at least 8 characters long. The longer the better!");
        count = count + 1;
        return count;
    }
    // if the password has no uppercase letters
    if (userPassword.toUpperCase() === userPassword) {
        console.log("Your password must contain at least one uppercase letter.");
        console.log("You could try to add camel case to your password. Such as a capital letter every 2 characters.");
        count = count + 1;
        return count;
    }
    //if a password has no lower case letters 
    if (userPassword.toLowerCase() === userPassword) {
        console.log("Your password must contain at least one lowercase letter.");
        console.log("You could try to add camel case to your password. Such as a lowercase letter every 2 characters.");
        count = count + 1;
        return count;
    }
    pass = true;
    return pass;
}

//function tooManyAttempts(){
   /// console.log("Do you need more help?")
  //  var ask;
//    while(ask !=  'y' && ask!= 'n') {
  //      ask = prompt("Enter 'y' to find more information, or 'n' to continue.");
 //       if(ask == "y") {
  //          console.log("Here is a page for information on how to improve your password: ????")
  //      if(ask == "n") {
   //         return;
  //      }
 //   }
//}

//}
//
// suggests help in creating a better password if the user has 
//
function tooManyAttempts(){
    console.log("Do you need more help?");
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    //request password from user
    readline.question("Please enter 'y' or 'n' ", ask => {
        if (ask === 'y') {
            console.log("Here is a page for information on how to improve your password: [Link to password tips]");
            rl.close();  // Close the readline interface after providing information
        } else if (ask === 'n') {
            console.log("Continuing without further help.");
            rl.close();  // Close the readline interface and continue execution
        } else {
            console.log("Invalid input. Please enter 'y' for yes or 'n' for no.");
            tooManyAttempts();  // Recursively ask for correct input
        }
    readline.close();
    })
};

//allows me to call in loop better
function run(count){
    //create a sync?
    const fs = require('fs');
    const readline = require('readline');
    //initialize variables
    var pass = false;
    const password = readFileIntoArray('password.ini');
    const words = readFileIntoArray('words.txt');
    const numbers = readFileIntoArray('numbers.txt');
    const symbols = readFileIntoArray('symbols.txt');
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
    //request password from user
    readline.question("Enter your example password: ", (userPassword) => {
        checkEligibility(userPassword, symbols, numbers, count, pass);
        bruteForce(userPassword, password, words, count, pass);
        if (count > 3) {
            tooManyAttempts();
        } else if (!pass) {
            count++;
            run(count);
        } else {
            console.log("Congrats! Your strong password is: " + userPassword);
            rl.close();
        }
    });

}

var count = 0
run(count);

