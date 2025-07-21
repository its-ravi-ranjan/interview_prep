/**
 * ATM MACHINE SYSTEM DESIGN - AMAZON LLD INTERVIEW ESSENTIALS
 * 
 * 🎯 WHAT TO REMEMBER FOR INTERVIEWS:
 * 1. Session Management: Secure session handling with timeout
 * 2. Card Validation: PIN verification, card status checking
 * 3. Transaction Processing: Atomic operations with rollback
 * 4. State Machine: IDLE → CARD_INSERTED → PIN_ENTERED → TRANSACTION → COMPLETE
 * 5. Security: Encryption, fraud detection, audit logging
 * 
 * 🔑 KEY CONCEPTS:
 * - Session Management: Secure user sessions with automatic timeout
 * - Card Validation: PIN verification, card status, expiry checking
 * - Transaction Processing: Atomic operations with ACID properties
 * - State Machine: Manages ATM states and user flow
 * - Security: Encryption, audit trails, fraud detection
 * 
 * 📊 SYSTEM COMPONENTS:
 * ATMMachine: ✅ Main controller, ✅ State machine, ✅ Session management
 * CardReader: ✅ Card validation, ✅ PIN verification, ✅ Security checks
 * TransactionProcessor: ✅ Transaction handling, ✅ Database operations
 * SessionManager: ✅ Session creation, ✅ Timeout handling, ✅ Security
 * BankServer: ✅ External bank communication, ✅ Account validation
 * 
 * 🔄 STEP-BY-STEP FLOW:
 * 
 * ✅ Step 1: Card Insertion
 * - User inserts card
 * - CardReader validates card format and status
 * - ATM transitions to CARD_INSERTED state
 * 
 * ✅ Step 2: PIN Verification
 * - User enters PIN
 * - CardReader verifies PIN with bank server
 * - Session created on successful verification
 * 
 * ✅ Step 3: Transaction Selection
 * - User selects transaction type
 * - ATM validates user permissions
 * - Transaction amount validation
 * 
 * ✅ Step 4: Transaction Processing
 * - TransactionProcessor handles the operation
 * - Database operations with rollback capability
 * - Receipt generation and cash dispensing
 * 
 * ✅ Step 5: Session Cleanup
 * - Session timeout or user logout
 * - Card ejection and state reset
 * - Audit logging
 * 
 * 📦 Why This Architecture?
 * - Secure: Multi-layer security with encryption and validation
 * - Reliable: ACID transactions with rollback capability
 * - Scalable: Modular design for easy extension
 * - User-friendly: Clear state transitions and error handling
 * 
 * 🧵 CONCURRENCY ARCHITECTURE (KEY INTERVIEW POINT):
 * 
 * 1. **Session-Based Concurrency:**
 *    - Each user gets unique session ID
 *    - Session isolation prevents interference
 *    - Timeout-based session cleanup
 * 
 * 2. **Transaction Isolation:**
 *    - Database transactions with ACID properties
 *    - Pessimistic locking for account updates
 *    - Rollback mechanism for failed transactions
 * 
 * 3. **Security Protection:**
 *    - PIN encryption and secure transmission
 *    - Session token validation
 *    - Audit logging for all operations
 * 
 * 4. **State Machine Protection:**
 *    - Thread-safe state transitions
 *    - Concurrent session handling
 *    - Atomic state updates
 * 
 * 🎯 INTERVIEW ANSWER: "Our ATM system uses session-based concurrency with 
 * ACID transactions, ensuring secure user isolation while maintaining data 
 * consistency and providing comprehensive audit trails."
 * 
 * 📝 NOTE: JavaScript uses single-threaded event loop with async/await for 
 * concurrency, but the session and transaction concepts remain the same.
 */

// ==================== 1. REQUIREMENTS ANALYSIS ====================
/**
 * REQUIREMENTS:
 * 
 * Functional Requirements:
 * 1. Card insertion and validation (magnetic stripe/chip)
 * 2. PIN verification with bank server
 * 3. Multiple transaction types (withdraw, deposit, balance, transfer)
 * 4. Cash dispensing and receipt printing
 * 5. Session management with timeout
 * 6. Transaction history and audit logging
 * 7. Card ejection and return
 * 
 * Non-Functional Requirements:
 * 1. High security (encryption, fraud detection)
 * 2. High availability (99.9% uptime)
 * 3. Low latency (< 3 seconds response time)
 * 4. Concurrent user support
 * 5. Fault tolerance with rollback capability
 * 
 * Security Requirements:
 * 1. PIN encryption and secure transmission
 * 2. Session token validation
 * 3. Transaction limits and fraud detection
 * 4. Audit logging for compliance
 * 5. Card blocking for suspicious activity
 */

