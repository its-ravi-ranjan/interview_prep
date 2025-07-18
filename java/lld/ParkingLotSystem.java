/**
 * Parking Lot System Design - Amazon SDE2 Interview
 * 
 * ==================== REQUIREMENTS CLARIFICATION CHECKLIST ====================
 * 
 * BEFORE IMPLEMENTING, CLARIFY WITH INTERVIEWER:
 * 
 * 1. FUNCTIONAL REQUIREMENTS:
 *    ❓ Vehicle types? (Cars, motorcycles, trucks, buses?)
 *    ❓ Spot types? (Compact, large, handicap, EV charging?)
 *    ❓ Pricing model? (Hourly, daily, peak/off-peak, free first X hours?)
 *    ❓ Payment methods? (Cash, card, digital wallets, corporate billing?)
 * 
 * 2. SCALE & PERFORMANCE:
 *    ❓ Number of spots? (Small: 50 vs Large: 1000+)
 *    ❓ Concurrent usage? (Peak hours vs off-peak)
 *    ❓ Real-time updates needed? (Mobile app, digital displays?)
 * 
 * 3. USER EXPERIENCE:
 *    ❓ Entry/Exit mechanism? (Automatic gates, license plate recognition?)
 *    ❓ User accounts? (Regular customers, VIP, guest parking?)
 *    ❓ Receipt generation? (Email, print, digital?)
 * 
 * 4. TECHNICAL REQUIREMENTS:
 *    ❓ Data persistence? (Database, analytics, audit trails?)
 *    ❓ External integrations? (Payment gateways, accounting systems?)
 *    ❓ APIs needed? (Mobile apps, third-party integrations?)
 *    ❓ Security requirements? (Ticket validation, data privacy?)
 * 
 * 5. MONITORING & MAINTENANCE:
 *    ❓ System monitoring? (Health checks, error tracking, alerts?)
 *    ❓ Maintenance considerations? (Downtime handling, backups?)
 * 
 * ==================== EXTENSION FLOWS (FUTURE ENHANCEMENTS) ====================
 * 
 * 1. MULTI-LOCATION SUPPORT:
 *    Flow: ParkingLotManager → Multiple ParkingLot instances → Centralized billing
 *    - Location-specific pricing and rules
 *    - Cross-location vehicle tracking
 *    - Centralized reporting and analytics
 * 
 * 2. RESERVATION SYSTEM:
 *    Flow: User App → ReservationService → Spot allocation → Payment → Confirmation
 *    - Pre-book spots for specific times
 *    - Guaranteed parking for premium users
 *    - Dynamic pricing based on demand
 * 
 * 3. LICENSE PLATE RECOGNITION:
 *    Flow: Camera → OCR Service → Vehicle lookup → Automatic entry/exit
 *    - No physical tickets needed
 *    - Automatic billing to registered users
 *    - Enhanced security and tracking
 * 
 * 4. ELECTRIC VEHICLE CHARGING:
 *    Flow: EV Detection → Charging spot allocation → Charging service → Billing
 *    - Dedicated EV spots with charging stations
 *    - Separate billing for parking + charging
 *    - Charging status monitoring
 * 
 * 5. MOBILE APP INTEGRATION:
 *    Flow: App → API Gateway → ParkingLot Service → Real-time updates
 *    - Spot availability in real-time
 *    - Digital ticket generation
 *    - Payment processing
 *    - Navigation to available spots
 * 
 * 6. ANALYTICS & REPORTING:
 *    Flow: Data Collection → Analytics Engine → Dashboard → Business Insights
 *    - Occupancy patterns and trends
 *    - Revenue optimization
 *    - Peak hour analysis
 *    - Customer behavior insights
 * 
 * 7. LOYALTY & REWARDS:
 *    Flow: User Activity → Points Calculation → Rewards Engine → Benefits
 *    - Points for frequent parking
 *    - Discounts and free parking
 *    - Tier-based benefits (Bronze, Silver, Gold)
 * 
 * 8. CORPORATE ACCOUNTS:
 *    Flow: Company Registration → Employee Management → Billing → Reporting
 *    - Company-wide parking passes
 *    - Employee spot allocation
 *    - Corporate billing and expense tracking
 * 
 * 9. DISASTER RECOVERY:
 *    Flow: System Failure → Backup Detection → Service Switch → Data Sync
 *    - Redundant systems for high availability
 *    - Data backup and recovery
 *    - Graceful degradation during outages
 * 
 * 10. INTERNATIONALIZATION:
 *     Flow: User Locale → Localization Service → Currency/Pricing → Compliance
 *     - Multi-language support
 *     - Local currency and tax handling
 *     - Regional compliance requirements
 * 
 * This implementation demonstrates:
 * 1. Object-Oriented Design Principles
 * 2. Design Patterns (Strategy, Factory, Observer, Singleton)
 * 3. SOLID Principles
 * 4. Scalable Architecture
 * 5. Real-world System Design
 * 
 * Class Diagram:
 * ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
 * │   ParkingLot    │    │     Vehicle     │    │   ParkingSpot   │
 * ├─────────────────┤    ├─────────────────┤    ├─────────────────┤
 * │ - spots         │    │ - licensePlate  │    │ - spotId        │
 * │ - entryGates    │    │ - vehicleType   │    │ - vehicleType   │
 * │ - exitGates     │    │ - color         │    │ - isOccupied    │
 * │ - pricing       │    └─────────────────┘    │ - vehicle       │
 * │ + parkVehicle() │              ▲            └─────────────────┘
 * │ + exitVehicle() │              │
 * │ + getStatus()   │    ┌─────────────────┐
 * └─────────────────┘    │   Car/Motorcycle│
 *         │              │   /Truck        │
 *         │              └─────────────────┘
 *         │
 * ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
 * │  PricingStrategy│    │  PaymentMethod  │    │   Ticket        │
 * ├─────────────────┤    ├─────────────────┤    ├─────────────────┤
 * │ + calculateFee()│    │ + processPayment│    │ - ticketId      │
 * └─────────────────┘    │ + refund()      │    │ - entryTime     │
 *         ▲              └─────────────────┘    │ - exitTime      │
 *         │                       ▲              │ - vehicle       │
 * ┌─────────────────┐    ┌─────────────────┐    │ - amount        │
 * │Hourly/Daily/    │    │Cash/Card/UPI    │    └─────────────────┘
 * │WeeklyPricing    │    │/Wallet          │
 * └─────────────────┘    └─────────────────┘
 * 
 * Sequence Diagram for Parking:
 * 1. Vehicle arrives at Entry Gate
 * 2. System checks available spot
 * 3. Assigns spot and generates ticket
 * 4. Opens gate
 * 
 * Sequence Diagram for Exit:
 * 1. Vehicle arrives at Exit Gate
 * 2. System scans ticket
 * 3. Calculates fee based on duration
 * 4. Processes payment
 * 5. Frees spot and opens gate
 */

