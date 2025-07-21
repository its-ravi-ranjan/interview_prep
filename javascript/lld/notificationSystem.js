/**
 * NOTIFICATION SYSTEM DESIGN - AMAZON LLD INTERVIEW ESSENTIALS
 * 
 * 🎯 WHAT TO REMEMBER FOR INTERVIEWS:
 * 1. Observer Pattern: Publishers and Subscribers for loose coupling
 * 2. Strategy Pattern: Encapsulates different notification algorithms
 * 3. Retry Queues: Dead Letter Queue (DLQ) for failed notifications
 * 4. Multiple Channels: Email, SMS, Push, In-App notifications
 * 5. Rate Limiting: Prevent notification spam and abuse
 * 6. Template Engine: Dynamic content generation with personalization
 * 
 * 🔑 KEY CONCEPTS:
 * - Observer Pattern: Decouples notification sending from business logic
 * - Strategy Pattern: Encapsulates different notification algorithms as interchangeable strategies
 * - Retry Mechanism: Exponential backoff with DLQ for failed notifications
 * - Channel Abstraction: Unified interface for different notification types
 * - Template System: Dynamic content with user personalization
 * - Rate Limiting: Prevents notification abuse and ensures delivery
 * 
 * 📊 SYSTEM COMPONENTS:
 * NotificationService: ✅ Main orchestrator, ✅ Observer pattern, ✅ Retry logic
 * NotificationStrategy: ✅ Strategy pattern, ✅ Email, SMS, Push implementations
 * StrategyFactory: ✅ Factory pattern for strategy creation
 * NotificationContext: ✅ Context class for strategy execution
 * TemplateEngine: ✅ Dynamic content generation, ✅ Personalization
 * RetryQueue: ✅ Failed notification handling, ✅ Exponential backoff
 * RateLimiter: ✅ User-based rate limiting, ✅ Channel-specific limits
 * 
 * 🔄 STEP-BY-STEP FLOW:
 * 
 * ✅ Step 1: Event Trigger
 * - Business event occurs (order placed, payment failed, etc.)
 * - Event published to notification system
 * - Observer pattern triggers notification creation
 * 
 * ✅ Step 2: Template Processing
 * - TemplateEngine selects appropriate template
 * - Personalizes content with user data
 * - Validates content and formatting
 * 
 * ✅ Step 3: Strategy Selection
 * - Determines optimal notification strategies
 * - Checks user preferences and settings
 * - Applies rate limiting rules
 * 
 * ✅ Step 4: Notification Delivery
 * - Sends to selected strategies
 * - Handles delivery failures
 * - Logs delivery status
 * 
 * ✅ Step 5: Retry Processing
 * - Failed notifications go to retry queue
 * - Exponential backoff for retries
 * - Dead Letter Queue for permanent failures
 * 
 * 📦 Why This Architecture?
 * - Scalable: Observer pattern allows easy addition of new notification types
 * - Flexible: Strategy pattern makes it easy to add new notification channels
 * - Reliable: Retry queues ensure delivery even with temporary failures
 * - User-friendly: Personalized content and preference management
 * 
 * 🧵 CONCURRENCY ARCHITECTURE (KEY INTERVIEW POINT):
 * 
 * 1. **Observer Pattern Implementation:**
 *    - Publishers and Subscribers for loose coupling
 *    - Event-driven architecture for scalability
 *    - Asynchronous notification processing
 * 
 * 2. **Strategy Pattern Implementation:**
 *    - Encapsulates different notification algorithms
 *    - Runtime strategy switching capability
 *    - Factory pattern for strategy creation
 *    - Context class for strategy execution
 * 
 * 3. **Retry Queue Management:**
 *    - Dead Letter Queue (DLQ) for failed notifications
 *    - Exponential backoff strategy
 *    - Persistent queue storage
 * 
 * 4. **Channel Concurrency:**
 *    - Multiple strategies process independently
 *    - Thread pools for each strategy type
 *    - Rate limiting per user and strategy
 * 
 * 5. **Template Processing:**
 *    - Thread-safe template engine
 *    - Concurrent personalization processing
 *    - Cached templates for performance
 * 
 * 🎯 INTERVIEW ANSWER: "Our notification system uses Observer pattern for 
 * loose coupling and Strategy pattern for notification channels. The Strategy 
 * pattern encapsulates different notification algorithms (Email, SMS, Push) 
 * as interchangeable strategies, making it easy to add new channels without 
 * modifying existing code. Retry queues ensure reliable delivery with 
 * exponential backoff."
 * 
 * 📝 NOTE: JavaScript uses single-threaded event loop with async/await for 
 * concurrency, but the Observer pattern and Strategy pattern concepts remain the same.
 */

