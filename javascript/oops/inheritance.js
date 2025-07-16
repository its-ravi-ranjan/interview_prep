/**
 * Inheritance in JavaScript
 * 
 * Inheritance is a mechanism that allows objects to inherit properties and methods from other objects.
 * In JavaScript, inheritance is prototype-based, meaning objects can inherit directly from other objects.
 * 
 * Key points about Inheritance in JavaScript:
 * 1. Code reusability: Child objects can reuse code from their parent objects
 * 2. Method overriding: Child objects can override methods from their parent
 * 3. Prototype chain: JavaScript uses a prototype chain for inheritance
 * 4. Multiple inheritance: Can be achieved through mixins
 * 
 * In JavaScript, inheritance can be achieved through:
 * 1. Prototypal Inheritance (Traditional way)
 * 2. ES6 Classes (Modern way)
 * 3. Object.create()
 * 4. Mixins
 */

// Example 1: Using Prototypal Inheritance
console.log('Example 1: Prototypal Inheritance\n');

// Base class (constructor function)
function Animal(name, age) {
    this.name = name;
    this.age = age;
}

// Adding methods to the prototype
Animal.prototype.makeSound = function() {
    console.log('Some generic animal sound');
};

Animal.prototype.displayInfo = function() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
};

// Derived class (Dog)
function Dog(name, age, breed) {
    // Call the parent constructor
    Animal.call(this, name, age);
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override method
Dog.prototype.makeSound = function() {
    console.log('Woof! Woof!');
};

// Add new method
Dog.prototype.fetch = function() {
    console.log(`${this.name} is fetching the ball`);
};

// Override displayInfo
Dog.prototype.displayInfo = function() {
    Animal.prototype.displayInfo.call(this);
    console.log(`Breed: ${this.breed}`);
};

// Derived class (Cat)
function Cat(name, age, isIndoor) {
    Animal.call(this, name, age);
    this.isIndoor = isIndoor;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.makeSound = function() {
    console.log('Meow! Meow!');
};

Cat.prototype.scratch = function() {
    console.log(`${this.name} is scratching`);
};

Cat.prototype.displayInfo = function() {
    Animal.prototype.displayInfo.call(this);
    console.log(`Indoor cat: ${this.isIndoor}`);
};

// Example 2: Using ES6 Classes
console.log('\nExample 2: ES6 Classes Inheritance\n');

class AnimalClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    makeSound() {
        console.log('Some generic animal sound');
    }

    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

class DogClass extends AnimalClass {
    constructor(name, age, breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }

    // Method overriding
    makeSound() {
        console.log('Woof! Woof!');
    }

    // Additional method
    fetch() {
        console.log(`${this.name} is fetching the ball`);
    }

    // Override with super call
    displayInfo() {
        super.displayInfo(); // Call parent method
        console.log(`Breed: ${this.breed}`);
    }
}

// Example 3: Multiple Inheritance using Mixins
console.log('\nExample 3: Multiple Inheritance using Mixins\n');

// Define mixins
const WalkerMixin = {
    walk() {
        console.log(`${this.name} is walking`);
    }
};

const SwimmerMixin = {
    swim() {
        console.log(`${this.name} is swimming`);
    }
};

// Apply mixins to Dog class
Object.assign(Dog.prototype, WalkerMixin);
Object.assign(DogClass.prototype, WalkerMixin, SwimmerMixin);

// Example usage
console.log('Example Usage:\n');

// Using Prototypal Inheritance
console.log('1. Using Prototypal Inheritance:');
const dog1 = new Dog('Buddy', 3, 'Golden Retriever');

console.log('Dog Information:');
dog1.displayInfo();
dog1.makeSound();
dog1.fetch();
dog1.walk();

// Using ES6 Classes
console.log('\n2. Using ES6 Classes:');
const dog2 = new DogClass('Rex', 4, 'German Shepherd');

console.log('Dog Information:');
dog2.displayInfo();
dog2.makeSound();
dog2.fetch();
dog2.walk();
dog2.swim();

// Demonstrating polymorphism
console.log('\n3. Demonstrating Polymorphism:');
const animals = [dog1, dog2];

console.log('Making all animals sound:');
animals.forEach(animal => {
    animal.makeSound();
});

/**
 * Benefits of Inheritance in JavaScript:
 * 
 * 1. Code Reusability:
 *    - Common properties and methods can be defined in a parent class
 *    - Child classes can reuse this code without duplication
 * 
 * 2. Method Overriding:
 *    - Child classes can override parent methods to provide specific behavior
 *    - Maintains the same interface while changing implementation
 * 
 * 3. Prototype Chain:
 *    - Efficient memory usage as methods are shared through the prototype
 *    - Dynamic updates to the prototype affect all instances
 * 
 * 4. Multiple Inheritance:
 *    - Can be achieved through mixins
 *    - Allows objects to inherit from multiple sources
 * 
 * 5. Polymorphism:
 *    - Objects of different classes can be treated uniformly
 *    - Enables writing more generic and reusable code
 * 
 * Best Practices:
 * 1. Use ES6 classes for cleaner and more familiar syntax
 * 2. Keep the inheritance hierarchy shallow
 * 3. Use composition over inheritance when possible
 * 4. Use mixins for multiple inheritance
 * 5. Always call super() in child class constructors
 */ 