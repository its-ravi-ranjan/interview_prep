import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Consumer;
import java.util.stream.Collectors;

/**
 * TIMELINE/FEED SERVICE - AMAZON INTERVIEW ESSENTIALS
 * 
 * 🎯 WHAT TO REMEMBER FOR INTERVIEWS:
 * 1. Fan-out: Write to all followers' feeds (write-heavy, read-fast)
 * 2. Pull: Read from followed users' posts (read-heavy, write-fast)
 * 3. Hybrid: Combine both approaches for optimal performance
 * 4. Denormalization: Store redundant data for faster reads
 * 5. Caching: Redis for hot feeds, CDN for media content
 * 
 * 🔑 KEY CONCEPTS:
 * ✅ Fan-out (Push Model):
 * - When user posts → immediately write to all followers' feeds
 * - Pros: Fast reads, real-time feeds, good for active users
 * - Cons: Write amplification, storage cost, complex for viral posts
 * - Best for: Social networks with moderate follower counts
 * 
 * ✅ Pull Model (Read Model):
 * - When user requests feed → fetch posts from followed users
 * - Pros: Simple writes, storage efficient, handles viral posts
 * - Cons: Slow reads, complex queries, not real-time
 * - Best for: Content platforms with high follower counts
 * 
 * ✅ Hybrid Approach:
 * - Fan-out for active users (≤1000 followers)
 * - Pull for celebrities/influencers (>1000 followers)
 * - Best of both worlds
 * 
 * 📊 SYSTEM COMPARISON:
 * Fan-out: ✅ Fast reads, ✅ Real-time, ✅ Simple queries, ❌ Write amplification
 * Pull: ✅ Simple writes, ✅ Storage efficient, ✅ Handles viral, ❌ Slow reads
 * Hybrid: ✅ Balanced approach, ✅ Scalable, ✅ Flexible, ❌ Complex logic
 * 
 * Real Examples:
 * 1. Twitter: Hybrid (fan-out for regular users, pull for celebrities)
 * 2. Instagram: Fan-out with feed generation
 * 3. Facebook: Fan-out with edge ranking
 * 4. LinkedIn: Pull model with feed ranking
 * 
 * Denormalization Strategies:
 * - Store user info in posts (username, avatar)
 * - Store engagement counts (likes, comments, shares)
 * - Store media URLs and metadata
 * - Store trending/hot indicators
 */

/**
 * DATABASE ARCHITECTURE - AMAZON INTERVIEW ESSENTIALS
 * 
 * 🎯 DATABASE CHOICES & REASONING:
 * 
 * 1. PRIMARY DATABASES:
 *    ✅ PostgreSQL/MySQL (SQL):
 *    - User profiles, relationships, authentication
 *    - ACID compliance for critical data
 *    - Complex queries for analytics
 *    - Why: Strong consistency for user data
 * 
 *    ✅ DynamoDB (NoSQL):
 *    - User feeds, posts, engagement data
 *    - Auto-scaling, global distribution
 *    - Why: High read/write throughput, flexible schema
 * 
 *    ✅ Redis (In-Memory):
 *    - Hot feeds, trending posts, session data
 *    - Sub-millisecond latency
 *    - Why: Fastest access for frequently accessed data
 * 
 * 2. SPECIALIZED DATABASES:
 *    ✅ S3 (Object Storage):
 *    - Media files (images, videos)
 *    - CDN integration
 *    - Why: Unlimited storage, cost-effective
 * 
 *    ✅ Elasticsearch:
 *    - Full-text search, content discovery
 *    - Advanced filtering and ranking
 *    - Why: Powerful search capabilities
 * 
 * 3. DATABASE PLACEMENT STRATEGY:
 *    ✅ Multi-Region: User data close to users
 *    ✅ Read Replicas: Distribute read load
 *    ✅ Sharding: Horizontal scaling
 *    ✅ Caching Layers: Reduce database load
 * 
 * 4. DATA CONSISTENCY TRADE-OFFS:
 *    ✅ Strong Consistency: User profiles, authentication
 *    ✅ Eventual Consistency: Feeds, engagement counts
 *    ✅ Read-Your-Writes: User's own posts
 * 
 * Real Examples:
 * - Twitter: MySQL + Redis + S3
 * - Instagram: PostgreSQL + Redis + S3
 * - Facebook: MySQL + Memcached + Haystack
 * - LinkedIn: MySQL + Voldemort + Espresso
 */

public class TimelineFeedService {
    
    // ==================== USER & POST MODELS ====================
    /**
     * USER & POST MODELS - CORE ENTITIES
     * 
     * Features:
     * - User profiles with follower/following relationships
     * - Posts with content, media, and engagement data
     * - Denormalized data for faster reads
     * - Engagement tracking (likes, comments, shares)
     */
    static class User {
        String userId;
        String username;
        String displayName;
        String avatarUrl;
        String bio;
        long createdAt;
        Set<String> followers;
        Set<String> following;
        int followerCount;
        int followingCount;
        boolean isCelebrity; // For hybrid approach
        
