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
 * │ - activeTickets │    │ - vehicleType   │    │ - spotType      │
 * │ - observers     │    │ - color         │    │ - isOccupied    │
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

// ==================== ENUMS ====================
const VehicleType = {
    MOTORCYCLE: { name: 'MOTORCYCLE', size: 1 },
    CAR: { name: 'CAR', size: 2 },
    TRUCK: { name: 'TRUCK', size: 3 }
};

const SpotType = {
    MOTORCYCLE: { name: 'MOTORCYCLE', size: 1 },
    COMPACT: { name: 'COMPACT', size: 2 },
    LARGE: { name: 'LARGE', size: 3 }
};

const PaymentMethod = {
    CASH: 'CASH',
    CARD: 'CARD',
    UPI: 'UPI',
    WALLET: 'WALLET'
};

// ==================== CORE ENTITIES ====================
class Vehicle {
    constructor(licensePlate, vehicleType, color) {
        this.licensePlate = licensePlate;
        this.vehicleType = vehicleType;
        this.color = color;
    }
    
    toString() {
        return `${this.color} ${this.vehicleType.name} (${this.licensePlate})`;
    }
}

class ParkingSpot {
    constructor(spotId, spotType) {
        this.spotId = spotId;
        this.spotType = spotType;
        this.isOccupied = false;
        this.vehicle = null;
        this.occupiedAt = null;
    }
    
    canFitVehicle(vehicle) {
        return !this.isOccupied && this.spotType.size >= vehicle.vehicleType.size;
    }
    
    parkVehicle(vehicle) {
        this.vehicle = vehicle;
        this.isOccupied = true;
        this.occupiedAt = new Date();
    }
    
    removeVehicle() {
        const removedVehicle = this.vehicle;
        this.vehicle = null;
        this.isOccupied = false;
        this.occupiedAt = null;
        return removedVehicle;
    }
}

class Ticket {
    constructor(ticketId, vehicle, spot) {
        this.ticketId = ticketId;
        this.vehicle = vehicle;
        this.spot = spot;
        this.entryTime = new Date();
        this.exitTime = null;
        this.amount = 0;
        this.isPaid = false;
    }
    
    exit() {
        this.exitTime = new Date();
    }
    
    getDurationInHours() {
        const endTime = this.exitTime || new Date();
        const durationMs = endTime - this.entryTime;
        return Math.ceil(durationMs / (1000 * 60 * 60)); // Convert to hours
    }
}

// ==================== DESIGN PATTERNS ====================

// Strategy Pattern for Pricing
class PricingStrategy {
    calculateFee(durationInHours) {
        throw new Error('calculateFee must be implemented');
    }
}

class HourlyPricing extends PricingStrategy {
    constructor(hourlyRate) {
        super();
        this.hourlyRate = hourlyRate;
    }
    
    calculateFee(durationInHours) {
        return Math.max(1, durationInHours) * this.hourlyRate;
    }
}

class DailyPricing extends PricingStrategy {
    constructor(dailyRate) {
        super();
        this.dailyRate = dailyRate;
    }
    
    calculateFee(durationInHours) {
        const days = Math.ceil(durationInHours / 24);
        return days * this.dailyRate;
    }
}

// Factory Pattern for Vehicle Creation
class VehicleFactory {
    static createVehicle(licensePlate, vehicleType, color) {
        return new Vehicle(licensePlate, vehicleType, color);
    }
}

// Observer Pattern for Notifications
class ParkingObserver {
    onVehicleParked(vehicle, spot) {
        throw new Error('onVehicleParked must be implemented');
    }
    
    onVehicleExited(vehicle, spot) {
        throw new Error('onVehicleExited must be implemented');
    }
}

class ParkingNotificationService extends ParkingObserver {
    onVehicleParked(vehicle, spot) {
        console.log(`🔔 Notification: ${vehicle} parked at spot ${spot.spotId}`);
    }
    
