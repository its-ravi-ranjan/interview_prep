package designpattern.behavioral;

/**
 * Chain of Responsibility Pattern Example
 * 
 * Intent: Avoid coupling the sender of a request to its receiver by giving more than one object
 * a chance to handle the request. Chain the receiving objects and pass the request along the chain.
 * 
 * Real-world analogy:
 * Think of a payment processing system where a payment request goes through multiple handlers:
 * 1. Validation Handler (checks if payment details are valid)
 * 2. Fraud Check Handler (verifies if the payment is suspicious)
 * 3. Payment Processing Handler (processes the actual payment)
 * 4. Notification Handler (sends notifications about the payment)
 * 
 * Each handler can either:
 * - Process the request and pass it to the next handler
 * - Process the request and stop the chain
 * - Pass the request to the next handler without processing
 * - Reject the request and stop the chain
 */

// Handler interface
abstract class PaymentHandler {
    protected PaymentHandler nextHandler;

    public PaymentHandler setNext(PaymentHandler handler) {
        this.nextHandler = handler;
        return handler;
    }

    public abstract boolean handle(Payment payment);
}

// Concrete Handlers
class ValidationHandler extends PaymentHandler {
    @Override
    public boolean handle(Payment payment) {
        System.out.println("\nValidation Handler: Checking payment details...");
        
        if (!payment.validate()) {
            System.out.println("Validation failed!");
            payment.setStatus(PaymentStatus.FAILED);
            PaymentLogger.log(payment, "VALIDATION_FAILED");
            return false;
        }
        
        System.out.println("Validation successful!");
        PaymentLogger.log(payment, "VALIDATION_SUCCESS");
        
        if (nextHandler != null) {
            return nextHandler.handle(payment);
        }
        return true;
    }
}

class FraudCheckHandler extends PaymentHandler {
    @Override
    public boolean handle(Payment payment) {
        System.out.println("\nFraud Check Handler: Verifying payment...");
        
        // Simulate fraud check
        boolean isSuspicious = payment.amount > 10000; // Example: flag large transactions
        
        if (isSuspicious) {
            System.out.println("Fraud check failed! Transaction amount too high.");
            payment.setStatus(PaymentStatus.FAILED);
            PaymentLogger.log(payment, "FRAUD_CHECK_FAILED");
            return false;
        }
        
        System.out.println("Fraud check passed!");
        PaymentLogger.log(payment, "FRAUD_CHECK_PASSED");
        
        if (nextHandler != null) {
            return nextHandler.handle(payment);
        }
        return true;
    }
}

class PaymentProcessingHandler extends PaymentHandler {
    @Override
    public boolean handle(Payment payment) {
        System.out.println("\nPayment Processing Handler: Processing payment...");
        
        if (!payment.process()) {
            System.out.println("Payment processing failed!");
            payment.setStatus(PaymentStatus.FAILED);
            PaymentLogger.log(payment, "PROCESSING_FAILED");
            return false;
        }
        
        System.out.println("Payment processed successfully!");
        payment.setStatus(PaymentStatus.COMPLETED);
        PaymentLogger.log(payment, "PROCESSING_SUCCESS");
        
        if (nextHandler != null) {
            return nextHandler.handle(payment);
        }
        return true;
    }
}

class NotificationHandler extends PaymentHandler {
    @Override
    public boolean handle(Payment payment) {
        System.out.println("\nNotification Handler: Sending notifications...");
        
        // Send notifications based on payment status
        if (payment.getStatus() == PaymentStatus.COMPLETED) {
            System.out.println("Sending success notifications...");
            // In a real system, this would send actual notifications
            PaymentLogger.log(payment, "NOTIFICATIONS_SENT");
        } else if (payment.getStatus() == PaymentStatus.FAILED) {
            System.out.println("Sending failure notifications...");
            PaymentLogger.log(payment, "FAILURE_NOTIFICATIONS_SENT");
        }
        
        if (nextHandler != null) {
            return nextHandler.handle(payment);
        }
        return true;
    }
}

// Test the pattern
public class PaymentChainOfResponsibility {
    public static void main(String[] args) {
        System.out.println("Chain of Responsibility Pattern Demo - Payment Processing\n");
        
        // Create the chain
        PaymentHandler validationHandler = new ValidationHandler();
        PaymentHandler fraudCheckHandler = new FraudCheckHandler();
        PaymentHandler paymentProcessingHandler = new PaymentProcessingHandler();
        PaymentHandler notificationHandler = new NotificationHandler();
        
        // Set up the chain
        validationHandler
            .setNext(fraudCheckHandler)
            .setNext(paymentProcessingHandler)
            .setNext(notificationHandler);
        
        // Create a payment
        Payment payment = new CreditCardPayment(5000.0, "USD", "1234567890123456", "12/25", "123");
        
        // Process the payment through the chain
        System.out.println("Starting payment processing chain...");
        boolean result = validationHandler.handle(payment);
        
        // Display final result
        System.out.println("\nFinal Payment Status:");
        payment.display();
        System.out.println("Chain processing result: " + (result ? "Success" : "Failed"));
        
        // Test with a suspicious payment
        System.out.println("\nTesting with a suspicious payment...");
        Payment suspiciousPayment = new CreditCardPayment(15000.0, "USD", "1234567890123456", "12/25", "123");
        
        boolean suspiciousResult = validationHandler.handle(suspiciousPayment);
        System.out.println("\nSuspicious Payment Status:");
        suspiciousPayment.display();
        System.out.println("Chain processing result: " + (suspiciousResult ? "Success" : "Failed"));
    }
} 