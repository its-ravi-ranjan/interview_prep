/**
 * Author: Ravi Ranjan
 * GitHub: @its-ravi-ranjan
 * Email: contact70raviranjan@gmail.com
 * Created: 2024
 * Purpose: Interview preparation - OTT Platform Design (Netflix/Hotstar like)
 * 
 * OTT Platform Design - Netflix/Hotstar Like System
 * ================================================
 * 
 * Functional Requirements:
 * -----------------------
 * 1. User Management:
 *    - User registration, login, logout
 *    - Profile management (multiple profiles per account)
 *    - Subscription management (Basic, Standard, Premium)
 *    - Payment processing and billing
 * 
 * 2. Content Management:
 *    - Video upload, encoding, and storage
 *    - Content categorization (Movies, TV Shows, Documentaries)
 *    - Content metadata management (title, description, cast, genre)
 *    - Content rating and age restrictions
 *    - Content recommendation system
 * 
 * 3. Streaming Service:
 *    - Adaptive bitrate streaming (HLS/DASH)
 *    - Video quality selection (480p, 720p, 1080p, 4K)
 *    - Resume playback from last position
 *    - Download for offline viewing
 *    - Subtitle and audio track selection
 * 
 * 4. Search and Discovery:
 *    - Search by title, actor, genre
 *    - Personalized recommendations
 *    - Trending content
 *    - Continue watching section
 *    - My List functionality
 * 
 * 5. Social Features:
 *    - Watch history
 *    - Rating and reviews
 *    - Share content
 *    - Parental controls
 * 
 * Non-Functional Requirements:
 * ---------------------------
 * 
 * Low Load Scenario (Startup):
 * - Concurrent Users: 10,000
 * - Daily Active Users: 100,000
 * - Video Storage: 1TB
 * - Response Time: < 2 seconds
 * - Availability: 99.5%
 * 
 * High Load Scenario (Established Platform):
 * - Concurrent Users: 1,000,000
 * - Daily Active Users: 50,000,000
 * - Video Storage: 100PB
 * - Response Time: < 500ms
 * - Availability: 99.9%
 * - Global CDN with edge locations
 * - Multi-region deployment
 * 
 * System Architecture:
 * -------------------
 * 1. Load Balancer (AWS ALB/NLB)
 * 2. API Gateway (AWS API Gateway)
 * 3. Microservices:
 *    - User Service
 *    - Content Service
 *    - Streaming Service
 *    - Payment Service
 *    - Recommendation Service
 * 4. Databases:
 *    - User Data: PostgreSQL
 *    - Content Metadata: PostgreSQL
 *    - Session Data: Redis
 *    - Analytics: MongoDB
 * 5. Storage:
 *    - Video Files: AWS S3/CloudFront
 *    - Thumbnails: AWS S3
 * 6. CDN: CloudFront/Akamai
 * 7. Message Queue: AWS SQS/SNS
 * 8. Monitoring: CloudWatch
 * 
 * Sequence Diagram (Video Playback):
 * ----------------------------------
 * 1. User -> Load Balancer: Request video
 * 2. Load Balancer -> API Gateway: Route request
 * 3. API Gateway -> Auth Service: Validate token
 * 4. Auth Service -> API Gateway: Token valid
 * 5. API Gateway -> Content Service: Get video metadata
 * 6. Content Service -> Database: Fetch video info
 * 7. Database -> Content Service: Return metadata
 * 8. Content Service -> API Gateway: Return video URL
 * 9. API Gateway -> User: Return streaming URL
 * 10. User -> CDN: Request video stream
 * 11. CDN -> User: Stream video content
 * 
 * API Design:
 * -----------
 * 
 * RESTful APIs:
 * 
 * 1. User Management:
 *    POST /api/v1/auth/register
 *    POST /api/v1/auth/login
 *    POST /api/v1/auth/logout
 *    GET /api/v1/user/profile
 *    PUT /api/v1/user/profile
 *    GET /api/v1/user/subscription
 * 
 * 2. Content Management:
 *    GET /api/v1/content/movies
 *    GET /api/v1/content/tv-shows
 *    GET /api/v1/content/{id}
 *    GET /api/v1/content/search?q={query}
 *    GET /api/v1/content/recommendations
 * 
 * 3. Streaming:
 *    GET /api/v1/stream/{contentId}/manifest
 *    GET /api/v1/stream/{contentId}/segment/{segmentId}
 *    POST /api/v1/stream/{contentId}/progress
 *    GET /api/v1/stream/{contentId}/progress
 * 
 * 4. User Actions:
 *    POST /api/v1/user/watchlist/add
 *    DELETE /api/v1/user/watchlist/remove
 *    GET /api/v1/user/watchlist
 *    POST /api/v1/user/rating
 *    GET /api/v1/user/history
 * 
 * 5. Payment:
 *    POST /api/v1/payment/subscribe
 *    GET /api/v1/payment/plans
 *    POST /api/v1/payment/cancel
 * 
 * Core Entities/Classes:
 * ----------------------
 */

