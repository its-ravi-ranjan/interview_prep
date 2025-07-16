/**
 * Simple Prototype Pattern Example
 * 
 * Intent: Create new objects by cloning an existing object, known as the prototype.
 * 
 * Real-world analogy: 
 * Think of a resume template. Instead of creating a new resume from scratch,
 * you take an existing template, make a copy, and modify it for your needs.
 */

// Prototype
class Resume {
    constructor() {
        // Default template
        this.skills = ['JavaScript', 'HTML', 'CSS'];
    }

    setPersonalInfo(name, email, phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    setSkills(skills) {
        this.skills = skills;
    }

    clone() {
        // Create a new object with the same prototype
        const clone = Object.create(Object.getPrototypeOf(this));
        // Copy all properties
        return Object.assign(clone, this);
    }

    display() {
        console.log('\nResume:');
        console.log('Name:', this.name);
        console.log('Email:', this.email);
        console.log('Phone:', this.phone);
        console.log('Skills:', this.skills.join(', '));
    }
}

// Test the pattern
function testSimplePrototype() {
    console.log('Simple Prototype Pattern Demo\n');

    // Create a template resume
    const templateResume = new Resume();
    templateResume.setPersonalInfo('John Doe', 'john@example.com', '123-456-7890');
    console.log('Template Resume Created');

    // Clone the template for a new candidate
    const aliceResume = templateResume.clone();
    aliceResume.setPersonalInfo('Alice Smith', 'alice@example.com', '987-654-3210');
    aliceResume.setSkills(['JavaScript', 'React', 'Node.js']);

    // Clone the template for another candidate
    const bobResume = templateResume.clone();
    bobResume.setPersonalInfo('Bob Johnson', 'bob@example.com', '555-555-5555');
    bobResume.setSkills(['Python', 'Django', 'Data Analysis']);

    // Display all resumes
    console.log('\nOriginal Template:');
    templateResume.display();

    console.log('\nAlice\'s Resume:');
    aliceResume.display();

    console.log('\nBob\'s Resume:');
    bobResume.display();
}

// Run the test
testSimplePrototype(); 