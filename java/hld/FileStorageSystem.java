/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation and system design practice
 * 
 * File Storage System Design (High-Level Design)
 * 
 * Problem: Design a scalable file storage system similar to Amazon S3, Google Drive, or Dropbox
 * that can handle millions of users, billions of files, and provide high availability,
 * durability, and performance.
 * 
 * Functional Requirements:
 * 1. Upload files (any size from KB to GB)
 * 2. Download files
 * 3. Delete files
 * 4. List files in a directory
 * 5. Create/delete directories
 * 6. Share files with other users
 * 7. Version control for files
 * 8. Search files by name/metadata
 * 
 * Non-Functional Requirements:
 * 1. High Availability (99.9% uptime)
 * 2. Durability (99.999999999% - 11 9s)
 * 3. Low Latency (< 200ms for metadata operations, < 2s for file uploads)
 * 4. Scalability (handle millions of users, billions of files)
 * 5. Security (encryption at rest and in transit)
 * 6. Cost-effective storage
 * 
 * System Scale:
 * - 100 million users
 * - 1 billion files
 * - 10 PB total storage
 * - 1000 requests/second
 * - Average file size: 10MB
 * - Peak file size: 5GB
 */

import java.util.*;

/**
 * System Architecture Overview
 */
public class FileStorageSystem {
    
    /**
     * 1. SYSTEM COMPONENTS
     */
    
    /**
     * 1.1 Load Balancer
     * - Distributes incoming requests across multiple API servers
     * - Uses consistent hashing for session affinity
     * - Health checks for backend services
     */
    class LoadBalancer {
        private List<String> apiServers;
        
        public String routeRequest(String request) {
            // Route to appropriate API server
            return apiServers.get(hash(request) % apiServers.size());
        }
    }
    
    /**
     * 1.2 API Gateway
     * - Authentication and authorization
     * - Rate limiting
     * - Request/response transformation
     * - API versioning
     */
    class APIGateway {
        public boolean authenticate(String token) {
            // JWT token validation
            return true;
        }
        
        public boolean authorize(String userId, String operation, String resource) {
            // Check user permissions
            return true;
        }
    }
    
    /**
     * 1.3 Metadata Service
     * - Stores file metadata (name, size, location, permissions, etc.)
     * - Uses distributed database (DynamoDB/Cassandra)
     * - Handles file system hierarchy
     */
    class MetadataService {
        private Map<String, FileMetadata> metadataStore;
        
        public FileMetadata getFileMetadata(String fileId) {
            return metadataStore.get(fileId);
        }
        
        public void updateMetadata(String fileId, FileMetadata metadata) {
            metadataStore.put(fileId, metadata);
        }
    }
    
    /**
     * 1.4 Storage Service
     * - Handles actual file storage
     * - Uses object storage (S3-like)
     * - Implements data replication and erasure coding
     */
    class StorageService {
        private Map<String, byte[]> objectStore;
        
        public String uploadFile(byte[] data, String fileId) {
            // Store file with replication
            objectStore.put(fileId, data);
            return fileId;
        }
        
        public byte[] downloadFile(String fileId) {
            return objectStore.get(fileId);
        }
    }
    
    /**
     * 1.5 Cache Layer
     * - Redis for frequently accessed metadata
     * - CDN for popular files
     * - Reduces database load and improves performance
     */
    class CacheService {
        private Map<String, Object> cache;
        
        public Object get(String key) {
            return cache.get(key);
        }
        
        public void set(String key, Object value, int ttl) {
            cache.put(key, value);
        }
    }
    
    /**
     * 1.6 Search Service
     * - Elasticsearch for file search
     * - Indexes file names, metadata, and content
     * - Supports full-text search and filters
     */
    class SearchService {
        public List<String> searchFiles(String query, String userId) {
            // Search files based on query and user permissions
            return new ArrayList<>();
        }
    }
    
    /**
     * 2. DATA MODELS
     */
    
    class FileMetadata {
        private String fileId;
        private String fileName;
        private String userId;
        private long fileSize;
        private String fileType;
        private String storageLocation;
        private Date createdAt;
        private Date updatedAt;
        private String parentDirectory;
        private Map<String, String> permissions;
        private List<String> versions;
        private String checksum;
        
        // Getters and setters
    }
    
    class User {
        private String userId;
        private String email;
        private long storageUsed;
        private long storageLimit;
        private List<String> sharedFiles;
        private Map<String, String> preferences;
        
        // Getters and setters
    }
    
