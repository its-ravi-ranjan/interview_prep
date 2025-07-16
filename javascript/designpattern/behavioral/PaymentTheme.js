/**
 * Common theme for all behavioral design patterns
 * Using a Payment Processing System as the example
 */

// Payment Status enum
const PaymentStatus = Object.freeze({
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED'
});

// Payment Method enum
const PaymentMethod = Object.freeze({
    CREDIT_CARD: 'CREDIT_CARD',
    DEBIT_CARD: 'DEBIT_CARD',
    PAYPAL: 'PAYPAL',
    UPI: 'UPI',
    BANK_TRANSFER: 'BANK_TRANSFER'
});

// Base Payment class
class Payment {
    constructor(amount, currency, paymentMethod) {
        this.amount = amount;
        this.currency = currency;
        this.paymentMethod = paymentMethod;
        this.status = PaymentStatus.PENDING;
        this.transactionId = null;
        this.timestamp = new Date();
    }

    process() {
        throw new Error('Method process() must be implemented');
    }

    validate() {
        throw new Error('Method validate() must be implemented');
    }

    refund() {
        throw new Error('Method refund() must be implemented');
    }

    display() {
        console.log('\nPayment Details:');
        console.log('Amount:', this.amount, this.currency);
        console.log('Method:', this.paymentMethod);
        console.log('Status:', this.status);
        console.log('Transaction ID:', this.transactionId);
        console.log('Timestamp:', this.timestamp);
    }
}

// Concrete Payment classes
class CreditCardPayment extends Payment {
    constructor(amount, currency, cardNumber, expiryDate, cvv) {
        super(amount, currency, PaymentMethod.CREDIT_CARD);
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
    }

    process() {
        console.log('Processing credit card payment...');
        // Simulate processing
        this.status = PaymentStatus.PROCESSING;
        this.transactionId = 'CC-' + Math.random().toString(36).substr(2, 9);
        return true;
    }

    validate() {
        console.log('Validating credit card payment...');
        // Basic validation
        return this.cardNumber.length === 16 && 
               this.expiryDate.length === 5 && 
               this.cvv.length === 3;
    }

    refund() {
        console.log('Processing credit card refund...');
        this.status = PaymentStatus.REFUNDED;
        return true;
    }
}

class PayPalPayment extends Payment {
    constructor(amount, currency, email) {
        super(amount, currency, PaymentMethod.PAYPAL);
        this.email = email;
    }

    process() {
        console.log('Processing PayPal payment...');
        // Simulate processing
        this.status = PaymentStatus.PROCESSING;
        this.transactionId = 'PP-' + Math.random().toString(36).substr(2, 9);
        return true;
    }

    validate() {
        console.log('Validating PayPal payment...');
        // Basic email validation
        return this.email.includes('@') && this.email.includes('.');
    }

    refund() {
        console.log('Processing PayPal refund...');
        this.status = PaymentStatus.REFUNDED;
        return true;
    }
}

class UPIPayment extends Payment {
    constructor(amount, currency, upiId) {
        super(amount, currency, PaymentMethod.UPI);
        this.upiId = upiId;
    }

    process() {
        console.log('Processing UPI payment...');
        // Simulate processing
        this.status = PaymentStatus.PROCESSING;
        this.transactionId = 'UPI-' + Math.random().toString(36).substr(2, 9);
        return true;
    }

    validate() {
        console.log('Validating UPI payment...');
        // Basic UPI ID validation
        return this.upiId.includes('@');
    }

    refund() {
        console.log('Processing UPI refund...');
        this.status = PaymentStatus.REFUNDED;
        return true;
    }
}

// Payment Notification
class PaymentNotification {
    constructor(payment) {
        this.payment = payment;
    }

    sendEmail() {
        console.log(`Sending email notification for payment ${this.payment.transactionId}`);
    }

    sendSMS() {
        console.log(`Sending SMS notification for payment ${this.payment.transactionId}`);
    }

    sendPushNotification() {
        console.log(`Sending push notification for payment ${this.payment.transactionId}`);
    }
}

// Payment Logger
class PaymentLogger {
    static log(payment, action) {
        console.log(`[${new Date().toISOString()}] ${action}: ${payment.paymentMethod} payment ${payment.transactionId}`);
    }
}

module.exports = {
    PaymentStatus,
    PaymentMethod,
    Payment,
    CreditCardPayment,
    PayPalPayment,
    UPIPayment,
    PaymentNotification,
    PaymentLogger
}; 