        public User(String userId, String username, String displayName) {
            this.userId = userId;
            this.username = username;
            this.displayName = displayName;
            this.followers = ConcurrentHashMap.newKeySet();
            this.following = ConcurrentHashMap.newKeySet();
            this.followerCount = 0;
            this.followingCount = 0;
            this.isCelebrity = false;
            this.createdAt = System.currentTimeMillis();
        }
        
        public void addFollower(String followerId) {
            if (followers.add(followerId)) {
                followerCount++;
                if (followerCount > 1000) {
                    isCelebrity = true; // Switch to pull model
                }
            }
        }
        
        public void removeFollower(String followerId) {
            if (followers.remove(followerId)) {
                followerCount--;
                if (followerCount <= 1000) {
                    isCelebrity = false; // Switch back to fan-out
                }
            }
        }
    }
    
    static class Post {
        String postId;
        String userId;
        String username; // Denormalized
        String displayName; // Denormalized
        String avatarUrl; // Denormalized
        String content;
        String mediaUrl;
        String mediaType;
        long createdAt;
        int likeCount;
        int commentCount;
        int shareCount;
        boolean isViral; // For viral post handling
        double engagementScore; // For ranking
        
        public Post(String userId, String content, String mediaUrl, String mediaType) {
            this.postId = generatePostId();
            this.userId = userId;
            this.content = content;
            this.mediaUrl = mediaUrl;
            this.mediaType = mediaType;
            this.createdAt = System.currentTimeMillis();
            this.likeCount = 0;
            this.commentCount = 0;
            this.shareCount = 0;
            this.isViral = false;
            this.engagementScore = 0.0;
        }
        
        private String generatePostId() {
            return "post_" + System.currentTimeMillis() + "_" + ThreadLocalRandom.current().nextInt(10000);
        }
        
        public void incrementLikes() {
            likeCount++;
            updateEngagementScore();
        }
        
        public void incrementComments() {
            commentCount++;
            updateEngagementScore();
        }
        
        public void incrementShares() {
            shareCount++;
            updateEngagementScore();
        }
        
        private void updateEngagementScore() {
            // Simple engagement scoring algorithm
            this.engagementScore = (likeCount * 1.0 + commentCount * 2.0 + shareCount * 3.0) / 
                                  (System.currentTimeMillis() - createdAt + 1);
            
            // Mark as viral if engagement is high
            if (engagementScore > 1000) {
                isViral = true;
            }
        }
    }
    
    // ==================== FAN-OUT MODEL ====================
    /**
     * FAN-OUT MODEL - PUSH TO ALL FOLLOWERS
     * 
     * How it works:
     * 1. User creates a post
     * 2. System immediately writes to all followers' feeds
     * 3. Followers see posts in real-time
     * 4. Good for users with moderate follower counts
     * 
     * Benefits:
     * - Fast reads (O(1) feed retrieval)
     * - Real-time updates
     * - Simple feed queries
     * 
     * Drawbacks:
     * - Write amplification
     * - Storage cost
     * - Complex for viral posts
     */
    static class FanOutService {
        private Map<String, List<FeedItem>> userFeeds = new ConcurrentHashMap<>();
        private Map<String, User> users = new ConcurrentHashMap<>();
        
        static class FeedItem {
            String postId;
            String userId;
            String username;
            String displayName;
            String avatarUrl;
            String content;
            String mediaUrl;
            String mediaType;
            long createdAt;
            int likeCount;
            int commentCount;
            int shareCount;
            double engagementScore;
            
            public FeedItem(Post post, User user) {
                this.postId = post.postId;
                this.userId = post.userId;
                this.username = user.username;
                this.displayName = user.displayName;
                this.avatarUrl = user.avatarUrl;
                this.content = post.content;
                this.mediaUrl = post.mediaUrl;
                this.mediaType = post.mediaType;
                this.createdAt = post.createdAt;
                this.likeCount = post.likeCount;
                this.commentCount = post.commentCount;
                this.shareCount = post.shareCount;
                this.engagementScore = post.engagementScore;
            }
        }
        
        public void createPost(String userId, String content, String mediaUrl, String mediaType) {
            User user = users.get(userId);
            if (user == null) return;
            
            Post post = new Post(userId, content, mediaUrl, mediaType);
            
            // Denormalize user data into post
            post.username = user.username;
            post.displayName = user.displayName;
            post.avatarUrl = user.avatarUrl;
            
            // Fan-out to all followers
            for (String followerId : user.followers) {
                FeedItem feedItem = new FeedItem(post, user);
                userFeeds.computeIfAbsent(followerId, k -> new ArrayList<>()).add(0, feedItem);
                
                // Keep only recent posts in memory (last 1000)
                List<FeedItem> feed = userFeeds.get(followerId);
                if (feed.size() > 1000) {
                    feed.remove(feed.size() - 1);
                }
            }
            
            System.out.println("Fan-out: Post created and pushed to " + user.followers.size() + " followers");
        }
        
