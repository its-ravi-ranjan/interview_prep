/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - OTT Platform High-Level Design (Netflix/Hotstar like)
 * 
 * OTT Platform High-Level Design (HLD)
 * ====================================
 * 
 * System Overview:
 * ----------------
 * An OTT (Over-The-Top) platform like Netflix/Hotstar that provides video streaming services
 * with features like user management, content delivery, recommendations, and payment processing.
 * 
 * Key Components:
 * 1. User Management System
 * 2. Content Management System
 * 3. Video Processing & Encoding Pipeline
 * 4. Content Delivery Network (CDN)
 * 5. Recommendation Engine
 * 6. Payment & Subscription System
 * 7. Analytics & Monitoring
 * 
 * System Architecture - Low Load Scenario (Startup):
 * ================================================
 * 
 * Load Characteristics:
 * - Concurrent Users: 10,000
 * - Daily Active Users: 100,000
 * - Video Storage: 1TB
 * - Response Time: < 2 seconds
 * - Availability: 99.5%
 * 
 * Architecture Components:
 * 
 * 1. Frontend Layer:
 *    - Single React/Angular application
 *    - Static assets served from CDN
 *    - Client-side caching for better performance
 * 
 * 2. Load Balancer:
 *    - AWS Application Load Balancer (ALB)
 *    - Health checks every 30 seconds
 *    - SSL termination at load balancer
 * 
 * 3. API Gateway:
 *    - AWS API Gateway
 *    - Rate limiting: 1000 requests/minute per user
 *    - Request/Response transformation
 *    - Authentication & Authorization
 * 
 * 4. Microservices (Single Region):
 *    a) User Service:
 *       - Technology: Spring Boot/Node.js
 *       - Database: PostgreSQL (Single instance)
 *       - Cache: Redis (Single instance)
 *       - Functions: Registration, login, profile management
 *       
 *    b) Content Service:
 *       - Technology: Spring Boot/Node.js
 *       - Database: PostgreSQL (Single instance)
 *       - Functions: Content metadata, search, categorization
 *       
 *    c) Streaming Service:
 *       - Technology: Spring Boot/Node.js
 *       - Database: PostgreSQL (Single instance)
 *       - Functions: Video manifest generation, progress tracking
 *       
 *    d) Payment Service:
 *       - Technology: Spring Boot/Node.js
 *       - Database: PostgreSQL (Single instance)
 *       - External: Stripe/PayPal integration
 *       
 *    e) Recommendation Service:
 *       - Technology: Python (ML models)
 *       - Database: PostgreSQL (Single instance)
 *       - Functions: Content recommendations, trending analysis
 * 
 * 5. Database Layer:
 *    - PostgreSQL (Single instance)
 *    - Redis (Single instance) for session management
 *    - Backup: Daily automated backups
 * 
 * 6. Storage Layer:
 *    - AWS S3 for video files and thumbnails
 *    - CloudFront for content delivery
 *    - Single region deployment
 * 
 * 7. Video Processing Pipeline:
 *    - AWS MediaConvert for video encoding
 *    - Input: MP4 files (1080p)
 *    - Output: HLS/DASH streams (480p, 720p, 1080p)
 *    - Processing time: 2-4 hours per movie
 * 
 * 8. Monitoring:
 *    - CloudWatch for basic monitoring
 *    - Log aggregation: CloudWatch Logs
 *    - Alerts: Email notifications
 * 
 * System Architecture - High Load Scenario (Established Platform):
 * =============================================================
 * 
 * Load Characteristics:
 * - Concurrent Users: 1,000,000
 * - Daily Active Users: 50,000,000
 * - Video Storage: 100PB
 * - Response Time: < 500ms
 * - Availability: 99.9%
 * - Global presence with multiple regions
 * 
 * Architecture Components:
 * 
 * 1. Frontend Layer:
 *    - Multiple React/Angular applications
 *    - Progressive Web Apps (PWA)
 *    - Client-side caching with Service Workers
 *    - Adaptive streaming based on network conditions
 * 
 * 2. Global Load Balancer:
 *    - AWS Global Accelerator
 *    - Route 53 for DNS management
 *    - Geographic routing to nearest region
 *    - Health checks every 10 seconds
 * 
 * 3. Regional Load Balancers:
 *    - AWS Network Load Balancer (NLB)
 *    - SSL termination at load balancer
 *    - Connection draining for zero-downtime deployments
 * 
 * 4. API Gateway:
 *    - AWS API Gateway with custom authorizers
 *    - Rate limiting: 10,000 requests/minute per user
 *    - Request/Response caching
 *    - API versioning and documentation
 *    - WebSocket support for real-time features
 * 
 * 5. Microservices (Multi-Region):
 *    a) User Service:
 *       - Technology: Spring Boot/Node.js
 *       - Database: PostgreSQL (Read replicas)
 *       - Cache: Redis Cluster (3 nodes)
 *       - Message Queue: AWS SQS for async operations
 *       - Functions: Registration, login, profile management, social features
 *       
 *    b) Content Service:
 *       - Technology: Spring Boot/Node.js
 *       - Database: PostgreSQL (Read replicas)
 *       - Search: Elasticsearch for advanced search
 *       - Cache: Redis Cluster for metadata caching
 *       - Functions: Content metadata, search, categorization, recommendations
 *       
 *    c) Streaming Service:
 *       - Technology: Spring Boot/Node.js
 *       - Database: PostgreSQL (Read replicas)
 *       - Cache: Redis Cluster for session management
 *       - Functions: Video manifest generation, progress tracking, adaptive streaming
 *       
 *    d) Payment Service:
 *       - Technology: Spring Boot/Node.js
 *       - Database: PostgreSQL (Read replicas)
 *       - External: Multiple payment gateways (Stripe, PayPal, local providers)
 *       - Functions: Subscription management, billing, payment processing
 *       
 *    e) Recommendation Service:
 *       - Technology: Python with TensorFlow/PyTorch
 *       - Database: PostgreSQL (Read replicas)
 *       - ML Pipeline: Apache Airflow for model training
 *       - Functions: Personalized recommendations, trending analysis, A/B testing
 *       
 *    f) Analytics Service:
 *       - Technology: Python/Java
 *       - Database: ClickHouse for real-time analytics
 *       - Stream Processing: Apache Kafka + Apache Flink
 *       - Functions: User behavior analysis, content performance, business metrics
 * 
 * 6. Database Layer:
 *    - PostgreSQL (Primary + Read Replicas)
 *    - Redis Cluster (3 nodes) for session management
 *    - MongoDB for analytics data
 *    - Backup: Real-time replication + daily backups
 *    - Disaster Recovery: Cross-region replication
 * 
 * 7. Storage Layer:
 *    - AWS S3 for video files and thumbnails
 *    - CloudFront with 200+ edge locations
 *    - Multi-region storage for disaster recovery
 *    - Intelligent Tiering for cost optimization
 * 
 * 8. Video Processing Pipeline:
 *    - AWS MediaConvert for video encoding
 *    - Input: Multiple formats (MP4, MOV, AVI)
 *    - Output: HLS/DASH streams (480p, 720p, 1080p, 4K)
 *    - Processing time: 4-8 hours per movie
 *    - Parallel processing with multiple instances
 * 
 * 9. Content Delivery Network (CDN):
 *    - CloudFront with 200+ edge locations
 *    - Origin failover for high availability
 *    - Real-time analytics and monitoring
 *    - Geographic restrictions and content localization
 * 
 * 10. Message Queue System:
 *     - Apache Kafka for event streaming
 *     - AWS SQS for asynchronous processing
 *     - Dead letter queues for failed messages
 *     - Message ordering for critical operations
 * 
 * 11. Monitoring & Observability:
 *     - CloudWatch for infrastructure monitoring
 *     - DataDog/New Relic for application monitoring
 *     - ELK Stack for log aggregation
 *     - Prometheus + Grafana for metrics
 *     - Distributed tracing with Jaeger
 * 
 * Video Encoding & Processing Pipeline:
 * ===================================
 * 
 * 1. Upload Process:
 *    - Content creators upload raw video files
 *    - File validation (format, size, duration)
 *    - Virus scanning and security checks
 *    - Metadata extraction (duration, resolution, codec)
 * 
 * 2. Encoding Process:
 *    - Input formats: MP4, MOV, AVI, MKV
 *    - Video codecs: H.264, H.265 (HEVC), AV1
 *    - Audio codecs: AAC, MP3, AC3
 *    - Quality levels: 480p, 720p, 1080p, 4K
 *    - Bitrate optimization for each quality level
 * 
 * 3. Adaptive Bitrate Streaming:
 *    - HLS (HTTP Live Streaming) for iOS/Android
 *    - DASH (Dynamic Adaptive Streaming over HTTP) for web
 *    - Manifest files (.m3u8 for HLS, .mpd for DASH)
 *    - Segment files (10-second chunks)
 *    - Quality switching based on network conditions
 * 
 * 4. Storage Strategy:
 *    - Hot storage: Frequently accessed content (S3 Standard)
 *    - Warm storage: Medium access content (S3 IA)
 *    - Cold storage: Rarely accessed content (S3 Glacier)
 *    - Intelligent Tiering for automatic optimization
 * 
 * 5. Delivery Optimization:
 *    - CDN edge caching for popular content
 *    - Geographic distribution for global access
 *    - Bandwidth optimization and compression
 *    - Real-time quality adaptation
 * 
 * Data Flow Examples:
 * ==================
 * 
 * Example 1: User Registration (Low Load)
 * ---------------------------------------
 * 1. User submits registration form
 * 2. Frontend validates input
 * 3. API Gateway receives request
 * 4. User Service processes registration
 * 5. PostgreSQL stores user data
 * 6. Redis stores session token
 * 7. Response sent back to user
 * 
 * Example 2: Video Streaming (High Load)
 * --------------------------------------
 * 1. User requests video playback
 * 2. Global Load Balancer routes to nearest region
 * 3. Regional Load Balancer distributes load
 * 4. API Gateway validates authentication
 * 5. Content Service retrieves video metadata
 * 6. Streaming Service generates manifest file
 * 7. CDN serves video segments
 * 8. Client adapts quality based on network
 * 
 * Example 3: Content Recommendation (High Load)
 * --------------------------------------------
 * 1. User browses content
 * 2. Analytics Service tracks user behavior
 * 3. Kafka streams user events
 * 4. ML models process user preferences
 * 5. Recommendation Service generates suggestions
 * 6. Redis caches recommendations
 * 7. Frontend displays personalized content
 * 
 * Scalability Strategies:
 * =====================
 * 
 * 1. Horizontal Scaling:
 *    - Auto-scaling groups for microservices
 *    - Database read replicas
 *    - Redis cluster for caching
 *    - CDN for content delivery
 * 
 * 2. Vertical Scaling:
 *    - Larger instance types for compute
 *    - More storage and memory
 *    - Better network performance
 * 
 * 3. Caching Strategies:
 *    - CDN for static content
 *    - Redis for session data
 *    - Application-level caching
 *    - Database query caching
 * 
 * 4. Database Optimization:
 *    - Read replicas for read-heavy workloads
 *    - Connection pooling
 *    - Query optimization
 *    - Indexing strategies
 * 
 * 5. Load Distribution:
 *    - Geographic load balancing
 *    - Round-robin distribution
 *    - Least connections algorithm
 *    - Health-based routing
 * 
 * Security Considerations:
 * ======================
 * 
 * 1. Authentication & Authorization:
 *    - JWT tokens for stateless authentication
 *    - OAuth 2.0 for third-party login
 *    - Role-based access control (RBAC)
 *    - Multi-factor authentication (MFA)
 * 
 * 2. Data Protection:
 *    - Encryption at rest (AES-256)
 *    - Encryption in transit (TLS 1.3)
 *    - PII data anonymization
 *    - GDPR compliance
 * 
 * 3. Network Security:
 *    - VPC with private subnets
 *    - Security groups and NACLs
 *    - DDoS protection (AWS Shield)
 *    - WAF for web application protection
 * 
 * 4. Content Security:
 *    - DRM (Digital Rights Management)
 *    - Watermarking for content protection
 *    - Geographic restrictions
 *    - Age-based content filtering
 * 
 * Cost Optimization:
 * ================
 * 
 * 1. Storage Optimization:
 *    - Intelligent Tiering for S3
 *    - Compression for video files
 *    - Lifecycle policies for old content
 *    - Multi-region storage optimization
 * 
 * 2. Compute Optimization:
 *    - Spot instances for batch processing
 *    - Reserved instances for predictable workloads
 *    - Auto-scaling based on demand
 *    - Containerization for resource efficiency
 * 
 * 3. Network Optimization:
 *    - CDN for reduced bandwidth costs
 *    - Data transfer optimization
 *    - Geographic distribution for latency
 *    - Compression and caching
 * 
 * Monitoring & Alerting:
 * ====================
 * 
 * 1. Infrastructure Monitoring:
 *    - CPU, memory, disk usage
 *    - Network throughput and latency
 *    - Database performance metrics
 *    - CDN performance and cache hit rates
 * 
 * 2. Application Monitoring:
 *    - Response times and error rates
 *    - User experience metrics
 *    - Video streaming quality metrics
 *    - Business metrics (revenue, subscriptions)
 * 
 * 3. Alerting:
 *    - PagerDuty integration for incidents
 *    - Slack/Teams notifications
 *    - Escalation policies
 *    - Runbook documentation
 * 
 * Disaster Recovery:
 * ================
 * 
 * 1. Backup Strategy:
 *    - Real-time database replication
 *    - Daily automated backups
 *    - Cross-region backup storage
 *    - Point-in-time recovery
 * 
 * 2. Recovery Procedures:
 *    - RTO (Recovery Time Objective): 4 hours
 *    - RPO (Recovery Point Objective): 1 hour
 *    - Automated failover procedures
 *    - Manual recovery runbooks
 * 
 * 3. Testing:
 *    - Monthly disaster recovery drills
 *    - Backup restoration testing
 *    - Failover testing
 *    - Documentation updates
 */