// Enums
const SubscriptionType = {
    BASIC: { maxScreens: 1, maxQuality: 480, maxProfiles: 1 },
    STANDARD: { maxScreens: 2, maxQuality: 720, maxProfiles: 2 },
    PREMIUM: { maxScreens: 4, maxQuality: 1080, maxProfiles: 4 }
};

const ContentType = {
    MOVIE: 'MOVIE',
    TV_SHOW: 'TV_SHOW',
    DOCUMENTARY: 'DOCUMENTARY',
    STANDUP_COMEDY: 'STANDUP_COMEDY',
    ANIME: 'ANIME'
};

const ContentRating = {
    G: 'G',
    PG: 'PG',
    PG13: 'PG13',
    R: 'R',
    NC17: 'NC17'
};

const PaymentStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    CANCELLED: 'CANCELLED'
};

// Core Entities
class User {
    constructor(userId, email, name) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.subscriptionType = null;
        this.subscriptionExpiry = null;
        this.profiles = [];
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    
    addProfile(profile) {
        this.profiles.push(profile);
    }
    
    getProfiles() {
        return this.profiles;
    }
}

class UserProfile {
    constructor(profileId, userId, name) {
        this.profileId = profileId;
        this.userId = userId;
        this.name = name;
        this.avatar = null;
        this.isKidsProfile = false;
        this.watchlist = [];
        this.watchHistory = new Map(); // contentId -> watchTime
    }
    
    addToWatchlist(contentId) {
        if (!this.watchlist.includes(contentId)) {
            this.watchlist.push(contentId);
        }
    }
    
    removeFromWatchlist(contentId) {
        this.watchlist = this.watchlist.filter(id => id !== contentId);
    }
    
    updateWatchHistory(contentId, watchTime) {
        this.watchHistory.set(contentId, watchTime);
    }
    
    getWatchProgress(contentId) {
        return this.watchHistory.get(contentId) || 0;
    }
}

class Content {
    constructor(contentId, title, contentType) {
        this.contentId = contentId;
        this.title = title;
        this.description = '';
        this.contentType = contentType;
        this.genres = [];
        this.cast = [];
        this.director = '';
        this.releaseYear = null;
        this.rating = null;
        this.duration = 0; // in minutes
        this.posterUrl = '';
        this.trailerUrl = '';
        this.videoUrls = new Map(); // quality -> URL
        this.isAvailable = true;
        this.createdAt = new Date();
    }
    
    addGenre(genre) {
        if (!this.genres.includes(genre)) {
            this.genres.push(genre);
        }
    }
    
    addCast(member) {
        if (!this.cast.includes(member)) {
            this.cast.push(member);
        }
    }
    
    addVideoUrl(quality, url) {
        this.videoUrls.set(quality, url);
    }
    
    getVideoUrl(quality) {
        return this.videoUrls.get(quality);
    }
}

class Subscription {
    constructor(subscriptionId, userId, type) {
        this.subscriptionId = subscriptionId;
        this.userId = userId;
        this.type = type;
        this.startDate = new Date();
        this.endDate = null;
        this.paymentStatus = PaymentStatus.PENDING;
        this.amount = 0;
    }
    
    isActive() {
        return this.paymentStatus === PaymentStatus.COMPLETED && 
               (!this.endDate || this.endDate > new Date());
    }
    
