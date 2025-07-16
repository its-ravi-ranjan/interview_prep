package designpattern.behavioral;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.regex.Pattern;

/**
 * Template Method Pattern Example
 * 
 * Intent: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
 * Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
 * 
 * Real-world analogy:
 * Think of a payment processing system where different payment methods
 * follow the same general workflow but have specific implementations for certain steps:
 * 1. Validate payment details
 * 2. Perform security checks
 * 3. Process the payment
 * 4. Handle the response
 * 5. Update the status
 * Each payment method can customize specific steps while following the overall process.
 */

// Abstract class with template method
abstract class PaymentProcessor {
    // Template method
    public final boolean processPayment(Payment payment) {
        System.out.println("\nStarting payment processing workflow...");
        
        // Step 1: Validate payment details
        if (!validatePayment(payment)) {
            System.out.println("Payment validation failed");
            payment.setStatus(PaymentStatus.FAILED);
            return false;
        }
        
        // Step 2: Perform security checks
        if (!performSecurityChecks(payment)) {
            System.out.println("Security checks failed");
            payment.setStatus(PaymentStatus.FAILED);
            return false;
        }
        
        // Step 3: Process the payment
        if (!processPaymentTransaction(payment)) {
            System.out.println("Payment processing failed");
            payment.setStatus(PaymentStatus.FAILED);
            return false;
        }
        
        // Step 4: Handle the response
        handlePaymentResponse(payment);
        
        // Step 5: Update the status
        updatePaymentStatus(payment);
        
        System.out.println("Payment processing workflow completed");
        return true;
    }
    
    // Abstract methods to be implemented by subclasses
    protected abstract boolean validatePayment(Payment payment);
    protected abstract boolean performSecurityChecks(Payment payment);
    protected abstract boolean processPaymentTransaction(Payment payment);
    
    // Hook methods with default implementations
    protected void handlePaymentResponse(Payment payment) {
        System.out.println("Default payment response handling");
    }
    
    protected void updatePaymentStatus(Payment payment) {
        System.out.println("Default status update");
    }
}

// Concrete implementation for credit card payments
class CreditCardProcessor extends PaymentProcessor {
    @Override
    protected boolean validatePayment(Payment payment) {
        System.out.println("\nValidating credit card payment...");
        
        // Validate card number (Luhn algorithm)
        if (!isValidCardNumber(payment.getCardNumber())) {
            System.out.println("Invalid card number");
            return false;
        }
        
        // Validate expiry date
        if (!isValidExpiryDate(payment.getExpiryDate())) {
            System.out.println("Invalid expiry date");
            return false;
        }
        
        // Validate CVV
        if (!isValidCVV(payment.getCvv())) {
            System.out.println("Invalid CVV");
            return false;
        }
        
        System.out.println("Credit card validation successful");
        return true;
    }
    
    @Override
    protected boolean performSecurityChecks(Payment payment) {
        System.out.println("\nPerforming credit card security checks...");
        
        // Check for 3D Secure if required
        if (requires3DSecure(payment)) {
            System.out.println("Initiating 3D Secure verification...");
            if (!verify3DSecure(payment)) {
                System.out.println("3D Secure verification failed");
                return false;
            }
            System.out.println("3D Secure verification successful");
        }
        
        // Check for fraud
        if (isSuspiciousTransaction(payment)) {
            System.out.println("Suspicious transaction detected");
            return false;
        }
        
        System.out.println("Security checks passed");
        return true;
    }
    
    @Override
    protected boolean processPaymentTransaction(Payment payment) {
        System.out.println("\nProcessing credit card transaction...");
        
        // Simulate payment gateway processing
        System.out.println("Processing payment through payment gateway...");
        payment.setStatus(PaymentStatus.COMPLETED);
        return true;
    }
    
    @Override
    protected void handlePaymentResponse(Payment payment) {
        System.out.println("\nHandling credit card payment response...");
        System.out.println("Sending confirmation to card issuer");
        System.out.println("Updating merchant records");
    }
    
    @Override
    protected void updatePaymentStatus(Payment payment) {
        System.out.println("\nUpdating credit card payment status...");
        System.out.println("Status: " + payment.getStatus());
        System.out.println("Transaction ID: " + payment.getTransactionId());
    }
    
    // Helper methods
    private boolean isValidCardNumber(String cardNumber) {
        // Simple Luhn algorithm implementation
        int[] digits = cardNumber.chars()
            .map(Character::getNumericValue)
            .toArray();
        
        int lastDigit = digits[digits.length - 1];
        int sum = 0;
        
        for (int i = digits.length - 2; i >= 0; i--) {
            int digit = digits[i];
            if ((digits.length - 1 - i) % 2 == 0) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
        }
        
        return (sum + lastDigit) % 10 == 0;
    }
    
