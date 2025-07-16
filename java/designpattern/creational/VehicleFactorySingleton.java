/**
 * Singleton Pattern Example
 * 
 * Intent: Ensure a class has only one instance and provide a global point of access to it.
 * 
 * Real-world analogy: 
 * Think of a Vehicle Factory Manager. There should be only one manager
 * who oversees the entire manufacturing process and maintains the factory's state.
 */

class VehicleFactoryManager {
    // Private static instance
    private static VehicleFactoryManager instance;
    
    // Factory state
    private int totalVehiclesProduced;
    private double totalRevenue;
    private boolean isFactoryOpen;
    
    // Private constructor
    private VehicleFactoryManager() {
        totalVehiclesProduced = 0;
        totalRevenue = 0.0;
        isFactoryOpen = false;
    }
    
    // Public static method to get instance
    public static synchronized VehicleFactoryManager getInstance() {
        if (instance == null) {
            instance = new VehicleFactoryManager();
        }
        return instance;
    }
    
    // Factory operations
    public void openFactory() {
        isFactoryOpen = true;
        System.out.println("Factory is now open for production");
    }
    
    public void closeFactory() {
        isFactoryOpen = false;
        System.out.println("Factory is now closed");
    }
    
    public void recordVehicleProduction(Vehicle vehicle) {
        if (isFactoryOpen) {
            totalVehiclesProduced++;
            totalRevenue += vehicle.price;
            System.out.println("Recorded production of: " + vehicle.model);
        } else {
            System.out.println("Cannot record production - Factory is closed");
        }
    }
    
    public void displayFactoryStatus() {
        System.out.println("\nFactory Status:");
        System.out.println("Total Vehicles Produced: " + totalVehiclesProduced);
        System.out.println("Total Revenue: $" + totalRevenue);
        System.out.println("Factory Status: " + (isFactoryOpen ? "Open" : "Closed"));
    }
}

public class VehicleFactorySingleton {
    public static void main(String[] args) {
        System.out.println("Singleton Pattern Demo - Vehicle Factory Manager\n");
        
        // Get the factory manager instance
        VehicleFactoryManager manager1 = VehicleFactoryManager.getInstance();
        VehicleFactoryManager manager2 = VehicleFactoryManager.getInstance();
        
        // Verify that both references point to the same instance
        System.out.println("Are both managers the same instance? " + (manager1 == manager2));
        
        // Use the factory manager
        manager1.openFactory();
        
        // Create some vehicles
        Car car = new Car("Sedan", "Blue", 2024, 25000.0);
        Motorcycle bike = new Motorcycle("Sport", "Red", 2024, 15000.0);
        Truck truck = new Truck("Heavy", "Black", 2024, 45000.0);
        
        // Record production
        manager1.recordVehicleProduction(car);
        manager1.recordVehicleProduction(bike);
        manager1.recordVehicleProduction(truck);
        
        // Display factory status
        manager1.displayFactoryStatus();
        
        // Try to record production after closing factory
        manager1.closeFactory();
        manager1.recordVehicleProduction(car);
        
        // Display final status
        manager1.displayFactoryStatus();
    }
} 