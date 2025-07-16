/**
 * Singleton Design Pattern
 * 
 * Intent: Ensure a class has only one instance and provide a global point of access to it.
 * 
 * Use cases:
 * 1. Database connections
 * 2. Configuration settings
 * 3. Logger instances
 * 4. Cache managers
 * 5. State management
 * 
 * Implementation approaches:
 * 1. Object literal
 * 2. Constructor function
 * 3. ES6 Class with static instance
 * 4. Module pattern
 * 5. ES6 Module (export default)
 */

// 1. Object Literal Singleton
const ObjectLiteralSingleton = {
    instance: null,
    getInstance() {
        if (!this.instance) {
            this.instance = {
                doSomething() {
                    console.log('ObjectLiteralSingleton: Doing something...');
                }
            };
            console.log('ObjectLiteralSingleton instance created');
        }
        return this.instance;
    }
};

// 2. Constructor Function Singleton
function ConstructorSingleton() {
    // Check if instance exists
    if (ConstructorSingleton.instance) {
        return ConstructorSingleton.instance;
    }

    // Private variables and methods
    const privateVar = 'private data';

    // Public methods
    this.doSomething = function() {
        console.log('ConstructorSingleton: Doing something...');
        console.log('Accessing private variable:', privateVar);
    };

    // Store the instance
    ConstructorSingleton.instance = this;
    console.log('ConstructorSingleton instance created');
}

// 3. ES6 Class Singleton
class ClassSingleton {
    static instance = null;

    constructor() {
        if (ClassSingleton.instance) {
            return ClassSingleton.instance;
        }
        console.log('ClassSingleton instance created');
        ClassSingleton.instance = this;
    }

    doSomething() {
        console.log('ClassSingleton: Doing something...');
    }

    static getInstance() {
        if (!ClassSingleton.instance) {
            ClassSingleton.instance = new ClassSingleton();
        }
        return ClassSingleton.instance;
    }
}

// 4. Module Pattern Singleton
const ModuleSingleton = (function() {
    // Private variables and methods
    let instance = null;
    const privateVar = 'private data';

    function createInstance() {
        return {
            doSomething() {
                console.log('ModuleSingleton: Doing something...');
                console.log('Accessing private variable:', privateVar);
            }
        };
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
                console.log('ModuleSingleton instance created');
            }
            return instance;
        }
    };
})();

// 5. ES6 Module Singleton (export default)
// This would be in a separate file, but shown here for completeness
const ES6ModuleSingleton = {
    instance: null,
    getInstance() {
        if (!this.instance) {
            this.instance = {
                doSomething() {
                    console.log('ES6ModuleSingleton: Doing something...');
                }
            };
            console.log('ES6ModuleSingleton instance created');
        }
        return this.instance;
    }
};

// Example usage with a Database Connection
class DatabaseConnection {
    static instance = null;
    #connectionString;

    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        this.#connectionString = 'mysql://localhost:3306/mydb';
        console.log('Database connection established');
        DatabaseConnection.instance = this;
    }

    query(sql) {
        console.log(`Executing query: ${sql}`);
    }

    close() {
        console.log('Closing database connection');
    }

    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
}

// Test function to demonstrate all singleton implementations
function testSingletonPattern() {
    console.log('Testing Singleton Pattern Implementations\n');

    // 1. Object Literal Singleton
    console.log('1. Testing Object Literal Singleton:');
    const obj1 = ObjectLiteralSingleton.getInstance();
    const obj2 = ObjectLiteralSingleton.getInstance();
    console.log('Are instances same?', obj1 === obj2);
    obj1.doSomething();

    // 2. Constructor Singleton
    console.log('\n2. Testing Constructor Singleton:');
    const cons1 = new ConstructorSingleton();
    const cons2 = new ConstructorSingleton();
    console.log('Are instances same?', cons1 === cons2);
    cons1.doSomething();

    // 3. Class Singleton
    console.log('\n3. Testing Class Singleton:');
    const class1 = ClassSingleton.getInstance();
    const class2 = ClassSingleton.getInstance();
    console.log('Are instances same?', class1 === class2);
    class1.doSomething();

    // 4. Module Pattern Singleton
    console.log('\n4. Testing Module Pattern Singleton:');
    const mod1 = ModuleSingleton.getInstance();
    const mod2 = ModuleSingleton.getInstance();
    console.log('Are instances same?', mod1 === mod2);
    mod1.doSomething();

    // 5. ES6 Module Singleton
    console.log('\n5. Testing ES6 Module Singleton:');
    const es61 = ES6ModuleSingleton.getInstance();
    const es62 = ES6ModuleSingleton.getInstance();
    console.log('Are instances same?', es61 === es62);
    es61.doSomething();

    // Practical Example: Database Connection
    console.log('\nTesting Database Connection Singleton:');
    const db1 = DatabaseConnection.getInstance();
    const db2 = DatabaseConnection.getInstance();
    console.log('Are database connections same?', db1 === db2);

    // Simulate database operations
    db1.query('SELECT * FROM users');
    db2.query('INSERT INTO users (name) VALUES ("John")');
    db1.close();
}

// Run the tests
testSingletonPattern(); 