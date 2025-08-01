/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - Database Management System (DBMS) Introduction
 * 
 * Database Management System (DBMS) Introduction
 * =============================================
 * 
 * What is DBMS?
 * -------------
 * A Database Management System (DBMS) is software that manages databases, providing
 * an interface for users and applications to store, retrieve, update, and manage data
 * efficiently and securely.
 * 
 * Key Functions of DBMS:
 * 1. Data Definition: Define data structure and relationships
 * 2. Data Manipulation: Insert, update, delete, and query data
 * 3. Data Security: Access control and data protection
 * 4. Data Integrity: Ensure data accuracy and consistency
 * 5. Data Recovery: Backup and recovery mechanisms
 * 6. Concurrency Control: Handle multiple users simultaneously
 * 
 * DBMS vs File System:
 * ===================
 * 
 * File System:
 * - No data independence
 * - No data consistency
 * - No security features
 * - No backup/recovery
 * - No concurrent access control
 * 
 * DBMS:
 * - Data independence (logical and physical)
 * - Data consistency and integrity
 * - Security and access control
 * - Backup and recovery
 * - Concurrent access control
 * - Query optimization
 * 
 * Types of DBMS:
 * =============
 * 
 * 1. Relational DBMS (RDBMS):
 *    - Data organized in tables (relations)
 *    - Uses SQL for querying
 *    - ACID properties (Atomicity, Consistency, Isolation, Durability)
 *    - Examples: MySQL, PostgreSQL, Oracle, SQL Server
 *    - Best for: Structured data, complex queries, transactions
 * 
 * 2. NoSQL DBMS:
 *    - Non-relational database systems
 *    - Flexible schema design
 *    - Different data models
 *    - Examples: MongoDB, Cassandra, Redis, Neo4j
 *    - Best for: Unstructured data, scalability, flexibility
 * 
 * 3. Object-Oriented DBMS (OODBMS):
 *    - Stores objects directly
 *    - Complex data types
 *    - Object-oriented programming integration
 *    - Examples: ObjectDB, Versant
 *    - Best for: Complex objects, object-oriented applications
 * 
 * 4. Hierarchical DBMS:
 *    - Tree-like structure
 *    - Parent-child relationships
 *    - Examples: IBM IMS, Windows Registry
 *    - Best for: File systems, organizational structures
 * 
 * 5. Network DBMS:
 *    - Graph-like structure
 *    - Many-to-many relationships
 *    - Examples: IDMS, TurboIMAGE
 *    - Best for: Complex relationships, network data
 * 
 * 6. Columnar DBMS:
 *    - Data stored by columns
 *    - Optimized for analytics
 *    - Examples: Amazon Redshift, Google BigQuery
 *    - Best for: Data warehousing, analytics
 * 
 * 7. Time-Series DBMS:
 *    - Optimized for time-stamped data
 *    - Efficient for time-based queries
 *    - Examples: InfluxDB, TimescaleDB
 *    - Best for: IoT data, monitoring, analytics
 * 
 * 8. Graph DBMS:
 *    - Stores relationships as first-class citizens
 *    - Optimized for graph queries
 *    - Examples: Neo4j, Amazon Neptune
 *    - Best for: Social networks, recommendation systems
 * 
 * DBMS Architecture:
 * =================
 * 
 * 1. Three-Tier Architecture:
 *    - Presentation Tier (Client)
 *    - Application Tier (Business Logic)
 *    - Data Tier (Database)
 * 
 * 2. Two-Tier Architecture:
 *    - Client-Server Architecture
 *    - Direct connection between client and database
 * 
 * 3. Single-Tier Architecture:
 *    - All components on single machine
 *    - Simple but limited scalability
 * 
 * ACID Properties:
 * ===============
 * 
 * 1. Atomicity:
 *    - All operations in a transaction succeed or fail together
 *    - No partial updates
 *    - Example: Bank transfer - both debit and credit must succeed
 * 
 * 2. Consistency:
 *    - Database remains in valid state before and after transaction
 *    - All constraints must be satisfied
 *    - Example: Account balance cannot be negative
 * 
 * 3. Isolation:
 *    - Concurrent transactions don't interfere with each other
 *    - Different isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable)
 *    - Example: Two users can read data simultaneously without conflicts
 * 
 * 4. Durability:
 *    - Committed transactions persist even after system failure
 *    - Data is permanently stored
 *    - Example: Transaction survives power failure
 * 
 * Database Design Concepts:
 * =======================
 * 
 * 1. Normalization:
 *    - Process of organizing data to reduce redundancy
 *    - Normal Forms: 1NF, 2NF, 3NF, BCNF, 4NF, 5NF
 *    - Benefits: Eliminates anomalies, saves storage, maintains integrity
 * 
 * 2. Denormalization:
 *    - Intentionally adding redundancy for performance
 *    - Trade-off between performance and data integrity
 *    - Used in data warehousing and reporting
 * 
 * 3. Indexing:
 *    - Data structure to improve query performance
 *    - Types: B-tree, Hash, Bitmap, Composite
 *    - Trade-off: Faster queries vs. slower writes
 * 
 * 4. Partitioning:
 *    - Dividing large tables into smaller, manageable pieces
 *    - Types: Horizontal, Vertical, Hash, Range
 *    - Benefits: Better performance, easier maintenance
 * 
 * Database Security:
 * ================
 * 
 * 1. Authentication:
 *    - User identification and verification
 *    - Methods: Username/password, certificates, biometrics
 * 
 * 2. Authorization:
 *    - Access control and permissions
 *    - Role-based access control (RBAC)
 *    - Grant/revoke privileges
 * 
 * 3. Encryption:
 *    - Data encryption at rest and in transit
 *    - Transparent Data Encryption (TDE)
 *    - Column-level encryption
 * 
 * 4. Auditing:
 *    - Track database activities
 *    - Log user actions and system events
 *    - Compliance and security monitoring
 * 
 * Database Performance:
 * ===================
 * 
 * 1. Query Optimization:
 *    - Query planner and optimizer
 *    - Execution plan analysis
 *    - Index usage optimization
 * 
 * 2. Connection Pooling:
 *    - Reuse database connections
 *    - Reduce connection overhead
 *    - Improve application performance
 * 
 * 3. Caching:
 *    - Store frequently accessed data in memory
 *    - Reduce disk I/O
 *    - Types: Query cache, result cache, buffer cache
 * 
 * 4. Monitoring:
 *    - Performance metrics tracking
 *    - Slow query identification
 *    - Resource utilization monitoring
 * 
 * Database Backup and Recovery:
 * ===========================
 * 
 * 1. Backup Types:
 *    - Full Backup: Complete database copy
 *    - Incremental Backup: Only changed data since last backup
 *    - Differential Backup: All changes since last full backup
 * 
 * 2. Recovery Models:
 *    - Simple Recovery: No log backups
 *    - Full Recovery: Complete point-in-time recovery
 *    - Bulk-Logged Recovery: Minimal logging for bulk operations
 * 
 * 3. Disaster Recovery:
 *    - RTO (Recovery Time Objective)
 *    - RPO (Recovery Point Objective)
 *    - High Availability (HA) solutions
 * 
 * Database Scalability:
 * ===================
 * 
 * 1. Vertical Scaling (Scale Up):
 *    - Increase resources on single machine
 *    - More CPU, RAM, storage
 *    - Limited by hardware constraints
 * 
 * 2. Horizontal Scaling (Scale Out):
 *    - Add more machines to distribute load
 *    - Sharding, replication, clustering
 *    - Better for high availability
 * 
 * 3. Read Replicas:
 *    - Copy of database for read operations
 *    - Reduce load on primary database
 *    - Geographic distribution
 * 
 * 4. Sharding:
 *    - Partition data across multiple databases
 *    - Horizontal partitioning strategy
 *    - Improved performance and scalability
 * 
 * Database Trends:
 * ===============
 * 
 * 1. Cloud Databases:
 *    - Managed database services
 *    - Auto-scaling and maintenance
 *    - Examples: AWS RDS, Azure SQL, Google Cloud SQL
 * 
 * 2. Multi-Model Databases:
 *    - Support multiple data models
 *    - Flexibility for different use cases
 *    - Examples: ArangoDB, OrientDB
 * 
 * 3. NewSQL:
 *    - Combines benefits of SQL and NoSQL
 *    - ACID compliance with scalability
 *    - Examples: CockroachDB, TiDB
 * 
 * 4. Edge Databases:
 *    - Databases at the edge of network
 *    - Low latency for IoT and mobile
 *    - Examples: SQLite, PouchDB
 * 
 * Common Database Use Cases:
 * ========================
 * 
 * 1. Online Transaction Processing (OLTP):
 *    - Real-time transaction processing
 *    - ACID compliance required
 *    - Examples: Banking, e-commerce, inventory
 * 
 * 2. Online Analytical Processing (OLAP):
 *    - Complex analytical queries
 *    - Data warehousing and reporting
 *    - Examples: Business intelligence, data mining
 * 
 * 3. Content Management:
 *    - Store and manage digital content
 *    - Version control and metadata
 *    - Examples: CMS, document management
 * 
 * 4. Real-time Analytics:
 *    - Stream processing and analytics
 *    - Low-latency data processing
 *    - Examples: IoT, monitoring, fraud detection
 * 
 * Database Selection Criteria:
 * ==========================
 * 
 * 1. Data Type and Structure:
 *    - Structured vs unstructured data
 *    - Schema flexibility requirements
 *    - Data relationships complexity
 * 
 * 2. Performance Requirements:
 *    - Read vs write ratio
 *    - Query complexity
 *    - Latency requirements
 * 
 * 3. Scalability Needs:
 *    - Expected data growth
 *    - Concurrent user load
 *    - Geographic distribution
 * 
 * 4. Consistency Requirements:
 *    - ACID compliance needs
 *    - Eventual consistency tolerance
 *    - Data integrity requirements
 * 
 * 5. Cost Considerations:
 *    - Licensing and operational costs
 *    - Hardware requirements
 *    - Maintenance overhead
 * 
 * Interview Tips:
 * =============
 * 
 * 1. Understand the Basics:
 *    - ACID properties and their importance
 *    - Different types of databases and their use cases
 *    - Normalization and denormalization concepts
 * 
 * 2. Know Your Database:
 *    - Be familiar with at least one RDBMS and one NoSQL database
 *    - Understand their strengths and limitations
 *    - Know how to write basic queries
 * 
 * 3. Performance Optimization:
 *    - Indexing strategies
 *    - Query optimization techniques
 *    - Database design best practices
 * 
 * 4. Scalability and Availability:
 *    - Replication and sharding strategies
 *    - High availability solutions
 *    - Disaster recovery planning
 * 
 * 5. Security and Compliance:
 *    - Authentication and authorization
 *    - Data encryption and privacy
 *    - Audit and compliance requirements
 */

