/**
 * MESSAGING SYSTEM - AMAZON INTERVIEW ESSENTIALS
 * 
 * 🎯 WHAT TO REMEMBER FOR INTERVIEWS:
 * 1. Kafka: High throughput, distributed streaming platform
 * 2. SQS: Managed message queue service, at-least-once delivery
 * 3. RabbitMQ: Traditional message broker, multiple protocols
 * 4. Delivery Guarantees: At-least-once, exactly-once, at-most-once
 * 5. Message Ordering: FIFO vs Standard queues
 * 
 * 🔑 KEY CONCEPTS:
 * - Messaging systems decouple producers from consumers
 * - Queues provide reliability and scalability
 * - Different systems for different use cases (streaming vs queuing)
 * - Delivery guarantees ensure message processing
 * - Message ordering is critical for some applications
 * 
 * 📊 SYSTEM COMPARISON:
 * Kafka: ✅ High throughput, ✅ Streaming, ✅ Distributed, ❌ Complex setup
 * SQS: ✅ Managed service, ✅ Auto-scaling, ✅ Simple, ❌ Limited features
 * RabbitMQ: ✅ Multiple protocols, ✅ Flexible routing, ✅ Mature, ❌ Manual scaling
 * Redis Pub/Sub: ✅ Fast, ✅ Simple, ❌ No persistence, ❌ No guarantees
 * 
 * System	            Supports FIFO	        Supports Unordered	Notes
 * Kafka	        ✅ (per partition)       	✅ (multi-partition)	Ideal for high-throughput & key-based order
 * SQS	            ✅ (FIFO queue)              ✅ (Standard queue)	FIFO limits throughput
 * RabbitMQ     	✅ (single queue)	        ✅ (multiple queues/consumers)
 * 
 * Kafka – Distributed Streaming Platform
 * Best when: You need high-throughput, event-driven, durable, ordered streams of data.
 * 
 * SQS or RabbitMQ – Message Queuing System
 * Best when: You need task distribution, job queues, and decoupling services with guaranteed delivery.
 * 
 *  Real Example
 *  1. E-commerce Site (Order System)

 *  User places an order → Event to Kafka (OrderPlaced) → Inventory, Payment, Notification services consume that event = Kafka (Event Stream)

 *  PDF invoice generation, email sending = SQS or RabbitMQ (Task Queue)

 *  2. Loan Approval System (Fintech)

 *  Loan application submitted → pushed to Kafka stream → async processing services analyze it = Kafka

 *  If verification step fails → push retry job to DLQ (SQS FIFO) = SQ
 * 
 * About SNS
 * Say you're Flipkart or Zomato:
 * When a sale starts or order is placed, you send millions of notifications instantly.
 * SNS handles:
 * Mobile push (via Firebase/APNs)
 * SMS via telecom
 * Emails via SES
 * SQS fan-out to downstream services
 * 
 * Short Summary with Key Aspects
    Kafka
    Connection: TCP to Kafka broker
    Load Balancing: Partitioning by key or round-robin
    Routing: Topic + partition
    Storage: Disk-based append-only log
    Ordering: Guaranteed per partition
    Push/Pull: Pull-only (consumer fetches)
    Ack/Delete: Consumer commits offset; messages retained by time/size
    Replayable: ✅ Yes (via offset rewind)

    RabbitMQ
    Connection: TCP (AMQP) to broker
    Load Balancing: Broker distributes to consumers (round-robin/fair)
    Routing: Exchange → Queue via binding key
    Storage: Ram + optional disk (durable queue) (firstly in ram if ram full then old one move to disk)
    Ordering: Queue-level (not strict in fanout/multiple consumers)
    Push/Pull: Push by default (pull also possible)
    Ack/Delete: Ack removes message; redelivery on nack/no-ack
    Replayable: ❌ No (once acked, gone)

    Amazon SQS
    Connection: HTTPS to AWS endpoint
    Load Balancing: AWS distributes messages randomly
    Routing: Queue name-based; no routing logic
    Storage: Fully managed by AWS (durable)
    Ordering: No guarantee (unless FIFO queue is used)
    Push/Pull: Pull-only (long polling)
    Ack/Delete: DeleteMessage call after processing
    Replayable: ❌ No (message deleted after deletion call)
 */

