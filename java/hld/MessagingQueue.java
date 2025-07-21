import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Consumer;

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
 */

public class MessagingQueue {
    
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
     */

    /*

    */
    static class KafkaProducer {
        private final String topic;
        private final Map<Integer, List<Message>> partitions;
        private final AtomicInteger partitionCounter;
        
        public KafkaProducer(String topic, int numPartitions) {
            this.topic = topic;
            this.partitions = new ConcurrentHashMap<>();
            this.partitionCounter = new AtomicInteger(0);
            
            // Initialize partitions
            for (int i = 0; i < numPartitions; i++) {
                partitions.put(i, new CopyOnWriteArrayList<>());
            }
        }
        
        public void sendMessage(String key, String value) {
            // Simple partitioning based on key hash
            int partition = Math.abs(key.hashCode()) % partitions.size();
            Message message = new Message(key, value, System.currentTimeMillis());
            
            partitions.get(partition).add(message);
            System.out.println("Kafka: Message sent to partition " + partition + ": " + value);
        }
        
        public void sendMessageToPartition(String value, int partition) {
            Message message = new Message(null, value, System.currentTimeMillis());
            partitions.get(partition).add(message);
            System.out.println("Kafka: Message sent to partition " + partition + ": " + value);
        }
        
        public List<Message> getMessagesFromPartition(int partition, int offset) {
            List<Message> partitionMessages = partitions.get(partition);
            if (offset >= partitionMessages.size()) {
                return new ArrayList<>();
            }
            return partitionMessages.subList(offset, partitionMessages.size());
        }
    }
    
    static class KafkaConsumer {
        private final String groupId;
        private final Map<Integer, Integer> partitionOffsets;
        private final KafkaProducer producer;
        
        public KafkaConsumer(String groupId, KafkaProducer producer) {
            this.groupId = groupId;
            this.partitionOffsets = new ConcurrentHashMap<>();
            this.producer = producer;
        }
        
        public void consumeFromPartition(int partition, Consumer<Message> messageHandler) {
            int offset = partitionOffsets.getOrDefault(partition, 0);
            List<Message> messages = producer.getMessagesFromPartition(partition, offset);
            
            for (Message message : messages) {
                try {
                    messageHandler.accept(message);
                    partitionOffsets.put(partition, offset + 1);
                    offset++;
                } catch (Exception e) {
                    System.err.println("Error processing message: " + e.getMessage());
                    // In real Kafka, this would trigger retry logic
                }
            }
        }
        