        public List<FeedItem> getFeed(String userId, int limit) {
            List<FeedItem> feed = userFeeds.get(userId);
            if (feed == null) return new ArrayList<>();
            
            return feed.stream()
                .limit(limit)
                .collect(Collectors.toList());
        }
        
        public void addUser(User user) {
            users.put(user.userId, user);
        }
        
        public void followUser(String followerId, String followedId) {
            User followed = users.get(followedId);
            if (followed != null) {
                followed.addFollower(followerId);
            }
        }
    }
    
    // ==================== PULL MODEL ====================
    /**
     * PULL MODEL - FETCH ON DEMAND
     * 
     * How it works:
     * 1. User creates a post (stored in user's posts)
     * 2. When user requests feed, fetch from followed users
     * 3. Merge and sort posts by timestamp
     * 4. Good for users with high follower counts
     * 
     * Benefits:
     * - Simple writes (no fan-out)
     * - Storage efficient
     * - Handles viral posts well
     * 
     * Drawbacks:
     * - Slow reads (complex queries)
     * - Not real-time
     * - Complex caching
     */
    static class PullService {
        private Map<String, List<Post>> userPosts = new ConcurrentHashMap<>();
        private Map<String, User> users = new ConcurrentHashMap<>();
        private Map<String, List<FeedItem>> feedCache = new ConcurrentHashMap<>();
        
        static class FeedItem {
            String postId;
            String userId;
            String username;
            String displayName;
            String avatarUrl;
            String content;
            String mediaUrl;
            String mediaType;
            long createdAt;
            int likeCount;
            int commentCount;
            int shareCount;
            double engagementScore;
            
            public FeedItem(Post post, User user) {
                this.postId = post.postId;
                this.userId = post.userId;
                this.username = user.username;
                this.displayName = user.displayName;
                this.avatarUrl = user.avatarUrl;
                this.content = post.content;
                this.mediaUrl = post.mediaUrl;
                this.mediaType = post.mediaType;
                this.createdAt = post.createdAt;
                this.likeCount = post.likeCount;
                this.commentCount = post.commentCount;
                this.shareCount = post.shareCount;
                this.engagementScore = post.engagementScore;
            }
        }
        
        public void createPost(String userId, String content, String mediaUrl, String mediaType) {
            User user = users.get(userId);
            if (user == null) return;
            
            Post post = new Post(userId, content, mediaUrl, mediaType);
            
            // Denormalize user data
            post.username = user.username;
            post.displayName = user.displayName;
            post.avatarUrl = user.avatarUrl;
            
            // Store in user's posts
            userPosts.computeIfAbsent(userId, k -> new ArrayList<>()).add(0, post);
            
            // Invalidate feed cache for all followers
            for (String followerId : user.followers) {
                feedCache.remove(followerId);
            }
            
            System.out.println("Pull: Post created and stored for " + user.followers.size() + " followers to pull");
        }
        
        public List<FeedItem> getFeed(String userId, int limit) {
            // Check cache first
            List<FeedItem> cachedFeed = feedCache.get(userId);
            if (cachedFeed != null) {
                return cachedFeed.stream().limit(limit).collect(Collectors.toList());
            }
            
            User user = users.get(userId);
            if (user == null) return new ArrayList<>();
            
            // Pull posts from all followed users
            List<FeedItem> feed = new ArrayList<>();
            for (String followedId : user.following) {
                List<Post> posts = userPosts.get(followedId);
                if (posts != null) {
                    User followedUser = users.get(followedId);
                    for (Post post : posts) {
                        feed.add(new FeedItem(post, followedUser));
                    }
                }
            }
            
            // Sort by creation time (newest first)
            feed.sort((a, b) -> Long.compare(b.createdAt, a.createdAt));
            
            // Cache the result
            feedCache.put(userId, feed);
            
            return feed.stream().limit(limit).collect(Collectors.toList());
        }
        
        public void addUser(User user) {
            users.put(user.userId, user);
        }
        
        public void followUser(String followerId, String followedId) {
            User followed = users.get(followedId);
            if (followed != null) {
                followed.addFollower(followerId);
                // Invalidate cache
                feedCache.remove(followerId);
            }
        }
    }
    
    // ==================== HYBRID MODEL ====================
    /**
     * HYBRID MODEL - BEST OF BOTH WORLDS
     * 
     * How it works:
     * 1. Fan-out for regular users (≤1000 followers)
     * 2. Pull for celebrities/influencers (>1000 followers)
     * 3. Dynamic switching based on follower count
     * 4. Combines benefits of both approaches
     * 
     * Benefits:
     * - Balanced performance
     * - Handles both scenarios well
     * - Scalable approach
     * 
     * Drawbacks:
     * - Complex implementation
     * - Need to handle transitions
     */
    static class HybridService {
        private FanOutService fanOutService;
        private PullService pullService;
        private Map<String, User> users = new ConcurrentHashMap<>();
        private Map<String, List<FeedItem>> celebrityFeeds = new ConcurrentHashMap<>();
        
