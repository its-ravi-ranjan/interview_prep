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

// Abstract Factory
interface VehicleManufacturer {
    Vehicle createCar(String model, String color, int year, double price);
    Vehicle createMotorcycle(String model, String color, int year, double price);
    Vehicle createTruck(String model, String color, int year, double price);
    VehicleFeatures createFeatures();
    VehicleParts createParts();
}

// Concrete Factories
class LuxuryVehicleManufacturer implements VehicleManufacturer {
    @Override
    public Vehicle createCar(String model, String color, int year, double price) {
        return new Car(model, color, year, price * 1.5); // Luxury cars cost more
    }
    
    @Override
    public Vehicle createMotorcycle(String model, String color, int year, double price) {
        return new Motorcycle(model, color, year, price * 1.3); // Luxury motorcycles cost more
    }
    
    @Override
    public Vehicle createTruck(String model, String color, int year, double price) {
        return new Truck(model, color, year, price * 1.4); // Luxury trucks cost more
    }
    
    @Override
    public VehicleFeatures createFeatures() {
        return new VehicleFeatures(true, true, true, 5); // All luxury features
    }
    
    @Override
    public VehicleParts createParts() {
        return new VehicleParts("V8 Engine", "Automatic", "Alloy Wheels", "Disc Brakes");
    }
}

class EconomyVehicleManufacturer implements VehicleManufacturer {
    @Override
    public Vehicle createCar(String model, String color, int year, double price) {
        return new Car(model, color, year, price * 0.8); // Economy cars cost less
    }
    
    @Override
    public Vehicle createMotorcycle(String model, String color, int year, double price) {
        return new Motorcycle(model, color, year, price * 0.7); // Economy motorcycles cost less
    }
    
    @Override
    public Vehicle createTruck(String model, String color, int year, double price) {
        return new Truck(model, color, year, price * 0.9); // Economy trucks cost less
    }
    
    @Override
    public VehicleFeatures createFeatures() {
        return new VehicleFeatures(false, true, false, 4); // Basic features
    }
    
    @Override
    public VehicleParts createParts() {
        return new VehicleParts("4-Cylinder Engine", "Manual", "Steel Wheels", "Drum Brakes");
    }
}

public class VehicleAbstractFactory {
    public static void main(String[] args) {
        System.out.println("Abstract Factory Pattern Demo - Vehicle Manufacturing Companies\n");
        
        // Create different manufacturers
        VehicleManufacturer luxuryManufacturer = new LuxuryVehicleManufacturer();
        VehicleManufacturer economyManufacturer = new EconomyVehicleManufacturer();
        
        // Create luxury vehicles
        System.out.println("Manufacturing Luxury Vehicles:");
        Vehicle luxuryCar = luxuryManufacturer.createCar("Luxury Sedan", "Silver", 2024, 25000.0);
        VehicleFeatures luxuryFeatures = luxuryManufacturer.createFeatures();
        VehicleParts luxuryParts = luxuryManufacturer.createParts();
        
        System.out.println("\nLuxury Car Details:");
        luxuryCar.display();
        luxuryFeatures.display();
        luxuryParts.display();
        
        // Create economy vehicles
        System.out.println("\nManufacturing Economy Vehicles:");
        Vehicle economyCar = economyManufacturer.createCar("Economy Hatchback", "White", 2024, 25000.0);
        VehicleFeatures economyFeatures = economyManufacturer.createFeatures();
        VehicleParts economyParts = economyManufacturer.createParts();
        
        System.out.println("\nEconomy Car Details:");
        economyCar.display();
        economyFeatures.display();
        economyParts.display();
    }
} 