// ==================== 1. REQUIREMENTS ANALYSIS ====================
/**
 * REQUIREMENTS:
 * 
 * Functional Requirements:
 * 1. Support multiple notification channels (Email, SMS, Push, In-App)
 * 2. Template-based content generation with personalization
 * 3. User preference management (opt-in/opt-out per channel)
 * 4. Retry mechanism for failed notifications
 * 5. Rate limiting to prevent spam
 * 6. Delivery status tracking and reporting
 * 7. Bulk notification support
 * 
 * Non-Functional Requirements:
 * 1. High availability (99.9% uptime)
 * 2. Low latency (< 2 seconds for immediate notifications)
 * 3. Scalable to handle millions of notifications per day
 * 4. Fault-tolerant with graceful degradation
 * 5. Real-time delivery status updates
 * 
 * Technical Requirements:
 * 1. Observer pattern for loose coupling
 * 2. Retry queues with exponential backoff
 * 3. Template engine for dynamic content
 * 4. Rate limiting per user and channel
 * 5. Audit logging for compliance
 */

// ==================== 2. SEQUENCE DIAGRAM FLOW ====================
/**
 * SEQUENCE DIAGRAM:
 * 
 * Notification Flow:
 * Event → NotificationService → TemplateEngine → ChannelManager → Delivery → Status
 * 
 * 1. Business event occurs (order placed, payment failed)
 * 2. Event published to NotificationService
 * 3. Observer pattern triggers notification creation
 * 4. TemplateEngine processes template with user data
 * 5. ChannelManager selects appropriate channels
 * 6. Rate limiter validates request
 * 7. Notification sent to selected channels
 * 8. Delivery status logged and tracked
 * 9. Failed notifications sent to retry queue
 * 
 * Retry Flow:
 * Failed Notification → RetryQueue → Exponential Backoff → Retry → Success/Failure
 * 
 * 1. Notification delivery fails
 * 2. Added to retry queue with backoff time
 * 3. Retry processor picks up after delay
 * 4. Attempts redelivery with updated retry count
 * 5. Success: Removed from queue
 * 6. Failure: Moved to DLQ after max retries
 */

// ==================== 3. ER DIAGRAM ====================
/**
 * ER DIAGRAM:
 * 
 * Entities:
 * 1. User (user_id, email, phone, preferences)
 * 2. Notification (notification_id, user_id, type, content, status)
 * 3. Template (template_id, name, content, variables, channel_type)
 * 4. Channel (channel_id, type, config, status)
 * 5. DeliveryLog (log_id, notification_id, channel_id, status, timestamp)
 * 6. RetryQueue (queue_id, notification_id, retry_count, next_retry_time)
 * 
 * Relationships:
 * - User has multiple Notifications (1:N)
 * - Notification uses one Template (N:1)
 * - Template supports multiple Channels (1:N)
 * - Notification has multiple DeliveryLogs (1:N)
 * - Failed Notifications go to RetryQueue (1:N)
 * 
 * Attributes:
 * - User: id, email, phone, preferences, createdAt
 * - Notification: id, userId, type, content, status, priority, createdAt
 * - Template: id, name, content, variables, channelType, isActive
 * - Channel: id, type, config, status, rateLimit, lastUsed
 * - DeliveryLog: id, notificationId, channelId, status, timestamp, errorMessage
 * - RetryQueue: id, notificationId, retryCount, nextRetryTime, maxRetries
 */