// ==================== 2. SEQUENCE DIAGRAM FLOW ====================
/**
 * SEQUENCE DIAGRAM:
 * 
 * User Transaction Flow:
 * User → ATM → CardReader → BankServer → TransactionProcessor → CashDispenser
 * 
 * 1. User inserts card
 * 2. ATM validates card format and status
 * 3. User enters PIN
 * 4. ATM verifies PIN with bank server
 * 5. Session created and user authenticated
 * 6. User selects transaction type
 * 7. ATM validates transaction limits
 * 8. Transaction processed with bank server
 * 9. Cash dispensed (if withdrawal)
 * 10. Receipt printed
 * 11. Session ended and card ejected
 * 
 * Security Flow:
 * - PIN encrypted before transmission
 * - Session token validated for each request
 * - Audit log created for all operations
 * - Fraud detection on suspicious patterns
 */

// ==================== 3. ER DIAGRAM ====================
/**
 * ER DIAGRAM:
 * 
 * Entities:
 * 1. ATM (atm_id, location, status, cash_balance)
 * 2. Card (card_number, account_id, expiry_date, status)
 * 3. Account (account_id, customer_id, balance, account_type)
 * 4. Transaction (transaction_id, card_id, amount, type, timestamp)
 * 5. Session (session_id, card_id, start_time, end_time, status)
 * 6. Customer (customer_id, name, phone, email)
 * 
 * Relationships:
 * - ATM processes multiple Transactions (1:N)
 * - Card belongs to one Account (N:1)
 * - Account has multiple Transactions (1:N)
 * - Session belongs to one Card (N:1)
 * - Customer has multiple Accounts (1:N)
 * 
 * Attributes:
 * - ATM: id, location, status, cashBalance, lastMaintenance
 * - Card: number, accountId, expiryDate, status, pinHash
 * - Account: id, customerId, balance, accountType, dailyLimit
 * - Transaction: id, cardId, amount, type, timestamp, status
 * - Session: id, cardId, startTime, endTime, status, token
 */

// ==================== 4. CLASS DIAGRAM ====================
/**
 * CLASS DIAGRAM:
 * 
 * Core Classes:
 * 1. ATMMachine (Main Controller)
 *    - State machine implementation
 *    - Session management
 *    - Transaction orchestration
 * 
 * 2. CardReader
 *    - Card validation and reading
 *    - PIN verification
 *    - Security checks
 * 
 * 3. TransactionProcessor
 *    - Transaction handling
 *    - Database operations
 *    - Rollback mechanism
 * 
 * 4. SessionManager
 *    - Session creation and validation
 *    - Timeout handling
 *    - Security token management
 * 
 * 5. BankServer
 *    - External bank communication
 *    - Account validation
 *    - Transaction processing
 * 
 * 6. State (Enum)
 *    - IDLE, CARD_INSERTED, PIN_ENTERED, TRANSACTION, COMPLETE, ERROR
 */

// ==================== 5. ENUMS ====================
const ATMState = {
    IDLE: 'IDLE',
    CARD_INSERTED: 'CARD_INSERTED',
    PIN_ENTERED: 'PIN_ENTERED',
    TRANSACTION_SELECTION: 'TRANSACTION_SELECTION',
    TRANSACTION_PROCESSING: 'TRANSACTION_PROCESSING',
    COMPLETE: 'COMPLETE',
    ERROR: 'ERROR',
    MAINTENANCE: 'MAINTENANCE'
};

const TransactionType = {
    WITHDRAW: 'WITHDRAW',
    DEPOSIT: 'DEPOSIT',
    BALANCE_INQUIRY: 'BALANCE_INQUIRY',
    TRANSFER: 'TRANSFER',
    MINI_STATEMENT: 'MINI_STATEMENT'
};

const TransactionStatus = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    CANCELLED: 'CANCELLED'
};

