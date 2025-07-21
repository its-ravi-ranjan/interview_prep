import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Consumer;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

/**
 * CHAT APP SYSTEM DESIGN - AMAZON INTERVIEW ESSENTIALS
 * 
 * 🎯 WHAT TO REMEMBER FOR INTERVIEWS:
 * 1. WebSocket/WebRTC: Real-time bidirectional communication
 * 2. Message Queue: SQS/Kafka for reliable message delivery
 * 3. Database: NoSQL (DynamoDB) for chat data, SQL for user data
 * 4. Media Storage: S3 for images/videos, CDN for fast delivery
 * 5. Push Notifications: SNS for mobile/email notifications
 * 
 * 🔑 KEY CONCEPTS:
 * ✅ If user is online:
 * Message is sent via WebSocket in real-time using emit() or similar.
 * No need for push notification or message queue for delivery.
 * You may still store the message in DB for history or sync.
 * ❌ If user is offline:
 * ✅ Message is stored in a message queue (Kafka/SQS/RabbitMQ etc.) → ensures reliable delivery.
 * ✅ Message is persisted in database for retrieval (e.g., chat history).
 * ✅ A push notification is sent via FCM/APNs to inform the user.
 * 🟡 When the user comes online:
 * Messages from the queue are delivered over WebSocket or REST API.
 * You mark those messages as processed (using markAsProcessed()).
 * 
 * 📊 SYSTEM COMPONENTS:
 * WebSocket Server: ✅ Real-time, ✅ Bidirectional, ✅ Low latency
 * Message Queue: ✅ Reliability, ✅ Scalability, ✅ Ordering
 * Database: ✅ Sharding, ✅ Replication, ✅ High availability
 * Media Storage: ✅ S3, ✅ CDN, ✅ Compression
 * Push Notifications: ✅ SNS, ✅ Multi-platform, ✅ Delivery tracking
 * 
 * Real Examples:
 * 1. WhatsApp/Telegram: WebSocket + Message Queue + NoSQL + S3
 * 2. Slack/Discord: WebSocket + Kafka + PostgreSQL + CDN
 * 3. Facebook Messenger: WebSocket + SQS + MySQL + CDN
 * 
 * Slack/Discord: Great for structured communication (teams, threads) — needs SQL DB for relationships and joins.
 * WhatsApp/Telegram: Built for performance — use NoSQL for fast, massive scale with simple schemas.
 * Facebook Messenger: A middle ground — uses MySQL, but at massive scale, optimized for strong delivery guarantees and social features (like reactions, GIFs, integrations).
 * 
 * 
 * Use WebSocket if your primary goal is reliable messaging or signaling via a central server.
 * Use WebRTC if your goal is real-time media or peer-to-peer communication with low latency.
 * WebRTC is peer to peer for communication but it need a server(like websocket) to connect to the client.
 * 
 * Tradeoffs
 * Tradeoff Area	                 WebSocket	                                WebRTC
 * Ease of Setup	         ✅ Simple: connect to server via URL	❌ Complex ICE negotiation, STUN/TURN setup
 * Performance (Latency)	 ❌ Slightly higher latency	            ✅ Optimized for low-latency real-time communication
 * Data Integrity	         ✅ Guaranteed order and delivery (TCP)	❌ UDP may drop packets unless fallback used
 * Server Load	             ❌ All traffic goes through server	    ✅ Peer-to-peer reduces server bandwidth cost
 * NAT Traversal	         ✅ Works easily                     	❌ Challenging for some networks
 * Multi-user Broadcast    	✅ Easy with central server	            ❌ Requires SFU/MCU for multi-peer setups
 * 
 */


public class ChatApp {
    
    // ==================== USER MANAGEMENT ====================
    /**
     * USER MANAGEMENT - AUTHENTICATION & PROFILES
     * 
     * Features:
     * - User registration and authentication
     * - Profile management (avatar, status, etc.)
     * - Online/offline status tracking
     * - Contact list management
     */
    static class User {
        String userId;
        String username;
        String email;
        String phoneNumber;
        String avatarUrl;
        String status;
        boolean isOnline;
        long lastSeen;
        Set<String> contacts;
        Set<String> groups;
        
