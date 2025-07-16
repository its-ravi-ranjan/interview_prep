/**
 * Abstraction in JavaScript
 * 
 * Abstraction is a process of hiding the implementation details and showing only the functionality
 * to the user. In JavaScript, abstraction can be achieved through various mechanisms.
 * 
 * Key points about Abstraction in JavaScript:
 * 1. Hides implementation details
 * 2. Shows only essential features
 * 3. Achieves security by hiding certain details
 * 4. Helps in reducing complexity
 * 
 * In JavaScript, abstraction can be achieved through:
 * 1. Abstract Classes (using ES6 classes)
 * 2. Interfaces (using TypeScript or JSDoc)
 * 3. Closures
 * 4. Modules
 */

// Key Differences:
// 1. Abstract Class:
// ✅ Has constructor - can initialize properties
// ✅ Can have concrete methods (with implementation)
// ✅ Can have abstract methods (throw errors)
// ✅ Can store state (properties)
// 2. Interface:
// ❌ No constructor - just method contracts
// ❌ Only method signatures (no implementation)
// ❌ No state/properties - just behavior contracts
// ❌ Pure contract definition

// Example 1: Abstraction using Abstract Classes
console.log('Example 1: Abstraction using Abstract Classes\n');

// Abstract class using ES6
class AbstractVehicle {
    constructor(brand, model, year) {
        if (this.constructor === AbstractVehicle) {
            throw new Error('Cannot instantiate abstract class');
        }
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    // Abstract method (must be implemented by subclasses)
    start() {
        throw new Error('Method start() must be implemented');
    }

    // Abstract method (must be implemented by subclasses)
    stop() {
        throw new Error('Method stop() must be implemented');
    }

    // Concrete method (can be used by subclasses)
    displayInfo() {
        console.log(`Brand: ${this.brand}`);
        console.log(`Model: ${this.model}`);
        console.log(`Year: ${this.year}`);
    }
}

// Concrete class implementing the abstract class
class ElectricCar extends AbstractVehicle {
    constructor(brand, model, year, batteryCapacity) {
        super(brand, model, year);
        this.batteryCapacity = batteryCapacity;
        this.batteryLevel = 0;
    }

    // Implementing abstract methods
    start() {
        console.log('Starting electric car...');
        console.log(`Battery level: ${this.batteryLevel}%`);
    }

    stop() {
        console.log('Stopping electric car...');
    }

    // Additional methods specific to ElectricCar
    charge() {
        console.log('Charging the electric car...');
        this.batteryLevel = 100;
    }

