/**
 * Builder Pattern Example
 * 
 * Intent: Separate the construction of a complex object from its representation,
 * allowing the same construction process to create different representations.
 * 
 * Real-world analogy: 
 * Think of a vehicle customization shop. Instead of buying a pre-built vehicle,
 * you can specify exactly what features, parts, and options you want, and the
 * builder will assemble it according to your specifications.
 */

const { Vehicle, Car, VehicleFeatures, VehicleParts } = require('./VehicleTheme');

// Product
class CustomVehicle {
    constructor() {
        this.baseVehicle = null;
        this.features = null;
        this.parts = null;
        this.customPaint = null;
        this.hasCustomWheels = false;
        this.interiorType = null;
    }
    
    setBaseVehicle(vehicle) {
        this.baseVehicle = vehicle;
    }
    
    setFeatures(features) {
        this.features = features;
    }
    
    setParts(parts) {
        this.parts = parts;
    }
    
    setCustomPaint(paint) {
        this.customPaint = paint;
    }
    
    setCustomWheels(hasCustomWheels) {
        this.hasCustomWheels = hasCustomWheels;
    }
    
    setInteriorType(interiorType) {
        this.interiorType = interiorType;
    }
    
    display() {
        console.log('\nCustom Vehicle Details:');
        this.baseVehicle.display();
        this.features.display();
        this.parts.display();
        console.log('Custom Paint:', this.customPaint);
        console.log('Custom Wheels:', this.hasCustomWheels);
        console.log('Interior Type:', this.interiorType);
    }
}

// Builder interface
class VehicleBuilder {
    buildBaseVehicle(model, color, year, price) {
        throw new Error('Method buildBaseVehicle() must be implemented');
    }
    
    buildFeatures() {
        throw new Error('Method buildFeatures() must be implemented');
    }
    
    buildParts() {
        throw new Error('Method buildParts() must be implemented');
    }
    
    addCustomizations() {
        throw new Error('Method addCustomizations() must be implemented');
    }
    
    getResult() {
        throw new Error('Method getResult() must be implemented');
    }
}

// Concrete Builder
class LuxuryCarBuilder extends VehicleBuilder {
    constructor() {
        super();
        this.vehicle = new CustomVehicle();
    }
    
    buildBaseVehicle(model, color, year, price) {
        this.vehicle.setBaseVehicle(new Car(model, color, year, price * 1.5));
    }
    
    buildFeatures() {
        this.vehicle.setFeatures(new VehicleFeatures(true, true, true, 5));
    }
    
    buildParts() {
        this.vehicle.setParts(new VehicleParts('V8 Engine', 'Automatic', 'Alloy Wheels', 'Disc Brakes'));
    }
    
    addCustomizations() {
        this.vehicle.setCustomPaint('Metallic Silver');
        this.vehicle.setCustomWheels(true);
        this.vehicle.setInteriorType('Leather');
    }
    
    getResult() {
        return this.vehicle;
    }
}

// Director
class VehicleCustomizationDirector {
    constructor() {
        this.builder = null;
    }
    
    setBuilder(builder) {
        this.builder = builder;
    }
    
    constructVehicle() {
        this.builder.buildBaseVehicle('Luxury Sedan', 'Silver', 2024, 25000.0);
        this.builder.buildFeatures();
        this.builder.buildParts();
        this.builder.addCustomizations();
    }
}

// Test the pattern
function testBuilder() {
    console.log('Builder Pattern Demo - Vehicle Customization\n');
    
    // Create a director
    const director = new VehicleCustomizationDirector();
    
    // Create a builder
    const luxuryBuilder = new LuxuryCarBuilder();
    
    // Set the builder
    director.setBuilder(luxuryBuilder);
    
    // Construct the vehicle
    console.log('Building a custom luxury car...');
    director.constructVehicle();
    
    // Get the result
    const customCar = luxuryBuilder.getResult();
    
    // Display the custom vehicle
    customCar.display();
}

// Run the test
testBuilder(); 