        public void consumeAllPartitions(Consumer<Message> messageHandler) {
            for (int partition : producer.partitions.keySet()) {
                consumeFromPartition(partition, messageHandler);
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
    static class SQSQueue {
        private final String queueName;
        private final Queue<Message> messages;
        private final boolean isFIFO;
        private final Map<String, Message> inFlightMessages;
        private final AtomicInteger messageIdCounter;
        
        public SQSQueue(String queueName, boolean isFIFO) {
            this.queueName = queueName;
            this.messages = new ConcurrentLinkedQueue<>();
            this.isFIFO = isFIFO;
            this.inFlightMessages = new ConcurrentHashMap<>();
            this.messageIdCounter = new AtomicInteger(0);
        }
        
        public String sendMessage(String body, String groupId) {
            String messageId = isFIFO ? 
                groupId + "#" + messageIdCounter.incrementAndGet() :
                UUID.randomUUID().toString();
            
            Message message = new Message(messageId, body, System.currentTimeMillis());
            message.groupId = groupId;
            messages.offer(message);
            
            System.out.println("SQS: Message sent to " + queueName + ": " + body);
            return messageId;
        }
        
        public Message receiveMessage() {
            Message message = messages.poll();
            if (message != null) {
                inFlightMessages.put(message.id, message);
                System.out.println("SQS: Message received from " + queueName + ": " + message.value);
            }
            return message;
        }
        
        public void deleteMessage(String messageId) {
            Message message = inFlightMessages.remove(messageId);
            if (message != null) {
                System.out.println("SQS: Message deleted from " + queueName + ": " + message.value);
            }
        }
        
        public void changeMessageVisibility(String messageId, int visibilityTimeoutSeconds) {
            // In real SQS, this would extend the visibility timeout
            System.out.println("SQS: Changed visibility timeout for message " + messageId);
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
    static class RabbitMQExchange {
        private final String name;
        private final String type; // direct, topic, fanout
        private final Map<String, List<RabbitMQQueue>> bindings;
        
        public RabbitMQExchange(String name, String type) {
            this.name = name;
            this.type = type;
            this.bindings = new ConcurrentHashMap<>();
        }
        
        public void bindQueue(String routingKey, RabbitMQQueue queue) {
            bindings.computeIfAbsent(routingKey, k -> new ArrayList<>()).add(queue);
        }
        
        public void publishMessage(String routingKey, String message) {
            List<RabbitMQQueue> queues = bindings.get(routingKey);
            if (queues != null) {
                for (RabbitMQQueue queue : queues) {
                    queue.enqueueMessage(message);
                }
            }
            System.out.println("RabbitMQ: Message published to exchange " + name + " with routing key " + routingKey);
        }
    }
    
    static class RabbitMQQueue {
        private final String name;
        private final Queue<Message> messages;
        private final Map<String, Message> unacknowledgedMessages;
        
        public RabbitMQQueue(String name) {
            this.name = name;
            this.messages = new ConcurrentLinkedQueue<>();
            this.unacknowledgedMessages = new ConcurrentHashMap<>();
        }
        
        public void enqueueMessage(String body) {
            Message message = new Message(UUID.randomUUID().toString(), body, System.currentTimeMillis());
            messages.offer(message);
        }
        
        public Message consumeMessage() {
            Message message = messages.poll();
            if (message != null) {
                unacknowledgedMessages.put(message.id, message);
                System.out.println("RabbitMQ: Message consumed from queue " + name + ": " + message.value);
            }
            return message;
        }
        
        public void acknowledgeMessage(String messageId) {
            Message message = unacknowledgedMessages.remove(messageId);
            if (message != null) {
                System.out.println("RabbitMQ: Message acknowledged from queue " + name + ": " + message.value);
            }
        }
        
        public void rejectMessage(String messageId, boolean requeue) {
            Message message = unacknowledgedMessages.remove(messageId);
            if (message != null && requeue) {
                messages.offer(message);
                System.out.println("RabbitMQ: Message requeued in " + name + ": " + message.value);
            }
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
    static class RedisPubSub {
        private final Map<String, List<Consumer<String>>> subscribers;
        
        public RedisPubSub() {
            this.subscribers = new ConcurrentHashMap<>();
        }
        
        public void subscribe(String channel, Consumer<String> subscriber) {
            subscribers.computeIfAbsent(channel, k -> new ArrayList<>()).add(subscriber);
            System.out.println("Redis: Subscriber added to channel " + channel);
        }
        
        public void unsubscribe(String channel, Consumer<String> subscriber) {
            List<Consumer<String>> channelSubscribers = subscribers.get(channel);
            if (channelSubscribers != null) {
                channelSubscribers.remove(subscriber);
            }
        }
        
        public void publish(String channel, String message) {
            List<Consumer<String>> channelSubscribers = subscribers.get(channel);
            if (channelSubscribers != null) {
                for (Consumer<String> subscriber : channelSubscribers) {
                    try {
                        subscriber.accept(message);
                    } catch (Exception e) {
                        System.err.println("Error in subscriber: " + e.getMessage());
                    }
                }
            }
            System.out.println("Redis: Message published to channel " + channel + ": " + message);
        }
    }
    
    // ==================== DELIVERY GUARANTEES ====================
    /**
     * DELIVERY GUARANTEES - MESSAGE PROCESSING ASSURANCES
     * 
     * At-Least-Once: Message is delivered at least once, may be duplicated
     * Exactly-Once: Message is delivered exactly once, no duplicates
     * At-Most-Once: Message is delivered at most once, may be lost
     */
    static class DeliveryGuarantees {
        
        // At-Least-Once Delivery
        public static class AtLeastOnceDelivery {
            private final Queue<Message> queue;
            private final Map<String, Message> processingMessages;
            
            public AtLeastOnceDelivery() {
                this.queue = new ConcurrentLinkedQueue<>();
                this.processingMessages = new ConcurrentHashMap<>();
            }
            
            public void sendMessage(String messageId, String content) {
                Message message = new Message(messageId, content, System.currentTimeMillis());
                queue.offer(message);
            }
            
            public Message receiveMessage() {
                Message message = queue.poll();
                if (message != null) {
                    processingMessages.put(message.id, message);
                }
                return message;
            }
            
            public void acknowledgeMessage(String messageId) {
                processingMessages.remove(messageId);
            }
            
            public void requeueMessage(String messageId) {
                Message message = processingMessages.remove(messageId);
                if (message != null) {
                    queue.offer(message);
                }
            }
        }
        
        // Exactly-Once Delivery (Idempotent Consumer)
        public static class ExactlyOnceDelivery {
            private final Queue<Message> queue;
            private final Set<String> processedMessageIds;
            
            public ExactlyOnceDelivery() {
                this.queue = new ConcurrentLinkedQueue<>();
                this.processedMessageIds = ConcurrentHashMap.newKeySet();
            }
            
            public void sendMessage(String messageId, String content) {
                Message message = new Message(messageId, content, System.currentTimeMillis());
                queue.offer(message);
            }
            
            public Message receiveMessage() {
                return queue.poll();
            }
            
            public boolean processMessageIfNotSeen(String messageId, Consumer<String> processor) {
                if (processedMessageIds.contains(messageId)) {
                    System.out.println("Message " + messageId + " already processed, skipping");
                    return false;
                }
                
                processor.accept(messageId);
                processedMessageIds.add(messageId);
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
    static class MessageOrdering {
        
        // FIFO Queue Implementation
        public static class FIFOQueue {
            private final Queue<Message> queue;
            private final AtomicLong sequenceNumber;
            
            public FIFOQueue() {
                this.queue = new PriorityBlockingQueue<>();
                this.sequenceNumber = new AtomicLong(0);
            }
            
            public void sendMessage(String content) {
                Message message = new Message(null, content, System.currentTimeMillis());
                message.sequenceNumber = sequenceNumber.incrementAndGet();
                queue.offer(message);
            }
            
            public Message receiveMessage() {
                return queue.poll();
            }
        }
        
        // Partitioned Ordering (like Kafka)
        public static class PartitionedOrdering {
            private final Map<String, Queue<Message>> partitions;
            
            public PartitionedOrdering() {
                this.partitions = new ConcurrentHashMap<>();
            }
            
            public void sendMessage(String partitionKey, String content) {
                Queue<Message> partition = partitions.computeIfAbsent(partitionKey, k -> new ConcurrentLinkedQueue<>());
                Message message = new Message(null, content, System.currentTimeMillis());
                partition.offer(message);
            }
            
            public Message receiveMessageFromPartition(String partitionKey) {
                Queue<Message> partition = partitions.get(partitionKey);
                return partition != null ? partition.poll() : null;
            }
        }
    }
    
    // ==================== MESSAGE CLASS ====================
    static class Message {
        String id;
        String key;
        String value;
        long timestamp;
        String groupId;
        long sequenceNumber;
        
        public Message(String id, String value, long timestamp) {
            this.id = id;
            this.value = value;
            this.timestamp = timestamp;
        }
        
        @Override
        public String toString() {
            return "Message{id='" + id + "', value='" + value + "', timestamp=" + timestamp + "}";
        }
    }
    
    // ==================== TESTING ====================
    public static void main(String[] args) {
        System.out.println("🚀 MESSAGING SYSTEM - AMAZON INTERVIEW DEMO\n");
        
        // Test Kafka
        System.out.println("=== KAFKA STREAMING PLATFORM ===");
        KafkaProducer kafkaProducer = new KafkaProducer("user-events", 3);
        KafkaConsumer kafkaConsumer = new KafkaConsumer("user-service", kafkaProducer);
        
        kafkaProducer.sendMessage("user1", "User logged in");
        kafkaProducer.sendMessage("user2", "User made purchase");
        kafkaProducer.sendMessage("user1", "User logged out");
        
        kafkaConsumer.consumeAllPartitions(message -> 
            System.out.println("Kafka Consumer: " + message.value));
        
        // Test SQS
        System.out.println("\n=== SQS MANAGED QUEUE ===");
        SQSQueue standardQueue = new SQSQueue("order-processing", false);
        SQSQueue fifoQueue = new SQSQueue("order-processing.fifo", true);
        
        standardQueue.sendMessage("Process order #123", null);
        standardQueue.sendMessage("Process order #124", null);
        
        fifoQueue.sendMessage("Process order #125", "orders");
        fifoQueue.sendMessage("Process order #126", "orders");
        
        Message sqsMessage = standardQueue.receiveMessage();
        if (sqsMessage != null) {
            standardQueue.deleteMessage(sqsMessage.id);
        }
        
        // Test RabbitMQ
        System.out.println("\n=== RABBITMQ MESSAGE BROKER ===");
        RabbitMQExchange exchange = new RabbitMQExchange("order-exchange", "direct");
        RabbitMQQueue queue = new RabbitMQQueue("order-queue");
        
        exchange.bindQueue("order.created", queue);
        exchange.publishMessage("order.created", "New order received");
        
        Message rabbitMessage = queue.consumeMessage();
        if (rabbitMessage != null) {
            queue.acknowledgeMessage(rabbitMessage.id);
        }
        
        // Test Redis Pub/Sub
        System.out.println("\n=== REDIS PUB/SUB ===");
        RedisPubSub redisPubSub = new RedisPubSub();
        
        redisPubSub.subscribe("notifications", message -> 
            System.out.println("Notification received: " + message));
        
        redisPubSub.publish("notifications", "System maintenance scheduled");
        
        // Test Delivery Guarantees
        System.out.println("\n=== DELIVERY GUARANTEES ===");
        DeliveryGuarantees.AtLeastOnceDelivery atLeastOnce = new DeliveryGuarantees.AtLeastOnceDelivery();
        atLeastOnce.sendMessage("msg1", "Important message");
        
        Message deliveredMessage = atLeastOnce.receiveMessage();
        if (deliveredMessage != null) {
            atLeastOnce.acknowledgeMessage(deliveredMessage.id);
        }
        
        // Test Message Ordering
        System.out.println("\n=== MESSAGE ORDERING ===");
        MessageOrdering.FIFOQueue fifoQueue2 = new MessageOrdering.FIFOQueue();
        fifoQueue2.sendMessage("First message");
        fifoQueue2.sendMessage("Second message");
        fifoQueue2.sendMessage("Third message");
        
        for (int i = 0; i < 3; i++) {
            Message orderedMessage = fifoQueue2.receiveMessage();
            System.out.println("FIFO Message: " + orderedMessage.value);
        }
        
        // Interview tips
        System.out.println("\n🎯 AMAZON INTERVIEW TIPS:");
        System.out.println("1. Start with SQS - it's AWS managed service");
        System.out.println("2. Mention Kafka for high-throughput streaming");
        System.out.println("3. Discuss delivery guarantees and trade-offs");
        System.out.println("4. Consider message ordering requirements");
        System.out.println("5. Mention monitoring and dead letter queues");
        System.out.println("6. Discuss scaling and partitioning strategies");
    }
} 