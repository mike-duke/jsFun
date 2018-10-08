const { instructors, cohorts } = require('./datasets/turing');
const { constellations, stars } = require('./datasets/astronomy');
const { cakes } = require('./datasets/cakes');
const { pie } = require('./datasets/pie');
const { clubs } = require('./datasets/clubs');
const { classrooms } = require('./datasets/classrooms');
const { mods } = require('./datasets/mods');
const { bosses, sidekicks } = require('./datasets/bosses');
const { kitties } = require('./datasets/kitties');
const { breweries } = require('./datasets/breweries');


// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    // Return the total beer count of all beers for every brewery e.g.
    // 35

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  getBreweryBeerCount() {
    // Return an array of objects where each object has the name of a brewery
    // and the count of the beers that brewery has e.g.
    // [
    //  { name: 'Little Machine Brew', beerCount: 11 }
    // ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  findHighestAbvBeer() {
    // Return the beer which has the highest ABV of all beers
    // e.g.
    // { name: 'Barrel Aged Nature\'s Sweater', type: 'Barley Wine', abv: 10.9, ibu: 40 }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};


// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module. e.g. 
    // [
    //  { name: 'Pam', studentCount: 21 },
    //  { name: 'Robbie', studentCount: 18 }
    // ]

    const result = instructors.map((instructor) => {
      let students = cohorts.find((cohort) => {
        return cohort.module === instructor.module;
      })
      return {name: instructor.name, studentCount: students.studentCount};
    })
    return result;
    
    // Annotation:
    // Dataset: 2 arrays
    //  return: an array
    //  method: map
    //  dataset to iterate over: instructors
    //  in common: module
    //  Since we are working with two arrays and we need to return an array of the same length as the instructors array, i used map to iterate over that array. We also needed to retrieve the value of the number of students per module, so i used find on the cohorts array inside of the map. Find works because we were getting the unique value of the studentCount per module. I had the find's callback return the value of the cohort that had a matching module number to the individual instructor's module. I then had the map's callback return an object with the instructor's name from the instructors array and the student count from the cohort array. 
  },

  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.
    // { 
    // cohort1806: 9,
    // cohort1804: 10.5
    // }

    const result = cohorts.reduce((obj, cohort) => {
      let instructorsPerModule = instructors.filter((instructor) => {
        return instructor.module === cohort.module
      })
      obj[`cohort${cohort.cohort}`] = cohort.studentCount / instructorsPerModule.length
      return obj;
    }, {})
    return result;
    // Annotation:
    // dataset: 2 arrays
    // return: an object
    // method: reduce
    // dataset to iterate over: cohorts
    // in common: module
    // Since we need an object with the numbers of each cohort as its keys, i used reduce to iterate over the cohorts array. i then used filter to iterate over the instructors array and return an array with each instructor whose module number matched that of the current cohort. Once i had that, i set the key of the result object using a template literal and assigned its value the number of students per cohort divided by the length of each filtered instructor array. 
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // { 
    //   Leta: [2, 4],
    //   Nathaniel: [2],
    //   Robbie: [4],
    //   Pam: [2, 4]
    // }

    const result = instructors.reduce ((obj, instructor) => {
      obj[instructor.name] = []
      cohorts.forEach((cohort) => {
        instructor.teaches.forEach((lesson) => {
          if (cohort.curriculum.includes(lesson) && !obj[instructor.name].includes(cohort.module)) {
            obj[instructor.name].push(cohort.module)
          }
        })
      })
      return obj
    }, {})
    return result;

    // Annotation:
    // dataset: two arrays
    // return: an object with instructor keys and an array value
    // method: reduce
    // Since we needed an object with the names of each instructor as our result, i used reduce to iterate over the instructors array. i first declared the key for the object that reduce's callback would return, then assigned the value to an empty array. Next, i used forEach to iterate over the cohorts array, and then inside of that used another forEach to iterate over instructors again. This ensured each time through the instructors loop, i could check the cohort curriculum array against the instructors array. With that in mind, i used an if statement to check that each item in the teaches array would check itself against the curriculum array and return true if they matched. I also checked to make sure that i had not already pushed the module number into the empty array. If both of these conditions were met, i used push to put the number of the module into the accumulator's empty array. From there, i just returned the accumulator. 
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // { 
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    const result = cohorts.reduce((obj, cohort) => {
      cohort.curriculum.map((topic) => { 
        return obj[topic] = instructors.filter((instructor) => {
          return instructor.teaches.includes(topic);
        }).map((instructor) => {
          return instructor.name;
        });
      });
      return obj;
    }, {});
    return result;

    // Annotation:
    // dataset: two arrays
    // return: object
    // method: reduce
    // dataset to itereate over: cohorts
    // data in common: items in curriculum and teaches arrays
    // Since we are starting with two arrays and we need to return an object, i used reduce to iterate over the cohorts array. Also, since the keys to that object were going to be the items in the curriculum array, i used map to iterate over that array in each cohort. From map's callback, i returned a declaration of the outer reduce's accumulator using the individual topic and assigned that the value of a filter over the instructors array. From the filter's callback, i returned the instructors who had the topic in their teaches array. i chained a map to that so that i could get just the instructor names, then returned the accumulator.
  }
};





// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: mods from ./datasets/mods
const modPrompts = {
  studentsPerMod() {
    // Return an array of objects where the keys are mod (the number of the module)
    // and studentsPerInstructor (how many students per instructor there are for that mod) e.g.
    // [
    //   { mod: 1, studentsPerInstructor: 9 },
    //   { mod: 2, studentsPerInstructor: 11 },
    //   { mod: 3, studentsPerInstructor: 10 },
    //   { mod: 4, studentsPerInstructor: 8 }
    // ]
    const result = mods.map((currentMod) => {
      let studentsPer = currentMod.students / currentMod.instructors;
      return {mod: currentMod.mod, studentsPerInstructor: studentsPer}
    }) 
    return result;

    // Annotation:
    // dataset: a single array
    // return: a single array of the same length
    // method: map
    // since we are starting with a single array of mods and returning an array of the same length, i used map to iterate over the mods array. From the callback, i returned an object with a key of mod assugned to the value of the current mod number and another key of students per instructor, which was assigned to the number of the students in the mod divided by the number of instructors. 
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    // Create an array of just the front-end classrooms. e.g.
    // [
    //   { roomLetter: 'A', program: 'FE', capacity: 32 },
    //   { roomLetter: 'C', program: 'FE', capacity: 27 },
    //   { roomLetter: 'E', program: 'FE', capacity: 22 },
    //   { roomLetter: 'G', program: 'FE', capacity: 29 }
    // ]

    const result = classrooms.filter((classroom) => {
      return classroom.program === 'FE';
    })
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  totalCapacities() {
    // Create an object where the keys are 'feCapacity' and 'beCapacity',
    // and the values are the total capacity for all classrooms in each program e.g.
    // { 
    //   feCapacity: 110,
    //   beCapacity: 96
    // }

    // const result = {
    //   feCapacity: 0,
    //   beCapacity: 0
    // }

    // classrooms.forEach((classroom) => {
    //   if (classroom.program === 'FE') {
    //     result.feCapacity += classroom.capacity;
    //   } else if (classroom.program === 'BE') {
    //     result.beCapacity += classroom.capacity;
    //   }
    // })
    const result = classrooms.reduce((totals, currentClassroom) => {
      if (currentClassroom.program === 'FE') {
        totals.feCapacity += currentClassroom.capacity;
      } else if (currentClassroom.program === 'BE') {
        totals.beCapacity += currentClassroom.capacity;
      }
      return totals;
    }, {feCapacity: 0, beCapacity: 0})
    return result;

    // Annotation:
    // dataset: single array
    // return: object
    // method: reduce
    // since we are starting with an array of classrooms and returning an object, i intended to use a reduce to iterate over the classrooms array. On my first attempt, i couldn't quite figure out how to make the reduce work, so i assigned result to an object with the keys i wanted and used a forEach to iterate over the array and assign the value of the results object properties to add the capacity whenever the program matched. After i made that work, i was able to figure out how to make the reduce work. 
  },

  sortByCapacity() {
    // Return the array of classrooms sorted by their capacity (least capacity to greatest)

    const result = classrooms.sort((a, b) => {
      return a.capacity - b.capacity;
    })
    return result;

    // Annotation:
    // dataset: single array
    // return: a sorted array
    // method: sort
    // since we are working with an array of classrooms and we're just looking to sort that array, i used sort to iterate over the array and sort the objects in the array by their capacity, which i accessed using dot notation.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  allToppings() {
    // Return an array of all unique toppings (no duplicates) needed to bake
    // every cake in the dataset e.g.
    // ['dutch process cocoa', 'toasted sugar', 'smoked sea salt', 'berries', ..etc]

    // iterate over the cakes array, then iterate over the toppings array. 
    // start by flattening all toppings arrays together?
    // then iterate over the new array and check for duplicates? 

    const result = cakes.reduce((toppingsArray, cake) => {
      var cakeTopping = cake.toppings;
      cakeTopping.forEach((topping) => {
        if (!toppingsArray.includes(topping)) {
          toppingsArray.push(topping)
        }
      })
      return toppingsArray;
    }, [])
    return result;

    // Annotation:
    // dataset: one array
    // return: array of different size and content
    // method: reduce
    // inner loop: 
    //    dataset: toppings array for each cake
    //    return: a single topping that does not match the others in the array (could push into an empty array)
    //    method: forEach
    // since we are starting from one large array and trying to create a new array that does not match the size or overall subset of the original array, i chose to use a reduce. Once i started working on the reduce i realized i would also need to iterate over the array of toppings and do something with each one of them. Since i had the empty array for the accumulator, i knew i could push into that array once i was iterating over the individual toppings arrays, thus a forEach was fine. 
  },

  groceryList() {
    // I need to make a grocery list. Please give me an object where the keys are
    // each topping, and the values are the amount of that topping I need to buy e.g.
    // { 
    //    'dutch process cocoa': 1,
    //    'toasted sugar': 3,
    //    'smoked sea salt': 3,
    //    'berries': 2, 
    //    ...etc
    // }

    const allToppings = cakes.reduce((toppingsArray, cake) => {
      toppingsArray = toppingsArray.concat(cake.toppings)
      return toppingsArray;
    }, [])
    
    const result = allToppings.reduce((list, topping) => {
      if (list[topping] > 0) {
        list[topping]++
      } else {
        list[topping] = 1;
      }
      return list
    }, {})
    return result;

    // Annotation:
    // dataset: single array
    // return: object
    // method: reduce
    // since we are working with the single cakes array and we want to return an object, i used reduce. I started by iterating over the cakes array and contatingating each toppings array for each cake into a single array using reduce. Then, i used reduce on the resulting array and had it set the key of the accumulator object to the name of the topping and count how many of each topping were in the array. 
  },

  stockPerCake() {
    // Return an array of objects that include just the flavor of the cake and how
    // much of that cake is in stock e.g.
    // [ 
    //    { flavor: 'honey', inStock: 3 },
    //    { flavor: 'vanilla', inStock: 21 },
    //    ..etc
    // ]

    const result = cakes.map((cake) => {
      return {flavor: cake.cakeFlavor, inStock: cake.inStock}
    })
    return result;

    // Annotation:
    // dataset: single array 
    // return: array of the same length
    // method: map
    // since we start with a single array and want to return an array of the same length, i used map. i returned an object that contained keys as were given and values accessed by dot notation for each individual cake.
  },

  totalInventory() {
    // Return the total amount of cakes in stock e.g.
    // 59

    const result = cakes.reduce((total, cake) => {
      total = total + cake.inStock;
      return total;
    }, 0)
    return result;

    // Annotation:
    // dataset: single array
    // return: a single number
    // method: reduce
    // since we are working with a single array and returning a single number, i used reduce. i then reassigned the accumulator to the accumulator itself (starting at 0) to the number of cakes in stock for each cake
  },

  onlyInStock() {
    const result = cakes.filter((cake) => {
      return cake.inStock;
    })

    return result;

    // Return an array of only the cakes that are in stock
    // e.g.
    // [
    //   {
    //   cakeFlavor: 'dark chocolate',
    //   filling: null,
    //   frosting: 'dark chocolate ganache',
    //   toppings: ['dutch process cocoa', 'toasted sugar', 'smoked sea salt'],
    //   inStock: 15
    // },
    // {
    //   cakeFlavor: 'yellow',
    //   filling: 'citrus glaze',
    //   frosting: 'chantilly cream',
    //   toppings: ['berries', 'edible flowers'],
    //   inStock: 14
    // },
    // ..etc
    // ]

    // Annotation:
    // I'm recieving an array of cakes and i want a subset of that array, so i'm using filter. The filter callback will return only the cakes that have an inStock value;
  }
};





// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------







// DATASET: pie from ./datasets/pie
const piePrompts = {
  howManyIngredients() {
    // The bakery needs to make more rhubarb pies in order to meet the
    // desiredInventoryCount. Programmatically determine how many more pies
    // need to be made, and return an object of the total number of ingredients we need
    // we need to buy in order to make the remaining pies. e.g.:
    // {
    //   cinnamon: 50,
    //   sugar: 100
    // }
    // let piesRemaining = pie.desiredInventoryCount - pie.inventoryCount;
    // let cinnamonRemaining = pie.ingredients.cinnamon * piesRemaining; 
    // let sugarRemaining = pie.ingredients.sugar * piesRemaining;
    // const result = {cinnamon: cinnamonRemaining, sugar: sugarRemaining};
    // return result;

    let ingredientKeys = Object.keys(pie.ingredients);
    let piesRemaining = pie.desiredInventoryCount - pie.inventoryCount;
    let result = ingredientKeys.reduce((obj, ingredient) => {
      obj[ingredient] = pie.ingredients[ingredient] * piesRemaining;
      return obj;
    }, {})
    return result;

    // Annotation:
    // dataset: single object
    // return: single object
    // since we are starting with an object, i started by using dot notation to access the properties i wanted--some of them properties within properties--and put those values into a new returned object. Then, i realized i hadn't used any prototype methods on this prompt (and also that the ingrdient object wasn't dynamic) so i tried again. this time i got an array of ingredient keys from the ingredients property, then iterated over those with a reduce to get the object i wanted to return and created keys based on the ingredients in the keys array. 
  }
};





// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {
    // Create an object whose keys are the names of people, and whose values are
    // arrays that include the names of the clubs that person is a part of. e.g. 
    // {
    //   Louisa: ['Drama', 'Art'],
    //   Pam: ['Drama', 'Art', 'Chess'],
    //   ...etc
    // }

    const namesArray = clubs.reduce((namesArray, club) => {
      return namesArray.concat(club.members)
    }, [])
    const noDuplicateNames = namesArray.reduce((nameKey, name) => {
      if (!nameKey.includes(name)) {
        nameKey.push(name);
      }
      return nameKey;
    }, [])
    const result = noDuplicateNames.reduce((obj, nameKey) => {
      obj[nameKey] = [];
      clubs.forEach((club) => {
        if (club.members.includes(nameKey)) {
          obj[nameKey].push(club.club);
        }
      })
      return obj
    }, {})
    return result;

    // Annotation:
    // Write your annotation here as a comment
    // dataset: single array
    // return: object with keys of member names and values of arrays that represent the clubs that member is in. 
    // method: reduce
    // since we are working with a single array, but we were looking to create an object with the names of the club members as keys, i started by iterating over the array of clubs and accessing the members of each club object using dot notation to create a single array with all of the member names. i used a reduce on this new array in order to remove any duplicate names. finally, i iterated over this array without duplicate names using a reduce since we ulitmately wanted to return an object. i created a key in the empty object for each name and set the value to an empty array. i then iterated over the clubs array again inside of the reduce in order to check each club's members and see if they matched the key name. if they did, i pushed the name of the club into the empty array.  
  }
};





// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]

    var bossKeys = Object.keys(bosses);
    var bossNames = bossKeys.map((boss) => {
      return bosses[boss].name;
    })
  
    var result = bossNames.map((boss) => {
      let bossObj = {bossName: boss, sidekickLoyalty: 0}
      sidekicks.forEach((sidekick) => {
        if (sidekick.boss === bossObj.bossName) {
          bossObj.sidekickLoyalty += sidekick.loyaltyToBoss;
        }
      })
      return bossObj;
    })
    return result;

    // Annotation:
    // dataset: an object of bosses with properties that are also objects, and an array of sidekicks with objects as elements
    // return: an array of objects with the name of the boss and their total loyalty
    // method: Object.keys to get the boss names in an array; iterate over the boss names array and compare the boss name to the boss of the sidekick and if they match, assign their loyalty to the object in the returned array. 
    //  since we are working with both an object and an array, i started by pulling the keys from the bosses object, which returns an array. i then iterated over that array with map in order to create another array of the same length, and used each key to access the bosses object by bracket notation and get the name of the boss. i iterated over that new array of boss names using map (again, to create an array of the same length) and created a new object which would be the elements of my array. inside of the boss object i defined keys of the boss name and their sidekick loyalty, the last of which i set to zero as a starting value. i then iterated over the sidekicks array in the dataset with a forEach and had it add the loyalty of the boss object sidekickLoyalty property. 
  }
};





// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangeKittyNames() {
    // Return an array of just the names of kitties who are orange e.g.
    // ['Tiger', 'Snickers']

    const result = kitties.filter((kitty) => {
      return kitty.color === 'orange'
    }).map((kitty) => {
      return kitty.name;
    })
    
    return result;

    // Annotation:
    // dataset: single array
    // return: array of a different length
    // method: filter
    // since we are working from a single array and returning a single array that is a subset of the original array, i used filter to iterate over the kitties array and return just the kitty objects that had the color of 'orange'. Then, since i had an array of the correct length, but had more information in it than just the kitty name, i used map to return just the name of the kitty. 
  },

  sortByAge() {
    // Sort the kitties by their age

    const result = kitties.sort((kittyA, kittyB) => {
      return kittyB.age - kittyA.age;
    });
    return result;

    // Annotation:
    // dataset: single array
    // return sorted array
    // method: sort
    // since we started with a single array and wanted it sorted, i used the sort method on the kitties array. i was not able to invoke just the method to sort the array because the elements of the array are objects, so i used a callback function to sort the array by age by accessing the age using dot notation.
  },

  growUp() {
    // Return an array of kitties who have all grown up by 2 years e.g.
    // [{
    //   name: 'Felicia',
    //   age: 4,
    //   color: 'grey'
    // },
    // {
    //   name: 'Tiger',
    //   age: 7,
    //   color: 'orange'
    // },
    // ...etc]

    const result = kitties.map((kitty) => {
      kitty.age += 2;
      return kitty;
    })
    return result;

    // Annotation:
    // dataset: single array
    // return: array of the same length
    // method: map
    // since we started with a single array and needed an array of the same length, i used map to iterate over the kitties array and change the value of the age property on each kitty, then returned the kitty. 

  }
};





// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [ 
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]

    const result = Object.keys(constellations).reduce((arr, constellationKey) => {
      const starArray = stars.filter((star) => {
        return (constellations[constellationKey].stars).includes(star.name);
      })
      starArray.forEach((star) => {
        arr.push(star)
      })
      // arr.push(...starArray)
      return arr; 
    }, [])
    return result;

    // Annotation:
    // dataset: an object and an array
    // return : an array of a different length
    // methods: object.keys, filter(?), [reduce]
    // Since we started with an object of constellations from which we need to use the array of stars, i started by using Object.keys to get an array of the keys for constellations. As we are looking to return an array, i decided to use a reduce to iterate over the keys array, intending to use that to access the stars array within in the constellations object. Inside the reduce, i used a filter to iterate over the stars array and access each star. The conditional i used in the return for the filter's callback looked to see if the name of the star is included in the array at the constellation object's 'stars' array. This produces an array of smaller arrays, which i then used a for each to loop over and push each value into the accumulator. 
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    const result = stars.reduce((obj, star) => {
      if (obj[star.color]) {
        obj[star.color].push(star);
      } else {
        obj[star.color] = [star]
      }
      return obj;
    }, {})
    return result;

    // Annotation:
    // dataset: stars array;
    // return: object;
    // method: reduce;
    // Since we only needed information from the stars array to finish this prompt, i did not need to access the constellation object. Since we needed an object as the result, i used a reduce on the stars array. First, i had it check to make sure that a key in the new object did not already have the name of a color. If it did, i just pushed the star object into the value of that property. If it did not, i had it create the key and assigned it's value to an array with the star's infornmation inside. 
  },

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.
    // [ 'Canis Major',
    //   'Carina',
    //   'Boötes',
    //   'Lyra',
    //   'Auriga',
    //   'Orion',
    //   'Canis Minor',
    //   'Eridanus',
    //   'Orion',
    //   'Centaurus' ]

    const result = stars.sort((starA, starB) => {
      return starA.visualMagnitude - starB.visualMagnitude;
    }).map((star) => {
      return star.constellation
    }).filter((constellation) => {
      return constellation !== '';
    })
    return result;

  // Annotation:
  // dataset: stars array
  // return: array
  // method: map, (sort first), (filter last)
  // Since the data we need is encapsulated in the stars array, i started with only that dataset. After some trial and error, i realized that i needed to sort this array by visualMagnitude first, then map over it to return just the name of the contellation, then filter it to remove the value that was an empty string. 
  }
};



module.exports = {
  breweryPrompts,
  turingPrompts,
  piePrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts
};