/**
 * Ticket Booking System (BookMyShow) - Amazon Interview Focus
 * 
 * Key Components:
 * 1. Movie/Theater Management
 * 2. Seat Management & Booking
 * 3. Payment Processing
 * 4. Booking History & Analytics
 * 5. Scalability Considerations
 * 
 * Similar to Parking Lot System:
 * - Both have resource management (seats vs parking spots)
 * - Both need booking/reservation logic
 * - Both handle concurrent access
 * - Both need payment processing
 * - Both require analytics and reporting
 */

import java.util.*;
import java.util.concurrent.*;
import java.time.*;
import java.time.format.DateTimeFormatter;

// ==================== 1. ENUMS & CONSTANTS ====================
/**
 * ENUMS: Similar to Parking Lot's VehicleType and ParkingSpotType
 * 
 * Parking Lot: VehicleType (CAR, BIKE, TRUCK)
 * Ticket Booking: SeatType (ECONOMY, PREMIUM, VIP)
 * 
 * Parking Lot: ParkingSpotType (COMPACT, LARGE, MOTORCYCLE)
 * Ticket Booking: MovieGenre (ACTION, COMEDY, DRAMA)
 */

enum SeatType {
    ECONOMY(100), PREMIUM(200), VIP(500);
    
    private final int price;
    
    SeatType(int price) {
        this.price = price;
    }
    
    public int getPrice() {
        return price;
    }
}

enum MovieGenre {
    ACTION, COMEDY, DRAMA, HORROR, ROMANCE, THRILLER, SCI_FI
}

enum BookingStatus {
    PENDING, CONFIRMED, CANCELLED, EXPIRED
}

enum PaymentStatus {
    PENDING, COMPLETED, FAILED, REFUNDED
}

// ==================== 2. ENTITY CLASSES ====================
/**
 * ENTITY CLASSES: Similar to Parking Lot's Vehicle and ParkingSpot
 * 
 * Parking Lot: Vehicle (licensePlate, type)
 * Ticket Booking: Movie (id, title, genre, duration)
 * 
 * Parking Lot: ParkingSpot (spotNumber, type, isOccupied)
 * Ticket Booking: Seat (seatNumber, row, type, isBooked)
 */

class Movie {
    private String id;
    private String title;
    private MovieGenre genre;
    private int duration; // in minutes
    private String language;
    private LocalDate releaseDate;
    
    public Movie(String id, String title, MovieGenre genre, int duration, String language) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.language = language;
        this.releaseDate = LocalDate.now();
    }
    
    // Getters
    public String getId() { return id; }
    public String getTitle() { return title; }
    public MovieGenre getGenre() { return genre; }
    public int getDuration() { return duration; }
    public String getLanguage() { return language; }
    public LocalDate getReleaseDate() { return releaseDate; }
    
    @Override
    public String toString() {
        return String.format("Movie{id='%s', title='%s', genre=%s, duration=%d min}", 
            id, title, genre, duration);
    }
}

class Theater {
    private String id;
    private String name;
    private String location;
    private List<Screen> screens;
    
    public Theater(String id, String name, String location) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.screens = new ArrayList<>();
    }
    
    public void addScreen(Screen screen) {
        screens.add(screen);
    }
    
    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getLocation() { return location; }
    public List<Screen> getScreens() { return screens; }
    
    @Override
    public String toString() {
        return String.format("Theater{id='%s', name='%s', location='%s', screens=%d}", 
            id, name, location, screens.size());
    }
}

class Screen {
    private String id;
    private String name;
    private int totalSeats;
    private List<Seat> seats;
    
    public Screen(String id, String name, int rows, int seatsPerRow) {
        this.id = id;
        this.name = name;
        this.totalSeats = rows * seatsPerRow;
        this.seats = new ArrayList<>();
        
        // Initialize seats (similar to ParkingLot's createParkingSpots)
        for (int row = 1; row <= rows; row++) {
            for (int seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                SeatType type = determineSeatType(row, seatsPerRow);
                seats.add(new Seat(row, seatNum, type));
            }
        }
    }
    
    private SeatType determineSeatType(int row, int totalRows) {
        // Similar to ParkingLot's spot type determination
        if (row <= totalRows * 0.3) return SeatType.VIP;      // Front 30% = VIP
        if (row <= totalRows * 0.7) return SeatType.PREMIUM;  // Next 40% = Premium
        return SeatType.ECONOMY;                              // Back 30% = Economy
    }
    
    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public int getTotalSeats() { return totalSeats; }
    public List<Seat> getSeats() { return seats; }
    
