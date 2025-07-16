/**
 * Factory Method Pattern Example
 * 
 * Intent: Define an interface for creating an object, but let subclasses decide which class to instantiate.
 * 
 * Real-world analogy: 
 * Think of different vehicle manufacturing plants. Each plant (factory) knows how to
 * create its specific type of vehicle, but they all follow the same manufacturing process.
 */

const { Vehicle, Car, Motorcycle, Truck } = require('./VehicleTheme');

// Creator (Factory) interface
class VehicleFactory {
    createVehicle(model, color, year, price) {
        throw new Error('Method createVehicle() must be implemented');
    }
    
    prepareVehicle(vehicle) {
        throw new Error('Method prepareVehicle() must be implemented');
    }
}

// Concrete Creators
class CarFactory extends VehicleFactory {
    createVehicle(model, color, year, price) {
        return new Car(model, color, year, price);
    }
    
    prepareVehicle(vehicle) {
        console.log('Preparing car for delivery:');
        vehicle.assemble();
        vehicle.paint();
        vehicle.test();
    }
}

class MotorcycleFactory extends VehicleFactory {
    createVehicle(model, color, year, price) {
        return new Motorcycle(model, color, year, price);
    }
    
    prepareVehicle(vehicle) {
        console.log('Preparing motorcycle for delivery:');
        vehicle.assemble();
        vehicle.paint();
        vehicle.test();
    }
}

class TruckFactory extends VehicleFactory {
    createVehicle(model, color, year, price) {
        return new Truck(model, color, year, price);
    }
    
    prepareVehicle(vehicle) {
        console.log('Preparing truck for delivery:');
        vehicle.assemble();
        vehicle.paint();
        vehicle.test();
    }
}

// Test the pattern
function testFactoryMethod() {
    console.log('Factory Method Pattern Demo - Vehicle Manufacturing\n');
    
    // Create different vehicle factories
    const carFactory = new CarFactory();
    const motorcycleFactory = new MotorcycleFactory();
    const truckFactory = new TruckFactory();
    
    // Create and prepare vehicles using respective factories
    console.log('Manufacturing a Car:');
    const car = carFactory.createVehicle('Sedan', 'Blue', 2024, 25000.0);
    carFactory.prepareVehicle(car);
    car.display();
    
    console.log('\nManufacturing a Motorcycle:');
    const motorcycle = motorcycleFactory.createVehicle('Sport', 'Red', 2024, 15000.0);
    motorcycleFactory.prepareVehicle(motorcycle);
    motorcycle.display();
    
    console.log('\nManufacturing a Truck:');
    const truck = truckFactory.createVehicle('Heavy', 'Black', 2024, 45000.0);
    truckFactory.prepareVehicle(truck);
    truck.display();
}

// Run the test
testFactoryMethod(); 