    private boolean isValidExpiryDate(String expiryDate) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yy");
            LocalDate expiry = LocalDate.parse("01/" + expiryDate, formatter);
            LocalDate current = LocalDate.now();
            return expiry.isAfter(current) || expiry.equals(current);
        } catch (Exception e) {
            return false;
        }
    }
    
    private boolean isValidCVV(String cvv) {
        return Pattern.matches("^\\d{3,4}$", cvv);
    }
    
    private boolean requires3DSecure(Payment payment) {
        return payment.getAmount() > 1000;
    }
    
    private boolean verify3DSecure(Payment payment) {
        // Simulate 3D Secure verification
        return Math.random() > 0.1; // 90% success rate
    }
    
    private boolean isSuspiciousTransaction(Payment payment) {
        return payment.getAmount() > 10000;
    }
}

// Concrete implementation for PayPal payments
class PayPalProcessor extends PaymentProcessor {
    @Override
    protected boolean validatePayment(Payment payment) {
        System.out.println("\nValidating PayPal payment...");
        
        // Validate email
        if (!isValidEmail(payment.getEmail())) {
            System.out.println("Invalid PayPal email");
            return false;
        }
        
        // Validate account status
        if (!isAccountActive(payment)) {
            System.out.println("PayPal account is not active");
            return false;
        }
        
        System.out.println("PayPal validation successful");
        return true;
    }
    
    @Override
    protected boolean performSecurityChecks(Payment payment) {
        System.out.println("\nPerforming PayPal security checks...");
        
        // Verify PayPal account
        if (!verifyPayPalAccount(payment)) {
            System.out.println("PayPal account verification failed");
            return false;
        }
        
        // Check for suspicious activity
        if (isSuspiciousActivity(payment)) {
            System.out.println("Suspicious activity detected");
            return false;
        }
        
        System.out.println("Security checks passed");
        return true;
    }
    
    @Override
    protected boolean processPaymentTransaction(Payment payment) {
        System.out.println("\nProcessing PayPal transaction...");
        
        // Simulate OAuth flow
        System.out.println("Initiating PayPal OAuth flow...");
        if (!authenticatePayPal(payment)) {
            System.out.println("PayPal authentication failed");
            return false;
        }
        
        // Simulate payment processing
        System.out.println("Processing payment through PayPal...");
        payment.setStatus(PaymentStatus.COMPLETED);
        return true;
    }
    
    @Override
    protected void handlePaymentResponse(Payment payment) {
        System.out.println("\nHandling PayPal payment response...");
        System.out.println("Sending confirmation to PayPal");
        System.out.println("Updating merchant records");
    }
    
    @Override
    protected void updatePaymentStatus(Payment payment) {
        System.out.println("\nUpdating PayPal payment status...");
        System.out.println("Status: " + payment.getStatus());
        System.out.println("Transaction ID: " + payment.getTransactionId());
    }
    
    // Helper methods
    private boolean isValidEmail(String email) {
        return Pattern.matches("^[A-Za-z0-9+_.-]+@(.+)$", email);
    }
    
    private boolean isAccountActive(Payment payment) {
        // Simulate account status check
        return Math.random() > 0.1; // 90% success rate
    }
    
    private boolean verifyPayPalAccount(Payment payment) {
        // Simulate account verification
        return Math.random() > 0.1; // 90% success rate
    }
    
    private boolean isSuspiciousActivity(Payment payment) {
        return payment.getAmount() > 5000;
    }
    
    private boolean authenticatePayPal(Payment payment) {
        // Simulate PayPal OAuth authentication
        return Math.random() > 0.1; // 90% success rate
    }
}

// Test the pattern
public class TemplateMethod {
    public static void main(String[] args) {
        System.out.println("Template Method Pattern Demo - Payment Processing Workflows\n");
        
        // Test credit card payment processing
        Payment creditCardPayment = new CreditCardPayment(1500.0, "USD", "4532015112830366", "12/25", "123");
        
        PaymentProcessor creditCardProcessor = new CreditCardProcessor();
        creditCardProcessor.processPayment(creditCardPayment);
        creditCardPayment.display();
        
        // Test PayPal payment processing
        Payment paypalPayment = new PayPalPayment(500.0, "USD", "test@example.com");
        
        PaymentProcessor paypalProcessor = new PayPalProcessor();
        paypalProcessor.processPayment(paypalPayment);
        paypalPayment.display();
    }
} 