        static class FeedItem {
            String postId;
            String userId;
            String username;
            String displayName;
            String avatarUrl;
            String content;
            String mediaUrl;
            String mediaType;
            long createdAt;
            int likeCount;
            int commentCount;
            int shareCount;
            double engagementScore;
            String source; // "fanout" or "pull"
            
            public FeedItem(Post post, User user, String source) {
                this.postId = post.postId;
                this.userId = post.userId;
                this.username = user.username;
                this.displayName = user.displayName;
                this.avatarUrl = user.avatarUrl;
                this.content = post.content;
                this.mediaUrl = post.mediaUrl;
                this.mediaType = post.mediaType;
                this.createdAt = post.createdAt;
                this.likeCount = post.likeCount;
                this.commentCount = post.commentCount;
                this.shareCount = post.shareCount;
                this.engagementScore = post.engagementScore;
                this.source = source;
            }
        }
        
        public HybridService() {
            this.fanOutService = new FanOutService();
            this.pullService = new PullService();
        }
        
        public void createPost(String userId, String content, String mediaUrl, String mediaType) {
            User user = users.get(userId);
            if (user == null) return;
            
            Post post = new Post(userId, content, mediaUrl, mediaType);
            
            // Denormalize user data
            post.username = user.username;
            post.displayName = user.displayName;
            post.avatarUrl = user.avatarUrl;
            
            if (user.isCelebrity) {
                // Use pull model for celebrities
                pullService.createPost(userId, content, mediaUrl, mediaType);
                System.out.println("Hybrid: Celebrity post created using pull model");
            } else {
                // Use fan-out for regular users
                fanOutService.createPost(userId, content, mediaUrl, mediaType);
                System.out.println("Hybrid: Regular user post created using fan-out model");
            }
        }
        
        public List<FeedItem> getFeed(String userId, int limit) {
            User user = users.get(userId);
            if (user == null) return new ArrayList<>();
            
            List<FeedItem> feed = new ArrayList<>();
            
            // Get posts from regular users (fan-out)
            List<FanOutService.FeedItem> fanOutFeed = fanOutService.getFeed(userId, limit);
            for (FanOutService.FeedItem item : fanOutFeed) {
                feed.add(new FeedItem(createPostFromFeedItem(item), users.get(item.userId), "fanout"));
            }
            
            // Get posts from celebrities (pull)
            List<PullService.FeedItem> pullFeed = pullService.getFeed(userId, limit);
            for (PullService.FeedItem item : pullFeed) {
                feed.add(new FeedItem(createPostFromFeedItem(item), users.get(item.userId), "pull"));
            }
            
            // Sort by creation time
            feed.sort((a, b) -> Long.compare(b.createdAt, a.createdAt));
            
            return feed.stream().limit(limit).collect(Collectors.toList());
        }
        
        private Post createPostFromFeedItem(FanOutService.FeedItem item) {
            Post post = new Post(item.userId, item.content, item.mediaUrl, item.mediaType);
            post.postId = item.postId;
            post.createdAt = item.createdAt;
            post.likeCount = item.likeCount;
            post.commentCount = item.commentCount;
            post.shareCount = item.shareCount;
            post.engagementScore = item.engagementScore;
            return post;
        }
        
        private Post createPostFromFeedItem(PullService.FeedItem item) {
            Post post = new Post(item.userId, item.content, item.mediaUrl, item.mediaType);
            post.postId = item.postId;
            post.createdAt = item.createdAt;
            post.likeCount = item.likeCount;
            post.commentCount = item.commentCount;
            post.shareCount = item.shareCount;
            post.engagementScore = item.engagementScore;
            return post;
        }
        
        public void addUser(User user) {
            users.put(user.userId, user);
            fanOutService.addUser(user);
            pullService.addUser(user);
        }
        
        public void followUser(String followerId, String followedId) {
            User followed = users.get(followedId);
            if (followed != null) {
                followed.addFollower(followerId);
                fanOutService.followUser(followerId, followedId);
                pullService.followUser(followerId, followedId);
            }
        }
    }
    
    // ==================== DENORMALIZATION SERVICE ====================
    /**
     * DENORMALIZATION SERVICE - OPTIMIZE FOR READS
     * 
     * Strategies:
     * 1. Store user info in posts (username, avatar)
     * 2. Store engagement counts (likes, comments, shares)
     * 3. Store media URLs and metadata
     * 4. Store trending/hot indicators
     * 5. Store pre-computed rankings
     */
    static class DenormalizationService {
        private Map<String, Map<String, Object>> denormalizedPosts = new ConcurrentHashMap<>();
        
