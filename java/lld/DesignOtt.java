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

import java.util.*;
import java.time.LocalDateTime;

// Core Entities
class User {
    private String userId;
    private String email;
    private String passwordHash;
    private String name;
    private SubscriptionType subscriptionType;
    private LocalDateTime subscriptionExpiry;
    private List<UserProfile> profiles;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructor, getters, setters
    public User(String userId, String email, String name) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.profiles = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public String getUserId() { return userId; }
    public String getEmail() { return email; }
    public String getName() { return name; }
    public SubscriptionType getSubscriptionType() { return subscriptionType; }
    public void setSubscriptionType(SubscriptionType subscriptionType) { 
        this.subscriptionType = subscriptionType; 
    }
    public List<UserProfile> getProfiles() { return profiles; }
}

class UserProfile {
    private String profileId;
    private String userId;
    private String name;
    private String avatar;
    private boolean isKidsProfile;
    private List<String> watchlist;
    private Map<String, Integer> watchHistory; // contentId -> watchTime
    
    public UserProfile(String profileId, String userId, String name) {
        this.profileId = profileId;
        this.userId = userId;
        this.name = name;
        this.watchlist = new ArrayList<>();
        this.watchHistory = new HashMap<>();
    }
    
    // Getters and setters
    public String getProfileId() { return profileId; }
    public String getName() { return name; }
    public List<String> getWatchlist() { return watchlist; }
    public Map<String, Integer> getWatchHistory() { return watchHistory; }
}

class Content {
    private String contentId;
    private String title;
    private String description;
    private ContentType contentType;
    private List<String> genres;
    private List<String> cast;
    private String director;
    private int releaseYear;
    private ContentRating rating;
    private int duration; // in minutes
    private String posterUrl;
    private String trailerUrl;
    private Map<String, String> videoUrls; // quality -> URL
    private boolean isAvailable;
    private LocalDateTime createdAt;
    
    public Content(String contentId, String title, ContentType contentType) {
        this.contentId = contentId;
        this.title = title;
        this.contentType = contentType;
        this.genres = new ArrayList<>();
        this.cast = new ArrayList<>();
        this.videoUrls = new HashMap<>();
        this.isAvailable = true;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public String getContentId() { return contentId; }
    public String getTitle() { return title; }
    public ContentType getContentType() { return contentType; }
    public List<String> getGenres() { return genres; }
    public Map<String, String> getVideoUrls() { return videoUrls; }
    public boolean isAvailable() { return isAvailable; }
}

class Subscription {
    private String subscriptionId;
    private String userId;
    private SubscriptionType type;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private PaymentStatus paymentStatus;
    private double amount;
    
    public Subscription(String subscriptionId, String userId, SubscriptionType type) {
        this.subscriptionId = subscriptionId;
        this.userId = userId;
        this.type = type;
        this.startDate = LocalDateTime.now();
        this.paymentStatus = PaymentStatus.PENDING;
    }
    
    // Getters and setters
    public String getSubscriptionId() { return subscriptionId; }
    public SubscriptionType getType() { return type; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus status) { this.paymentStatus = status; }
}

class WatchSession {
    private String sessionId;
    private String userId;
    private String contentId;
    private int watchTime; // in seconds
    private int totalDuration;
    private LocalDateTime startedAt;
    private LocalDateTime lastUpdatedAt;
    
    public WatchSession(String sessionId, String userId, String contentId, int totalDuration) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.contentId = contentId;
        this.totalDuration = totalDuration;
        this.startedAt = LocalDateTime.now();
        this.lastUpdatedAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public String getSessionId() { return sessionId; }
    public int getWatchTime() { return watchTime; }
    public void setWatchTime(int watchTime) { 
        this.watchTime = watchTime; 
        this.lastUpdatedAt = LocalDateTime.now();
    }
}

// Enums
enum SubscriptionType {
    BASIC(1, 480, 1),
    STANDARD(2, 720, 2),
    PREMIUM(4, 1080, 4);
    
    private final int maxScreens;
    private final int maxQuality;
    private final int maxProfiles;
    
    SubscriptionType(int maxScreens, int maxQuality, int maxProfiles) {
        this.maxScreens = maxScreens;
        this.maxQuality = maxQuality;
        this.maxProfiles = maxProfiles;
    }
    
