package designpattern.behavioral;

import java.util.Date;
import java.util.UUID;

/**
 * Common theme for all behavioral design patterns
 * Using a Payment Processing System as the example
 */

// Payment Status enum
enum PaymentStatus {
    PENDING,
    PROCESSING,
    COMPLETED,
    FAILED,
    REFUNDED
}

// Payment Method enum
enum PaymentMethod {
    CREDIT_CARD,
    DEBIT_CARD,
    PAYPAL,
    UPI,
    BANK_TRANSFER
}

// Base Payment class
abstract class Payment {
    protected double amount;
    protected String currency;
    protected PaymentMethod paymentMethod;
    protected PaymentStatus status;
    protected String transactionId;
    protected Date timestamp;

    public Payment(double amount, String currency, PaymentMethod paymentMethod) {
        this.amount = amount;
        this.currency = currency;
        this.paymentMethod = paymentMethod;
        this.status = PaymentStatus.PENDING;
        this.timestamp = new Date();
    }

    public abstract boolean process();
    public abstract boolean validate();
    public abstract boolean refund();

    public void display() {
        System.out.println("\nPayment Details:");
        System.out.println("Amount: " + amount + " " + currency);
        System.out.println("Method: " + paymentMethod);
        System.out.println("Status: " + status);
        System.out.println("Transaction ID: " + transactionId);
        System.out.println("Timestamp: " + timestamp);
    }

    // Getters and setters
    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus status) { this.status = status; }
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public PaymentMethod getPaymentMethod() { return paymentMethod; }
}

// Concrete Payment classes
class CreditCardPayment extends Payment {
    private String cardNumber;
    private String expiryDate;
    private String cvv;

    public CreditCardPayment(double amount, String currency, String cardNumber, String expiryDate, String cvv) {
        super(amount, currency, PaymentMethod.CREDIT_CARD);
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
    }

    @Override
    public boolean process() {
        System.out.println("Processing credit card payment...");
        // Simulate processing
        this.status = PaymentStatus.PROCESSING;
        this.transactionId = "CC-" + UUID.randomUUID().toString().substring(0, 8);
        return true;
    }

    @Override
    public boolean validate() {
        System.out.println("Validating credit card payment...");
        // Basic validation
        return cardNumber.length() == 16 && 
               expiryDate.length() == 5 && 
               cvv.length() == 3;
    }

    @Override
    public boolean refund() {
        System.out.println("Processing credit card refund...");
        this.status = PaymentStatus.REFUNDED;
        return true;
    }
}

class PayPalPayment extends Payment {
    private String email;

    public PayPalPayment(double amount, String currency, String email) {
        super(amount, currency, PaymentMethod.PAYPAL);
        this.email = email;
    }

    @Override
    public boolean process() {
        System.out.println("Processing PayPal payment...");
        // Simulate processing
        this.status = PaymentStatus.PROCESSING;
        this.transactionId = "PP-" + UUID.randomUUID().toString().substring(0, 8);
        return true;
    }

    @Override
    public boolean validate() {
        System.out.println("Validating PayPal payment...");
        // Basic email validation
        return email.contains("@") && email.contains(".");
    }

    @Override
    public boolean refund() {
        System.out.println("Processing PayPal refund...");
        this.status = PaymentStatus.REFUNDED;
        return true;
    }
}

class UPIPayment extends Payment {
    private String upiId;

    public UPIPayment(double amount, String currency, String upiId) {
        super(amount, currency, PaymentMethod.UPI);
        this.upiId = upiId;
    }

    @Override
    public boolean process() {
        System.out.println("Processing UPI payment...");
        // Simulate processing
        this.status = PaymentStatus.PROCESSING;
        this.transactionId = "UPI-" + UUID.randomUUID().toString().substring(0, 8);
        return true;
    }

    @Override
    public boolean validate() {
        System.out.println("Validating UPI payment...");
        // Basic UPI ID validation
        return upiId.contains("@");
    }

    @Override
    public boolean refund() {
        System.out.println("Processing UPI refund...");
        this.status = PaymentStatus.REFUNDED;
        return true;
    }
}

// Payment Notification
class PaymentNotification {
    private Payment payment;

    public PaymentNotification(Payment payment) {
        this.payment = payment;
    }

    public void sendEmail() {
        System.out.println("Sending email notification for payment " + payment.getTransactionId());
    }

    public void sendSMS() {
        System.out.println("Sending SMS notification for payment " + payment.getTransactionId());
    }

    public void sendPushNotification() {
        System.out.println("Sending push notification for payment " + payment.getTransactionId());
    }
}

// Payment Logger
class PaymentLogger {
    public static void log(Payment payment, String action) {
        System.out.printf("[%s] %s: %s payment %s%n",
            new Date().toString(),
            action,
            payment.getPaymentMethod(),
            payment.getTransactionId());
    }
} 