    class Directory {
        private String directoryId;
        private String directoryName;
        private String userId;
        private String parentDirectory;
        private List<String> files;
        private List<String> subdirectories;
        private Date createdAt;
        
        // Getters and setters
    }
    
    /**
     * 3. DATABASE DESIGN
     */
    
    /**
     * 3.1 Metadata Database (DynamoDB/Cassandra)
     * 
     * Tables:
     * 1. Files Table
     *    - Partition Key: fileId
     *    - Sort Key: userId
     *    - Attributes: fileName, size, type, location, permissions, etc.
     * 
     * 2. Users Table
     *    - Partition Key: userId
     *    - Attributes: email, storageUsed, storageLimit, etc.
     * 
     * 3. Directories Table
     *    - Partition Key: directoryId
     *    - Sort Key: userId
     *    - Attributes: directoryName, parentDirectory, files, etc.
     * 
     * 4. File Versions Table
     *    - Partition Key: fileId
     *    - Sort Key: versionNumber
     *    - Attributes: versionData, timestamp, etc.
     */
    
    /**
     * 3.2 Object Storage (S3-like)
     * 
     * Bucket Structure:
     * - user-{userId}/files/{fileId}
     * - user-{userId}/versions/{fileId}/{version}
     * - shared/{shareId}/files/{fileId}
     * 
     * Replication Strategy:
     * - 3x replication across different availability zones
     * - Erasure coding for cost optimization
     */
    
    /**
     * 4. API DESIGN
     */
    
    /**
     * 4.1 RESTful APIs
     * 
     * File Operations:
     * - POST /api/v1/files/upload
     * - GET /api/v1/files/{fileId}/download
     * - DELETE /api/v1/files/{fileId}
     * - PUT /api/v1/files/{fileId}/metadata
     * 
     * Directory Operations:
     * - POST /api/v1/directories
     * - GET /api/v1/directories/{directoryId}/contents
     * - DELETE /api/v1/directories/{directoryId}
     * 
     * Search Operations:
     * - GET /api/v1/search?q={query}&type={type}
     * 
     * Sharing Operations:
     * - POST /api/v1/files/{fileId}/share
     * - GET /api/v1/shared/{shareId}/files
     */
    
    /**
     * 5. SYSTEM WORKFLOWS
     */
    
    /**
     * 5.1 File Upload Workflow
     * 1. Client sends file to API Gateway
     * 2. API Gateway authenticates and authorizes user
     * 3. File is uploaded to Storage Service
     * 4. Storage Service returns file location
     * 5. Metadata Service creates file metadata
     * 6. Search Service indexes file
     * 7. Response sent to client
     */
    
    /**
     * 5.2 File Download Workflow
     * 1. Client requests file download
     * 2. API Gateway authenticates user
     * 3. Metadata Service checks file permissions
     * 4. Storage Service retrieves file
     * 5. File sent to client
     */
    
    /**
     * 6. SCALABILITY CONSIDERATIONS
     */
    
    /**
     * 6.1 Horizontal Scaling
     * - API servers can be scaled independently
     * - Database sharding by userId
     * - Storage distributed across multiple regions
     * - CDN for global content delivery
     */
    
    /**
     * 6.2 Caching Strategy
     * - Redis for metadata caching
     * - CDN for popular files
     * - Browser caching for static assets
     * - Database query result caching
     */
    
    /**
     * 6.3 Database Optimization
     * - Read replicas for read-heavy workloads
     * - Connection pooling
     * - Query optimization and indexing
     * - Partitioning for large tables
     */
    
    /**
     * 7. SECURITY MEASURES
     */
    
    /**
     * 7.1 Authentication & Authorization
     * - JWT tokens for API authentication
     * - OAuth 2.0 for third-party integration
     * - Role-based access control (RBAC)
     * - File-level permissions
     */
    
    /**
     * 7.2 Data Protection
     * - Encryption at rest (AES-256)
     * - Encryption in transit (TLS 1.3)
     * - Client-side encryption for sensitive files
     * - Regular security audits
     */
    
    /**
     * 7.3 Network Security
     * - VPC for network isolation
     * - WAF for DDoS protection
     * - Rate limiting and throttling
     * - IP whitelisting for admin access
     */
    
    /**
     * 8. MONITORING & OBSERVABILITY
     */
    
    /**
     * 8.1 Metrics
     * - Request latency and throughput
     * - Storage usage and costs
     * - Error rates and availability
     * - User engagement metrics
     */
    