    onVehicleExited(vehicle, spot) {
        console.log(`🔔 Notification: ${vehicle} exited from spot ${spot.spotId}`);
    }
}

// Singleton Pattern for Parking Lot
class ParkingLot {
    constructor() {
        if (ParkingLot.instance) {
            return ParkingLot.instance;
        }
        
        this.spots = new Map();
        this.activeTickets = new Map();
        this.observers = [];
        this.pricingStrategy = new HourlyPricing(10.0); // $10 per hour
        this.nextTicketId = 1;
        
        this.initializeSpots();
        ParkingLot.instance = this;
    }
    
    static getInstance() {
        if (!ParkingLot.instance) {
            ParkingLot.instance = new ParkingLot();
        }
        return ParkingLot.instance;
    }
    
    initializeSpots() {
        let spotId = 1;
        
        // Motorcycle spots
        for (let i = 0; i < 10; i++) {
            this.spots.set(spotId++, new ParkingSpot(spotId - 1, SpotType.MOTORCYCLE));
        }
        
        // Compact spots
        for (let i = 0; i < 20; i++) {
            this.spots.set(spotId++, new ParkingSpot(spotId - 1, SpotType.COMPACT));
        }
        
        // Large spots
        for (let i = 0; i < 10; i++) {
            this.spots.set(spotId++, new ParkingSpot(spotId - 1, SpotType.LARGE));
        }
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    setPricingStrategy(strategy) {
        this.pricingStrategy = strategy;
    }
    
    parkVehicle(vehicle) {
        const availableSpot = this.findAvailableSpot(vehicle);
        if (!availableSpot) {
            throw new Error(`No available spot for ${vehicle}`);
        }
        
        availableSpot.parkVehicle(vehicle);
        const ticketId = `T${this.nextTicketId++}`;
        const ticket = new Ticket(ticketId, vehicle, availableSpot);
        this.activeTickets.set(ticketId, ticket);
        
        this.notifyObserversParked(vehicle, availableSpot);
        return ticket;
    }
    
    exitVehicle(ticketId) {
        const ticket = this.activeTickets.get(ticketId);
        if (!ticket) {
            throw new Error(`Invalid ticket: ${ticketId}`);
        }
        
        ticket.exit();
        const fee = this.pricingStrategy.calculateFee(ticket.getDurationInHours());
        ticket.amount = fee;
        
        const spot = ticket.spot;
        const vehicle = spot.removeVehicle();
        this.activeTickets.delete(ticketId);
        
        this.notifyObserversExited(vehicle, spot);
        return fee;
    }
    
    findAvailableSpot(vehicle) {
        for (const spot of this.spots.values()) {
            if (spot.canFitVehicle(vehicle)) {
                return spot;
            }
        }
        return null;
    }
    
    notifyObserversParked(vehicle, spot) {
        this.observers.forEach(observer => {
            observer.onVehicleParked(vehicle, spot);
        });
    }
    
    notifyObserversExited(vehicle, spot) {
        this.observers.forEach(observer => {
            observer.onVehicleExited(vehicle, spot);
        });
    }
    
    getStatus() {
        const status = {};
        const spotTypes = Object.values(SpotType);
        
        for (const spotType of spotTypes) {
            let occupied = 0;
            let total = 0;
            
            for (const spot of this.spots.values()) {
                if (spot.spotType.name === spotType.name) {
                    total++;
                    if (spot.isOccupied) {
                        occupied++;
                    }
                }
            }
            
            status[spotType.name] = total - occupied;
        }
        
        return status;
    }
    
    getOccupiedSpots() {
        return Array.from(this.spots.values()).filter(spot => spot.isOccupied);
    }
}

// Payment Processing
class PaymentProcessor {
    processPayment(amount, method) {
        console.log(`💳 Processing payment of $${amount} via ${method}`);
        // Simulate payment processing
        return true;
    }
    
