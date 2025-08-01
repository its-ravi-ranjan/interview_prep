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
 *       - Technology: Node.js/Express
 *       - Database: PostgreSQL (Single instance)
 *       - Cache: Redis (Single instance)
 *       - Functions: Registration, login, profile management
 *       
 *    b) Content Service:
 *       - Technology: Node.js/Express
 *       - Database: PostgreSQL (Single instance)
 *       - Functions: Content metadata, search, categorization
 *       
 *    c) Streaming Service:
 *       - Technology: Node.js/Express
 *       - Database: PostgreSQL (Single instance)
 *       - Functions: Video manifest generation, progress tracking
 *       
 *    d) Payment Service:
 *       - Technology: Node.js/Express
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
 *       - Technology: Node.js/Express
 *       - Database: PostgreSQL (Read replicas)
 *       - Cache: Redis Cluster (3 nodes)
 *       - Message Queue: AWS SQS for async operations
 *       - Functions: Registration, login, profile management, social features
 *       
 *    b) Content Service:
 *       - Technology: Node.js/Express
 *       - Database: PostgreSQL (Read replicas)
 *       - Search: Elasticsearch for advanced search
 *       - Cache: Redis Cluster for metadata caching
 *       - Functions: Content metadata, search, categorization, recommendations
 *       
 *    c) Streaming Service:
 *       - Technology: Node.js/Express
 *       - Database: PostgreSQL (Read replicas)
 *       - Cache: Redis Cluster for session management
 *       - Functions: Video manifest generation, progress tracking, adaptive streaming
 *       
 *    d) Payment Service:
 *       - Technology: Node.js/Express
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
 *       - Technology: Python/Node.js
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

// Core System Components for HLD Demo
class SystemComponent {
    constructor(name, technology, instances) {
        this.name = name;
        this.technology = technology;
        this.instances = instances;
        this.cpuUtilization = 0;
        this.memoryUtilization = 0;
        this.isHealthy = true;
    }
    
    updateMetrics(cpu, memory) {
        this.cpuUtilization = cpu;
        this.memoryUtilization = memory;
        this.isHealthy = cpu < 80 && memory < 85;
    }
}

class LoadBalancer {
    constructor(name) {
        this.name = name;
        this.healthyInstances = [];
        this.totalRequests = 0;
        this.responseTime = 0.0;
    }
    
    addHealthyInstance(instance) {
        if (!this.healthyInstances.includes(instance)) {
            this.healthyInstances.push(instance);
        }
    }
    
    removeUnhealthyInstance(instance) {
        this.healthyInstances = this.healthyInstances.filter(inst => inst !== instance);
    }
    
    updateMetrics(requests, responseTime) {
        this.totalRequests = requests;
        this.responseTime = responseTime;
    }
}

class CDN {
    constructor(name) {
        this.name = name;
        this.cacheHitRates = new Map();
        this.responseTimes = new Map();
        this.totalRequests = 0;
    }
    
    updateCacheHitRate(region, hitRate) {
        this.cacheHitRates.set(region, hitRate);
    }
    
    updateResponseTime(region, responseTime) {
        this.responseTimes.set(region, responseTime);
    }
    
    incrementRequests() {
        this.totalRequests++;
    }
}

class VideoProcessingPipeline {
    constructor(name) {
        this.name = name;
        this.processingQueue = [];
        this.processingStatus = new Map();
        this.completedJobs = 0;
        this.failedJobs = 0;
    }
    
    addToQueue(videoId) {
        this.processingQueue.push(videoId);
        this.processingStatus.set(videoId, "QUEUED");
    }
    
    startProcessing(videoId) {
        this.processingStatus.set(videoId, "PROCESSING");
    }
    
    completeProcessing(videoId) {
        this.processingStatus.set(videoId, "COMPLETED");
        this.completedJobs++;
    }
    
    failProcessing(videoId) {
        this.processingStatus.set(videoId, "FAILED");
        this.failedJobs++;
    }
}