// ==================== 4. CLASS DIAGRAM ====================
/**
 * CLASS DIAGRAM:
 * 
 * Core Classes:
 * 1. NotificationService (Main Controller)
 *    - Observer pattern implementation
 *    - Notification orchestration
 *    - Template and channel management
 * 
 * 2. NotificationChannel (Abstract)
 *    - Channel interface
 *    - EmailChannel, SMSChannel, PushChannel implementations
 * 
 * 3. TemplateEngine
 *    - Template processing and personalization
 *    - Variable substitution
 *    - Content validation
 * 
 * 4. RetryQueue
 *    - Failed notification handling
 *    - Exponential backoff logic
 *    - Dead Letter Queue management
 * 
 * 5. RateLimiter
 *    - User-based rate limiting
 *    - Channel-specific limits
 *    - Token bucket algorithm
 * 
 * 6. Observer Pattern
 *    - Subject (EventPublisher)
 *    - Observer (NotificationHandler)
 *    - Event (NotificationEvent)
 */

// ==================== 5. ENUMS ====================
const NotificationType = {
    EMAIL: 'EMAIL',
    SMS: 'SMS',
    PUSH: 'PUSH',
    IN_APP: 'IN_APP',
    WEBHOOK: 'WEBHOOK'
};

const NotificationStatus = {
    PENDING: 'PENDING',
    SENT: 'SENT',
    DELIVERED: 'DELIVERED',
    FAILED: 'FAILED',
    RETRYING: 'RETRYING',
    CANCELLED: 'CANCELLED'
};

const NotificationPriority = {
    LOW: 'LOW',
    NORMAL: 'NORMAL',
    HIGH: 'HIGH',
    URGENT: 'URGENT'
};

const ChannelStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    MAINTENANCE: 'MAINTENANCE',
    RATE_LIMITED: 'RATE_LIMITED'
};

const RetryStatus = {
    PENDING: 'PENDING',
    RETRYING: 'RETRYING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    MOVED_TO_DLQ: 'MOVED_TO_DLQ'
};

// ==================== 6. NOTIFICATION EVENT ====================
/**
 * NOTIFICATION EVENT: Represents a notification event with all necessary data
 */

class NotificationEvent {
    constructor(userId, type, templateName, data = {}) {
        this.eventId = this.generateEventId();
        this.userId = userId;
        this.type = type;
        this.templateName = templateName;
        this.data = data;
        this.priority = NotificationPriority.NORMAL;
        this.channels = new Set();
        this.createdAt = new Date();
    }
    
    generateEventId() {
        return `EVENT_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }
    
    addChannel(channel) {
        this.channels.add(channel);
    }
    
    setPriority(priority) {
        this.priority = priority;
    }
}

// ==================== 7. NOTIFICATION ====================
/**
 * NOTIFICATION: Represents a notification with delivery status
 */

class Notification {
    constructor(userId, type, subject, content) {
        this.id = this.generateNotificationId();
        this.userId = userId;
        this.type = type;
        this.subject = subject;
        this.content = content;
        this.status = NotificationStatus.PENDING;
        this.priority = NotificationPriority.NORMAL;
        this.retryCount = 0;
        this.createdAt = new Date();
    }
    
    generateNotificationId() {
        return `NOTIF_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }
    
    markAsSent() {
        this.status = NotificationStatus.SENT;
        this.sentAt = new Date();
    }
    
    markAsDelivered() {
        this.status = NotificationStatus.DELIVERED;
    }
    
    markAsFailed(errorMessage) {
        this.status = NotificationStatus.FAILED;
        this.errorMessage = errorMessage;
    }
    
    incrementRetryCount() {
        this.retryCount++;
        this.status = NotificationStatus.RETRYING;
    }
    
    setChannelId(channelId) {
        this.channelId = channelId;
    }
    
    setPriority(priority) {
        this.priority = priority;
    }
}

// ==================== 8. TEMPLATE ENGINE ====================
/**
 * TEMPLATE ENGINE: Handles template processing and personalization
 */

