/**
 * Prototype Design Pattern
 * 
 * Intent: Specify the kinds of objects to create using a prototypical instance,
 * and create new objects by copying this prototype.
 * 
 * Use cases:
 * 1. When a system should be independent of how its products are created, composed, and represented
 * 2. When the classes to instantiate are specified at run-time
 * 3. When avoiding building a class hierarchy of factories that parallels the class hierarchy of products
 * 4. When instances of a class can have only a few different combinations of state
 * 
 * Components:
 * 1. Prototype (Interface/Abstract class)
 * 2. Concrete Prototypes
 * 3. Client
 */

// Base Shape class (Prototype)
class Shape {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    clone() {
        // Using Object.create to create a new object with the same prototype
        const clone = Object.create(Object.getPrototypeOf(this));
        // Copy all properties
        return Object.assign(clone, this);
    }

    draw() {
        throw new Error('Method draw() must be implemented');
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

// Concrete Prototypes
class Rectangle extends Shape {
    constructor() {
        super();
        this.width = 10;
        this.height = 5;
        this.color = 'Red';
    }

    draw() {
        console.log(`Drawing Rectangle at (${this.x},${this.y}) with width=${this.width}, height=${this.height}, color=${this.color}`);
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    setColor(color) {
        this.color = color;
    }
}

class Circle extends Shape {
    constructor() {
        super();
        this.radius = 5;
        this.color = 'Blue';
    }

    draw() {
        console.log(`Drawing Circle at (${this.x},${this.y}) with radius=${this.radius}, color=${this.color}`);
    }

    setRadius(radius) {
        this.radius = radius;
    }

    setColor(color) {
        this.color = color;
    }
}

// Prototype Registry
class ShapeRegistry {
    static #shapes = new Map();

    static {
        // Initialize with some default shapes
        this.#shapes.set('rectangle', new Rectangle());
        this.#shapes.set('circle', new Circle());
    }

    static getShape(type) {
        const shape = this.#shapes.get(type.toLowerCase());
        return shape ? shape.clone() : null;
    }

    static addShape(type, shape) {
        this.#shapes.set(type.toLowerCase(), shape);
    }
}

// Example: Drawing Application
class DrawingApplication {
    constructor() {
        this.shapes = new Map();
    }

    addShape(id, type) {
        const shape = ShapeRegistry.getShape(type);
        if (shape) {
            this.shapes.set(id, shape);
        }
    }

    moveShape(id, x, y) {
        const shape = this.shapes.get(id);
        if (shape) {
            shape.setX(x);
            shape.setY(y);
        }
    }

    drawAll() {
        console.log('\nDrawing all shapes:');
        for (const shape of this.shapes.values()) {
            shape.draw();
        }
    }
}

// Alternative implementation using factory functions
const createShapeFactory = (type) => {
    const shapes = {
        rectangle: () => new Rectangle(),
        circle: () => new Circle()
    };

    return shapes[type.toLowerCase()] || (() => {
        throw new Error(`Unsupported shape type: ${type}`);
    });
};

// Test function to demonstrate the pattern
function testPrototypePattern() {
    console.log('Prototype Pattern Demo\n');

    // Basic cloning example
    console.log('1. Basic Cloning Example:');
    const originalRect = new Rectangle();
    originalRect.setX(10);
    originalRect.setY(20);
    originalRect.setColor('Green');

    const clonedRect = originalRect.clone();
    clonedRect.setX(30);
    clonedRect.setY(40);

    console.log('Original Rectangle:');
    originalRect.draw();
    console.log('Cloned Rectangle:');
    clonedRect.draw();

    // Using the Shape Registry
    console.log('\n2. Using Shape Registry:');
    const circle1 = ShapeRegistry.getShape('circle');
    const circle2 = ShapeRegistry.getShape('circle');
    const rectangle1 = ShapeRegistry.getShape('rectangle');

    circle1.setX(5);
    circle1.setY(5);
    circle2.setX(15);
    circle2.setY(15);
    rectangle1.setX(25);
    rectangle1.setY(25);

    console.log('Circle 1:');
    circle1.draw();
    console.log('Circle 2:');
    circle2.draw();
    console.log('Rectangle 1:');
    rectangle1.draw();

    // Example: Drawing Application
    console.log('\n3. Drawing Application Example:');
    const app = new DrawingApplication();

    // Add some shapes
    app.addShape('rect1', 'rectangle');
    app.addShape('circle1', 'circle');
    app.addShape('rect2', 'rectangle');

    // Move shapes around
    app.moveShape('rect1', 10, 10);
    app.moveShape('circle1', 20, 20);
    app.moveShape('rect2', 30, 30);

    // Draw all shapes
    app.drawAll();

    // Example of using the pattern in a real application
    console.log('\nReal Application Example:');
    console.log('User wants to create a new shape...');
    
    // Simulate user input
    const shapeType = 'circle'; // This could come from user input
    const shapeId = 'newShape';
    
    // Using the factory function approach
    console.log('\nUsing Factory Function:');
    try {
        const createShape = createShapeFactory(shapeType);
        const newShape = createShape();
        
        if (newShape instanceof Circle) {
            newShape.setRadius(8);
            newShape.setColor('Purple');
        } else if (newShape instanceof Rectangle) {
            newShape.setWidth(15);
            newShape.setHeight(10);
            newShape.setColor('Orange');
        }
        
        newShape.setX(50);
        newShape.setY(50);
        
        console.log(`Created new ${shapeType}:`);
        newShape.draw();
        
        // Add to registry for future use
        ShapeRegistry.addShape(`custom_${shapeType}`, newShape);
        console.log(`Added to shape registry as 'custom_${shapeType}'`);
    } catch (error) {
        console.error(error.message);
    }

    // Using the registry approach
    console.log('\nUsing Registry:');
    const registryShape = ShapeRegistry.getShape(shapeType);
    if (registryShape) {
        if (registryShape instanceof Circle) {
            registryShape.setRadius(8);
            registryShape.setColor('Purple');
        } else if (registryShape instanceof Rectangle) {
            registryShape.setWidth(15);
            registryShape.setHeight(10);
            registryShape.setColor('Orange');
        }
        
        registryShape.setX(50);
        registryShape.setY(50);
        
        console.log(`Created new ${shapeType}:`);
        registryShape.draw();
        
        // Add to registry for future use
        ShapeRegistry.addShape(`custom_${shapeType}`, registryShape);
        console.log(`Added to shape registry as 'custom_${shapeType}'`);
    }
}

// Run the tests
testPrototypePattern(); 