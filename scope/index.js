const scope = {
  exerciseA() {
    let personA = 'Paul'
    let personB = 'Ben'
    let personC = 'Tom'

    function changePerson() {
      if (personA === 'Paul') {
        person = 'CardiB';
        beautifyPerson();
      }

      function beautifyPerson() {
        // Log A: personB
        
        if (personB.includes('B')) {
          personB = person;
          personC = personB;
          // Log B: personC
        }
      }

      personC = personA;

      // Log C: personB
    }

    changePerson();

    // Log D: personC

    const result = [
      {'A': 'Ben'},
      {'B': 'CardiB'},
      {'C': 'CardiB'},
      {'D': 'Paul'}
    ];
    return result;

    // Annotation:
    // To begin, we start on line 3 and declare a variable called personA and assign it the value of the string 'Paul'. On the next line we declare a variable named personB and assign it the string 'Ben'. On the next line, we declare the variable personC and assign it the string 'Tom'. All three of these are declared in the global scope. On line 7, we declare a function with the name changePerson, but it has not yet been invoked. The next line to execute is 28, which invokes the changePerson function. So, we move into the changePerson function at line 8 and start with an if statement that checks if the value of personA is strictly equal to 'Paul'. It is, because personA was declared in the global scope and as such is available to all child scopes, so we move into the conditional statement. On line 9, we assign the variable name 'person' to the string 'CardiB'. Because of how the scope chain works, this will create a global variable named person and assign that variable to the string 'CardiB'. On line 10, we invoke the function 'beautifyPerson'. The 'beautifyPerson' function is declared on line 13, which is the next line to execute, and because of hoisting, that function moves to the top of its scope. Thus, the function has already been invoked. On line 14 we have our first console.log, which will log the value of personB. At this point in the code execution, personB has a value of 'Ben'. Next, we encounter an if statement that checks the value of personB and invokes the string prototype 'includes'. This will return true because the current value of personB is 'Ben', so we will move into the if statement. On line 17, we reassign the variable personB to the value of person, and then on the next line we reassign the value of personC to the value of personB. Next we encounter another console.log, which will log the value of personC. At this time in the code execution, the value of personC is 'CardiB'. This is because the value of 'person' was sent up the scope chain to the global scope, so when personB was reassigned to person, that value was 'CardiB'. Then, personC was assigned the value of personB. Next we step out of the if statement and the 'beautifyFriend' functionand the next line of code to execute is line 23, which reassignes the value of personC to the value of personA, which is the string 'Paul'. Then, on line 25, we console.log the value of personB, which is still 'CardiB'. That will resolve the function invocation on line 28, so the next line to exeucte will be line 30, which will log the value of personC, which has been reassigned to 'Paul'.
  },

  exerciseB() {
    let number = 30;

    function numberFunction() {
      let number = 75;

      if (number === 75) {
        let number = 28;
      }

      // Log A: number

      function newNumber() {
        number = 64;

        // Log B: number
      }

      newNumber();

      // Log C: number
    }

    numberFunction();

    // Log D: number

    const result = [
      {'A': 75},
      {'B': 64},
      {'C': 64},
      {'D': 30}
    ]
    return result;

    // Annotation:
    // To begin, on line 45, we declare a variable in the global scope called number and assign it the number value 30. On line 47, we declare a function named 'numberFunction', but it has not yet been invoked, so we move down to line 67. Here, we invoke 'numberFunction', which moves us up to line 48. Here, we declare a new variable called number and assign it the value of 75. Next, on line 50, we use an if statement to check if the value of number is equal to 75. It is, and so we step into the if statement. Here, on line 51, we declare yet another new variable with the name 'number', and set this to the value of 28. We step out of the if statement and encounter our first console.log on line 54, which will log the value of 'number'. At this point in the code, the value of 'number' is 75 because the previous variable declaration on line 51 is done with 'let', and so will not be avilable outside the if statment since it's block scoped. On line 56 we declare a function within the scope of 'numberFunction' called 'newNumber'. This has not yet been invoked, so we move to line 62. 'newNumber' is invoked on line 62, so we move back up to line 57, inside the function. On line 57, we reassign the value of number to 64, which in this case will replace 75. On line 59 we console.log number again, which will log 64. That resolves the function invocation on line 62, so we move down to line 64 and console.log number, which will again log 64 as we are still in the scope of 'numberFunction' and the value of number in this scope has been reassigned from 75. That will resolve the function invocation on line 67, so we move down to line 69 and console.log the value of number one last time, which will be 30 since we are now in the global scope and that was the value assigned there. 
  },

  exerciseC() {
    let greeting = 'Hello';

    function greetingFunction() {
      var greeting = 'Yo';

      if (greeting === 'Yo') {
        let greeting = 'Howdy';
      }

      // Log A: greeting

      function newPhrase() {
        greeting = 'Hey';

        // Log B: greeting
      }

      newPhrase();

      // Log C: greeting
    }

    greetingFunction();

    // Log D: greeting

    const result = [
      {'A': 'Yo'}, 
      {'B': 'Hey'},
      {'C': 'Hey'},
      {'D': 'Hello'}
    ];
    return result;

    // Annotation:
    // To begin, we start on line 84 by declaring a variable called greeting and assigning it the value of the string 'hello'. On line 86 we declare a function with the name 'greetingFunction', but it has not been invoked yet, so we move down to line 106. Here we invoke 'greetingFunction', and so we move up to line 87. Here we declare a new variable called greeting and assign that to the string 'Yo'. On line 89, we use an if statement to check if the value of greeting is 'Yo', which it is. As such, we step into the if statement, where we declare yet another variable called greeting and assign it to the string 'Howdy'. We then step out of the if statement and move to line 93 where we console.log the value of greeting, which at this point will be 'Yo'. Next, we declare a function called 'newPhrase', but it has not been invoked yet, so we move to line 101. 'newPhrase' is invoked here, so we move back up to line 96. Here we reassign the value of greeting to 'Hey'. This will replace 'Yo' in the 'greetingFunction' scope. Next, on line 98, we console.log greeting again, which will log 'Hey'. Next we step out of the newPhrase function and move to line 103, which is another console.log of greeting. This, too, will log 'Hey', as we are still in the scope of 'greetingFunction'. That will resolve the function invocation on line 106, so we move to line 108, which will be the final console.log of greeting. Here, the log will be 'Hello' since we are in the global scope and that is the value of the greeting function in this scope. 
  },

  exerciseD() {
    let greeting = 'howdy';

    const greetingGenerator = () => {
      let greeting = 'hi';

      if (greeting === 'hi') {
        let greeting = 'hello';
      }

      // Log A: greeting

      const newGreeting = ()  => {
        greeting = 'welcome';

        // Log B: greeting
      }

      newGreeting();

      // Log C: greeting
    }

    greetingGenerator();

    // Log D: greeting

    const result = [
      {'A': 'hi'},
      {'B': 'welcome'},
      {'C': 'welcome'},
      {'D': 'howdy'}
    ]
    return result;

    // Annotation:
    // On line 123, we declare a variable named greeting and assign it the string 'howdy'. Then, on line 125 we declare another variable with the name greetingGenerator and assign it the value of a function. This function has not yet be invoked, so we move down to line 145. Here, the greetingGenerator function is invoked, so we step into the function on line 126. Here, we declare a new variable called greeting and assign it the value of 'hi'. Next, we use an if statement to check if the current value of greeting is strictly equal to 'hi', which it is. We step into the if statement and, on line 129, we define another new variable with the name greeting and assign it 'hello'. We then step out of the if statement and encounter our first console.log on line 132. This will log the value of greeting, which will be 'hi' still because the varaible declaration inside the if statement was block scoped. On line 143, we declare a new function with the name new greeting inside the function scope of greetingGenerator, but it has not yet been invoked, so we move to line 140. Here, new greeting is invoked, so we step into new greeting on line 135. Here we reassign the value of greeting to 'welcome, which will replace 'hi', which is what will log on line 137. The function invocation on line 140 is now resolved, so we move on to line 142, where there is another console.log of greeting, which will be 'hi' again since we are still inside the function scope of greetingGenerator. This resolves the function invocation on line 145, so we move on to line 147. This is our final console.log of greeting, which will log 'howdy' since we are now in the global scope and this value has not been reassigned. 
  },

  exerciseE() {
    let name = 'Brittany';

    function sayName() {
      let name = 'Pam';

      if (name === 'Pam') {
        name = 'Nathaniel';

        if (name.length > 0) {
          let name = 'Brittany';
        }

        // Log A: name
      }

      // Log B: name
    }

    // Log C: name

    sayName();

    // Log D: name

    const result = [
      {'C': 'Brittany'},
      {'A': 'Nathaniel'},
      {'B': 'Nathaniel'},
      {'D': 'Brittany'}
    ]
    return result;

    // Annotation:
    // On line 162, we declare a variable called name and assign it the string 'Brittany'. We move down to line 164 and declare a function called sayName, but this has not been invoked, so we move down to line 180 and encounter our first console.log for 'name', which will be 'Brittany'. Next, we invoke the sayName function on 182, and so we step into the sayName at line 165. Here, we declare a new variable called name and assign it 'Pam'. On line 167, we use an if statement to check if the value of name is 'Pam', which it is, so we step into the if statement. On line 168, we reassign the value of name to 'Nathaniel'. This will replace 'Pam' because that is the next variable called name up the scope chain. Inside of the first if statement, we encounter another if statement that checks if the length of name is greater than 0, which it is. We step into this if statement on line 171 and declare a new, block scoped variable on line 171 called name and assign it 'Brittany'. We step out of that if statement, and get to a console.log on line 174 for the value of name, which will be 'Nathaniel'. We step out of the first if statement and encounter the next console.log on line 177 for the value of name, which will also be 'Nathaniel' as we are still in the function scope of sayName. This will resolve the function invocation on line 182, so we move to line 184, where we have our final console.log of name, which will be 'Brittany' again, as we are once again in the global scope and this value has not been reassigned. 
  },

  exerciseF() {
    var dog = 'Spot';

    function petDog() {
      // Log A: dog

      if (dog === 'Spot') {
        let dog = 'Fluffy';
      }

      function rollOver() {
        // Log B: dog

        dog = 'Biscuit';

        // Log C: dog

      }

      rollOver();

      // Log D: dog
    }

    petDog();

    // Log E: dog

    const result = [
      {'A': 'Spot'},
      {'B': 'Spot'},
      {'C': 'Biscuit'},
      {'D': 'Biscuit'},
      {'E': 'Biscuit'}
    ]
    return result;

    // Annotation:
    // On line 199, we declare a variable in the global scope with the name 'dog' and assign it the string 'Spot'. Then, on line 201, we declare a function with the name 'petDog', but this has not been invoked yet, and so we move down to line 222. Here, we invoke petDog, and so we step into that function on line 202. Here, we console.log the value of dog, which will be 'Spot'. On line 204, we use an if statement to check if the value of dog strictly equals 'Spot', which it does, so we step into the if statement on line 205. Here, we declare a new variable with the name dog and assign it 'Fluffy'. On line 208, we declare a function called rollOver inside the scope of petDog, but this has not yet been invoked, so we move down to line 217. Here, we invoke rollOver, so we step into the funciton on line 209. Here we console.log the value of dog, which will be 'Spot' since the previous variable declaration happened inside the if statement and was block scoped. On line 211, we reassign the value of dog to 'Biscuit', which will replace 'Spot' since that is the closest variable called dog up the scope chain. Next, we log the value of dog, which will be 'Biscuit'. This resolves the function invocation on line 217, so we move to line 219 and log the value of dog again, which will again be 'Biscuit'. This will resovle the function invocation on line 222, so we move to 224. Here is our final console.log of dog, which will again be 'Biscuit' since the value of the global variable was reassigned. 
  },

  exerciseG() {
    var fruit = 'apple';

    function eatFruit() {

      if (fruit !== 'kiwi') {
        var fruit = 'mango';

        if (fruit) {
          // Log A: fruit
          const fruit = 'strawberry';
        }

        // Log B: fruit
      }

      // Log C: fruit
    }

    eatFruit()

    // Log D: fruit

    const result = [
      {'A': 'mango'},
      {'B': 'mango'},

    ]
    return result;

    // Annotation:
    // On line 240, we declare a variable called fruit in the global scope and assign it the string 'apple'. On line 242, we declare a function called eatFruit, but this has not been invoked yet, so we move down to line 258. Here, we invoke the function eatFuit, so we step into the function on line 244. eatFuit begins with an if statement checking if the value of fruit is not strictly equal to 'kiwi'. This is true, and so we step into the if statement on line 245 and declare a new variable called fruit and assign it the value of 'mango'. This variable is declared with the keyword var, and so it will not be block scoped, but rather function scoped. On line 247, we use another if statement inside of the first if statement to check if fruit is truthy, which it is, so we will step into this if statement as well. On line 248, we console.log the value of fruit, which will be 'mango'. Next, we declare a new variable called fruit that will be block scoped and assign it the value of 'strawberry'. We step out of this if statement and, on line 252, console.log the value of fruit again, which will be 'mango' again. We then step out of the first if statement and log the value of fruit a third time, which will again be 'mango' because we are still in the function scope of eatFruit. That will resolve the function invocation on line 258, so we move down to line 260 and encounter our final console.log of fruit, which will be 'apple' since we are now in the global scope and this variable has not been reassigned. 
  },

  exerciseH() {
    let num = 6;

    const fn1 = function() {
      let num = 4;

      // Log A: num

      if (num < 5) {
        const num = 9;

        fn2(num)

        const newNum = num;

        // Log B: newNum
      }

      newNum = num;

      // Log C: newNum
    }

    const fn2 = function(num){
      // Log D: num

      num = num + 1;

      // Log E: num
    }

    fn1();

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseI() {
    var hunger = 100;

    function eatSnack() {
      hunger -= 25;
      // Log A: hunger
      gorgeYourself();

      function gorgeYourself() {
        const hunger = 0;
        // Log B: hunger
      }

      // Log C: hunger
    };

    eatSnack();

    hunger += 5;
    // Log D: hunger

    eatSnack();
    // Log E: hunger

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseJ() {
    let sandwich = 'ketchup sandwich';

    // Log A: sandwich

    const addChipotle = () => {
      // Log B: toppings
      var toppings = 'chipotle sauce';

      if (toppings === 'chipotle sauce') { 
        sandwich = 'not a mediocre sandwich';
      }

      // Log C: sandwich
    }

    const addCheese = () => {
      let cheeseTopping = 'gouda';
      // Log D: cheeseTopping

      const shesTheManReference = () => {
        amandaBynes = "National Treasure"
      }

      shesTheManReference();
    }

    cheeseTopping = 'kraft';
    addCheese();

    addChipotle();
    // Log E: sandwich
    // Log F: amandaBynes

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseK() {
    let num = 10;

    function foo() {
      if (num > 5) {
        num = 7;
      }
      // Log A: num
    }

    foo();

    // Log B: num

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseL() {
    let grade = 100;

    function losePoints() {
      grade = 90;

      function addPoints() {
        const grade = 95;

        if (grade === 95) {
          let grade = 97;
        }

        // Log A: grade
      }

      addPoints();

      // Log B: grade
    }

    losePoints();

    // Log C: grade

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseM() {
    var num = 5;

    function first() {
      // Log A: num
      num = 6;
      // Log B: num
    }

    function second() {
      // Log C: num
      let num = 7;
    }

    first();
    second();

    // Log D: num

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseN() {
    var instructor = 'Pam';

    function changeInstructor() {

      // Log A: instructor

      if (instructor === 'Brittany') {
        const instructor = 'Nathaniel';
      } else {
        let instructor = 'Brittany';
      }

      // Log B: instructor

      function rename() {
        instructor = 'Louisa';
        // Log C: instructor
      }

      rename();

      // Log D: instructor

    }

    // Log E: instructor

    changeInstructor();

    // Log F: instructor

    const result = [
      {'E': 'Pam'},
      {'A': 'Pam'},
      {'B': 'Pam'},
      {'C': 'Lousia'},
      {'D': 'Louisa'},
      {'E': 'Louisa'}
    ]
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseO() {
    var shoe = 'flipflop';

    function putOnShoe() {
      // Log A: shoe
      var shoe = 'boot';
    }

    // Log B: shoe
    putOnShoe();
    // Log C: shoe

    const result = [
      {'B': 'flipflop'},
      {'A': 'undefined'},
      {'C': 'flipflop'}
    ];

    return result;

    // Annotation:
    // On line 469, we declare a variable in the global scope called shoe and assign it the string 'flipflop'. Then, on line 471, we declare a function in the global scope called 'putOnShoe'. That is not invoked yet, so we move down to line 476 and console.log shoe, which will return the value 'flipflop'. Next, we invoke the function putOnShoe, which returns us to line 472. There, we console.log the shoe variable again. In this case, the value of shoe will be undefined because there is a new variable declaration for shoe on line 473 that will be hoisted. After the console.log, the new variable declaration 'shoe' will be assigned the value 'boot'. putOnShoe concludes, which resolves line 477, so we move on to line 478, where we console.log the variable shoe once again. This time, since we are back in the global scope, the log will again return the value of 'flipflop'.
  }
}

module.exports = scope;