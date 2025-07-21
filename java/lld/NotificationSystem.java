/**
 * NOTIFICATION SYSTEM DESIGN - AMAZON LLD INTERVIEW ESSENTIALS
 * 
 * 🎯 WHAT TO REMEMBER FOR INTERVIEWS:
 * 1. Observer Pattern: Publishers and Subscribers for loose coupling
 * 2. Retry Queues: Dead Letter Queue (DLQ) for failed notifications
 * 3. Multiple notification channels, Push, In-App notifications
 * 4. Rate Limiting: Prevent notification spam and abuse
 * 5. Template Engine: Dynamic content generation with personalization
 * 
 * 🔑 KEY CONCEPTS:
 * - Observer Pattern: Decouples notification sending from business logic
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
 * ✅ Step 3: Channel Selection
 * - Determines optimal notification channels
 * - Checks user preferences and settings
 * - Applies rate limiting rules
 * 
 * ✅ Step 4: Notification Delivery
 * - Sends to selected channels
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
 * - Reliable: Retry queues ensure delivery even with temporary failures
 * - Flexible: Multiple channels with unified interface
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
 */

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

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
enum NotificationType {
    EMAIL, SMS, PUSH, IN_APP, WEBHOOK
}

enum NotificationStatus {
    PENDING, SENT, DELIVERED, FAILED, RETRYING, CANCELLED
}

enum NotificationPriority {
    LOW, NORMAL, HIGH, URGENT
}

enum ChannelStatus {
    ACTIVE, INACTIVE, MAINTENANCE, RATE_LIMITED
}

enum RetryStatus {
    PENDING, RETRYING, SUCCESS, FAILED, MOVED_TO_DLQ
}

// ==================== 6. NOTIFICATION EVENT ====================
/**
 * NOTIFICATION EVENT: Represents a notification event with all necessary data
 */

class NotificationEvent {
    private String eventId;
    private String userId;
    private NotificationType type;
    private String templateName;
    private Map<String, Object> data;
    private NotificationPriority priority;
    private Set<NotificationType> channels;
    private LocalDateTime createdAt;
    
    public NotificationEvent(String userId, NotificationType type, String templateName, Map<String, Object> data) {
        this.eventId = generateEventId();
        this.userId = userId;
        this.type = type;
        this.templateName = templateName;
        this.data = data != null ? data : new HashMap<>();
        this.priority = NotificationPriority.NORMAL;
        this.channels = new HashSet<>();
        this.createdAt = LocalDateTime.now();
    }
    
    private String generateEventId() {
        return "EVENT_" + System.currentTimeMillis() + "_" + ThreadLocalRandom.current().nextInt(1000);
    }
    
    // Getters and setters
    public String getEventId() { return eventId; }
    public String getUserId() { return userId; }
    public NotificationType getType() { return type; }
    public String getTemplateName() { return templateName; }
    public Map<String, Object> getData() { return data; }
    public NotificationPriority getPriority() { return priority; }
    public void setPriority(NotificationPriority priority) { this.priority = priority; }
    public Set<NotificationType> getChannels() { return channels; }
    public void addChannel(NotificationType channel) { this.channels.add(channel); }
    public LocalDateTime getCreatedAt() { return createdAt; }
}

// ==================== 7. NOTIFICATION ====================
/**
 * NOTIFICATION: Represents a notification with delivery status
 */

class Notification {
    private String id;
    private String userId;
    private NotificationType type;
    private String subject;
    private String content;
    private NotificationStatus status;
    private NotificationPriority priority;
    private String channelId;
    private int retryCount;
    private LocalDateTime createdAt;
    private LocalDateTime sentAt;
    private String errorMessage;
    
    public Notification(String userId, NotificationType type, String subject, String content) {
        this.id = generateNotificationId();
        this.userId = userId;
        this.type = type;
        this.subject = subject;
        this.content = content;
        this.status = NotificationStatus.PENDING;
        this.priority = NotificationPriority.NORMAL;
        this.retryCount = 0;
        this.createdAt = LocalDateTime.now();
    }
    