        public User(String userId, String username, String email) {
            this.userId = userId;
            this.username = username;
            this.email = email;
            this.contacts = new HashSet<>();
            this.groups = new HashSet<>();
            this.isOnline = false;
            this.lastSeen = System.currentTimeMillis();
        }
        
        public void updateStatus(String status) {
            this.status = status;
            this.lastSeen = System.currentTimeMillis();
        }
        
        public void setOnline(boolean online) {
            this.isOnline = online;
            this.lastSeen = System.currentTimeMillis();
        }
    }
    
    static class UserService {
        private Map<String, User> users = new ConcurrentHashMap<>();
        private Map<String, String> userSessions = new ConcurrentHashMap<>(); // sessionId -> userId
        
        public User registerUser(String username, String email, String password) {
            String userId = generateUserId();
            User user = new User(userId, username, email);
            users.put(userId, user);
            System.out.println("User registered: " + username);
            return user;
        }
        
        public String loginUser(String email, String password) {
            // Simulate authentication
            User user = users.values().stream()
                .filter(u -> u.email.equals(email))
                .findFirst()
                .orElse(null);
            
            if (user != null) {
                String sessionId = generateSessionId();
                userSessions.put(sessionId, user.userId);
                user.setOnline(true);
                System.out.println("User logged in: " + user.username);
                return sessionId;
            }
            return null;
        }
        
        public User getUserById(String userId) {
            return users.get(userId);
        }
        
        public User getUserBySession(String sessionId) {
            String userId = userSessions.get(sessionId);
            return userId != null ? users.get(userId) : null;
        }
        
        private String generateUserId() {
            return "user_" + System.currentTimeMillis() + "_" + ThreadLocalRandom.current().nextInt(1000);
        }
        
        private String generateSessionId() {
            return "session_" + UUID.randomUUID().toString();
        }
    }
    
    // ==================== WEBSOCKET SERVER ====================
    /**
     * WEBSOCKET SERVER - REAL-TIME COMMUNICATION
     * 
     * How it works:
     * 1. Clients establish WebSocket connections
     * 2. Server maintains connection pool
     * 3. Messages are broadcast to relevant clients
     * 4. Handles connection lifecycle (connect, disconnect, reconnect)
     * 
     * Benefits:
     * - Real-time bidirectional communication
     * - Low latency message delivery
     * - Efficient for group chats
     * - Supports typing indicators, read receipts
     */
    static class WebSocketServer {
        private Map<String, WebSocketConnection> connections = new ConcurrentHashMap<>();
        private Map<String, Set<String>> userConnections = new ConcurrentHashMap<>(); // userId -> connectionIds
        
        static class WebSocketConnection {
            String connectionId;
            String userId;
            long connectedAt;
            boolean isActive;
            
            public WebSocketConnection(String connectionId, String userId) {
                this.connectionId = connectionId;
                this.userId = userId;
                this.connectedAt = System.currentTimeMillis();
                this.isActive = true;
            }
        }
        
        public void connect(String connectionId, String userId) {
            WebSocketConnection connection = new WebSocketConnection(connectionId, userId);
            connections.put(connectionId, connection);
            
            userConnections.computeIfAbsent(userId, k -> ConcurrentHashMap.newKeySet()).add(connectionId);
            System.out.println("WebSocket connected: " + userId + " via " + connectionId);
        }
        
        public void disconnect(String connectionId) {
            WebSocketConnection connection = connections.remove(connectionId);
            if (connection != null) {
                userConnections.get(connection.userId).remove(connectionId);
                System.out.println("WebSocket disconnected: " + connection.userId);
            }
        }
        
        public void sendMessage(String userId, String message) {
            Set<String> userConnectionIds = userConnections.get(userId);
            if (userConnectionIds != null) {
                for (String connectionId : userConnectionIds) {
                    WebSocketConnection connection = connections.get(connectionId);
                    if (connection != null && connection.isActive) {
                        // Simulate sending message via WebSocket
                        System.out.println("WebSocket: Sending to " + userId + " via " + connectionId + ": " + message);
                    }
                }
            }
        }
        
