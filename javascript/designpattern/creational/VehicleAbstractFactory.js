/**
 * Abstract Factory Pattern Example
 * 
 * Intent: Provide an interface for creating families of related or dependent objects
 * without specifying their concrete classes.
 * 
 * Real-world analogy: 
 * Think of different vehicle manufacturing companies (like Toyota, BMW, Harley-Davidson).
 * Each company produces a family of related vehicles (cars, motorcycles, trucks) with their
 * own unique style and features.
 */

const { Vehicle, Car, Motorcycle, Truck, VehicleFeatures, VehicleParts } = require('./VehicleTheme');

// Abstract Factory
class VehicleManufacturer {
    createCar(model, color, year, price) {
        throw new Error('Method createCar() must be implemented');
    }
    
    createMotorcycle(model, color, year, price) {
        throw new Error('Method createMotorcycle() must be implemented');
    }
    
    createTruck(model, color, year, price) {
        throw new Error('Method createTruck() must be implemented');
    }
    
    createFeatures() {
        throw new Error('Method createFeatures() must be implemented');
    }
    
    createParts() {
        throw new Error('Method createParts() must be implemented');
    }
}

// Concrete Factories
class LuxuryVehicleManufacturer extends VehicleManufacturer {
    createCar(model, color, year, price) {
        return new Car(model, color, year, price * 1.5); // Luxury cars cost more
    }
    
    createMotorcycle(model, color, year, price) {
        return new Motorcycle(model, color, year, price * 1.3); // Luxury motorcycles cost more
    }
    
    createTruck(model, color, year, price) {
        return new Truck(model, color, year, price * 1.4); // Luxury trucks cost more
    }
    
    createFeatures() {
        return new VehicleFeatures(true, true, true, 5); // All luxury features
    }
    
    createParts() {
        return new VehicleParts('V8 Engine', 'Automatic', 'Alloy Wheels', 'Disc Brakes');
    }
}

class EconomyVehicleManufacturer extends VehicleManufacturer {
    createCar(model, color, year, price) {
        return new Car(model, color, year, price * 0.8); // Economy cars cost less
    }
    
    createMotorcycle(model, color, year, price) {
        return new Motorcycle(model, color, year, price * 0.7); // Economy motorcycles cost less
    }
    
    createTruck(model, color, year, price) {
        return new Truck(model, color, year, price * 0.9); // Economy trucks cost less
    }
    
    createFeatures() {
        return new VehicleFeatures(false, true, false, 4); // Basic features
    }
    
    createParts() {
        return new VehicleParts('4-Cylinder Engine', 'Manual', 'Steel Wheels', 'Drum Brakes');
    }
}

// Test the pattern
function testAbstractFactory() {
    console.log('Abstract Factory Pattern Demo - Vehicle Manufacturing Companies\n');
    
    // Create different manufacturers
    const luxuryManufacturer = new LuxuryVehicleManufacturer();
    const economyManufacturer = new EconomyVehicleManufacturer();
    
    // Create luxury vehicles
    console.log('Manufacturing Luxury Vehicles:');
    const luxuryCar = luxuryManufacturer.createCar('Luxury Sedan', 'Silver', 2024, 25000.0);
    const luxuryFeatures = luxuryManufacturer.createFeatures();
    const luxuryParts = luxuryManufacturer.createParts();
    
    console.log('\nLuxury Car Details:');
    luxuryCar.display();
    luxuryFeatures.display();
    luxuryParts.display();
    
    // Create economy vehicles
    console.log('\nManufacturing Economy Vehicles:');
    const economyCar = economyManufacturer.createCar('Economy Hatchback', 'White', 2024, 25000.0);
    const economyFeatures = economyManufacturer.createFeatures();
    const economyParts = economyManufacturer.createParts();
    
    console.log('\nEconomy Car Details:');
    economyCar.display();
    economyFeatures.display();
    economyParts.display();
}

// Run the test
testAbstractFactory(); 