/**
 * Prototype Pattern Example
 * 
 * Intent: Create new objects by cloning an existing object, known as the prototype.
 * 
 * Real-world analogy: 
 * Think of a vehicle manufacturing process where you have a prototype vehicle.
 * Instead of building each vehicle from scratch, you can clone the prototype
 * and make specific modifications for each new vehicle.
 */

// Prototype
abstract class VehiclePrototype implements Cloneable {
    protected String model;
    protected String color;
    protected int year;
    protected double price;
    protected VehicleFeatures features;
    protected VehicleParts parts;
    
    public abstract void assemble();
    public abstract void paint();
    public abstract void test();
    
    @Override
    public VehiclePrototype clone() throws CloneNotSupportedException {
        return (VehiclePrototype) super.clone();
    }
    
    public void display() {
        System.out.println("\nVehicle Details:");
        System.out.println("Model: " + model);
        System.out.println("Color: " + color);
        System.out.println("Year: " + year);
        System.out.println("Price: $" + price);
        features.display();
        parts.display();
    }
}

// Concrete Prototypes
class CarPrototype extends VehiclePrototype {
    public CarPrototype(String model, String color, int year, double price) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.price = price;
        this.features = new VehicleFeatures(true, true, true, 5);
        this.parts = new VehicleParts("V6 Engine", "Automatic", "Alloy Wheels", "Disc Brakes");
    }
    
    @Override
    public void assemble() {
        System.out.println("Assembling car: " + model);
    }
    
    @Override
    public void paint() {
        System.out.println("Painting car: " + model + " in " + color);
    }
    
    @Override
    public void test() {
        System.out.println("Testing car: " + model);
    }
}

class MotorcyclePrototype extends VehiclePrototype {
    public MotorcyclePrototype(String model, String color, int year, double price) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.price = price;
        this.features = new VehicleFeatures(true, true, false, 2);
        this.parts = new VehicleParts("1000cc Engine", "Manual", "Sport Wheels", "Disc Brakes");
    }
    
    @Override
    public void assemble() {
        System.out.println("Assembling motorcycle: " + model);
    }
    
    @Override
    public void paint() {
        System.out.println("Painting motorcycle: " + model + " in " + color);
    }
    
    @Override
    public void test() {
        System.out.println("Testing motorcycle: " + model);
    }
}

// Prototype Registry
class VehicleRegistry {
    private static java.util.Map<String, VehiclePrototype> prototypes = new java.util.HashMap<>();
    
    public static void registerPrototype(String key, VehiclePrototype prototype) {
        prototypes.put(key, prototype);
    }
    
    public static VehiclePrototype getPrototype(String key) throws CloneNotSupportedException {
        VehiclePrototype prototype = prototypes.get(key);
        if (prototype != null) {
            return prototype.clone();
        }
        return null;
    }
}

public class VehiclePrototype {
    public static void main(String[] args) {
        System.out.println("Prototype Pattern Demo - Vehicle Manufacturing\n");
        
        try {
            // Create and register prototypes
            CarPrototype carPrototype = new CarPrototype("Sedan", "Blue", 2024, 25000.0);
            MotorcyclePrototype motorcyclePrototype = new MotorcyclePrototype("Sport", "Red", 2024, 15000.0);
            
            VehicleRegistry.registerPrototype("car", carPrototype);
            VehicleRegistry.registerPrototype("motorcycle", motorcyclePrototype);
            
            // Clone and customize vehicles
            System.out.println("Creating vehicles from prototypes:\n");
            
            // Create a car from prototype
            VehiclePrototype car1 = VehicleRegistry.getPrototype("car");
            car1.model = "Luxury Sedan";
            car1.color = "Silver";
            car1.price = 35000.0;
            
            // Create another car from prototype
            VehiclePrototype car2 = VehicleRegistry.getPrototype("car");
            car2.model = "Sports Car";
            car2.color = "Red";
            car2.price = 45000.0;
            
            // Create a motorcycle from prototype
            VehiclePrototype motorcycle = VehicleRegistry.getPrototype("motorcycle");
            motorcycle.model = "Touring Bike";
            motorcycle.color = "Black";
            motorcycle.price = 20000.0;
            
            // Display all vehicles
            System.out.println("Original Car Prototype:");
            carPrototype.display();
            
            System.out.println("\nCloned and Customized Vehicles:");
            System.out.println("\nCar 1:");
            car1.display();
            
            System.out.println("\nCar 2:");
            car2.display();
            
            System.out.println("\nMotorcycle:");
            motorcycle.display();
            
        } catch (CloneNotSupportedException e) {
            System.out.println("Error cloning prototype: " + e.getMessage());
        }
    }
} 