import java.util.*;

// Database Types Enumeration
enum DatabaseType {
    RELATIONAL("RDBMS", "Structured data, ACID compliance, SQL queries"),
    NOSQL("NoSQL", "Unstructured data, flexible schema, high scalability"),
    OBJECT_ORIENTED("OODBMS", "Complex objects, object-oriented integration"),
    HIERARCHICAL("Hierarchical", "Tree-like structure, parent-child relationships"),
    NETWORK("Network", "Graph-like structure, many-to-many relationships"),
    COLUMNAR("Columnar", "Column-based storage, optimized for analytics"),
    TIME_SERIES("Time-Series", "Time-stamped data, IoT and monitoring"),
    GRAPH("Graph", "Relationship-focused, social networks, recommendations");
    
    private final String fullName;
    private final String description;
    
    DatabaseType(String fullName, String description) {
        this.fullName = fullName;
        this.description = description;
    }
    
    public String getFullName() { return fullName; }
    public String getDescription() { return description; }
}

// ACID Properties Class
class ACIDProperties {
    private boolean atomicity;
    private boolean consistency;
    private boolean isolation;
    private boolean durability;
    
    public ACIDProperties(boolean atomicity, boolean consistency, boolean isolation, boolean durability) {
        this.atomicity = atomicity;
        this.consistency = consistency;
        this.isolation = isolation;
        this.durability = durability;
    }
    
