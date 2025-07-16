package designpattern.behavioral;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.regex.Pattern;

/**
 * Strategy Pattern Example
 * 
 * Intent: Define a family of algorithms, encapsulate each one, and make them interchangeable.
 * Strategy lets the algorithm vary independently from clients that use it.
 * 
 * Real-world analogy:
 * Think of a payment processing system where different payment methods
 * require different processing strategies:
 * 1. Credit Card processing with 3D Secure
 * 2. PayPal processing with OAuth
 * 3. UPI processing with QR code
 * 4. Bank Transfer processing with account verification
 * Each strategy encapsulates its own validation, processing, and security requirements.
 */

// Strategy interface
interface PaymentStrategy {
    boolean validate(Payment payment);
    boolean process(Payment payment);
    boolean refund(Payment payment);
}

// Concrete Strategies
class CreditCardStrategy implements PaymentStrategy {
    @Override
    public boolean validate(Payment payment) {
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
    public boolean process(Payment payment) {
        System.out.println("\nProcessing credit card payment...");
        
        // Simulate 3D Secure verification
        if (requires3DSecure(payment)) {
            System.out.println("Initiating 3D Secure verification...");
            if (!verify3DSecure(payment)) {
                System.out.println("3D Secure verification failed");
                return false;
            }
            System.out.println("3D Secure verification successful");
        }
        
        // Simulate payment gateway processing
        System.out.println("Processing payment through payment gateway...");
        payment.setStatus(PaymentStatus.COMPLETED);
        return true;
    }
    
    @Override
    public boolean refund(Payment payment) {
        System.out.println("\nProcessing credit card refund...");
        
        // Simulate refund through payment gateway
        System.out.println("Processing refund through payment gateway...");
        payment.setStatus(PaymentStatus.REFUNDED);
        return true;
    }
    
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
}

class PayPalStrategy implements PaymentStrategy {
    @Override
    public boolean validate(Payment payment) {
        System.out.println("\nValidating PayPal payment...");
        
        // Validate email
        if (!isValidEmail(payment.getEmail())) {
            System.out.println("Invalid PayPal email");
            return false;
        }
        
        // Simulate PayPal account verification
        if (!verifyPayPalAccount(payment)) {
            System.out.println("PayPal account verification failed");
            return false;
        }
        
        System.out.println("PayPal validation successful");
        return true;
    }
    
    @Override
    public boolean process(Payment payment) {
        System.out.println("\nProcessing PayPal payment...");
        
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
    public boolean refund(Payment payment) {
        System.out.println("\nProcessing PayPal refund...");
        
        // Simulate refund through PayPal
        System.out.println("Processing refund through PayPal...");
        payment.setStatus(PaymentStatus.REFUNDED);
        return true;
    }
    
    private boolean isValidEmail(String email) {
        return Pattern.matches("^[A-Za-z0-9+_.-]+@(.+)$", email);
    }
    
    private boolean verifyPayPalAccount(Payment payment) {
        // Simulate PayPal account verification
        return Math.random() > 0.1; // 90% success rate
    }
    
    private boolean authenticatePayPal(Payment payment) {
        // Simulate PayPal OAuth authentication
        return Math.random() > 0.1; // 90% success rate
    }
}

class UPIStrategy implements PaymentStrategy {
    @Override
    public boolean validate(Payment payment) {
        System.out.println("\nValidating UPI payment...");
        
        // Validate UPI ID
        if (!isValidUPIId(payment.getUpiId())) {
            System.out.println("Invalid UPI ID");
            return false;
        }
        
        // Validate QR code
        if (!validateQRCode(payment)) {
            System.out.println("Invalid QR code");
            return false;
        }
        
        System.out.println("UPI validation successful");
        return true;
    }
    
    @Override
    public boolean process(Payment payment) {
        System.out.println("\nProcessing UPI payment...");
        
        // Simulate UPI app authentication
        System.out.println("Initiating UPI app authentication...");
        if (!authenticateUPIApp(payment)) {
            System.out.println("UPI app authentication failed");
            return false;
        }
        
        // Simulate payment processing
        System.out.println("Processing payment through UPI...");
        payment.setStatus(PaymentStatus.COMPLETED);
        return true;
    }
    
    @Override
    public boolean refund(Payment payment) {
        System.out.println("\nProcessing UPI refund...");
        
        // Simulate refund through UPI
        System.out.println("Processing refund through UPI...");
        payment.setStatus(PaymentStatus.REFUNDED);
        return true;
    }
    
    private boolean isValidUPIId(String upiId) {
        return Pattern.matches("^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$", upiId);
    }
    
    private boolean validateQRCode(Payment payment) {
        // Simulate QR code validation
        return Math.random() > 0.1; // 90% success rate
    }
    
    private boolean authenticateUPIApp(Payment payment) {
        // Simulate UPI app authentication
        return Math.random() > 0.1; // 90% success rate
    }
}

// Context
class PaymentProcessor {
    private PaymentStrategy strategy;
    
    public PaymentProcessor(PaymentStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }
    
    public boolean processPayment(Payment payment) {
        System.out.println("\nProcessing payment with " + strategy.getClass().getSimpleName());
        
        if (strategy.validate(payment)) {
            if (strategy.process(payment)) {
                System.out.println("Payment processed successfully");
                return true;
            }
        }
        
        payment.setStatus(PaymentStatus.FAILED);
        System.out.println("Payment processing failed");
        return false;
    }
    
    public boolean refundPayment(Payment payment) {
        System.out.println("\nProcessing refund with " + strategy.getClass().getSimpleName());
        
        if (payment.getStatus() == PaymentStatus.COMPLETED) {
            if (strategy.refund(payment)) {
                System.out.println("Refund processed successfully");
                return true;
            }
        }
        
        System.out.println("Refund processing failed");
        return false;
    }
}

// Test the pattern
public class Strategy {
    public static void main(String[] args) {
        System.out.println("Strategy Pattern Demo - Payment Processing\n");
        
        // Create payment processor with credit card strategy
        PaymentProcessor processor = new PaymentProcessor(new CreditCardStrategy());
        
        // Test credit card payment
        Payment creditCardPayment = new CreditCardPayment(1500.0, "USD", "4532015112830366", "12/25", "123");
        
        processor.processPayment(creditCardPayment);
        creditCardPayment.display();
        
        // Test refund
        processor.refundPayment(creditCardPayment);
        creditCardPayment.display();
        
        // Switch to PayPal strategy
        processor.setStrategy(new PayPalStrategy());
        
        // Test PayPal payment
        Payment paypalPayment = new PayPalPayment(500.0, "USD", "test@example.com");
        
        processor.processPayment(paypalPayment);
        paypalPayment.display();
        
        // Switch to UPI strategy
        processor.setStrategy(new UPIStrategy());
        
        // Test UPI payment
        Payment upiPayment = new UPIPayment(200.0, "USD", "user@upi");
        
        processor.processPayment(upiPayment);
        upiPayment.display();
    }
} 