        public void broadcastToGroup(String groupId, String message, Set<String> groupMembers) {
            for (String memberId : groupMembers) {
                sendMessage(memberId, message);
            }
            System.out.println("WebSocket: Broadcasted to group " + groupId + ": " + message);
        }
    }
    
    // ==================== MESSAGE SYSTEM ====================
    /**
     * MESSAGE SYSTEM - RELIABLE MESSAGE DELIVERY
     * 
     * Features:
     * - Message persistence in database
     * - Message ordering and sequencing
     * - Read receipts and delivery status
     * - Message encryption (end-to-end)
     * - Message search and history
     */
    static class Message {
        String messageId;
        String senderId;
        String receiverId; // userId for direct, groupId for group
        String content;
        String messageType; // text, image, video, audio, file
        String mediaUrl;
        long timestamp;
        MessageStatus status;
        Set<String> readBy;
        String replyToMessageId;
        
        public Message(String senderId, String receiverId, String content, String messageType) {
            this.messageId = generateMessageId();
            this.senderId = senderId;
            this.receiverId = receiverId;
            this.content = content;
            this.messageType = messageType;
            this.timestamp = System.currentTimeMillis();
            this.status = MessageStatus.SENT;
            this.readBy = new HashSet<>();
        }
        
        private String generateMessageId() {
            return "msg_" + System.currentTimeMillis() + "_" + ThreadLocalRandom.current().nextInt(10000);
        }
    }
    
    enum MessageStatus {
        SENT, DELIVERED, READ
    }
    
    static class MessageService {
        private Map<String, List<Message>> conversations = new ConcurrentHashMap<>();
        private Map<String, List<Message>> groupMessages = new ConcurrentHashMap<>();
        private WebSocketServer webSocketServer;
        private MessageQueue messageQueue;
        
        public MessageService(WebSocketServer webSocketServer, MessageQueue messageQueue) {
            this.webSocketServer = webSocketServer;
            this.messageQueue = messageQueue;
        }
        
        public Message sendDirectMessage(String senderId, String receiverId, String content, String messageType) {
            Message message = new Message(senderId, receiverId, content, messageType);
            
            // Store in database
            String conversationId = getConversationId(senderId, receiverId);
            conversations.computeIfAbsent(conversationId, k -> new ArrayList<>()).add(message);
            
            // Send via WebSocket if user is online
            webSocketServer.sendMessage(receiverId, message.content);
            
            // Queue for offline delivery
            messageQueue.enqueueMessage(receiverId, message);
            
            System.out.println("Direct message sent: " + senderId + " -> " + receiverId + ": " + content);
            return message;
        }
        
        public Message sendGroupMessage(String senderId, String groupId, String content, String messageType, Set<String> groupMembers) {
            Message message = new Message(senderId, groupId, content, messageType);
            
            // Store in database
            groupMessages.computeIfAbsent(groupId, k -> new ArrayList<>()).add(message);
            
            // Broadcast to online group members
            webSocketServer.broadcastToGroup(groupId, message.content, groupMembers);
            
            // Queue for offline delivery
            for (String memberId : groupMembers) {
                if (!memberId.equals(senderId)) {
                    messageQueue.enqueueMessage(memberId, message);
                }
            }
            
            System.out.println("Group message sent: " + senderId + " -> " + groupId + ": " + content);
            return message;
        }
        
        public List<Message> getConversationHistory(String userId1, String userId2, int limit) {
            String conversationId = getConversationId(userId1, userId2);
            List<Message> messages = conversations.get(conversationId);
            if (messages != null) {
                return messages.subList(Math.max(0, messages.size() - limit), messages.size());
            }
            return new ArrayList<>();
        }
        
        public List<Message> getGroupHistory(String groupId, int limit) {
            List<Message> messages = groupMessages.get(groupId);
            if (messages != null) {
                return messages.subList(Math.max(0, messages.size() - limit), messages.size());
            }
            return new ArrayList<>();
        }
        
        public void markAsRead(String userId, String messageId) {
            // Update message status in database
            System.out.println("Message marked as read: " + messageId + " by " + userId);
        }
        
        private String getConversationId(String userId1, String userId2) {
            // Ensure consistent ordering for conversation ID
            return userId1.compareTo(userId2) < 0 ? 
                userId1 + "_" + userId2 : userId2 + "_" + userId1;
        }
    }
    