    public boolean isACIDCompliant() {
        return atomicity && consistency && isolation && durability;
    }
    
    // Getters
    public boolean isAtomicity() { return atomicity; }
    public boolean isConsistency() { return consistency; }
    public boolean isIsolation() { return isolation; }
    public boolean isDurability() { return durability; }
}

// Database System Class
class DatabaseSystem {
    private String name;
    private DatabaseType type;
    private ACIDProperties acidProperties;
    private List<String> features;
    private Map<String, String> useCases;
    
    public DatabaseSystem(String name, DatabaseType type, ACIDProperties acidProperties) {
        this.name = name;
        this.type = type;
        this.acidProperties = acidProperties;
        this.features = new ArrayList<>();
        this.useCases = new HashMap<>();
    }
    
    public void addFeature(String feature) {
        features.add(feature);
    }
    
    public void addUseCase(String useCase, String description) {
        useCases.put(useCase, description);
    }
    
    // Getters
    public String getName() { return name; }
    public DatabaseType getType() { return type; }
    public ACIDProperties getAcidProperties() { return acidProperties; }
    public List<String> getFeatures() { return features; }
    public Map<String, String> getUseCases() { return useCases; }
}

// Main DBMS Introduction Class
public class intro {
    private Map<String, DatabaseSystem> databaseSystems;
    