import java.util.*;
import java.time.LocalDateTime;

// Core System Components for HLD Demo
class SystemComponent {
    private String name;
    private String technology;
    private int instances;
    private double cpuUtilization;
    private double memoryUtilization;
    private boolean isHealthy;
    
    public SystemComponent(String name, String technology, int instances) {
        this.name = name;
        this.technology = technology;
        this.instances = instances;
        this.isHealthy = true;
    }
    
    public void updateMetrics(double cpu, double memory) {
        this.cpuUtilization = cpu;
        this.memoryUtilization = memory;
        this.isHealthy = cpu < 80 && memory < 85;
    }
    
    // Getters
    public String getName() { return name; }
    public String getTechnology() { return technology; }
    public int getInstances() { return instances; }
    public double getCpuUtilization() { return cpuUtilization; }
    public double getMemoryUtilization() { return memoryUtilization; }
    public boolean isHealthy() { return isHealthy; }
}

class LoadBalancer {
    private String name;
    private List<String> healthyInstances;
    private int totalRequests;
    private double responseTime;
    
    public LoadBalancer(String name) {
        this.name = name;
        this.healthyInstances = new ArrayList<>();
        this.totalRequests = 0;
        this.responseTime = 0.0;
    }
    
    public void addHealthyInstance(String instance) {
        if (!healthyInstances.contains(instance)) {
            healthyInstances.add(instance);
        }
    }
    
