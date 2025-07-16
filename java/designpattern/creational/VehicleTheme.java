/**
 * Common theme for all creational design patterns
 * Using a Vehicle Manufacturing System as the example
 */

// Base Vehicle class
abstract class Vehicle {
    protected String model;
    protected String color;
    protected int year;
    protected double price;

    public abstract void assemble();
    public abstract void paint();
    public abstract void test();

    public void display() {
        System.out.println("\nVehicle Details:");
        System.out.println("Model: " + model);
        System.out.println("Color: " + color);
        System.out.println("Year: " + year);
        System.out.println("Price: $" + price);
    }
}

// Concrete Vehicle classes
class Car extends Vehicle {
    public Car(String model, String color, int year, double price) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.price = price;
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

class Motorcycle extends Vehicle {
    public Motorcycle(String model, String color, int year, double price) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.price = price;
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

class Truck extends Vehicle {
    public Truck(String model, String color, int year, double price) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.price = price;
    }

    @Override
    public void assemble() {
        System.out.println("Assembling truck: " + model);
    }

    @Override
    public void paint() {
        System.out.println("Painting truck: " + model + " in " + color);
    }

    @Override
    public void test() {
        System.out.println("Testing truck: " + model);
    }
}

// Vehicle types enum
enum VehicleType {
    CAR,
    MOTORCYCLE,
    TRUCK
}

// Vehicle features
class VehicleFeatures {
    private boolean hasGPS;
    private boolean hasBluetooth;
    private boolean hasSunroof;
    private int seatingCapacity;

    public VehicleFeatures(boolean hasGPS, boolean hasBluetooth, boolean hasSunroof, int seatingCapacity) {
        this.hasGPS = hasGPS;
        this.hasBluetooth = hasBluetooth;
        this.hasSunroof = hasSunroof;
        this.seatingCapacity = seatingCapacity;
    }

    public void display() {
        System.out.println("\nVehicle Features:");
        System.out.println("GPS: " + hasGPS);
        System.out.println("Bluetooth: " + hasBluetooth);
        System.out.println("Sunroof: " + hasSunroof);
        System.out.println("Seating Capacity: " + seatingCapacity);
    }
}

// Vehicle parts
class VehicleParts {
    private String engine;
    private String transmission;
    private String wheels;
    private String brakes;

    public VehicleParts(String engine, String transmission, String wheels, String brakes) {
        this.engine = engine;
        this.transmission = transmission;
        this.wheels = wheels;
        this.brakes = brakes;
    }

    public void display() {
        System.out.println("\nVehicle Parts:");
        System.out.println("Engine: " + engine);
        System.out.println("Transmission: " + transmission);
        System.out.println("Wheels: " + wheels);
        System.out.println("Brakes: " + brakes);
    }
} 