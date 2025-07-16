/**
 * Polymorphism in Java
 * 
 * Polymorphism is the ability of an object to take many forms. It allows us to perform a single action
 * in different ways. In Java, polymorphism is mainly divided into two types:
 * 
 * 1. Compile-time Polymorphism (Method Overloading)
 *    - Multiple methods with the same name but different parameters
 *    - Resolved during compilation
 * 
 * 2. Runtime Polymorphism (Method Overriding)
 *    - Method in child class overrides the method in parent class
 *    - Resolved during runtime
 * 
 * Key points about Polymorphism:
 * 1. Method Overloading: Same method name, different parameters
 * 2. Method Overriding: Same method signature in parent and child class
 * 3. Dynamic Method Dispatch: Method call is resolved at runtime
 * 4. Upcasting: Reference of parent class can refer to child class object
 */

// Base class
class Shape {
    // Common method for all shapes
    public double calculateArea() {
        return 0.0;
    }

    public void display() {
        System.out.println("This is a shape");
    }
}

// Derived class - Circle
class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    // Method overriding
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }

    // Method overloading
    public double calculateArea(String unit) {
        double area = calculateArea();
        if (unit.equalsIgnoreCase("cm")) {
            return area * 100; // Convert to square centimeters
        }
        return area;
    }

    @Override
    public void display() {
        System.out.println("This is a circle with radius: " + radius);
    }
}

// Derived class - Rectangle
class Rectangle extends Shape {
    private double length;
    private double width;

    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    @Override
    public double calculateArea() {
        return length * width;
    }

    // Method overloading
    public double calculateArea(boolean isSquare) {
        if (isSquare) {
            System.out.println("This is a square!");
        }
        return calculateArea();
    }

    @Override
    public void display() {
        System.out.println("This is a rectangle with length: " + length + " and width: " + width);
    }
}

// Main class to demonstrate polymorphism
public class Polymorphism {
    public static void main(String[] args) {
        // Runtime Polymorphism (Method Overriding) Example
        System.out.println("Runtime Polymorphism Example:");
        Shape shape1 = new Circle(5.0);  // Upcasting
        Shape shape2 = new Rectangle(4.0, 6.0);  // Upcasting

        // Dynamic method dispatch
        shape1.display();  // Calls Circle's display method
        System.out.println("Circle Area: " + shape1.calculateArea());

        shape2.display();  // Calls Rectangle's display method
        System.out.println("Rectangle Area: " + shape2.calculateArea());

        // Compile-time Polymorphism (Method Overloading) Example
        System.out.println("\nCompile-time Polymorphism Example:");
        Circle circle = new Circle(5.0);
        Rectangle rectangle = new Rectangle(4.0, 4.0);

        // Different ways to call calculateArea
        System.out.println("Circle Area (default): " + circle.calculateArea());
        System.out.println("Circle Area (in cm): " + circle.calculateArea("cm"));

        System.out.println("Rectangle Area (default): " + rectangle.calculateArea());
        System.out.println("Rectangle Area (as square): " + rectangle.calculateArea(true));

        // Array of shapes demonstrating polymorphism
        System.out.println("\nPolymorphic Array Example:");
        Shape[] shapes = new Shape[3];
        shapes[0] = new Circle(3.0);
        shapes[1] = new Rectangle(4.0, 5.0);
        shapes[2] = new Circle(2.0);

        for (Shape shape : shapes) {
            shape.display();
            System.out.println("Area: " + shape.calculateArea());
            System.out.println();
        }
    }
} 