// Main HLD System Class
class DesignOtt {
    constructor(isHighLoadScenario) {
        this.isHighLoadScenario = isHighLoadScenario;
        this.components = new Map();
        this.loadBalancer = new LoadBalancer(isHighLoadScenario ? "Global Load Balancer" : "Application Load Balancer");
        this.cdn = new CDN("CloudFront CDN");
        this.videoPipeline = new VideoProcessingPipeline("AWS MediaConvert");
        
        this.initializeSystem();
    }
    
    initializeSystem() {
        if (this.isHighLoadScenario) {
            // High Load Components
            this.components.set("UserService", new SystemComponent("User Service", "Node.js/Express", 10));
            this.components.set("ContentService", new SystemComponent("Content Service", "Node.js/Express", 8));
            this.components.set("StreamingService", new SystemComponent("Streaming Service", "Node.js/Express", 12));
            this.components.set("PaymentService", new SystemComponent("Payment Service", "Node.js/Express", 6));
            this.components.set("RecommendationService", new SystemComponent("Recommendation Service", "Python", 4));
            this.components.set("AnalyticsService", new SystemComponent("Analytics Service", "Python", 3));
            
            // Load Balancer instances
            this.loadBalancer.addHealthyInstance("us-east-1-lb-1");
            this.loadBalancer.addHealthyInstance("us-west-2-lb-1");
            this.loadBalancer.addHealthyInstance("eu-west-1-lb-1");
            this.loadBalancer.addHealthyInstance("ap-southeast-1-lb-1");
            
            // CDN regions
            this.cdn.updateCacheHitRate("us-east-1", 85);
            this.cdn.updateCacheHitRate("us-west-2", 82);
            this.cdn.updateCacheHitRate("eu-west-1", 88);
            this.cdn.updateCacheHitRate("ap-southeast-1", 80);
            
        } else {
            // Low Load Components
            this.components.set("UserService", new SystemComponent("User Service", "Node.js/Express", 2));
            this.components.set("ContentService", new SystemComponent("Content Service", "Node.js/Express", 2));
            this.components.set("StreamingService", new SystemComponent("Streaming Service", "Node.js/Express", 3));
            this.components.set("PaymentService", new SystemComponent("Payment Service", "Node.js/Express", 1));
            this.components.set("RecommendationService", new SystemComponent("Recommendation Service", "Python", 1));
            
            // Single load balancer instance
            this.loadBalancer.addHealthyInstance("us-east-1-lb-1");
            
            // Single CDN region
            this.cdn.updateCacheHitRate("us-east-1", 75);
        }
    }
    
    simulateLoad() {
        // Simulate component metrics
        for (const component of this.components.values()) {
            const cpu = Math.random() * 100;
            const memory = Math.random() * 100;
            component.updateMetrics(cpu, memory);
        }
        
        // Simulate load balancer metrics
        const requests = this.isHighLoadScenario ? 
            Math.floor(Math.random() * 10000) + 5000 : 
            Math.floor(Math.random() * 1000) + 100;
        const responseTime = this.isHighLoadScenario ? 
            Math.random() * 0.5 : 
            Math.random() * 2.0;
        this.loadBalancer.updateMetrics(requests, responseTime);
        
        // Simulate CDN metrics
        this.cdn.incrementRequests();
        for (const region of this.cdn.cacheHitRates.keys()) {
            const responseTime = this.isHighLoadScenario ? 
                Math.random() * 0.2 : 
                Math.random() * 0.5;
            this.cdn.updateResponseTime(region, responseTime);
        }
    }
    
    processVideo(videoId) {
        this.videoPipeline.addToQueue(videoId);
        console.log(`Video ${videoId} added to processing queue`);
        
        // Simulate processing
        this.videoPipeline.startProcessing(videoId);
        console.log(`Video ${videoId} processing started`);
        
        // Simulate completion (90% success rate)
        if (Math.random() < 0.9) {
            this.videoPipeline.completeProcessing(videoId);
            console.log(`Video ${videoId} processing completed successfully`);
        } else {
            this.videoPipeline.failProcessing(videoId);
            console.log(`Video ${videoId} processing failed`);
        }
    }
    
