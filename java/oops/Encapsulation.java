/**
 * Encapsulation in Java
 * 
 * Encapsulation is one of the four fundamental OOP concepts. It refers to the bundling of data (attributes)
 * and methods (functions) that operate on that data into a single unit or class, and restricting direct
 * access to some of the object's components.
 * 
 * Key points about Encapsulation:
 * 1. Data hiding: Making the fields private and providing public methods to access them
 * 2. Increased security: Prevents unauthorized access to data
 * 3. Better control: We can validate data before setting it
 * 4. Flexibility: We can change the internal implementation without affecting the code that uses the class
 */

public class Encapsulation {
    // Private fields - data hiding
    private String name;
    private int age;
    private double salary;

    // Constructor
    public Encapsulation(String name, int age, double salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    // Getter methods - provide controlled access to private fields
    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public double getSalary() {
        return salary;
    }

    // Setter methods - provide controlled way to modify private fields
    public void setName(String name) {
        // Validation can be added here
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        } else {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
    }

    public void setAge(int age) {
        // Validation for age
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            throw new IllegalArgumentException("Age must be between 1 and 150");
        }
    }

    public void setSalary(double salary) {
        // Validation for salary
        if (salary >= 0) {
            this.salary = salary;
        } else {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
    }

    // Example usage
    public static void main(String[] args) {
        // Creating an instance of the class
        Encapsulation employee = new Encapsulation("John Doe", 30, 50000.0);

        // Accessing data through getters
        System.out.println("Name: " + employee.getName());
        System.out.println("Age: " + employee.getAge());
        System.out.println("Salary: " + employee.getSalary());

        // Modifying data through setters
        try {
            employee.setName("Jane Doe");
            employee.setAge(31);
            employee.setSalary(55000.0);

            // Trying to set invalid data
            employee.setAge(-5); // This will throw an exception
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
} 