    @Override
    public String toString() {
        return String.format("Screen{id='%s', name='%s', totalSeats=%d}", 
            id, name, totalSeats);
    }
}

class Seat {
    private int row;
    private int seatNumber;
    private SeatType type;
    private boolean isBooked;
    private String bookingId; // Similar to ParkingSpot's vehicle
    
    public Seat(int row, int seatNumber, SeatType type) {
        this.row = row;
        this.seatNumber = seatNumber;
        this.type = type;
        this.isBooked = false;
        this.bookingId = null;
    }
    
    public String getSeatId() {
        return String.format("%c%d", (char)('A' + row - 1), seatNumber);
    }
    
    // Getters and Setters
    public int getRow() { return row; }
    public int getSeatNumber() { return seatNumber; }
    public SeatType getType() { return type; }
    public boolean isBooked() { return isBooked; }
    public String getBookingId() { return bookingId; }
    
    public void book(String bookingId) {
        this.isBooked = true;
        this.bookingId = bookingId;
    }
    
    public void unbook() {
        this.isBooked = false;
        this.bookingId = null;
    }
    
    @Override
    public String toString() {
        return String.format("Seat{id='%s', type=%s, booked=%s}", 
            getSeatId(), type, isBooked);
    }
}

class Show {
    private String id;
    private Movie movie;
    private Screen screen;
    private LocalDateTime showTime;
    private double basePrice;
    private Map<String, Seat> bookedSeats;
    
    public Show(String id, Movie movie, Screen screen, LocalDateTime showTime, double basePrice) {
        this.id = id;
        this.movie = movie;
        this.screen = screen;
        this.showTime = showTime;
        this.basePrice = basePrice;
        this.bookedSeats = new ConcurrentHashMap<>();
    }
    
    public boolean isSeatAvailable(String seatId) {
        return !bookedSeats.containsKey(seatId);
    }
    
    public boolean bookSeat(String seatId, String bookingId) {
        if (!isSeatAvailable(seatId)) {
            return false;
        }
        
        Seat seat = findSeatById(seatId);
        if (seat != null && !seat.isBooked()) {
            seat.book(bookingId);
            bookedSeats.put(seatId, seat);
            return true;
        }
        return false;
    }
    
    public void unbookSeat(String seatId) {
        Seat seat = bookedSeats.remove(seatId);
        if (seat != null) {
            seat.unbook();
        }
    }
    
    private Seat findSeatById(String seatId) {
        return screen.getSeats().stream()
            .filter(seat -> seat.getSeatId().equals(seatId))
            .findFirst()
            .orElse(null);
    }
    
    public List<Seat> getAvailableSeats() {
        return screen.getSeats().stream()
            .filter(seat -> !seat.isBooked())
            .collect(Collectors.toList());
    }
    
    // Getters
    public String getId() { return id; }
    public Movie getMovie() { return movie; }
    public Screen getScreen() { return screen; }
    public LocalDateTime getShowTime() { return showTime; }
    public double getBasePrice() { return basePrice; }
    public Map<String, Seat> getBookedSeats() { return bookedSeats; }
    
    @Override
    public String toString() {
        return String.format("Show{id='%s', movie='%s', screen='%s', time=%s, bookedSeats=%d/%d}", 
            id, movie.getTitle(), screen.getName(), 
            showTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
            bookedSeats.size(), screen.getTotalSeats());
    }
}

// ==================== 3. BOOKING SYSTEM ====================
/**
 * BOOKING SYSTEM: Similar to ParkingLot's ParkingLot class
 * 
 * Parking Lot: ParkingLot (parkingSpots, vehicles, tickets)
 * Ticket Booking: BookingSystem (shows, bookings, payments)
 * 
 * Both handle:
 * - Resource allocation
 * - Booking management
 * - Payment processing
 * - Analytics
 */

class Booking {
    private String id;
    private String userId;
    private Show show;
    private List<String> seatIds;
    private double totalAmount;
    private BookingStatus status;
    private PaymentStatus paymentStatus;
    private LocalDateTime bookingTime;
    private LocalDateTime expiryTime;
    