    /**
     * 8.2 Logging
     * - Centralized logging with ELK stack
     * - Audit logs for security compliance
     * - Performance logs for optimization
     * - Error tracking and alerting
     */
    
    /**
     * 8.3 Alerting
     * - High error rates
     * - Storage capacity thresholds
     * - Performance degradation
     * - Security incidents
     */
    
    /**
     * 9. DISASTER RECOVERY
     */
    
    /**
     * 9.1 Backup Strategy
     * - Daily automated backups
     * - Cross-region replication
     * - Point-in-time recovery
     * - Regular backup testing
     */
    
    /**
     * 9.2 Recovery Procedures
     * - RTO: 4 hours for critical services
     * - RPO: 1 hour for data loss
     * - Automated failover procedures
     * - Manual recovery playbooks
     */
    
    /**
     * 10. COST OPTIMIZATION
     */
    
    /**
     * 10.1 Storage Optimization
     * - Tiered storage (hot, warm, cold)
     * - Data compression and deduplication
     * - Lifecycle policies for old files
     * - Erasure coding for cost reduction
     */
    
    /**
     * 10.2 Compute Optimization
     * - Auto-scaling based on demand
     * - Spot instances for non-critical workloads
     * - Resource right-sizing
     * - Reserved instances for predictable workloads
     */
    
    /**
     * 11. AMAZON SPECIFIC CONSIDERATIONS
     */
    
    /**
     * 11.1 AWS Services Integration
     * - S3 for object storage
     * - DynamoDB for metadata
     * - CloudFront for CDN
     * - Lambda for serverless functions
     * - ECS/EKS for container orchestration
     */
    
    /**
     * 11.2 Amazon Leadership Principles
     * - Customer Obsession: Focus on user experience
     * - Ownership: End-to-end responsibility
     * - Invent and Simplify: Innovative solutions
     * - Are Right, A Lot: Data-driven decisions
     * - Learn and Be Curious: Continuous improvement
     * - Hire and Develop the Best: Team growth
     * - Insist on the Highest Standards: Quality focus
     * - Think Big: Scalable architecture
     * - Bias for Action: Rapid iteration
     * - Frugality: Cost optimization
     * - Earn Trust: Security and reliability
     * - Dive Deep: Technical excellence
     * - Have Backbone; Disagree and Commit: Technical decisions
     * - Deliver Results: Performance and availability
     */
    
    /**
     * 12. INTERVIEW TIPS
     */
    
    /**
     * 12.1 Discussion Points
     * - Start with requirements clarification
     * - Discuss scale and constraints
     * - Present high-level architecture first
     * - Dive deep into critical components
     * - Address trade-offs and alternatives
     * - Discuss failure scenarios and mitigation
     */
    
    /**
     * 12.2 Common Questions
     * - How to handle large file uploads?
     * - How to ensure data consistency?
     * - How to handle concurrent access?
     * - How to optimize for cost vs performance?
     * - How to handle edge cases and failures?
     */
    
    /**
     * 12.3 Red Flags to Avoid
     * - Not considering scale requirements
     * - Ignoring security aspects
     * - Not discussing trade-offs
     * - Over-engineering simple solutions
     * - Not considering operational aspects
     */
    
    public static void main(String[] args) {
        System.out.println("=== File Storage System Design ===");
        System.out.println("This is a comprehensive system design for a scalable file storage system.");
        System.out.println("Key components: Load Balancer, API Gateway, Metadata Service, Storage Service");
        System.out.println("Focus areas: Scalability, Security, Performance, Cost Optimization");
        System.out.println("Amazon Leadership Principles: Customer Obsession, Ownership, Think Big");
    }
}

/**
 * Additional Considerations:
 * 
 * 1. Microservices Architecture
 * - Service discovery and communication
 * - Circuit breakers and fallbacks
 * - Distributed tracing
 * - Service mesh implementation
 * 
 * 2. Data Consistency
 * - Eventual consistency for metadata
 * - Strong consistency for critical operations
 * - Conflict resolution strategies
 * - Distributed transactions
 * 
 * 3. Performance Optimization
 * - Connection pooling
 * - Database query optimization
 * - Caching strategies
 * - CDN optimization
 * 
 * 4. Compliance and Governance
 * - GDPR compliance
 * - Data retention policies
 * - Access audit trails
 * - Regulatory requirements
 * 
 * 5. Future Enhancements
 * - AI-powered file organization
 * - Advanced search capabilities
 * - Real-time collaboration
 * - Mobile app optimization
 */ 