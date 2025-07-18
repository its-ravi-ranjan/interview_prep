/**
 * SOLID Principles Implementation in Java
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

import java.util.*;
import java.time.LocalDateTime;

// ==================== S - Single Responsibility Principle (SRP) ====================
/**
 * SRP: A class should have only one reason to change, meaning it should have only one responsibility.
 * 
 * Real-world example: E-commerce Order Management System
 * Instead of one massive Order class handling everything, we separate concerns.
 */

// ❌ BAD: Violates SRP - Order class doing too many things
class BadOrder {
    private String orderId;
    private List<String> items;
    private double total;
    
    public void calculateTotal() {
        // Calculate total logic
    }
    
    public void saveToDatabase() {
        // Database operations
    }
    
    public void sendEmailNotification() {
        // Email logic
    }
    
    public void generateInvoice() {
        // Invoice generation
    }
}

// ✅ GOOD: Following SRP - Each class has single responsibility
class Order {
    private String orderId;
    private List<OrderItem> items;
    private double total;
    private LocalDateTime orderDate;
    
    // Constructor
    public Order(String orderId, List<OrderItem> items) {
        this.orderId = orderId;
        this.items = items;
        this.orderDate = LocalDateTime.now();
    }
    
    // Getters
    public String getOrderId() { return orderId; }
    public List<OrderItem> getItems() { return items; }
    public double getTotal() { return total; }
    public LocalDateTime getOrderDate() { return orderDate; }
    
    // Only order-related operations
    public void addItem(OrderItem item) {
        items.add(item);
    }
    
    public void removeItem(String itemId) {
        items.removeIf(item -> item.getItemId().equals(itemId));
    }
}

class OrderCalculator {
    public double calculateTotal(Order order) {
        return order.getItems().stream()
                   .mapToDouble(OrderItem::getPrice)
                   .sum();
    }
}

class OrderRepository {
    public void save(Order order) {
        System.out.println("Saving order " + order.getOrderId() + " to database");
    }
    
    public Order findById(String orderId) {
        System.out.println("Finding order " + orderId + " from database");
        return null; // Simplified
    }
}

class EmailService {
    public void sendOrderConfirmation(Order order) {
        System.out.println("Sending confirmation email for order " + order.getOrderId());
    }
}

class InvoiceGenerator {
    public void generateInvoice(Order order) {
        System.out.println("Generating invoice for order " + order.getOrderId());
    }
}

class OrderItem {
    private String itemId;
    private String name;
    private double price;
    
    public OrderItem(String itemId, String name, double price) {
        this.itemId = itemId;
        this.name = name;
        this.price = price;
    }
    
    public String getItemId() { return itemId; }
    public String getName() { return name; }
    public double getPrice() { return price; }
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
    public void processPayment(String paymentType, double amount) {
        if (paymentType.equals("credit")) {
            System.out.println("Processing credit card payment: $" + amount);
        } else if (paymentType.equals("debit")) {
            System.out.println("Processing debit card payment: $" + amount);
        } else if (paymentType.equals("paypal")) {
            System.out.println("Processing PayPal payment: $" + amount);
        }
        // Need to modify this class to add new payment methods
    }
}

// ✅ GOOD: Following OCP - Open for extension, closed for modification
interface PaymentMethod {
    void processPayment(double amount);
    String getPaymentType();
}

class CreditCardPayment implements PaymentMethod {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing credit card payment: $" + amount);
    }
    
    @Override
    public String getPaymentType() {
        return "Credit Card";
    }
}

class DebitCardPayment implements PaymentMethod {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing debit card payment: $" + amount);
    }
    
    @Override
    public String getPaymentType() {
        return "Debit Card";
    }
}

class PayPalPayment implements PaymentMethod {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing PayPal payment: $" + amount);
    }
    
    @Override
    public String getPaymentType() {
        return "PayPal";
    }
}

class CryptoPayment implements PaymentMethod {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing cryptocurrency payment: $" + amount);
    }
    
    @Override
    public String getPaymentType() {
        return "Cryptocurrency";
    }
}