        public void denormalizePost(Post post, User user) {
            Map<String, Object> denormalized = new HashMap<>();
            denormalized.put("postId", post.postId);
            denormalized.put("userId", post.userId);
            denormalized.put("username", user.username);
            denormalized.put("displayName", user.displayName);
            denormalized.put("avatarUrl", user.avatarUrl);
            denormalized.put("content", post.content);
            denormalized.put("mediaUrl", post.mediaUrl);
            denormalized.put("mediaType", post.mediaType);
            denormalized.put("createdAt", post.createdAt);
            denormalized.put("likeCount", post.likeCount);
            denormalized.put("commentCount", post.commentCount);
            denormalized.put("shareCount", post.shareCount);
            denormalized.put("engagementScore", post.engagementScore);
            denormalized.put("isViral", post.isViral);
            denormalized.put("trendingScore", calculateTrendingScore(post));
            
            denormalizedPosts.put(post.postId, denormalized);
        }
        
        private double calculateTrendingScore(Post post) {
            // Simple trending score based on engagement and recency
            long ageInHours = (System.currentTimeMillis() - post.createdAt) / (1000 * 60 * 60);
            return post.engagementScore / (ageInHours + 1);
        }
        
        public Map<String, Object> getDenormalizedPost(String postId) {
            return denormalizedPosts.get(postId);
        }
        
        public void updateEngagement(String postId, int likes, int comments, int shares) {
            Map<String, Object> post = denormalizedPosts.get(postId);
            if (post != null) {
                post.put("likeCount", likes);
                post.put("commentCount", comments);
                post.put("shareCount", shares);
                post.put("engagementScore", (likes * 1.0 + comments * 2.0 + shares * 3.0));
            }
        }
    }
    
    // ==================== CACHING SERVICE ====================
    /**
     * CACHING SERVICE - REDIS INTEGRATION
     * 
     * Features:
     * - Cache hot feeds in Redis
     * - Cache trending posts
     * - Cache user relationships
     * - Cache engagement data
     * - TTL for cache expiration
     */
    static class CachingService {
        private Map<String, Object> cache = new ConcurrentHashMap<>();
        private Map<String, Long> cacheTimestamps = new ConcurrentHashMap<>();
        private static final long CACHE_TTL = 300000; // 5 minutes
        
        public void cacheFeed(String userId, List<?> feed) {
            String key = "feed:" + userId;
            cache.put(key, feed);
            cacheTimestamps.put(key, System.currentTimeMillis());
        }
        
        public List<?> getCachedFeed(String userId) {
            String key = "feed:" + userId;
            Long timestamp = cacheTimestamps.get(key);
            
            if (timestamp != null && System.currentTimeMillis() - timestamp < CACHE_TTL) {
                return (List<?>) cache.get(key);
            }
            
            // Cache expired, remove it
            cache.remove(key);
            cacheTimestamps.remove(key);
            return null;
        }
        
        public void cacheTrendingPosts(List<?> trendingPosts) {
            cache.put("trending", trendingPosts);
            cacheTimestamps.put("trending", System.currentTimeMillis());
        }
        
        public List<?> getTrendingPosts() {
            Long timestamp = cacheTimestamps.get("trending");
            if (timestamp != null && System.currentTimeMillis() - timestamp < CACHE_TTL) {
                return (List<?>) cache.get("trending");
            }
            return null;
        }
        
        public void invalidateUserCache(String userId) {
            cache.remove("feed:" + userId);
            cacheTimestamps.remove("feed:" + userId);
        }
    }
    
    // ==================== DATABASE SERVICE ====================
    /**
     * DATABASE SERVICE - MULTI-DATABASE ARCHITECTURE
     * 
     * Database Strategy:
     * 1. PostgreSQL: User data, relationships, authentication
     * 2. DynamoDB: Feeds, posts, engagement data
     * 3. Redis: Hot feeds, trending posts, sessions
     * 4. S3: Media files, CDN integration
     * 5. Elasticsearch: Search and discovery
     */
    static class DatabaseService {
        private Map<String, User> userDatabase = new ConcurrentHashMap<>(); // PostgreSQL simulation
        private Map<String, List<Post>> postDatabase = new ConcurrentHashMap<>(); // DynamoDB simulation
        private Map<String, List<FeedItem>> feedDatabase = new ConcurrentHashMap<>(); // DynamoDB simulation
        private Map<String, Object> cacheDatabase = new ConcurrentHashMap<>(); // Redis simulation
        private Map<String, byte[]> mediaDatabase = new ConcurrentHashMap<>(); // S3 simulation
        private Map<String, List<Post>> searchDatabase = new ConcurrentHashMap<>(); // Elasticsearch simulation
        