const CardStatus = {
    ACTIVE: 'ACTIVE',
    BLOCKED: 'BLOCKED',
    EXPIRED: 'EXPIRED',
    STOLEN: 'STOLEN'
};

const SessionStatus = {
    ACTIVE: 'ACTIVE',
    EXPIRED: 'EXPIRED',
    TERMINATED: 'TERMINATED'
};

// ==================== 6. CARD CLASS ====================
/**
 * CARD: Represents a bank card with validation and security
 */

class Card {
    constructor(cardNumber, accountId, expiryDate) {
        this.cardNumber = cardNumber;
        this.accountId = accountId;
        this.expiryDate = expiryDate;
        this.status = CardStatus.ACTIVE;
        this.failedAttempts = 0;
        this.lastUsed = new Date();
    }
    
    isValid() {
        return this.status === CardStatus.ACTIVE && 
               new Date() < this.expiryDate;
    }
    
    verifyPIN(pin) {
        if (this.failedAttempts >= 3) {
            this.status = CardStatus.BLOCKED;
            return false;
        }
        
        const hashedPIN = this.hashPIN(pin);
        if (hashedPIN === this.pinHash) {
            this.failedAttempts = 0;
            this.lastUsed = new Date();
            return true;
        } else {
            this.failedAttempts++;
            if (this.failedAttempts >= 3) {
                this.status = CardStatus.BLOCKED;
            }
            return false;
        }
    }
    
    hashPIN(pin) {
        // Simple hash for demo - in real system use crypto
        return btoa(pin + '_salt');
    }
    
    setPIN(pin) {
        this.pinHash = this.hashPIN(pin);
    }
    
    setStatus(status) {
        this.status = status;
    }
}

// ==================== 7. SESSION CLASS ====================
/**
 * SESSION: Manages user session with security and timeout
 */

class Session {
    constructor(cardNumber) {
        this.sessionId = this.generateSessionId();
        this.cardNumber = cardNumber;
        this.startTime = new Date();
        this.endTime = new Date(this.startTime.getTime() + 5 * 60 * 1000); // 5 minutes
        this.status = SessionStatus.ACTIVE;
        this.token = this.generateToken();
    }
    
    generateSessionId() {
        return `SESS_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }
    
    generateToken() {
        // Simple token generation for demo
        return btoa(Date.now() + '_' + Math.random());
    }
    
    isValid() {
        return this.status === SessionStatus.ACTIVE && 
               new Date() < this.endTime;
    }
    
    validateToken(token) {
        return this.token === token && this.isValid();
    }
    
    extendSession() {
        this.endTime = new Date(Date.now() + 5 * 60 * 1000);
    }
    
    terminate() {
        this.status = SessionStatus.TERMINATED;
        this.endTime = new Date();
    }
}

// ==================== 8. TRANSACTION CLASS ====================
/**
 * TRANSACTION: Represents a financial transaction with ACID properties
 */

class Transaction {
    constructor(cardNumber, amount, type) {
        this.transactionId = this.generateTransactionId();
        this.cardNumber = cardNumber;
        this.amount = amount;
        this.type = type;
        this.timestamp = new Date();
        this.status = TransactionStatus.PENDING;
        this.referenceNumber = this.generateReferenceNumber();
    }
    
    generateTransactionId() {
        return `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }
    
