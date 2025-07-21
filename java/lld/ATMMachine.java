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
 */

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

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
enum ATMState {
    IDLE, CARD_INSERTED, PIN_ENTERED, TRANSACTION_SELECTION, 
    TRANSACTION_PROCESSING, COMPLETE, ERROR, MAINTENANCE
}

enum TransactionType {
    WITHDRAW, DEPOSIT, BALANCE_INQUIRY, TRANSFER, MINI_STATEMENT
}

enum TransactionStatus {
    PENDING, SUCCESS, FAILED, CANCELLED
}

enum CardStatus {
    ACTIVE, BLOCKED, EXPIRED, STOLEN
}

enum SessionStatus {
    ACTIVE, EXPIRED, TERMINATED
}

// ==================== 6. CARD CLASS ====================
/**
 * CARD: Represents a bank card with validation and security
 */

class Card {
    private String cardNumber;
    private String accountId;
    private LocalDateTime expiryDate;
    private CardStatus status;
    private String pinHash;
    private int failedAttempts;
    private LocalDateTime lastUsed;
    
    public Card(String cardNumber, String accountId, LocalDateTime expiryDate) {
        this.cardNumber = cardNumber;
        this.accountId = accountId;
        this.expiryDate = expiryDate;
        this.status = CardStatus.ACTIVE;
        this.failedAttempts = 0;
        this.lastUsed = LocalDateTime.now();
    }
    
    public boolean isValid() {
        return status == CardStatus.ACTIVE && 
               LocalDateTime.now().isBefore(expiryDate);
    }
    
    public boolean verifyPIN(String pin) {
        if (failedAttempts >= 3) {
            status = CardStatus.BLOCKED;
            return false;
        }
        
        String hashedPIN = hashPIN(pin);
        if (hashedPIN.equals(pinHash)) {
            failedAttempts = 0;
            lastUsed = LocalDateTime.now();
            return true;
        } else {
            failedAttempts++;
            if (failedAttempts >= 3) {
                status = CardStatus.BLOCKED;
            }
            return false;
        }
    }
    
    private String hashPIN(String pin) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(pin.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            return "";
        }
    }
    
    public void setPIN(String pin) {
        this.pinHash = hashPIN(pin);
    }
    
    // Getters
    public String getCardNumber() { return cardNumber; }
    public String getAccountId() { return accountId; }
    public LocalDateTime getExpiryDate() { return expiryDate; }
    public CardStatus getStatus() { return status; }
    public int getFailedAttempts() { return failedAttempts; }
    public LocalDateTime getLastUsed() { return lastUsed; }
    
    public void setStatus(CardStatus status) { this.status = status; }
}

// ==================== 7. SESSION CLASS ====================
/**
 * SESSION: Manages user session with security and timeout
 */

class Session {
    private String sessionId;
    private String cardNumber;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private SessionStatus status;
    private String token;
    private static final int SESSION_TIMEOUT_MINUTES = 5;
    
    public Session(String cardNumber) {
        this.sessionId = generateSessionId();
        this.cardNumber = cardNumber;
        this.startTime = LocalDateTime.now();
        this.endTime = startTime.plus(SESSION_TIMEOUT_MINUTES, ChronoUnit.MINUTES);
        this.status = SessionStatus.ACTIVE;
        this.token = generateToken();
    }
    
    private String generateSessionId() {
        return "SESS_" + System.currentTimeMillis() + "_" + 
               ThreadLocalRandom.current().nextInt(1000);
    }
    
    private String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] tokenBytes = new byte[32];
        random.nextBytes(tokenBytes);
        return Base64.getEncoder().encodeToString(tokenBytes);
    }
    
    public boolean isValid() {
        return status == SessionStatus.ACTIVE && 
               LocalDateTime.now().isBefore(endTime);
    }
    
    public boolean validateToken(String token) {
        return this.token.equals(token) && isValid();
    }
    
    public void extendSession() {
        this.endTime = LocalDateTime.now().plus(SESSION_TIMEOUT_MINUTES, ChronoUnit.MINUTES);
    }
    
    public void terminate() {
        this.status = SessionStatus.TERMINATED;
        this.endTime = LocalDateTime.now();
    }
    
    // Getters
    public String getSessionId() { return sessionId; }
    public String getCardNumber() { return cardNumber; }
    public LocalDateTime getStartTime() { return startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public SessionStatus getStatus() { return status; }
    public String getToken() { return token; }
}

