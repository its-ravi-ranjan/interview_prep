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
 * 
 * 
 * How it works:
 * ✅ So What Do They Actually Do?
 * There are two main models:
 *  1. Push Model (Fan-out on write)
 * ➡️ Precompute and store feed entries per user.
 * When User A posts, the system pushes the post ID into the feed collection of all their followers.
 * Each user has a personal feed collection (e.g. user_feed:{user_id} in Redis or a DB).
 * 🟢 Fast feed reads (just read precomputed data)
 * 🔴 Expensive writes (need to push to 1M+ followers)

 * Instagram used to do this for celebrities with millions of followers using Kafka + Redis.
 * 
 * 2. Pull Model (Fan-out on read)
 * ➡️ Fetch feed data on demand by reading posts from people you follow.

 * When you open your feed, backend:
 * Fetches your follow list
 * 
 * Queries the posts table for latest posts by those users
 * Applies ranking, sorting, filters, etc.
 * 
 * 🟢 Cheap writes
 * 🔴 Slow reads at scale (needs optimization/caching)

 * 3. Hybrid Model (What most large systems do)
 * For users with few followers, use push model.
 * For users with millions of followers, use pull model or async batch push.
 * 
 * Example: If Messi posts something, Instagram doesn't push to 100M feeds immediately. Instead:
 * Save post to posts
 * Notify followers lazily or use pull feed on next login
 * 
 * 
 * 
 *                            ** complete flow **
 * 📲 User Opens App → Wants Feed
 * ✅ Step 1: Check Cache (Redis / MongoDB)
 * Check if precomputed feed (user_feed:{userId}) exists.
 * This feed contains a list of post IDs + ad placeholders.
 * Use Redis Sorted Set (for fast pagination by score/time).
 * If cache exists → Go to Step 4
 * Else → Go to Step 2
 * 
 * 🔄 Step 2: On-Demand Feed Generation (Pull Model)
 * Triggered for:
 *  New users
 * Cold users (no cached feed)
 * Feed expired (TTL over)

 * 2.1 Fetch Candidates:
 * Get recent posts from:
 * Friends
 * Followed pages
 * Groups
 * Own posts

 * 2.2 Filter:
 * Remove blocked users’ posts
 * Remove hidden/flagged content

 * 2.3 Rank:
 * ML-based ranking (engagement, recency, similarity)
 * Sort based on final score

 * 2.4 Insert Ads:
 * Call Ad service → get personalized ads for userId
 * Insert ads after every 5 organic posts (example)
 * Can use ad_slot_1, ad_slot_2 placeholders

 * 2.5 Store Feed:
 * Save final list of post IDs + ad slots to:
 * Redis Sorted Set (for quick retrieval & TTL)
 * Or MongoDB user_feed collection

 * 🚀 Step 3: User Requests Feed (Pagination / Scroll)
 * 3.1 Read Paginated Feed:
 * Fetch from user_feed:{userId} (Redis ZREVRANGE with cursor)
 * Returns post IDs: [post_123, post_234, ad_slot_1, post_456]

 * 3.2 Resolve IDs:
 * Use batch call to Post DB / Post Cache to fetch post content
 * For ads, call Ad Service to resolve ad_slot_1 → ad_987

 * 3.3 Return:
 * Combined response: Post + Ad + Post…

 * 🧼 Step 4: Old Feed Expiry / Cleanup
 * Redis TTL (e.g., 1 hour or 6 hours)
 * After that, feed is regenerated on next access

 * 🧠 Behind-the-Scenes: Post Creation = Fan-Out (Optional)
 * When someone creates a post:
 * If fan-out-on-write is enabled:
 * Push post ID to followers’ user_feed:{userId} lists

 * Do in background (Kafka or worker queue)
 * Else:
 * Pull-on-read model handles dynamically at feed request time
 */