    public intro() {
        this.databaseSystems = new HashMap<>();
        initializeDatabaseSystems();
    }
    
    private void initializeDatabaseSystems() {
        // Relational Databases
        DatabaseSystem mysql = new DatabaseSystem("MySQL", DatabaseType.RELATIONAL, 
            new ACIDProperties(true, true, true, true));
        mysql.addFeature("ACID Compliance");
        mysql.addFeature("SQL Support");
        mysql.addFeature("Transaction Support");
        mysql.addUseCase("Web Applications", "Popular for web-based applications");
        mysql.addUseCase("E-commerce", "Handles transactions and user data");
        databaseSystems.put("MySQL", mysql);
        
        DatabaseSystem postgresql = new DatabaseSystem("PostgreSQL", DatabaseType.RELATIONAL,
            new ACIDProperties(true, true, true, true));
        postgresql.addFeature("Advanced SQL Features");
        postgresql.addFeature("JSON Support");
        postgresql.addFeature("Extensibility");
        postgresql.addUseCase("Complex Applications", "Advanced features for complex queries");
        postgresql.addUseCase("Data Warehousing", "Analytics and reporting");
        databaseSystems.put("PostgreSQL", postgresql);
        
        // NoSQL Databases
        DatabaseSystem mongodb = new DatabaseSystem("MongoDB", DatabaseType.NOSQL,
            new ACIDProperties(false, false, false, true));
        mongodb.addFeature("Document Storage");
        mongodb.addFeature("Flexible Schema");
        mongodb.addFeature("Horizontal Scaling");
        mongodb.addUseCase("Content Management", "Storing documents and content");
        mongodb.addUseCase("Real-time Analytics", "Fast data processing");
        databaseSystems.put("MongoDB", mongodb);
        
        DatabaseSystem redis = new DatabaseSystem("Redis", DatabaseType.NOSQL,
            new ACIDProperties(false, false, false, false));
        redis.addFeature("In-Memory Storage");
        redis.addFeature("High Performance");
        redis.addFeature("Data Structures");
        redis.addUseCase("Caching", "Session storage and caching");
        redis.addUseCase("Real-time Data", "Fast data access");
        databaseSystems.put("Redis", redis);
        
        // Graph Databases
        DatabaseSystem neo4j = new DatabaseSystem("Neo4j", DatabaseType.GRAPH,
            new ACIDProperties(true, true, true, true));
        neo4j.addFeature("Graph Storage");
        neo4j.addFeature("Relationship Queries");
        neo4j.addFeature("Cypher Query Language");
        neo4j.addUseCase("Social Networks", "User relationships and connections");
        neo4j.addUseCase("Recommendation Systems", "Complex relationship analysis");
        databaseSystems.put("Neo4j", neo4j);
    }
    