    // ==================== GROUP CHAT SYSTEM ====================
    /**
     * GROUP CHAT SYSTEM - MULTI-USER CONVERSATIONS
     * 
     * Features:
     * - Group creation and management
     * - Member roles (admin, moderator, member)
     * - Group permissions and settings
     * - Group avatar and description
     * - Member invitation and removal
     */
    static class Group {
        String groupId;
        String name;
        String description;
        String avatarUrl;
        String createdBy;
        long createdAt;
        Set<String> members;
        Map<String, GroupRole> memberRoles;
        GroupSettings settings;
        
        public Group(String groupId, String name, String createdBy) {
            this.groupId = groupId;
            this.name = name;
            this.createdBy = createdBy;
            this.createdAt = System.currentTimeMillis();
            this.members = ConcurrentHashMap.newKeySet();
            this.memberRoles = new ConcurrentHashMap<>();
            this.settings = new GroupSettings();
            
            // Add creator as admin
            this.members.add(createdBy);
            this.memberRoles.put(createdBy, GroupRole.ADMIN);
        }
    }
    
    enum GroupRole {
        ADMIN, MODERATOR, MEMBER
    }
    
    static class GroupSettings {
        boolean allowMemberInvite = true;
        boolean requireAdminApproval = false;
        int maxMembers = 1000;
        boolean allowMediaSharing = true;
    }
    
    static class GroupService {
        private Map<String, Group> groups = new ConcurrentHashMap<>();
        
        public Group createGroup(String name, String createdBy, Set<String> initialMembers) {
            String groupId = generateGroupId();
            Group group = new Group(groupId, name, createdBy);
            
            // Add initial members
            for (String memberId : initialMembers) {
                group.members.add(memberId);
                group.memberRoles.put(memberId, GroupRole.MEMBER);
            }
            
            groups.put(groupId, group);
            System.out.println("Group created: " + name + " by " + createdBy);
            return group;
        }
        
        public boolean addMember(String groupId, String userId, String addedBy) {
            Group group = groups.get(groupId);
            if (group != null && hasPermission(addedBy, group, GroupRole.MODERATOR)) {
                group.members.add(userId);
                group.memberRoles.put(userId, GroupRole.MEMBER);
                System.out.println("Member added to group: " + userId + " -> " + group.name);
                return true;
            }
            return false;
        }
        
        public boolean removeMember(String groupId, String userId, String removedBy) {
            Group group = groups.get(groupId);
            if (group != null && hasPermission(removedBy, group, GroupRole.MODERATOR)) {
                group.members.remove(userId);
                group.memberRoles.remove(userId);
                System.out.println("Member removed from group: " + userId + " from " + group.name);
                return true;
            }
            return false;
        }
        
        public boolean hasPermission(String userId, Group group, GroupRole requiredRole) {
            GroupRole userRole = group.memberRoles.get(userId);
            if (userRole == null) return false;
            
            switch (requiredRole) {
                case ADMIN: return userRole == GroupRole.ADMIN;
                case MODERATOR: return userRole == GroupRole.ADMIN || userRole == GroupRole.MODERATOR;
                case MEMBER: return true;
                default: return false;
            }
        }
        
        private String generateGroupId() {
            return "group_" + System.currentTimeMillis() + "_" + ThreadLocalRandom.current().nextInt(1000);
        }
    }
    
    // ==================== MEDIA HANDLING ====================
    /**
     * MEDIA HANDLING - FILE UPLOAD & DELIVERY
     * 
     * Features:
     * - Image/video compression and optimization
     * - Thumbnail generation
     * - CDN integration for fast delivery
     * - File size limits and validation
     * - Media metadata storage
     */
    static class MediaService {
        private Map<String, MediaFile> mediaFiles = new ConcurrentHashMap<>();
        private static final long MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
        private static final Set<String> ALLOWED_TYPES = Set.of("jpg", "jpeg", "png", "gif", "mp4", "mov", "mp3", "wav");
        
