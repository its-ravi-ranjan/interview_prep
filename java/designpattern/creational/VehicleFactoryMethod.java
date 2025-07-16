/**
 * Factory Method Pattern Example
 * 
 * Intent: Define an interface for creating an object, but let subclasses decide which class to instantiate.
 * 
 * Real-world analogy: 
 * Think of different vehicle manufacturing plants. Each plant (factory) knows how to
 * create its specific type of vehicle, but they all follow the same manufacturing process.
 */

// Creator (Factory) interface
interface VehicleFactory {
    Vehicle createVehicle(String model, String color, int year, double price);
    void prepareVehicle(Vehicle vehicle);
}

// Concrete Creators
class CarFactory implements VehicleFactory {
    @Override
    public Vehicle createVehicle(String model, String color, int year, double price) {
        return new Car(model, color, year, price);
    }
    
    @Override
    public void prepareVehicle(Vehicle vehicle) {
        System.out.println("Preparing car for delivery:");
        vehicle.assemble();
        vehicle.paint();
        vehicle.test();
    }
}

class MotorcycleFactory implements VehicleFactory {
    @Override
    public Vehicle createVehicle(String model, String color, int year, double price) {
        return new Motorcycle(model, color, year, price);
    }
    
    @Override
    public void prepareVehicle(Vehicle vehicle) {
        System.out.println("Preparing motorcycle for delivery:");
        vehicle.assemble();
        vehicle.paint();
        vehicle.test();
    }
}

class TruckFactory implements VehicleFactory {
    @Override
    public Vehicle createVehicle(String model, String color, int year, double price) {
        return new Truck(model, color, year, price);
    }
    
    @Override
    public void prepareVehicle(Vehicle vehicle) {
        System.out.println("Preparing truck for delivery:");
        vehicle.assemble();
        vehicle.paint();
        vehicle.test();
    }
}

public class VehicleFactoryMethod {
    public static void main(String[] args) {
        System.out.println("Factory Method Pattern Demo - Vehicle Manufacturing\n");
        
        // Create different vehicle factories
        VehicleFactory carFactory = new CarFactory();
        VehicleFactory motorcycleFactory = new MotorcycleFactory();
        VehicleFactory truckFactory = new TruckFactory();
        
        // Create and prepare vehicles using respective factories
        System.out.println("Manufacturing a Car:");
        Vehicle car = carFactory.createVehicle("Sedan", "Blue", 2024, 25000.0);
        carFactory.prepareVehicle(car);
        car.display();
        
        System.out.println("\nManufacturing a Motorcycle:");
        Vehicle motorcycle = motorcycleFactory.createVehicle("Sport", "Red", 2024, 15000.0);
        motorcycleFactory.prepareVehicle(motorcycle);
        motorcycle.display();
        
        System.out.println("\nManufacturing a Truck:");
        Vehicle truck = truckFactory.createVehicle("Heavy", "Black", 2024, 45000.0);
        truckFactory.prepareVehicle(truck);
        truck.display();
    }
} 