# Bias for Action

## Definition
**Speed matters. Many decisions are reversible. Value calculated risk taking.**

## STAR Pattern Examples

## 
Story: First-time Kafka implementation
S: When I joined, I was assigned a task to implement Kafka-based services, even though neither I nor anyone in the team had Kafka experience.
T: I needed to research, learn Kafka, and build both producer and consumer services quickly.
A: I studied Kafka in-depth, read official docs and tutorials, and built the services in under a week.
R: System handled 1000+ messages per minute reliably and became a base for further real-time features.


### Example 1: Production Incident Response
**Situation**: Database cluster experiencing 50% failure rate during peak traffic, with limited information about root cause
**Task**: Make quick decisions to restore service while investigating root cause
**Action**:
- Immediately implemented circuit breaker pattern to prevent cascading failures
- Made quick decision to scale up database read replicas to handle load
- Implemented emergency caching layer to reduce database pressure
- Started parallel investigation of root cause while maintaining service
- Made decision to rollback recent deployment that might have caused issues
**Result**: Restored service within 30 minutes, identified and fixed root cause, implemented preventive measures

### Example 2: Architecture Decision Under Uncertainty
**Situation**: Need to choose between microservices and monolith for new feature with unclear future requirements
**Task**: Make architecture decision with limited information and tight deadline
**Action**:
- Made quick decision to start with modular monolith approach
- Implemented clear service boundaries for future microservice migration
- Created feature flags for easy rollback if needed
- Established monitoring and metrics to validate decision
- Planned for gradual migration to microservices based on actual usage patterns
**Result**: Delivered feature on time, validated architecture decision through data, prepared for future scaling

### Example 3: Technology Stack Selection
**Situation**: Need to choose caching solution for high-traffic application with limited time for evaluation
**Task**: Select and implement caching solution quickly to meet performance requirements
**Action**:
- Made quick decision to use Redis based on team expertise and proven track record
- Implemented basic caching strategy with TTL and cache-aside pattern
- Set up monitoring and alerting for cache performance
- Created fallback mechanism for cache failures
- Planned for future optimization based on actual usage patterns
**Result**: Improved application performance by 60%, met deadline, established foundation for future optimizations

## Key Backend Focus Areas
- **Quick Decision Making**: Making informed decisions with limited information
- **Risk Assessment**: Evaluating trade-offs and potential impacts
- **Reversible Actions**: Implementing solutions that can be easily changed
- **Monitoring and Validation**: Using data to validate decisions
- **Iterative Improvement**: Making decisions that allow for future optimization

## Interview Tips
- Show ability to make decisions quickly with limited information
- Demonstrate understanding of reversible vs irreversible decisions
- Highlight use of data and monitoring to validate decisions
- Show willingness to take calculated risks
- Emphasize learning from decisions and iterating based on results 