    public void removeUnhealthyInstance(String instance) {
        healthyInstances.remove(instance);
    }
    
    public void updateMetrics(int requests, double responseTime) {
        this.totalRequests = requests;
        this.responseTime = responseTime;
    }
    
    // Getters
    public String getName() { return name; }
    public List<String> getHealthyInstances() { return healthyInstances; }
    public int getTotalRequests() { return totalRequests; }
    public double getResponseTime() { return responseTime; }
}

class CDN {
    private String name;
    private Map<String, Integer> cacheHitRates;
    private Map<String, Double> responseTimes;
    private int totalRequests;
    
    public CDN(String name) {
        this.name = name;
        this.cacheHitRates = new HashMap<>();
        this.responseTimes = new HashMap<>();
        this.totalRequests = 0;
    }
    
    public void updateCacheHitRate(String region, int hitRate) {
        cacheHitRates.put(region, hitRate);
    }
    
    public void updateResponseTime(String region, double responseTime) {
        responseTimes.put(region, responseTime);
    }
    
    public void incrementRequests() {
        this.totalRequests++;
    }
    
    // Getters
    public String getName() { return name; }
    public Map<String, Integer> getCacheHitRates() { return cacheHitRates; }
    public Map<String, Double> getResponseTimes() { return responseTimes; }
    public int getTotalRequests() { return totalRequests; }
}