class TemplateEngine {
    constructor() {
        this.templates = new Map();
        this.users = new Map();
        this.initializeSampleTemplates();
        this.initializeSampleUsers();
    }
    
    initializeSampleTemplates() {
        // Email templates
        this.templates.set('welcome_email', new Template('welcome_email', 'Welcome to Our Service', 
            'Hello {{name}}, welcome to our service! Your account has been created successfully.', NotificationType.EMAIL));
        
        this.templates.set('order_confirmation', new Template('order_confirmation', 'Order Confirmed', 
            'Hi {{name}}, your order #{{orderId}} has been confirmed. Total: ${{amount}}', NotificationType.EMAIL));
        
        this.templates.set('payment_failed', new Template('payment_failed', 'Payment Failed', 
            'Dear {{name}}, your payment for order #{{orderId}} has failed. Please update your payment method.', NotificationType.EMAIL));
        
        // SMS templates
        this.templates.set('otp_sms', new Template('otp_sms', 'OTP Verification', 
            'Your OTP is {{otp}}. Valid for 5 minutes.', NotificationType.SMS));
        
        // Push notification templates
        this.templates.set('promo_push', new Template('promo_push', 'Special Offer', 
            '{{message}} - Get {{discount}}% off on your next purchase!', NotificationType.PUSH));
    }
    
    initializeSampleUsers() {
        this.users.set('user1', new User('user1', 'john@example.com', '+1234567890'));
        this.users.set('user2', new User('user2', 'jane@example.com', '+0987654321'));
    }
    
    processTemplate(event) {
        const template = this.templates.get(event.templateName);
        if (!template) {
            throw new Error(`Template not found: ${event.templateName}`);
        }
        
        const user = this.users.get(event.userId);
        if (!user) {
            throw new Error(`User not found: ${event.userId}`);
        }
        
        const processedContent = this.processContent(template.content, event.data, user);
        const processedSubject = this.processContent(template.subject, event.data, user);
        
        return new Notification(event.userId, template.channelType, processedSubject, processedContent);
    }
    
    processContent(template, data, user) {
        let processed = template;
        
        // Replace user variables
        processed = processed.replace(/\{\{name\}\}/g, user.name);
        processed = processed.replace(/\{\{email\}\}/g, user.email);
        processed = processed.replace(/\{\{phone\}\}/g, user.phone);
        
        // Replace data variables
        for (const [key, value] of Object.entries(data)) {
            processed = processed.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value));
        }
        
        return processed;
    }
}

// ==================== 9. TEMPLATE CLASS ====================
/**
 * TEMPLATE: Represents a notification template
 */

class Template {
    constructor(id, name, content, channelType) {
        this.id = id;
        this.name = name;
        this.subject = name;
        this.content = content;
        this.channelType = channelType;
        this.isActive = true;
        this.createdAt = new Date();
    }
}

// ==================== 10. USER CLASS ====================
/**
 * USER: Represents a user with notification preferences
 */

class User {
    constructor(id, email, phone) {
        this.id = id;
        this.name = `User ${id}`;
        this.email = email;
        this.phone = phone;
        this.preferences = new Map();
        this.createdAt = new Date();
        
        // Default preferences - all channels enabled
        Object.values(NotificationType).forEach(type => {
            this.preferences.set(type, true);
        });
    }
    
    isChannelEnabled(channel) {
        return this.preferences.get(channel) ?? true;
    }
    
    setChannelPreference(channel, enabled) {
        this.preferences.set(channel, enabled);
    }
}

// ==================== 11. NOTIFICATION STRATEGY (STRATEGY PATTERN) ====================
/**
 * NOTIFICATION STRATEGY: Strategy pattern for different notification channels
 * 
 * 🎯 STRATEGY PATTERN BENEFITS:
 * 1. Encapsulates different notification algorithms
 * 2. Makes it easy to add new notification channels
 * 3. Allows runtime switching of notification strategies
 * 4. Follows Open/Closed Principle (open for extension, closed for modification)
 * 5. Eliminates complex if-else chains for channel selection
 * 
 * 🎯 INTERVIEW ANSWER: "We use Strategy pattern to encapsulate different 
 * notification algorithms (Email, SMS, Push) as interchangeable strategies. 
 * This makes it easy to add new channels without modifying existing code."
 */

