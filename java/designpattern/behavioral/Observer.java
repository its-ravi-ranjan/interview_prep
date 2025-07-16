package designpattern.behavioral;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Observer Pattern Example
 * 
 * Intent: Define a one-to-many dependency between objects so that when one object changes state,
 * all its dependents are notified and updated automatically.
 * 
 * Real-world analogy:
 * Think of a payment processing system where multiple components need to be notified
 * about payment status changes:
 * 1. Customer notifications (email, SMS)
 * 2. Merchant notifications
 * 3. Payment gateway updates
 * 4. Analytics tracking
 * 5. Fraud detection system
 */

// Subject (Observable)
abstract class PaymentSubject {
    protected Set<PaymentObserver> observers;

    public PaymentSubject() {
        this.observers = new HashSet<>();
    }

    public void attach(PaymentObserver observer) {
        observers.add(observer);
        System.out.println("Observer attached: " + observer.getClass().getSimpleName());
    }

    public void detach(PaymentObserver observer) {
        observers.remove(observer);
        System.out.println("Observer detached: " + observer.getClass().getSimpleName());
    }

    protected void notify(Payment payment, String event) {
        for (PaymentObserver observer : observers) {
            observer.update(payment, event);
        }
    }
}

// Concrete Subject
class PaymentProcessor extends PaymentSubject {
    private Map<String, Payment> payments;

    public PaymentProcessor() {
        super();
        this.payments = new ConcurrentHashMap<>();
    }

    public void processPayment(Payment payment) {
        System.out.println("\nProcessing payment...");
        payments.put(payment.getTransactionId(), payment);
        
        // Notify observers about payment initiation
        notify(payment, "PAYMENT_INITIATED");
        
        if (payment.validate()) {
            payment.process();
            notify(payment, "PAYMENT_PROCESSED");
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            notify(payment, "PAYMENT_FAILED");
        }
    }

    public void refundPayment(Payment payment) {
        System.out.println("\nProcessing refund...");
        if (payment.getStatus() == PaymentStatus.COMPLETED) {
            payment.refund();
            notify(payment, "PAYMENT_REFUNDED");
        } else {
            notify(payment, "REFUND_FAILED");
        }
    }
}

// Observer interface
interface PaymentObserver {
    void update(Payment payment, String event);
}

// Concrete Observers
class CustomerNotificationObserver implements PaymentObserver {
    private Set<String> notifications;

    public CustomerNotificationObserver() {
        this.notifications = new HashSet<>();
    }

    @Override
    public void update(Payment payment, String event) {
        String message = createNotificationMessage(payment, event);
        notifications.add(message);
        System.out.println("\nCustomer Notification: " + message);
        
        // In a real system, this would send actual notifications
        switch (event) {
            case "PAYMENT_PROCESSED":
                sendEmail(payment, "Payment Successful");
                sendSMS(payment, "Payment Successful");
                break;
            case "PAYMENT_FAILED":
                sendEmail(payment, "Payment Failed");
                sendSMS(payment, "Payment Failed");
                break;
            case "PAYMENT_REFUNDED":
                sendEmail(payment, "Payment Refunded");
                sendSMS(payment, "Payment Refunded");
                break;
        }
    }

    private String createNotificationMessage(Payment payment, String event) {
        return String.format("%s: %.2f %s - %s", 
            event, payment.getAmount(), payment.getCurrency(), payment.getStatus());
    }

    private void sendEmail(Payment payment, String subject) {
        System.out.println("Sending email to customer: " + subject);
    }

    private void sendSMS(Payment payment, String message) {
        System.out.println("Sending SMS to customer: " + message);
    }
}

class MerchantNotificationObserver implements PaymentObserver {
    @Override
    public void update(Payment payment, String event) {
        System.out.println("\nMerchant Notification: " + event + " for payment " + payment.getTransactionId());
        System.out.println("Amount: " + payment.getAmount() + " " + payment.getCurrency());
        System.out.println("Status: " + payment.getStatus());
        
        // In a real system, this would update merchant dashboard
        if (event.equals("PAYMENT_PROCESSED")) {
            updateMerchantDashboard(payment);
        }
    }