        static class MediaFile {
            String fileId;
            String originalName;
            String fileType;
            long fileSize;
            String url;
            String thumbnailUrl;
            String uploadedBy;
            long uploadedAt;
            Map<String, String> metadata;
            
            public MediaFile(String fileId, String originalName, String fileType, long fileSize, String uploadedBy) {
                this.fileId = fileId;
                this.originalName = originalName;
                this.fileType = fileType;
                this.fileSize = fileSize;
                this.uploadedBy = uploadedBy;
                this.uploadedAt = System.currentTimeMillis();
                this.metadata = new HashMap<>();
            }
        }
        
        public MediaFile uploadMedia(byte[] fileData, String fileName, String fileType, String uploadedBy) {
            // Validate file
            if (fileData.length > MAX_FILE_SIZE) {
                throw new IllegalArgumentException("File too large");
            }
            
            if (!ALLOWED_TYPES.contains(fileType.toLowerCase())) {
                throw new IllegalArgumentException("File type not allowed");
            }
            
            // Generate file ID and upload to S3 (simulated)
            String fileId = generateFileId();
            String url = uploadToS3(fileId, fileData);
            String thumbnailUrl = generateThumbnail(fileId, fileData, fileType);
            
            MediaFile mediaFile = new MediaFile(fileId, fileName, fileType, fileData.length, uploadedBy);
            mediaFile.url = url;
            mediaFile.thumbnailUrl = thumbnailUrl;
            
            mediaFiles.put(fileId, mediaFile);
            System.out.println("Media uploaded: " + fileName + " (" + fileData.length + " bytes)");
            return mediaFile;
        }
        
        public MediaFile getMediaFile(String fileId) {
            return mediaFiles.get(fileId);
        }
        
        private String generateFileId() {
            return "media_" + System.currentTimeMillis() + "_" + ThreadLocalRandom.current().nextInt(10000);
        }
        
        private String uploadToS3(String fileId, byte[] fileData) {
            // Simulate S3 upload
            return "https://s3.amazonaws.com/chat-app-media/" + fileId;
        }
        
        private String generateThumbnail(String fileId, byte[] fileData, String fileType) {
            // Simulate thumbnail generation
            if (fileType.toLowerCase().matches("jpg|jpeg|png|gif")) {
                return "https://s3.amazonaws.com/chat-app-thumbnails/" + fileId + "_thumb";
            }
            return null;
        }
    }
    
    // ==================== PUSH NOTIFICATIONS ====================
    /**
     * PUSH NOTIFICATIONS - OFFLINE MESSAGE DELIVERY
     * 
     * Features:
     * - Mobile push notifications (FCM, APNs)
     * - Email notifications
     * - SMS notifications
     * - Notification preferences
     * - Delivery tracking
     */
    static class NotificationService {
        private Map<String, NotificationPreferences> userPreferences = new ConcurrentHashMap<>();
        private Map<String, String> userDevices = new ConcurrentHashMap<>(); // userId -> deviceToken
        
        static class NotificationPreferences {
            boolean pushEnabled = true;
            boolean emailEnabled = true;
            boolean smsEnabled = false;
            boolean groupNotifications = true;
            boolean typingIndicators = true;
        }
        
        public void sendPushNotification(String userId, String title, String body, Map<String, String> data) {
            NotificationPreferences prefs = userPreferences.get(userId);
            if (prefs != null && prefs.pushEnabled) {
                String deviceToken = userDevices.get(userId);
                if (deviceToken != null) {
                    // Simulate FCM/APNs push
                    System.out.println("Push notification sent to " + userId + ": " + title + " - " + body);
                }
            }
        }
        
        public void sendEmailNotification(String userId, String subject, String body) {
            NotificationPreferences prefs = userPreferences.get(userId);
            if (prefs != null && prefs.emailEnabled) {
                // Simulate email sending via SES
                System.out.println("Email notification sent to " + userId + ": " + subject);
            }
        }
        
        public void registerDevice(String userId, String deviceToken) {
            userDevices.put(userId, deviceToken);
            System.out.println("Device registered for " + userId + ": " + deviceToken);
        }
        
        public void setNotificationPreferences(String userId, NotificationPreferences preferences) {
            userPreferences.put(userId, preferences);
        }
    }
    
