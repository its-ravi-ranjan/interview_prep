/**
 * Factory Method Design Pattern
 * 
 * Intent: Define an interface for creating an object, but let subclasses decide which class to instantiate.
 * Factory Method lets a class defer instantiation to subclasses.
 * 
 * Use cases:
 * 1. When a class can't anticipate the class of objects it must create
 * 2. When a class wants its subclasses to specify the objects it creates
 * 3. When you want to localize the knowledge of which class gets created
 * 
 * Components:
 * 1. Product (Interface/Abstract class)
 * 2. Concrete Products
 * 3. Creator (Interface/Abstract class)
 * 4. Concrete Creators
 */

// Product Interface (using class with abstract methods)
class Document {
    open() {
        throw new Error('Method open() must be implemented');
    }

    close() {
        throw new Error('Method close() must be implemented');
    }

    save() {
        throw new Error('Method save() must be implemented');
    }

    getType() {
        throw new Error('Method getType() must be implemented');
    }
}

// Concrete Products
class PDFDocument extends Document {
    open() {
        console.log('Opening PDF document');
    }

    close() {
        console.log('Closing PDF document');
    }

    save() {
        console.log('Saving PDF document');
    }

    getType() {
        return 'PDF';
    }
}

class WordDocument extends Document {
    open() {
        console.log('Opening Word document');
    }

    close() {
        console.log('Closing Word document');
    }

    save() {
        console.log('Saving Word document');
    }

    getType() {
        return 'Word';
    }
}

class TextDocument extends Document {
    open() {
        console.log('Opening Text document');
    }

    close() {
        console.log('Closing Text document');
    }

    save() {
        console.log('Saving Text document');
    }

    getType() {
        return 'Text';
    }
}

// Creator Abstract Class
class DocumentCreator {
    // Factory method
    createDocument() {
        throw new Error('Method createDocument() must be implemented');
    }

    // Template method
    processDocument() {
        const doc = this.createDocument();
        console.log(`Processing ${doc.getType()} document:`);
        doc.open();
        doc.save();
        doc.close();
    }
}

// Concrete Creators
class PDFDocumentCreator extends DocumentCreator {
    createDocument() {
        return new PDFDocument();
    }
}

class WordDocumentCreator extends DocumentCreator {
    createDocument() {
        return new WordDocument();
    }
}

class TextDocumentCreator extends DocumentCreator {
    createDocument() {
        return new TextDocument();
    }
}

// Example: Document Management System
class DocumentManager {
    constructor() {
        this.creator = null;
    }

    setDocumentCreator(creator) {
        this.creator = creator;
    }

    processDocument() {
        if (this.creator) {
            this.creator.processDocument();
        } else {
            console.log('No document creator set!');
        }
    }
}

// Alternative implementation using factory functions
const createDocumentFactory = (type) => {
    const creators = {
        PDF: () => new PDFDocument(),
        Word: () => new WordDocument(),
        Text: () => new TextDocument()
    };

    return creators[type] || (() => {
        throw new Error(`Unsupported document type: ${type}`);
    });
};

// Test function to demonstrate the pattern
function testFactoryMethodPattern() {
    console.log('Factory Method Pattern Demo\n');

    // Create document manager
    const manager = new DocumentManager();

    // Process different types of documents
    console.log('Processing PDF Document:');
    manager.setDocumentCreator(new PDFDocumentCreator());
    manager.processDocument();

    console.log('\nProcessing Word Document:');
    manager.setDocumentCreator(new WordDocumentCreator());
    manager.processDocument();

    console.log('\nProcessing Text Document:');
    manager.setDocumentCreator(new TextDocumentCreator());
    manager.processDocument();

    // Example of using the pattern in a real application
    console.log('\nReal Application Example:');
    console.log('User wants to create a new document...');
    
    // Simulate user choice
    const userChoice = 'PDF'; // This could come from user input
    
    // Using the factory function approach
    console.log('\nUsing Factory Function:');
    try {
        const document = createDocumentFactory(userChoice)();
        console.log(`Created ${document.getType()} document`);
        document.open();
        document.save();
        document.close();
    } catch (error) {
        console.error(error.message);
    }

    // Using the class-based approach
    console.log('\nUsing Class-based Factory:');
    let creator = null;
    switch (userChoice) {
        case 'PDF':
            creator = new PDFDocumentCreator();
            break;
        case 'Word':
            creator = new WordDocumentCreator();
            break;
        case 'Text':
            creator = new TextDocumentCreator();
            break;
        default:
            console.log('Unsupported document type!');
            return;
    }

    manager.setDocumentCreator(creator);
    manager.processDocument();
}

// Run the tests
testFactoryMethodPattern(); 