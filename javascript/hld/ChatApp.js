/**
 * CHAT APP SYSTEM DESIGN - AMAZON INTERVIEW ESSENTIALS
 * 
 * sticky session used in distributed system to ensure that the same user is always routed to the same server.
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
 * 
 * High-Level Chat Application Flow with kafka for sending messages to both offline online
 * 
 * 
 * Covers:
 * Real-time messaging (WebSocket)
 * Message delivery
 * Online/offline user handling
 * Kafka usage
 * Database persistence
 * Scalable architecture
 * 1. Client-Server WebSocket Connection
 * When a user opens the chat UI, the client (e.g., mobile app, web app) connects to the chat server via WebSocket.
 * The client sends its userId after connection to authenticate and register presence.

    WebSocket.on('open', () => {
    socket.send({ type: "INIT", userId: "u123", token: "JWT" });
    });

 *  2. WebSocket Gateway Server
    Handles WebSocket connections
 * Maintains in-memory map of userId → socket connection
 * Forwards outgoing messages to connected users
 * const connectedUsers = new Map(); // userId => socket
 * 
 * 3. User Sends a Chat Message
 * Payload: { senderId, receiverId, message, timestamp }
 * Sent via WebSocket to server
 * Server does not deliver directly — instead, it:
 * Saves message in DB
 * Publishes message to Kafka topic chat-messages
 * 
 * 4. Kafka for Decoupling
 * Kafka Topic: chat-messages
 * Each partition might be sharded by receiverId or chatRoomId
 * Ensures high-throughput, fault tolerance, and order (within partition)
 * Producer
 * kafkaProducer.send({
    topic: 'chat-messages',
    key: receiverId,
    value: JSON.stringify(message)
    });

 * 5. Kafka Consumer (Chat Processor Service)
 * Consumes messages in batch (poll every X ms)
 * For each message:
 * Check if receiver is online via connectedUsers[receiverId]
 * If online → push via WebSocket
 * If offline → skip delivery or send push notification
 * for (msg of batch) {
 * if (connectedUsers.has(msg.receiverId)) {
 * connectedUsers.get(msg.receiverId).send(msg);
    } else {
        // Optionally enqueue to retry queue or send push
    }
    }
    // Then commit offset
 * 6. Database Layer
 * Messages are stored in DB (MongoDB/PostgreSQL/etc.)
 * Schema includes:
 * messageId, senderId, receiverId
 * text, timestamp, status (sent, delivered, read)
    Optional: message status updates like "seen", "delivered"
    messages (
    id UUID PK,
    sender_id,
    receiver_id,
    content,
    timestamp,
    status ENUM('sent', 'delivered', 'read')
    )
  7. Online/Offline Tracking
    Presence stored in-memory (Map) or Redis (if multi-instance)
 * TTL updated every few seconds via heartbeats from clients
 * Optional: use Redis SET userId online with expiry (e.g., 30s)

  8. Message Status Updates (optional)
    Client acknowledges delivery or read status:
 * “Message read” → updates DB and sends update to Kafka
 * Pushes read receipt via WebSocket to sender
 * 
 * 
 *  flow when kafka not used for online user
 * 1. User WebSocket Connection
 * Sender (User A) connects to Server A via WebSocket.
 * Receiver (User B) connects to Server B via WebSocket.
 * Each server maintains a WebSocket connection map: userId ➝ socketInstance.
 * 2. Sender Sends Message
 * User A sends message → hits Server A via WebSocket.
 * Server A authenticates the sender and validates message structure.
 * Message is stored in the database (for persistence).
 * 
 * 3. Server A Identifies Receiver’s Location
 * Server A checks if User B is online, and on which server.
 * How to identify?
 * You need shared presence state, like:
 * Redis pub/sub, or
 * A shared session or user-presence store (like Redis Hash/Set).
 * 
 * Example:
 * Redis Key: user:presence
 * Value: { userB: "serverB", userA: "serverA" }
 * 
 * 4. Inter-Server Communication
 * If receiver is on Server B, then Server A:
 * Publishes the message to Server B via:
 * Redis pub/sub, or
 * gRPC/HTTP call, or
 * WebSocket cluster communication (like socket.io with Redis adapter).
 * 
 * 5. Server B Delivers Message
 * Server B receives the forwarded message.
 * Looks up User B’s WebSocket.
 * 
 * Delivers message in real-time via WebSocket.
 * Optionally, sends read receipts/delivery ack.
 * 
 * 6. Fallback if User B is Offline
 * If User B is offline:
 * Message is just stored in DB.
 * Can trigger push notification (via FCM/APNs).
 * Delivered when User B comes online (via DB polling or Redis pending set).
 */

