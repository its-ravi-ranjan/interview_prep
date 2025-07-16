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

const { Payment, PaymentStatus, PaymentLogger } = require('./PaymentTheme');

// Handler interface
class PaymentHandler {
    constructor() {
        this.nextHandler = null;
    }

    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    handle(payment) {
        if (this.nextHandler) {
            return this.nextHandler.handle(payment);
        }
        return true;
    }
}

// Concrete Handlers
class ValidationHandler extends PaymentHandler {
    handle(payment) {
        console.log('\nValidation Handler: Checking payment details...');
        
        if (!payment.validate()) {
            console.log('Validation failed!');
            payment.status = PaymentStatus.FAILED;
            PaymentLogger.log(payment, 'VALIDATION_FAILED');
            return false;
        }
        
        console.log('Validation successful!');
        PaymentLogger.log(payment, 'VALIDATION_SUCCESS');
        return super.handle(payment);
    }
}

class FraudCheckHandler extends PaymentHandler {
    handle(payment) {
        console.log('\nFraud Check Handler: Verifying payment...');
        
        // Simulate fraud check
        const isSuspicious = payment.amount > 10000; // Example: flag large transactions
        
        if (isSuspicious) {
            console.log('Fraud check failed! Transaction amount too high.');
            payment.status = PaymentStatus.FAILED;
            PaymentLogger.log(payment, 'FRAUD_CHECK_FAILED');
            return false;
        }
        
        console.log('Fraud check passed!');
        PaymentLogger.log(payment, 'FRAUD_CHECK_PASSED');
        return super.handle(payment);
    }
}

class PaymentProcessingHandler extends PaymentHandler {
    handle(payment) {
        console.log('\nPayment Processing Handler: Processing payment...');
        
        if (!payment.process()) {
            console.log('Payment processing failed!');
            payment.status = PaymentStatus.FAILED;
            PaymentLogger.log(payment, 'PROCESSING_FAILED');
            return false;
        }
        
        console.log('Payment processed successfully!');
        payment.status = PaymentStatus.COMPLETED;
        PaymentLogger.log(payment, 'PROCESSING_SUCCESS');
        return super.handle(payment);
    }
}

class NotificationHandler extends PaymentHandler {
    handle(payment) {
        console.log('\nNotification Handler: Sending notifications...');
        
        // Send notifications based on payment status
        if (payment.status === PaymentStatus.COMPLETED) {
            console.log('Sending success notifications...');
            // In a real system, this would send actual notifications
            PaymentLogger.log(payment, 'NOTIFICATIONS_SENT');
        } else if (payment.status === PaymentStatus.FAILED) {
            console.log('Sending failure notifications...');
            PaymentLogger.log(payment, 'FAILURE_NOTIFICATIONS_SENT');
        }
        
        return super.handle(payment);
    }
}

// Test the pattern
function testChainOfResponsibility() {
    console.log('Chain of Responsibility Pattern Demo - Payment Processing\n');
    
    // Create the chain
    const validationHandler = new ValidationHandler();
    const fraudCheckHandler = new FraudCheckHandler();
    const paymentProcessingHandler = new PaymentProcessingHandler();
    const notificationHandler = new NotificationHandler();
    
    // Set up the chain
    validationHandler
        .setNext(fraudCheckHandler)
        .setNext(paymentProcessingHandler)
        .setNext(notificationHandler);
    
    // Create a payment
    const payment = new Payment(5000, 'USD', 'CREDIT_CARD');
    payment.cardNumber = '1234567890123456';
    payment.expiryDate = '12/25';
    payment.cvv = '123';
    
    // Process the payment through the chain
    console.log('Starting payment processing chain...');
    const result = validationHandler.handle(payment);
    
    // Display final result
    console.log('\nFinal Payment Status:');
    payment.display();
    console.log('Chain processing result:', result ? 'Success' : 'Failed');
    
    // Test with a suspicious payment
    console.log('\nTesting with a suspicious payment...');
    const suspiciousPayment = new Payment(15000, 'USD', 'CREDIT_CARD');
    suspiciousPayment.cardNumber = '1234567890123456';
    suspiciousPayment.expiryDate = '12/25';
    suspiciousPayment.cvv = '123';
    
    const suspiciousResult = validationHandler.handle(suspiciousPayment);
    console.log('\nSuspicious Payment Status:');
    suspiciousPayment.display();
    console.log('Chain processing result:', suspiciousResult ? 'Success' : 'Failed');
}

// Run the test
testChainOfResponsibility(); 