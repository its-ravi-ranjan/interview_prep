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

// Database Types Enumeration
const DatabaseType = {
    RELATIONAL: { name: "RDBMS", description: "Structured data, ACID compliance, SQL queries" },
    NOSQL: { name: "NoSQL", description: "Unstructured data, flexible schema, high scalability" },
    OBJECT_ORIENTED: { name: "OODBMS", description: "Complex objects, object-oriented integration" },
    HIERARCHICAL: { name: "Hierarchical", description: "Tree-like structure, parent-child relationships" },
    NETWORK: { name: "Network", description: "Graph-like structure, many-to-many relationships" },
    COLUMNAR: { name: "Columnar", description: "Column-based storage, optimized for analytics" },
    TIME_SERIES: { name: "Time-Series", description: "Time-stamped data, IoT and monitoring" },
    GRAPH: { name: "Graph", description: "Relationship-focused, social networks, recommendations" }
};

// ACID Properties Class
class ACIDProperties {
    constructor(atomicity, consistency, isolation, durability) {
        this.atomicity = atomicity;
        this.consistency = consistency;
        this.isolation = isolation;
        this.durability = durability;
    }
    
    isACIDCompliant() {
        return this.atomicity && this.consistency && this.isolation && this.durability;
    }
}

// Database System Class
class DatabaseSystem {
    constructor(name, type, acidProperties) {
        this.name = name;
        this.type = type;
        this.acidProperties = acidProperties;
        this.features = [];
        this.useCases = new Map();
    }
    
    addFeature(feature) {
        this.features.push(feature);
    }
    
    addUseCase(useCase, description) {
        this.useCases.set(useCase, description);
    }
}

// Main DBMS Introduction Class
class Intro {
    constructor() {
        this.databaseSystems = new Map();
        this.initializeDatabaseSystems();
    }
    
    initializeDatabaseSystems() {
        // Relational Databases
        const mysql = new DatabaseSystem("MySQL", DatabaseType.RELATIONAL, 
            new ACIDProperties(true, true, true, true));
        mysql.addFeature("ACID Compliance");
        mysql.addFeature("SQL Support");
        mysql.addFeature("Transaction Support");
        mysql.addUseCase("Web Applications", "Popular for web-based applications");
        mysql.addUseCase("E-commerce", "Handles transactions and user data");
        this.databaseSystems.set("MySQL", mysql);
        
        const postgresql = new DatabaseSystem("PostgreSQL", DatabaseType.RELATIONAL,
            new ACIDProperties(true, true, true, true));
        postgresql.addFeature("Advanced SQL Features");
        postgresql.addFeature("JSON Support");
        postgresql.addFeature("Extensibility");
        postgresql.addUseCase("Complex Applications", "Advanced features for complex queries");
        postgresql.addUseCase("Data Warehousing", "Analytics and reporting");
        this.databaseSystems.set("PostgreSQL", postgresql);
        
        // NoSQL Databases
        const mongodb = new DatabaseSystem("MongoDB", DatabaseType.NOSQL,
            new ACIDProperties(false, false, false, true));
        mongodb.addFeature("Document Storage");
        mongodb.addFeature("Flexible Schema");
        mongodb.addFeature("Horizontal Scaling");
        mongodb.addUseCase("Content Management", "Storing documents and content");
        mongodb.addUseCase("Real-time Analytics", "Fast data processing");
        this.databaseSystems.set("MongoDB", mongodb);
        
        const redis = new DatabaseSystem("Redis", DatabaseType.NOSQL,
            new ACIDProperties(false, false, false, false));
        redis.addFeature("In-Memory Storage");
        redis.addFeature("High Performance");
        redis.addFeature("Data Structures");
        redis.addUseCase("Caching", "Session storage and caching");
        redis.addUseCase("Real-time Data", "Fast data access");
        this.databaseSystems.set("Redis", redis);
        
        // Graph Databases
        const neo4j = new DatabaseSystem("Neo4j", DatabaseType.GRAPH,
            new ACIDProperties(true, true, true, true));
        neo4j.addFeature("Graph Storage");
        neo4j.addFeature("Relationship Queries");
        neo4j.addFeature("Cypher Query Language");
        neo4j.addUseCase("Social Networks", "User relationships and connections");
        neo4j.addUseCase("Recommendation Systems", "Complex relationship analysis");
        this.databaseSystems.set("Neo4j", neo4j);
    }
    
    demonstrateDatabaseTypes() {
        console.log("=== Database Management System Types ===\n");
        
        for (const [key, type] of Object.entries(DatabaseType)) {
            console.log(`${key} (${type.name})`);
            console.log(`Description: ${type.description}`);
            console.log();
        }
    }
    
    demonstrateACIDProperties() {
        console.log("=== ACID Properties ===\n");
        
        console.log("1. Atomicity: All operations in a transaction succeed or fail together");
        console.log("   Example: Bank transfer - both debit and credit must succeed\n");
        
        console.log("2. Consistency: Database remains in valid state before and after transaction");
        console.log("   Example: Account balance cannot be negative\n");
        
        console.log("3. Isolation: Concurrent transactions don't interfere with each other");
        console.log("   Example: Two users can read data simultaneously\n");
        
        console.log("4. Durability: Committed transactions persist even after system failure");
        console.log("   Example: Transaction survives power failure\n");
    }
    
