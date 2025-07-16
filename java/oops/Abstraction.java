/**
 * Abstraction in Java
 * 
 * Abstraction is a process of hiding the implementation details and showing only the functionality
 * to the user. In Java, abstraction is achieved using:
 * 
 * 1. Abstract Classes
 *    - Can have both abstract and non-abstract methods
 *    - Can have constructors
 *    - Can have instance variables
 *    - Cannot be instantiated
 * 
 * 2. Interfaces
 *    - All methods are abstract by default (before Java 8)
 *    - Can have default and static methods (Java 8+)
 *    - Can have constant variables
 *    - Cannot be instantiated
 * 
 * Key points about Abstraction:
 * 1. Hides implementation details
 * 2. Shows only essential features
 * 3. Achieves security by hiding certain details
 * 4. Helps in reducing complexity
 */

// Abstract class example
abstract class Vehicle {
    // Instance variables
    protected String brand;
    protected String model;
    protected int year;

    // Constructor
    public Vehicle(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    // Abstract method - must be implemented by subclasses
    public abstract void start();
    public abstract void stop();

    // Non-abstract method - can be used by subclasses
    public void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
    }
}

// Interface example
interface ElectricVehicle {
    // Constant
    double BATTERY_CAPACITY = 100.0; // kWh

    // Abstract methods
    void charge();
    double getBatteryLevel();

    // Default method (Java 8+)
    default void displayBatteryInfo() {
        System.out.println("Battery Capacity: " + BATTERY_CAPACITY + " kWh");
    }

    // Static method (Java 8+)
    static void showChargingStations() {
        System.out.println("Finding nearest charging stations...");
    }
}

// Concrete class implementing both abstract class and interface
class ElectricCar extends Vehicle implements ElectricVehicle {
    private double batteryLevel;

    public ElectricCar(String brand, String model, int year) {
        super(brand, model, year);
        this.batteryLevel = 0.0;
    }

    // Implementing abstract methods from Vehicle
    @Override
    public void start() {
        System.out.println("Starting electric car...");
        System.out.println("Battery level: " + batteryLevel + "%");
    }

    @Override
    public void stop() {
        System.out.println("Stopping electric car...");
    }

    // Implementing methods from ElectricVehicle interface
    @Override
    public void charge() {
        System.out.println("Charging the electric car...");
        batteryLevel = 100.0;
    }

    @Override
    public double getBatteryLevel() {
        return batteryLevel;
    }

    // Additional method specific to ElectricCar
    public void drive() {
        if (batteryLevel > 0) {
            System.out.println("Driving the electric car...");
            batteryLevel -= 10.0;
        } else {
            System.out.println("Battery empty! Please charge the car.");
        }
    }
}

// Main class to demonstrate abstraction
public class Abstraction {
    public static void main(String[] args) {
        // Creating an instance of ElectricCar
        ElectricCar tesla = new ElectricCar("Tesla", "Model 3", 2023);

        // Using methods from Vehicle (abstract class)
        System.out.println("Vehicle Information:");
        tesla.displayInfo();

        // Using methods from ElectricVehicle (interface)
        System.out.println("\nElectric Vehicle Features:");
        tesla.displayBatteryInfo();
        ElectricVehicle.showChargingStations();

        // Using ElectricCar specific methods
        System.out.println("\nOperating the Electric Car:");
        tesla.start();
        tesla.drive();
        tesla.drive();
        System.out.println("Current battery level: " + tesla.getBatteryLevel() + "%");
        tesla.charge();
        System.out.println("After charging, battery level: " + tesla.getBatteryLevel() + "%");
        tesla.stop();

        // Demonstrating abstraction
        System.out.println("\nDemonstrating Abstraction:");
        Vehicle vehicle = tesla;  // Upcasting
        vehicle.start();  // Calls ElectricCar's start method
        vehicle.stop();   // Calls ElectricCar's stop method

        ElectricVehicle ev = tesla;  // Upcasting
        ev.charge();  // Calls ElectricCar's charge method
        ev.displayBatteryInfo();  // Calls interface's default method
    }
} 