    generateReferenceNumber() {
        return `REF_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    }
    
    setStatus(status) {
        this.status = status;
    }
    
    setDescription(description) {
        this.description = description;
    }
}

// ==================== 9. SESSION MANAGER ====================
/**
 * SESSION MANAGER: Handles session creation, validation, and cleanup
 */

class SessionManager {
    constructor() {
        this.activeSessions = new Map();
        this.cleanupInterval = null;
        this.startCleanupTask();
    }
    
    createSession(cardNumber) {
        // Terminate any existing session for this card
        this.terminateExistingSession(cardNumber);
        
        const session = new Session(cardNumber);
        this.activeSessions.set(session.sessionId, session);
        console.log("Session created:", session.sessionId);
        return session;
    }
    
    getSession(sessionId) {
        return this.activeSessions.get(sessionId);
    }
    
    validateSession(sessionId, token) {
        const session = this.activeSessions.get(sessionId);
        if (session && session.validateToken(token)) {
            session.extendSession();
            return true;
        }
        return false;
    }
    
    terminateSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (session) {
            session.terminate();
            this.activeSessions.delete(sessionId);
            console.log("Session terminated:", sessionId);
        }
    }
    
    terminateExistingSession(cardNumber) {
        for (const [sessionId, session] of this.activeSessions) {
            if (session.cardNumber === cardNumber) {
                session.terminate();
                this.activeSessions.delete(sessionId);
            }
        }
    }
    
    startCleanupTask() {
        this.cleanupInterval = setInterval(() => {
            this.cleanupExpiredSessions();
        }, 60000); // Check every minute
    }
    
    cleanupExpiredSessions() {
        for (const [sessionId, session] of this.activeSessions) {
            if (!session.isValid()) {
                session.terminate();
                this.activeSessions.delete(sessionId);
                console.log("Expired session cleaned:", session.sessionId);
            }
        }
    }
    
    shutdown() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }
}

// ==================== 10. CARD READER ====================
/**
 * CARD READER: Handles card validation and PIN verification
 */

class CardReader {
    constructor(bankServer) {
        this.bankServer = bankServer;
        this.cardDatabase = new Map();
        this.initializeSampleCards();
    }
    
    initializeSampleCards() {
        const card1 = new Card("1234567890123456", "ACC001", new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000));
        card1.setPIN("1234");
        this.cardDatabase.set("1234567890123456", card1);
        
        const card2 = new Card("9876543210987654", "ACC002", new Date(Date.now() + 1 * 365 * 24 * 60 * 60 * 1000));
        card2.setPIN("5678");
        this.cardDatabase.set("9876543210987654", card2);
    }
    
    readCard(cardNumber) {
        const card = this.cardDatabase.get(cardNumber);
        if (card && card.isValid()) {
            console.log("Card read successfully:", cardNumber);
            return card;
        }
        console.log("Invalid or expired card:", cardNumber);
        return null;
    }
    
    verifyPIN(card, pin) {
        if (!card) return false;
        
        const isValid = card.verifyPIN(pin);
        if (isValid) {
            console.log("PIN verified successfully for card:", card.cardNumber);
        } else {
            console.log("PIN verification failed for card:", card.cardNumber);
        }
        return isValid;
    }
    
    blockCard(cardNumber) {
        const card = this.cardDatabase.get(cardNumber);
        if (card) {
            card.setStatus(CardStatus.BLOCKED);
            console.log("Card blocked:", cardNumber);
        }
    }
}

// ==================== 11. TRANSACTION PROCESSOR ====================
/**
 * TRANSACTION PROCESSOR: Handles transaction processing with ACID properties
 */

class TransactionProcessor {
    constructor(bankServer) {
        this.bankServer = bankServer;
        this.accountBalances = new Map();
        this.transactionHistory = [];
        this.initializeSampleAccounts();
    }
    
    initializeSampleAccounts() {
        this.accountBalances.set("ACC001", 5000.0);
        this.accountBalances.set("ACC002", 3000.0);
    }
    
    async processTransaction(cardNumber, amount, type) {
        const transaction = new Transaction(cardNumber, amount, type);
        
        // Validate transaction
        if (!this.validateTransaction(transaction)) {
            transaction.setStatus(TransactionStatus.FAILED);
            transaction.setDescription("Transaction validation failed");
            return transaction;
        }
        
        // Process transaction based on type
        let success = false;
        switch (type) {
            case TransactionType.WITHDRAW:
                success = this.processWithdrawal(transaction);
                break;
            case TransactionType.DEPOSIT:
                success = this.processDeposit(transaction);
                break;
            case TransactionType.BALANCE_INQUIRY:
                success = this.processBalanceInquiry(transaction);
                break;
            case TransactionType.TRANSFER:
                success = this.processTransfer(transaction);
                break;
        }
        
        if (success) {
            transaction.setStatus(TransactionStatus.SUCCESS);
            transaction.setDescription("Transaction completed successfully");
        } else {
            transaction.setStatus(TransactionStatus.FAILED);
            transaction.setDescription("Transaction processing failed");
        }
        
        // Log transaction
        this.transactionHistory.push(transaction);
        console.log("Transaction processed:", transaction.transactionId, "- Status:", transaction.status);
        
        return transaction;
    }
    
    validateTransaction(transaction) {
        // Check transaction limits
        if (transaction.amount <= 0) return false;
        if (transaction.type === TransactionType.WITHDRAW && transaction.amount > 1000) {
            return false; // Daily limit check
        }
        return true;
    }
    
    processWithdrawal(transaction) {
        const accountId = this.getAccountId(transaction.cardNumber);
        const currentBalance = this.accountBalances.get(accountId);
        
        if (currentBalance !== undefined && currentBalance >= transaction.amount) {
            this.accountBalances.set(accountId, currentBalance - transaction.amount);
            return true;
        }
        return false;
    }
    
    processDeposit(transaction) {
        const accountId = this.getAccountId(transaction.cardNumber);
        const currentBalance = this.accountBalances.get(accountId);
        
        if (currentBalance !== undefined) {
            this.accountBalances.set(accountId, currentBalance + transaction.amount);
            return true;
        }
        return false;
    }
    
    processBalanceInquiry(transaction) {
        const accountId = this.getAccountId(transaction.cardNumber);
        return this.accountBalances.has(accountId);
    }
    
    processTransfer(transaction) {
        // Simplified transfer - would need destination account
        return this.processWithdrawal(transaction);
    }
    
    getAccountId(cardNumber) {
        // Simplified mapping - in real system, this would query database
        if (cardNumber === "1234567890123456") return "ACC001";
        if (cardNumber === "9876543210987654") return "ACC002";
        return null;
    }
    
    getBalance(cardNumber) {
        const accountId = this.getAccountId(cardNumber);
        return this.accountBalances.get(accountId) || 0.0;
    }
    
    getTransactionHistory(cardNumber) {
        return this.transactionHistory.filter(t => t.cardNumber === cardNumber);
    }
}

// ==================== 12. BANK SERVER ====================
/**
 * BANK SERVER: Simulates external bank communication
 */

class BankServer {
    constructor() {
        this.accountDatabase = new Map();
        this.accountDatabase.set("1234567890123456", "ACC001");
        this.accountDatabase.set("9876543210987654", "ACC002");
    }
    
    validateAccount(cardNumber) {
        return this.accountDatabase.has(cardNumber);
    }
    
    getAccountId(cardNumber) {
        return this.accountDatabase.get(cardNumber);
    }
    
    async processTransaction(accountId, amount, type) {
        // Simulate bank server processing
        await this.sleep(100); // Simulate network delay
        return Math.random() > 0.1; // 90% success rate
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ==================== 13. ATM MACHINE ====================
/**
 * ATM MACHINE: Main controller with state machine and session management
 */

class ATMMachine {
    constructor(atmId) {
        this.atmId = atmId;
        this.currentState = ATMState.IDLE;
        this.cashBalance = 10000.0; // $10,000 initial cash
        this.processing = false;
        
        this.bankServer = new BankServer();
        this.cardReader = new CardReader(this.bankServer);
        this.transactionProcessor = new TransactionProcessor(this.bankServer);
        this.sessionManager = new SessionManager();
        
        this.currentSession = null;
        this.currentCard = null;
        
        console.log("ATM", atmId, "initialized with $", this.cashBalance, "cash");
    }
    
    async insertCard(cardNumber) {
        if (this.processing) return false;
        
        if (this.currentState !== ATMState.IDLE) {
            console.log("ATM is not ready. Current state:", this.currentState);
            return false;
        }
        
        const card = this.cardReader.readCard(cardNumber);
        if (card) {
            this.currentCard = card;
            this.currentState = ATMState.CARD_INSERTED;
            console.log("Card inserted successfully. State:", this.currentState);
            return true;
        } else {
            this.currentState = ATMState.ERROR;
            console.log("Invalid card. State:", this.currentState);
            return false;
        }
    }
    
    async enterPIN(pin) {
        if (this.processing) return false;
        
        if (this.currentState !== ATMState.CARD_INSERTED) {
            console.log("Card not inserted. Current state:", this.currentState);
            return false;
        }
        
        if (this.cardReader.verifyPIN(this.currentCard, pin)) {
            this.currentSession = this.sessionManager.createSession(this.currentCard.cardNumber);
            this.currentState = ATMState.PIN_ENTERED;
            console.log("PIN verified. Session created:", this.currentSession.sessionId);
            return true;
        } else {
            this.currentState = ATMState.ERROR;
            console.log("PIN verification failed. State:", this.currentState);
            return false;
        }
    }
    
    async processTransaction(type, amount) {
        if (this.processing) return null;
        
        if (this.currentState !== ATMState.PIN_ENTERED && this.currentState !== ATMState.TRANSACTION_SELECTION) {
            console.log("Not ready for transaction. Current state:", this.currentState);
            return null;
        }
        
        if (!this.currentSession || !this.sessionManager.validateSession(this.currentSession.sessionId, this.currentSession.token)) {
            console.log("Invalid session");
            this.currentState = ATMState.ERROR;
            return null;
        }
        
        this.processing = true;
        this.currentState = ATMState.TRANSACTION_PROCESSING;
        console.log("Processing transaction:", type, "- $", amount);
        
        try {
            const transaction = await this.transactionProcessor.processTransaction(
                this.currentCard.cardNumber, amount, type);
            
            if (transaction.status === TransactionStatus.SUCCESS) {
                this.currentState = ATMState.COMPLETE;
                console.log("Transaction completed successfully");
            } else {
                this.currentState = ATMState.ERROR;
                console.log("Transaction failed");
            }
            
            return transaction;
        } finally {
            this.processing = false;
        }
    }
    
    getBalance() {
        if (!this.currentSession || !this.sessionManager.validateSession(this.currentSession.sessionId, this.currentSession.token)) {
            return -1;
        }
        return this.transactionProcessor.getBalance(this.currentCard.cardNumber);
    }
    
    ejectCard() {
        if (this.currentSession) {
            this.sessionManager.terminateSession(this.currentSession.sessionId);
        }
        this.currentCard = null;
        this.currentSession = null;
        this.currentState = ATMState.IDLE;
        console.log("Card ejected. ATM ready for next user.");
    }
    
    shutdown() {
        this.sessionManager.shutdown();
        console.log("ATM", this.atmId, "shutdown");
    }
}

// ==================== 14. MAIN EXECUTION ====================
/**
 * MAIN EXECUTION: Demo and testing
 */

async function runATMDemo() {
    console.log("=== ATM Machine System Design Demo ===");
    
    // Initialize ATM
    const atm = new ATMMachine("ATM001");
    
    // Simulate user transactions
    simulateUserTransactions(atm);
    
    // Display status periodically
    displayStatusPeriodically(atm);
    
    // Shutdown after demo
    setTimeout(() => {
        atm.shutdown();
        console.log("=== Demo Complete ===");
    }, 30000); // Run for 30 seconds
}

async function simulateUserTransactions(atm) {
    // Wait for system to start
    await sleep(2000);
    
    // User 1: Successful transaction
    console.log("\n--- User 1 Transaction ---");
    await atm.insertCard("1234567890123456");
    await sleep(1000);
    
    await atm.enterPIN("1234");
    await sleep(1000);
    
    const txn1 = await atm.processTransaction(TransactionType.WITHDRAW, 500);
    console.log("Transaction result:", txn1.status);
    await sleep(2000);
    
    atm.ejectCard();
    await sleep(3000);
    
    // User 2: Failed transaction
    console.log("\n--- User 2 Transaction ---");
    await atm.insertCard("9876543210987654");
    await sleep(1000);
    
    await atm.enterPIN("9999"); // Wrong PIN
    await sleep(1000);
    
    atm.ejectCard();
    await sleep(3000);
    
    // User 3: Balance inquiry
    console.log("\n--- User 3 Transaction ---");
    await atm.insertCard("1234567890123456");
    await sleep(1000);
    
    await atm.enterPIN("1234");
    await sleep(1000);
    
    const balance = atm.getBalance();
    console.log("Account balance: $", balance);
    await sleep(1000);
    
    atm.ejectCard();
}

function displayStatusPeriodically(atm) {
    setInterval(() => {
        console.log("\n=== ATM Status ===");
        console.log("ATM ID:", atm.atmId);
        console.log("State:", atm.currentState);
        console.log("Cash Balance: $", atm.cashBalance);
        if (atm.currentSession) {
            console.log("Active Session:", atm.currentSession.sessionId);
        }
        console.log("==================\n");
    }, 5000); // Display every 5 seconds
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the demo
runATMDemo(); 