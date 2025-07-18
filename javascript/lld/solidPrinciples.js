/**
 * SOLID Principles Implementation in JavaScript
 * 
 * SOLID principles are fundamental object-oriented design principles that help create
 * maintainable, scalable, and robust software systems. They are crucial for Amazon
 * interviews as they demonstrate clean code practices and system design skills.
 * 
 * S - Single Responsibility Principle (SRP)
 * O - Open/Closed Principle (OCP)
 * L - Liskov Substitution Principle (LSP)
 * I - Interface Segregation Principle (ISP)
 * D - Dependency Inversion Principle (DIP)
 */

// ==================== S - Single Responsibility Principle (SRP) ====================
/**
 * SRP: A class should have only one reason to change, meaning it should have only one responsibility.
 * 
 * Real-world example: E-commerce Order Management System
 * Instead of one massive Order class handling everything, we separate concerns.
 */

// ❌ BAD: Violates SRP - Order class doing too many things
class BadOrder {
    constructor(orderId, items) {
        this.orderId = orderId;
        this.items = items;
        this.total = 0;
    }
    
    calculateTotal() {
        // Calculate total logic
        this.total = this.items.reduce((sum, item) => sum + item.price, 0);
    }
    
    saveToDatabase() {
        // Database operations
        console.log(`Saving order ${this.orderId} to database`);
    }
    
    sendEmailNotification() {
        // Email logic
        console.log(`Sending email notification for order ${this.orderId}`);
    }
    
    generateInvoice() {
        // Invoice generation
        console.log(`Generating invoice for order ${this.orderId}`);
    }
}

// ✅ GOOD: Following SRP - Each class has single responsibility
class Order {
    constructor(orderId, items) {
        this.orderId = orderId;
        this.items = items;
        this.orderDate = new Date();
    }
    
    addItem(item) {
        this.items.push(item);
    }
    
    removeItem(itemId) {
        this.items = this.items.filter(item => item.itemId !== itemId);
    }
    
    getOrderId() { return this.orderId; }
    getItems() { return this.items; }
    getOrderDate() { return this.orderDate; }
}

class OrderItem {
    constructor(itemId, name, price) {
        this.itemId = itemId;
        this.name = name;
        this.price = price;
    }
}

class OrderCalculator {
    calculateTotal(order) {
        return order.getItems().reduce((sum, item) => sum + item.price, 0);
    }
}

class OrderRepository {
    save(order) {
        console.log(`Saving order ${order.getOrderId()} to database`);
    }
    
    findById(orderId) {
        console.log(`Finding order ${orderId} from database`);
        return null; // Simplified
    }
}

class EmailService {
    sendOrderConfirmation(order) {
        console.log(`Sending confirmation email for order ${order.getOrderId()}`);
    }
}

class InvoiceGenerator {
    generateInvoice(order) {
        console.log(`Generating invoice for order ${order.getOrderId()}`);
    }
}

// ==================== O - Open/Closed Principle (OCP) ====================
/**
 * OCP: Software entities should be open for extension but closed for modification.
 * 
 * Real-world example: Payment Processing System
 * We can add new payment methods without modifying existing code.
 */

// ❌ BAD: Violates OCP - Need to modify existing code to add new payment methods
class BadPaymentProcessor {
    processPayment(paymentType, amount) {
        if (paymentType === 'credit') {
            console.log(`Processing credit card payment: $${amount}`);
        } else if (paymentType === 'debit') {
            console.log(`Processing debit card payment: $${amount}`);
        } else if (paymentType === 'paypal') {
            console.log(`Processing PayPal payment: $${amount}`);
        }
        // Need to modify this class to add new payment methods
    }
}

// ✅ GOOD: Following OCP - Open for extension, closed for modification
class PaymentMethod {
    processPayment(amount) {
        throw new Error('processPayment must be implemented');
    }
    
    getPaymentType() {
        throw new Error('getPaymentType must be implemented');
    }
}

class CreditCardPayment extends PaymentMethod {
    processPayment(amount) {
        console.log(`Processing credit card payment: $${amount}`);
    }
    
    getPaymentType() {
        return 'Credit Card';
    }
}

class DebitCardPayment extends PaymentMethod {
    processPayment(amount) {
        console.log(`Processing debit card payment: $${amount}`);
    }
    
    getPaymentType() {
        return 'Debit Card';
    }
}

class PayPalPayment extends PaymentMethod {
    processPayment(amount) {
        console.log(`Processing PayPal payment: $${amount}`);
    }
    
    getPaymentType() {
        return 'PayPal';
    }
}

class CryptoPayment extends PaymentMethod {
    processPayment(amount) {
        console.log(`Processing cryptocurrency payment: $${amount}`);
    }
    
    getPaymentType() {
        return 'Cryptocurrency';
    }
}

class PaymentProcessor {
    processPayment(paymentMethod, amount) {
        paymentMethod.processPayment(amount);
    }
}

