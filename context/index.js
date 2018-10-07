const context = {
  exerciseA() {
    const fly = () => {
      console.log(this);
    }

    class SpaceProbe {
      constructor(title, classification) {
        this.title = title;
        this.classification = classification
        this.fly = fly;
      } 
    }

    const ship = new SpaceProbe('voyager', 'classy');


    // What is the value of `this` when we call ship.fly()?
    const result = 'global window object'
    return result;

    // Annotation:
    // Because the fly function is declared outside of the SpaceProbe class and done so with an arrow function, the value of 'this' is set when the function is declared, which is in the global context.
  },

  exerciseB() {
    function fn() {
      const value = 2;
      return this.value;
    }
    
    // What is the value of `this` when we call fn()?
    const result = 'global window object';
    return result;

    // Annotation:
    // 'this' typically refers to an object, and since fn() is neither a method on an object nor a constructor, there is no other object for it to reference other than the global window, which does not have a property of 'value'. 
  },

  exerciseC() {
    const car = {
      make: "Tesla",
      getInfo: function(){
        console.log(this);
      }
    };

    const el = document.getElementById("btn");
    el.addEventListener("click", car.getInfo);

    // What is the value of `this` when a user clicks on our element and car.getInfo() is triggered?
    const result = 'car';
    return result;

    // Annotation: 
    // i believe that the value of this will return the car object because getInfo is invoked on the car object, and typically 'this' is set to the object upon which a method is invoked. 
  },

  exerciseD() {
    const dog = {
      breed: "Chihuahua",
      getBreed: function(){
        const innerFunction = function() {
        console.log(this.breed);
      };
    
      return innerFunction();
      }
    };


    // What is the value of `this` when we call dog.getBreed()?
    const result = 'global window object';
    return result;

    // Annotation: 
    // Because the getBreed() method is declared using a function literal (ES5 syntax), the context of 'this' is not set until the function is invoked, and since it would need to be invoked outside of the dog object, 'this' will reference the global window. 
  },

  exerciseE() {

    const fn = () => {
      value = 21;
      return this.value;
    }


    // What is the value of `this` when we call fn()?
    const result = 'global window object';
    return result;

    // Annotation: 
    // i relized this halfway through typing my original annotation: the function would return the value '21' because, while 'this' is referring to the global object, the 'value' variable was called without a keyword, which typically assignes it as a global variable. Thus, even though 'this' references the global, the global now has a variable called 'value'.
  },

  exerciseF() {
    class Hero {
      constructor(name, power, canFly = false) {
        this.name = name;
        this.power = power;
        this.canFly = canFly;
      }

      identifyHero() {
        return this;
      }
    }

    const storm = new Hero('Ororo', 'weather control', true);

    // What is the value of `this` when we call storm.identifyHero()?
    const result = 'instance of Hero';
    return result;

    // Annotation: 
    // Because the indentifyHero method is a property of the Hero class, and 'storm' is a new instance of that class, identifyHero will refer to the instance, 'storm'. 
  },

  exerciseG() {
    class Game {
      constructor(title) {
        this.title = title;
    }

      resetGame() {
        console.log('Clearing the board and starting over');
      }

      restart() {
        setTimeout(function() {
          console.log(`Restarting ${this.title}...`)
        }, 1000);
      }
    }

    const monopoly = new Game('Monopoly');


    // What is the value of `this` when we call monopoly.restart()?
    const result = 'monopoly';  //global window object
    return result;

    // Annotation: 
    // when the class Game is invoked to construct the object monopoly, restart would be a property of that new monopoly object. Since the 'restart' method uses the property 'this.title', and it's being invoked on teh monopoly object, the value of 'this' will be 'Monopoly'
  },

  exerciseH() {
    const obj = {
      arrowFunction: null,
      method: function() {
        this.arrowFunction = () => { return this };
      }
    };

    obj.method();

    // What is the value of `this` when we call obj.arrowFunction()?
    const result = 'obj';
    return result;

    // Annotation: 
    // i am very confused by this one. my best (hopefully educated) guess is that invoking 'obj.arrowFunction()' will return the whole 'obj' object. What i believe is happening here is that 'arrow function' is initially set to null, but it's value is reassigned when 'method()' is invoked. Since it is, in fact, an arrow function, it should set it's context for 'this' when this reassign happens, and since the function's only purpose is to return 'this', it will return the object. 
  },

  exerciseI() {  
    const poets = [{
      name: 'Sappho'
    }, {
      name: 'Maya'
    }, {
      name: 'Emily'
    }, {
      name: 'Audre'
    }];

    poets.map(function(poet) {
      return this;
    }, poets)

    // What is the value of `this` that gets returned on each iteration of poets.map()?
    const result = 'poets';
    return result;

    // Annotation: 
    // The second argument of 'poets' in the map function is the optional 'this' binding available on many array prototype methods. Because we've bound 'this' to the poets array, when it maps over the array it will just return the array four times. 
  },

  exerciseJ() {
    $('#btn').on('click', function() {
      console.log($(this));
    });

    // What is the value of `this` when a user clicks on our #btn element and the callback is triggered?
    const result = '#btn';
    return result;

    // Annotation: 
    // 'this' will be the '#btn' element in this case because jQuery specifically binds 'this' to the target object. Also, since ES5 syntax does not set the value of this until the function is invoked, it will set that value to the element that was clicked. 
  }

};

module.exports = context;