    // ==================== MESSAGE QUEUE ====================
    /**
     * MESSAGE QUEUE - RELIABLE MESSAGE DELIVERY
     * 
     * Features:
     * - Message persistence for offline users
     * - Retry mechanism for failed deliveries
     * - Message ordering and deduplication
     * - Batch processing for efficiency
     */
    static class MessageQueue {
        private Map<String, Queue<Message>> userQueues = new ConcurrentHashMap<>();
        private Map<String, Set<String>> processedMessages = new ConcurrentHashMap<>();
        
        public void enqueueMessage(String userId, Message message) {
            userQueues.computeIfAbsent(userId, k -> new ConcurrentLinkedQueue<>()).offer(message);
            System.out.println("Message queued for " + userId + ": " + message.messageId);
        }
        
        public List<Message> getQueuedMessages(String userId) {
            Queue<Message> queue = userQueues.get(userId);
            if (queue != null) {
                List<Message> messages = new ArrayList<>();
                Message message;
                while ((message = queue.poll()) != null) {
                    messages.add(message);
                }
                return messages;
            }
            return new ArrayList<>();
        }
        
        public void markAsProcessed(String userId, String messageId) {
            processedMessages.computeIfAbsent(userId, k -> ConcurrentHashMap.newKeySet()).add(messageId);
        }
    }
    
    // ==================== DATABASE SCALING ====================
    /**
     * DATABASE SCALING - HORIZONTAL SCALING STRATEGIES
     * 
     * Strategies:
     * 1. Sharding by user ID
     * 2. Read replicas for read-heavy workloads
     * 3. Caching with Redis
     * 4. Database partitioning
     * 5. CDN for static content
     */
    static class DatabaseService {
        private Map<String, Map<String, Object>> shards = new ConcurrentHashMap<>();
        private Map<String, Object> cache = new ConcurrentHashMap<>();
        
        public void storeMessage(String userId, Message message) {
            String shardKey = getShardKey(userId);
            Map<String, Object> shard = shards.computeIfAbsent(shardKey, k -> new ConcurrentHashMap<>());
            
            // Store message in appropriate shard
            String messageKey = "message:" + message.messageId;
            shard.put(messageKey, message);
            
            // Cache recent messages
            cache.put(messageKey, message);
            
            System.out.println("Message stored in shard " + shardKey + ": " + message.messageId);
        }
        
        public Message getMessage(String messageId) {
            // Check cache first
            Message cachedMessage = (Message) cache.get("message:" + messageId);
            if (cachedMessage != null) {
                return cachedMessage;
            }
            
            // Search in shards
            for (Map<String, Object> shard : shards.values()) {
                Message message = (Message) shard.get("message:" + messageId);
                if (message != null) {
                    cache.put("message:" + messageId, message);
                    return message;
                }
            }
            return null;
        }
        
        private String getShardKey(String userId) {
            // Simple hash-based sharding
            return "shard_" + (Math.abs(userId.hashCode()) % 10);
        }
    }
    
    // ==================== MAIN CHAT APP SERVICE ====================
    static class ChatAppService {
        private UserService userService;
        private WebSocketServer webSocketServer;
        private MessageService messageService;
        private GroupService groupService;
        private MediaService mediaService;
        private NotificationService notificationService;
        private MessageQueue messageQueue;
        private DatabaseService databaseService;
        
        public ChatAppService() {
            this.userService = new UserService();
            this.webSocketServer = new WebSocketServer();
            this.messageQueue = new MessageQueue();
            this.messageService = new MessageService(webSocketServer, messageQueue);
            this.groupService = new GroupService();
            this.mediaService = new MediaService();
            this.notificationService = new NotificationService();
            this.databaseService = new DatabaseService();
        }
        
        public void handleUserLogin(String email, String password) {
            String sessionId = userService.loginUser(email, password);
            if (sessionId != null) {
                User user = userService.getUserBySession(sessionId);
                
                // Send queued messages
                List<Message> queuedMessages = messageQueue.getQueuedMessages(user.userId);
                for (Message message : queuedMessages) {
                    webSocketServer.sendMessage(user.userId, message.content);
                }
                
                System.out.println("User logged in and received " + queuedMessages.size() + " queued messages");
            }
        }
        
