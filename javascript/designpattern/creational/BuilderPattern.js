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
    constructor(builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
        this.gpu = builder.gpu;
        this.hasBluetooth = builder.hasBluetooth;
        this.hasWifi = builder.hasWifi;
        this.operatingSystem = builder.operatingSystem;
    }

    toString() {
        return `Computer Configuration:
CPU: ${this.cpu}
RAM: ${this.ram}
Storage: ${this.storage}
GPU: ${this.gpu}
Bluetooth: ${this.hasBluetooth}
WiFi: ${this.hasWifi}
Operating System: ${this.operatingSystem}`;
    }
}

// Builder
class ComputerBuilder {
    constructor(cpu, ram, storage) {
        // Required parameters
        this.cpu = cpu;
        this.ram = ram;
        this.storage = storage;

        // Optional parameters with defaults
        this.gpu = 'Integrated Graphics';
        this.hasBluetooth = false;
        this.hasWifi = false;
        this.operatingSystem = 'Windows 10';
    }

    withGPU(gpu) {
        this.gpu = gpu;
        return this;
    }

    withBluetooth(hasBluetooth) {
        this.hasBluetooth = hasBluetooth;
        return this;
    }

    withWifi(hasWifi) {
        this.hasWifi = hasWifi;
        return this;
    }

    withOperatingSystem(operatingSystem) {
        this.operatingSystem = operatingSystem;
        return this;
    }

    build() {
        return new Computer(this);
    }
}

// Director
class ComputerDirector {
    buildGamingComputer() {
        return new ComputerBuilder(
            'Intel i9-13900K',
            '32GB DDR5',
            '2TB NVMe SSD'
        )
        .withGPU('NVIDIA RTX 4090')
        .withBluetooth(true)
        .withWifi(true)
        .withOperatingSystem('Windows 11')
        .build();
    }

    buildOfficeComputer() {
        return new ComputerBuilder(
            'Intel i5-12400',
            '16GB DDR4',
            '512GB SSD'
        )
        .withBluetooth(true)
        .withWifi(true)
        .build();
    }

    buildBudgetComputer() {
        return new ComputerBuilder(
            'AMD Ryzen 5 5600G',
            '8GB DDR4',
            '256GB SSD'
        )
        .withWifi(true)
        .build();
    }
}

// Example: Custom Computer Builder
class CustomComputerBuilder {
    constructor() {
        // Start with a basic configuration
        this.builder = new ComputerBuilder(
            'Intel i5-12400',
            '16GB DDR4',
            '512GB SSD'
        );
    }

    setCPU(cpu) {
        this.builder = new ComputerBuilder(cpu, this.builder.ram, this.builder.storage);
        return this;
    }

    setRAM(ram) {
        this.builder = new ComputerBuilder(this.builder.cpu, ram, this.builder.storage);
        return this;
    }

    setStorage(storage) {
        this.builder = new ComputerBuilder(this.builder.cpu, this.builder.ram, storage);
        return this;
    }

    addGPU(gpu) {
        this.builder.withGPU(gpu);
        return this;
    }

    addBluetooth() {
        this.builder.withBluetooth(true);
        return this;
    }

    addWifi() {
        this.builder.withWifi(true);
        return this;
    }

    setOS(os) {
        this.builder.withOperatingSystem(os);
        return this;
    }

    build() {
        return this.builder.build();
    }
}

// Alternative implementation using factory functions
const createComputerBuilder = (type) => {
    const builders = {
        gaming: () => new ComputerBuilder(
            'Intel i9-13900K',
            '32GB DDR5',
            '2TB NVMe SSD'
        )
        .withGPU('NVIDIA RTX 4090')
        .withBluetooth(true)
        .withWifi(true)
        .withOperatingSystem('Windows 11'),

        office: () => new ComputerBuilder(
            'Intel i5-12400',
            '16GB DDR4',
            '512GB SSD'
        )
        .withBluetooth(true)
        .withWifi(true),

        budget: () => new ComputerBuilder(
            'AMD Ryzen 5 5600G',
            '8GB DDR4',
            '256GB SSD'
        )
        .withWifi(true)
    };

    return builders[type] || (() => {
        throw new Error(`Unsupported computer type: ${type}`);
    });
};

// Test function to demonstrate the pattern
function testBuilderPattern() {
    console.log('Builder Pattern Demo\n');

    // Using the Director to build predefined computers
    const director = new ComputerDirector();

    console.log('1. Building a Gaming Computer:');
    const gamingPC = director.buildGamingComputer();
    console.log(gamingPC.toString());

    console.log('\n2. Building an Office Computer:');
    const officePC = director.buildOfficeComputer();
    console.log(officePC.toString());

    console.log('\n3. Building a Budget Computer:');
    const budgetPC = director.buildBudgetComputer();
    console.log(budgetPC.toString());

    // Using the Custom Builder
    console.log('\n4. Building a Custom Computer:');
    const customPC = new CustomComputerBuilder()
        .setCPU('AMD Ryzen 7 5800X')
        .setRAM('32GB DDR4')
        .setStorage('1TB NVMe SSD')
        .addGPU('NVIDIA RTX 3080')
        .addBluetooth()
        .addWifi()
        .setOS('Ubuntu 22.04')
        .build();
    console.log(customPC.toString());

    // Example of using the pattern in a real application
    console.log('\nReal Application Example:');
    console.log('Customer wants to build a computer...');
    
    // Simulate customer preferences
    const customerType = 'gaming'; // This could come from user input
    
    let customerPC;
    try {
        // Using the factory function approach
        console.log('\nUsing Factory Function:');
        const builder = createComputerBuilder(customerType)();
        customerPC = builder.build();
        console.log(`Building a ${customerType} computer for the customer:`);
        console.log(customerPC.toString());
    } catch (error) {
        // Fallback to director pattern
        console.log('\nUsing Director Pattern:');
        switch (customerType.toLowerCase()) {
            case 'gaming':
                customerPC = director.buildGamingComputer();
                console.log('Building a gaming computer for the customer:');
                break;
            case 'office':
                customerPC = director.buildOfficeComputer();
                console.log('Building an office computer for the customer:');
                break;
            case 'budget':
                customerPC = director.buildBudgetComputer();
                console.log('Building a budget computer for the customer:');
                break;
            default:
                console.log('Building a custom computer for the customer:');
                customerPC = new CustomComputerBuilder()
                    .setCPU('Intel i7-12700K')
                    .setRAM('16GB DDR4')
                    .setStorage('1TB SSD')
                    .addGPU('NVIDIA RTX 3060')
                    .addBluetooth()
                    .addWifi()
                    .build();
        }
        console.log(customerPC.toString());
    }
}

// Run the tests
testBuilderPattern(); 