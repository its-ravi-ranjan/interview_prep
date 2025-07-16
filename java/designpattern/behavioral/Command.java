package designpattern.behavioral;

import java.util.Stack;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

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

// Command interface
interface Command {
    boolean execute();
    boolean undo();
}

// Concrete Commands
class ProcessPaymentCommand implements Command {
    private Payment payment;
    private PaymentStatus previousStatus;

    public ProcessPaymentCommand(Payment payment) {
        this.payment = payment;
    }

    @Override
    public boolean execute() {
        System.out.println("\nExecuting Process Payment Command...");
        this.previousStatus = payment.getStatus();
        
        if (payment.validate()) {
            payment.process();
            PaymentLogger.log(payment, "PAYMENT_PROCESSED");
            return true;
        }
        
        payment.setStatus(PaymentStatus.FAILED);
        PaymentLogger.log(payment, "PAYMENT_FAILED");
        return false;
    }

    @Override
    public boolean undo() {
        System.out.println("\nUndoing Process Payment Command...");
        if (previousStatus != null) {
            payment.setStatus(previousStatus);
            PaymentLogger.log(payment, "PAYMENT_UNDONE");
            return true;
        }
        return false;
    }
}

class RefundPaymentCommand implements Command {
    private Payment payment;
    private PaymentStatus previousStatus;

    public RefundPaymentCommand(Payment payment) {
        this.payment = payment;
    }

    @Override
    public boolean execute() {
        System.out.println("\nExecuting Refund Payment Command...");
        this.previousStatus = payment.getStatus();
        
        if (payment.getStatus() == PaymentStatus.COMPLETED) {
            payment.refund();
            PaymentLogger.log(payment, "PAYMENT_REFUNDED");
            return true;
        }
        
        PaymentLogger.log(payment, "REFUND_FAILED");
        return false;
    }

    @Override
    public boolean undo() {
        System.out.println("\nUndoing Refund Payment Command...");
        if (previousStatus != null) {
            payment.setStatus(previousStatus);
            PaymentLogger.log(payment, "REFUND_UNDONE");
            return true;
        }
        return false;
    }
}

// Command History (for undo/redo)
class CommandHistory {
    private Stack<Command> history;
    private Stack<Command> undoStack;

    public CommandHistory() {
        this.history = new Stack<>();
        this.undoStack = new Stack<>();
    }

    public boolean execute(Command command) {
        if (command.execute()) {
            history.push(command);
            undoStack.clear(); // Clear undo stack when new command is executed
            return true;
        }
        return false;
    }

    public boolean undo() {
        if (!history.isEmpty()) {
            Command command = history.pop();
            if (command.undo()) {
                undoStack.push(command);
                return true;
            }
        }
        return false;
    }

    public boolean redo() {
        if (!undoStack.isEmpty()) {
            Command command = undoStack.pop();
            if (command.execute()) {
                history.push(command);
                return true;
            }
        }
        return false;
    }
}

// Command Queue (for async execution)
class CommandQueue {
    private BlockingQueue<Command> queue;
    private boolean isProcessing;

    public CommandQueue() {
        this.queue = new ArrayBlockingQueue<>(100);
        this.isProcessing = false;
    }

    public void addCommand(Command command) {
        try {
            queue.put(command);
            System.out.println("Command added to queue");
            processQueue();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private void processQueue() {
        if (isProcessing || queue.isEmpty()) {
            return;
        }

        isProcessing = true;
        new Thread(() -> {
            while (!queue.isEmpty()) {
                try {
                    Command command = queue.poll(1, TimeUnit.SECONDS);
                    if (command != null) {
                        System.out.println("\nProcessing queued command...");
                        Thread.sleep(1000); // Simulate async processing
                        command.execute();
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
            isProcessing = false;
        }).start();
    }
}

// Test the pattern
public class Command {
    public static void main(String[] args) {
        System.out.println("Command Pattern Demo - Payment Operations\n");
        
        // Create command history
        CommandHistory history = new CommandHistory();
        
        // Create command queue
        CommandQueue queue = new CommandQueue();
        
        // Create a payment
        Payment payment = new CreditCardPayment(1000.0, "USD", "1234567890123456", "12/25", "123");
        
        // Create commands
        Command processCommand = new ProcessPaymentCommand(payment);
        Command refundCommand = new RefundPaymentCommand(payment);
        
        // Execute commands through history
        System.out.println("Executing commands through history...");
        history.execute(processCommand);
        payment.display();
        
        history.execute(refundCommand);
        payment.display();
        
        // Test undo
        System.out.println("\nTesting undo...");
        history.undo();
        payment.display();
        
        // Test redo
        System.out.println("\nTesting redo...");
        history.redo();
        payment.display();
        
        // Test command queue
        System.out.println("\nTesting command queue...");
        Payment queuedPayment = new PayPalPayment(2000.0, "USD", "test@example.com");
        
        Command queuedProcessCommand = new ProcessPaymentCommand(queuedPayment);
        Command queuedRefundCommand = new RefundPaymentCommand(queuedPayment);
        
        queue.addCommand(queuedProcessCommand);
        queue.addCommand(queuedRefundCommand);
        
        // Wait for queue processing to complete
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
} 