    canStream(quality) {
        return this.isActive() && quality <= this.type.maxQuality;
    }
    
    canCreateProfile() {
        return this.isActive();
    }
}

class WatchSession {
    constructor(sessionId, userId, contentId, totalDuration) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.contentId = contentId;
        this.watchTime = 0; // in seconds
        this.totalDuration = totalDuration;
        this.startedAt = new Date();
        this.lastUpdatedAt = new Date();
    }
    
    updateWatchTime(watchTime) {
        this.watchTime = watchTime;
        this.lastUpdatedAt = new Date();
    }
    
    getProgressPercentage() {
        return (this.watchTime / this.totalDuration) * 100;
    }
}

// Service Classes
class UserService {
    constructor() {
        this.users = new Map();
        this.userSessions = new Map(); // token -> userId
    }
    
    registerUser(email, password, name) {
        const userId = this.generateId();
        const user = new User(userId, email, name);
        this.users.set(userId, user);
        return user;
    }
    
    loginUser(email, password) {
        // Simplified login - in real implementation, validate password
        for (const user of this.users.values()) {
            if (user.email === email) {
                const token = this.generateId();
                this.userSessions.set(token, user.userId);
                return token;
            }
        }
        return null;
    }
    
    getUserByToken(token) {
        const userId = this.userSessions.get(token);
        return this.users.get(userId);
    }
    