    public void demonstrateDatabaseTypes() {
        System.out.println("=== Database Management System Types ===\n");
        
        for (DatabaseType type : DatabaseType.values()) {
            System.out.println(type.name() + " (" + type.getFullName() + ")");
            System.out.println("Description: " + type.getDescription());
            System.out.println();
        }
    }
    
    public void demonstrateACIDProperties() {
        System.out.println("=== ACID Properties ===\n");
        
        System.out.println("1. Atomicity: All operations in a transaction succeed or fail together");
        System.out.println("   Example: Bank transfer - both debit and credit must succeed\n");
        
        System.out.println("2. Consistency: Database remains in valid state before and after transaction");
        System.out.println("   Example: Account balance cannot be negative\n");
        
        System.out.println("3. Isolation: Concurrent transactions don't interfere with each other");
        System.out.println("   Example: Two users can read data simultaneously\n");
        
        System.out.println("4. Durability: Committed transactions persist even after system failure");
        System.out.println("   Example: Transaction survives power failure\n");
    }
    
    public void demonstrateDatabaseSystems() {
        System.out.println("=== Popular Database Systems ===\n");
        
        for (DatabaseSystem system : databaseSystems.values()) {
            System.out.println("Database: " + system.getName());
            System.out.println("Type: " + system.getType().getFullName());
            System.out.println("ACID Compliant: " + system.getAcidProperties().isACIDCompliant());
            System.out.println("Features: " + String.join(", ", system.getFeatures()));
            System.out.println("Use Cases:");
            for (Map.Entry<String, String> useCase : system.getUseCases().entrySet()) {
                System.out.println("  - " + useCase.getKey() + ": " + useCase.getValue());
            }
            System.out.println();
        }
    }
    
    public void demonstrateSelectionCriteria() {
        System.out.println("=== Database Selection Criteria ===\n");
        
        System.out.println("1. Data Type and Structure:");
        System.out.println("   - Structured data → RDBMS");
        System.out.println("   - Unstructured data → NoSQL");
        System.out.println("   - Complex relationships → Graph DB");
        System.out.println();
        
        System.out.println("2. Performance Requirements:");
        System.out.println("   - High read/write ratio → Consider caching");
        System.out.println("   - Complex queries → RDBMS with proper indexing");
        System.out.println("   - Real-time analytics → Time-series or columnar DB");
        System.out.println();
        
        System.out.println("3. Scalability Needs:");
        System.out.println("   - Vertical scaling → RDBMS");
        System.out.println("   - Horizontal scaling → NoSQL");
        System.out.println("   - Geographic distribution → Cloud databases");
        System.out.println();
        
        System.out.println("4. Consistency Requirements:");
        System.out.println("   - Strong consistency → ACID-compliant RDBMS");
        System.out.println("   - Eventual consistency → NoSQL");
        System.out.println("   - Custom consistency → NewSQL");
        System.out.println();
    }
    
    public static void main(String[] args) {
        intro dbmsIntro = new intro();
        
        System.out.println("=== DBMS Introduction Demo ===\n");
        
        dbmsIntro.demonstrateDatabaseTypes();
        dbmsIntro.demonstrateACIDProperties();
        dbmsIntro.demonstrateDatabaseSystems();
        dbmsIntro.demonstrateSelectionCriteria();
        
        System.out.println("=== End of DBMS Introduction ===\n");
    }
} 