class ChatApp {
    
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
    static User = class {
        constructor(userId, username, email) {
            this.userId = userId;
            this.username = username;
            this.email = email;
            this.phoneNumber = null;
            this.avatarUrl = null;
            this.status = null;
            this.isOnline = false;
            this.lastSeen = Date.now();
            this.contacts = new Set();
            this.groups = new Set();
        }
        
        updateStatus(status) {
            this.status = status;
            this.lastSeen = Date.now();
        }
        
        setOnline(online) {
            this.isOnline = online;
            this.lastSeen = Date.now();
        }
    }
    
    static UserService = class {
        constructor() {
            this.users = new Map();
            this.userSessions = new Map(); // sessionId -> userId
        }
        
        registerUser(username, email, password) {
            const userId = this.generateUserId();
            const user = new ChatApp.User(userId, username, email);
            this.users.set(userId, user);
            console.log('User registered:', username);
            return user;
        }
        
        loginUser(email, password) {
            // Simulate authentication
            const user = Array.from(this.users.values()).find(u => u.email === email);
            
            if (user) {
                const sessionId = this.generateSessionId();
                this.userSessions.set(sessionId, user.userId);
                user.setOnline(true);
                console.log('User logged in:', user.username);
                return sessionId;
            }
            return null;
        }
        
        getUserById(userId) {
            return this.users.get(userId);
        }
        
        getUserBySession(sessionId) {
            const userId = this.userSessions.get(sessionId);
            return userId ? this.users.get(userId) : null;
        }
        
        generateUserId() {
            return 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        }
        
        generateSessionId() {
            return 'session_' + this.generateUUID();
        }
        
        generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
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
    static WebSocketServer = class {
        constructor() {
            this.connections = new Map();
            this.userConnections = new Map(); // userId -> Set of connectionIds
        }
        
        static WebSocketConnection = class {
            constructor(connectionId, userId) {
                this.connectionId = connectionId;
                this.userId = userId;
                this.connectedAt = Date.now();
                this.isActive = true;
            }
        }
        
        connect(connectionId, userId) {
            const connection = new ChatApp.WebSocketServer.WebSocketConnection(connectionId, userId);
            this.connections.set(connectionId, connection);
            
            if (!this.userConnections.has(userId)) {
                this.userConnections.set(userId, new Set());
            }
            this.userConnections.get(userId).add(connectionId);
            console.log('WebSocket connected:', userId, 'via', connectionId);
        }
        
        disconnect(connectionId) {
            const connection = this.connections.get(connectionId);
            if (connection) {
                this.connections.delete(connectionId);
                this.userConnections.get(connection.userId).delete(connectionId);
                console.log('WebSocket disconnected:', connection.userId);
            }
        }
        
        sendMessage(userId, message) {
            const userConnectionIds = this.userConnections.get(userId);
            if (userConnectionIds) {
                for (const connectionId of userConnectionIds) {
                    const connection = this.connections.get(connectionId);
                    if (connection && connection.isActive) {
                        // Simulate sending message via WebSocket
                        console.log('WebSocket: Sending to', userId, 'via', connectionId + ':', message);
                    }
                }
            }
        }
        
        broadcastToGroup(groupId, message, groupMembers) {
            for (const memberId of groupMembers) {
                this.sendMessage(memberId, message);
            }
            console.log('WebSocket: Broadcasted to group', groupId + ':', message);
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
    static Message = class {
        constructor(senderId, receiverId, content, messageType) {
            this.messageId = this.generateMessageId();
            this.senderId = senderId;
            this.receiverId = receiverId; // userId for direct, groupId for group
            this.content = content;
            this.messageType = messageType; // text, image, video, audio, file
            this.mediaUrl = null;
            this.timestamp = Date.now();
            this.status = 'SENT';
            this.readBy = new Set();
            this.replyToMessageId = null;
        }
        
        generateMessageId() {
            return 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
        }
    }
    
    static MessageService = class {
        constructor(webSocketServer, messageQueue) {
            this.conversations = new Map();
            this.groupMessages = new Map();
            this.webSocketServer = webSocketServer;
            this.messageQueue = messageQueue;
        }
        
        sendDirectMessage(senderId, receiverId, content, messageType) {
            const message = new ChatApp.Message(senderId, receiverId, content, messageType);
            
            // Store in database
            const conversationId = this.getConversationId(senderId, receiverId);
            if (!this.conversations.has(conversationId)) {
                this.conversations.set(conversationId, []);
            }
            this.conversations.get(conversationId).push(message);
            
            // Send via WebSocket if user is online
            this.webSocketServer.sendMessage(receiverId, message.content);
            
            // Queue for offline delivery
            this.messageQueue.enqueueMessage(receiverId, message);
            
            console.log('Direct message sent:', senderId, '->', receiverId + ':', content);
            return message;
        }
        
        sendGroupMessage(senderId, groupId, content, messageType, groupMembers) {
            const message = new ChatApp.Message(senderId, groupId, content, messageType);
            
            // Store in database
            if (!this.groupMessages.has(groupId)) {
                this.groupMessages.set(groupId, []);
            }
            this.groupMessages.get(groupId).push(message);
            
            // Broadcast to online group members
            this.webSocketServer.broadcastToGroup(groupId, message.content, groupMembers);
            
            // Queue for offline delivery
            for (const memberId of groupMembers) {
                if (memberId !== senderId) {
                    this.messageQueue.enqueueMessage(memberId, message);
                }
            }
            
            console.log('Group message sent:', senderId, '->', groupId + ':', content);
            return message;
        }
        
        getConversationHistory(userId1, userId2, limit) {
            const conversationId = this.getConversationId(userId1, userId2);
            const messages = this.conversations.get(conversationId);
            if (messages) {
                return messages.slice(-limit);
            }
            return [];
        }
        
        getGroupHistory(groupId, limit) {
            const messages = this.groupMessages.get(groupId);
            if (messages) {
                return messages.slice(-limit);
            }
            return [];
        }
        
        markAsRead(userId, messageId) {
            // Update message status in database
            console.log('Message marked as read:', messageId, 'by', userId);
        }
        
        getConversationId(userId1, userId2) {
            // Ensure consistent ordering for conversation ID
            return userId1 < userId2 ? userId1 + '_' + userId2 : userId2 + '_' + userId1;
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
    static Group = class {
        constructor(groupId, name, createdBy) {
            this.groupId = groupId;
            this.name = name;
            this.description = null;
            this.avatarUrl = null;
            this.createdBy = createdBy;
            this.createdAt = Date.now();
            this.members = new Set();
            this.memberRoles = new Map();
            this.settings = new ChatApp.GroupSettings();
            
            // Add creator as admin
            this.members.add(createdBy);
            this.memberRoles.set(createdBy, 'ADMIN');
        }
    }
    
    static GroupSettings = class {
        constructor() {
            this.allowMemberInvite = true;
            this.requireAdminApproval = false;
            this.maxMembers = 1000;
            this.allowMediaSharing = true;
        }
    }
    
    static GroupService = class {
        constructor() {
            this.groups = new Map();
        }
        
        createGroup(name, createdBy, initialMembers) {
            const groupId = this.generateGroupId();
            const group = new ChatApp.Group(groupId, name, createdBy);
            
            // Add initial members
            for (const memberId of initialMembers) {
                group.members.add(memberId);
                group.memberRoles.set(memberId, 'MEMBER');
            }
            
            this.groups.set(groupId, group);
            console.log('Group created:', name, 'by', createdBy);
            return group;
        }
        
        addMember(groupId, userId, addedBy) {
            const group = this.groups.get(groupId);
            if (group && this.hasPermission(addedBy, group, 'MODERATOR')) {
                group.members.add(userId);
                group.memberRoles.set(userId, 'MEMBER');
                console.log('Member added to group:', userId, '->', group.name);
                return true;
            }
            return false;
        }
        
        removeMember(groupId, userId, removedBy) {
            const group = this.groups.get(groupId);
            if (group && this.hasPermission(removedBy, group, 'MODERATOR')) {
                group.members.delete(userId);
                group.memberRoles.delete(userId);
                console.log('Member removed from group:', userId, 'from', group.name);
                return true;
            }
            return false;
        }
        
        hasPermission(userId, group, requiredRole) {
            const userRole = group.memberRoles.get(userId);
            if (!userRole) return false;
            
            switch (requiredRole) {
                case 'ADMIN': return userRole === 'ADMIN';
                case 'MODERATOR': return userRole === 'ADMIN' || userRole === 'MODERATOR';
                case 'MEMBER': return true;
                default: return false;
            }
        }
        
        generateGroupId() {
            return 'group_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
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
    static MediaService = class {
        constructor() {
            this.mediaFiles = new Map();
            this.MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
            this.ALLOWED_TYPES = new Set(['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'mp3', 'wav']);
        }
        
        static MediaFile = class {
            constructor(fileId, originalName, fileType, fileSize, uploadedBy) {
                this.fileId = fileId;
                this.originalName = originalName;
                this.fileType = fileType;
                this.fileSize = fileSize;
                this.url = null;
                this.thumbnailUrl = null;
                this.uploadedBy = uploadedBy;
                this.uploadedAt = Date.now();
                this.metadata = new Map();
            }
        }
        
        uploadMedia(fileData, fileName, fileType, uploadedBy) {
            // Validate file
            if (fileData.length > this.MAX_FILE_SIZE) {
                throw new Error('File too large');
            }
            
            if (!this.ALLOWED_TYPES.has(fileType.toLowerCase())) {
                throw new Error('File type not allowed');
            }
            
            // Generate file ID and upload to S3 (simulated)
            const fileId = this.generateFileId();
            const url = this.uploadToS3(fileId, fileData);
            const thumbnailUrl = this.generateThumbnail(fileId, fileData, fileType);
            
            const mediaFile = new ChatApp.MediaService.MediaFile(fileId, fileName, fileType, fileData.length, uploadedBy);
            mediaFile.url = url;
            mediaFile.thumbnailUrl = thumbnailUrl;
            
            this.mediaFiles.set(fileId, mediaFile);
            console.log('Media uploaded:', fileName, '(', fileData.length, 'bytes)');
            return mediaFile;
        }
        
        getMediaFile(fileId) {
            return this.mediaFiles.get(fileId);
        }
        
        generateFileId() {
            return 'media_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
        }
        
        uploadToS3(fileId, fileData) {
            // Simulate S3 upload
            return 'https://s3.amazonaws.com/chat-app-media/' + fileId;
        }
        
        generateThumbnail(fileId, fileData, fileType) {
            // Simulate thumbnail generation
            if (fileType.toLowerCase().match(/jpg|jpeg|png|gif/)) {
                return 'https://s3.amazonaws.com/chat-app-thumbnails/' + fileId + '_thumb';
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
    static NotificationService = class {
        constructor() {
            this.userPreferences = new Map();
            this.userDevices = new Map(); // userId -> deviceToken
        }
        
        static NotificationPreferences = class {
            constructor() {
                this.pushEnabled = true;
                this.emailEnabled = true;
                this.smsEnabled = false;
                this.groupNotifications = true;
                this.typingIndicators = true;
            }
        }
        
        sendPushNotification(userId, title, body, data) {
            const prefs = this.userPreferences.get(userId);
            if (prefs && prefs.pushEnabled) {
                const deviceToken = this.userDevices.get(userId);
                if (deviceToken) {
                    // Simulate FCM/APNs push
                    console.log('Push notification sent to', userId + ':', title, '-', body);
                }
            }
        }
        
        sendEmailNotification(userId, subject, body) {
            const prefs = this.userPreferences.get(userId);
            if (prefs && prefs.emailEnabled) {
                // Simulate email sending via SES
                console.log('Email notification sent to', userId + ':', subject);
            }
        }
        
        registerDevice(userId, deviceToken) {
            this.userDevices.set(userId, deviceToken);
            console.log('Device registered for', userId + ':', deviceToken);
        }
        
        setNotificationPreferences(userId, preferences) {
            this.userPreferences.set(userId, preferences);
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
    static MessageQueue = class {
        constructor() {
            this.userQueues = new Map();
            this.processedMessages = new Map();
        }
        
        enqueueMessage(userId, message) {
            if (!this.userQueues.has(userId)) {
                this.userQueues.set(userId, []);
            }
            this.userQueues.get(userId).push(message);
            console.log('Message queued for', userId + ':', message.messageId);
        }
        
        getQueuedMessages(userId) {
            const queue = this.userQueues.get(userId);
            if (queue) {
                const messages = [...queue];
                this.userQueues.set(userId, []);
                return messages;
            }
            return [];
        }
        
        markAsProcessed(userId, messageId) {
            if (!this.processedMessages.has(userId)) {
                this.processedMessages.set(userId, new Set());
            }
            this.processedMessages.get(userId).add(messageId);
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
    static DatabaseService = class {
        constructor() {
            this.shards = new Map();
            this.cache = new Map();
        }
        
        storeMessage(userId, message) {
            const shardKey = this.getShardKey(userId);
            if (!this.shards.has(shardKey)) {
                this.shards.set(shardKey, new Map());
            }
            const shard = this.shards.get(shardKey);
            
            // Store message in appropriate shard
            const messageKey = 'message:' + message.messageId;
            shard.set(messageKey, message);
            
            // Cache recent messages
            this.cache.set(messageKey, message);
            
            console.log('Message stored in shard', shardKey + ':', message.messageId);
        }
        
        getMessage(messageId) {
            // Check cache first
            const cachedMessage = this.cache.get('message:' + messageId);
            if (cachedMessage) {
                return cachedMessage;
            }
            
            // Search in shards
            for (const shard of this.shards.values()) {
                const message = shard.get('message:' + messageId);
                if (message) {
                    this.cache.set('message:' + messageId, message);
                    return message;
                }
            }
            return null;
        }
        
        getShardKey(userId) {
            // Simple hash-based sharding
            return 'shard_' + (Math.abs(this.hashCode(userId)) % 10);
        }
        
        hashCode(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32-bit integer
            }
            return Math.abs(hash);
        }
    }
    
    // ==================== MAIN CHAT APP SERVICE ====================
    static ChatAppService = class {
        constructor() {
            this.userService = new ChatApp.UserService();
            this.webSocketServer = new ChatApp.WebSocketServer();
            this.messageQueue = new ChatApp.MessageQueue();
            this.messageService = new ChatApp.MessageService(this.webSocketServer, this.messageQueue);
            this.groupService = new ChatApp.GroupService();
            this.mediaService = new ChatApp.MediaService();
            this.notificationService = new ChatApp.NotificationService();
            this.databaseService = new ChatApp.DatabaseService();
        }
        
        handleUserLogin(email, password) {
            const sessionId = this.userService.loginUser(email, password);
            if (sessionId) {
                const user = this.userService.getUserBySession(sessionId);
                
                // Send queued messages
                const queuedMessages = this.messageQueue.getQueuedMessages(user.userId);
                for (const message of queuedMessages) {
                    this.webSocketServer.sendMessage(user.userId, message.content);
                }
                
                console.log('User logged in and received', queuedMessages.length, 'queued messages');
            }
        }
        
        handleWebSocketConnection(connectionId, sessionId) {
            const user = this.userService.getUserBySession(sessionId);
            if (user) {
                this.webSocketServer.connect(connectionId, user.userId);
            }
        }
        
        handleDirectMessage(senderId, receiverId, content) {
            const message = this.messageService.sendDirectMessage(senderId, receiverId, content, 'text');
            this.databaseService.storeMessage(receiverId, message);
            
            // Send push notification if user is offline
            const receiver = this.userService.getUserById(receiverId);
            if (receiver && !receiver.isOnline) {
                this.notificationService.sendPushNotification(receiverId, 
                    'New message from ' + this.userService.getUserById(senderId).username, 
                    content, new Map());
            }
        }
        
        handleGroupMessage(senderId, groupId, content) {
            const group = this.groupService.groups.get(groupId);
            if (group) {
                const message = this.messageService.sendGroupMessage(senderId, groupId, content, 'text', group.members);
                this.databaseService.storeMessage(groupId, message);
                
                // Send notifications to offline group members
                for (const memberId of group.members) {
                    if (memberId !== senderId) {
                        const member = this.userService.getUserById(memberId);
                        if (member && !member.isOnline) {
                            this.notificationService.sendPushNotification(memberId,
                                'New message in ' + group.name,
                                this.userService.getUserById(senderId).username + ': ' + content,
                                new Map());
                        }
                    }
                }
            }
        }
    }
}

// ==================== TESTING FUNCTIONS ====================
function testUserManagement() {
    console.log('=== USER MANAGEMENT ===');
    const userService = new ChatApp.UserService();
    
    const alice = userService.registerUser('alice', 'alice@example.com', 'password');
    const bob = userService.registerUser('bob', 'bob@example.com', 'password');
    
    const aliceSession = userService.loginUser('alice@example.com', 'password');
    console.log('Alice session:', aliceSession);
}

function testWebSocket() {
    console.log('\n=== WEBSOCKET SERVER ===');
    const webSocketServer = new ChatApp.WebSocketServer();
    
    webSocketServer.connect('conn_1', 'user_1');
    webSocketServer.connect('conn_2', 'user_2');
    webSocketServer.sendMessage('user_1', 'Hello from WebSocket!');
    webSocketServer.broadcastToGroup('group_1', 'Group message!', new Set(['user_1', 'user_2']));
}

function testDirectMessaging() {
    console.log('\n=== DIRECT MESSAGING ===');
    const webSocketServer = new ChatApp.WebSocketServer();
    const messageQueue = new ChatApp.MessageQueue();
    const messageService = new ChatApp.MessageService(webSocketServer, messageQueue);
    
    messageService.sendDirectMessage('user_1', 'user_2', 'Hello Bob!', 'text');
    messageService.sendDirectMessage('user_2', 'user_1', 'Hi Alice!', 'text');
}

function testGroupChat() {
    console.log('\n=== GROUP CHAT ===');
    const groupService = new ChatApp.GroupService();
    const webSocketServer = new ChatApp.WebSocketServer();
    const messageQueue = new ChatApp.MessageQueue();
    const messageService = new ChatApp.MessageService(webSocketServer, messageQueue);
    
    const groupMembers = new Set(['user_1', 'user_2', 'user_3']);
    const group = groupService.createGroup('Friends', 'user_1', groupMembers);
    
    messageService.sendGroupMessage('user_1', group.groupId, 'Hello everyone!', 'text', group.members);
    messageService.sendGroupMessage('user_2', group.groupId, 'Hi there!', 'text', group.members);
}

function testMediaHandling() {
    console.log('\n=== MEDIA HANDLING ===');
    const mediaService = new ChatApp.MediaService();
    
    const imageData = Buffer.from('fake image data');
    const mediaFile = mediaService.uploadMedia(imageData, 'photo.jpg', 'jpg', 'user_1');
    console.log('Media file uploaded:', mediaFile.url);
}

function testNotifications() {
    console.log('\n=== PUSH NOTIFICATIONS ===');
    const notificationService = new ChatApp.NotificationService();
    
    notificationService.registerDevice('user_1', 'device_token_123');
    notificationService.sendPushNotification('user_1', 'New Message', 'You have a new message', new Map());
    notificationService.sendEmailNotification('user_1', 'New Message', 'You have a new message');
}

function testDatabaseScaling() {
    console.log('\n=== DATABASE SCALING ===');
    const databaseService = new ChatApp.DatabaseService();
    
    const message = new ChatApp.Message('user_1', 'user_2', 'Test message', 'text');
    databaseService.storeMessage('user_2', message);
    
    const retrievedMessage = databaseService.getMessage(message.messageId);
    console.log('Retrieved message:', retrievedMessage ? retrievedMessage.content : 'Not found');
}

function testCompleteChatApp() {
    console.log('\n=== COMPLETE CHAT APP ===');
    const chatApp = new ChatApp.ChatAppService();
    
    // Register users
    const alice = chatApp.userService.registerUser('alice', 'alice@example.com', 'password');
    const bob = chatApp.userService.registerUser('bob', 'bob@example.com', 'password');
    const charlie = chatApp.userService.registerUser('charlie', 'charlie@example.com', 'password');
    
    // Login users
    const aliceSession = chatApp.userService.loginUser('alice@example.com', 'password');
    const bobSession = chatApp.userService.loginUser('bob@example.com', 'password');
    
    // WebSocket connections
    chatApp.handleWebSocketConnection('conn_alice', aliceSession);
    chatApp.handleWebSocketConnection('conn_bob', bobSession);
    
    // Direct messaging
    chatApp.handleDirectMessage(alice.userId, bob.userId, 'Hello Bob!');
    chatApp.handleDirectMessage(bob.userId, alice.userId, 'Hi Alice!');
    
    // Group chat
    const groupMembers = new Set([alice.userId, bob.userId, charlie.userId]);
    const group = chatApp.groupService.createGroup('Friends', alice.userId, groupMembers);
    
    chatApp.handleGroupMessage(alice.userId, group.groupId, 'Hello everyone!');
    chatApp.handleGroupMessage(bob.userId, group.groupId, 'Hi there!');
    
    // Media upload
    const imageData = Buffer.from('fake image data');
    const mediaFile = chatApp.mediaService.uploadMedia(imageData, 'photo.jpg', 'jpg', alice.userId);
    
    // Send media message
    chatApp.handleDirectMessage(alice.userId, bob.userId, 'Check out this photo: ' + mediaFile.url);
    
    // Simulate offline user
    charlie.setOnline(false);
    chatApp.handleGroupMessage(alice.userId, group.groupId, 'Charlie is offline, he\'ll get a notification');
}

// ==================== MAIN TEST FUNCTION ====================
function runTests() {
    console.log('🚀 CHAT APP SYSTEM - AMAZON INTERVIEW DEMO\n');
    
    testUserManagement();
    testWebSocket();
    testDirectMessaging();
    testGroupChat();
    testMediaHandling();
    testNotifications();
    testDatabaseScaling();
    testCompleteChatApp();
    
    // Interview tips
    console.log('\n🎯 AMAZON INTERVIEW TIPS:');
    console.log('1. Start with WebSocket for real-time communication');
    console.log('2. Use SQS/Kafka for reliable message delivery');
    console.log('3. Implement database sharding for horizontal scaling');
    console.log('4. Use S3 + CDN for media storage and delivery');
    console.log('5. Implement push notifications for offline users');
    console.log('6. Consider message encryption and security');
    console.log('7. Plan for high availability and disaster recovery');
    console.log('8. Discuss monitoring, logging, and analytics');
}

// ==================== EXPORT FOR USE ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatApp;
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
} 