import java.util.*;
import java.time.LocalDateTime;
import java.time.Duration;

// ==================== ENUMS ====================
enum VehicleType {
    MOTORCYCLE(1), CAR(2), TRUCK(3);
    
    private final int size;
    
    VehicleType(int size) {
        this.size = size;
    }
    
    public int getSize() {
        return size;
    }
}

enum SpotType {
    MOTORCYCLE(1), COMPACT(2), LARGE(3);
    
    private final int size;
    
    SpotType(int size) {
        this.size = size;
    }
    
    public int getSize() {
        return size;
    }
}

enum PaymentMethod {
    CASH, CARD, UPI, WALLET
}

// ==================== CORE ENTITIES ====================
class Vehicle {
    private String licensePlate;
    private VehicleType vehicleType;
    private String color;
    
    public Vehicle(String licensePlate, VehicleType vehicleType, String color) {
        this.licensePlate = licensePlate;
        this.vehicleType = vehicleType;
        this.color = color;
    }
    
    // Getters
    public String getLicensePlate() { return licensePlate; }
    public VehicleType getVehicleType() { return vehicleType; }
    public String getColor() { return color; }
    
    @Override
    public String toString() {
        return String.format("%s %s (%s)", color, vehicleType, licensePlate);
    }
}

class ParkingSpot {
    private int spotId;
    private SpotType spotType;
    private boolean isOccupied;
    private Vehicle vehicle;
    private LocalDateTime occupiedAt;
    