    getBatteryLevel() {
        return this.batteryLevel;
    }
}

// Example 2: Abstraction using Closures
console.log('\nExample 2: Abstraction using Closures\n');

function createBankAccount(initialBalance) {
    // Private variables (hidden implementation details)
    let balance = initialBalance;
    let transactionHistory = [];
    let accountNumber = Math.floor(Math.random() * 1000000);

    // Private methods (hidden implementation details)
    function validateAmount(amount) {
        return amount > 0;
    }

    function logTransaction(type, amount) {
        transactionHistory.push({
            type,
            amount,
            timestamp: new Date(),
            balance: balance
        });
    }

    // Public methods (interface)
    return {
        deposit(amount) {
            if (validateAmount(amount)) {
                balance += amount;
                logTransaction('deposit', amount);
                return true;
            }
            return false;
        },

        withdraw(amount) {
            if (validateAmount(amount) && amount <= balance) {
                balance -= amount;
                logTransaction('withdraw', amount);
                return true;
            }
            return false;
        },

        getBalance() {
            return balance;
        },

        getAccountNumber() {
            return accountNumber;
        },

        getTransactionHistory() {
            return [...transactionHistory]; // Return a copy to maintain encapsulation
        }
    };
}

// Example 3: Abstraction using Modules
console.log('\nExample 3: Abstraction using Modules\n');

const VehicleModule = (function() {
    // Private members (hidden implementation details)
    const VEHICLE_TYPES = {
        ELECTRIC: 'electric',
        GASOLINE: 'gasoline',
        HYBRID: 'hybrid'
    };

    // Private class (hidden implementation details)
    class Vehicle {
        constructor(type, brand, model) {
            this.type = type;
            this.brand = brand;
            this.model = model;
        }
    }

    // Public API (interface)
    return {
        createVehicle(type, brand, model) {
            if (!Object.values(VEHICLE_TYPES).includes(type)) {
                throw new Error('Invalid vehicle type');
            }
            return new Vehicle(type, brand, model);
        },

        getVehicleTypes() {
            return { ...VEHICLE_TYPES }; // Return a copy
        }
    };
})();

// Example 4: Abstraction using Interface
console.log('\nExample 4: Abstraction using Interface\n');

// Interface definition (contract)
class PaymentInterface {
    processPayment(amount) {
        throw new Error('Method must be implemented');
    }
}

// Implementation 1
class CreditCardPayment extends PaymentInterface {
    processPayment(amount) {
        console.log(`Processing credit card payment: $${amount}`);
        return { success: true, method: 'credit_card' };
    }
}

// Implementation 2
class PayPalPayment extends PaymentInterface {
    processPayment(amount) {
        console.log(`Processing PayPal payment: $${amount}`);
        return { success: true, method: 'paypal' };
    }
}

// Service using interface (abstraction)
class PaymentService {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    pay(amount) {
        return this.paymentMethod.processPayment(amount);
    }
}

// Example usage
console.log('Example Usage:\n');

// Abstract Classes
console.log('1. Abstract Classes Usage:');
try {
    // This will throw an error
    // const vehicle = new AbstractVehicle('Toyota', 'Camry', 2023);
} catch (error) {
    console.log('Error:', error.message);
}

const tesla = new ElectricCar('Tesla', 'Model 3', 2023, 75);
console.log('Electric Car Information:');
tesla.displayInfo();
tesla.start();
tesla.charge();
console.log('Battery Level:', tesla.getBatteryLevel());
tesla.stop();

// Closures
console.log('\n2. Closures Usage:');
const account = createBankAccount(1000);
console.log('Initial balance:', account.getBalance());

account.deposit(500);
console.log('After deposit:', account.getBalance());

account.withdraw(200);
console.log('After withdrawal:', account.getBalance());

console.log('Transaction history:', account.getTransactionHistory());

// Modules
console.log('\n3. Module Usage:');
const vehicle = VehicleModule.createVehicle('electric', 'Tesla', 'Model S');
console.log('Vehicle types:', VehicleModule.getVehicleTypes());
console.log('Created vehicle:', vehicle);

// Interface Usage
console.log('\n4. Interface Usage:');
const creditCard = new CreditCardPayment();
const paypal = new PayPalPayment();

const creditCardService = new PaymentService(creditCard);
const paypalService = new PaymentService(paypal);

creditCardService.pay(100);
paypalService.pay(50);

/**
 * Benefits of Abstraction in JavaScript:
 * 
 * 1. Implementation Hiding:
 *    - Internal details are hidden from the user
 *    - Only essential features are exposed
 * 
 * 2. Security:
 *    - Sensitive data and methods can be protected
 *    - Access to internal state is controlled
 * 
 * 3. Code Organization:
 *    - Clear separation between interface and implementation
 *    - Better code structure and maintainability
 * 
 * 4. Flexibility:
 *    - Implementation can be changed without affecting the interface
 *    - New features can be added without breaking existing code
 * 
 * 5. Complexity Reduction:
 *    - Users only need to know the interface
 *    - Implementation details are abstracted away
 * 
 * Best Practices:
 * 1. Use abstract classes for common behavior
 * 2. Keep interfaces simple and focused
 * 3. Hide implementation details using closures or modules
 * 4. Document the public interface clearly
 * 5. Use TypeScript or JSDoc for better interface documentation
 */ 