    private void updateMerchantDashboard(Payment payment) {
        System.out.println("Updating merchant dashboard with new payment");
    }
}

class FraudDetectionObserver implements PaymentObserver {
    private Set<String> suspiciousTransactions;

    public FraudDetectionObserver() {
        this.suspiciousTransactions = new HashSet<>();
    }

    @Override
    public void update(Payment payment, String event) {
        if (isSuspiciousTransaction(payment)) {
            suspiciousTransactions.add(payment.getTransactionId());
            System.out.println("\nFraud Alert: Suspicious transaction detected!");
            System.out.println("Transaction ID: " + payment.getTransactionId());
            System.out.println("Amount: " + payment.getAmount() + " " + payment.getCurrency());
            notifyFraudTeam(payment);
        }
    }

    private boolean isSuspiciousTransaction(Payment payment) {
        // Simple fraud detection logic
        return payment.getAmount() > 10000 || 
               (payment.getPaymentMethod() == PaymentMethod.CREDIT_CARD && payment.getAmount() > 5000);
    }

    private void notifyFraudTeam(Payment payment) {
        System.out.println("Notifying fraud detection team...");
    }
}

class AnalyticsObserver implements PaymentObserver {
    private static class Analytics {
        int totalProcessed;
        double totalAmount;
        int failedPayments;
        int refundedPayments;
    }

    private Analytics analytics;

    public AnalyticsObserver() {
        this.analytics = new Analytics();
    }

    @Override
    public void update(Payment payment, String event) {
        switch (event) {
            case "PAYMENT_PROCESSED":
                analytics.totalProcessed++;
                analytics.totalAmount += payment.getAmount();
                break;
            case "PAYMENT_FAILED":
                analytics.failedPayments++;
                break;
            case "PAYMENT_REFUNDED":
                analytics.refundedPayments++;
                analytics.totalAmount -= payment.getAmount();
                break;
        }
        
        displayAnalytics();
    }

    private void displayAnalytics() {
        System.out.println("\nPayment Analytics:");
        System.out.println("-----------------");
        System.out.println("Total Processed: " + analytics.totalProcessed);
        System.out.println("Total Amount: " + analytics.totalAmount);
        System.out.println("Failed Payments: " + analytics.failedPayments);
        System.out.println("Refunded Payments: " + analytics.refundedPayments);
    }
}

// Test the pattern
public class Observer {
    public static void main(String[] args) {
        System.out.println("Observer Pattern Demo - Payment Notifications\n");
        
        // Create subject
        PaymentProcessor paymentProcessor = new PaymentProcessor();
        
        // Create observers
        PaymentObserver customerNotifier = new CustomerNotificationObserver();
        PaymentObserver merchantNotifier = new MerchantNotificationObserver();
        PaymentObserver fraudDetector = new FraudDetectionObserver();
        PaymentObserver analyticsTracker = new AnalyticsObserver();
        
        // Attach observers
        paymentProcessor.attach(customerNotifier);
        paymentProcessor.attach(merchantNotifier);
        paymentProcessor.attach(fraudDetector);
        paymentProcessor.attach(analyticsTracker);
        
        // Create and process payments
        Payment payment1 = new CreditCardPayment(500.0, "USD", "1234567890123456", "12/25", "123");
        Payment payment2 = new CreditCardPayment(15000.0, "USD", "9876543210987654", "12/25", "456");
        
        // Process payments
        paymentProcessor.processPayment(payment1);
        paymentProcessor.processPayment(payment2);
        
        // Test refund
        paymentProcessor.refundPayment(payment1);
        
        // Detach an observer
        paymentProcessor.detach(merchantNotifier);
        
        // Process another payment (merchant won't be notified)
        Payment payment3 = new PayPalPayment(1000.0, "USD", "test@example.com");
        paymentProcessor.processPayment(payment3);
    }
} 