// ==================== L - Liskov Substitution Principle (LSP) ====================
/**
 * LSP: Subtypes must be substitutable for their base types without breaking the application.
 * 
 * Real-world example: Bird hierarchy - All birds can fly, right? Wrong!
 */

// ❌ BAD: Violates LSP - Not all birds can fly
class BadBird {
    fly() {
        console.log('Flying...');
    }
}

class BadDuck extends BadBird {
    // Duck can fly, so this is fine
}

class BadPenguin extends BadBird {
    fly() {
        throw new Error('Penguins cannot fly!');
    }
}

// ✅ GOOD: Following LSP - Proper hierarchy
class Bird {
    eat() {
        throw new Error('eat must be implemented');
    }
    
    makeSound() {
        throw new Error('makeSound must be implemented');
    }
}

class FlyingBird extends Bird {
    fly() {
        throw new Error('fly must be implemented');
    }
}

class Duck extends FlyingBird {
    eat() {
        console.log('Duck is eating');
    }
    
    makeSound() {
        console.log('Quack quack!');
    }
    
    fly() {
        console.log('Duck is flying');
    }
}

class Penguin extends Bird {
    eat() {
        console.log('Penguin is eating');
    }
    
    makeSound() {
        console.log('Honk honk!');
    }
}

// ==================== I - Interface Segregation Principle (ISP) ====================
/**
 * ISP: Clients should not be forced to depend on interfaces they don't use.
 * 
 * Real-world example: Worker hierarchy - Different types of workers have different capabilities.
 */

// ❌ BAD: Violates ISP - Fat interface forcing unnecessary methods
class BadWorker {
    work() {
        throw new Error('work must be implemented');
    }
    
    eat() {
        throw new Error('eat must be implemented');
    }
    
    sleep() {
        throw new Error('sleep must be implemented');
    }
    
    code() {
        throw new Error('code must be implemented');
    }
    
    design() {
        throw new Error('design must be implemented');
    }
    
    test() {
        throw new Error('test must be implemented');
    }
    
    deploy() {
        throw new Error('deploy must be implemented');
    }
}

class BadDeveloper extends BadWorker {
    work() { console.log('Developer working'); }
    eat() { console.log('Developer eating'); }
    sleep() { console.log('Developer sleeping'); }
    code() { console.log('Developer coding'); }
    design() { /* Not applicable */ }
    test() { /* Not applicable */ }
    deploy() { /* Not applicable */ }
}

// ✅ GOOD: Following ISP - Segregated interfaces
class Worker {
    work() {
        throw new Error('work must be implemented');
    }
    
    eat() {
        throw new Error('eat must be implemented');
    }
    
    sleep() {
        throw new Error('sleep must be implemented');
    }
}

class Coder {
    code() {
        throw new Error('code must be implemented');
    }
}

class Designer {
    design() {
        throw new Error('design must be implemented');
    }
}

class Tester {
    test() {
        throw new Error('test must be implemented');
    }
}

class DevOps {
    deploy() {
        throw new Error('deploy must be implemented');
    }
}

class Developer extends Worker {
    constructor() {
        super();
        Object.assign(this, new Coder());
    }
    
    work() { console.log('Developer working'); }
    eat() { console.log('Developer eating'); }
    sleep() { console.log('Developer sleeping'); }
    code() { console.log('Developer coding'); }
}

class DesignerWorker extends Worker {
    constructor() {
        super();
        Object.assign(this, new Designer());
    }
    
    work() { console.log('Designer working'); }
    eat() { console.log('Designer eating'); }
    sleep() { console.log('Designer sleeping'); }
    design() { console.log('Designer designing'); }
}

class FullStackDeveloper extends Worker {
    constructor() {
        super();
        Object.assign(this, new Coder(), new Designer(), new Tester(), new DevOps());
    }
    
    work() { console.log('Full-stack developer working'); }
    eat() { console.log('Full-stack developer eating'); }
    sleep() { console.log('Full-stack developer sleeping'); }
    code() { console.log('Full-stack developer coding'); }
    design() { console.log('Full-stack developer designing'); }
    test() { console.log('Full-stack developer testing'); }
    deploy() { console.log('Full-stack developer deploying'); }
}

// ==================== D - Dependency Inversion Principle (DIP) ====================
/**
 * DIP: High-level modules should not depend on low-level modules. Both should depend on abstractions.
 * 
 * Real-world example: Notification System - High-level business logic shouldn't depend on specific notification methods.
 */

// ❌ BAD: Violates DIP - High-level module depends on low-level modules
class BadOrderService {
    constructor() {
        this.emailService = new EmailService();
        this.smsService = new SMSService();
    }
    
    processOrder(order) {
        // Business logic
        console.log(`Processing order: ${order.getOrderId()}`);
        
        // Direct dependency on concrete implementations
        this.emailService.sendOrderConfirmation(order);
        this.smsService.sendOrderConfirmation(order);
    }
}