        public void handleWebSocketConnection(String connectionId, String sessionId) {
            User user = userService.getUserBySession(sessionId);
            if (user != null) {
                webSocketServer.connect(connectionId, user.userId);
            }
        }
        
        public void handleDirectMessage(String senderId, String receiverId, String content) {
            Message message = messageService.sendDirectMessage(senderId, receiverId, content, "text");
            databaseService.storeMessage(receiverId, message);
            
            // Send push notification if user is offline
            User receiver = userService.getUserById(receiverId);
            if (receiver != null && !receiver.isOnline) {
                notificationService.sendPushNotification(receiverId, 
                    "New message from " + userService.getUserById(senderId).username, 
                    content, new HashMap<>());
            }
        }
        
        public void handleGroupMessage(String senderId, String groupId, String content) {
            Group group = groupService.groups.get(groupId);
            if (group != null) {
                Message message = messageService.sendGroupMessage(senderId, groupId, content, "text", group.members);
                databaseService.storeMessage(groupId, message);
                
                // Send notifications to offline group members
                for (String memberId : group.members) {
                    if (!memberId.equals(senderId)) {
                        User member = userService.getUserById(memberId);
                        if (member != null && !member.isOnline) {
                            notificationService.sendPushNotification(memberId,
                                "New message in " + group.name,
                                userService.getUserById(senderId).username + ": " + content,
                                new HashMap<>());
                        }
                    }
                }
            }
        }
    }
    
    // ==================== TESTING ====================
    public static void main(String[] args) {
        System.out.println("🚀 CHAT APP SYSTEM - AMAZON INTERVIEW DEMO\n");
        
        ChatAppService chatApp = new ChatAppService();
        
        // Register users
        User alice = chatApp.userService.registerUser("alice", "alice@example.com", "password");
        User bob = chatApp.userService.registerUser("bob", "bob@example.com", "password");
        User charlie = chatApp.userService.registerUser("charlie", "charlie@example.com", "password");
        
        // Login users
        String aliceSession = chatApp.userService.loginUser("alice@example.com", "password");
        String bobSession = chatApp.userService.loginUser("bob@example.com", "password");
        
        // WebSocket connections
        chatApp.handleWebSocketConnection("conn_alice", aliceSession);
        chatApp.handleWebSocketConnection("conn_bob", bobSession);
        
        // Direct messaging
        chatApp.handleDirectMessage(alice.userId, bob.userId, "Hello Bob!");
        chatApp.handleDirectMessage(bob.userId, alice.userId, "Hi Alice!");
        
        // Group chat
        Set<String> groupMembers = new HashSet<>(Arrays.asList(alice.userId, bob.userId, charlie.userId));
        Group group = chatApp.groupService.createGroup("Friends", alice.userId, groupMembers);
        
        chatApp.handleGroupMessage(alice.userId, group.groupId, "Hello everyone!");
        chatApp.handleGroupMessage(bob.userId, group.groupId, "Hi there!");
        
        // Media upload
        byte[] imageData = "fake image data".getBytes();
        MediaService.MediaFile mediaFile = chatApp.mediaService.uploadMedia(imageData, "photo.jpg", "jpg", alice.userId);
        
        // Send media message
        chatApp.handleDirectMessage(alice.userId, bob.userId, "Check out this photo: " + mediaFile.url);
        
        // Simulate offline user
        charlie.setOnline(false);
        chatApp.handleGroupMessage(alice.userId, group.groupId, "Charlie is offline, he'll get a notification");
        
        // Interview tips
        System.out.println("\n🎯 AMAZON INTERVIEW TIPS:");
        System.out.println("1. Start with WebSocket for real-time communication");
        System.out.println("2. Use SQS/Kafka for reliable message delivery");
        System.out.println("3. Implement database sharding for horizontal scaling");
        System.out.println("4. Use S3 + CDN for media storage and delivery");
        System.out.println("5. Implement push notifications for offline users");
        System.out.println("6. Consider message encryption and security");
        System.out.println("7. Plan for high availability and disaster recovery");
        System.out.println("8. Discuss monitoring, logging, and analytics");
    }
} 