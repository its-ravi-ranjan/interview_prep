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

// Abstract Products (using classes with abstract methods)
class Button {
    render() {
        throw new Error('Method render() must be implemented');
    }

    onClick() {
        throw new Error('Method onClick() must be implemented');
    }
}

class TextBox {
    render() {
        throw new Error('Method render() must be implemented');
    }

    setText(text) {
        throw new Error('Method setText() must be implemented');
    }

    getText() {
        throw new Error('Method getText() must be implemented');
    }
}

class CheckBox {
    render() {
        throw new Error('Method render() must be implemented');
    }

    setChecked(checked) {
        throw new Error('Method setChecked() must be implemented');
    }

    isChecked() {
        throw new Error('Method isChecked() must be implemented');
    }
}

// Concrete Products for Windows
class WindowsButton extends Button {
    render() {
        console.log('Rendering Windows style button');
    }

    onClick() {
        console.log('Windows button clicked');
    }
}

class WindowsTextBox extends TextBox {
    constructor() {
        super();
        this.text = '';
    }

    render() {
        console.log('Rendering Windows style textbox');
    }

    setText(text) {
        this.text = text;
        console.log('Windows textbox text set to:', text);
    }

    getText() {
        return this.text;
    }
}

class WindowsCheckBox extends CheckBox {
    constructor() {
        super();
        this.checked = false;
    }

    render() {
        console.log('Rendering Windows style checkbox');
    }

    setChecked(checked) {
        this.checked = checked;
        console.log('Windows checkbox', checked ? 'checked' : 'unchecked');
    }

    isChecked() {
        return this.checked;
    }
}

// Concrete Products for Mac
class MacButton extends Button {
    render() {
        console.log('Rendering Mac style button');
    }

    onClick() {
        console.log('Mac button clicked');
    }
}

class MacTextBox extends TextBox {
    constructor() {
        super();
        this.text = '';
    }

    render() {
        console.log('Rendering Mac style textbox');
    }

    setText(text) {
        this.text = text;
        console.log('Mac textbox text set to:', text);
    }

    getText() {
        return this.text;
    }
}

class MacCheckBox extends CheckBox {
    constructor() {
        super();
        this.checked = false;
    }

    render() {
        console.log('Rendering Mac style checkbox');
    }

    setChecked(checked) {
        this.checked = checked;
        console.log('Mac checkbox', checked ? 'checked' : 'unchecked');
    }

    isChecked() {
        return this.checked;
    }
}

// Abstract Factory
class GUIFactory {
    createButton() {
        throw new Error('Method createButton() must be implemented');
    }

    createTextBox() {
        throw new Error('Method createTextBox() must be implemented');
    }

    createCheckBox() {
        throw new Error('Method createCheckBox() must be implemented');
    }
}

// Concrete Factories
class WindowsFactory extends GUIFactory {
    createButton() {
        return new WindowsButton();
    }

    createTextBox() {
        return new WindowsTextBox();
    }

    createCheckBox() {
        return new WindowsCheckBox();
    }
}

class MacFactory extends GUIFactory {
    createButton() {
        return new MacButton();
    }

    createTextBox() {
        return new MacTextBox();
    }

    createCheckBox() {
        return new MacCheckBox();
    }
}

// Client Application
class Application {
    constructor(factory) {
        this.button = factory.createButton();
        this.textBox = factory.createTextBox();
        this.checkBox = factory.createCheckBox();
    }

    render() {
        console.log('\nRendering Application UI:');
        this.button.render();
        this.textBox.render();
        this.checkBox.render();
    }

    simulateUserInteraction() {
        console.log('\nSimulating User Interaction:');
        this.button.onClick();
        this.textBox.setText('Hello, World!');
        this.checkBox.setChecked(true);
    }
}

// Alternative implementation using factory functions
const createGUIFactory = (type) => {
    const factories = {
        Windows: () => ({
            createButton: () => new WindowsButton(),
            createTextBox: () => new WindowsTextBox(),
            createCheckBox: () => new WindowsCheckBox()
        }),
        Mac: () => ({
            createButton: () => new MacButton(),
            createTextBox: () => new MacTextBox(),
            createCheckBox: () => new MacCheckBox()
        })
    };

    return factories[type] || (() => {
        throw new Error(`Unsupported UI type: ${type}`);
    });
};

// Test function to demonstrate the pattern
function testAbstractFactoryPattern() {
    console.log('Abstract Factory Pattern Demo\n');

    // Create Windows UI
    console.log('Creating Windows UI Application:');
    const windowsApp = new Application(new WindowsFactory());
    windowsApp.render();
    windowsApp.simulateUserInteraction();

    // Create Mac UI
    console.log('\nCreating Mac UI Application:');
    const macApp = new Application(new MacFactory());
    macApp.render();
    macApp.simulateUserInteraction();

    // Example of using the pattern in a real application
    console.log('\nReal Application Example:');
    console.log('Detecting operating system and creating appropriate UI...');
    
    // Simulate OS detection
    const os = process.platform;
    let factory;
    
    if (os === 'win32') {
        factory = new WindowsFactory();
        console.log('Windows OS detected, creating Windows UI');
    } else if (os === 'darwin') {
        factory = new MacFactory();
        console.log('Mac OS detected, creating Mac UI');
    } else {
        // Default to Windows for other OS
        factory = new WindowsFactory();
        console.log('Unknown OS, defaulting to Windows UI');
    }

    const app = new Application(factory);
    app.render();
    app.simulateUserInteraction();

    // Using the factory function approach
    console.log('\nUsing Factory Function:');
    try {
        const uiType = os === 'darwin' ? 'Mac' : 'Windows';
        const factoryFn = createGUIFactory(uiType)();
        const appFn = new Application(factoryFn);
        appFn.render();
        appFn.simulateUserInteraction();
    } catch (error) {
        console.error(error.message);
    }
}

// Run the tests
testAbstractFactoryPattern(); 