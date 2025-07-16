/**
 * Polymorphism in JavaScript
 * 
 * Polymorphism is the ability of objects to take multiple forms and behave differently based on their type.
 * In JavaScript, polymorphism is more flexible than in traditional OOP languages due to its dynamic typing.
 * 
 * Key points about Polymorphism in JavaScript:
 * 1. Method Overriding: Child classes can override parent class methods
 * 2. Duck Typing: Objects are judged by their behavior, not their type
 * 3. Dynamic Method Dispatch: Method calls are resolved at runtime
 * 4. Interface-based Polymorphism: Through duck typing
 * 
 * Types of Polymorphism in JavaScript:
 * 1. Runtime Polymorphism (Method Overriding)
 * 2. Duck Typing
 * 3. Method Overloading (through default parameters or different parameter types)
 */

// Example 1: Runtime Polymorphism through Method Overriding
console.log('Example 1: Runtime Polymorphism through Method Overriding\n');

// Base class
class Shape {
    constructor(name) {
        this.name = name;
    }

    // Base method to be overridden
    calculateArea() {
        return 0;
    }

    // Base method to be overridden
    display() {
        console.log(`This is a ${this.name}`);
    }
}

// Derived class - Circle
class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }

    // Method overriding
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }

    display() {
        console.log(`This is a circle with radius: ${this.radius}`);
    }

    // Additional method specific to Circle
    getCircumference() {
        return 2 * Math.PI * this.radius;
    }
}

// Derived class - Rectangle
class Rectangle extends Shape {
    constructor(length, width) {
        super('Rectangle');
        this.length = length;
        this.width = width;
    }

    // Method overriding
    calculateArea() {
        return this.length * this.width;
    }

    display() {
        console.log(`This is a rectangle with length: ${this.length} and width: ${this.width}`);
    }

    // Additional method specific to Rectangle
    isSquare() {
        return this.length === this.width;
    }
}

// Example 2: Duck Typing
console.log('\nExample 2: Duck Typing\n');

// Duck typing example - any object with calculateArea method can be used
class Triangle {
    constructor(base, height) {
        this.base = base;
        this.height = height;
    }

    calculateArea() {
        return 0.5 * this.base * this.height;
    }

    display() {
        console.log(`This is a triangle with base: ${this.base} and height: ${this.height}`);
    }
}

// Function that works with any object that has calculateArea method
function calculateTotalArea(shapes) {
    return shapes.reduce((total, shape) => {
        // Duck typing - we only care if the object has calculateArea method
        if (typeof shape.calculateArea === 'function') {
            return total + shape.calculateArea();
        }
        return total;
    }, 0);
}

// Example 3: Method Overloading through Default Parameters
console.log('\nExample 3: Method Overloading through Default Parameters\n');

class Calculator {
    // Method overloading through default parameters
    add(a, b, c = 0) {
        return a + b + c;
    }

    // Method overloading through different parameter types
    multiply(a, b) {
        if (typeof a === 'number' && typeof b === 'number') {
            return a * b;
        } else if (Array.isArray(a)) {
            return a.reduce((total, num) => total * num, 1);
        }
        throw new Error('Invalid parameters');
    }
}

// Example usage
console.log('Example Usage:\n');

// Runtime Polymorphism
console.log('1. Runtime Polymorphism:');
const shapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4)
];

shapes.forEach(shape => {
    shape.display();
    console.log(`Area: ${shape.calculateArea()}`);
    console.log();
});

// Duck Typing
console.log('2. Duck Typing:');
const mixedShapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4),
    { calculateArea: () => 100 }  // Object literal with calculateArea method
];

console.log('Total area of all shapes:', calculateTotalArea(mixedShapes));

// Method Overloading
console.log('\n3. Method Overloading:');
const calc = new Calculator();

console.log('Adding two numbers:', calc.add(5, 3));
console.log('Adding three numbers:', calc.add(5, 3, 2));
console.log('Multiplying two numbers:', calc.multiply(5, 3));
console.log('Multiplying array of numbers:', calc.multiply([2, 3, 4]));

// Additional Polymorphism Examples
console.log('\n4. Additional Polymorphism Examples:');

// Polymorphic function
function processShape(shape) {
    if (shape instanceof Shape) {
        console.log('Processing a Shape object:');
    } else if (shape instanceof Circle) {
        console.log('Processing a Circle object:');
        console.log('Circumference:', shape.getCircumference());
    } else if (shape instanceof Rectangle) {
        console.log('Processing a Rectangle object:');
        console.log('Is square?', shape.isSquare());
    } else if (shape instanceof Triangle) {
        console.log('Processing a Triangle object:');
    } else {
        console.log('Processing an unknown shape:');
    }
    
    shape.display();
    console.log(`Area: ${shape.calculateArea()}`);
    console.log();
}

// Process different types of shapes
processShape(new Circle(5));
processShape(new Rectangle(4, 4));
processShape(new Triangle(3, 4));

/**
 * Benefits of Polymorphism in JavaScript:
 * 
 * 1. Code Flexibility:
 *    - Objects can be treated uniformly through a common interface
 *    - New types can be added without modifying existing code
 * 
 * 2. Duck Typing:
 *    - More flexible than traditional type-based polymorphism
 *    - Objects are judged by their behavior, not their type
 * 
 * 3. Method Overriding:
 *    - Child classes can provide specific implementations
 *    - Maintains the same interface while changing behavior
 * 
 * 4. Dynamic Method Dispatch:
 *    - Method calls are resolved at runtime
 *    - Enables more flexible and dynamic code
 * 
 * 5. Interface-based Polymorphism:
 *    - Through duck typing, any object with required methods can be used
 *    - Promotes loose coupling and code reusability
 * 
 * Best Practices:
 * 1. Use method overriding for clear inheritance hierarchies
 * 2. Leverage duck typing for more flexible code
 * 3. Use default parameters for method overloading
 * 4. Document expected interfaces for duck typing
 * 5. Keep polymorphic behavior consistent and predictable
 */ 