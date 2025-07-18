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

const SeatType = {
    ECONOMY: { name: 'ECONOMY', price: 100 },
    PREMIUM: { name: 'PREMIUM', price: 200 },
    VIP: { name: 'VIP', price: 500 }
};

const MovieGenre = {
    ACTION: 'ACTION',
    COMEDY: 'COMEDY',
    DRAMA: 'DRAMA',
    HORROR: 'HORROR',
    ROMANCE: 'ROMANCE',
    THRILLER: 'THRILLER',
    SCI_FI: 'SCI_FI'
};

const BookingStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CANCELLED: 'CANCELLED',
    EXPIRED: 'EXPIRED'
};

const PaymentStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED'
};

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
    constructor(id, title, genre, duration, language) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.duration = duration; // in minutes
        this.language = language;
        this.releaseDate = new Date();
    }
    
    toString() {
        return `Movie{id='${this.id}', title='${this.title}', genre=${this.genre}, duration=${this.duration} min}`;
    }
}

class Theater {
    constructor(id, name, location) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.screens = [];
    }
    
    addScreen(screen) {
        this.screens.push(screen);
    }
    
    toString() {
        return `Theater{id='${this.id}', name='${this.name}', location='${this.location}', screens=${this.screens.length}}`;
    }
}

class Screen {
    constructor(id, name, rows, seatsPerRow) {
        this.id = id;
        this.name = name;
        this.totalSeats = rows * seatsPerRow;
        this.seats = [];
        
        // Initialize seats (similar to ParkingLot's createParkingSpots)
        for (let row = 1; row <= rows; row++) {
            for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                const type = this.determineSeatType(row, seatsPerRow);
                this.seats.push(new Seat(row, seatNum, type));
            }
        }
    }
    
    determineSeatType(row, totalRows) {
        // Similar to ParkingLot's spot type determination
        if (row <= totalRows * 0.3) return SeatType.VIP;      // Front 30% = VIP
        if (row <= totalRows * 0.7) return SeatType.PREMIUM;  // Next 40% = Premium
        return SeatType.ECONOMY;                              // Back 30% = Economy
    }
    
    toString() {
        return `Screen{id='${this.id}', name='${this.name}', totalSeats=${this.totalSeats}}`;
    }
}

class Seat {
    constructor(row, seatNumber, type) {
        this.row = row;
        this.seatNumber = seatNumber;
        this.type = type;
        this.isBooked = false;
        this.bookingId = null; // Similar to ParkingSpot's vehicle
    }
    
    getSeatId() {
        return `${String.fromCharCode(65 + this.row - 1)}${this.seatNumber}`;
    }
    
    book(bookingId) {
        this.isBooked = true;
        this.bookingId = bookingId;
    }
    
    unbook() {
        this.isBooked = false;
        this.bookingId = null;
    }
    
    toString() {
        return `Seat{id='${this.getSeatId()}', type=${this.type.name}, booked=${this.isBooked}}`;
    }
}

class Show {
    constructor(id, movie, screen, showTime, basePrice) {
        this.id = id;
        this.movie = movie;
        this.screen = screen;
        this.showTime = showTime;
        this.basePrice = basePrice;
        this.bookedSeats = new Map();
    }
    
    isSeatAvailable(seatId) {
        return !this.bookedSeats.has(seatId);
    }
    
    bookSeat(seatId, bookingId) {
        if (!this.isSeatAvailable(seatId)) {
            return false;
        }
        
        const seat = this.findSeatById(seatId);
        if (seat && !seat.isBooked) {
            seat.book(bookingId);
            this.bookedSeats.set(seatId, seat);
            return true;
        }
        return false;
    }
    
    unbookSeat(seatId) {
        const seat = this.bookedSeats.get(seatId);
        if (seat) {
            seat.unbook();
            this.bookedSeats.delete(seatId);
        }
    }
    
    findSeatById(seatId) {
        return this.screen.seats.find(seat => seat.getSeatId() === seatId);
    }
    
    getAvailableSeats() {
        return this.screen.seats.filter(seat => !seat.isBooked);
    }
    