class VideoProcessingPipeline {
    private String name;
    private Queue<String> processingQueue;
    private Map<String, String> processingStatus;
    private int completedJobs;
    private int failedJobs;
    
    public VideoProcessingPipeline(String name) {
        this.name = name;
        this.processingQueue = new LinkedList<>();
        this.processingStatus = new HashMap<>();
        this.completedJobs = 0;
        this.failedJobs = 0;
    }
    
    public void addToQueue(String videoId) {
        processingQueue.offer(videoId);
        processingStatus.put(videoId, "QUEUED");
    }
    
    public void startProcessing(String videoId) {
        processingStatus.put(videoId, "PROCESSING");
    }
    
    public void completeProcessing(String videoId) {
        processingStatus.put(videoId, "COMPLETED");
        completedJobs++;
    }
    
    public void failProcessing(String videoId) {
        processingStatus.put(videoId, "FAILED");
        failedJobs++;
    }
    
    // Getters
    public String getName() { return name; }
    public Queue<String> getProcessingQueue() { return processingQueue; }
    public Map<String, String> getProcessingStatus() { return processingStatus; }
    public int getCompletedJobs() { return completedJobs; }
    public int getFailedJobs() { return failedJobs; }
}

// Main HLD System Class
public class DesignOtt {
    private Map<String, SystemComponent> components;
    private LoadBalancer loadBalancer;
    private CDN cdn;
    private VideoProcessingPipeline videoPipeline;
    private boolean isHighLoadScenario;
    