        // ==================== USER DATABASE (PostgreSQL) ====================
        /**
         * USER DATABASE - POSTGRESQL
         * 
         * Tables:
         * - users (id, username, email, profile_data)
         * - followers (follower_id, followed_id, created_at)
         * - user_sessions (user_id, session_token, expires_at)
         * 
         * Why PostgreSQL:
         * - ACID compliance for user data
         * - Complex queries for analytics
         * - Foreign key constraints
         * - JSON support for flexible profile data
         */
        public void saveUser(User user) {
            userDatabase.put(user.userId, user);
            System.out.println("PostgreSQL: User saved - " + user.username);
        }
        
        public User getUser(String userId) {
            return userDatabase.get(userId);
        }
        
        public void saveFollowerRelationship(String followerId, String followedId) {
            // Simulate PostgreSQL join table
            User followed = userDatabase.get(followedId);
            if (followed != null) {
                followed.addFollower(followerId);
            }
        }
        
        // ==================== POST DATABASE (DynamoDB) ====================
        /**
         * POST DATABASE - DYNAMODB
         * 
         * Tables:
         * - posts (PK: user_id, SK: post_id, content, media_url, created_at)
         * - feeds (PK: user_id, SK: timestamp, post_data)
         * - engagement (PK: post_id, SK: user_id, action_type)
         * 
         * Why DynamoDB:
         * - Auto-scaling for high throughput
         * - Global distribution
         * - Flexible schema for different post types
         * - Built-in TTL for old posts
         */
        public void savePost(Post post) {
            if (!postDatabase.containsKey(post.userId)) {
                postDatabase.put(post.userId, new ArrayList<>());
            }
            postDatabase.get(post.userId).add(0, post);
            System.out.println("DynamoDB: Post saved - " + post.postId);
        }
        
        public List<Post> getUserPosts(String userId, int limit) {
            List<Post> posts = postDatabase.get(userId);
            if (posts == null) return new ArrayList<>();
            return posts.stream().limit(limit).collect(Collectors.toList());
        }
        
        public void saveFeed(String userId, List<FeedItem> feed) {
            feedDatabase.put(userId, feed);
            System.out.println("DynamoDB: Feed saved for user - " + userId);
        }
        
        public List<FeedItem> getUserFeed(String userId) {
            return feedDatabase.getOrDefault(userId, new ArrayList<>());
        }
        
        // ==================== CACHE DATABASE (Redis) ====================
        /**
         * CACHE DATABASE - REDIS
         * 
         * Keys:
         * - user:feed:{user_id} -> List of feed items
         * - trending:posts -> List of trending posts
         * - user:session:{user_id} -> Session data
         * - post:engagement:{post_id} -> Engagement counts
         * 
         * Why Redis:
         * - Sub-millisecond latency
         * - In-memory storage for hot data
         * - Built-in data structures (lists, sets, sorted sets)
         * - Pub/sub for real-time features
         */
        public void cacheFeed(String userId, List<FeedItem> feed) {
            cacheDatabase.put("feed:" + userId, feed);
            System.out.println("Redis: Feed cached for user - " + userId);
        }
        
        public List<FeedItem> getCachedFeed(String userId) {
            return (List<FeedItem>) cacheDatabase.get("feed:" + userId);
        }
        
        public void cacheTrendingPosts(List<Post> trendingPosts) {
            cacheDatabase.put("trending:posts", trendingPosts);
            System.out.println("Redis: Trending posts cached");
        }
        
        public List<Post> getTrendingPosts() {
            return (List<Post>) cacheDatabase.get("trending:posts");
        }
        
        // ==================== MEDIA DATABASE (S3) ====================
        /**
         * MEDIA DATABASE - S3
         * 
         * Buckets:
         * - user-media/{user_id}/{post_id}/{filename}
         * - profile-pictures/{user_id}/{filename}
         * - thumbnails/{post_id}/{size}/{filename}
         * 
         * Why S3:
         * - Unlimited storage
         * - Cost-effective for large files
         * - CDN integration (CloudFront)
         * - Versioning and lifecycle policies
         */
        public void saveMedia(String postId, String mediaUrl, byte[] mediaData) {
            mediaDatabase.put("media:" + postId, mediaData);
            System.out.println("S3: Media saved - " + mediaUrl);
        }
        
        public byte[] getMedia(String postId) {
            return mediaDatabase.get("media:" + postId);
        }
        
        public String generateMediaUrl(String postId, String mediaType) {
            return "https://s3.amazonaws.com/user-media/" + postId + "." + mediaType;
        }
        
        // ==================== SEARCH DATABASE (Elasticsearch) ====================
        /**
         * SEARCH DATABASE - ELASTICSEARCH
         * 
         * Indices:
         * - posts (content, hashtags, location, timestamp)
         * - users (username, bio, location)
         * - trending (engagement_score, timestamp)
         * 
         * Why Elasticsearch:
         * - Full-text search capabilities
         * - Advanced filtering and aggregation
         * - Real-time search suggestions
         * - Scalable search infrastructure
         */
        public void indexPost(Post post) {
            if (!searchDatabase.containsKey("posts")) {
                searchDatabase.put("posts", new ArrayList<>());
            }
            searchDatabase.get("posts").add(post);
            System.out.println("Elasticsearch: Post indexed - " + post.postId);
        }
        