    public int getMaxScreens() { return maxScreens; }
    public int getMaxQuality() { return maxQuality; }
    public int getMaxProfiles() { return maxProfiles; }
}

enum ContentType {
    MOVIE,
    TV_SHOW,
    DOCUMENTARY,
    STANDUP_COMEDY,
    ANIME
}

enum ContentRating {
    G, PG, PG13, R, NC17
}

enum PaymentStatus {
    PENDING,
    COMPLETED,
    FAILED,
    CANCELLED
}

// Service Classes
class UserService {
    private Map<String, User> users = new HashMap<>();
    private Map<String, String> userSessions = new HashMap<>(); // token -> userId
    
    public User registerUser(String email, String password, String name) {
        String userId = UUID.randomUUID().toString();
        User user = new User(userId, email, name);
        users.put(userId, user);
        return user;
    }
    
    public String loginUser(String email, String password) {
        // Simplified login - in real implementation, validate password
        for (User user : users.values()) {
            if (user.getEmail().equals(email)) {
                String token = UUID.randomUUID().toString();
                userSessions.put(token, user.getUserId());
                return token;
            }
        }
        return null;
    }
    
    public User getUserByToken(String token) {
        String userId = userSessions.get(token);
        return users.get(userId);
    }
    
    public UserProfile createProfile(String userId, String name) {
        User user = users.get(userId);
        if (user != null) {
            String profileId = UUID.randomUUID().toString();
            UserProfile profile = new UserProfile(profileId, userId, name);
            user.getProfiles().add(profile);
            return profile;
        }
        return null;
    }
}

class ContentService {
    private Map<String, Content> contents = new HashMap<>();
    private Map<String, List<String>> genreIndex = new HashMap<>();
    
    public Content addContent(String title, ContentType type, List<String> genres) {
        String contentId = UUID.randomUUID().toString();
        Content content = new Content(contentId, title, type);
        content.getGenres().addAll(genres);
        contents.put(contentId, content);
        
        // Update genre index
        for (String genre : genres) {
            genreIndex.computeIfAbsent(genre, k -> new ArrayList<>()).add(contentId);
        }
        
        return content;
    }
    
    public Content getContent(String contentId) {
        return contents.get(contentId);
    }
    
    public List<Content> searchContent(String query) {
        List<Content> results = new ArrayList<>();
        String lowerQuery = query.toLowerCase();
        
        for (Content content : contents.values()) {
            if (content.getTitle().toLowerCase().contains(lowerQuery) ||
                content.getGenres().stream().anyMatch(g -> g.toLowerCase().contains(lowerQuery))) {
                results.add(content);
            }
        }
        
        return results;
    }
    
    public List<Content> getContentByGenre(String genre) {
        List<String> contentIds = genreIndex.get(genre);
        if (contentIds == null) return new ArrayList<>();
        
        return contentIds.stream()
                .map(this::getContent)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}

class StreamingService {
    private Map<String, WatchSession> activeSessions = new HashMap<>();
    private Map<String, Integer> watchProgress = new HashMap<>(); // userId:contentId -> progress
    
    public String startStreaming(String userId, String contentId, int totalDuration) {
        String sessionId = UUID.randomUUID().toString();
        WatchSession session = new WatchSession(sessionId, userId, contentId, totalDuration);
        activeSessions.put(sessionId, session);
        return sessionId;
    }
    
    public void updateProgress(String sessionId, int watchTime) {
        WatchSession session = activeSessions.get(sessionId);
        if (session != null) {
            session.setWatchTime(watchTime);
            
            // Update persistent progress
            String key = session.getUserId() + ":" + session.getContentId();
            watchProgress.put(key, watchTime);
        }
    }
    
    public int getProgress(String userId, String contentId) {
        String key = userId + ":" + contentId;
        return watchProgress.getOrDefault(key, 0);
    }
    
    public void endStreaming(String sessionId) {
        activeSessions.remove(sessionId);
    }
}

class SubscriptionService {
    private Map<String, Subscription> subscriptions = new HashMap<>();
    
    public Subscription createSubscription(String userId, SubscriptionType type) {
        String subscriptionId = UUID.randomUUID().toString();
        Subscription subscription = new Subscription(subscriptionId, userId, type);
        subscriptions.put(subscriptionId, subscription);
        return subscription;
    }
    
    public boolean canStream(String userId, int quality) {
        Subscription subscription = getActiveSubscription(userId);
        if (subscription == null) return false;
        
        return quality <= subscription.getType().getMaxQuality();
    }
    
    public boolean canCreateProfile(String userId) {
        Subscription subscription = getActiveSubscription(userId);
        if (subscription == null) return false;
        
        // Count existing profiles
        // This is simplified - in real implementation, query database
        return true; // Simplified check
    }
    