class PaymentProcessor {
    public void processPayment(PaymentMethod paymentMethod, double amount) {
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
    public void fly() {
        System.out.println("Flying...");
    }
}

class BadDuck extends BadBird {
    // Duck can fly, so this is fine
}

class BadPenguin extends BadBird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Penguins cannot fly!");
    }
}

// ✅ GOOD: Following LSP - Proper hierarchy
interface Bird {
    void eat();
    void makeSound();
}

interface FlyingBird extends Bird {
    void fly();
}

class Duck implements FlyingBird {
    @Override
    public void eat() {
        System.out.println("Duck is eating");
    }
    
    @Override
    public void makeSound() {
        System.out.println("Quack quack!");
    }
    
    @Override
    public void fly() {
        System.out.println("Duck is flying");
    }
}

class Penguin implements Bird {
    @Override
    public void eat() {
        System.out.println("Penguin is eating");
    }
    
    @Override
    public void makeSound() {
        System.out.println("Honk honk!");
    }
}

// ==================== I - Interface Segregation Principle (ISP) ====================
/**
 * ISP: Clients should not be forced to depend on interfaces they don't use.
 * 
 * Real-world example: Worker hierarchy - Different types of workers have different capabilities.
 */

// ❌ BAD: Violates ISP - Fat interface forcing unnecessary methods
interface BadWorker {
    void work();
    void eat();
    void sleep();
    void code();
    void design();
    void test();
    void deploy();
}

class BadDeveloper implements BadWorker {
    @Override
    public void work() { System.out.println("Developer working"); }
    @Override
    public void eat() { System.out.println("Developer eating"); }
    @Override
    public void sleep() { System.out.println("Developer sleeping"); }
    @Override
    public void code() { System.out.println("Developer coding"); }
    @Override
    public void design() { /* Not applicable */ }
    @Override
    public void test() { /* Not applicable */ }
    @Override
    public void deploy() { /* Not applicable */ }
}

// ✅ GOOD: Following ISP - Segregated interfaces
interface Worker {
    void work();
    void eat();
    void sleep();
}

interface Coder {
    void code();
}

interface Designer {
    void design();
}

interface Tester {
    void test();
}

interface DevOps {
    void deploy();
}

class Developer implements Worker, Coder {
    @Override
    public void work() { System.out.println("Developer working"); }
    @Override
    public void eat() { System.out.println("Developer eating"); }
    @Override
    public void sleep() { System.out.println("Developer sleeping"); }
    @Override
    public void code() { System.out.println("Developer coding"); }
}

class Designer implements Worker, Designer {
    @Override
    public void work() { System.out.println("Designer working"); }
    @Override
    public void eat() { System.out.println("Designer eating"); }
    @Override
    public void sleep() { System.out.println("Designer sleeping"); }
    @Override
    public void design() { System.out.println("Designer designing"); }
}

class FullStackDeveloper implements Worker, Coder, Designer, Tester, DevOps {
    @Override
    public void work() { System.out.println("Full-stack developer working"); }
    @Override
    public void eat() { System.out.println("Full-stack developer eating"); }
    @Override
    public void sleep() { System.out.println("Full-stack developer sleeping"); }
    @Override
    public void code() { System.out.println("Full-stack developer coding"); }
    @Override
    public void design() { System.out.println("Full-stack developer designing"); }
    @Override
    public void test() { System.out.println("Full-stack developer testing"); }
    @Override
    public void deploy() { System.out.println("Full-stack developer deploying"); }
}

// ==================== D - Dependency Inversion Principle (DIP) ====================
/**
 * DIP: High-level modules should not depend on low-level modules. Both should depend on abstractions.
 * 
 * Real-world example: Notification System - High-level business logic shouldn't depend on specific notification methods.
 */

// ❌ BAD: Violates DIP - High-level module depends on low-level modules
class BadOrderService {
    private EmailService emailService;
    private SMSService smsService;
    
    public BadOrderService() {
        this.emailService = new EmailService();
        this.smsService = new SMSService();
    }
    