        public List<Post> searchPosts(String query) {
            List<Post> posts = searchDatabase.get("posts");
            if (posts == null) return new ArrayList<>();
            
            // Simple search simulation
            return posts.stream()
                .filter(post -> post.content.toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
        }
        
        public List<Post> getTrendingPostsByEngagement() {
            List<Post> posts = searchDatabase.get("posts");
            if (posts == null) return new ArrayList<>();
            
            return posts.stream()
                .sorted((a, b) -> Double.compare(b.engagementScore, a.engagementScore))
                .limit(10)
                .collect(Collectors.toList());
        }
    }
    
    // ==================== DATABASE CONSISTENCY SERVICE ====================
    /**
     * DATABASE CONSISTENCY SERVICE - HANDLE CONSISTENCY TRADE-OFFS
     * 
     * Consistency Levels:
     * 1. Strong Consistency: User data, authentication
     * 2. Eventual Consistency: Feeds, engagement counts
     * 3. Read-Your-Writes: User's own posts
     * 4. Causal Consistency: Related posts and comments
     */
    static class ConsistencyService {
        private DatabaseService databaseService;
        private Map<String, Long> lastWriteTimestamps = new ConcurrentHashMap<>();
        
        public ConsistencyService(DatabaseService databaseService) {
            this.databaseService = databaseService;
        }
        
        // Strong Consistency for User Data
        public void saveUserWithStrongConsistency(User user) {
            databaseService.saveUser(user);
            lastWriteTimestamps.put("user:" + user.userId, System.currentTimeMillis());
            System.out.println("Strong Consistency: User data saved");
        }
        
        // Eventual Consistency for Feeds
        public void saveFeedWithEventualConsistency(String userId, List<FeedItem> feed) {
            // Async write for eventual consistency
            CompletableFuture.runAsync(() -> {
                databaseService.saveFeed(userId, feed);
                System.out.println("Eventual Consistency: Feed will be consistent soon");
            });
        }
        
        // Read-Your-Writes for User Posts
        public List<Post> getUserPostsWithReadYourWrites(String userId) {
            // Check if we have recent writes
            Long lastWrite = lastWriteTimestamps.get("user:" + userId);
            if (lastWrite != null && System.currentTimeMillis() - lastWrite < 5000) {
                // Read from primary database for recent writes
                return databaseService.getUserPosts(userId, 100);
            } else {
                // Read from cache or replica
                return databaseService.getUserPosts(userId, 100);
            }
        }
        
        // Causal Consistency for Related Data
        public void savePostWithCausalConsistency(Post post, User user) {
            // Save post first
            databaseService.savePost(post);
            
            // Then update related data (feed, search index)
            CompletableFuture.runAsync(() -> {
                databaseService.indexPost(post);
                System.out.println("Causal Consistency: Related data updated");
            });
        }
    }
    
    // ==================== DATABASE SCALING SERVICE ====================
    /**
     * DATABASE SCALING SERVICE - HANDLE SCALING CHALLENGES
     * 
     * Scaling Strategies:
     * 1. Read Replicas: Distribute read load
     * 2. Sharding: Horizontal scaling
     * 3. Caching: Reduce database load
     * 4. CDN: Distribute media content
     */
    static class ScalingService {
        private DatabaseService primaryDatabase;
        private List<DatabaseService> readReplicas = new ArrayList<>();
        private Map<String, DatabaseService> shardMap = new ConcurrentHashMap<>();
        
        public ScalingService() {
            this.primaryDatabase = new DatabaseService();
            // Simulate read replicas
            for (int i = 0; i < 3; i++) {
                readReplicas.add(new DatabaseService());
            }
        }
        
        // Read Replicas
        public User getUserFromReplica(String userId) {
            // Round-robin load balancing
            int replicaIndex = (int) (System.currentTimeMillis() % readReplicas.size());
            return readReplicas.get(replicaIndex).getUser(userId);
        }
        
        // Sharding by User ID
        public DatabaseService getShardForUser(String userId) {
            int shardIndex = Math.abs(userId.hashCode()) % 4; // 4 shards
            return shardMap.computeIfAbsent("shard_" + shardIndex, k -> new DatabaseService());
        }
        
        // Cache-Aside Pattern
        public List<FeedItem> getFeedWithCacheAside(String userId) {
            // Check cache first
            List<FeedItem> cachedFeed = primaryDatabase.getCachedFeed(userId);
            if (cachedFeed != null) {
                return cachedFeed;
            }
            
            // Cache miss - get from database
            List<FeedItem> feed = primaryDatabase.getUserFeed(userId);
            
            // Update cache
            primaryDatabase.cacheFeed(userId, feed);
            
            return feed;
        }
    }
    
