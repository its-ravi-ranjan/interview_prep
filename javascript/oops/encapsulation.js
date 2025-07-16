/**
 * Encapsulation in JavaScript
 * 
 * Encapsulation is one of the four fundamental OOP concepts. It refers to the bundling of data (properties)
 * and methods (functions) that operate on that data into a single unit or object, and restricting direct
 * access to some of the object's components.
 * 
 * Key points about Encapsulation in JavaScript:
 * 1. Data hiding: Making properties private and providing public methods to access them
 * 2. Increased security: Prevents unauthorized access to data
 * 3. Better control: We can validate data before setting it
 * 4. Flexibility: We can change the internal implementation without affecting the code that uses the object
 * 
 * In JavaScript, encapsulation can be achieved through:
 * 1. Closures (Traditional way)
 * 2. Private class fields (ES2022+)
 * 3. Symbol
 * 4. WeakMap
 */

// Example 1: Using Closures (Traditional way)
console.log('Example 1: Encapsulation using Closures\n');

function createEmployee(name, age, salary) {
    // Private variables (encapsulated data)
    let _name = name;
    let _age = age;
    let _salary = salary;
    let _id = Math.floor(Math.random() * 1000);

    // Private method (encapsulated behavior)
    function validateAge(age) {
        return age > 0 && age < 150;
    }

    // Public methods (interface)
    return {
        // Getter methods
        getName() {
            return _name;
        },

        getAge() {
            return _age;
        },

        getSalary() {
            return _salary;
        },

        getId() {
            return _id;
        },

        // Setter methods with validation
        setName(name) {
            if (name && name.trim() !== '') {
                _name = name;
            } else {
                throw new Error('Name cannot be empty');
            }
        },

        setAge(age) {
            if (validateAge(age)) {
                _age = age;
            } else {
                throw new Error('Invalid age');
            }
        },

        setSalary(salary) {
            if (salary >= 0) {
                _salary = salary;
            } else {
                throw new Error('Salary cannot be negative');
            }
        }
    };
}

// Example 2: Using ES6 Classes with Private Fields (Modern way)
console.log('\nExample 2: Encapsulation using ES6 Classes with Private Fields\n');

class Employee {
    // Private fields (ES2022+)
    #name;
    #age;
    #salary;
    #id;

    constructor(name, age, salary) {
        this.#name = name;
        this.#age = age;
        this.#salary = salary;
        this.#id = Math.floor(Math.random() * 1000);
    }

    // Private method
    #validateAge(age) {
        return age > 0 && age < 150;
    }

    // Getter methods
    getName() {
        return this.#name;
    }

    getAge() {
        return this.#age;
    }

    getSalary() {
        return this.#salary;
    }

    getId() {
        return this.#id;
    }

    // Setter methods with validation
    setName(name) {
        if (name && name.trim() !== '') {
            this.#name = name;
        } else {
            throw new Error('Name cannot be empty');
        }
    }

    setAge(age) {
        if (this.#validateAge(age)) {
            this.#age = age;
        } else {
            throw new Error('Invalid age');
        }
    }

    setSalary(salary) {
        if (salary >= 0) {
            this.#salary = salary;
        } else {
            throw new Error('Salary cannot be negative');
        }
    }
}

// Example usage
console.log('Example Usage:\n');

// Using Closures
console.log('1. Using Closures:');
const employee1 = createEmployee('John Doe', 30, 50000);

// Accessing data through getters
console.log('Initial values:');
console.log('Name:', employee1.getName());
console.log('Age:', employee1.getAge());
console.log('Salary:', employee1.getSalary());
console.log('ID:', employee1.getId());

// Modifying data through setters
try {
    employee1.setName('Jane Doe');
    employee1.setAge(31);
    employee1.setSalary(55000);

    console.log('\nAfter updating:');
    console.log('Name:', employee1.getName());
    console.log('Age:', employee1.getAge());
    console.log('Salary:', employee1.getSalary());

    // Trying to set invalid data
    employee1.setAge(-5); // This will throw an error
} catch (error) {
    console.log('Error:', error.message);
}

// Using ES6 Classes
console.log('\n2. Using ES6 Classes with Private Fields:');
const employee2 = new Employee('Alice Smith', 25, 45000);

// Accessing data through getters
console.log('Initial values:');
console.log('Name:', employee2.getName());
console.log('Age:', employee2.getAge());
console.log('Salary:', employee2.getSalary());
console.log('ID:', employee2.getId());

// Modifying data through setters
try {
    employee2.setName('Alice Johnson');
    employee2.setAge(26);
    employee2.setSalary(48000);

    console.log('\nAfter updating:');
    console.log('Name:', employee2.getName());
    console.log('Age:', employee2.getAge());
    console.log('Salary:', employee2.getSalary());

    // Trying to set invalid data
    employee2.setSalary(-1000); // This will throw an error
} catch (error) {
    console.log('Error:', error.message);
}

/**
 * Benefits of Encapsulation in JavaScript:
 * 
 * 1. Data Hiding:
 *    - Private variables and methods are not accessible from outside
 *    - Prevents accidental modification of internal state
 * 
 * 2. Controlled Access:
 *    - Getter and setter methods provide controlled access to private data
 *    - Validation can be performed before modifying data
 * 
 * 3. Implementation Flexibility:
 *    - Internal implementation can be changed without affecting external code
 *    - Private methods can be modified or removed without breaking the interface
 * 
 * 4. Code Organization:
 *    - Related data and methods are grouped together
 *    - Makes the code more maintainable and easier to understand
 * 
 * 5. Security:
 *    - Sensitive data can be protected from unauthorized access
 *    - Business rules can be enforced through validation
 */ 