    public ParkingSpot(int spotId, SpotType spotType) {
        this.spotId = spotId;
        this.spotType = spotType;
        this.isOccupied = false;
    }
    
    public boolean canFitVehicle(Vehicle vehicle) {
        return !isOccupied && spotType.getSize() >= vehicle.getVehicleType().getSize();
    }
    
    public void parkVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
        this.isOccupied = true;
        this.occupiedAt = LocalDateTime.now();
    }
    
    public Vehicle removeVehicle() {
        Vehicle removedVehicle = this.vehicle;
        this.vehicle = null;
        this.isOccupied = false;
        this.occupiedAt = null;
        return removedVehicle;
    }
    
    // Getters
    public int getSpotId() { return spotId; }
    public SpotType getSpotType() { return spotType; }
    public boolean isOccupied() { return isOccupied; }
    public Vehicle getVehicle() { return vehicle; }
    public LocalDateTime getOccupiedAt() { return occupiedAt; }
}

class Ticket {
    private String ticketId;
    private LocalDateTime entryTime;
    private LocalDateTime exitTime;
    private Vehicle vehicle;
    private ParkingSpot spot;
    private double amount;
    private boolean isPaid;
    
    public Ticket(String ticketId, Vehicle vehicle, ParkingSpot spot) {
        this.ticketId = ticketId;
        this.vehicle = vehicle;
        this.spot = spot;
        this.entryTime = LocalDateTime.now();
        this.isPaid = false;
    }
    
    public void exit() {
        this.exitTime = LocalDateTime.now();
    }
    
    public long getDurationInHours() {
        LocalDateTime endTime = exitTime != null ? exitTime : LocalDateTime.now();
        return Duration.between(entryTime, endTime).toHours();
    }
    
    // Getters and Setters
    public String getTicketId() { return ticketId; }
    public LocalDateTime getEntryTime() { return entryTime; }
    public LocalDateTime getExitTime() { return exitTime; }
    public Vehicle getVehicle() { return vehicle; }
    public ParkingSpot getSpot() { return spot; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public boolean isPaid() { return isPaid; }
    public void setPaid(boolean paid) { isPaid = paid; }
}

// ==================== DESIGN PATTERNS ====================

// Strategy Pattern for Pricing
interface PricingStrategy {
    double calculateFee(long durationInHours);
}

class HourlyPricing implements PricingStrategy {
    private double hourlyRate;
    
    public HourlyPricing(double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }
    
    @Override
    public double calculateFee(long durationInHours) {
        return Math.max(1, durationInHours) * hourlyRate;
    }
}

class DailyPricing implements PricingStrategy {
    private double dailyRate;
    
    public DailyPricing(double dailyRate) {
        this.dailyRate = dailyRate;
    }
    
    @Override
    public double calculateFee(long durationInHours) {
        long days = (durationInHours + 23) / 24; // Ceiling division
        return days * dailyRate;
    }
}

// Factory Pattern for Vehicle Creation
class VehicleFactory {
    public static Vehicle createVehicle(String licensePlate, VehicleType type, String color) {
        return new Vehicle(licensePlate, type, color);
    }
}

// Observer Pattern for Notifications
interface ParkingObserver {
    void onVehicleParked(Vehicle vehicle, ParkingSpot spot);
    void onVehicleExited(Vehicle vehicle, ParkingSpot spot);
}

class ParkingNotificationService implements ParkingObserver {
    @Override
    public void onVehicleParked(Vehicle vehicle, ParkingSpot spot) {
        System.out.println("🔔 Notification: " + vehicle + " parked at spot " + spot.getSpotId());
    }
    