    generateSystemReport() {
        console.log("\n=== OTT Platform System Report ===");
        console.log(`Load Scenario: ${this.isHighLoadScenario ? "High Load" : "Low Load"}`);
        console.log(`Timestamp: ${new Date().toISOString()}`);
        
        console.log("\n--- Component Health ---");
        for (const component of this.components.values()) {
            const status = component.isHealthy ? "HEALTHY" : "UNHEALTHY";
            console.log(`${component.name} (${component.technology}): ${status} - CPU: ${component.cpuUtilization.toFixed(1)}%, Memory: ${component.memoryUtilization.toFixed(1)}%, Instances: ${component.instances}`);
        }
        
        console.log("\n--- Load Balancer Status ---");
        console.log(`Name: ${this.loadBalancer.name}`);
        console.log(`Healthy Instances: ${this.loadBalancer.healthyInstances.length}`);
        console.log(`Total Requests: ${this.loadBalancer.totalRequests}`);
        console.log(`Average Response Time: ${this.loadBalancer.responseTime.toFixed(2)} seconds`);
        
        console.log("\n--- CDN Performance ---");
        console.log(`Name: ${this.cdn.name}`);
        console.log(`Total Requests: ${this.cdn.totalRequests}`);
        for (const [region, hitRate] of this.cdn.cacheHitRates) {
            const responseTime = this.cdn.responseTimes.get(region) || 0;
            console.log(`Region ${region} - Cache Hit Rate: ${hitRate}%, Response Time: ${responseTime.toFixed(2)}s`);
        }
        
        console.log("\n--- Video Processing Pipeline ---");
        console.log(`Name: ${this.videoPipeline.name}`);
        console.log(`Queue Size: ${this.videoPipeline.processingQueue.length}`);
        console.log(`Completed Jobs: ${this.videoPipeline.completedJobs}`);
        console.log(`Failed Jobs: ${this.videoPipeline.failedJobs}`);
        
        console.log("\n=== End Report ===\n");
    }
    
    demonstrateScalability() {
        console.log("=== Scalability Demonstration ===");
        
        if (this.isHighLoadScenario) {
            console.log("High Load Scenario - Scaling Strategies:");
            console.log("1. Horizontal Scaling: Auto-scaling groups with 10+ instances per service");
            console.log("2. Geographic Distribution: Multi-region deployment across 4 regions");
            console.log("3. CDN Optimization: 200+ edge locations with 85%+ cache hit rate");
            console.log("4. Database Scaling: Read replicas and connection pooling");
            console.log("5. Caching Strategy: Redis cluster with 3 nodes");
            console.log("6. Load Distribution: Global load balancer with health-based routing");
        } else {
            console.log("Low Load Scenario - Scaling Strategies:");
            console.log("1. Vertical Scaling: Larger instance types for single services");
            console.log("2. Single Region: Cost-effective deployment in one region");
            console.log("3. Basic CDN: Single region with 75% cache hit rate");
            console.log("4. Simple Database: Single PostgreSQL instance");
            console.log("5. Basic Caching: Single Redis instance");
            console.log("6. Simple Load Balancing: Single ALB with health checks");
        }
        
        console.log();
    }
}

// Demo function to run the HLD system
function runHLDDemo() {
    // Demonstrate Low Load Scenario
    console.log("=== OTT Platform HLD - Low Load Scenario ===");
    const lowLoadSystem = new DesignOtt(false);
    lowLoadSystem.simulateLoad();
    lowLoadSystem.processVideo("movie_001");
    lowLoadSystem.generateSystemReport();
    lowLoadSystem.demonstrateScalability();
    
    // Demonstrate High Load Scenario
    console.log("=== OTT Platform HLD - High Load Scenario ===");
    const highLoadSystem = new DesignOtt(true);
    highLoadSystem.simulateLoad();
    highLoadSystem.processVideo("movie_002");
    highLoadSystem.processVideo("movie_003");
    highLoadSystem.generateSystemReport();
    highLoadSystem.demonstrateScalability();
}

// Export for use in other modules or run directly
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DesignOtt, runHLDDemo };
} else {
    // Run demo if executed directly
    runHLDDemo();
} 