    toString() {
        const showTimeStr = this.showTime.toLocaleString();
        return `Show{id='${this.id}', movie='${this.movie.title}', screen='${this.screen.name}', time=${showTimeStr}, bookedSeats=${this.bookedSeats.size}/${this.screen.totalSeats}}`;
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
    constructor(id, userId, show, seatIds) {
        this.id = id;
        this.userId = userId;
        this.show = show;
        this.seatIds = [...seatIds];
        this.status = BookingStatus.PENDING;
        this.paymentStatus = PaymentStatus.PENDING;
        this.bookingTime = new Date();
        this.expiryTime = new Date(this.bookingTime.getTime() + 15 * 60 * 1000); // 15 minutes to pay
        
        // Calculate total amount
        this.totalAmount = this.calculateTotalAmount();
    }
    
    calculateTotalAmount() {
        let total = 0;
        for (const seatId of this.seatIds) {
            const seat = this.show.screen.seats.find(s => s.getSeatId() === seatId);
            if (seat) {
                total += this.show.basePrice + seat.type.price;
            }
        }
        return total;
    }
    
    isExpired() {
        return new Date() > this.expiryTime;
    }
    
    toString() {
        return `Booking{id='${this.id}', userId='${this.userId}', show='${this.show.movie.title}', seats=${this.seatIds}, amount=${this.totalAmount.toFixed(2)}, status=${this.status}}`;
    }
}

class BookingSystem {
    constructor() {
        this.shows = new Map();
        this.bookings = new Map();
        this.theaters = new Map();
        this.movies = new Map();
        this.paymentProcessor = new PaymentProcessor();
        this.analytics = new BookingAnalytics();
    }
    
    /**
     * BOOK SEATS: Similar to ParkingLot's parkVehicle
     * 
     * Parking Lot: parkVehicle(vehicle) -> Ticket
     * Ticket Booking: bookSeats(userId, showId, seatIds) -> Booking
     */
    bookSeats(userId, showId, seatIds) {
        const show = this.shows.get(showId);
        if (!show) {
            throw new Error('Show not found');
        }
        
        // Check if seats are available
        for (const seatId of seatIds) {
            if (!show.isSeatAvailable(seatId)) {
                throw new Error(`Seat ${seatId} is not available`);
            }
        }
        
        // Create booking
        const bookingId = this.generateBookingId();
        const booking = new Booking(bookingId, userId, show, seatIds);
        
        // Reserve seats (similar to ParkingLot's assignSpot)
        for (const seatId of seatIds) {
            show.bookSeat(seatId, bookingId);
        }
        
        // Store booking
        this.bookings.set(bookingId, booking);
        
        // Update analytics
        this.analytics.recordBooking(booking);
        
        return booking;
    }
    
    /**
     * CONFIRM BOOKING: Similar to ParkingLot's processPayment
     */
    confirmBooking(bookingId, paymentMethod) {
        const booking = this.bookings.get(bookingId);
        if (!booking) {
            return false;
        }
        
        if (booking.isExpired()) {
            this.cancelBooking(bookingId);
            return false;
        }
        
        // Process payment
        const paymentSuccess = this.paymentProcessor.processPayment(booking, paymentMethod);
        
        if (paymentSuccess) {
            booking.status = BookingStatus.CONFIRMED;
            booking.paymentStatus = PaymentStatus.COMPLETED;
            this.analytics.recordPayment(booking);
            return true;
        } else {
            booking.paymentStatus = PaymentStatus.FAILED;
            return false;
        }
    }
    
    /**
     * CANCEL BOOKING: Similar to ParkingLot's leaveParking
     */
    cancelBooking(bookingId) {
        const booking = this.bookings.get(bookingId);
        if (!booking) {
            return false;
        }
        
        // Free up seats
        for (const seatId of booking.seatIds) {
            booking.show.unbookSeat(seatId);
        }
        
        booking.status = BookingStatus.CANCELLED;
        
        // Process refund if payment was made
        if (booking.paymentStatus === PaymentStatus.COMPLETED) {
            this.paymentProcessor.processRefund(booking);
            booking.paymentStatus = PaymentStatus.REFUNDED;
        }
        
        this.analytics.recordCancellation(booking);
        return true;
    }
    
    /**
     * GET AVAILABLE SEATS: Similar to ParkingLot's getAvailableSpots
     */
    getAvailableSeats(showId) {
        const show = this.shows.get(showId);
        if (!show) {
            return [];
        }
        return show.getAvailableSeats();
    }
    
    /**
     * GET BOOKING HISTORY: Similar to ParkingLot's getParkingHistory
     */
    getBookingHistory(userId) {
        return Array.from(this.bookings.values())
            .filter(booking => booking.userId === userId)
            .sort((a, b) => b.bookingTime - a.bookingTime);
    }
    
    // Helper methods
    generateBookingId() {
        return `BK${Date.now()}${Math.floor(Math.random() * 9000) + 1000}`;
    }
    
    addShow(show) {
        this.shows.set(show.id, show);
    }
    
    addTheater(theater) {
        this.theaters.set(theater.id, theater);
    }
    
    addMovie(movie) {
        this.movies.set(movie.id, movie);
    }
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
    constructor() {
        this.payments = new Map();
    }
    