class SMSService {
    sendOrderConfirmation(order) {
        console.log(`Sending SMS confirmation for order ${order.getOrderId()}`);
    }
}

// ✅ GOOD: Following DIP - Depend on abstractions
class NotificationService {
    sendNotification(message) {
        throw new Error('sendNotification must be implemented');
    }
}

class EmailNotificationService extends NotificationService {
    sendNotification(message) {
        console.log(`Sending email: ${message}`);
    }
}

class SMSNotificationService extends NotificationService {
    sendNotification(message) {
        console.log(`Sending SMS: ${message}`);
    }
}

class PushNotificationService extends NotificationService {
    sendNotification(message) {
        console.log(`Sending push notification: ${message}`);
    }
}

class OrderService {
    constructor(notificationServices) {
        this.notificationServices = notificationServices;
    }
    
    processOrder(order) {
        // Business logic
        console.log(`Processing order: ${order.getOrderId()}`);
        
        // Depend on abstraction
        const message = `Order ${order.getOrderId()} has been processed successfully!`;
        this.notificationServices.forEach(service => {
            service.sendNotification(message);
        });
    }
}

// ==================== Main Function with Examples ====================
function runSolidPrinciplesExamples() {
    console.log('=== SOLID Principles Examples ===\n');
    
    // SRP Example
    console.log('1. Single Responsibility Principle (SRP):');
    const order = new Order('ORD001', [
        new OrderItem('ITEM1', 'Laptop', 999.99),
        new OrderItem('ITEM2', 'Mouse', 29.99)
    ]);
    
    const calculator = new OrderCalculator();
    const repository = new OrderRepository();
    const emailService = new EmailService();
    const invoiceGenerator = new InvoiceGenerator();
    
    const total = calculator.calculateTotal(order);
    repository.save(order);
    emailService.sendOrderConfirmation(order);
    invoiceGenerator.generateInvoice(order);
    console.log();
    
    // OCP Example
    console.log('2. Open/Closed Principle (OCP):');
    const processor = new PaymentProcessor();
    const creditCard = new CreditCardPayment();
    const paypal = new PayPalPayment();
    const crypto = new CryptoPayment();
    
    processor.processPayment(creditCard, 100.0);
    processor.processPayment(paypal, 50.0);
    processor.processPayment(crypto, 200.0);
    console.log();
    
    // LSP Example
    console.log('3. Liskov Substitution Principle (LSP):');
    const birds = [new Duck(), new Penguin()];
    birds.forEach(bird => {
        bird.eat();
        bird.makeSound();
    });
    
    const flyingBirds = [new Duck()];
    flyingBirds.forEach(bird => {
        bird.fly();
    });
    console.log();
    
    // ISP Example
    console.log('4. Interface Segregation Principle (ISP):');
    const developer = new Developer();
    const designer = new DesignerWorker();
    const fullStack = new FullStackDeveloper();
    
    developer.work();
    developer.code();
    designer.work();
    designer.design();
    fullStack.work();
    fullStack.code();
    fullStack.design();
    fullStack.test();
    fullStack.deploy();
    console.log();
    
    // DIP Example
    console.log('5. Dependency Inversion Principle (DIP):');
    const services = [
        new EmailNotificationService(),
        new SMSNotificationService(),
        new PushNotificationService()
    ];
    
    const orderService = new OrderService(services);
    orderService.processOrder(order);
    console.log();
    
    console.log('=== SOLID Principles Summary ===');
    console.log('S - Single Responsibility: Each class has one reason to change');
    console.log('O - Open/Closed: Open for extension, closed for modification');
    console.log('L - Liskov Substitution: Subtypes are substitutable for base types');
    console.log('I - Interface Segregation: Clients don\'t depend on unused interfaces');
    console.log('D - Dependency Inversion: Depend on abstractions, not concretions');
}

// Run examples if this file is executed directly
if (require.main === module) {
    runSolidPrinciplesExamples();
}

module.exports = {
    // SRP Classes
    Order,
    OrderItem,
    OrderCalculator,
    OrderRepository,
    EmailService,
    InvoiceGenerator,
    
    // OCP Classes
    PaymentMethod,
    CreditCardPayment,
    DebitCardPayment,
    PayPalPayment,
    CryptoPayment,
    PaymentProcessor,
    
    // LSP Classes
    Bird,
    FlyingBird,
    Duck,
    Penguin,
    
    // ISP Classes
    Worker,
    Coder,
    Designer,
    Tester,
    DevOps,
    Developer,
    DesignerWorker,
    FullStackDeveloper,
    
    // DIP Classes
    NotificationService,
    EmailNotificationService,
    SMSNotificationService,
    PushNotificationService,
    OrderService,
    
    // Main function
    runSolidPrinciplesExamples
}; 