    // ==================== MAIN TIMELINE SERVICE ====================
    static class TimelineService {
        private HybridService hybridService;
        private DenormalizationService denormalizationService;
        private CachingService cachingService;
        private Map<String, User> users = new ConcurrentHashMap<>();
        
        public TimelineService() {
            this.hybridService = new HybridService();
            this.denormalizationService = new DenormalizationService();
            this.cachingService = new CachingService();
        }
        
        public void createPost(String userId, String content, String mediaUrl, String mediaType) {
            User user = users.get(userId);
            if (user == null) return;
            
            Post post = new Post(userId, content, mediaUrl, mediaType);
            
            // Denormalize the post
            denormalizationService.denormalizePost(post, user);
            
            // Create post using hybrid approach
            hybridService.createPost(userId, content, mediaUrl, mediaType);
            
            // Invalidate caches
            for (String followerId : user.followers) {
                cachingService.invalidateUserCache(followerId);
            }
        }
        
        public List<Object> getFeed(String userId, int limit) {
            // Check cache first
            List<?> cachedFeed = cachingService.getCachedFeed(userId);
            if (cachedFeed != null) {
                return cachedFeed.stream().limit(limit).collect(Collectors.toList());
            }
            
            // Get feed from hybrid service
            List<HybridService.FeedItem> feed = hybridService.getFeed(userId, limit);
            
            // Cache the result
            cachingService.cacheFeed(userId, feed);
            
            return feed.stream().limit(limit).collect(Collectors.toList());
        }
        
        public void addUser(User user) {
            users.put(user.userId, user);
            hybridService.addUser(user);
        }
        
        public void followUser(String followerId, String followedId) {
            hybridService.followUser(followerId, followedId);
            cachingService.invalidateUserCache(followerId);
        }
        
        public void likePost(String userId, String postId) {
            // Update engagement in denormalized data
            Map<String, Object> post = denormalizationService.getDenormalizedPost(postId);
            if (post != null) {
                int likes = (Integer) post.get("likeCount") + 1;
                int comments = (Integer) post.get("commentCount");
                int shares = (Integer) post.get("shareCount");
                denormalizationService.updateEngagement(postId, likes, comments, shares);
            }
        }
    }
    
    // ==================== TESTING ====================
    public static void main(String[] args) {
        System.out.println("🚀 TIMELINE/FEED SERVICE - AMAZON INTERVIEW DEMO\n");
        
        TimelineService timelineService = new TimelineService();
        
        // Create users
        User alice = new User("user_1", "alice", "Alice Johnson");
        User bob = new User("user_2", "bob", "Bob Smith");
        User charlie = new User("user_3", "charlie", "Charlie Brown");
        User celebrity = new User("user_4", "celebrity", "Famous Person");
        celebrity.followerCount = 5000; // Will use pull model
        celebrity.isCelebrity = true;
        
        timelineService.addUser(alice);
        timelineService.addUser(bob);
        timelineService.addUser(charlie);
        timelineService.addUser(celebrity);
        
        // Set up following relationships
        timelineService.followUser(bob.userId, alice.userId);
        timelineService.followUser(charlie.userId, alice.userId);
        timelineService.followUser(bob.userId, celebrity.userId);
        timelineService.followUser(charlie.userId, celebrity.userId);
        
        // Create posts
        timelineService.createPost(alice.userId, "Hello world!", null, "text");
        timelineService.createPost(celebrity.userId, "Check out my new movie!", "movie.jpg", "image");
        timelineService.createPost(bob.userId, "Great weather today!", null, "text");
        
        // Get feeds
        System.out.println("\n=== BOB'S FEED ===");
        List<Object> bobFeed = timelineService.getFeed(bob.userId, 10);
        for (Object item : bobFeed) {
            System.out.println("Post: " + item);
        }
        
        System.out.println("\n=== CHARLIE'S FEED ===");
        List<Object> charlieFeed = timelineService.getFeed(charlie.userId, 10);
        for (Object item : charlieFeed) {
            System.out.println("Post: " + item);
        }
        
        // Test engagement
        timelineService.likePost(bob.userId, alice.postId);
        
        // Interview tips
        System.out.println("\n🎯 AMAZON INTERVIEW TIPS:");
        System.out.println("1. Start with fan-out for simple implementation");
        System.out.println("2. Use pull model for high-follower users");
        System.out.println("3. Implement hybrid approach for best performance");
        System.out.println("4. Denormalize data for faster reads");
        System.out.println("5. Use Redis caching for hot feeds");
        System.out.println("6. Consider write amplification and storage costs");
        System.out.println("7. Plan for viral posts and edge cases");
        System.out.println("8. Discuss monitoring and performance metrics");
    }
} 