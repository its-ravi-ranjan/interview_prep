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

const { Payment, PaymentStatus } = require('./PaymentTheme');

// Subject (Observable)
class PaymentSubject {
    constructor() {
        this.observers = new Set();
    }

    attach(observer) {
        this.observers.add(observer);
        console.log(`Observer attached: ${observer.constructor.name}`);
    }

    detach(observer) {
        this.observers.delete(observer);
        console.log(`Observer detached: ${observer.constructor.name}`);
    }

    notify(payment, event) {
        for (const observer of this.observers) {
            observer.update(payment, event);
        }
    }
}

// Concrete Subject
class PaymentProcessor extends PaymentSubject {
    constructor() {
        super();
        this.payments = new Map();
    }

    processPayment(payment) {
        console.log('\nProcessing payment...');
        this.payments.set(payment.transactionId, payment);
        
        // Notify observers about payment initiation
        this.notify(payment, 'PAYMENT_INITIATED');
        
        if (payment.validate()) {
            payment.process();
            this.notify(payment, 'PAYMENT_PROCESSED');
        } else {
            payment.status = PaymentStatus.FAILED;
            this.notify(payment, 'PAYMENT_FAILED');
        }
    }

    refundPayment(payment) {
        console.log('\nProcessing refund...');
        if (payment.status === PaymentStatus.COMPLETED) {
            payment.refund();
            this.notify(payment, 'PAYMENT_REFUNDED');
        } else {
            this.notify(payment, 'REFUND_FAILED');
        }
    }
}

// Observer interface
class PaymentObserver {
    update(payment, event) {
        throw new Error('Method update() must be implemented');
    }
}

// Concrete Observers
class CustomerNotificationObserver extends PaymentObserver {
    constructor() {
        super();
        this.notifications = [];
    }

    update(payment, event) {
        const message = this.createNotificationMessage(payment, event);
        this.notifications.push(message);
        console.log(`\nCustomer Notification: ${message}`);
        
        // In a real system, this would send actual notifications
        switch (event) {
            case 'PAYMENT_PROCESSED':
                this.sendEmail(payment, 'Payment Successful');
                this.sendSMS(payment, 'Payment Successful');
                break;
            case 'PAYMENT_FAILED':
                this.sendEmail(payment, 'Payment Failed');
                this.sendSMS(payment, 'Payment Failed');
                break;
            case 'PAYMENT_REFUNDED':
                this.sendEmail(payment, 'Payment Refunded');
                this.sendSMS(payment, 'Payment Refunded');
                break;
        }
    }

    createNotificationMessage(payment, event) {
        return `${event}: ${payment.amount} ${payment.currency} - ${payment.status}`;
    }

    sendEmail(payment, subject) {
        console.log(`Sending email to customer: ${subject}`);
    }

    sendSMS(payment, message) {
        console.log(`Sending SMS to customer: ${message}`);
    }
}

class MerchantNotificationObserver extends PaymentObserver {
    update(payment, event) {
        console.log(`\nMerchant Notification: ${event} for payment ${payment.transactionId}`);
        console.log(`Amount: ${payment.amount} ${payment.currency}`);
        console.log(`Status: ${payment.status}`);
        
        // In a real system, this would update merchant dashboard
        if (event === 'PAYMENT_PROCESSED') {
            this.updateMerchantDashboard(payment);
        }
    }

    updateMerchantDashboard(payment) {
        console.log('Updating merchant dashboard with new payment');
    }
}

class FraudDetectionObserver extends PaymentObserver {
    constructor() {
        super();
        this.suspiciousTransactions = new Set();
    }

    update(payment, event) {
        if (this.isSuspiciousTransaction(payment)) {
            this.suspiciousTransactions.add(payment.transactionId);
            console.log(`\nFraud Alert: Suspicious transaction detected!`);
            console.log(`Transaction ID: ${payment.transactionId}`);
            console.log(`Amount: ${payment.amount} ${payment.currency}`);
            this.notifyFraudTeam(payment);
        }
    }

    isSuspiciousTransaction(payment) {
        // Simple fraud detection logic
        return payment.amount > 10000 || 
               (payment.paymentMethod === 'CREDIT_CARD' && payment.amount > 5000);
    }

    notifyFraudTeam(payment) {
        console.log('Notifying fraud detection team...');
    }
}

class AnalyticsObserver extends PaymentObserver {
    constructor() {
        super();
        this.analytics = {
            totalProcessed: 0,
            totalAmount: 0,
            failedPayments: 0,
            refundedPayments: 0
        };
    }

    update(payment, event) {
        switch (event) {
            case 'PAYMENT_PROCESSED':
                this.analytics.totalProcessed++;
                this.analytics.totalAmount += payment.amount;
                break;
            case 'PAYMENT_FAILED':
                this.analytics.failedPayments++;
                break;
            case 'PAYMENT_REFUNDED':
                this.analytics.refundedPayments++;
                this.analytics.totalAmount -= payment.amount;
                break;
        }
        
        this.displayAnalytics();
    }

    displayAnalytics() {
        console.log('\nPayment Analytics:');
        console.log('-----------------');
        console.log(`Total Processed: ${this.analytics.totalProcessed}`);
        console.log(`Total Amount: ${this.analytics.totalAmount}`);
        console.log(`Failed Payments: ${this.analytics.failedPayments}`);
        console.log(`Refunded Payments: ${this.analytics.refundedPayments}`);
    }
}

// Test the pattern
function testObserver() {
    console.log('Observer Pattern Demo - Payment Notifications\n');
    
    // Create subject
    const paymentProcessor = new PaymentProcessor();
    
    // Create observers
    const customerNotifier = new CustomerNotificationObserver();
    const merchantNotifier = new MerchantNotificationObserver();
    const fraudDetector = new FraudDetectionObserver();
    const analyticsTracker = new AnalyticsObserver();
    
    // Attach observers
    paymentProcessor.attach(customerNotifier);
    paymentProcessor.attach(merchantNotifier);
    paymentProcessor.attach(fraudDetector);
    paymentProcessor.attach(analyticsTracker);
    
    // Create and process payments
    const payment1 = new Payment(500, 'USD', 'CREDIT_CARD');
    payment1.cardNumber = '1234567890123456';
    payment1.expiryDate = '12/25';
    payment1.cvv = '123';
    
    const payment2 = new Payment(15000, 'USD', 'CREDIT_CARD');
    payment2.cardNumber = '9876543210987654';
    payment2.expiryDate = '12/25';
    payment2.cvv = '456';
    
    // Process payments
    paymentProcessor.processPayment(payment1);
    paymentProcessor.processPayment(payment2);
    
    // Test refund
    paymentProcessor.refundPayment(payment1);
    
    // Detach an observer
    paymentProcessor.detach(merchantNotifier);
    
    // Process another payment (merchant won't be notified)
    const payment3 = new Payment(1000, 'USD', 'PAYPAL');
    payment3.email = 'test@example.com';
    paymentProcessor.processPayment(payment3);
}

// Run the test
testObserver(); 