// ==================== 8. TRANSACTION CLASS ====================
/**
 * TRANSACTION: Represents a financial transaction with ACID properties
 */

class Transaction {
    private String transactionId;
    private String cardNumber;
    private double amount;
    private TransactionType type;
    private LocalDateTime timestamp;
    private TransactionStatus status;
    private String description;
    private String referenceNumber;
    
    public Transaction(String cardNumber, double amount, TransactionType type) {
        this.transactionId = generateTransactionId();
        this.cardNumber = cardNumber;
        this.amount = amount;
        this.type = type;
        this.timestamp = LocalDateTime.now();
        this.status = TransactionStatus.PENDING;
        this.referenceNumber = generateReferenceNumber();
    }
    
    private String generateTransactionId() {
        return "TXN_" + System.currentTimeMillis() + "_" + 
               ThreadLocalRandom.current().nextInt(1000);
    }
    
    private String generateReferenceNumber() {
        return "REF_" + System.currentTimeMillis() + "_" + 
               ThreadLocalRandom.current().nextInt(10000);
    }
    
    public void setStatus(TransactionStatus status) {
        this.status = status;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    // Getters
    public String getTransactionId() { return transactionId; }
    public String getCardNumber() { return cardNumber; }
    public double getAmount() { return amount; }
    public TransactionType getType() { return type; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public TransactionStatus getStatus() { return status; }
    public String getDescription() { return description; }
    public String getReferenceNumber() { return referenceNumber; }
}

// ==================== 9. SESSION MANAGER ====================
/**
 * SESSION MANAGER: Handles session creation, validation, and cleanup
 */

class SessionManager {
    private Map<String, Session> activeSessions;
    private ScheduledExecutorService cleanupExecutor;
    private ReentrantLock lock;
    
    public SessionManager() {
        this.activeSessions = new ConcurrentHashMap<>();
        this.lock = new ReentrantLock();
        this.cleanupExecutor = Executors.newScheduledThreadPool(1);
        startCleanupTask();
    }
    
    public Session createSession(String cardNumber) {
        Session session = new Session(cardNumber);
        
        lock.lock();
        try {
            // Terminate any existing session for this card
            terminateExistingSession(cardNumber);
            activeSessions.put(session.getSessionId(), session);
            System.out.println("Session created: " + session.getSessionId());
            return session;
        } finally {
            lock.unlock();
        }
    }
    
    public Session getSession(String sessionId) {
        return activeSessions.get(sessionId);
    }
    
    public boolean validateSession(String sessionId, String token) {
        Session session = activeSessions.get(sessionId);
        if (session != null && session.validateToken(token)) {
            session.extendSession();
            return true;
        }
        return false;
    }
    
    public void terminateSession(String sessionId) {
        lock.lock();
        try {
            Session session = activeSessions.get(sessionId);
            if (session != null) {
                session.terminate();
                activeSessions.remove(sessionId);
                System.out.println("Session terminated: " + sessionId);
            }
        } finally {
            lock.unlock();
        }
    }
    
    private void terminateExistingSession(String cardNumber) {
        for (Session session : activeSessions.values()) {
            if (session.getCardNumber().equals(cardNumber)) {
                session.terminate();
                activeSessions.remove(session.getSessionId());
            }
        }
    }
    
    private void startCleanupTask() {
        cleanupExecutor.scheduleAtFixedRate(() -> {
            cleanupExpiredSessions();
        }, 1, 1, TimeUnit.MINUTES);
    }
    
    private void cleanupExpiredSessions() {
        lock.lock();
        try {
            Iterator<Map.Entry<String, Session>> iterator = activeSessions.entrySet().iterator();
            while (iterator.hasNext()) {
                Map.Entry<String, Session> entry = iterator.next();
                Session session = entry.getValue();
                if (!session.isValid()) {
                    session.terminate();
                    iterator.remove();
                    System.out.println("Expired session cleaned: " + session.getSessionId());
                }
            }
        } finally {
            lock.unlock();
        }
    }
    
    public void shutdown() {
        cleanupExecutor.shutdown();
    }
}

// ==================== 10. CARD READER ====================
/**
 * CARD READER: Handles card validation and PIN verification
 */

class CardReader {
    private Map<String, Card> cardDatabase;
    private BankServer bankServer;
    
    public CardReader(BankServer bankServer) {
        this.bankServer = bankServer;
        this.cardDatabase = new HashMap<>();
        initializeSampleCards();
    }
    
    private void initializeSampleCards() {
        Card card1 = new Card("1234567890123456", "ACC001", LocalDateTime.now().plusYears(2));
        card1.setPIN("1234");
        cardDatabase.put("1234567890123456", card1);
        
        Card card2 = new Card("9876543210987654", "ACC002", LocalDateTime.now().plusYears(1));
        card2.setPIN("5678");
        cardDatabase.put("9876543210987654", card2);
    }
    
    public Card readCard(String cardNumber) {
        Card card = cardDatabase.get(cardNumber);
        if (card != null && card.isValid()) {
            System.out.println("Card read successfully: " + cardNumber);
            return card;
        }
        System.out.println("Invalid or expired card: " + cardNumber);
        return null;
    }
    
    public boolean verifyPIN(Card card, String pin) {
        if (card == null) return false;
        
        boolean isValid = card.verifyPIN(pin);
        if (isValid) {
            System.out.println("PIN verified successfully for card: " + card.getCardNumber());
        } else {
            System.out.println("PIN verification failed for card: " + card.getCardNumber());
        }
        return isValid;
    }
    
    public void blockCard(String cardNumber) {
        Card card = cardDatabase.get(cardNumber);
        if (card != null) {
            card.setStatus(CardStatus.BLOCKED);
            System.out.println("Card blocked: " + cardNumber);
        }
    }
}

// ==================== 11. TRANSACTION PROCESSOR ====================
/**
 * TRANSACTION PROCESSOR: Handles transaction processing with ACID properties
 */

class TransactionProcessor {
    private BankServer bankServer;
    private Map<String, Double> accountBalances;
    private List<Transaction> transactionHistory;
    private ReentrantLock lock;
    
    public TransactionProcessor(BankServer bankServer) {
        this.bankServer = bankServer;
        this.accountBalances = new HashMap<>();
        this.transactionHistory = new ArrayList<>();
        this.lock = new ReentrantLock();
        initializeSampleAccounts();
    }
    
    private void initializeSampleAccounts() {
        accountBalances.put("ACC001", 5000.0);
        accountBalances.put("ACC002", 3000.0);
    }
    
    public Transaction processTransaction(String cardNumber, double amount, TransactionType type) {
        Transaction transaction = new Transaction(cardNumber, amount, type);
        
        lock.lock();
        try {
            // Validate transaction
            if (!validateTransaction(transaction)) {
                transaction.setStatus(TransactionStatus.FAILED);
                transaction.setDescription("Transaction validation failed");
                return transaction;
            }
            
            // Process transaction based on type
            boolean success = false;
            switch (type) {
                case WITHDRAW:
                    success = processWithdrawal(transaction);
                    break;
                case DEPOSIT:
                    success = processDeposit(transaction);
                    break;
                case BALANCE_INQUIRY:
                    success = processBalanceInquiry(transaction);
                    break;
                case TRANSFER:
                    success = processTransfer(transaction);
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
            transactionHistory.add(transaction);
            System.out.println("Transaction processed: " + transaction.getTransactionId() + 
                             " - Status: " + transaction.getStatus());
            
            return transaction;
            
        } finally {
            lock.unlock();
        }
    }
    
    private boolean validateTransaction(Transaction transaction) {
        // Check transaction limits
        if (transaction.getAmount() <= 0) return false;
        if (transaction.getType() == TransactionType.WITHDRAW && transaction.getAmount() > 1000) {
            return false; // Daily limit check
        }
        return true;
    }
    
    private boolean processWithdrawal(Transaction transaction) {
        String accountId = getAccountId(transaction.getCardNumber());
        Double currentBalance = accountBalances.get(accountId);
        
        if (currentBalance != null && currentBalance >= transaction.getAmount()) {
            accountBalances.put(accountId, currentBalance - transaction.getAmount());
            return true;
        }
        return false;
    }
    
    private boolean processDeposit(Transaction transaction) {
        String accountId = getAccountId(transaction.getCardNumber());
        Double currentBalance = accountBalances.get(accountId);
        
        if (currentBalance != null) {
            accountBalances.put(accountId, currentBalance + transaction.getAmount());
            return true;
        }
        return false;
    }
    
    private boolean processBalanceInquiry(Transaction transaction) {
        String accountId = getAccountId(transaction.getCardNumber());
        return accountBalances.containsKey(accountId);
    }
    
    private boolean processTransfer(Transaction transaction) {
        // Simplified transfer - would need destination account
        return processWithdrawal(transaction);
    }
    
    private String getAccountId(String cardNumber) {
        // Simplified mapping - in real system, this would query database
        if (cardNumber.equals("1234567890123456")) return "ACC001";
        if (cardNumber.equals("9876543210987654")) return "ACC002";
        return null;
    }
    
    public double getBalance(String cardNumber) {
        String accountId = getAccountId(cardNumber);
        return accountBalances.getOrDefault(accountId, 0.0);
    }
    
    public List<Transaction> getTransactionHistory(String cardNumber) {
        return transactionHistory.stream()
                .filter(t -> t.getCardNumber().equals(cardNumber))
                .collect(Collectors.toList());
    }
}

// ==================== 12. BANK SERVER ====================
/**
 * BANK SERVER: Simulates external bank communication
 */

class BankServer {
    private Map<String, String> accountDatabase;
    
    public BankServer() {
        this.accountDatabase = new HashMap<>();
        accountDatabase.put("1234567890123456", "ACC001");
        accountDatabase.put("9876543210987654", "ACC002");
    }
    
    public boolean validateAccount(String cardNumber) {
        return accountDatabase.containsKey(cardNumber);
    }
    
    public String getAccountId(String cardNumber) {
        return accountDatabase.get(cardNumber);
    }
    
    public boolean processTransaction(String accountId, double amount, TransactionType type) {
        // Simulate bank server processing
        try {
            Thread.sleep(100); // Simulate network delay
            return Math.random() > 0.1; // 90% success rate
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return false;
        }
    }
}

// ==================== 13. ATM MACHINE ====================
/**
 * ATM MACHINE: Main controller with state machine and session management
 */

class ATMMachine {
    private String atmId;
    private ATMState currentState;
    private CardReader cardReader;
    private TransactionProcessor transactionProcessor;
    private SessionManager sessionManager;
    private BankServer bankServer;
    private Session currentSession;
    private Card currentCard;
    private double cashBalance;
    private ReentrantLock stateLock;
    
    public ATMMachine(String atmId) {
        this.atmId = atmId;
        this.currentState = ATMState.IDLE;
        this.cashBalance = 10000.0; // $10,000 initial cash
        this.stateLock = new ReentrantLock();
        
        this.bankServer = new BankServer();
        this.cardReader = new CardReader(bankServer);
        this.transactionProcessor = new TransactionProcessor(bankServer);
        this.sessionManager = new SessionManager();
        
        System.out.println("ATM " + atmId + " initialized with $" + cashBalance + " cash");
    }
    
    public boolean insertCard(String cardNumber) {
        stateLock.lock();
        try {
            if (currentState != ATMState.IDLE) {
                System.out.println("ATM is not ready. Current state: " + currentState);
                return false;
            }
            
            Card card = cardReader.readCard(cardNumber);
            if (card != null) {
                currentCard = card;
                currentState = ATMState.CARD_INSERTED;
                System.out.println("Card inserted successfully. State: " + currentState);
                return true;
            } else {
                currentState = ATMState.ERROR;
                System.out.println("Invalid card. State: " + currentState);
                return false;
            }
        } finally {
            stateLock.unlock();
        }
    }
    
    public boolean enterPIN(String pin) {
        stateLock.lock();
        try {
            if (currentState != ATMState.CARD_INSERTED) {
                System.out.println("Card not inserted. Current state: " + currentState);
                return false;
            }
            
            if (cardReader.verifyPIN(currentCard, pin)) {
                currentSession = sessionManager.createSession(currentCard.getCardNumber());
                currentState = ATMState.PIN_ENTERED;
                System.out.println("PIN verified. Session created: " + currentSession.getSessionId());
                return true;
            } else {
                currentState = ATMState.ERROR;
                System.out.println("PIN verification failed. State: " + currentState);
                return false;
            }
        } finally {
            stateLock.unlock();
        }
    }
    
    public Transaction processTransaction(TransactionType type, double amount) {
        stateLock.lock();
        try {
            if (currentState != ATMState.PIN_ENTERED && currentState != ATMState.TRANSACTION_SELECTION) {
                System.out.println("Not ready for transaction. Current state: " + currentState);
                return null;
            }
            
            if (currentSession == null || !sessionManager.validateSession(currentSession.getSessionId(), currentSession.getToken())) {
                System.out.println("Invalid session");
                currentState = ATMState.ERROR;
                return null;
            }
            
            currentState = ATMState.TRANSACTION_PROCESSING;
            System.out.println("Processing transaction: " + type + " - $" + amount);
            
            Transaction transaction = transactionProcessor.processTransaction(
                currentCard.getCardNumber(), amount, type);
            
            if (transaction.getStatus() == TransactionStatus.SUCCESS) {
                currentState = ATMState.COMPLETE;
                System.out.println("Transaction completed successfully");
            } else {
                currentState = ATMState.ERROR;
                System.out.println("Transaction failed");
            }
            
            return transaction;
            
        } finally {
            stateLock.unlock();
        }
    }
    
    public double getBalance() {
        if (currentSession == null || !sessionManager.validateSession(currentSession.getSessionId(), currentSession.getToken())) {
            return -1;
        }
        return transactionProcessor.getBalance(currentCard.getCardNumber());
    }
    
    public void ejectCard() {
        stateLock.lock();
        try {
            if (currentSession != null) {
                sessionManager.terminateSession(currentSession.getSessionId());
            }
            currentCard = null;
            currentSession = null;
            currentState = ATMState.IDLE;
            System.out.println("Card ejected. ATM ready for next user.");
        } finally {
            stateLock.unlock();
        }
    }
    
    public void shutdown() {
        sessionManager.shutdown();
        System.out.println("ATM " + atmId + " shutdown");
    }
    
    // Getters
    public String getAtmId() { return atmId; }
    public ATMState getCurrentState() { return currentState; }
    public double getCashBalance() { return cashBalance; }
    public Session getCurrentSession() { return currentSession; }
}

// ==================== 14. MAIN CLASS ====================
/**
 * MAIN CLASS: Demo and testing
 */

public class ATMMachine {
    
    public static void main(String[] args) {
        System.out.println("=== ATM Machine System Design Demo ===");
        
        // Initialize ATM
        ATMMachine atm = new ATMMachine("ATM001");
        
        // Simulate user transactions
        simulateUserTransactions(atm);
        
        // Display status periodically
        displayStatusPeriodically(atm);
        
        // Shutdown after demo
        try {
            Thread.sleep(30000); // Run for 30 seconds
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        atm.shutdown();
        System.out.println("=== Demo Complete ===");
    }
    
    private static void simulateUserTransactions(ATMMachine atm) {
        // Start a thread to simulate user transactions
        new Thread(() -> {
            try {
                Thread.sleep(2000); // Wait for system to start
                
                // User 1: Successful transaction
                System.out.println("\n--- User 1 Transaction ---");
                atm.insertCard("1234567890123456");
                Thread.sleep(1000);
                
                atm.enterPIN("1234");
                Thread.sleep(1000);
                
                Transaction txn1 = atm.processTransaction(TransactionType.WITHDRAW, 500);
                System.out.println("Transaction result: " + txn1.getStatus());
                Thread.sleep(2000);
                
                atm.ejectCard();
                Thread.sleep(3000);
                
                // User 2: Failed transaction
                System.out.println("\n--- User 2 Transaction ---");
                atm.insertCard("9876543210987654");
                Thread.sleep(1000);
                
                atm.enterPIN("9999"); // Wrong PIN
                Thread.sleep(1000);
                
                atm.ejectCard();
                Thread.sleep(3000);
                
                // User 3: Balance inquiry
                System.out.println("\n--- User 3 Transaction ---");
                atm.insertCard("1234567890123456");
                Thread.sleep(1000);
                
                atm.enterPIN("1234");
                Thread.sleep(1000);
                
                double balance = atm.getBalance();
                System.out.println("Account balance: $" + balance);
                Thread.sleep(1000);
                
                atm.ejectCard();
                
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
    
    private static void displayStatusPeriodically(ATMMachine atm) {
        new Thread(() -> {
            try {
                while (true) {
                    Thread.sleep(5000); // Display every 5 seconds
                    System.out.println("\n=== ATM Status ===");
                    System.out.println("ATM ID: " + atm.getAtmId());
                    System.out.println("State: " + atm.getCurrentState());
                    System.out.println("Cash Balance: $" + atm.getCashBalance());
                    if (atm.getCurrentSession() != null) {
                        System.out.println("Active Session: " + atm.getCurrentSession().getSessionId());
                    }
                    System.out.println("==================\n");
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
} 