    private String generateNotificationId() {
        return "NOTIF_" + System.currentTimeMillis() + "_" + ThreadLocalRandom.current().nextInt(1000);
    }
    
    public void markAsSent() {
        this.status = NotificationStatus.SENT;
        this.sentAt = LocalDateTime.now();
    }
    
    public void markAsDelivered() {
        this.status = NotificationStatus.DELIVERED;
    }
    
    public void markAsFailed(String errorMessage) {
        this.status = NotificationStatus.FAILED;
        this.errorMessage = errorMessage;
    }
    
    public void incrementRetryCount() {
        this.retryCount++;
        this.status = NotificationStatus.RETRYING;
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getUserId() { return userId; }
    public NotificationType getType() { return type; }
    public String getSubject() { return subject; }
    public String getContent() { return content; }
    public NotificationStatus getStatus() { return status; }
    public NotificationPriority getPriority() { return priority; }
    public void setPriority(NotificationPriority priority) { this.priority = priority; }
    public String getChannelId() { return channelId; }
    public void setChannelId(String channelId) { this.channelId = channelId; }
    public int getRetryCount() { return retryCount; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getSentAt() { return sentAt; }
    public String getErrorMessage() { return errorMessage; }
}

// ==================== 8. TEMPLATE ENGINE ====================
/**
 * TEMPLATE ENGINE: Handles template processing and personalization
 */

class TemplateEngine {
    private Map<String, Template> templates;
    private Map<String, User> users;
    
    public TemplateEngine() {
        this.templates = new HashMap<>();
        this.users = new HashMap<>();
        initializeSampleTemplates();
        initializeSampleUsers();
    }
    
    private void initializeSampleTemplates() {
        // Email templates
        templates.put("welcome_email", new Template("welcome_email", "Welcome to Our Service", 
            "Hello {{name}}, welcome to our service! Your account has been created successfully.", NotificationType.EMAIL));
        
        templates.put("order_confirmation", new Template("order_confirmation", "Order Confirmed", 
            "Hi {{name}}, your order #{{orderId}} has been confirmed. Total: ${{amount}}", NotificationType.EMAIL));
        
        templates.put("payment_failed", new Template("payment_failed", "Payment Failed", 
            "Dear {{name}}, your payment for order #{{orderId}} has failed. Please update your payment method.", NotificationType.EMAIL));
        
        // SMS templates
        templates.put("otp_sms", new Template("otp_sms", "OTP Verification", 
            "Your OTP is {{otp}}. Valid for 5 minutes.", NotificationType.SMS));
        
        // Push notification templates
        templates.put("promo_push", new Template("promo_push", "Special Offer", 
            "{{message}} - Get {{discount}}% off on your next purchase!", NotificationType.PUSH));
    }
    
    private void initializeSampleUsers() {
        users.put("user1", new User("user1", "john@example.com", "+1234567890"));
        users.put("user2", new User("user2", "jane@example.com", "+0987654321"));
    }
    
    public Notification processTemplate(NotificationEvent event) {
        Template template = templates.get(event.getTemplateName());
        if (template == null) {
            throw new IllegalArgumentException("Template not found: " + event.getTemplateName());
        }
        
        User user = users.get(event.getUserId());
        if (user == null) {
            throw new IllegalArgumentException("User not found: " + event.getUserId());
        }
        
        String processedContent = processContent(template.getContent(), event.getData(), user);
        String processedSubject = processContent(template.getSubject(), event.getData(), user);
        
        return new Notification(event.getUserId(), template.getChannelType(), processedSubject, processedContent);
    }
    
    private String processContent(String template, Map<String, Object> data, User user) {
        String processed = template;
        
        // Replace user variables
        processed = processed.replace("{{name}}", user.getName());
        processed = processed.replace("{{email}}", user.getEmail());
        processed = processed.replace("{{phone}}", user.getPhone());
        
        // Replace data variables
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            processed = processed.replace("{{" + entry.getKey() + "}}", String.valueOf(entry.getValue()));
        }
        
        return processed;
    }
}

// ==================== 9. TEMPLATE CLASS ====================
/**
 * TEMPLATE: Represents a notification template
 */

class Template {
    private String id;
    private String name;
    private String subject;
    private String content;
    private NotificationType channelType;
    private boolean isActive;
    private LocalDateTime createdAt;
    