class NotificationStrategy {
    constructor(channelId, type) {
        this.channelId = channelId;
        this.type = type;
        this.status = ChannelStatus.ACTIVE;
        this.rateLimiter = new RateLimiter(100, 60000); // 100 requests per minute
        this.maxRetries = 3;
    }
    
    async send(notification) {
        throw new Error('send method must be implemented by subclass');
    }
    
    canSend(userId) {
        return this.status === ChannelStatus.ACTIVE && this.rateLimiter.allowRequest();
    }
    
    setStatus(status) {
        this.status = status;
    }
    
    getType() { return this.type; }
    getChannelId() { return this.channelId; }
    getStatus() { return this.status; }
    getMaxRetries() { return this.maxRetries; }
}

// ==================== 12. EMAIL STRATEGY ====================
/**
 * EMAIL STRATEGY: Email notification strategy implementation
 */

class EmailStrategy extends NotificationStrategy {
    constructor() {
        super('EMAIL_STRATEGY', NotificationType.EMAIL);
        this.userEmails = new Map();
        this.initializeSampleEmails();
    }
    
    initializeSampleEmails() {
        this.userEmails.set('user1', 'john@example.com');
        this.userEmails.set('user2', 'jane@example.com');
    }
    
    async send(notification) {
        if (!this.canSend(notification.userId)) {
            return false;
        }
        
        const email = this.userEmails.get(notification.userId);
        if (!email) {
            notification.markAsFailed('User email not found');
            return false;
        }
        
        // Simulate email sending
        try {
            await this.sleep(100); // Simulate network delay
            const success = Math.random() > 0.1; // 90% success rate
            
            if (success) {
                notification.markAsSent();
                console.log(`Email sent to ${email}: ${notification.subject}`);
                return true;
            } else {
                notification.markAsFailed('Email delivery failed');
                return false;
            }
        } catch (error) {
            notification.markAsFailed('Email sending interrupted');
            return false;
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ==================== 13. SMS STRATEGY ====================
/**
 * SMS STRATEGY: SMS notification strategy implementation
 */

class SMSStrategy extends NotificationStrategy {
    constructor() {
        super('SMS_STRATEGY', NotificationType.SMS);
        this.userPhones = new Map();
        this.initializeSamplePhones();
    }
    
    initializeSamplePhones() {
        this.userPhones.set('user1', '+1234567890');
        this.userPhones.set('user2', '+0987654321');
    }
    
    async send(notification) {
        if (!this.canSend(notification.userId)) {
            return false;
        }
        
        const phone = this.userPhones.get(notification.userId);
        if (!phone) {
            notification.markAsFailed('User phone not found');
            return false;
        }
        
        // Simulate SMS sending
        try {
            await this.sleep(50); // Simulate network delay
            const success = Math.random() > 0.05; // 95% success rate
            
            if (success) {
                notification.markAsSent();
                console.log(`SMS sent to ${phone}: ${notification.content}`);
                return true;
            } else {
                notification.markAsFailed('SMS delivery failed');
                return false;
            }
        } catch (error) {
            notification.markAsFailed('SMS sending interrupted');
            return false;
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ==================== 14. PUSH STRATEGY ====================
/**
 * PUSH STRATEGY: Push notification strategy implementation
 */

class PushStrategy extends NotificationStrategy {
    constructor() {
        super('PUSH_STRATEGY', NotificationType.PUSH);
        this.userDevices = new Map();
        this.initializeSampleDevices();
    }
    
    initializeSampleDevices() {
        this.userDevices.set('user1', 'device_token_123');
        this.userDevices.set('user2', 'device_token_456');
    }
    
    async send(notification) {
        if (!this.canSend(notification.userId)) {
            return false;
        }
        
        const deviceToken = this.userDevices.get(notification.userId);
        if (!deviceToken) {
            notification.markAsFailed('User device not found');
            return false;
        }
        
        // Simulate push notification sending
        try {
            await this.sleep(30); // Simulate network delay
            const success = Math.random() > 0.02; // 98% success rate
            
            if (success) {
                notification.markAsSent();
                console.log(`Push notification sent to ${deviceToken}: ${notification.content}`);
                return true;
            } else {
                notification.markAsFailed('Push notification delivery failed');
                return false;
            }
        } catch (error) {
            notification.markAsFailed('Push notification sending interrupted');
            return false;
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ==================== 15. STRATEGY FACTORY ====================
/**
 * STRATEGY FACTORY: Factory pattern for creating notification strategies
 * 
 * 🎯 FACTORY PATTERN BENEFITS:
 * 1. Centralized strategy creation
 * 2. Easy to add new strategies
 * 3. Encapsulates strategy instantiation logic
 * 4. Provides a clean interface for strategy creation
 */

class NotificationStrategyFactory {
    static strategyMap = new Map([
        [NotificationType.EMAIL, EmailStrategy],
        [NotificationType.SMS, SMSStrategy],
        [NotificationType.PUSH, PushStrategy]
    ]);
    
    static createStrategy(type) {
        const StrategyClass = this.strategyMap.get(type);
        if (StrategyClass) {
            return new StrategyClass();
        }
        throw new Error(`Unknown notification type: ${type}`);
    }
    
    static getSupportedTypes() {
        return Array.from(this.strategyMap.keys());
    }
}

// ==================== 16. NOTIFICATION CONTEXT ====================
/**
 * NOTIFICATION CONTEXT: Context class for Strategy pattern
 * 
 * 🎯 CONTEXT CLASS BENEFITS:
 * 1. Maintains reference to current strategy
 * 2. Provides interface for strategy switching
 * 3. Delegates work to strategy object
 * 4. Can maintain state that's independent of strategies
 */

class NotificationContext {
    constructor(type) {
        this.strategy = NotificationStrategyFactory.createStrategy(type);
    }
    
    setStrategy(type) {
        this.strategy = NotificationStrategyFactory.createStrategy(type);
    }
    
    async executeStrategy(notification) {
        return await this.strategy.send(notification);
    }
    
    canExecute(userId) {
        return this.strategy.canSend(userId);
    }
    
    getStrategyType() {
        return this.strategy.getType();
    }
    
    getStrategyId() {
        return this.strategy.getChannelId();
    }
}

// ==================== 17. RATE LIMITER ====================
/**
 * RATE LIMITER: Token bucket algorithm for rate limiting
 */

class RateLimiter {
    constructor(maxTokens, windowMs) {
        this.maxTokens = maxTokens;
        this.windowMs = windowMs;
        this.tokens = maxTokens;
        this.lastRefillTime = Date.now();
    }
    
    allowRequest() {
        this.refillTokens();
        if (this.tokens > 0) {
            this.tokens--;
            return true;
        }
        return false;
    }
    
    refillTokens() {
        const now = Date.now();
        const timePassed = now - this.lastRefillTime;
        
        if (timePassed >= this.windowMs) {
            const refillAmount = Math.floor(timePassed / this.windowMs) * this.maxTokens;
            this.tokens = Math.min(this.maxTokens, this.tokens + refillAmount);
            this.lastRefillTime = now;
        }
    }
}

// ==================== 18. RETRY QUEUE ====================
/**
 * RETRY QUEUE: Handles failed notifications with exponential backoff
 */

class RetryQueue {
    constructor() {
        this.retryQueue = [];
        this.deadLetterQueue = [];
        this.retryInterval = null;
        this.processing = false;
        this.MAX_RETRIES = 3;
        this.startRetryProcessor();
    }
    
    addToRetryQueue(notification) {
        if (notification.retryCount >= this.MAX_RETRIES) {
            this.deadLetterQueue.push(notification);
            console.log(`Notification moved to DLQ: ${notification.id}`);
        } else {
            const backoffTime = this.calculateBackoffTime(notification.retryCount);
            const nextRetryTime = new Date(Date.now() + backoffTime);
            const retryItem = new RetryItem(notification, nextRetryTime);
            this.retryQueue.push(retryItem);
            console.log(`Notification added to retry queue: ${notification.id} (retry ${notification.retryCount + 1}/${this.MAX_RETRIES})`);
        }
    }
    
    calculateBackoffTime(retryCount) {
        // Exponential backoff: 1s, 2s, 4s, 8s...
        return Math.pow(2, retryCount) * 1000;
    }
    
    startRetryProcessor() {
        this.retryInterval = setInterval(() => {
            this.processRetryQueue();
        }, 1000); // Check every second
    }
    
    processRetryQueue() {
        if (this.processing) return;
        
        this.processing = true;
        const now = new Date();
        
        // Process items ready for retry
        const readyItems = this.retryQueue.filter(item => item.nextRetryTime <= now);
        
        for (const item of readyItems) {
            // Remove from retry queue
            const index = this.retryQueue.indexOf(item);
            if (index > -1) {
                this.retryQueue.splice(index, 1);
            }
            
            const notification = item.notification;
            notification.incrementRetryCount();
            console.log(`Retrying notification: ${notification.id}`);
            
            // Simulate retry (30% success rate on retry)
            if (Math.random() > 0.7) {
                console.log(`Retry successful for: ${notification.id}`);
            } else {
                this.addToRetryQueue(notification);
            }
        }
        
        this.processing = false;
    }
    
    shutdown() {
        if (this.retryInterval) {
            clearInterval(this.retryInterval);
        }
    }
    
    getRetryQueueSize() {
        return this.retryQueue.length;
    }
    
    getDLQSize() {
        return this.deadLetterQueue.length;
    }
}

// ==================== 17. RETRY ITEM ====================
/**
 * RETRY ITEM: Wrapper for notifications in retry queue
 */

class RetryItem {
    constructor(notification, nextRetryTime) {
        this.notification = notification;
        this.nextRetryTime = nextRetryTime;
    }
}

// ==================== 18. OBSERVER PATTERN ====================
/**
 * OBSERVER PATTERN: Event-driven notification system
 */

class NotificationSubject {
    constructor() {
        this.observers = [];
    }
    
    registerObserver(observer) {
        this.observers.push(observer);
    }
    
    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    
    notifyObservers(event) {
        for (const observer of this.observers) {
            observer.update(event);
        }
    }
}

// ==================== 19. NOTIFICATION SERVICE ====================
/**
 * NOTIFICATION SERVICE: Main orchestrator using Observer pattern
 */

class NotificationService {
    constructor() {
        this.subject = new NotificationSubject();
        this.templateEngine = new TemplateEngine();
        this.strategies = new Map();
        this.retryQueue = new RetryQueue();
        this.notificationCounter = 0;
        
        this.initializeStrategies();
        this.subject.registerObserver(this);
    }
    
    initializeStrategies() {
        this.strategies.set(NotificationType.EMAIL, new EmailStrategy());
        this.strategies.set(NotificationType.SMS, new SMSStrategy());
        this.strategies.set(NotificationType.PUSH, new PushStrategy());
    }
    
    publishEvent(event) {
        console.log(`Publishing event: ${event.eventId}`);
        this.subject.notifyObservers(event);
    }
    
    async update(event) {
        // Process notification asynchronously
        this.processNotification(event);
    }
    
    async processNotification(event) {
        try {
            // Process template
            const notification = this.templateEngine.processTemplate(event);
            
            // Determine channels to use
            const channelsToUse = this.determineChannels(event);
            
            // Send to each channel using strategies
            for (const channelType of channelsToUse) {
                const strategy = this.strategies.get(channelType);
                if (strategy && strategy.canSend(event.userId)) {
                    notification.setChannelId(strategy.getChannelId());
                    
                    const success = await strategy.send(notification);
                    if (!success) {
                        this.retryQueue.addToRetryQueue(notification);
                    }
                    
                    this.notificationCounter++;
                }
            }
            
            console.log(`Notification processed for event: ${event.eventId}`);
            
        } catch (error) {
            console.error(`Error processing notification: ${error.message}`);
        }
    }
    
    determineChannels(event) {
        const channels = new Set();
        
        // Add default channels based on event type
        switch (event.type) {
            case NotificationType.EMAIL:
                channels.add(NotificationType.EMAIL);
                break;
            case NotificationType.SMS:
                channels.add(NotificationType.SMS);
                break;
            case NotificationType.PUSH:
                channels.add(NotificationType.PUSH);
                break;
            default:
                // For general events, use multiple channels
                channels.add(NotificationType.EMAIL);
                channels.add(NotificationType.PUSH);
                break;
        }
        
        // Add any explicitly specified channels
        for (const channel of event.channels) {
            channels.add(channel);
        }
        
        return channels;
    }
    
    shutdown() {
        this.retryQueue.shutdown();
    }
    
    getTotalNotificationsSent() {
        return this.notificationCounter;
    }
    
    getRetryQueueSize() {
        return this.retryQueue.getRetryQueueSize();
    }
    
    getDLQSize() {
        return this.retryQueue.getDLQSize();
    }
}

// ==================== 20. MAIN EXECUTION ====================
/**
 * MAIN EXECUTION: Demo and testing
 */

async function runNotificationDemo() {
    console.log("=== Notification System Design Demo ===");
    
    // Initialize notification service
    const notificationService = new NotificationService();
    
    // Simulate various notification events
    simulateNotificationEvents(notificationService);
    
    // Display status periodically
    displayStatusPeriodically(notificationService);
    
    // Shutdown after demo
    setTimeout(() => {
        notificationService.shutdown();
        console.log("=== Demo Complete ===");
    }, 30000); // Run for 30 seconds
}

async function simulateNotificationEvents(service) {
    // Wait for system to start
    await sleep(2000);
    
    // Event 1: Welcome email
    console.log("\n--- Event 1: Welcome Email ---");
    const welcomeData = { name: 'John Doe' };
    const welcomeEvent = new NotificationEvent('user1', NotificationType.EMAIL, 'welcome_email', welcomeData);
    service.publishEvent(welcomeEvent);
    await sleep(2000);
    
    // Event 2: Order confirmation
    console.log("\n--- Event 2: Order Confirmation ---");
    const orderData = { name: 'Jane Smith', orderId: 'ORD123456', amount: '299.99' };
    const orderEvent = new NotificationEvent('user2', NotificationType.EMAIL, 'order_confirmation', orderData);
    service.publishEvent(orderEvent);
    await sleep(2000);
    
    // Event 3: OTP SMS
    console.log("\n--- Event 3: OTP SMS ---");
    const otpData = { otp: '123456' };
    const otpEvent = new NotificationEvent('user1', NotificationType.SMS, 'otp_sms', otpData);
    service.publishEvent(otpEvent);
    await sleep(2000);
    
    // Event 4: Payment failed
    console.log("\n--- Event 4: Payment Failed ---");
    const paymentData = { name: 'John Doe', orderId: 'ORD789012' };
    const paymentEvent = new NotificationEvent('user1', NotificationType.EMAIL, 'payment_failed', paymentData);
    service.publishEvent(paymentEvent);
    await sleep(2000);
    
    // Event 5: Promo push notification
    console.log("\n--- Event 5: Promo Push ---");
    const promoData = { message: 'Flash Sale!', discount: '50' };
    const promoEvent = new NotificationEvent('user2', NotificationType.PUSH, 'promo_push', promoData);
    service.publishEvent(promoEvent);
}

function displayStatusPeriodically(service) {
    setInterval(() => {
        console.log("\n=== Notification System Status ===");
        console.log("Total Notifications Sent:", service.getTotalNotificationsSent());
        console.log("Retry Queue Size:", service.getRetryQueueSize());
        console.log("Dead Letter Queue Size:", service.getDLQSize());
        console.log("=====================================\n");
    }, 5000); // Display every 5 seconds
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the demo
runNotificationDemo(); 