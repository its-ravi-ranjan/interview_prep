/**
 * Simple Prototype Pattern Example
 * 
 * Intent: Create new objects by cloning an existing object, known as the prototype.
 * 
 * Real-world analogy: 
 * Think of a resume template. Instead of creating a new resume from scratch,
 * you take an existing template, make a copy, and modify it for your needs.
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

// Prototype
class Resume implements Cloneable {
    private String name;
    private String email;
    private String phone;
    private String[] skills;

    public Resume() {
        // Default template
        this.skills = new String[]{"Java", "Python", "SQL"};
    }

    public void setPersonalInfo(String name, String email, String phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public void setSkills(String[] skills) {
        this.skills = skills;
    }

    @Override
    public Resume clone() {
        try {
            return (Resume) super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }

    public void display() {
        System.out.println("\nResume:");
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Phone: " + phone);
        System.out.println("Skills: " + String.join(", ", skills));
    }
}

public class SimplePrototypePattern {
    public static void main(String[] args) {
        System.out.println("Simple Prototype Pattern Demo\n");

        // Create a template resume
        Resume templateResume = new Resume();
        templateResume.setPersonalInfo("John Doe", "john@example.com", "123-456-7890");
        System.out.println("Template Resume Created");

        // Clone the template for a new candidate
        Resume aliceResume = templateResume.clone();
        aliceResume.setPersonalInfo("Alice Smith", "alice@example.com", "987-654-3210");
        aliceResume.setSkills(new String[]{"Java", "JavaScript", "React"});

        // Clone the template for another candidate
        Resume bobResume = templateResume.clone();
        bobResume.setPersonalInfo("Bob Johnson", "bob@example.com", "555-555-5555");
        bobResume.setSkills(new String[]{"Python", "Machine Learning", "Data Science"});

        // Display all resumes
        System.out.println("\nOriginal Template:");
        templateResume.display();

        System.out.println("\nAlice's Resume:");
        aliceResume.display();

        System.out.println("\nBob's Resume:");
        bobResume.display();
    }
} 