    refund(amount, method) {
        console.log(`💰 Processing refund of $${amount} via ${method}`);
        return true;
    }
}

// ==================== MAIN FUNCTION WITH EXAMPLES ====================
function runParkingLotDemo() {
    console.log('=== Parking Lot System Demo ===\n');
    
    // Get singleton instance
    const parkingLot = ParkingLot.getInstance();
    
    // Add observer for notifications
    parkingLot.addObserver(new ParkingNotificationService());
    
    // Create vehicles
    const car1 = VehicleFactory.createVehicle('ABC123', VehicleType.CAR, 'Red');
    const car2 = VehicleFactory.createVehicle('XYZ789', VehicleType.CAR, 'Blue');
    const motorcycle = VehicleFactory.createVehicle('MOTO1', VehicleType.MOTORCYCLE, 'Black');
    const truck = VehicleFactory.createVehicle('TRUCK1', VehicleType.TRUCK, 'White');
    
    try {
        // Park vehicles
        console.log('🚗 Parking vehicles...');
        const ticket1 = parkingLot.parkVehicle(car1);
        const ticket2 = parkingLot.parkVehicle(car2);
        const ticket3 = parkingLot.parkVehicle(motorcycle);
        const ticket4 = parkingLot.parkVehicle(truck);
        
        // Show status
        console.log('\n📊 Parking Lot Status:');
        const status = parkingLot.getStatus();
        Object.entries(status).forEach(([type, available]) => {
            console.log(`${type}: ${available} spots available`);
        });
        
        // Simulate time passing
        console.log('\n⏰ Simulating 2 hours passing...');
        
        // Exit vehicles
        console.log('\n🚪 Vehicles exiting...');
        const paymentProcessor = new PaymentProcessor();
        
        const fee1 = parkingLot.exitVehicle(ticket1.ticketId);
        paymentProcessor.processPayment(fee1, PaymentMethod.CARD);
        
        const fee2 = parkingLot.exitVehicle(ticket2.ticketId);
        paymentProcessor.processPayment(fee2, PaymentMethod.UPI);
        
        const fee3 = parkingLot.exitVehicle(ticket3.ticketId);
        paymentProcessor.processPayment(fee3, PaymentMethod.CASH);
        
        // Show final status
        console.log('\n📊 Final Parking Lot Status:');
        const finalStatus = parkingLot.getStatus();
        Object.entries(finalStatus).forEach(([type, available]) => {
            console.log(`${type}: ${available} spots available`);
        });
        
        // Demonstrate pricing strategy change
        console.log('\n💰 Changing to daily pricing...');
        parkingLot.setPricingStrategy(new DailyPricing(50.0)); // $50 per day
        
        // Try to park another vehicle
        const car5 = VehicleFactory.createVehicle('NEW1', VehicleType.CAR, 'Green');
        const ticket5 = parkingLot.parkVehicle(car5);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
    
    console.log('\n=== Design Patterns Used ===');
    console.log('1. Singleton: ParkingLot instance');
    console.log('2. Strategy: PricingStrategy (Hourly/Daily)');
    console.log('3. Factory: VehicleFactory');
    console.log('4. Observer: ParkingObserver for notifications');
    console.log('5. SOLID Principles: SRP, OCP, LSP, ISP, DIP');
}

// Run demo if this file is executed directly
if (require.main === module) {
    runParkingLotDemo();
}

module.exports = {
    // Core classes
    Vehicle,
    ParkingSpot,
    Ticket,
    ParkingLot,
    
    // Design patterns
    PricingStrategy,
    HourlyPricing,
    DailyPricing,
    VehicleFactory,
    ParkingObserver,
    ParkingNotificationService,
    
    // Utilities
    PaymentProcessor,
    
    // Enums
    VehicleType,
    SpotType,
    PaymentMethod,
    
    // Main function
    runParkingLotDemo
}; 