/**
 * Prototype Design Pattern
 * 
 * Intent: Specify the kinds of objects to create using a prototypical instance,
 * and create new objects by copying this prototype.
 * 
 * Use cases:
 * 1. When a system should be independent of how its products are created, composed, and represented
 * 2. When the classes to instantiate are specified at run-time
 * 3. When avoiding building a class hierarchy of factories that parallels the class hierarchy of products
 * 4. When instances of a class can have only a few different combinations of state
 * 
 * Components:
 * 1. Prototype (Interface/Abstract class)
 * 2. Concrete Prototypes
 * 3. Client
 */

import java.util.HashMap;
import java.util.Map;

// Prototype Interface
interface Shape extends Cloneable {
    Shape clone();
    void draw();
    void setX(int x);
    void setY(int y);
    int getX();
    int getY();
}

// Concrete Prototypes
class Rectangle implements Shape {
    private int x;
    private int y;
    private int width;
    private int height;
    private String color;

    public Rectangle() {
        this.width = 10;
        this.height = 5;
        this.color = "Red";
    }

    @Override
    public Shape clone() {
        try {
            return (Shape) super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }

    @Override
    public void draw() {
        System.out.println("Drawing Rectangle at (" + x + "," + y + 
            ") with width=" + width + ", height=" + height + 
            ", color=" + color);
    }

    @Override
    public void setX(int x) {
        this.x = x;
    }

    @Override
    public void setY(int y) {
        this.y = y;
    }

    @Override
    public int getX() {
        return x;
    }

    @Override
    public int getY() {
        return y;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public void setColor(String color) {
        this.color = color;
    }
}

class Circle implements Shape {
    private int x;
    private int y;
    private int radius;
    private String color;

    public Circle() {
        this.radius = 5;
        this.color = "Blue";
    }

    @Override
    public Shape clone() {
        try {
            return (Shape) super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }

    @Override
    public void draw() {
        System.out.println("Drawing Circle at (" + x + "," + y + 
            ") with radius=" + radius + ", color=" + color);
    }

    @Override
    public void setX(int x) {
        this.x = x;
    }

    @Override
    public void setY(int y) {
        this.y = y;
    }

    @Override
    public int getX() {
        return x;
    }

    @Override
    public int getY() {
        return y;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public void setColor(String color) {
        this.color = color;
    }
}

// Prototype Registry
class ShapeRegistry {
    private static Map<String, Shape> shapes = new HashMap<>();

    static {
        // Initialize with some default shapes
        shapes.put("rectangle", new Rectangle());
        shapes.put("circle", new Circle());
    }

    public static Shape getShape(String type) {
        Shape shape = shapes.get(type.toLowerCase());
        return shape != null ? shape.clone() : null;
    }

    public static void addShape(String type, Shape shape) {
        shapes.put(type.toLowerCase(), shape);
    }
}

// Example: Drawing Application
class DrawingApplication {
    private Map<String, Shape> shapes = new HashMap<>();

    public void addShape(String id, String type) {
        Shape shape = ShapeRegistry.getShape(type);
        if (shape != null) {
            shapes.put(id, shape);
        }
    }

    public void moveShape(String id, int x, int y) {
        Shape shape = shapes.get(id);
        if (shape != null) {
            shape.setX(x);
            shape.setY(y);
        }
    }

    public void drawAll() {
        System.out.println("\nDrawing all shapes:");
        for (Shape shape : shapes.values()) {
            shape.draw();
        }
    }
}

public class PrototypePattern {
    public static void main(String[] args) {
        System.out.println("Prototype Pattern Demo\n");

        // Basic cloning example
        System.out.println("1. Basic Cloning Example:");
        Rectangle originalRect = new Rectangle();
        originalRect.setX(10);
        originalRect.setY(20);
        originalRect.setColor("Green");

        Rectangle clonedRect = (Rectangle) originalRect.clone();
        clonedRect.setX(30);
        clonedRect.setY(40);

        System.out.println("Original Rectangle:");
        originalRect.draw();
        System.out.println("Cloned Rectangle:");
        clonedRect.draw();

        // Using the Shape Registry
        System.out.println("\n2. Using Shape Registry:");
        Shape circle1 = ShapeRegistry.getShape("circle");
        Shape circle2 = ShapeRegistry.getShape("circle");
        Shape rectangle1 = ShapeRegistry.getShape("rectangle");

        circle1.setX(5);
        circle1.setY(5);
        circle2.setX(15);
        circle2.setY(15);
        rectangle1.setX(25);
        rectangle1.setY(25);

        System.out.println("Circle 1:");
        circle1.draw();
        System.out.println("Circle 2:");
        circle2.draw();
        System.out.println("Rectangle 1:");
        rectangle1.draw();

        // Example: Drawing Application
        System.out.println("\n3. Drawing Application Example:");
        DrawingApplication app = new DrawingApplication();

        // Add some shapes
        app.addShape("rect1", "rectangle");
        app.addShape("circle1", "circle");
        app.addShape("rect2", "rectangle");

        // Move shapes around
        app.moveShape("rect1", 10, 10);
        app.moveShape("circle1", 20, 20);
        app.moveShape("rect2", 30, 30);

        // Draw all shapes
        app.drawAll();

        // Example of using the pattern in a real application
        System.out.println("\nReal Application Example:");
        System.out.println("User wants to create a new shape...");
        
        // Simulate user input
        String shapeType = "circle"; // This could come from user input
        String shapeId = "newShape";
        
        // Create and customize the shape
        Shape newShape = ShapeRegistry.getShape(shapeType);
        if (newShape != null) {
            if (newShape instanceof Circle) {
                ((Circle) newShape).setRadius(8);
                ((Circle) newShape).setColor("Purple");
            } else if (newShape instanceof Rectangle) {
                ((Rectangle) newShape).setWidth(15);
                ((Rectangle) newShape).setHeight(10);
                ((Rectangle) newShape).setColor("Orange");
            }
            
            newShape.setX(50);
            newShape.setY(50);
            
            System.out.println("Created new " + shapeType + ":");
            newShape.draw();
            
            // Add to registry for future use
            ShapeRegistry.addShape("custom_" + shapeType, newShape);
            System.out.println("Added to shape registry as 'custom_" + shapeType + "'");
        }
    }
} 