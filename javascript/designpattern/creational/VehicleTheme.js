/**
 * Common theme for all creational design patterns
 * Using a Vehicle Manufacturing System as the example
 */

// Base Vehicle class
class Vehicle {
    constructor(model, color, year, price) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.price = price;
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
        console.log('\nVehicle Details:');
        console.log('Model:', this.model);
        console.log('Color:', this.color);
        console.log('Year:', this.year);
        console.log('Price: $' + this.price);
    }
}

// Concrete Vehicle classes
class Car extends Vehicle {
    constructor(model, color, year, price) {
        super(model, color, year, price);
    }

    assemble() {
        console.log('Assembling car:', this.model);
    }

    paint() {
        console.log('Painting car:', this.model, 'in', this.color);
    }

    test() {
        console.log('Testing car:', this.model);
    }
}

class Motorcycle extends Vehicle {
    constructor(model, color, year, price) {
        super(model, color, year, price);
    }

    assemble() {
        console.log('Assembling motorcycle:', this.model);
    }

    paint() {
        console.log('Painting motorcycle:', this.model, 'in', this.color);
    }

    test() {
        console.log('Testing motorcycle:', this.model);
    }
}

class Truck extends Vehicle {
    constructor(model, color, year, price) {
        super(model, color, year, price);
    }

    assemble() {
        console.log('Assembling truck:', this.model);
    }

    paint() {
        console.log('Painting truck:', this.model, 'in', this.color);
    }

    test() {
        console.log('Testing truck:', this.model);
    }
}

// Vehicle types enum (using Object.freeze to make it immutable)
const VehicleType = Object.freeze({
    CAR: 'CAR',
    MOTORCYCLE: 'MOTORCYCLE',
    TRUCK: 'TRUCK'
});

// Vehicle features
class VehicleFeatures {
    constructor(hasGPS, hasBluetooth, hasSunroof, seatingCapacity) {
        this.hasGPS = hasGPS;
        this.hasBluetooth = hasBluetooth;
        this.hasSunroof = hasSunroof;
        this.seatingCapacity = seatingCapacity;
    }

    display() {
        console.log('\nVehicle Features:');
        console.log('GPS:', this.hasGPS);
        console.log('Bluetooth:', this.hasBluetooth);
        console.log('Sunroof:', this.hasSunroof);
        console.log('Seating Capacity:', this.seatingCapacity);
    }
}

// Vehicle parts
class VehicleParts {
    constructor(engine, transmission, wheels, brakes) {
        this.engine = engine;
        this.transmission = transmission;
        this.wheels = wheels;
        this.brakes = brakes;
    }

    display() {
        console.log('\nVehicle Parts:');
        console.log('Engine:', this.engine);
        console.log('Transmission:', this.transmission);
        console.log('Wheels:', this.wheels);
        console.log('Brakes:', this.brakes);
    }
}

module.exports = {
    Vehicle,
    Car,
    Motorcycle,
    Truck,
    VehicleType,
    VehicleFeatures,
    VehicleParts
}; 