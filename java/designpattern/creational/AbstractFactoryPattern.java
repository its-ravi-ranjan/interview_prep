/**
 * Abstract Factory Design Pattern
 * 
 * Intent: Provide an interface for creating families of related or dependent objects
 * without specifying their concrete classes.
 * 
 * Use cases:
 * 1. When a system should be independent of how its products are created, composed, and represented
 * 2. When a system should be configured with one of multiple families of products
 * 3. When a family of related product objects is designed to be used together
 * 
 * Components:
 * 1. Abstract Factory
 * 2. Concrete Factories
 * 3. Abstract Products
 * 4. Concrete Products
 */

// Abstract Products
interface Button {
    void render();
    void onClick();
}

interface TextBox {
    void render();
    void setText(String text);
    String getText();
}

interface CheckBox {
    void render();
    void setChecked(boolean checked);
    boolean isChecked();
}

// Concrete Products for Windows
class WindowsButton implements Button {
    @Override
    public void render() {
        System.out.println("Rendering Windows style button");
    }

    @Override
    public void onClick() {
        System.out.println("Windows button clicked");
    }
}

class WindowsTextBox implements TextBox {
    private String text = "";

    @Override
    public void render() {
        System.out.println("Rendering Windows style textbox");
    }

    @Override
    public void setText(String text) {
        this.text = text;
        System.out.println("Windows textbox text set to: " + text);
    }

    @Override
    public String getText() {
        return text;
    }
}

class WindowsCheckBox implements CheckBox {
    private boolean checked = false;

    @Override
    public void render() {
        System.out.println("Rendering Windows style checkbox");
    }

    @Override
    public void setChecked(boolean checked) {
        this.checked = checked;
        System.out.println("Windows checkbox " + (checked ? "checked" : "unchecked"));
    }

    @Override
    public boolean isChecked() {
        return checked;
    }
}

// Concrete Products for Mac
class MacButton implements Button {
    @Override
    public void render() {
        System.out.println("Rendering Mac style button");
    }

    @Override
    public void onClick() {
        System.out.println("Mac button clicked");
    }
}

class MacTextBox implements TextBox {
    private String text = "";

    @Override
    public void render() {
        System.out.println("Rendering Mac style textbox");
    }

    @Override
    public void setText(String text) {
        this.text = text;
        System.out.println("Mac textbox text set to: " + text);
    }

    @Override
    public String getText() {
        return text;
    }
}

class MacCheckBox implements CheckBox {
    private boolean checked = false;

    @Override
    public void render() {
        System.out.println("Rendering Mac style checkbox");
    }

    @Override
    public void setChecked(boolean checked) {
        this.checked = checked;
        System.out.println("Mac checkbox " + (checked ? "checked" : "unchecked"));
    }

    @Override
    public boolean isChecked() {
        return checked;
    }
}

// Abstract Factory
interface GUIFactory {
    Button createButton();
    TextBox createTextBox();
    CheckBox createCheckBox();
}

// Concrete Factories
class WindowsFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }

    @Override
    public TextBox createTextBox() {
        return new WindowsTextBox();
    }

    @Override
    public CheckBox createCheckBox() {
        return new WindowsCheckBox();
    }
}

class MacFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }

    @Override
    public TextBox createTextBox() {
        return new MacTextBox();
    }

    @Override
    public CheckBox createCheckBox() {
        return new MacCheckBox();
    }
}

// Client Application
class Application {
    private Button button;
    private TextBox textBox;
    private CheckBox checkBox;

    public Application(GUIFactory factory) {
        button = factory.createButton();
        textBox = factory.createTextBox();
        checkBox = factory.createCheckBox();
    }

    public void render() {
        System.out.println("\nRendering Application UI:");
        button.render();
        textBox.render();
        checkBox.render();
    }

    public void simulateUserInteraction() {
        System.out.println("\nSimulating User Interaction:");
        button.onClick();
        textBox.setText("Hello, World!");
        checkBox.setChecked(true);
    }
}

public class AbstractFactoryPattern {
    public static void main(String[] args) {
        System.out.println("Abstract Factory Pattern Demo\n");

        // Create Windows UI
        System.out.println("Creating Windows UI Application:");
        Application windowsApp = new Application(new WindowsFactory());
        windowsApp.render();
        windowsApp.simulateUserInteraction();

        // Create Mac UI
        System.out.println("\nCreating Mac UI Application:");
        Application macApp = new Application(new MacFactory());
        macApp.render();
        macApp.simulateUserInteraction();

        // Example of using the pattern in a real application
        System.out.println("\nReal Application Example:");
        System.out.println("Detecting operating system and creating appropriate UI...");
        
        // Simulate OS detection
        String os = System.getProperty("os.name").toLowerCase();
        GUIFactory factory;
        
        if (os.contains("windows")) {
            factory = new WindowsFactory();
            System.out.println("Windows OS detected, creating Windows UI");
        } else if (os.contains("mac")) {
            factory = new MacFactory();
            System.out.println("Mac OS detected, creating Mac UI");
        } else {
            // Default to Windows for other OS
            factory = new WindowsFactory();
            System.out.println("Unknown OS, defaulting to Windows UI");
        }

        Application app = new Application(factory);
        app.render();
        app.simulateUserInteraction();
    }
} 