    public DesignOtt(boolean isHighLoadScenario) {
        this.isHighLoadScenario = isHighLoadScenario;
        this.components = new HashMap<>();
        this.loadBalancer = new LoadBalancer(isHighLoadScenario ? "Global Load Balancer" : "Application Load Balancer");
        this.cdn = new CDN("CloudFront CDN");
        this.videoPipeline = new VideoProcessingPipeline("AWS MediaConvert");
        
        initializeSystem();
    }
    
    private void initializeSystem() {
        if (isHighLoadScenario) {
            // High Load Components
            components.put("UserService", new SystemComponent("User Service", "Spring Boot", 10));
            components.put("ContentService", new SystemComponent("Content Service", "Spring Boot", 8));
            components.put("StreamingService", new SystemComponent("Streaming Service", "Spring Boot", 12));
            components.put("PaymentService", new SystemComponent("Payment Service", "Spring Boot", 6));
            components.put("RecommendationService", new SystemComponent("Recommendation Service", "Python", 4));
            components.put("AnalyticsService", new SystemComponent("Analytics Service", "Python", 3));
            
            // Load Balancer instances
            loadBalancer.addHealthyInstance("us-east-1-lb-1");
            loadBalancer.addHealthyInstance("us-west-2-lb-1");
            loadBalancer.addHealthyInstance("eu-west-1-lb-1");
            loadBalancer.addHealthyInstance("ap-southeast-1-lb-1");
            
            // CDN regions
            cdn.updateCacheHitRate("us-east-1", 85);
            cdn.updateCacheHitRate("us-west-2", 82);
            cdn.updateCacheHitRate("eu-west-1", 88);
            cdn.updateCacheHitRate("ap-southeast-1", 80);
            
        } else {
            // Low Load Components
            components.put("UserService", new SystemComponent("User Service", "Spring Boot", 2));
            components.put("ContentService", new SystemComponent("Content Service", "Spring Boot", 2));
            components.put("StreamingService", new SystemComponent("Streaming Service", "Spring Boot", 3));
            components.put("PaymentService", new SystemComponent("Payment Service", "Spring Boot", 1));
            components.put("RecommendationService", new SystemComponent("Recommendation Service", "Python", 1));
            
            // Single load balancer instance
            loadBalancer.addHealthyInstance("us-east-1-lb-1");
            
            // Single CDN region
            cdn.updateCacheHitRate("us-east-1", 75);
        }
    }
    
    public void simulateLoad() {
        Random random = new Random();
        
        // Simulate component metrics
        for (SystemComponent component : components.values()) {
            double cpu = random.nextDouble() * 100;
            double memory = random.nextDouble() * 100;
            component.updateMetrics(cpu, memory);
        }
        
        // Simulate load balancer metrics
        int requests = isHighLoadScenario ? random.nextInt(10000) + 5000 : random.nextInt(1000) + 100;
        double responseTime = isHighLoadScenario ? random.nextDouble() * 0.5 : random.nextDouble() * 2.0;
        loadBalancer.updateMetrics(requests, responseTime);
        
        // Simulate CDN metrics
        cdn.incrementRequests();
        for (String region : cdn.getCacheHitRates().keySet()) {
            double responseTime = isHighLoadScenario ? random.nextDouble() * 0.2 : random.nextDouble() * 0.5;
            cdn.updateResponseTime(region, responseTime);
        }
    }
    
    public void processVideo(String videoId) {
        videoPipeline.addToQueue(videoId);
        System.out.println("Video " + videoId + " added to processing queue");
        
        // Simulate processing
        videoPipeline.startProcessing(videoId);
        System.out.println("Video " + videoId + " processing started");
        
        // Simulate completion (90% success rate)
        Random random = new Random();
        if (random.nextDouble() < 0.9) {
            videoPipeline.completeProcessing(videoId);
            System.out.println("Video " + videoId + " processing completed successfully");
        } else {
            videoPipeline.failProcessing(videoId);
            System.out.println("Video " + videoId + " processing failed");
        }
    }
    