    @Override
    public void onVehicleExited(Vehicle vehicle, ParkingSpot spot) {
        System.out.println("🔔 Notification: " + vehicle + " exited from spot " + spot.getSpotId());
    }
}

// Singleton Pattern for Parking Lot
class ParkingLot {
    private static ParkingLot instance;
    private Map<Integer, ParkingSpot> spots;
    private Map<String, Ticket> activeTickets;
    private List<ParkingObserver> observers;
    private PricingStrategy pricingStrategy;
    private int nextTicketId;
    
    private ParkingLot() {
        this.spots = new HashMap<>();
        this.activeTickets = new HashMap<>();
        this.observers = new ArrayList<>();
        this.pricingStrategy = new HourlyPricing(10.0); // $10 per hour
        this.nextTicketId = 1;
        initializeSpots();
    }
    
    public static ParkingLot getInstance() {
        if (instance == null) {
            instance = new ParkingLot();
        }
        return instance;
    }
    
    private void initializeSpots() {
        int spotId = 1;
        // Motorcycle spots
        for (int i = 0; i < 10; i++) {
            spots.put(spotId++, new ParkingSpot(spotId - 1, SpotType.MOTORCYCLE));
        }
        // Compact spots
        for (int i = 0; i < 20; i++) {
            spots.put(spotId++, new ParkingSpot(spotId - 1, SpotType.COMPACT));
        }
        // Large spots
        for (int i = 0; i < 10; i++) {
            spots.put(spotId++, new ParkingSpot(spotId - 1, SpotType.LARGE));
        }
    }
    
    public void addObserver(ParkingObserver observer) {
        observers.add(observer);
    }
    
    public void setPricingStrategy(PricingStrategy strategy) {
        this.pricingStrategy = strategy;
    }
    
    public Ticket parkVehicle(Vehicle vehicle) {
        ParkingSpot availableSpot = findAvailableSpot(vehicle);
        if (availableSpot == null) {
            throw new RuntimeException("No available spot for " + vehicle);
        }
        
        availableSpot.parkVehicle(vehicle);
        String ticketId = "T" + nextTicketId++;
        Ticket ticket = new Ticket(ticketId, vehicle, availableSpot);
        activeTickets.put(ticketId, ticket);
        
        notifyObserversParked(vehicle, availableSpot);
        return ticket;
    }
    
    public double exitVehicle(String ticketId) {
        Ticket ticket = activeTickets.get(ticketId);
        if (ticket == null) {
            throw new RuntimeException("Invalid ticket: " + ticketId);
        }
        
        ticket.exit();
        double fee = pricingStrategy.calculateFee(ticket.getDurationInHours());
        ticket.setAmount(fee);
        
        ParkingSpot spot = ticket.getSpot();
        Vehicle vehicle = spot.removeVehicle();
        activeTickets.remove(ticketId);
        
        notifyObserversExited(vehicle, spot);
        return fee;
    }
    
    private ParkingSpot findAvailableSpot(Vehicle vehicle) {
        return spots.values().stream()
                   .filter(spot -> spot.canFitVehicle(vehicle))
                   .findFirst()
                   .orElse(null);
    }
    
    private void notifyObserversParked(Vehicle vehicle, ParkingSpot spot) {
        for (ParkingObserver observer : observers) {
            observer.onVehicleParked(vehicle, spot);
        }
    }
    
    private void notifyObserversExited(Vehicle vehicle, ParkingSpot spot) {
        for (ParkingObserver observer : observers) {
            observer.onVehicleExited(vehicle, spot);
        }
    }
    
    public Map<SpotType, Long> getStatus() {
        Map<SpotType, Long> status = new HashMap<>();
        for (SpotType type : SpotType.values()) {
            long occupied = spots.values().stream()
                               .filter(spot -> spot.getSpotType() == type && spot.isOccupied())
                               .count();
            long total = spots.values().stream()
                            .filter(spot -> spot.getSpotType() == type)
                            .count();
            status.put(type, total - occupied);
        }
        return status;
    }
    
