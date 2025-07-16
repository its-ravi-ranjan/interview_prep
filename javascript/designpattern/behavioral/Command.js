/**
 * Command Pattern Example
 * 
 * Intent: Encapsulate a request as an object, thereby letting you parameterize clients
 * with different requests, queue or log requests, and support undoable operations.
 * 
 * Real-world analogy:
 * Think of a payment processing system where different operations (process, refund, cancel)
 * are encapsulated as commands. This allows us to:
 * 1. Queue payment operations
 * 2. Log all operations
 * 3. Support undo/redo of operations
 * 4. Execute operations asynchronously
 * 5. Support different payment methods uniformly
 */

const { Payment, PaymentStatus, PaymentLogger } = require('./PaymentTheme');

// Command interface
class Command {
    execute() {
        throw new Error('Method execute() must be implemented');
    }
    
    undo() {
        throw new Error('Method undo() must be implemented');
    }
}

// Concrete Commands
class ProcessPaymentCommand extends Command {
    constructor(payment) {
        super();
        this.payment = payment;
        this.previousStatus = null;
    }
    
    execute() {
        console.log('\nExecuting Process Payment Command...');
        this.previousStatus = this.payment.status;
        
        if (this.payment.validate()) {
            this.payment.process();
            PaymentLogger.log(this.payment, 'PAYMENT_PROCESSED');
            return true;
        }
        
        this.payment.status = PaymentStatus.FAILED;
        PaymentLogger.log(this.payment, 'PAYMENT_FAILED');
        return false;
    }
    
    undo() {
        console.log('\nUndoing Process Payment Command...');
        if (this.previousStatus) {
            this.payment.status = this.previousStatus;
            PaymentLogger.log(this.payment, 'PAYMENT_UNDONE');
            return true;
        }
        return false;
    }
}

class RefundPaymentCommand extends Command {
    constructor(payment) {
        super();
        this.payment = payment;
        this.previousStatus = null;
    }
    
    execute() {
        console.log('\nExecuting Refund Payment Command...');
        this.previousStatus = this.payment.status;
        
        if (this.payment.status === PaymentStatus.COMPLETED) {
            this.payment.refund();
            PaymentLogger.log(this.payment, 'PAYMENT_REFUNDED');
            return true;
        }
        
        PaymentLogger.log(this.payment, 'REFUND_FAILED');
        return false;
    }
    
    undo() {
        console.log('\nUndoing Refund Payment Command...');
        if (this.previousStatus) {
            this.payment.status = this.previousStatus;
            PaymentLogger.log(this.payment, 'REFUND_UNDONE');
            return true;
        }
        return false;
    }
}

// Command History (for undo/redo)
class CommandHistory {
    constructor() {
        this.history = [];
        this.undoStack = [];
    }
    
    execute(command) {
        if (command.execute()) {
            this.history.push(command);
            this.undoStack = []; // Clear undo stack when new command is executed
            return true;
        }
        return false;
    }
    
    undo() {
        const command = this.history.pop();
        if (command) {
            if (command.undo()) {
                this.undoStack.push(command);
                return true;
            }
        }
        return false;
    }
    
    redo() {
        const command = this.undoStack.pop();
        if (command) {
            if (command.execute()) {
                this.history.push(command);
                return true;
            }
        }
        return false;
    }
}

// Command Queue (for async execution)
class CommandQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }
    
    addCommand(command) {
        this.queue.push(command);
        console.log('Command added to queue');
        this.processQueue();
    }
    
    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) {
            return;
        }
        
        this.isProcessing = true;
        while (this.queue.length > 0) {
            const command = this.queue.shift();
            console.log('\nProcessing queued command...');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async processing
            command.execute();
        }
        this.isProcessing = false;
    }
}

// Test the pattern
function testCommand() {
    console.log('Command Pattern Demo - Payment Operations\n');
    
    // Create command history
    const history = new CommandHistory();
    
    // Create command queue
    const queue = new CommandQueue();
    
    // Create a payment
    const payment = new Payment(1000, 'USD', 'CREDIT_CARD');
    payment.cardNumber = '1234567890123456';
    payment.expiryDate = '12/25';
    payment.cvv = '123';
    
    // Create commands
    const processCommand = new ProcessPaymentCommand(payment);
    const refundCommand = new RefundPaymentCommand(payment);
    
    // Execute commands through history
    console.log('Executing commands through history...');
    history.execute(processCommand);
    payment.display();
    
    history.execute(refundCommand);
    payment.display();
    
    // Test undo
    console.log('\nTesting undo...');
    history.undo();
    payment.display();
    
    // Test redo
    console.log('\nTesting redo...');
    history.redo();
    payment.display();
    
    // Test command queue
    console.log('\nTesting command queue...');
    const queuedPayment = new Payment(2000, 'USD', 'PAYPAL');
    queuedPayment.email = 'test@example.com';
    
    const queuedProcessCommand = new ProcessPaymentCommand(queuedPayment);
    const queuedRefundCommand = new RefundPaymentCommand(queuedPayment);
    
    queue.addCommand(queuedProcessCommand);
    queue.addCommand(queuedRefundCommand);
}

// Run the test
testCommand(); 