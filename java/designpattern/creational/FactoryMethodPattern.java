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

// Product Interface
interface Document {
    void open();
    void close();
    void save();
    String getType();
}

// Concrete Products
class PDFDocument implements Document {
    @Override
    public void open() {
        System.out.println("Opening PDF document");
    }

    @Override
    public void close() {
        System.out.println("Closing PDF document");
    }

    @Override
    public void save() {
        System.out.println("Saving PDF document");
    }

    @Override
    public String getType() {
        return "PDF";
    }
}

class WordDocument implements Document {
    @Override
    public void open() {
        System.out.println("Opening Word document");
    }

    @Override
    public void close() {
        System.out.println("Closing Word document");
    }

    @Override
    public void save() {
        System.out.println("Saving Word document");
    }

    @Override
    public String getType() {
        return "Word";
    }
}

class TextDocument implements Document {
    @Override
    public void open() {
        System.out.println("Opening Text document");
    }

    @Override
    public void close() {
        System.out.println("Closing Text document");
    }

    @Override
    public void save() {
        System.out.println("Saving Text document");
    }

    @Override
    public String getType() {
        return "Text";
    }
}

// Creator Abstract Class
abstract class DocumentCreator {
    // Factory method
    protected abstract Document createDocument();

    // Template method
    public void processDocument() {
        Document doc = createDocument();
        System.out.println("Processing " + doc.getType() + " document:");
        doc.open();
        doc.save();
        doc.close();
    }
}

// Concrete Creators
class PDFDocumentCreator extends DocumentCreator {
    @Override
    protected Document createDocument() {
        return new PDFDocument();
    }
}

class WordDocumentCreator extends DocumentCreator {
    @Override
    protected Document createDocument() {
        return new WordDocument();
    }
}

class TextDocumentCreator extends DocumentCreator {
    @Override
    protected Document createDocument() {
        return new TextDocument();
    }
}

// Example: Document Management System
class DocumentManager {
    private DocumentCreator creator;

    public void setDocumentCreator(DocumentCreator creator) {
        this.creator = creator;
    }

    public void processDocument() {
        if (creator != null) {
            creator.processDocument();
        } else {
            System.out.println("No document creator set!");
        }
    }
}

public class FactoryMethodPattern {
    public static void main(String[] args) {
        System.out.println("Factory Method Pattern Demo\n");

        // Create document manager
        DocumentManager manager = new DocumentManager();

        // Process different types of documents
        System.out.println("Processing PDF Document:");
        manager.setDocumentCreator(new PDFDocumentCreator());
        manager.processDocument();

        System.out.println("\nProcessing Word Document:");
        manager.setDocumentCreator(new WordDocumentCreator());
        manager.processDocument();

        System.out.println("\nProcessing Text Document:");
        manager.setDocumentCreator(new TextDocumentCreator());
        manager.processDocument();

        // Example of using the pattern in a real application
        System.out.println("\nReal Application Example:");
        System.out.println("User wants to create a new document...");
        
        // Simulate user choice
        String userChoice = "PDF"; // This could come from user input
        
        DocumentCreator creator = null;
        switch (userChoice) {
            case "PDF":
                creator = new PDFDocumentCreator();
                break;
            case "Word":
                creator = new WordDocumentCreator();
                break;
            case "Text":
                creator = new TextDocumentCreator();
                break;
            default:
                System.out.println("Unsupported document type!");
                return;
        }

        manager.setDocumentCreator(creator);
        manager.processDocument();
    }
} 