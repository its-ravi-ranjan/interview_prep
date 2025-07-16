/**
 * Prototype Pattern Example
 * 
 * Intent: Specify the kinds of objects to create using a prototypical instance,
 * and create new objects by copying this prototype.
 * 
 * Real-world analogy:
 * Think of a vehicle manufacturing plant where you have prototype vehicles.
 * Instead of building each vehicle from scratch, you can clone an existing
 * prototype and customize it as needed.
 */

const { Vehicle, Car, Motorcycle, VehicleFeatures, VehicleParts } = require('./VehicleTheme');

// Prototype
class VehiclePrototype {
    constructor(model, color, year, price) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.price = price;
        this.features = null;
        this.parts = null;
    }
    
    clone() {
        const clone = new this.constructor(this.model, this.color, this.year, this.price);
        clone.features = this.features;
        clone.parts = this.parts;
        return clone;
    }
    
    assemble() {
        throw new Error('Method assemble() must be implemented');
    }
    
    paint() {
        throw new Error('Method paint() must be implemented');
    }
    
    test() {
        throw new Error('Method test() must be implemented');
    }
    
    display() {
        console.log(`\nVehicle: ${this.model}`);
        console.log(`Color: ${this.color}`);
        console.log(`Year: ${this.year}`);
        console.log(`Price: $${this.price}`);
        if (this.features) this.features.display();
        if (this.parts) this.parts.display();
    }
}

// Concrete Prototypes
class CarPrototype extends VehiclePrototype {
    constructor(model, color, year, price) {
        super(model, color, year, price);
        this.features = new VehicleFeatures(true, true, true, 5);
        this.parts = new VehicleParts('V6 Engine', 'Automatic', 'Alloy Wheels', 'Disc Brakes');
    }
    
    clone() {
        return new CarPrototype(this.model, this.color, this.year, this.price);
    }
    
    assemble() {
        console.log(`Assembling ${this.model} car...`);
    }
    
    paint() {
        console.log(`Painting ${this.model} in ${this.color}...`);
    }
    
    test() {
        console.log(`Testing ${this.model} car...`);
    }
}

class MotorcyclePrototype extends VehiclePrototype {
    constructor(model, color, year, price) {
        super(model, color, year, price);
        this.features = new VehicleFeatures(false, true, false, 2);
        this.parts = new VehicleParts('600cc Engine', 'Manual', 'Sport Wheels', 'Disc Brakes');
    }
    
    clone() {
        return new MotorcyclePrototype(this.model, this.color, this.year, this.price);
    }
    
    assemble() {
        console.log(`Assembling ${this.model} motorcycle...`);
    }
    
    paint() {
        console.log(`Painting ${this.model} in ${this.color}...`);
    }
    
    test() {
        console.log(`Testing ${this.model} motorcycle...`);
    }
}

// Prototype Registry
class VehicleRegistry {
    constructor() {
        this.prototypes = new Map();
    }
    
    register(type, prototype) {
        this.prototypes.set(type, prototype);
    }
    
    create(type) {
        const prototype = this.prototypes.get(type);
        if (!prototype) {
            throw new Error(`Prototype of type ${type} not found`);
        }
        return prototype.clone();
    }
}

// Test the pattern
function testPrototype() {
    console.log('Prototype Pattern Demo - Vehicle Manufacturing\n');
    
    // Create prototype registry
    const registry = new VehicleRegistry();
    
    // Create and register prototypes
    const sedanPrototype = new CarPrototype('Sedan', 'Blue', 2024, 25000.0);
    const sportBikePrototype = new MotorcyclePrototype('Sport Bike', 'Red', 2024, 15000.0);
    
    registry.register('sedan', sedanPrototype);
    registry.register('sportBike', sportBikePrototype);
    
    // Clone and customize vehicles
    console.log('Creating vehicles from prototypes...\n');
    
    // Create a blue sedan
    const blueSedan = registry.create('sedan');
    blueSedan.assemble();
    blueSedan.paint();
    blueSedan.test();
    blueSedan.display();
    
    // Create a red sport bike
    const redSportBike = registry.create('sportBike');
    redSportBike.assemble();
    redSportBike.paint();
    redSportBike.test();
    redSportBike.display();
    
    // Create another sedan with different color
    const blackSedan = registry.create('sedan');
    blackSedan.color = 'Black';
    blackSedan.assemble();
    blackSedan.paint();
    blackSedan.test();
    blackSedan.display();
}

// Run the test
testPrototype(); 