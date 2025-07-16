/**
 * Builder Design Pattern
 * 
 * Intent: Separate the construction of a complex object from its representation
 * so that the same construction process can create different representations.
 * 
 * Use cases:
 * 1. When an object has a large number of optional parameters
 * 2. When an object needs to be immutable once created
 * 3. When you want to create different representations of the same construction process
 * 
 * Components:
 * 1. Builder (Interface/Abstract class)
 * 2. Concrete Builders
 * 3. Director
 * 4. Product
 */

// Product
class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String gpu;
    private boolean hasBluetooth;
    private boolean hasWifi;
    private String operatingSystem;

    private Computer(ComputerBuilder builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
        this.gpu = builder.gpu;
        this.hasBluetooth = builder.hasBluetooth;
        this.hasWifi = builder.hasWifi;
        this.operatingSystem = builder.operatingSystem;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Computer Configuration:\n");
        sb.append("CPU: ").append(cpu).append("\n");
        sb.append("RAM: ").append(ram).append("\n");
        sb.append("Storage: ").append(storage).append("\n");
        sb.append("GPU: ").append(gpu).append("\n");
        sb.append("Bluetooth: ").append(hasBluetooth).append("\n");
        sb.append("WiFi: ").append(hasWifi).append("\n");
        sb.append("Operating System: ").append(operatingSystem);
        return sb.toString();
    }

    // Builder
    public static class ComputerBuilder {
        // Required parameters
        private final String cpu;
        private final String ram;
        private final String storage;

        // Optional parameters
        private String gpu = "Integrated Graphics";
        private boolean hasBluetooth = false;
        private boolean hasWifi = false;
        private String operatingSystem = "Windows 10";

        public ComputerBuilder(String cpu, String ram, String storage) {
            this.cpu = cpu;
            this.ram = ram;
            this.storage = storage;
        }

        public ComputerBuilder withGPU(String gpu) {
            this.gpu = gpu;
            return this;
        }

        public ComputerBuilder withBluetooth(boolean hasBluetooth) {
            this.hasBluetooth = hasBluetooth;
            return this;
        }

        public ComputerBuilder withWifi(boolean hasWifi) {
            this.hasWifi = hasWifi;
            return this;
        }

        public ComputerBuilder withOperatingSystem(String operatingSystem) {
            this.operatingSystem = operatingSystem;
            return this;
        }

        public Computer build() {
            return new Computer(this);
        }
    }
}

// Director
class ComputerDirector {
    public Computer buildGamingComputer() {
        return new Computer.ComputerBuilder(
            "Intel i9-13900K",
            "32GB DDR5",
            "2TB NVMe SSD"
        )
        .withGPU("NVIDIA RTX 4090")
        .withBluetooth(true)
        .withWifi(true)
        .withOperatingSystem("Windows 11")
        .build();
    }

    public Computer buildOfficeComputer() {
        return new Computer.ComputerBuilder(
            "Intel i5-12400",
            "16GB DDR4",
            "512GB SSD"
        )
        .withBluetooth(true)
        .withWifi(true)
        .build();
    }

    public Computer buildBudgetComputer() {
        return new Computer.ComputerBuilder(
            "AMD Ryzen 5 5600G",
            "8GB DDR4",
            "256GB SSD"
        )
        .withWifi(true)
        .build();
    }
}

// Example: Custom Computer Builder
class CustomComputerBuilder {
    private Computer.ComputerBuilder builder;

    public CustomComputerBuilder() {
        // Start with a basic configuration
        builder = new Computer.ComputerBuilder(
            "Intel i5-12400",
            "16GB DDR4",
            "512GB SSD"
        );
    }

    public CustomComputerBuilder setCPU(String cpu) {
        builder = new Computer.ComputerBuilder(cpu, "16GB DDR4", "512GB SSD");
        return this;
    }

    public CustomComputerBuilder setRAM(String ram) {
        builder = new Computer.ComputerBuilder(builder.cpu, ram, "512GB SSD");
        return this;
    }

    public CustomComputerBuilder setStorage(String storage) {
        builder = new Computer.ComputerBuilder(builder.cpu, builder.ram, storage);
        return this;
    }

    public CustomComputerBuilder addGPU(String gpu) {
        builder.withGPU(gpu);
        return this;
    }

    public CustomComputerBuilder addBluetooth() {
        builder.withBluetooth(true);
        return this;
    }

    public CustomComputerBuilder addWifi() {
        builder.withWifi(true);
        return this;
    }

    public CustomComputerBuilder setOS(String os) {
        builder.withOperatingSystem(os);
        return this;
    }

    public Computer build() {
        return builder.build();
    }
}

public class BuilderPattern {
    public static void main(String[] args) {
        System.out.println("Builder Pattern Demo\n");

        // Using the Director to build predefined computers
        ComputerDirector director = new ComputerDirector();

        System.out.println("1. Building a Gaming Computer:");
        Computer gamingPC = director.buildGamingComputer();
        System.out.println(gamingPC);

        System.out.println("\n2. Building an Office Computer:");
        Computer officePC = director.buildOfficeComputer();
        System.out.println(officePC);

        System.out.println("\n3. Building a Budget Computer:");
        Computer budgetPC = director.buildBudgetComputer();
        System.out.println(budgetPC);

        // Using the Custom Builder
        System.out.println("\n4. Building a Custom Computer:");
        Computer customPC = new CustomComputerBuilder()
            .setCPU("AMD Ryzen 7 5800X")
            .setRAM("32GB DDR4")
            .setStorage("1TB NVMe SSD")
            .addGPU("NVIDIA RTX 3080")
            .addBluetooth()
            .addWifi()
            .setOS("Ubuntu 22.04")
            .build();
        System.out.println(customPC);

        // Example of using the pattern in a real application
        System.out.println("\nReal Application Example:");
        System.out.println("Customer wants to build a computer...");
        
        // Simulate customer preferences
        String customerType = "gaming"; // This could come from user input
        
        Computer customerPC;
        switch (customerType.toLowerCase()) {
            case "gaming":
                customerPC = director.buildGamingComputer();
                System.out.println("Building a gaming computer for the customer:");
                break;
            case "office":
                customerPC = director.buildOfficeComputer();
                System.out.println("Building an office computer for the customer:");
                break;
            case "budget":
                customerPC = director.buildBudgetComputer();
                System.out.println("Building a budget computer for the customer:");
                break;
            default:
                System.out.println("Building a custom computer for the customer:");
                customerPC = new CustomComputerBuilder()
                    .setCPU("Intel i7-12700K")
                    .setRAM("16GB DDR4")
                    .setStorage("1TB SSD")
                    .addGPU("NVIDIA RTX 3060")
                    .addBluetooth()
                    .addWifi()
                    .build();
        }
        
        System.out.println(customerPC);
    }
} 