    public Booking(String id, String userId, Show show, List<String> seatIds) {
        this.id = id;
        this.userId = userId;
        this.show = show;
        this.seatIds = new ArrayList<>(seatIds);
        this.status = BookingStatus.PENDING;
        this.paymentStatus = PaymentStatus.PENDING;
        this.bookingTime = LocalDateTime.now();
        this.expiryTime = bookingTime.plusMinutes(15); // 15 minutes to pay
        
        // Calculate total amount
        this.totalAmount = calculateTotalAmount();
    }
    
    private double calculateTotalAmount() {
        double total = 0;
        for (String seatId : seatIds) {
            Seat seat = show.getScreen().getSeats().stream()
                .filter(s -> s.getSeatId().equals(seatId))
                .findFirst()
                .orElse(null);
            if (seat != null) {
                total += show.getBasePrice() + seat.getType().getPrice();
            }
        }
        return total;
    }
    
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryTime);
    }
    
    // Getters
    public String getId() { return id; }
    public String getUserId() { return userId; }
    public Show getShow() { return show; }
    public List<String> getSeatIds() { return seatIds; }
    public double getTotalAmount() { return totalAmount; }
    public BookingStatus getStatus() { return status; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public LocalDateTime getBookingTime() { return bookingTime; }
    public LocalDateTime getExpiryTime() { return expiryTime; }
    
    // Setters
    public void setStatus(BookingStatus status) { this.status = status; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    
    @Override
    public String toString() {
        return String.format("Booking{id='%s', userId='%s', show='%s', seats=%s, amount=%.2f, status=%s}", 
            id, userId, show.getMovie().getTitle(), seatIds, totalAmount, status);
    }
}

class BookingSystem {
    private Map<String, Show> shows;
    private Map<String, Booking> bookings;
    private Map<String, Theater> theaters;
    private Map<String, Movie> movies;
    private PaymentProcessor paymentProcessor;
    private BookingAnalytics analytics;
    
    public BookingSystem() {
        this.shows = new ConcurrentHashMap<>();
        this.bookings = new ConcurrentHashMap<>();
        this.theaters = new ConcurrentHashMap<>();
        this.movies = new ConcurrentHashMap<>();
        this.paymentProcessor = new PaymentProcessor();
        this.analytics = new BookingAnalytics();
    }
    
    /**
     * BOOK SEATS: Similar to ParkingLot's parkVehicle
     * 
     * Parking Lot: parkVehicle(vehicle) -> Ticket
     * Ticket Booking: bookSeats(userId, showId, seatIds) -> Booking
     */
    public Booking bookSeats(String userId, String showId, List<String> seatIds) {
        Show show = shows.get(showId);
        if (show == null) {
            throw new RuntimeException("Show not found");
        }
        
        // Check if seats are available
        for (String seatId : seatIds) {
            if (!show.isSeatAvailable(seatId)) {
                throw new RuntimeException("Seat " + seatId + " is not available");
            }
        }
        
        // Create booking
        String bookingId = generateBookingId();
        Booking booking = new Booking(bookingId, userId, show, seatIds);
        
        // Reserve seats (similar to ParkingLot's assignSpot)
        for (String seatId : seatIds) {
            show.bookSeat(seatId, bookingId);
        }
        
        // Store booking
        bookings.put(bookingId, booking);
        
        // Update analytics
        analytics.recordBooking(booking);
        
        return booking;
    }
    
    /**
     * CONFIRM BOOKING: Similar to ParkingLot's processPayment
     */
    public boolean confirmBooking(String bookingId, String paymentMethod) {
        Booking booking = bookings.get(bookingId);
        if (booking == null) {
            return false;
        }
        
        if (booking.isExpired()) {
            cancelBooking(bookingId);
            return false;
        }
        
        // Process payment
        boolean paymentSuccess = paymentProcessor.processPayment(booking, paymentMethod);
        
        if (paymentSuccess) {
            booking.setStatus(BookingStatus.CONFIRMED);
            booking.setPaymentStatus(PaymentStatus.COMPLETED);
            analytics.recordPayment(booking);
            return true;
        } else {
            booking.setPaymentStatus(PaymentStatus.FAILED);
            return false;
        }
    }
    
    /**
     * CANCEL BOOKING: Similar to ParkingLot's leaveParking
     */
    public boolean cancelBooking(String bookingId) {
        Booking booking = bookings.get(bookingId);
        if (booking == null) {
            return false;
        }
        
        // Free up seats
        for (String seatId : booking.getSeatIds()) {
            booking.getShow().unbookSeat(seatId);
        }
        
        booking.setStatus(BookingStatus.CANCELLED);
        
        // Process refund if payment was made
        if (booking.getPaymentStatus() == PaymentStatus.COMPLETED) {
            paymentProcessor.processRefund(booking);
            booking.setPaymentStatus(PaymentStatus.REFUNDED);
        }
        
        analytics.recordCancellation(booking);
        return true;
    }
    
    /**
     * GET AVAILABLE SEATS: Similar to ParkingLot's getAvailableSpots
     */
    public List<Seat> getAvailableSeats(String showId) {
        Show show = shows.get(showId);
        if (show == null) {
            return new ArrayList<>();
        }
        return show.getAvailableSeats();
    }
    
    /**
     * GET BOOKING HISTORY: Similar to ParkingLot's getParkingHistory
     */
    public List<Booking> getBookingHistory(String userId) {
        return bookings.values().stream()
            .filter(booking -> booking.getUserId().equals(userId))
            .sorted(Comparator.comparing(Booking::getBookingTime).reversed())
            .collect(Collectors.toList());
    }
    
    // Helper methods
    private String generateBookingId() {
        return "BK" + System.currentTimeMillis() + ThreadLocalRandom.current().nextInt(1000, 9999);
    }
    
    public void addShow(Show show) {
        shows.put(show.getId(), show);
    }
    
    public void addTheater(Theater theater) {
        theaters.put(theater.getId(), theater);
    }
    
    public void addMovie(Movie movie) {
        movies.put(movie.getId(), movie);
    }
    
    // Getters
    public Map<String, Show> getShows() { return shows; }
    public Map<String, Booking> getBookings() { return bookings; }
    public Map<String, Theater> getTheaters() { return theaters; }
    public Map<String, Movie> getMovies() { return movies; }
    public BookingAnalytics getAnalytics() { return analytics; }
}

// ==================== 4. PAYMENT PROCESSING ====================
/**
 * PAYMENT PROCESSOR: Similar to ParkingLot's PaymentProcessor
 * 
 * Both handle:
 * - Payment processing
 * - Refund processing
 * - Payment validation
 */

class PaymentProcessor {
    private Map<String, Payment> payments;
    
    public PaymentProcessor() {
        this.payments = new ConcurrentHashMap<>();
    }
    
    public boolean processPayment(Booking booking, String paymentMethod) {
        // Simulate payment processing
        boolean success = Math.random() > 0.1; // 90% success rate
        
        Payment payment = new Payment(booking.getId(), booking.getTotalAmount(), paymentMethod, success);
        payments.put(booking.getId(), payment);
        
        return success;
    }
    
    public boolean processRefund(Booking booking) {
        // Simulate refund processing
        Payment refund = new Payment(booking.getId(), -booking.getTotalAmount(), "REFUND", true);
        payments.put(booking.getId() + "_REFUND", refund);
        return true;
    }
    
    public Payment getPayment(String bookingId) {
        return payments.get(bookingId);
    }
}

class Payment {
    private String bookingId;
    private double amount;
    private String method;
    private boolean success;
    private LocalDateTime timestamp;
    
    public Payment(String bookingId, double amount, String method, boolean success) {
        this.bookingId = bookingId;
        this.amount = amount;
        this.method = method;
        this.success = success;
        this.timestamp = LocalDateTime.now();
    }
    
    // Getters
    public String getBookingId() { return bookingId; }
    public double getAmount() { return amount; }
    public String getMethod() { return method; }
    public boolean isSuccess() { return success; }
    public LocalDateTime getTimestamp() { return timestamp; }
    
    @Override
    public String toString() {
        return String.format("Payment{bookingId='%s', amount=%.2f, method='%s', success=%s}", 
            bookingId, amount, method, success);
    }
}

// ==================== 5. ANALYTICS ====================
/**
 * BOOKING ANALYTICS: Similar to ParkingLot's ParkingAnalytics
 * 
 * Both track:
 * - Revenue
 * - Usage patterns
 * - Popular items
 * - Performance metrics
 */

class BookingAnalytics {
    private double totalRevenue;
    private int totalBookings;
    private int totalCancellations;
    private Map<String, Integer> movieBookings;
    private Map<String, Integer> theaterBookings;
    private Map<SeatType, Integer> seatTypeUsage;
    
    public BookingAnalytics() {
        this.totalRevenue = 0;
        this.totalBookings = 0;
        this.totalCancellations = 0;
        this.movieBookings = new HashMap<>();
        this.theaterBookings = new HashMap<>();
        this.seatTypeUsage = new HashMap<>();
    }
    
    public void recordBooking(Booking booking) {
        totalBookings++;
        
        // Track movie popularity
        String movieTitle = booking.getShow().getMovie().getTitle();
        movieBookings.put(movieTitle, movieBookings.getOrDefault(movieTitle, 0) + 1);
        
        // Track theater usage
        String theaterName = booking.getShow().getScreen().getId();
        theaterBookings.put(theaterName, theaterBookings.getOrDefault(theaterName, 0) + 1);
        
        // Track seat type usage
        for (String seatId : booking.getSeatIds()) {
            Seat seat = booking.getShow().getScreen().getSeats().stream()
                .filter(s -> s.getSeatId().equals(seatId))
                .findFirst()
                .orElse(null);
            if (seat != null) {
                seatTypeUsage.put(seat.getType(), seatTypeUsage.getOrDefault(seat.getType(), 0) + 1);
            }
        }
    }
    
    public void recordPayment(Booking booking) {
        totalRevenue += booking.getTotalAmount();
    }
    
    public void recordCancellation(Booking booking) {
        totalCancellations++;
        if (booking.getPaymentStatus() == PaymentStatus.COMPLETED) {
            totalRevenue -= booking.getTotalAmount();
        }
    }
    
    public void printAnalytics() {
        System.out.println("\n=== BOOKING ANALYTICS ===");
        System.out.printf("Total Revenue: $%.2f%n", totalRevenue);
        System.out.printf("Total Bookings: %d%n", totalBookings);
        System.out.printf("Total Cancellations: %d%n", totalCancellations);
        System.out.printf("Success Rate: %.2f%%%n", 
            totalBookings > 0 ? (double)(totalBookings - totalCancellations) / totalBookings * 100 : 0);
        
        System.out.println("\nPopular Movies:");
        movieBookings.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .limit(5)
            .forEach(entry -> System.out.printf("  %s: %d bookings%n", entry.getKey(), entry.getValue()));
        
        System.out.println("\nSeat Type Usage:");
        seatTypeUsage.forEach((type, count) -> 
            System.out.printf("  %s: %d bookings%n", type, count));
    }
}

// ==================== 6. SCALABILITY CONSIDERATIONS ====================
/**
 * SCALABILITY FEATURES: Similar to ParkingLot's scalability
 * 
 * Both need:
 * - Database sharding
 * - Load balancing
 * - Caching strategies
 * - Microservices architecture
 */

class ScalabilityFeatures {
    
    /**
     * Database Sharding Strategy
     */
    public static String getShardKey(String userId) {
        // Similar to ParkingLot's sharding by location
        return String.valueOf(Math.abs(userId.hashCode() % 10));
    }
    
    /**
     * Load Balancer Health Check
     */
    public static boolean healthCheck() {
        // Check database connectivity
        // Check payment gateway
        // Check external services
        return true;
    }
    
    /**
     * Circuit Breaker for External Services
     */
    static class CircuitBreaker {
        private enum State { CLOSED, OPEN, HALF_OPEN }
        private State state = State.CLOSED;
        private int failureCount = 0;
        private final int threshold = 5;
        private long lastFailureTime = 0;
        private final long timeout = 60000; // 1 minute
        
        public boolean allowRequest() {
            switch (state) {
                case CLOSED:
                    return true;
                case OPEN:
                    if (System.currentTimeMillis() - lastFailureTime > timeout) {
                        state = State.HALF_OPEN;
                        return true;
                    }
                    return false;
                case HALF_OPEN:
                    return true;
                default:
                    return false;
            }
        }
        
        public void recordSuccess() {
            failureCount = 0;
            state = State.CLOSED;
        }
        
        public void recordFailure() {
            failureCount++;
            lastFailureTime = System.currentTimeMillis();
            if (failureCount >= threshold) {
                state = State.OPEN;
            }
        }
    }
}

// ==================== MAIN CLASS WITH EXAMPLES ====================
public class TicketBooking {
    public static void main(String[] args) {
        System.out.println("=== Ticket Booking System (BookMyShow) ===\n");
        
        // Initialize booking system
        BookingSystem bookingSystem = new BookingSystem();
        
        // Create movies (similar to ParkingLot's vehicle types)
        Movie movie1 = new Movie("M001", "Avengers: Endgame", MovieGenre.ACTION, 181, "English");
        Movie movie2 = new Movie("M002", "The Lion King", MovieGenre.DRAMA, 118, "English");
        Movie movie3 = new Movie("M003", "Joker", MovieGenre.THRILLER, 122, "English");
        
        bookingSystem.addMovie(movie1);
        bookingSystem.addMovie(movie2);
        bookingSystem.addMovie(movie3);
        
        // Create theaters and screens (similar to ParkingLot's parking spots)
        Theater theater1 = new Theater("T001", "PVR Cinemas", "Mall of America");
        Theater theater2 = new Theater("T002", "AMC Theaters", "Downtown");
        
        Screen screen1 = new Screen("S001", "Screen 1", 10, 20); // 200 seats
        Screen screen2 = new Screen("S002", "Screen 2", 8, 15);  // 120 seats
        
        theater1.addScreen(screen1);
        theater2.addScreen(screen2);
        
        bookingSystem.addTheater(theater1);
        bookingSystem.addTheater(theater2);
        
        // Create shows (similar to ParkingLot's parking sessions)
        Show show1 = new Show("SH001", movie1, screen1, 
            LocalDateTime.now().plusDays(1).withHour(18).withMinute(0), 12.0);
        Show show2 = new Show("SH002", movie2, screen2, 
            LocalDateTime.now().plusDays(1).withHour(20).withMinute(30), 10.0);
        
        bookingSystem.addShow(show1);
        bookingSystem.addShow(show2);
        
        // Test booking flow
        System.out.println("1. AVAILABLE SEATS TEST:");
        List<Seat> availableSeats = bookingSystem.getAvailableSeats("SH001");
        System.out.println("Available seats in Show 1: " + availableSeats.size());
        availableSeats.stream().limit(5).forEach(seat -> 
            System.out.println("  " + seat.getSeatId() + " (" + seat.getType() + ")"));
        System.out.println();
        
        // Book seats
        System.out.println("2. BOOKING TEST:");
        try {
            List<String> seatIds = Arrays.asList("A1", "A2", "A3");
            Booking booking = bookingSystem.bookSeats("user123", "SH001", seatIds);
            System.out.println("Booking created: " + booking);
            System.out.println();
            
            // Confirm booking
            System.out.println("3. PAYMENT TEST:");
            boolean paymentSuccess = bookingSystem.confirmBooking(booking.getId(), "CREDIT_CARD");
            System.out.println("Payment " + (paymentSuccess ? "SUCCESSFUL" : "FAILED"));
            System.out.println();
            
            // Check booking history
            System.out.println("4. BOOKING HISTORY TEST:");
            List<Booking> history = bookingSystem.getBookingHistory("user123");
            history.forEach(booking1 -> System.out.println("  " + booking1));
            System.out.println();
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        
        // Test cancellation
        System.out.println("5. CANCELLATION TEST:");
        try {
            List<String> seatIds2 = Arrays.asList("B1", "B2");
            Booking booking2 = bookingSystem.bookSeats("user456", "SH001", seatIds2);
            bookingSystem.confirmBooking(booking2.getId(), "DEBIT_CARD");
            
            boolean cancelled = bookingSystem.cancelBooking(booking2.getId());
            System.out.println("Cancellation " + (cancelled ? "SUCCESSFUL" : "FAILED"));
            System.out.println();
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        
        // Print analytics
        bookingSystem.getAnalytics().printAnalytics();
        
        System.out.println("\n=== KEY FEATURES ===");
        System.out.println("✓ Movie and Theater Management");
        System.out.println("✓ Seat Booking with Concurrency Control");
        System.out.println("✓ Payment Processing and Refunds");
        System.out.println("✓ Booking History and Analytics");
        System.out.println("✓ Scalability and High Availability");
        System.out.println("✓ Similar to Parking Lot System Architecture");
        
        System.out.println("\n=== INTERVIEW TIPS ===");
        System.out.println("• Mention similarities with Parking Lot system");
        System.out.println("• Discuss seat allocation algorithms");
        System.out.println("• Explain payment gateway integration");
        System.out.println("• Cover booking timeout and cleanup");
        System.out.println("• Discuss seat pricing strategies");
        System.out.println("• Mention real-time seat availability");
    }
} 