    public void processOrder(Order order) {
        // Business logic
        System.out.println("Processing order: " + order.getOrderId());
        
        // Direct dependency on concrete implementations
        emailService.sendOrderConfirmation(order);
        smsService.sendOrderConfirmation(order);
    }
}

class SMSService {
    public void sendOrderConfirmation(Order order) {
        System.out.println("Sending SMS confirmation for order " + order.getOrderId());
    }
}

// ✅ GOOD: Following DIP - Depend on abstractions
interface NotificationService {
    void sendNotification(String message);
}

class EmailNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Sending email: " + message);
    }
}

class SMSNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

class PushNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Sending push notification: " + message);
    }
}

class OrderService {
    private List<NotificationService> notificationServices;
    
    public OrderService(List<NotificationService> notificationServices) {
        this.notificationServices = notificationServices;
    }
    
    public void processOrder(Order order) {
        // Business logic
        System.out.println("Processing order: " + order.getOrderId());
        
        // Depend on abstraction
        String message = "Order " + order.getOrderId() + " has been processed successfully!";
        for (NotificationService service : notificationServices) {
            service.sendNotification(message);
        }
    }
}

// ==================== Main Class with Examples ====================
public class SolidPrinciples {
    public static void main(String[] args) {
        System.out.println("=== SOLID Principles Examples ===\n");
        
        // SRP Example
        System.out.println("1. Single Responsibility Principle (SRP):");
        Order order = new Order("ORD001", Arrays.asList(
            new OrderItem("ITEM1", "Laptop", 999.99),
            new OrderItem("ITEM2", "Mouse", 29.99)
        ));
        
        OrderCalculator calculator = new OrderCalculator();
        OrderRepository repository = new OrderRepository();
        EmailService emailService = new EmailService();
        InvoiceGenerator invoiceGenerator = new InvoiceGenerator();
        
        double total = calculator.calculateTotal(order);
        repository.save(order);
        emailService.sendOrderConfirmation(order);
        invoiceGenerator.generateInvoice(order);
        System.out.println();
        
        // OCP Example
        System.out.println("2. Open/Closed Principle (OCP):");
        PaymentProcessor processor = new PaymentProcessor();
        PaymentMethod creditCard = new CreditCardPayment();
        PaymentMethod paypal = new PayPalPayment();
        PaymentMethod crypto = new CryptoPayment();
        
        processor.processPayment(creditCard, 100.0);
        processor.processPayment(paypal, 50.0);
        processor.processPayment(crypto, 200.0);
        System.out.println();
        
        // LSP Example
        System.out.println("3. Liskov Substitution Principle (LSP):");
        List<Bird> birds = Arrays.asList(new Duck(), new Penguin());
        for (Bird bird : birds) {
            bird.eat();
            bird.makeSound();
        }
        
        List<FlyingBird> flyingBirds = Arrays.asList(new Duck());
        for (FlyingBird bird : flyingBirds) {
            bird.fly();
        }
        System.out.println();
        
        // ISP Example
        System.out.println("4. Interface Segregation Principle (ISP):");
        Developer developer = new Developer();
        Designer designer = new Designer();
        FullStackDeveloper fullStack = new FullStackDeveloper();
        
        developer.work();
        developer.code();
        designer.work();
        designer.design();
        fullStack.work();
        fullStack.code();
        fullStack.design();
        fullStack.test();
        fullStack.deploy();
        System.out.println();
        
        // DIP Example
        System.out.println("5. Dependency Inversion Principle (DIP):");
        List<NotificationService> services = Arrays.asList(
            new EmailNotificationService(),
            new SMSNotificationService(),
            new PushNotificationService()
        );
        
        OrderService orderService = new OrderService(services);
        orderService.processOrder(order);
        System.out.println();
        
        System.out.println("=== SOLID Principles Summary ===");
        System.out.println("S - Single Responsibility: Each class has one reason to change");
        System.out.println("O - Open/Closed: Open for extension, closed for modification");
        System.out.println("L - Liskov Substitution: Subtypes are substitutable for base types");
        System.out.println("I - Interface Segregation: Clients don't depend on unused interfaces");
        System.out.println("D - Dependency Inversion: Depend on abstractions, not concretions");
    }
} 