    public void generateSystemReport() {
        System.out.println("\n=== OTT Platform System Report ===");
        System.out.println("Load Scenario: " + (isHighLoadScenario ? "High Load" : "Low Load"));
        System.out.println("Timestamp: " + LocalDateTime.now());
        
        System.out.println("\n--- Component Health ---");
        for (SystemComponent component : components.values()) {
            String status = component.isHealthy() ? "HEALTHY" : "UNHEALTHY";
            System.out.printf("%s (%s): %s - CPU: %.1f%%, Memory: %.1f%%, Instances: %d%n",
                component.getName(), component.getTechnology(), status,
                component.getCpuUtilization(), component.getMemoryUtilization(), component.getInstances());
        }
        
        System.out.println("\n--- Load Balancer Status ---");
        System.out.printf("Name: %s%n", loadBalancer.getName());
        System.out.printf("Healthy Instances: %d%n", loadBalancer.getHealthyInstances().size());
        System.out.printf("Total Requests: %d%n", loadBalancer.getTotalRequests());
        System.out.printf("Average Response Time: %.2f seconds%n", loadBalancer.getResponseTime());
        
        System.out.println("\n--- CDN Performance ---");
        System.out.printf("Name: %s%n", cdn.getName());
        System.out.printf("Total Requests: %d%n", cdn.getTotalRequests());
        for (Map.Entry<String, Integer> entry : cdn.getCacheHitRates().entrySet()) {
            System.out.printf("Region %s - Cache Hit Rate: %d%%, Response Time: %.2fs%n",
                entry.getKey(), entry.getValue(), cdn.getResponseTimes().get(entry.getKey()));
        }
        
        System.out.println("\n--- Video Processing Pipeline ---");
        System.out.printf("Name: %s%n", videoPipeline.getName());
        System.out.printf("Queue Size: %d%n", videoPipeline.getProcessingQueue().size());
        System.out.printf("Completed Jobs: %d%n", videoPipeline.getCompletedJobs());
        System.out.printf("Failed Jobs: %d%n", videoPipeline.getFailedJobs());
        
        System.out.println("\n=== End Report ===\n");
    }
    
    public void demonstrateScalability() {
        System.out.println("=== Scalability Demonstration ===");
        
        if (isHighLoadScenario) {
            System.out.println("High Load Scenario - Scaling Strategies:");
            System.out.println("1. Horizontal Scaling: Auto-scaling groups with 10+ instances per service");
            System.out.println("2. Geographic Distribution: Multi-region deployment across 4 regions");
            System.out.println("3. CDN Optimization: 200+ edge locations with 85%+ cache hit rate");
            System.out.println("4. Database Scaling: Read replicas and connection pooling");
            System.out.println("5. Caching Strategy: Redis cluster with 3 nodes");
            System.out.println("6. Load Distribution: Global load balancer with health-based routing");
        } else {
            System.out.println("Low Load Scenario - Scaling Strategies:");
            System.out.println("1. Vertical Scaling: Larger instance types for single services");
            System.out.println("2. Single Region: Cost-effective deployment in one region");
            System.out.println("3. Basic CDN: Single region with 75% cache hit rate");
            System.out.println("4. Simple Database: Single PostgreSQL instance");
            System.out.println("5. Basic Caching: Single Redis instance");
            System.out.println("6. Simple Load Balancing: Single ALB with health checks");
        }
        
        System.out.println();
    }
    
    public static void main(String[] args) {
        // Demonstrate Low Load Scenario
        System.out.println("=== OTT Platform HLD - Low Load Scenario ===");
        DesignOtt lowLoadSystem = new DesignOtt(false);
        lowLoadSystem.simulateLoad();
        lowLoadSystem.processVideo("movie_001");
        lowLoadSystem.generateSystemReport();
        lowLoadSystem.demonstrateScalability();
        
        // Demonstrate High Load Scenario
        System.out.println("=== OTT Platform HLD - High Load Scenario ===");
        DesignOtt highLoadSystem = new DesignOtt(true);
        highLoadSystem.simulateLoad();
        highLoadSystem.processVideo("movie_002");
        highLoadSystem.processVideo("movie_003");
        highLoadSystem.generateSystemReport();
        highLoadSystem.demonstrateScalability();
    }
} 