    public List<ParkingSpot> getOccupiedSpots() {
        return spots.values().stream()
                   .filter(ParkingSpot::isOccupied)
                   .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }
}

// Payment Processing
class PaymentProcessor {
    public boolean processPayment(double amount, PaymentMethod method) {
        System.out.println("💳 Processing payment of $" + amount + " via " + method);
        // Simulate payment processing
        return true;
    }
    
    public boolean refund(double amount, PaymentMethod method) {
        System.out.println("💰 Processing refund of $" + amount + " via " + method);
        return true;
    }
}

// ==================== MAIN CLASS WITH EXAMPLES ====================
public class ParkingLotSystem {
    public static void main(String[] args) {
        System.out.println("=== Parking Lot System Demo ===\n");
        
        // Get singleton instance
        ParkingLot parkingLot = ParkingLot.getInstance();
        
        // Add observer for notifications
        parkingLot.addObserver(new ParkingNotificationService());
        
        // Create vehicles
        Vehicle car1 = VehicleFactory.createVehicle("ABC123", VehicleType.CAR, "Red");
        Vehicle car2 = VehicleFactory.createVehicle("XYZ789", VehicleType.CAR, "Blue");
        Vehicle motorcycle = VehicleFactory.createVehicle("MOTO1", VehicleType.MOTORCYCLE, "Black");
        Vehicle truck = VehicleFactory.createVehicle("TRUCK1", VehicleType.TRUCK, "White");
        
        try {
            // Park vehicles
            System.out.println("🚗 Parking vehicles...");
            Ticket ticket1 = parkingLot.parkVehicle(car1);
            Ticket ticket2 = parkingLot.parkVehicle(car2);
            Ticket ticket3 = parkingLot.parkVehicle(motorcycle);
            Ticket ticket4 = parkingLot.parkVehicle(truck);
            
            // Show status
            System.out.println("\n📊 Parking Lot Status:");
            Map<SpotType, Long> status = parkingLot.getStatus();
            status.forEach((type, available) -> 
                System.out.println(type + ": " + available + " spots available"));
            
            // Simulate time passing
            System.out.println("\n⏰ Simulating 2 hours passing...");
            Thread.sleep(100); // Just for demo
            
            // Exit vehicles
            System.out.println("\n🚪 Vehicles exiting...");
            PaymentProcessor paymentProcessor = new PaymentProcessor();
            
            double fee1 = parkingLot.exitVehicle(ticket1.getTicketId());
            paymentProcessor.processPayment(fee1, PaymentMethod.CARD);
            
            double fee2 = parkingLot.exitVehicle(ticket2.getTicketId());
            paymentProcessor.processPayment(fee2, PaymentMethod.UPI);
            
            double fee3 = parkingLot.exitVehicle(ticket3.getTicketId());
            paymentProcessor.processPayment(fee3, PaymentMethod.CASH);
            
            // Show final status
            System.out.println("\n📊 Final Parking Lot Status:");
            status = parkingLot.getStatus();
            status.forEach((type, available) -> 
                System.out.println(type + ": " + available + " spots available"));
            
            // Demonstrate pricing strategy change
            System.out.println("\n💰 Changing to daily pricing...");
            parkingLot.setPricingStrategy(new DailyPricing(50.0)); // $50 per day
            
            // Try to park another vehicle
            Vehicle car5 = VehicleFactory.createVehicle("NEW1", VehicleType.CAR, "Green");
            Ticket ticket5 = parkingLot.parkVehicle(car5);
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        
        System.out.println("\n=== Design Patterns Used ===");
        System.out.println("1. Singleton: ParkingLot instance");
        System.out.println("2. Strategy: PricingStrategy (Hourly/Daily)");
        System.out.println("3. Factory: VehicleFactory");
        System.out.println("4. Observer: ParkingObserver for notifications");
        System.out.println("5. SOLID Principles: SRP, OCP, LSP, ISP, DIP");
    }
} 