class MessagingQueue {
    
    // ==================== KAFKA IMPLEMENTATION ====================
    /**
     * KAFKA - DISTRIBUTED STREAMING PLATFORM
     * 
     * How it works:
     * 1. Topics are divided into partitions
     * 2. Messages are distributed across partitions
     * 3. Consumers read from specific partitions
     * 4. Messages are persisted to disk
     * 5. Supports high throughput and fault tolerance
     * 
     * Use cases: Event streaming, log aggregation, real-time analytics
     * Delivery: At-least-once (configurable to exactly-once)
     * Ordering: Within partition only
     * Model: PULL-based (consumers poll for messages)
     * Notification: No built-in notifications, consumers must poll
     * 
     * Typical flow of Kafka service internally
   ✅ Kafka Data Flow: From Producer to Deletion
    1. 🛠️ Producer Sends Data
    Producer prepares a record: <key, value>.
    Partitioner (default: hash(key) % numPartitions) picks a partition of the topic.
    Producer sends the record to the leader broker for that partition.
    2. 🧠 Kafka Controller / Broker Role
    One broker (Controller) maintains:
    🧭 Partition–Leader mapping
    🧬 ISR (In-Sync Replica) set
    It routes the request to the current leader of the chosen partition.
    3. 📥 Leader Broker Handles the Write
    Leader appends the record to a disk-based append-only log file:
    Path: /tmp/kafka-logs/<topic>/<partition>/
    Record gets an offset (sequential number).
    4. 📤 Replication to Follower Brokers
    Followers pull data from the leader asynchronously.
    They replicate log in the same order (to preserve offset).
    ISR (In-Sync Replicas) = brokers whose replicas are fully caught up.
    🧠 Kafka checks replica.lag.time.max.ms & replica.lag.max.messages to maintain ISR.
    5. ✅ Acknowledgment to Producer
    Based on acks config:
    acks=0: No wait, fire-and-forget
    acks=1: Wait for leader only
    acks=all: Wait for all ISR members to replicate ✅
    Once acked, producer proceeds.
    💾 Data Storage in Kafka
    Stored in segment files per partition, with index files for faster lookups.
    Data is persisted to disk (durability).
    Can survive broker restarts (unless log is corrupted).
    🧑‍🤝‍🧑 Consumer Reads Data
    Consumer reads from leader partition only (by default).
    Uses offsets to track progress.
    Can commit offsets manually or automatically (to Kafka or external store).
    🔁 Leader Failover (If Happens)
    Kafka controller elects a new leader from ISR (to avoid data loss).
    Followers use ReplicaFetcher threads to sync missing data and rejoin ISR.
    🗑️ Data Retention & Deletion
    Kafka retains data based on topic config:
    retention.ms (time-based)
    retention.bytes (size-based)
    After limit is reached:
    Kafka deletes old log segments in background.
    Done per partition, no impact on newer messages.
    Consumers must keep up or risk data loss if offsets lag too far behind
     */
    static KafkaProducer = class {
        constructor(topic, numPartitions) {
            this.topic = topic;
            this.partitions = new Map();
            this.partitionCounter = 0;
            
            // Initialize partitions
            for (let i = 0; i < numPartitions; i++) {
                this.partitions.set(i, []);
            }
        }
        
        sendMessage(key, value) {
            // Simple partitioning based on key hash
            const partition = Math.abs(this.hashCode(key)) % this.partitions.size;
            const message = new Message(key, value, Date.now());
            
            this.partitions.get(partition).push(message);
            console.log(`Kafka: Message sent to partition ${partition}: ${value}`);
        }
        
        sendMessageToPartition(value, partition) {
            const message = new Message(null, value, Date.now());
            this.partitions.get(partition).push(message);
            console.log(`Kafka: Message sent to partition ${partition}: ${value}`);
        }
        
        getMessagesFromPartition(partition, offset) {
            const partitionMessages = this.partitions.get(partition);
            if (offset >= partitionMessages.length) {
                return [];
            }
            return partitionMessages.slice(offset);
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
    
    static KafkaConsumer = class {
        constructor(groupId, producer) {
            this.groupId = groupId;
            this.partitionOffsets = new Map();
            this.producer = producer;
        }
        
        consumeFromPartition(partition, messageHandler) {
            const offset = this.partitionOffsets.get(partition) || 0;
            const messages = this.producer.getMessagesFromPartition(partition, offset);
            
            for (const message of messages) {
                try {
                    messageHandler(message);
                    this.partitionOffsets.set(partition, offset + 1);
                } catch (error) {
                    console.error('Error processing message:', error.message);
                    // In real Kafka, this would trigger retry logic
                }
            }
        }
        
        // KAFKA PULL MODEL EXPLANATION:
        // - Consumers actively poll for messages using fetch requests
        // - No built-in notifications - consumers must continuously poll
        // - Consumers control their own consumption rate
        // - Better for batch processing and handling backpressure
        // - Long polling can be used to reduce empty responses
        
        consumeAllPartitions(messageHandler) {
            for (const partition of this.producer.partitions.keys()) {
                this.consumeFromPartition(partition, messageHandler);
            }
        }
    }
    
    // ==================== SQS IMPLEMENTATION ====================
    /**
     * SQS - MANAGED MESSAGE QUEUE SERVICE
     * 
     * How it works:
     * 1. Producers send messages to queues
     * 2. Messages are stored redundantly across AZs
     * 3. Consumers poll for messages
     * 4. Messages are deleted after successful processing
     * 5. Supports both Standard and FIFO queues
     * 
     * Use cases: Decoupling microservices, background job processing
     * Delivery: At-least-once (Standard), exactly-once (FIFO)
     * Ordering: No ordering (Standard), strict ordering (FIFO)
     * Model: PULL-based (long polling for efficiency)
     * Notification: Can integrate with SNS for push notifications
     */
    static SQSQueue = class {
        constructor(queueName, isFIFO = false) {
            this.queueName = queueName;
            this.messages = [];
            this.isFIFO = isFIFO;
            this.inFlightMessages = new Map();
            this.messageIdCounter = 0;
        }
        
        sendMessage(body, groupId = null) {
            const messageId = this.isFIFO ? 
                `${groupId}#${++this.messageIdCounter}` :
                this.generateUUID();
            
            const message = new Message(messageId, body, Date.now());
            message.groupId = groupId;
            this.messages.push(message);
            
            console.log(`SQS: Message sent to ${this.queueName}: ${body}`);
            return messageId;
        }
        
        receiveMessage() {
            const message = this.messages.shift();
            if (message) {
                this.inFlightMessages.set(message.id, message);
                console.log(`SQS: Message received from ${this.queueName}: ${message.value}`);
            }
            return message;
        }
        
        // SQS PULL MODEL EXPLANATION:
        // - Long polling (up to 20 seconds) to reduce empty responses
        // - No push notifications - consumers must poll
        // - Can integrate with SNS for push-based notifications
        // - Visibility timeout prevents duplicate processing
        // - Supports batch operations for efficiency
        
        deleteMessage(messageId) {
            const message = this.inFlightMessages.get(messageId);
            if (message) {
                this.inFlightMessages.delete(messageId);
                console.log(`SQS: Message deleted from ${this.queueName}: ${message.value}`);
            }
        }
        
        changeMessageVisibility(messageId, visibilityTimeoutSeconds) {
            // In real SQS, this would extend the visibility timeout
            console.log(`SQS: Changed visibility timeout for message ${messageId}`);
        }
        
        generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
    
    // ==================== RABBITMQ IMPLEMENTATION ====================
    /**
     * RABBITMQ - TRADITIONAL MESSAGE BROKER
     * 
     * How it works:
     * 1. Producers send messages to exchanges
     * 2. Exchanges route messages to queues based on routing keys
     * 3. Consumers subscribe to queues
     * 4. Supports multiple exchange types (direct, topic, fanout)
     * 5. Provides acknowledgments for message delivery
     * 
     * Use cases: Traditional message queuing, complex routing patterns
     * Delivery: At-least-once with acknowledgments
     * Ordering: Within queue (FIFO)
     * Model: Both PULL and PUSH (configurable with prefetch)
     * Notification: Built-in consumer acknowledgments and rejections
     */
    static RabbitMQExchange = class {
        constructor(name, type) {
            this.name = name;
            this.type = type; // direct, topic, fanout
            this.bindings = new Map();
        }
        
        bindQueue(routingKey, queue) {
            if (!this.bindings.has(routingKey)) {
                this.bindings.set(routingKey, []);
            }
            this.bindings.get(routingKey).push(queue);
        }
        
        publishMessage(routingKey, message) {
            const queues = this.bindings.get(routingKey);
            if (queues) {
                for (const queue of queues) {
                    queue.enqueueMessage(message);
                }
            }
            console.log(`RabbitMQ: Message published to exchange ${this.name} with routing key ${routingKey}`);
        }
    }
    
    static RabbitMQQueue = class {
        constructor(name) {
            this.name = name;
            this.messages = [];
            this.unacknowledgedMessages = new Map();
        }
        
        enqueueMessage(body) {
            const message = new Message(this.generateUUID(), body, Date.now());
            this.messages.push(message);
        }
        
        consumeMessage() {
            const message = this.messages.shift();
            if (message) {
                this.unacknowledgedMessages.set(message.id, message);
                console.log(`RabbitMQ: Message consumed from queue ${this.name}: ${message.value}`);
            }
            return message;
        }
        
        acknowledgeMessage(messageId) {
            const message = this.unacknowledgedMessages.get(messageId);
            if (message) {
                this.unacknowledgedMessages.delete(messageId);
                console.log(`RabbitMQ: Message acknowledged from queue ${this.name}: ${message.value}`);
            }
        }
        
        // RABBITMQ HYBRID MODEL EXPLANATION:
        // - PULL: Basic polling for messages
        // - PUSH: With prefetch, broker pushes messages to consumers
        // - Consumer acknowledgments provide delivery guarantees
        // - Can configure prefetch count for push behavior
        // - Supports both synchronous and asynchronous consumption
        
        rejectMessage(messageId, requeue = false) {
            const message = this.unacknowledgedMessages.get(messageId);
            if (message) {
                this.unacknowledgedMessages.delete(messageId);
                if (requeue) {
                    this.messages.push(message);
                    console.log(`RabbitMQ: Message requeued in ${this.name}: ${message.value}`);
                }
            }
        }
        
        generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
    
    // ==================== REDIS PUB/SUB IMPLEMENTATION ====================
    /**
     * REDIS PUB/SUB - SIMPLE PUBLISH/SUBSCRIBE
     * 
     * How it works:
     * 1. Publishers send messages to channels
     * 2. Subscribers listen to channels
     * 3. No message persistence
     * 4. No delivery guarantees
     * 5. Fire-and-forget messaging
     * 
     * Use cases: Real-time notifications, simple event broadcasting
     * Delivery: At-most-once (no guarantees)
     * Ordering: No guaranteed ordering
     * Model: PUSH-based (fire-and-forget)
     * Notification: Immediate delivery to all subscribers
     */
    static RedisPubSub = class {
        constructor() {
            this.subscribers = new Map();
        }
        
        subscribe(channel, subscriber) {
            if (!this.subscribers.has(channel)) {
                this.subscribers.set(channel, []);
            }
            this.subscribers.get(channel).push(subscriber);
            console.log(`Redis: Subscriber added to channel ${channel}`);
        }
        
        unsubscribe(channel, subscriber) {
            const channelSubscribers = this.subscribers.get(channel);
            if (channelSubscribers) {
                const index = channelSubscribers.indexOf(subscriber);
                if (index > -1) {
                    channelSubscribers.splice(index, 1);
                }
            }
        }
        
        publish(channel, message) {
            const channelSubscribers = this.subscribers.get(channel);
            if (channelSubscribers) {
                for (const subscriber of channelSubscribers) {
                    try {
                        subscriber(message);
                    } catch (error) {
                        console.error('Error in subscriber:', error.message);
                    }
                }
            }
            console.log(`Redis: Message published to channel ${channel}: ${message}`);
        }
        
        // REDIS PUSH MODEL EXPLANATION:
        // - Pure push model - immediate delivery to all subscribers
        // - No message persistence or delivery guarantees
        // - Fire-and-forget messaging
        // - Subscribers receive messages as soon as they're published
        // - No backpressure handling - fast consumers required
    }
    
    // ==================== DELIVERY GUARANTEES ====================
    /**
     * DELIVERY GUARANTEES - MESSAGE PROCESSING ASSURANCES
     * 
     * At-Least-Once: Message is delivered at least once, may be duplicated
     * Exactly-Once: Message is delivered exactly once, no duplicates
     * At-Most-Once: Message is delivered at most once, may be lost
     */
    static DeliveryGuarantees = {
        // At-Least-Once Delivery
        AtLeastOnceDelivery: class {
            constructor() {
                this.queue = [];
                this.processingMessages = new Map();
            }
            
            sendMessage(messageId, content) {
                const message = new Message(messageId, content, Date.now());
                this.queue.push(message);
            }
            
            receiveMessage() {
                const message = this.queue.shift();
                if (message) {
                    this.processingMessages.set(message.id, message);
                }
                return message;
            }
            
            acknowledgeMessage(messageId) {
                this.processingMessages.delete(messageId);
            }
            
            requeueMessage(messageId) {
                const message = this.processingMessages.get(messageId);
                if (message) {
                    this.processingMessages.delete(messageId);
                    this.queue.push(message);
                }
            }
        },
        
        // Exactly-Once Delivery (Idempotent Consumer)
        ExactlyOnceDelivery: class {
            constructor() {
                this.queue = [];
                this.processedMessageIds = new Set();
            }
            
            sendMessage(messageId, content) {
                const message = new Message(messageId, content, Date.now());
                this.queue.push(message);
            }
            
            receiveMessage() {
                return this.queue.shift();
            }
            
            processMessageIfNotSeen(messageId, processor) {
                if (this.processedMessageIds.has(messageId)) {
                    console.log(`Message ${messageId} already processed, skipping`);
                    return false;
                }
                
                processor(messageId);
                this.processedMessageIds.add(messageId);
                return true;
            }
        }
    }
    
    // ==================== MESSAGE ORDERING ====================
    /**
     * MESSAGE ORDERING - ENSURING CORRECT SEQUENCE
     * 
     * FIFO (First-In-First-Out): Messages processed in order
     * Partitioned: Messages ordered within partitions
     * No Ordering: Messages processed in any order
     */
    static MessageOrdering = {
        // FIFO Queue Implementation
        FIFOQueue: class {
            constructor() {
                this.queue = [];
                this.sequenceNumber = 0;
            }
            
            sendMessage(content) {
                const message = new Message(null, content, Date.now());
                message.sequenceNumber = ++this.sequenceNumber;
                this.queue.push(message);
                // Sort by sequence number to maintain order
                this.queue.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
            }
            
            receiveMessage() {
                return this.queue.shift();
            }
        },
        
        // Partitioned Ordering (like Kafka)
        PartitionedOrdering: class {
            constructor() {
                this.partitions = new Map();
            }
            
            sendMessage(partitionKey, content) {
                if (!this.partitions.has(partitionKey)) {
                    this.partitions.set(partitionKey, []);
                }
                const message = new Message(null, content, Date.now());
                this.partitions.get(partitionKey).push(message);
            }
            
            receiveMessageFromPartition(partitionKey) {
                const partition = this.partitions.get(partitionKey);
                return partition ? partition.shift() : null;
            }
        }
    }
    
    // ==================== MESSAGE CLASS ====================
    static Message = class {
        constructor(id, value, timestamp) {
            this.id = id;
            this.value = value;
            this.timestamp = timestamp;
            this.key = null;
            this.groupId = null;
            this.sequenceNumber = null;
        }
        
        toString() {
            return `Message{id='${this.id}', value='${this.value}', timestamp=${this.timestamp}}`;
        }
    }
    
    // ==================== AWS SQS INTEGRATION ====================
    /**
     * AWS SQS INTEGRATION - REAL-WORLD IMPLEMENTATION
     * 
     * Features:
     * - Long polling for efficient message retrieval
     * - Dead letter queues for failed messages
     * - Message attributes for metadata
     * - Batch operations for efficiency
     */
    static AWSSQSIntegration = class {
        constructor() {
            this.queues = new Map();
            this.deadLetterQueues = new Map();
        }
        
        createQueue(queueName, options = {}) {
            const queue = {
                name: queueName,
                messages: [],
                inFlightMessages: new Map(),
                visibilityTimeout: options.visibilityTimeout || 30,
                messageRetentionPeriod: options.messageRetentionPeriod || 345600, // 4 days
                maxReceiveCount: options.maxReceiveCount || 3,
                deadLetterQueue: options.deadLetterQueue
            };
            
            this.queues.set(queueName, queue);
            console.log(`AWS SQS: Queue created: ${queueName}`);
            return queue;
        }
        
        sendMessage(queueName, messageBody, attributes = {}) {
            const queue = this.queues.get(queueName);
            if (!queue) {
                throw new Error(`Queue ${queueName} not found`);
            }
            
            const message = {
                id: this.generateUUID(),
                body: messageBody,
                attributes: attributes,
                timestamp: Date.now(),
                receiveCount: 0
            };
            
            queue.messages.push(message);
            console.log(`AWS SQS: Message sent to ${queueName}: ${messageBody}`);
            return message.id;
        }
        
        receiveMessage(queueName, maxMessages = 1, waitTimeSeconds = 0) {
            const queue = this.queues.get(queueName);
            if (!queue) {
                throw new Error(`Queue ${queueName} not found`);
            }
            
            const messages = [];
            const availableMessages = queue.messages.filter(msg => 
                !queue.inFlightMessages.has(msg.id)
            );
            
            for (let i = 0; i < Math.min(maxMessages, availableMessages.length); i++) {
                const message = availableMessages[i];
                message.receiveCount++;
                queue.inFlightMessages.set(message.id, message);
                messages.push(message);
            }
            
            if (messages.length > 0) {
                console.log(`AWS SQS: Received ${messages.length} messages from ${queueName}`);
            }
            
            return messages;
        }
        
        deleteMessage(queueName, messageId) {
            const queue = this.queues.get(queueName);
            if (!queue) {
                throw new Error(`Queue ${queueName} not found`);
            }
            
            const message = queue.inFlightMessages.get(messageId);
            if (message) {
                queue.inFlightMessages.delete(messageId);
                console.log(`AWS SQS: Message deleted from ${queueName}: ${message.body}`);
            }
        }
        
        changeMessageVisibility(queueName, messageId, visibilityTimeoutSeconds) {
            const queue = this.queues.get(queueName);
            if (!queue) {
                throw new Error(`Queue ${queueName} not found`);
            }
            
            console.log(`AWS SQS: Changed visibility timeout for message ${messageId} to ${visibilityTimeoutSeconds} seconds`);
        }
        
        generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
    
    // ==================== NOTIFICATION SERVICES INTEGRATION ====================
    /**
     * NOTIFICATION SERVICES - PUSH-BASED MESSAGING
     * 
     * SNS (Simple Notification Service):
     * - Push-based fan-out messaging
     * - Supports multiple protocols (HTTP, HTTPS, Email, SMS)
     * - No message persistence
     * - Can trigger Lambda functions
     * 
     * SQS + SNS Integration:
     * - SNS pushes to SQS queues
     * - Combines push notifications with reliable queuing
     * - Best of both worlds
     */
    static NotificationServices = {
        SNSIntegration: class {
            constructor() {
                this.topicSubscribers = new Map();
            }
            
            subscribeToTopic(topicArn, endpoint) {
                if (!this.topicSubscribers.has(topicArn)) {
                    this.topicSubscribers.set(topicArn, []);
                }
                this.topicSubscribers.get(topicArn).push(endpoint);
            }
            
            publishToTopic(topicArn, message) {
                const subscribers = this.topicSubscribers.get(topicArn);
                if (subscribers) {
                    for (const endpoint of subscribers) {
                        // Simulate HTTP push notification
                        console.log(`SNS: Pushing message to ${endpoint}: ${message}`);
                    }
                }
            }
        },
        
        SQSWithSNSSupport: class extends MessagingQueue.SQSQueue {
            constructor(queueName, isFIFO, sns) {
                super(queueName, isFIFO);
                this.sns = sns;
            }
            
            sendMessage(body, groupId = null) {
                const messageId = super.sendMessage(body, groupId);
                // Also publish to SNS for push notifications
                this.sns.publishToTopic('arn:aws:sns:us-east-1:123456789012:my-topic', body);
                return messageId;
            }
        }
    }
    
    // ==================== TESTING FUNCTIONS ====================
}

function testKafka() {
    console.log('=== KAFKA STREAMING PLATFORM ===');
    const kafkaProducer = new MessagingQueue.KafkaProducer('user-events', 3);
    const kafkaConsumer = new MessagingQueue.KafkaConsumer('user-service', kafkaProducer);
    
    kafkaProducer.sendMessage('user1', 'User logged in');
    kafkaProducer.sendMessage('user2', 'User made purchase');
    kafkaProducer.sendMessage('user1', 'User logged out');
    
    kafkaConsumer.consumeAllPartitions(message => 
        console.log('Kafka Consumer:', message.value));
}

function testSQS() {
    console.log('\n=== SQS MANAGED QUEUE ===');
    const standardQueue = new MessagingQueue.SQSQueue('order-processing', false);
    const fifoQueue = new MessagingQueue.SQSQueue('order-processing.fifo', true);
    
    standardQueue.sendMessage('Process order #123');
    standardQueue.sendMessage('Process order #124');
    
    fifoQueue.sendMessage('Process order #125', 'orders');
    fifoQueue.sendMessage('Process order #126', 'orders');
    
    const sqsMessage = standardQueue.receiveMessage();
    if (sqsMessage) {
        standardQueue.deleteMessage(sqsMessage.id);
    }
}

function testRabbitMQ() {
    console.log('\n=== RABBITMQ MESSAGE BROKER ===');
    const exchange = new MessagingQueue.RabbitMQExchange('order-exchange', 'direct');
    const queue = new MessagingQueue.RabbitMQQueue('order-queue');
    
    exchange.bindQueue('order.created', queue);
    exchange.publishMessage('order.created', 'New order received');
    
    const rabbitMessage = queue.consumeMessage();
    if (rabbitMessage) {
        queue.acknowledgeMessage(rabbitMessage.id);
    }
}

function testRedisPubSub() {
    console.log('\n=== REDIS PUB/SUB ===');
    const redisPubSub = new MessagingQueue.RedisPubSub();
    
    redisPubSub.subscribe('notifications', message => 
        console.log('Notification received:', message));
    
    redisPubSub.publish('notifications', 'System maintenance scheduled');
}

function testDeliveryGuarantees() {
    console.log('\n=== DELIVERY GUARANTEES ===');
    const atLeastOnce = new MessagingQueue.DeliveryGuarantees.AtLeastOnceDelivery();
    atLeastOnce.sendMessage('msg1', 'Important message');
    
    const deliveredMessage = atLeastOnce.receiveMessage();
    if (deliveredMessage) {
        atLeastOnce.acknowledgeMessage(deliveredMessage.id);
    }
}

function testMessageOrdering() {
    console.log('\n=== MESSAGE ORDERING ===');
    const fifoQueue = new MessagingQueue.MessageOrdering.FIFOQueue();
    fifoQueue.sendMessage('First message');
    fifoQueue.sendMessage('Second message');
    fifoQueue.sendMessage('Third message');
    
    for (let i = 0; i < 3; i++) {
        const orderedMessage = fifoQueue.receiveMessage();
        console.log('FIFO Message:', orderedMessage.value);
    }
}

function testAWSSQS() {
    console.log('\n=== AWS SQS INTEGRATION ===');
    const awsSQS = new MessagingQueue.AWSSQSIntegration();
    
    // Create a queue with dead letter queue
    const deadLetterQueue = awsSQS.createQueue('failed-messages');
    const mainQueue = awsSQS.createQueue('main-queue', {
        deadLetterQueue: deadLetterQueue.name,
        maxReceiveCount: 3
    });
    
    // Send messages
    awsSQS.sendMessage('main-queue', 'Test message 1');
    awsSQS.sendMessage('main-queue', 'Test message 2', { priority: 'high' });
    
    // Receive and process messages
    const messages = awsSQS.receiveMessage('main-queue', 2);
    for (const message of messages) {
        console.log('Processing message:', message.body);
        awsSQS.deleteMessage('main-queue', message.id);
    }
}

// ==================== MAIN TEST FUNCTION ====================
function runTests() {
    console.log('🚀 MESSAGING SYSTEM - AMAZON INTERVIEW DEMO\n');
    
    testKafka();
    testSQS();
    testRabbitMQ();
    testRedisPubSub();
    testDeliveryGuarantees();
    testMessageOrdering();
    testAWSSQS();
    
    // Test notification services
    console.log('\n=== NOTIFICATION SERVICES ===');
    const sns = new MessagingQueue.NotificationServices.SNSIntegration();
    sns.subscribeToTopic('arn:aws:sns:us-east-1:123456789012:my-topic', 'https://my-service.com/webhook');
    sns.publishToTopic('arn:aws:sns:us-east-1:123456789012:my-topic', 'Important notification');
    
    const sqsWithSNS = new MessagingQueue.NotificationServices.SQSWithSNSSupport('notification-queue', false, sns);
    sqsWithSNS.sendMessage('Message with push notification');
    
    // Interview tips
    console.log('\n🎯 AMAZON INTERVIEW TIPS:');
    console.log('1. Start with SQS - it\'s AWS managed service');
    console.log('2. Mention Kafka for high-throughput streaming');
    console.log('3. Discuss delivery guarantees and trade-offs');
    console.log('4. Consider message ordering requirements');
    console.log('5. Mention monitoring and dead letter queues');
    console.log('6. Discuss scaling and partitioning strategies');
    console.log('7. Explain PULL vs PUSH models and their trade-offs');
    console.log('8. Mention SNS for push notifications and SQS integration');
}

// ==================== EXPORT FOR USE ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MessagingQueue;
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
} 