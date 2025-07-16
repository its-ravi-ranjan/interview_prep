/**
 * Singleton Pattern Example
 * 
 * Intent: Ensure a class has only one instance and provide a global point of access to it.
 * 
 * Real-world analogy: 
 * Think of a Vehicle Factory Manager. There should be only one manager
 * who oversees the entire manufacturing process and maintains the factory's state.
 */

const { Vehicle, Car, Motorcycle, Truck } = require('./VehicleTheme');

class VehicleFactoryManager {
    constructor() {
        if (VehicleFactoryManager.instance) {
            return VehicleFactoryManager.instance;
        }
        
        this.totalVehiclesProduced = 0;
        this.totalRevenue = 0.0;
        this.isFactoryOpen = false;
        
        VehicleFactoryManager.instance = this;
    }
    
    static getInstance() {
        if (!VehicleFactoryManager.instance) {
            VehicleFactoryManager.instance = new VehicleFactoryManager();
        }
        return VehicleFactoryManager.instance;
    }
    
    openFactory() {
        this.isFactoryOpen = true;
        console.log('Factory is now open for production');
    }
    
    closeFactory() {
        this.isFactoryOpen = false;
        console.log('Factory is now closed');
    }
    
    recordVehicleProduction(vehicle) {
        if (this.isFactoryOpen) {
            this.totalVehiclesProduced++;
            this.totalRevenue += vehicle.price;
            console.log('Recorded production of:', vehicle.model);
        } else {
            console.log('Cannot record production - Factory is closed');
        }
    }
    
    displayFactoryStatus() {
        console.log('\nFactory Status:');
        console.log('Total Vehicles Produced:', this.totalVehiclesProduced);
        console.log('Total Revenue: $' + this.totalRevenue);
        console.log('Factory Status:', this.isFactoryOpen ? 'Open' : 'Closed');
    }
}

// Test the pattern
function testSingleton() {
    console.log('Singleton Pattern Demo - Vehicle Factory Manager\n');
    
    // Get the factory manager instance
    const manager1 = VehicleFactoryManager.getInstance();
    const manager2 = VehicleFactoryManager.getInstance();
    
    // Verify that both references point to the same instance
    console.log('Are both managers the same instance?', manager1 === manager2);
    
    // Use the factory manager
    manager1.openFactory();
    
    // Create some vehicles
    const car = new Car('Sedan', 'Blue', 2024, 25000.0);
    const bike = new Motorcycle('Sport', 'Red', 2024, 15000.0);
    const truck = new Truck('Heavy', 'Black', 2024, 45000.0);
    
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

// Run the test
testSingleton(); 