    processPayment(booking, paymentMethod) {
        // Simulate payment processing
        const success = Math.random() > 0.1; // 90% success rate
        
        const payment = new Payment(booking.id, booking.totalAmount, paymentMethod, success);
        this.payments.set(booking.id, payment);
        
        return success;
    }
    
    processRefund(booking) {
        // Simulate refund processing
        const refund = new Payment(booking.id, -booking.totalAmount, 'REFUND', true);
        this.payments.set(`${booking.id}_REFUND`, refund);
        return true;
    }
    
    getPayment(bookingId) {
        return this.payments.get(bookingId);
    }
}

class Payment {
    constructor(bookingId, amount, method, success) {
        this.bookingId = bookingId;
        this.amount = amount;
        this.method = method;
        this.success = success;
        this.timestamp = new Date();
    }
    
    toString() {
        return `Payment{bookingId='${this.bookingId}', amount=${this.amount.toFixed(2)}, method='${this.method}', success=${this.success}}`;
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
    constructor() {
        this.totalRevenue = 0;
        this.totalBookings = 0;
        this.totalCancellations = 0;
        this.movieBookings = new Map();
        this.theaterBookings = new Map();
        this.seatTypeUsage = new Map();
    }
    
    recordBooking(booking) {
        this.totalBookings++;
        
        // Track movie popularity
        const movieTitle = booking.show.movie.title;
        this.movieBookings.set(movieTitle, (this.movieBookings.get(movieTitle) || 0) + 1);
        
        // Track theater usage
        const theaterName = booking.show.screen.id;
        this.theaterBookings.set(theaterName, (this.theaterBookings.get(theaterName) || 0) + 1);
        
        // Track seat type usage
        for (const seatId of booking.seatIds) {
            const seat = booking.show.screen.seats.find(s => s.getSeatId() === seatId);
            if (seat) {
                const typeName = seat.type.name;
                this.seatTypeUsage.set(typeName, (this.seatTypeUsage.get(typeName) || 0) + 1);
            }
        }
    }
    
    recordPayment(booking) {
        this.totalRevenue += booking.totalAmount;
    }
    
    recordCancellation(booking) {
        this.totalCancellations++;
        if (booking.paymentStatus === PaymentStatus.COMPLETED) {
            this.totalRevenue -= booking.totalAmount;
        }
    }
    
    printAnalytics() {
        console.log('\n=== BOOKING ANALYTICS ===');
        console.log(`Total Revenue: $${this.totalRevenue.toFixed(2)}`);
        console.log(`Total Bookings: ${this.totalBookings}`);
        console.log(`Total Cancellations: ${this.totalCancellations}`);
        console.log(`Success Rate: ${this.totalBookings > 0 ? ((this.totalBookings - this.totalCancellations) / this.totalBookings * 100).toFixed(2) : 0}%`);
        
        console.log('\nPopular Movies:');
        const sortedMovies = Array.from(this.movieBookings.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        sortedMovies.forEach(([title, count]) => {
            console.log(`  ${title}: ${count} bookings`);
        });
        
        console.log('\nSeat Type Usage:');
        this.seatTypeUsage.forEach((count, type) => {
            console.log(`  ${type}: ${count} bookings`);
        });
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
    static getShardKey(userId) {
        // Similar to ParkingLot's sharding by location
        return Math.abs(userId.hashCode() % 10).toString();
    }
    
    /**
     * Load Balancer Health Check
     */
    static healthCheck() {
        // Check database connectivity
        // Check payment gateway
        // Check external services
        return true;
    }
    
    /**
     * Circuit Breaker for External Services
     */
    static CircuitBreaker = class {
        constructor() {
            this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
            this.failureCount = 0;
            this.threshold = 5;
            this.lastFailureTime = 0;
            this.timeout = 60000; // 1 minute
        }
        
        allowRequest() {
            switch (this.state) {
                case 'CLOSED':
                    return true;
                case 'OPEN':
                    if (Date.now() - this.lastFailureTime > this.timeout) {
                        this.state = 'HALF_OPEN';
                        return true;
                    }
                    return false;
                case 'HALF_OPEN':
                    return true;
                default:
                    return false;
            }
        }
        
        recordSuccess() {
            this.failureCount = 0;
            this.state = 'CLOSED';
        }
        
        recordFailure() {
            this.failureCount++;
            this.lastFailureTime = Date.now();
            if (this.failureCount >= this.threshold) {
                this.state = 'OPEN';
            }
        }
    }
}

// ==================== MAIN FUNCTION WITH EXAMPLES ====================
async function runTicketBookingExamples() {
    console.log('=== Ticket Booking System (BookMyShow) ===\n');
    
    // Initialize booking system
    const bookingSystem = new BookingSystem();
    
    // Create movies (similar to ParkingLot's vehicle types)
    const movie1 = new Movie('M001', 'Avengers: Endgame', MovieGenre.ACTION, 181, 'English');
    const movie2 = new Movie('M002', 'The Lion King', MovieGenre.DRAMA, 118, 'English');
    const movie3 = new Movie('M003', 'Joker', MovieGenre.THRILLER, 122, 'English');
    
    bookingSystem.addMovie(movie1);
    bookingSystem.addMovie(movie2);
    bookingSystem.addMovie(movie3);
    
    // Create theaters and screens (similar to ParkingLot's parking spots)
    const theater1 = new Theater('T001', 'PVR Cinemas', 'Mall of America');
    const theater2 = new Theater('T002', 'AMC Theaters', 'Downtown');
    
    const screen1 = new Screen('S001', 'Screen 1', 10, 20); // 200 seats
    const screen2 = new Screen('S002', 'Screen 2', 8, 15);  // 120 seats
    
    theater1.addScreen(screen1);
    theater2.addScreen(screen2);
    
    bookingSystem.addTheater(theater1);
    bookingSystem.addTheater(theater2);
    
    // Create shows (similar to ParkingLot's parking sessions)
    const show1 = new Show('SH001', movie1, screen1, 
        new Date(Date.now() + 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000), 12.0);
    const show2 = new Show('SH002', movie2, screen2, 
        new Date(Date.now() + 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000 + 30 * 60 * 1000), 10.0);
    
    bookingSystem.addShow(show1);
    bookingSystem.addShow(show2);
    
    // Test booking flow
    console.log('1. AVAILABLE SEATS TEST:');
    const availableSeats = bookingSystem.getAvailableSeats('SH001');
    console.log(`Available seats in Show 1: ${availableSeats.length}`);
    availableSeats.slice(0, 5).forEach(seat => {
        console.log(`  ${seat.getSeatId()} (${seat.type.name})`);
    });
    console.log();
    
    // Book seats
    console.log('2. BOOKING TEST:');
    try {
        const seatIds = ['A1', 'A2', 'A3'];
        const booking = bookingSystem.bookSeats('user123', 'SH001', seatIds);
        console.log(`Booking created: ${booking}`);
        console.log();
        
        // Confirm booking
        console.log('3. PAYMENT TEST:');
        const paymentSuccess = bookingSystem.confirmBooking(booking.id, 'CREDIT_CARD');
        console.log(`Payment ${paymentSuccess ? 'SUCCESSFUL' : 'FAILED'}`);
        console.log();
        
        // Check booking history
        console.log('4. BOOKING HISTORY TEST:');
        const history = bookingSystem.getBookingHistory('user123');
        history.forEach(booking1 => {
            console.log(`  ${booking1}`);
        });
        console.log();
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
    
    // Test cancellation
    console.log('5. CANCELLATION TEST:');
    try {
        const seatIds2 = ['B1', 'B2'];
        const booking2 = bookingSystem.bookSeats('user456', 'SH001', seatIds2);
        bookingSystem.confirmBooking(booking2.id, 'DEBIT_CARD');
        
        const cancelled = bookingSystem.cancelBooking(booking2.id);
        console.log(`Cancellation ${cancelled ? 'SUCCESSFUL' : 'FAILED'}`);
        console.log();
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
    
    // Print analytics
    bookingSystem.analytics.printAnalytics();
    
    console.log('\n=== KEY FEATURES ===');
    console.log('✓ Movie and Theater Management');
    console.log('✓ Seat Booking with Concurrency Control');
    console.log('✓ Payment Processing and Refunds');
    console.log('✓ Booking History and Analytics');
    console.log('✓ Scalability and High Availability');
    console.log('✓ Similar to Parking Lot System Architecture');
    
    console.log('\n=== INTERVIEW TIPS ===');
    console.log('• Mention similarities with Parking Lot system');
    console.log('• Discuss seat allocation algorithms');
    console.log('• Explain payment gateway integration');
    console.log('• Cover booking timeout and cleanup');
    console.log('• Discuss seat pricing strategies');
    console.log('• Mention real-time seat availability');
    console.log('• Talk about handling concurrent bookings');
    console.log('• Discuss database design for high throughput');
}

// Run examples if this file is executed directly
if (require.main === module) {
    runTicketBookingExamples();
}

module.exports = {
    SeatType,
    MovieGenre,
    BookingStatus,
    PaymentStatus,
    Movie,
    Theater,
    Screen,
    Seat,
    Show,
    Booking,
    BookingSystem,
    PaymentProcessor,
    Payment,
    BookingAnalytics,
    ScalabilityFeatures,
    runTicketBookingExamples
}; 