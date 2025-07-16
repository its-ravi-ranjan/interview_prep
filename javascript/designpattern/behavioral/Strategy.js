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

const { Payment, PaymentStatus } = require('./PaymentTheme');

// Strategy interface
class PaymentStrategy {
    validate(payment) {
        throw new Error('Method validate() must be implemented');
    }
    
    process(payment) {
        throw new Error('Method process() must be implemented');
    }
    
    refund(payment) {
        throw new Error('Method refund() must be implemented');
    }
}

// Concrete Strategies
class CreditCardStrategy extends PaymentStrategy {
    validate(payment) {
        console.log('\nValidating credit card payment...');
        
        // Validate card number (Luhn algorithm)
        if (!this.isValidCardNumber(payment.cardNumber)) {
            console.log('Invalid card number');
            return false;
        }
        
        // Validate expiry date
        if (!this.isValidExpiryDate(payment.expiryDate)) {
            console.log('Invalid expiry date');
            return false;
        }
        
        // Validate CVV
        if (!this.isValidCVV(payment.cvv)) {
            console.log('Invalid CVV');
            return false;
        }
        
        console.log('Credit card validation successful');
        return true;
    }
    
    process(payment) {
        console.log('\nProcessing credit card payment...');
        
        // Simulate 3D Secure verification
        if (this.requires3DSecure(payment)) {
            console.log('Initiating 3D Secure verification...');
            if (!this.verify3DSecure(payment)) {
                console.log('3D Secure verification failed');
                return false;
            }
            console.log('3D Secure verification successful');
        }
        
        // Simulate payment gateway processing
        console.log('Processing payment through payment gateway...');
        payment.status = PaymentStatus.COMPLETED;
        return true;
    }
    
    refund(payment) {
        console.log('\nProcessing credit card refund...');
        
        // Simulate refund through payment gateway
        console.log('Processing refund through payment gateway...');
        payment.status = PaymentStatus.REFUNDED;
        return true;
    }
    
    isValidCardNumber(cardNumber) {
        // Simple Luhn algorithm implementation
        const digits = cardNumber.split('').map(Number);
        const lastDigit = digits.pop();
        const sum = digits
            .reverse()
            .map((digit, index) => index % 2 === 0 ? digit * 2 : digit)
            .map(digit => digit > 9 ? digit - 9 : digit)
            .reduce((acc, digit) => acc + digit, 0);
        return (sum + lastDigit) % 10 === 0;
    }
    
    isValidExpiryDate(expiryDate) {
        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        const expMonth = parseInt(month);
        const expYear = parseInt(year);
        
        return expYear > currentYear || 
               (expYear === currentYear && expMonth >= currentMonth);
    }
    
    isValidCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }
    
    requires3DSecure(payment) {
        return payment.amount > 1000;
    }
    
    verify3DSecure(payment) {
        // Simulate 3D Secure verification
        return Math.random() > 0.1; // 90% success rate
    }
}

class PayPalStrategy extends PaymentStrategy {
    validate(payment) {
        console.log('\nValidating PayPal payment...');
        
        // Validate email
        if (!this.isValidEmail(payment.email)) {
            console.log('Invalid PayPal email');
            return false;
        }
        
        // Simulate PayPal account verification
        if (!this.verifyPayPalAccount(payment)) {
            console.log('PayPal account verification failed');
            return false;
        }
        
        console.log('PayPal validation successful');
        return true;
    }
    
    process(payment) {
        console.log('\nProcessing PayPal payment...');
        
        // Simulate OAuth flow
        console.log('Initiating PayPal OAuth flow...');
        if (!this.authenticatePayPal(payment)) {
            console.log('PayPal authentication failed');
            return false;
        }
        
        // Simulate payment processing
        console.log('Processing payment through PayPal...');
        payment.status = PaymentStatus.COMPLETED;
        return true;
    }
    
