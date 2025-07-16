/**
 * Inheritance in Java
 * 
 * Inheritance is a mechanism that allows a class to inherit properties and methods from another class.
 * The class that inherits is called the subclass (child class), and the class being inherited from is
 * called the superclass (parent class).
 * 
 * Key points about Inheritance:
 * 1. Code reusability: Subclasses can reuse code from their superclass
 * 2. Method overriding: Subclasses can override methods from the superclass
 * 3. Single inheritance: Java supports single inheritance (a class can only extend one class)
 * 4. Multiple inheritance through interfaces: A class can implement multiple interfaces
 */

// Base class (Parent class)
class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Common method for all animals
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }

    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// Derived class (Child class) - Dog inherits from Animal
class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age); // Call to parent class constructor
        this.breed = breed;
    }

    // Method overriding - Dog's specific implementation
    @Override
    public void makeSound() {
        System.out.println("Woof! Woof!");
    }

    // Additional method specific to Dog
    public void fetch() {
        System.out.println(name + " is fetching the ball");
    }

    @Override
    public void displayInfo() {
        super.displayInfo(); // Call parent class method
        System.out.println("Breed: " + breed);
    }
}

// Another derived class - Cat inherits from Animal
class Cat extends Animal {
    private boolean isIndoor;

    public Cat(String name, int age, boolean isIndoor) {
        super(name, age);
        this.isIndoor = isIndoor;
    }

    @Override
    public void makeSound() {
        System.out.println("Meow! Meow!");
    }

    // Additional method specific to Cat
    public void scratch() {
        System.out.println(name + " is scratching");
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Indoor cat: " + isIndoor);
    }
}

// Main class to demonstrate inheritance
public class Inheritance {
    public static void main(String[] args) {
        // Creating instances of derived classes
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        Cat cat = new Cat("Whiskers", 2, true);

        // Using inherited methods
        System.out.println("Dog Information:");
        dog.displayInfo();
        dog.makeSound();
        dog.fetch();

        System.out.println("\nCat Information:");
        cat.displayInfo();
        cat.makeSound();
        cat.scratch();

        // Polymorphism example
        System.out.println("\nPolymorphism Example:");
        Animal[] animals = new Animal[2];
        animals[0] = dog;  // Dog is an Animal
        animals[1] = cat;  // Cat is an Animal

        for (Animal animal : animals) {
            animal.makeSound(); // Calls the appropriate overridden method
        }
    }
} 