    demonstrateDatabaseSystems() {
        console.log("=== Popular Database Systems ===\n");
        
        for (const system of this.databaseSystems.values()) {
            console.log(`Database: ${system.name}`);
            console.log(`Type: ${system.type.name}`);
            console.log(`ACID Compliant: ${system.acidProperties.isACIDCompliant()}`);
            console.log(`Features: ${system.features.join(", ")}`);
            console.log("Use Cases:");
            for (const [useCase, description] of system.useCases) {
                console.log(`  - ${useCase}: ${description}`);
            }
            console.log();
        }
    }
    
    demonstrateSelectionCriteria() {
        console.log("=== Database Selection Criteria ===\n");
        
        console.log("1. Data Type and Structure:");
        console.log("   - Structured data → RDBMS");
        console.log("   - Unstructured data → NoSQL");
        console.log("   - Complex relationships → Graph DB");
        console.log();
        
        console.log("2. Performance Requirements:");
        console.log("   - High read/write ratio → Consider caching");
        console.log("   - Complex queries → RDBMS with proper indexing");
        console.log("   - Real-time analytics → Time-series or columnar DB");
        console.log();
        
        console.log("3. Scalability Needs:");
        console.log("   - Vertical scaling → RDBMS");
        console.log("   - Horizontal scaling → NoSQL");
        console.log("   - Geographic distribution → Cloud databases");
        console.log();
        
        console.log("4. Consistency Requirements:");
        console.log("   - Strong consistency → ACID-compliant RDBMS");
        console.log("   - Eventual consistency → NoSQL");
        console.log("   - Custom consistency → NewSQL");
        console.log();
    }
    
    demonstrateDatabaseComparison() {
        console.log("=== Database Comparison Matrix ===\n");
        
        const comparisonData = [
            {
                database: "MySQL",
                type: "RDBMS",
                acid: "Yes",
                scalability: "Vertical",
                bestFor: "Web apps, e-commerce"
            },
            {
                database: "PostgreSQL",
                type: "RDBMS",
                acid: "Yes",
                scalability: "Vertical",
                bestFor: "Complex apps, analytics"
            },
            {
                database: "MongoDB",
                type: "NoSQL",
                acid: "Partial",
                scalability: "Horizontal",
                bestFor: "Content management, real-time"
            },
            {
                database: "Redis",
                type: "NoSQL",
                acid: "No",
                scalability: "Horizontal",
                bestFor: "Caching, session storage"
            },
            {
                database: "Neo4j",
                type: "Graph",
                acid: "Yes",
                scalability: "Horizontal",
                bestFor: "Social networks, recommendations"
            }
        ];
        
        console.log("Database\tType\t\tACID\tScalability\tBest For");
        console.log("--------\t----\t\t----\t----------\t--------");
        
        for (const data of comparisonData) {
            console.log(`${data.database}\t\t${data.type}\t\t${data.acid}\t${data.scalability}\t\t${data.bestFor}`);
        }
        console.log();
    }
    
    demonstrateUseCaseScenarios() {
        console.log("=== Use Case Scenarios ===\n");
        
        const scenarios = [
            {
                scenario: "E-commerce Platform",
                requirements: "ACID compliance, complex queries, transactions",
                recommendation: "MySQL or PostgreSQL",
                reason: "Need strong consistency for financial transactions"
            },
            {
                scenario: "Social Media App",
                requirements: "High scalability, flexible schema, real-time",
                recommendation: "MongoDB or Cassandra",
                reason: "Need to handle large amounts of unstructured data"
            },
            {
                scenario: "Recommendation Engine",
                requirements: "Complex relationships, graph queries",
                recommendation: "Neo4j or Amazon Neptune",
                reason: "Need to analyze complex user relationships"
            },
            {
                scenario: "Real-time Analytics",
                requirements: "Fast reads, time-series data",
                recommendation: "InfluxDB or TimescaleDB",
                reason: "Optimized for time-stamped data and analytics"
            },
            {
                scenario: "Session Management",
                requirements: "High performance, simple data structures",
                recommendation: "Redis",
                reason: "In-memory storage for fast access"
            }
        ];
        
        for (const scenario of scenarios) {
            console.log(`Scenario: ${scenario.scenario}`);
            console.log(`Requirements: ${scenario.requirements}`);
            console.log(`Recommendation: ${scenario.recommendation}`);
            console.log(`Reason: ${scenario.reason}`);
            console.log();
        }
    }
}

// Demo function to run the DBMS introduction
function runDBMSIntro() {
    const dbmsIntro = new Intro();
    
    console.log("=== DBMS Introduction Demo ===\n");
    
    dbmsIntro.demonstrateDatabaseTypes();
    dbmsIntro.demonstrateACIDProperties();
    dbmsIntro.demonstrateDatabaseSystems();
    dbmsIntro.demonstrateSelectionCriteria();
    dbmsIntro.demonstrateDatabaseComparison();
    dbmsIntro.demonstrateUseCaseScenarios();
    
    console.log("=== End of DBMS Introduction ===\n");
}

// Export for use in other modules or run directly
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Intro, runDBMSIntro, DatabaseType, ACIDProperties, DatabaseSystem };
} else {
    // Run demo if executed directly
    runDBMSIntro();
} 