    createProfile(userId, name) {
        const user = this.users.get(userId);
        if (user) {
            const profileId = this.generateId();
            const profile = new UserProfile(profileId, userId, name);
            user.addProfile(profile);
            return profile;
        }
        return null;
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

class ContentService {
    constructor() {
        this.contents = new Map();
        this.genreIndex = new Map(); // genre -> contentIds
    }
    
    addContent(title, type, genres = []) {
        const contentId = this.generateId();
        const content = new Content(contentId, title, type);
        
        genres.forEach(genre => {
            content.addGenre(genre);
            if (!this.genreIndex.has(genre)) {
                this.genreIndex.set(genre, []);
            }
            this.genreIndex.get(genre).push(contentId);
        });
        
        this.contents.set(contentId, content);
        return content;
    }
    
    getContent(contentId) {
        return this.contents.get(contentId);
    }
    
    searchContent(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        for (const content of this.contents.values()) {
            if (content.title.toLowerCase().includes(lowerQuery) ||
                content.genres.some(g => g.toLowerCase().includes(lowerQuery))) {
                results.push(content);
            }
        }
        
        return results;
    }
    
    getContentByGenre(genre) {
        const contentIds = this.genreIndex.get(genre) || [];
        return contentIds.map(id => this.contents.get(id)).filter(Boolean);
    }
    
    getAllContent() {
        return Array.from(this.contents.values());
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

class StreamingService {
    constructor() {
        this.activeSessions = new Map();
        this.watchProgress = new Map(); // userId:contentId -> progress
    }
    
    startStreaming(userId, contentId, totalDuration) {
        const sessionId = this.generateId();
        const session = new WatchSession(sessionId, userId, contentId, totalDuration);
        this.activeSessions.set(sessionId, session);
        return sessionId;
    }
    
    updateProgress(sessionId, watchTime) {
        const session = this.activeSessions.get(sessionId);
        if (session) {
            session.updateWatchTime(watchTime);
            
            // Update persistent progress
            const key = `${session.userId}:${session.contentId}`;
            this.watchProgress.set(key, watchTime);
        }
    }
    
    getProgress(userId, contentId) {
        const key = `${userId}:${contentId}`;
        return this.watchProgress.get(key) || 0;
    }
    
    endStreaming(sessionId) {
        this.activeSessions.delete(sessionId);
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

class SubscriptionService {
    constructor() {
        this.subscriptions = new Map();
    }
    
    createSubscription(userId, type) {
        const subscriptionId = this.generateId();
        const subscription = new Subscription(subscriptionId, userId, type);
        this.subscriptions.set(subscriptionId, subscription);
        return subscription;
    }
    
    canStream(userId, quality) {
        const subscription = this.getActiveSubscription(userId);
        if (!subscription) return false;
        
        return subscription.canStream(quality);
    }
    
    canCreateProfile(userId) {
        const subscription = this.getActiveSubscription(userId);
        if (!subscription) return false;
        
        return subscription.canCreateProfile();
    }
    
    getActiveSubscription(userId) {
        for (const subscription of this.subscriptions.values()) {
            if (subscription.userId === userId && subscription.isActive()) {
                return subscription;
            }
        }
        return null;
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}

class RecommendationService {
    constructor(contentService) {
        this.contentService = contentService;
    }
    
    getRecommendations(userId, userGenres) {
        // Simple recommendation based on user's preferred genres
        const recommendations = new Set();
        
        for (const genre of userGenres) {
            const genreContent = this.contentService.getContentByGenre(genre);
            genreContent.forEach(content => recommendations.add(content));
        }
        
        return Array.from(recommendations);
    }
    
    getTrendingContent() {
        // Simplified - return all available content
        return this.contentService.getAllContent();
    }
}

// Main Application Class
class DesignOtt {
    constructor() {
        this.userService = new UserService();
        this.contentService = new ContentService();
        this.streamingService = new StreamingService();
        this.subscriptionService = new SubscriptionService();
        this.recommendationService = new RecommendationService(this.contentService);
        
        // Initialize with sample data
        this.initializeSampleData();
    }
    
    initializeSampleData() {
        // Add sample content
        this.contentService.addContent("The Matrix", ContentType.MOVIE, 
            ["Action", "Sci-Fi", "Thriller"]);
        this.contentService.addContent("Breaking Bad", ContentType.TV_SHOW, 
            ["Drama", "Crime", "Thriller"]);
        this.contentService.addContent("Planet Earth", ContentType.DOCUMENTARY, 
            ["Documentary", "Nature"]);
    }
    
    // API Methods
    registerUser(email, password, name) {
        const user = this.userService.registerUser(email, password, name);
        return user.userId;
    }
    
    loginUser(email, password) {
        return this.userService.loginUser(email, password);
    }
    
    searchContent(query) {
        return this.contentService.searchContent(query);
    }
    
    startStreaming(token, contentId) {
        const user = this.userService.getUserByToken(token);
        if (!user) return null;
        
        const content = this.contentService.getContent(contentId);
        if (!content) return null;
        
        // Check subscription
        if (!this.subscriptionService.canStream(user.userId, 720)) {
            return null; // Insufficient subscription
        }
        
        return this.streamingService.startStreaming(user.userId, contentId, content.duration * 60);
    }
    
    updateStreamingProgress(sessionId, watchTime) {
        this.streamingService.updateProgress(sessionId, watchTime);
    }
    
    getRecommendations(token) {
        const user = this.userService.getUserByToken(token);
        if (!user) return [];
        
        // Simplified - use all genres from available content
        const userGenres = ["Action", "Drama", "Comedy"];
        return this.recommendationService.getRecommendations(user.userId, userGenres);
    }
    
    // Demo method
    runDemo() {
        console.log("=== OTT Platform Demo ===\n");
        
        // Register user
        const userId = this.registerUser("john@example.com", "password123", "John Doe");
        console.log("User registered:", userId);
        
        // Login user
        const token = this.loginUser("john@example.com", "password123");
        console.log("User logged in, token:", token);
        
        // Search content
        const searchResults = this.searchContent("Matrix");
        console.log("Search results:", searchResults.length, "items found");
        
        // Start streaming
        if (searchResults.length > 0) {
            const sessionId = this.startStreaming(token, searchResults[0].contentId);
            console.log("Streaming session started:", sessionId);
            
            // Update progress
            this.updateStreamingProgress(sessionId, 300); // 5 minutes
            console.log("Updated streaming progress");
        }
        
        // Get recommendations
        const recommendations = this.getRecommendations(token);
        console.log("Recommendations:", recommendations.length, "items");
        
        console.log("\n=== Demo Completed ===");
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DesignOtt,
        User,
        UserProfile,
        Content,
        Subscription,
        WatchSession,
        UserService,
        ContentService,
        StreamingService,
        SubscriptionService,
        RecommendationService,
        SubscriptionType,
        ContentType,
        ContentRating,
        PaymentStatus
    };
} else {
    // Run if executed directly
    const ott = new DesignOtt();
    ott.runDemo();
} 