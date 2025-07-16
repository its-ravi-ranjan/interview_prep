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

// Product
class CustomVehicle {
    private Vehicle baseVehicle;
    private VehicleFeatures features;
    private VehicleParts parts;
    private String customPaint;
    private boolean hasCustomWheels;
    private String interiorType;
    
    public void setBaseVehicle(Vehicle vehicle) {
        this.baseVehicle = vehicle;
    }
    
    public void setFeatures(VehicleFeatures features) {
        this.features = features;
    }
    
    public void setParts(VehicleParts parts) {
        this.parts = parts;
    }
    
    public void setCustomPaint(String paint) {
        this.customPaint = paint;
    }
    
    public void setCustomWheels(boolean hasCustomWheels) {
        this.hasCustomWheels = hasCustomWheels;
    }
    
    public void setInteriorType(String interiorType) {
        this.interiorType = interiorType;
    }
    
    public void display() {
        System.out.println("\nCustom Vehicle Details:");
        baseVehicle.display();
        features.display();
        parts.display();
        System.out.println("Custom Paint: " + customPaint);
        System.out.println("Custom Wheels: " + hasCustomWheels);
        System.out.println("Interior Type: " + interiorType);
    }
}

// Builder interface
interface VehicleBuilder {
    void buildBaseVehicle(String model, String color, int year, double price);
    void buildFeatures();
    void buildParts();
    void addCustomizations();
    CustomVehicle getResult();
}

// Concrete Builder
class LuxuryCarBuilder implements VehicleBuilder {
    private CustomVehicle vehicle;
    
    public LuxuryCarBuilder() {
        this.vehicle = new CustomVehicle();
    }
    
    @Override
    public void buildBaseVehicle(String model, String color, int year, double price) {
        vehicle.setBaseVehicle(new Car(model, color, year, price * 1.5));
    }
    
    @Override
    public void buildFeatures() {
        vehicle.setFeatures(new VehicleFeatures(true, true, true, 5));
    }
    
    @Override
    public void buildParts() {
        vehicle.setParts(new VehicleParts("V8 Engine", "Automatic", "Alloy Wheels", "Disc Brakes"));
    }
    
    @Override
    public void addCustomizations() {
        vehicle.setCustomPaint("Metallic Silver");
        vehicle.setCustomWheels(true);
        vehicle.setInteriorType("Leather");
    }
    
    @Override
    public CustomVehicle getResult() {
        return vehicle;
    }
}

// Director
class VehicleCustomizationDirector {
    private VehicleBuilder builder;
    
    public void setBuilder(VehicleBuilder builder) {
        this.builder = builder;
    }
    
    public void constructVehicle() {
        builder.buildBaseVehicle("Luxury Sedan", "Silver", 2024, 25000.0);
        builder.buildFeatures();
        builder.buildParts();
        builder.addCustomizations();
    }
}

public class VehicleBuilder {
    public static void main(String[] args) {
        System.out.println("Builder Pattern Demo - Vehicle Customization\n");
        
        // Create a director
        VehicleCustomizationDirector director = new VehicleCustomizationDirector();
        
        // Create a builder
        LuxuryCarBuilder luxuryBuilder = new LuxuryCarBuilder();
        
        // Set the builder
        director.setBuilder(luxuryBuilder);
        
        // Construct the vehicle
        System.out.println("Building a custom luxury car...");
        director.constructVehicle();
        
        // Get the result
        CustomVehicle customCar = luxuryBuilder.getResult();
        
        // Display the custom vehicle
        customCar.display();
    }
} 