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
 * 5. Thread pools
 * 
 * Implementation approaches:
 * 1. Eager initialization
 * 2. Lazy initialization with synchronization
 * 3. Double-checked locking
 * 4. Bill Pugh Singleton (Static inner class)
 * 5. Enum Singleton
 */

// 1. Eager Initialization Singleton
class EagerSingleton {
    // Private static instance created when class is loaded
    private static final EagerSingleton instance = new EagerSingleton();
    
    // Private constructor to prevent instantiation
    private EagerSingleton() {
        System.out.println("EagerSingleton instance created");
    }
    
    // Public method to get the instance
    public static EagerSingleton getInstance() {
        return instance;
    }
    
    public void doSomething() {
        System.out.println("EagerSingleton: Doing something...");
    }
}

// 2. Lazy Initialization Singleton with Synchronization
class LazySingleton {
    private static LazySingleton instance;
    
    private LazySingleton() {
        System.out.println("LazySingleton instance created");
    }
    
    // Synchronized method to prevent multiple threads from creating instances
    public static synchronized LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
    
    public void doSomething() {
        System.out.println("LazySingleton: Doing something...");
    }
}

// 3. Double-Checked Locking Singleton
class DoubleCheckedSingleton {
    // Volatile keyword ensures multiple threads handle the instance variable correctly
    private static volatile DoubleCheckedSingleton instance;
    
    private DoubleCheckedSingleton() {
        System.out.println("DoubleCheckedSingleton instance created");
    }
    
    public static DoubleCheckedSingleton getInstance() {
        if (instance == null) {
            synchronized (DoubleCheckedSingleton.class) {
                if (instance == null) {
                    instance = new DoubleCheckedSingleton();
                }
            }
        }
        return instance;
    }
    
    public void doSomething() {
        System.out.println("DoubleCheckedSingleton: Doing something...");
    }
}

// 4. Bill Pugh Singleton (Static Inner Class)
class BillPughSingleton {
    private BillPughSingleton() {
        System.out.println("BillPughSingleton instance created");
    }
    
    // Private inner class that holds the singleton instance
    private static class SingletonHelper {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }
    
    public static BillPughSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }
    
    public void doSomething() {
        System.out.println("BillPughSingleton: Doing something...");
    }
}

// 5. Enum Singleton (Thread-safe and serialization-safe)
enum EnumSingleton {
    INSTANCE;
    
    private EnumSingleton() {
        System.out.println("EnumSingleton instance created");
    }
    
    public void doSomething() {
        System.out.println("EnumSingleton: Doing something...");
    }
}

// Example usage with a Database Connection
class DatabaseConnection {
    private static DatabaseConnection instance;
    private String connectionString;
    
    private DatabaseConnection() {
        // Simulate database connection initialization
        this.connectionString = "jdbc:mysql://localhost:3306/mydb";
        System.out.println("Database connection established");
    }
    
    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
    
    public void query(String sql) {
        System.out.println("Executing query: " + sql);
    }
    
    public void close() {
        System.out.println("Closing database connection");
    }
}

public class SingletonPattern {
    public static void main(String[] args) {
        // Test all singleton implementations
        System.out.println("Testing Singleton Pattern Implementations\n");
        
        // 1. Eager Singleton
        System.out.println("1. Testing Eager Singleton:");
        EagerSingleton eager1 = EagerSingleton.getInstance();
        EagerSingleton eager2 = EagerSingleton.getInstance();
        System.out.println("Are instances same? " + (eager1 == eager2));
        eager1.doSomething();
        
        // 2. Lazy Singleton
        System.out.println("\n2. Testing Lazy Singleton:");
        LazySingleton lazy1 = LazySingleton.getInstance();
        LazySingleton lazy2 = LazySingleton.getInstance();
        System.out.println("Are instances same? " + (lazy1 == lazy2));
        lazy1.doSomething();
        
        // 3. Double-Checked Singleton
        System.out.println("\n3. Testing Double-Checked Singleton:");
        DoubleCheckedSingleton dcs1 = DoubleCheckedSingleton.getInstance();
        DoubleCheckedSingleton dcs2 = DoubleCheckedSingleton.getInstance();
        System.out.println("Are instances same? " + (dcs1 == dcs2));
        dcs1.doSomething();
        
        // 4. Bill Pugh Singleton
        System.out.println("\n4. Testing Bill Pugh Singleton:");
        BillPughSingleton bps1 = BillPughSingleton.getInstance();
        BillPughSingleton bps2 = BillPughSingleton.getInstance();
        System.out.println("Are instances same? " + (bps1 == bps2));
        bps1.doSomething();
        
        // 5. Enum Singleton
        System.out.println("\n5. Testing Enum Singleton:");
        EnumSingleton es1 = EnumSingleton.INSTANCE;
        EnumSingleton es2 = EnumSingleton.INSTANCE;
        System.out.println("Are instances same? " + (es1 == es2));
        es1.doSomething();
        
        // Practical Example: Database Connection
        System.out.println("\nTesting Database Connection Singleton:");
        DatabaseConnection db1 = DatabaseConnection.getInstance();
        DatabaseConnection db2 = DatabaseConnection.getInstance();
        System.out.println("Are database connections same? " + (db1 == db2));
        
        // Simulate database operations
        db1.query("SELECT * FROM users");
        db2.query("INSERT INTO users (name) VALUES ('John')");
        db1.close();
    }
} 