    refund(payment) {
        console.log('\nProcessing PayPal refund...');
        
        // Simulate refund through PayPal
        console.log('Processing refund through PayPal...');
        payment.status = PaymentStatus.REFUNDED;
        return true;
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    verifyPayPalAccount(payment) {
        // Simulate PayPal account verification
        return Math.random() > 0.1; // 90% success rate
    }
    
    authenticatePayPal(payment) {
        // Simulate PayPal OAuth authentication
        return Math.random() > 0.1; // 90% success rate
    }
}

class UPIStrategy extends PaymentStrategy {
    validate(payment) {
        console.log('\nValidating UPI payment...');
        
        // Validate UPI ID
        if (!this.isValidUPIId(payment.upiId)) {
            console.log('Invalid UPI ID');
            return false;
        }
        
        // Validate QR code
        if (!this.validateQRCode(payment)) {
            console.log('Invalid QR code');
            return false;
        }
        
        console.log('UPI validation successful');
        return true;
    }
    
    process(payment) {
        console.log('\nProcessing UPI payment...');
        
        // Simulate UPI app authentication
        console.log('Initiating UPI app authentication...');
        if (!this.authenticateUPIApp(payment)) {
            console.log('UPI app authentication failed');
            return false;
        }
        
        // Simulate payment processing
        console.log('Processing payment through UPI...');
        payment.status = PaymentStatus.COMPLETED;
        return true;
    }
    
    refund(payment) {
        console.log('\nProcessing UPI refund...');
        
        // Simulate refund through UPI
        console.log('Processing refund through UPI...');
        payment.status = PaymentStatus.REFUNDED;
        return true;
    }
    
    isValidUPIId(upiId) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiId);
    }
    
    validateQRCode(payment) {
        // Simulate QR code validation
        return Math.random() > 0.1; // 90% success rate
    }
    
    authenticateUPIApp(payment) {
        // Simulate UPI app authentication
        return Math.random() > 0.1; // 90% success rate
    }
}

// Context
class PaymentProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    processPayment(payment) {
        console.log('\nProcessing payment with ' + this.strategy.constructor.name);
        
        if (this.strategy.validate(payment)) {
            if (this.strategy.process(payment)) {
                console.log('Payment processed successfully');
                return true;
            }
        }
        
        payment.status = PaymentStatus.FAILED;
        console.log('Payment processing failed');
        return false;
    }
    
    refundPayment(payment) {
        console.log('\nProcessing refund with ' + this.strategy.constructor.name);
        
        if (payment.status === PaymentStatus.COMPLETED) {
            if (this.strategy.refund(payment)) {
                console.log('Refund processed successfully');
                return true;
            }
        }
        
        console.log('Refund processing failed');
        return false;
    }
}

// Test the pattern
function testStrategy() {
    console.log('Strategy Pattern Demo - Payment Processing\n');
    
    // Create payment processor with credit card strategy
    const processor = new PaymentProcessor(new CreditCardStrategy());
    
    // Test credit card payment
    const creditCardPayment = new Payment(1500, 'USD', 'CREDIT_CARD');
    creditCardPayment.cardNumber = '4532015112830366';
    creditCardPayment.expiryDate = '12/25';
    creditCardPayment.cvv = '123';
    
    processor.processPayment(creditCardPayment);
    creditCardPayment.display();
    
    // Test refund
    processor.refundPayment(creditCardPayment);
    creditCardPayment.display();
    
    // Switch to PayPal strategy
    processor.setStrategy(new PayPalStrategy());
    
    // Test PayPal payment
    const paypalPayment = new Payment(500, 'USD', 'PAYPAL');
    paypalPayment.email = 'test@example.com';
    
    processor.processPayment(paypalPayment);
    paypalPayment.display();
    
    // Switch to UPI strategy
    processor.setStrategy(new UPIStrategy());
    
    // Test UPI payment
    const upiPayment = new Payment(200, 'USD', 'UPI');
    upiPayment.upiId = 'user@upi';
    
    processor.processPayment(upiPayment);
    upiPayment.display();
}

// Run the test
testStrategy(); 