class TimelineFeedService {
    
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
    static User = class {
        constructor(userId, username, displayName) {
            this.userId = userId;
            this.username = username;
            this.displayName = displayName;
            this.avatarUrl = null;
            this.bio = null;
            this.createdAt = Date.now();
            this.followers = new Set();
            this.following = new Set();
            this.followerCount = 0;
            this.followingCount = 0;
            this.isCelebrity = false; // For hybrid approach
        }
        
        addFollower(followerId) {
            if (this.followers.add(followerId)) {
                this.followerCount++;
                if (this.followerCount > 1000) {
                    this.isCelebrity = true; // Switch to pull model
                }
            }
        }
        
        removeFollower(followerId) {
            if (this.followers.delete(followerId)) {
                this.followerCount--;
                if (this.followerCount <= 1000) {
                    this.isCelebrity = false; // Switch back to fan-out
                }
            }
        }
    }
    
    static Post = class {
        constructor(userId, content, mediaUrl, mediaType) {
            this.postId = this.generatePostId();
            this.userId = userId;
            this.username = null; // Denormalized
            this.displayName = null; // Denormalized
            this.avatarUrl = null; // Denormalized
            this.content = content;
            this.mediaUrl = mediaUrl;
            this.mediaType = mediaType;
            this.createdAt = Date.now();
            this.likeCount = 0;
            this.commentCount = 0;
            this.shareCount = 0;
            this.isViral = false; // For viral post handling
            this.engagementScore = 0.0; // For ranking
        }
        
        generatePostId() {
            return 'post_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
        }
        
        incrementLikes() {
            this.likeCount++;
            this.updateEngagementScore();
        }
        
        incrementComments() {
            this.commentCount++;
            this.updateEngagementScore();
        }
        
        incrementShares() {
            this.shareCount++;
            this.updateEngagementScore();
        }
        
        updateEngagementScore() {
            // Simple engagement scoring algorithm
            this.engagementScore = (this.likeCount * 1.0 + this.commentCount * 2.0 + this.shareCount * 3.0) / 
                                  (Date.now() - this.createdAt + 1);
            
            // Mark as viral if engagement is high
            if (this.engagementScore > 1000) {
                this.isViral = true;
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
    static FanOutService = class {
        constructor() {
            this.userFeeds = new Map();
            this.users = new Map();
        }
        
        static FeedItem = class {
            constructor(post, user) {
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
        
        createPost(userId, content, mediaUrl, mediaType) {
            const user = this.users.get(userId);
            if (!user) return;
            
            const post = new TimelineFeedService.Post(userId, content, mediaUrl, mediaType);
            
            // Denormalize user data into post
            post.username = user.username;
            post.displayName = user.displayName;
            post.avatarUrl = user.avatarUrl;
            
            // Fan-out to all followers
            for (const followerId of user.followers) {
                const feedItem = new TimelineFeedService.FanOutService.FeedItem(post, user);
                if (!this.userFeeds.has(followerId)) {
                    this.userFeeds.set(followerId, []);
                }
                this.userFeeds.get(followerId).unshift(feedItem);
                
                // Keep only recent posts in memory (last 1000)
                const feed = this.userFeeds.get(followerId);
                if (feed.length > 1000) {
                    feed.pop();
                }
            }
            
            console.log('Fan-out: Post created and pushed to', user.followers.size, 'followers');
        }
        
        getFeed(userId, limit) {
            const feed = this.userFeeds.get(userId);
            if (!feed) return [];
            
            return feed.slice(0, limit);
        }
        
        addUser(user) {
            this.users.set(user.userId, user);
        }
        
        followUser(followerId, followedId) {
            const followed = this.users.get(followedId);
            if (followed) {
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
    static PullService = class {
        constructor() {
            this.userPosts = new Map();
            this.users = new Map();
            this.feedCache = new Map();
        }
        
        static FeedItem = class {
            constructor(post, user) {
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
        
        createPost(userId, content, mediaUrl, mediaType) {
            const user = this.users.get(userId);
            if (!user) return;
            
            const post = new TimelineFeedService.Post(userId, content, mediaUrl, mediaType);
            
            // Denormalize user data
            post.username = user.username;
            post.displayName = user.displayName;
            post.avatarUrl = user.avatarUrl;
            
            // Store in user's posts
            if (!this.userPosts.has(userId)) {
                this.userPosts.set(userId, []);
            }
            this.userPosts.get(userId).unshift(post);
            
            // Invalidate feed cache for all followers
            for (const followerId of user.followers) {
                this.feedCache.delete(followerId);
            }
            
            console.log('Pull: Post created and stored for', user.followers.size, 'followers to pull');
        }
        
        getFeed(userId, limit) {
            // Check cache first
            const cachedFeed = this.feedCache.get(userId);
            if (cachedFeed) {
                return cachedFeed.slice(0, limit);
            }
            
            const user = this.users.get(userId);
            if (!user) return [];
            
            // Pull posts from all followed users
            const feed = [];
            for (const followedId of user.following) {
                const posts = this.userPosts.get(followedId);
                if (posts) {
                    const followedUser = this.users.get(followedId);
                    for (const post of posts) {
                        feed.push(new TimelineFeedService.PullService.FeedItem(post, followedUser));
                    }
                }
            }
            
            // Sort by creation time (newest first)
            feed.sort((a, b) => b.createdAt - a.createdAt);
            
            // Cache the result
            this.feedCache.set(userId, feed);
            
            return feed.slice(0, limit);
        }
        
        addUser(user) {
            this.users.set(user.userId, user);
        }
        
        followUser(followerId, followedId) {
            const followed = this.users.get(followedId);
            if (followed) {
                followed.addFollower(followerId);
                // Invalidate cache
                this.feedCache.delete(followerId);
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
    static HybridService = class {
        constructor() {
            this.fanOutService = new TimelineFeedService.FanOutService();
            this.pullService = new TimelineFeedService.PullService();
            this.users = new Map();
            this.celebrityFeeds = new Map();
        }
        
        static FeedItem = class {
            constructor(post, user, source) {
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
                this.source = source; // "fanout" or "pull"
            }
        }
        
        createPost(userId, content, mediaUrl, mediaType) {
            const user = this.users.get(userId);
            if (!user) return;
            
            const post = new TimelineFeedService.Post(userId, content, mediaUrl, mediaType);
            
            // Denormalize user data
            post.username = user.username;
            post.displayName = user.displayName;
            post.avatarUrl = user.avatarUrl;
            
            if (user.isCelebrity) {
                // Use pull model for celebrities
                this.pullService.createPost(userId, content, mediaUrl, mediaType);
                console.log('Hybrid: Celebrity post created using pull model');
            } else {
                // Use fan-out for regular users
                this.fanOutService.createPost(userId, content, mediaUrl, mediaType);
                console.log('Hybrid: Regular user post created using fan-out model');
            }
        }
        
        getFeed(userId, limit) {
            const user = this.users.get(userId);
            if (!user) return [];
            
            const feed = [];
            
            // Get posts from regular users (fan-out)
            const fanOutFeed = this.fanOutService.getFeed(userId, limit);
            for (const item of fanOutFeed) {
                feed.push(new TimelineFeedService.HybridService.FeedItem(
                    this.createPostFromFeedItem(item), this.users.get(item.userId), 'fanout'
                ));
            }
            
            // Get posts from celebrities (pull)
            const pullFeed = this.pullService.getFeed(userId, limit);
            for (const item of pullFeed) {
                feed.push(new TimelineFeedService.HybridService.FeedItem(
                    this.createPostFromFeedItem(item), this.users.get(item.userId), 'pull'
                ));
            }
            
            // Sort by creation time
            feed.sort((a, b) => b.createdAt - a.createdAt);
            
            return feed.slice(0, limit);
        }
        
        createPostFromFeedItem(item) {
            const post = new TimelineFeedService.Post(item.userId, item.content, item.mediaUrl, item.mediaType);
            post.postId = item.postId;
            post.createdAt = item.createdAt;
            post.likeCount = item.likeCount;
            post.commentCount = item.commentCount;
            post.shareCount = item.shareCount;
            post.engagementScore = item.engagementScore;
            return post;
        }
        
        addUser(user) {
            this.users.set(user.userId, user);
            this.fanOutService.addUser(user);
            this.pullService.addUser(user);
        }
        
        followUser(followerId, followedId) {
            const followed = this.users.get(followedId);
            if (followed) {
                followed.addFollower(followerId);
                this.fanOutService.followUser(followerId, followedId);
                this.pullService.followUser(followerId, followedId);
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
    static DenormalizationService = class {
        constructor() {
            this.denormalizedPosts = new Map();
        }
        
        denormalizePost(post, user) {
            const denormalized = {
                postId: post.postId,
                userId: post.userId,
                username: user.username,
                displayName: user.displayName,
                avatarUrl: user.avatarUrl,
                content: post.content,
                mediaUrl: post.mediaUrl,
                mediaType: post.mediaType,
                createdAt: post.createdAt,
                likeCount: post.likeCount,
                commentCount: post.commentCount,
                shareCount: post.shareCount,
                engagementScore: post.engagementScore,
                isViral: post.isViral,
                trendingScore: this.calculateTrendingScore(post)
            };
            
            this.denormalizedPosts.set(post.postId, denormalized);
        }
        
        calculateTrendingScore(post) {
            // Simple trending score based on engagement and recency
            const ageInHours = (Date.now() - post.createdAt) / (1000 * 60 * 60);
            return post.engagementScore / (ageInHours + 1);
        }
        
        getDenormalizedPost(postId) {
            return this.denormalizedPosts.get(postId);
        }
        
        updateEngagement(postId, likes, comments, shares) {
            const post = this.denormalizedPosts.get(postId);
            if (post) {
                post.likeCount = likes;
                post.commentCount = comments;
                post.shareCount = shares;
                post.engagementScore = (likes * 1.0 + comments * 2.0 + shares * 3.0);
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
    static CachingService = class {
        constructor() {
            this.cache = new Map();
            this.cacheTimestamps = new Map();
            this.CACHE_TTL = 300000; // 5 minutes
        }
        
        cacheFeed(userId, feed) {
            const key = 'feed:' + userId;
            this.cache.set(key, feed);
            this.cacheTimestamps.set(key, Date.now());
        }
        
        getCachedFeed(userId) {
            const key = 'feed:' + userId;
            const timestamp = this.cacheTimestamps.get(key);
            
            if (timestamp && Date.now() - timestamp < this.CACHE_TTL) {
                return this.cache.get(key);
            }
            
            // Cache expired, remove it
            this.cache.delete(key);
            this.cacheTimestamps.delete(key);
            return null;
        }
        
        cacheTrendingPosts(trendingPosts) {
            this.cache.set('trending', trendingPosts);
            this.cacheTimestamps.set('trending', Date.now());
        }
        
        getTrendingPosts() {
            const timestamp = this.cacheTimestamps.get('trending');
            if (timestamp && Date.now() - timestamp < this.CACHE_TTL) {
                return this.cache.get('trending');
            }
            return null;
        }
        
        invalidateUserCache(userId) {
            this.cache.delete('feed:' + userId);
            this.cacheTimestamps.delete('feed:' + userId);
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
    static DatabaseService = class {
        constructor() {
            this.userDatabase = new Map(); // PostgreSQL simulation
            this.postDatabase = new Map(); // DynamoDB simulation
            this.feedDatabase = new Map(); // DynamoDB simulation
            this.cacheDatabase = new Map(); // Redis simulation
            this.mediaDatabase = new Map(); // S3 simulation
            this.searchDatabase = new Map(); // Elasticsearch simulation
        }
        
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
        saveUser(user) {
            this.userDatabase.set(user.userId, user);
            console.log('PostgreSQL: User saved -', user.username);
        }
        
        getUser(userId) {
            return this.userDatabase.get(userId);
        }
        
        saveFollowerRelationship(followerId, followedId) {
            // Simulate PostgreSQL join table
            const followed = this.userDatabase.get(followedId);
            if (followed) {
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
        savePost(post) {
            if (!this.postDatabase.has(post.userId)) {
                this.postDatabase.set(post.userId, []);
            }
            this.postDatabase.get(post.userId).unshift(post);
            console.log('DynamoDB: Post saved -', post.postId);
        }
        
        getUserPosts(userId, limit) {
            const posts = this.postDatabase.get(userId);
            if (!posts) return [];
            return posts.slice(0, limit);
        }
        
        saveFeed(userId, feed) {
            this.feedDatabase.set(userId, feed);
            console.log('DynamoDB: Feed saved for user -', userId);
        }
        
        getUserFeed(userId) {
            return this.feedDatabase.get(userId) || [];
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
        cacheFeed(userId, feed) {
            this.cacheDatabase.set('feed:' + userId, feed);
            console.log('Redis: Feed cached for user -', userId);
        }
        
        getCachedFeed(userId) {
            return this.cacheDatabase.get('feed:' + userId);
        }
        
        cacheTrendingPosts(trendingPosts) {
            this.cacheDatabase.set('trending:posts', trendingPosts);
            console.log('Redis: Trending posts cached');
        }
        
        getTrendingPosts() {
            return this.cacheDatabase.get('trending:posts');
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
        saveMedia(postId, mediaUrl, mediaData) {
            this.mediaDatabase.set('media:' + postId, mediaData);
            console.log('S3: Media saved -', mediaUrl);
        }
        
        getMedia(postId) {
            return this.mediaDatabase.get('media:' + postId);
        }
        
        generateMediaUrl(postId, mediaType) {
            return 'https://s3.amazonaws.com/user-media/' + postId + '.' + mediaType;
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
        indexPost(post) {
            if (!this.searchDatabase.has('posts')) {
                this.searchDatabase.set('posts', []);
            }
            this.searchDatabase.get('posts').push(post);
            console.log('Elasticsearch: Post indexed -', post.postId);
        }
        
        searchPosts(query) {
            const posts = this.searchDatabase.get('posts');
            if (!posts) return [];
            
            // Simple search simulation
            return posts.filter(post => 
                post.content.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        getTrendingPostsByEngagement() {
            const posts = this.searchDatabase.get('posts');
            if (!posts) return [];
            
            return posts
                .sort((a, b) => b.engagementScore - a.engagementScore)
                .slice(0, 10);
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
    static ConsistencyService = class {
        constructor(databaseService) {
            this.databaseService = databaseService;
            this.lastWriteTimestamps = new Map();
        }
        
        // Strong Consistency for User Data
        saveUserWithStrongConsistency(user) {
            this.databaseService.saveUser(user);
            this.lastWriteTimestamps.set('user:' + user.userId, Date.now());
            console.log('Strong Consistency: User data saved');
        }
        
        // Eventual Consistency for Feeds
        saveFeedWithEventualConsistency(userId, feed) {
            // Async write for eventual consistency
            setTimeout(() => {
                this.databaseService.saveFeed(userId, feed);
                console.log('Eventual Consistency: Feed will be consistent soon');
            }, 0);
        }
        
        // Read-Your-Writes for User Posts
        getUserPostsWithReadYourWrites(userId) {
            // Check if we have recent writes
            const lastWrite = this.lastWriteTimestamps.get('user:' + userId);
            if (lastWrite && Date.now() - lastWrite < 5000) {
                // Read from primary database for recent writes
                return this.databaseService.getUserPosts(userId, 100);
            } else {
                // Read from cache or replica
                return this.databaseService.getUserPosts(userId, 100);
            }
        }
        
        // Causal Consistency for Related Data
        savePostWithCausalConsistency(post, user) {
            // Save post first
            this.databaseService.savePost(post);
            
            // Then update related data (feed, search index)
            setTimeout(() => {
                this.databaseService.indexPost(post);
                console.log('Causal Consistency: Related data updated');
            }, 0);
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
    static ScalingService = class {
        constructor() {
            this.primaryDatabase = new TimelineFeedService.DatabaseService();
            this.readReplicas = [];
            this.shardMap = new Map();
            
            // Simulate read replicas
            for (let i = 0; i < 3; i++) {
                this.readReplicas.push(new TimelineFeedService.DatabaseService());
            }
        }
        
        // Read Replicas
        getUserFromReplica(userId) {
            // Round-robin load balancing
            const replicaIndex = Date.now() % this.readReplicas.length;
            return this.readReplicas[replicaIndex].getUser(userId);
        }
        
        // Sharding by User ID
        getShardForUser(userId) {
            const shardIndex = Math.abs(userId.hashCode()) % 4; // 4 shards
            const shardKey = 'shard_' + shardIndex;
            if (!this.shardMap.has(shardKey)) {
                this.shardMap.set(shardKey, new TimelineFeedService.DatabaseService());
            }
            return this.shardMap.get(shardKey);
        }
        
        // Cache-Aside Pattern
        getFeedWithCacheAside(userId) {
            // Check cache first
            const cachedFeed = this.primaryDatabase.getCachedFeed(userId);
            if (cachedFeed) {
                return cachedFeed;
            }
            
            // Cache miss - get from database
            const feed = this.primaryDatabase.getUserFeed(userId);
            
            // Update cache
            this.primaryDatabase.cacheFeed(userId, feed);
            
            return feed;
        }
    }
    
    // ==================== MAIN TIMELINE SERVICE ====================
    static TimelineService = class {
        constructor() {
            this.hybridService = new TimelineFeedService.HybridService();
            this.denormalizationService = new TimelineFeedService.DenormalizationService();
            this.cachingService = new TimelineFeedService.CachingService();
            this.users = new Map();
        }
        
        createPost(userId, content, mediaUrl, mediaType) {
            const user = this.users.get(userId);
            if (!user) return;
            
            const post = new TimelineFeedService.Post(userId, content, mediaUrl, mediaType);
            
            // Denormalize the post
            this.denormalizationService.denormalizePost(post, user);
            
            // Create post using hybrid approach
            this.hybridService.createPost(userId, content, mediaUrl, mediaType);
            
            // Invalidate caches
            for (const followerId of user.followers) {
                this.cachingService.invalidateUserCache(followerId);
            }
        }
        
        getFeed(userId, limit) {
            // Check cache first
            const cachedFeed = this.cachingService.getCachedFeed(userId);
            if (cachedFeed) {
                return cachedFeed.slice(0, limit);
            }
            
            // Get feed from hybrid service
            const feed = this.hybridService.getFeed(userId, limit);
            
            // Cache the result
            this.cachingService.cacheFeed(userId, feed);
            
            return feed.slice(0, limit);
        }
        
        addUser(user) {
            this.users.set(user.userId, user);
            this.hybridService.addUser(user);
        }
        
        followUser(followerId, followedId) {
            this.hybridService.followUser(followerId, followedId);
            this.cachingService.invalidateUserCache(followerId);
        }
        
        likePost(userId, postId) {
            // Update engagement in denormalized data
            const post = this.denormalizationService.getDenormalizedPost(postId);
            if (post) {
                const likes = post.likeCount + 1;
                const comments = post.commentCount;
                const shares = post.shareCount;
                this.denormalizationService.updateEngagement(postId, likes, comments, shares);
            }
        }
    }
}

// ==================== TESTING FUNCTIONS ====================
function testFanOutModel() {
    console.log('=== FAN-OUT MODEL ===');
    const fanOutService = new TimelineFeedService.FanOutService();
    
    const alice = new TimelineFeedService.User('user_1', 'alice', 'Alice Johnson');
    const bob = new TimelineFeedService.User('user_2', 'bob', 'Bob Smith');
    
    fanOutService.addUser(alice);
    fanOutService.addUser(bob);
    fanOutService.followUser(bob.userId, alice.userId);
    
    fanOutService.createPost(alice.userId, 'Hello world!', null, 'text');
    const bobFeed = fanOutService.getFeed(bob.userId, 10);
    console.log('Bob\'s feed:', bobFeed.length, 'posts');
}

function testPullModel() {
    console.log('\n=== PULL MODEL ===');
    const pullService = new TimelineFeedService.PullService();
    
    const alice = new TimelineFeedService.User('user_1', 'alice', 'Alice Johnson');
    const bob = new TimelineFeedService.User('user_2', 'bob', 'Bob Smith');
    
    pullService.addUser(alice);
    pullService.addUser(bob);
    pullService.followUser(bob.userId, alice.userId);
    
    pullService.createPost(alice.userId, 'Hello world!', null, 'text');
    const bobFeed = pullService.getFeed(bob.userId, 10);
    console.log('Bob\'s feed:', bobFeed.length, 'posts');
}

function testHybridModel() {
    console.log('\n=== HYBRID MODEL ===');
    const hybridService = new TimelineFeedService.HybridService();
    
    const alice = new TimelineFeedService.User('user_1', 'alice', 'Alice Johnson');
    const celebrity = new TimelineFeedService.User('user_2', 'celebrity', 'Famous Person');
    celebrity.followerCount = 5000;
    celebrity.isCelebrity = true;
    
    hybridService.addUser(alice);
    hybridService.addUser(celebrity);
    
    hybridService.createPost(alice.userId, 'Regular user post', null, 'text');
    hybridService.createPost(celebrity.userId, 'Celebrity post', null, 'text');
}

function testDenormalization() {
    console.log('\n=== DENORMALIZATION ===');
    const denormService = new TimelineFeedService.DenormalizationService();
    
    const user = new TimelineFeedService.User('user_1', 'alice', 'Alice Johnson');
    const post = new TimelineFeedService.Post('user_1', 'Hello world!', null, 'text');
    
    denormService.denormalizePost(post, user);
    const denormPost = denormService.getDenormalizedPost(post.postId);
    console.log('Denormalized post:', denormPost);
}

function testCaching() {
    console.log('\n=== CACHING ===');
    const cacheService = new TimelineFeedService.CachingService();
    
    const feed = [{ id: 1, content: 'Test post' }];
    cacheService.cacheFeed('user_1', feed);
    
    const cachedFeed = cacheService.getCachedFeed('user_1');
    console.log('Cached feed:', cachedFeed);
}

function testCompleteTimelineService() {
    console.log('\n=== COMPLETE TIMELINE SERVICE ===');
    const timelineService = new TimelineFeedService.TimelineService();
    
    // Create users
    const alice = new TimelineFeedService.User('user_1', 'alice', 'Alice Johnson');
    const bob = new TimelineFeedService.User('user_2', 'bob', 'Bob Smith');
    const charlie = new TimelineFeedService.User('user_3', 'charlie', 'Charlie Brown');
    const celebrity = new TimelineFeedService.User('user_4', 'celebrity', 'Famous Person');
    celebrity.followerCount = 5000;
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
    timelineService.createPost(alice.userId, 'Hello world!', null, 'text');
    timelineService.createPost(celebrity.userId, 'Check out my new movie!', 'movie.jpg', 'image');
    timelineService.createPost(bob.userId, 'Great weather today!', null, 'text');
    
    // Get feeds
    console.log('\nBob\'s feed:');
    const bobFeed = timelineService.getFeed(bob.userId, 10);
    console.log(bobFeed.length, 'posts');
    
    console.log('\nCharlie\'s feed:');
    const charlieFeed = timelineService.getFeed(charlie.userId, 10);
    console.log(charlieFeed.length, 'posts');
}

// ==================== MAIN TEST FUNCTION ====================
function runTests() {
    console.log('🚀 TIMELINE/FEED SERVICE - AMAZON INTERVIEW DEMO\n');
    
    testFanOutModel();
    testPullModel();
    testHybridModel();
    testDenormalization();
    testCaching();
    testCompleteTimelineService();
    
    // Interview tips
    console.log('\n🎯 AMAZON INTERVIEW TIPS:');
    console.log('1. Start with fan-out for simple implementation');
    console.log('2. Use pull model for high-follower users');
    console.log('3. Implement hybrid approach for best performance');
    console.log('4. Denormalize data for faster reads');
    console.log('5. Use Redis caching for hot feeds');
    console.log('6. Consider write amplification and storage costs');
    console.log('7. Plan for viral posts and edge cases');
    console.log('8. Discuss monitoring and performance metrics');
}

// ==================== EXPORT FOR USE ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimelineFeedService;
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
} 