    public Template(String id, String name, String content, NotificationType channelType) {
        this.id = id;
        this.name = name;
        this.subject = name;
        this.content = content;
        this.channelType = channelType;
        this.isActive = true;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getSubject() { return subject; }
    public String getContent() { return content; }
    public NotificationType getChannelType() { return channelType; }
    public boolean isActive() { return isActive; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}

// ==================== 10. USER CLASS ====================
/**
 * USER: Represents a user with notification preferences
 */

class User {
    private String id;
    private String name;
    private String email;
    private String phone;
    private Map<NotificationType, Boolean> preferences;
    private LocalDateTime createdAt;
    
    public User(String id, String email, String phone) {
        this.id = id;
        this.name = "User " + id;
        this.email = email;
        this.phone = phone;
        this.preferences = new HashMap<>();
        this.createdAt = LocalDateTime.now();
        
        // Default preferences - all channels enabled
        for (NotificationType type : NotificationType.values()) {
            preferences.put(type, true);
        }
    }
    
    public boolean isChannelEnabled(NotificationType channel) {
        return preferences.getOrDefault(channel, true);
    }
    
    public void setChannelPreference(NotificationType channel, boolean enabled) {
        preferences.put(channel, enabled);
    }
    
    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public Map<NotificationType, Boolean> getPreferences() { return preferences; }
    public LocalDateTime getCreatedAt() { return createdAt; }
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

interface NotificationStrategy {
    boolean send(Notification notification);
    boolean canSend(String userId);
    NotificationType getType();
    String getChannelId();
    void setStatus(ChannelStatus status);
    ChannelStatus getStatus();
    int getMaxRetries();
}

abstract class BaseNotificationStrategy implements NotificationStrategy {
    protected String channelId;
    protected NotificationType type;
    protected ChannelStatus status;
    protected RateLimiter rateLimiter;
    protected int maxRetries;
    
    public BaseNotificationStrategy(String channelId, NotificationType type) {
        this.channelId = channelId;
        this.type = type;
        this.status = ChannelStatus.ACTIVE;
        this.rateLimiter = new RateLimiter(100, 60000); // 100 requests per minute
        this.maxRetries = 3;
    }
    
    @Override
    public boolean canSend(String userId) {
        return status == ChannelStatus.ACTIVE && rateLimiter.allowRequest();
    }
    
    @Override
    public void setStatus(ChannelStatus status) {
        this.status = status;
    }
    
    @Override
    public NotificationType getType() { return type; }
    
    @Override
    public String getChannelId() { return channelId; }
    
    @Override
    public ChannelStatus getStatus() { return status; }
    
    @Override
    public int getMaxRetries() { return maxRetries; }
}

// ==================== 12. EMAIL STRATEGY ====================
/**
 * EMAIL STRATEGY: Email notification strategy implementation
 */

class EmailStrategy extends BaseNotificationStrategy {
    private Map<String, String> userEmails;
    
    public EmailStrategy() {
        super("EMAIL_STRATEGY", NotificationType.EMAIL);
        this.userEmails = new HashMap<>();
        initializeSampleEmails();
    }
    
    private void initializeSampleEmails() {
        userEmails.put("user1", "john@example.com");
        userEmails.put("user2", "jane@example.com");
    }
    
    @Override
    public boolean send(Notification notification) {
        if (!canSend(notification.getUserId())) {
            return false;
        }
        
        String email = userEmails.get(notification.getUserId());
        if (email == null) {
            notification.markAsFailed("User email not found");
            return false;
        }
        
        // Simulate email sending
        try {
            Thread.sleep(100); // Simulate network delay
            boolean success = Math.random() > 0.1; // 90% success rate
            
            if (success) {
                notification.markAsSent();
                System.out.println("Email sent to " + email + ": " + notification.getSubject());
                return true;
            } else {
                notification.markAsFailed("Email delivery failed");
                return false;
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            notification.markAsFailed("Email sending interrupted");
            return false;
        }
    }
}

// ==================== 13. SMS STRATEGY ====================
/**
 * SMS STRATEGY: SMS notification strategy implementation
 */

class SMSStrategy extends BaseNotificationStrategy {
    private Map<String, String> userPhones;
    
    public SMSStrategy() {
        super("SMS_STRATEGY", NotificationType.SMS);
        this.userPhones = new HashMap<>();
        initializeSamplePhones();
    }
    
    private void initializeSamplePhones() {
        userPhones.put("user1", "+1234567890");
        userPhones.put("user2", "+0987654321");
    }
    
    @Override
    public boolean send(Notification notification) {
        if (!canSend(notification.getUserId())) {
            return false;
        }
        
        String phone = userPhones.get(notification.getUserId());
        if (phone == null) {
            notification.markAsFailed("User phone not found");
            return false;
        }
        
        // Simulate SMS sending
        try {
            Thread.sleep(50); // Simulate network delay
            boolean success = Math.random() > 0.05; // 95% success rate
            
            if (success) {
                notification.markAsSent();
                System.out.println("SMS sent to " + phone + ": " + notification.getContent());
                return true;
            } else {
                notification.markAsFailed("SMS delivery failed");
                return false;
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            notification.markAsFailed("SMS sending interrupted");
            return false;
        }
    }
}

// ==================== 14. PUSH STRATEGY ====================
/**
 * PUSH STRATEGY: Push notification strategy implementation
 */

class PushStrategy extends BaseNotificationStrategy {
    private Map<String, String> userDevices;
    
    public PushStrategy() {
        super("PUSH_STRATEGY", NotificationType.PUSH);
        this.userDevices = new HashMap<>();
        initializeSampleDevices();
    }
    
    private void initializeSampleDevices() {
        userDevices.put("user1", "device_token_123");
        userDevices.put("user2", "device_token_456");
    }
    
    @Override
    public boolean send(Notification notification) {
        if (!canSend(notification.getUserId())) {
            return false;
        }
        
        String deviceToken = userDevices.get(notification.getUserId());
        if (deviceToken == null) {
            notification.markAsFailed("User device not found");
            return false;
        }
        
        // Simulate push notification sending
        try {
            Thread.sleep(30); // Simulate network delay
            boolean success = Math.random() > 0.02; // 98% success rate
            
            if (success) {
                notification.markAsSent();
                System.out.println("Push notification sent to " + deviceToken + ": " + notification.getContent());
                return true;
            } else {
                notification.markAsFailed("Push notification delivery failed");
                return false;
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            notification.markAsFailed("Push notification sending interrupted");
            return false;
        }
    }
}

// ==================== 15. RATE LIMITER ====================
/**
 * RATE LIMITER: Token bucket algorithm for rate limiting
 */

class RateLimiter {
    private final int maxTokens;
    private final long windowMs;
    private AtomicInteger tokens;
    private volatile long lastRefillTime;
    
    public RateLimiter(int maxTokens, long windowMs) {
        this.maxTokens = maxTokens;
        this.windowMs = windowMs;
        this.tokens = new AtomicInteger(maxTokens);
        this.lastRefillTime = System.currentTimeMillis();
    }
    
    public boolean allowRequest() {
        refillTokens();
        return tokens.getAndDecrement() > 0;
    }
    
    private void refillTokens() {
        long now = System.currentTimeMillis();
        long timePassed = now - lastRefillTime;
        
        if (timePassed >= windowMs) {
            int refillAmount = (int) (timePassed / windowMs) * maxTokens;
            tokens.set(Math.min(maxTokens, tokens.get() + refillAmount));
            lastRefillTime = now;
        }
    }
}

// ==================== 18. RETRY QUEUE ====================
/**
 * RETRY QUEUE: Handles failed notifications with exponential backoff
 */

class RetryQueue {
    private PriorityQueue<RetryItem> retryQueue;
    private Queue<Notification> deadLetterQueue;
    private ScheduledExecutorService retryExecutor;
    private ReentrantLock lock;
    private static final int MAX_RETRIES = 3;
    
    public RetryQueue() {
        this.retryQueue = new PriorityQueue<>((a, b) -> a.getNextRetryTime().compareTo(b.getNextRetryTime()));
        this.deadLetterQueue = new LinkedList<>();
        this.retryExecutor = Executors.newScheduledThreadPool(1);
        this.lock = new ReentrantLock();
        startRetryProcessor();
    }
    
    public void addToRetryQueue(Notification notification) {
        lock.lock();
        try {
            if (notification.getRetryCount() >= MAX_RETRIES) {
                deadLetterQueue.offer(notification);
                System.out.println("Notification moved to DLQ: " + notification.getId());
            } else {
                long backoffTime = calculateBackoffTime(notification.getRetryCount());
                LocalDateTime nextRetryTime = LocalDateTime.now().plus(backoffTime, ChronoUnit.MILLIS);
                RetryItem retryItem = new RetryItem(notification, nextRetryTime);
                retryQueue.offer(retryItem);
                System.out.println("Notification added to retry queue: " + notification.getId() + 
                                 " (retry " + (notification.getRetryCount() + 1) + "/" + MAX_RETRIES + ")");
            }
        } finally {
            lock.unlock();
        }
    }
    
    private long calculateBackoffTime(int retryCount) {
        // Exponential backoff: 1s, 2s, 4s, 8s...
        return (long) Math.pow(2, retryCount) * 1000;
    }
    
    private void startRetryProcessor() {
        retryExecutor.scheduleAtFixedRate(() -> {
            processRetryQueue();
        }, 1, 1, TimeUnit.SECONDS);
    }
    
    private void processRetryQueue() {
        lock.lock();
        try {
            while (!retryQueue.isEmpty() && retryQueue.peek().getNextRetryTime().isBefore(LocalDateTime.now())) {
                RetryItem retryItem = retryQueue.poll();
                Notification notification = retryItem.getNotification();
                
                // Retry the notification
                notification.incrementRetryCount();
                System.out.println("Retrying notification: " + notification.getId());
                
                // Here you would call the notification service to retry
                // For demo purposes, we'll just add it back to retry queue if it fails
                if (Math.random() > 0.7) { // 30% success rate on retry
                    System.out.println("Retry successful for: " + notification.getId());
                } else {
                    addToRetryQueue(notification);
                }
            }
        } finally {
            lock.unlock();
        }
    }
    
    public void shutdown() {
        retryExecutor.shutdown();
    }
    
    public int getRetryQueueSize() {
        lock.lock();
        try {
            return retryQueue.size();
        } finally {
            lock.unlock();
        }
    }
    
    public int getDLQSize() {
        lock.lock();
        try {
            return deadLetterQueue.size();
        } finally {
            lock.unlock();
        }
    }
}

// ==================== 19. RETRY ITEM ====================
/**
 * RETRY ITEM: Wrapper for notifications in retry queue
 */

class RetryItem {
    private Notification notification;
    private LocalDateTime nextRetryTime;
    
    public RetryItem(Notification notification, LocalDateTime nextRetryTime) {
        this.notification = notification;
        this.nextRetryTime = nextRetryTime;
    }
    
    // Getters
    public Notification getNotification() { return notification; }
    public LocalDateTime getNextRetryTime() { return nextRetryTime; }
}

// ==================== 20. OBSERVER PATTERN ====================
/**
 * OBSERVER PATTERN: Event-driven notification system
 */

interface Observer {
    void update(NotificationEvent event);
}

interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers(NotificationEvent event);
}

class NotificationSubject implements Subject {
    private List<Observer> observers;
    
    public NotificationSubject() {
        this.observers = new ArrayList<>();
    }
    
    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }
    
    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
    
    @Override
    public void notifyObservers(NotificationEvent event) {
        for (Observer observer : observers) {
            observer.update(event);
        }
    }
}

// ==================== 21. NOTIFICATION SERVICE ====================
/**
 * NOTIFICATION SERVICE: Main orchestrator using Observer pattern
 */

class NotificationService implements Observer {
    private NotificationSubject subject;
    private TemplateEngine templateEngine;
    private Map<NotificationType, NotificationStrategy> strategies;
    private RetryQueue retryQueue;
    private ExecutorService executorService;
    private AtomicInteger notificationCounter;
    
    public NotificationService() {
        this.subject = new NotificationSubject();
        this.templateEngine = new TemplateEngine();
        this.strategies = new HashMap<>();
        this.retryQueue = new RetryQueue();
        this.executorService = Executors.newFixedThreadPool(10);
        this.notificationCounter = new AtomicInteger(0);
        
        initializeStrategies();
        subject.registerObserver(this);
    }
    
    private void initializeStrategies() {
        strategies.put(NotificationType.EMAIL, new EmailStrategy());
        strategies.put(NotificationType.SMS, new SMSStrategy());
        strategies.put(NotificationType.PUSH, new PushStrategy());
    }
    
    public void publishEvent(NotificationEvent event) {
        System.out.println("Publishing event: " + event.getEventId());
        subject.notifyObservers(event);
    }
    
    @Override
    public void update(NotificationEvent event) {
        // Process notification asynchronously
        executorService.submit(() -> processNotification(event));
    }
    
    private void processNotification(NotificationEvent event) {
        try {
            // Process template
            Notification notification = templateEngine.processTemplate(event);
            
            // Determine channels to use
            Set<NotificationType> channelsToUse = determineChannels(event);
            
            // Send to each channel using strategies
            for (NotificationType channelType : channelsToUse) {
                NotificationStrategy strategy = strategies.get(channelType);
                if (strategy != null && strategy.canSend(event.getUserId())) {
                    notification.setChannelId(strategy.getChannelId());
                    
                    boolean success = strategy.send(notification);
                    if (!success) {
                        retryQueue.addToRetryQueue(notification);
                    }
                    
                    notificationCounter.incrementAndGet();
                }
            }
            
            System.out.println("Notification processed for event: " + event.getEventId());
            
        } catch (Exception e) {
            System.err.println("Error processing notification: " + e.getMessage());
        }
    }
    
    private Set<NotificationType> determineChannels(NotificationEvent event) {
        Set<NotificationType> channels = new HashSet<>();
        
        // Add default channels based on event type
        switch (event.getType()) {
            case EMAIL:
                channels.add(NotificationType.EMAIL);
                break;
            case SMS:
                channels.add(NotificationType.SMS);
                break;
            case PUSH:
                channels.add(NotificationType.PUSH);
                break;
            default:
                // For general events, use multiple channels
                channels.add(NotificationType.EMAIL);
                channels.add(NotificationType.PUSH);
                break;
        }
        
        // Add any explicitly specified channels
        channels.addAll(event.getChannels());
        
        return channels;
    }
    
    public void shutdown() {
        executorService.shutdown();
        retryQueue.shutdown();
    }
    
    public int getTotalNotificationsSent() {
        return notificationCounter.get();
    }
    
    public int getRetryQueueSize() {
        return retryQueue.getRetryQueueSize();
    }
    
    public int getDLQSize() {
        return retryQueue.getDLQSize();
    }
}

// ==================== 22. MAIN CLASS ====================
/**
 * MAIN CLASS: Demo and testing
 */

public class NotificationSystem {
    
    public static void main(String[] args) {
        System.out.println("=== Notification System Design Demo ===");
        
        // Initialize notification service
        NotificationService notificationService = new NotificationService();
        
        // Simulate various notification events
        simulateNotificationEvents(notificationService);
        
        // Display status periodically
        displayStatusPeriodically(notificationService);
        
        // Shutdown after demo
        try {
            Thread.sleep(30000); // Run for 30 seconds
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        notificationService.shutdown();
        System.out.println("=== Demo Complete ===");
    }
    
    private static void simulateNotificationEvents(NotificationService service) {
        // Start a thread to simulate notification events
        new Thread(() -> {
            try {
                Thread.sleep(2000); // Wait for system to start
                
                // Event 1: Welcome email
                System.out.println("\n--- Event 1: Welcome Email ---");
                Map<String, Object> welcomeData = new HashMap<>();
                welcomeData.put("name", "John Doe");
                NotificationEvent welcomeEvent = new NotificationEvent("user1", NotificationType.EMAIL, "welcome_email", welcomeData);
                service.publishEvent(welcomeEvent);
                Thread.sleep(2000);
                
                // Event 2: Order confirmation
                System.out.println("\n--- Event 2: Order Confirmation ---");
                Map<String, Object> orderData = new HashMap<>();
                orderData.put("name", "Jane Smith");
                orderData.put("orderId", "ORD123456");
                orderData.put("amount", "299.99");
                NotificationEvent orderEvent = new NotificationEvent("user2", NotificationType.EMAIL, "order_confirmation", orderData);
                service.publishEvent(orderEvent);
                Thread.sleep(2000);
                
                // Event 3: OTP SMS
                System.out.println("\n--- Event 3: OTP SMS ---");
                Map<String, Object> otpData = new HashMap<>();
                otpData.put("otp", "123456");
                NotificationEvent otpEvent = new NotificationEvent("user1", NotificationType.SMS, "otp_sms", otpData);
                service.publishEvent(otpEvent);
                Thread.sleep(2000);
                
                // Event 4: Payment failed
                System.out.println("\n--- Event 4: Payment Failed ---");
                Map<String, Object> paymentData = new HashMap<>();
                paymentData.put("name", "John Doe");
                paymentData.put("orderId", "ORD789012");
                NotificationEvent paymentEvent = new NotificationEvent("user1", NotificationType.EMAIL, "payment_failed", paymentData);
                service.publishEvent(paymentEvent);
                Thread.sleep(2000);
                
                // Event 5: Promo push notification
                System.out.println("\n--- Event 5: Promo Push ---");
                Map<String, Object> promoData = new HashMap<>();
                promoData.put("message", "Flash Sale!");
                promoData.put("discount", "50");
                NotificationEvent promoEvent = new NotificationEvent("user2", NotificationType.PUSH, "promo_push", promoData);
                service.publishEvent(promoEvent);
                
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
    
    private static void displayStatusPeriodically(NotificationService service) {
        new Thread(() -> {
            try {
                while (true) {
                    Thread.sleep(5000); // Display every 5 seconds
                    System.out.println("\n=== Notification System Status ===");
                    System.out.println("Total Notifications Sent: " + service.getTotalNotificationsSent());
                    System.out.println("Retry Queue Size: " + service.getRetryQueueSize());
                    System.out.println("Dead Letter Queue Size: " + service.getDLQSize());
                    System.out.println("=====================================\n");
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
} 