    private Subscription getActiveSubscription(String userId) {
        return subscriptions.values().stream()
                .filter(s -> s.getUserId().equals(userId))
                .filter(s -> s.getPaymentStatus() == PaymentStatus.COMPLETED)
                .findFirst()
                .orElse(null);
    }
}

class RecommendationService {
    private ContentService contentService;
    
    public RecommendationService(ContentService contentService) {
        this.contentService = contentService;
    }
    
    public List<Content> getRecommendations(String userId, List<String> userGenres) {
        // Simple recommendation based on user's preferred genres
        Set<Content> recommendations = new HashSet<>();
        
        for (String genre : userGenres) {
            List<Content> genreContent = contentService.getContentByGenre(genre);
            recommendations.addAll(genreContent);
        }
        
        return new ArrayList<>(recommendations);
    }
    
    public List<Content> getTrendingContent() {
        // Simplified - return all available content
        return new ArrayList<>(contentService.getAllContent());
    }
}

// Main Application Class
public class DesignOtt {
    private UserService userService;
    private ContentService contentService;
    private StreamingService streamingService;
    private SubscriptionService subscriptionService;
    private RecommendationService recommendationService;
    
    public DesignOtt() {
        this.userService = new UserService();
        this.contentService = new ContentService();
        this.streamingService = new StreamingService();
        this.subscriptionService = new SubscriptionService();
        this.recommendationService = new RecommendationService(contentService);
        
        // Initialize with sample data
        initializeSampleData();
    }
    
    private void initializeSampleData() {
        // Add sample content
        contentService.addContent("The Matrix", ContentType.MOVIE, 
            Arrays.asList("Action", "Sci-Fi", "Thriller"));
        contentService.addContent("Breaking Bad", ContentType.TV_SHOW, 
            Arrays.asList("Drama", "Crime", "Thriller"));
        contentService.addContent("Planet Earth", ContentType.DOCUMENTARY, 
            Arrays.asList("Documentary", "Nature"));
    }
    
    // API Methods
    public String registerUser(String email, String password, String name) {
        User user = userService.registerUser(email, password, name);
        return user.getUserId();
    }
    
    public String loginUser(String email, String password) {
        return userService.loginUser(email, password);
    }
    
    public List<Content> searchContent(String query) {
        return contentService.searchContent(query);
    }
    
    public String startStreaming(String token, String contentId) {
        User user = userService.getUserByToken(token);
        if (user == null) return null;
        
        Content content = contentService.getContent(contentId);
        if (content == null) return null;
        
        // Check subscription
        if (!subscriptionService.canStream(user.getUserId(), 720)) {
            return null; // Insufficient subscription
        }
        
        return streamingService.startStreaming(user.getUserId(), contentId, content.getDuration() * 60);
    }
    
    public void updateStreamingProgress(String sessionId, int watchTime) {
        streamingService.updateProgress(sessionId, watchTime);
    }
    
    public List<Content> getRecommendations(String token) {
        User user = userService.getUserByToken(token);
        if (user == null) return new ArrayList<>();
        
        // Simplified - use all genres from available content
        List<String> userGenres = Arrays.asList("Action", "Drama", "Comedy");
        return recommendationService.getRecommendations(user.getUserId(), userGenres);
    }
    
    // Demo method
    public void runDemo() {
        System.out.println("=== OTT Platform Demo ===\n");
        
        // Register user
        String userId = registerUser("john@example.com", "password123", "John Doe");
        System.out.println("User registered: " + userId);
        
        // Login user
        String token = loginUser("john@example.com", "password123");
        System.out.println("User logged in, token: " + token);
        
        // Search content
        List<Content> searchResults = searchContent("Matrix");
        System.out.println("Search results: " + searchResults.size() + " items found");
        
        // Start streaming
        if (!searchResults.isEmpty()) {
            String sessionId = startStreaming(token, searchResults.get(0).getContentId());
            System.out.println("Streaming session started: " + sessionId);
            
            // Update progress
            updateStreamingProgress(sessionId, 300); // 5 minutes
            System.out.println("Updated streaming progress");
        }
        
        // Get recommendations
        List<Content> recommendations = getRecommendations(token);
        System.out.println("Recommendations: " + recommendations.size() + " items");
        
        System.out.println("\n=== Demo Completed ===");
    }
    
    public static void main(String[] args) {
        DesignOtt ott = new DesignOtt();
        ott.runDemo();
    }
} 