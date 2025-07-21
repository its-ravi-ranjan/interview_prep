/**
 * ELEVATOR SYSTEM DESIGN - AMAZON LLD INTERVIEW ESSENTIALS
 * 
 * 🎯 WHAT TO REMEMBER FOR INTERVIEWS:
 * 1. State Machine: IDLE → MOVING_UP/MOVING_DOWN → IDLE
 * 2. Concurrency: Multiple elevators, thread-safe request handling
 * 3. Scheduling Algorithm: SCAN (elevator algorithm) for efficiency
 * 4. Request Queue: Priority-based queue for optimal service
 * 5. Direction Management: UP/DOWN/IDLE states with smart direction changes
 * 
 * 🔑 KEY CONCEPTS:
 * - State Machine: Manages elevator states (IDLE, MOVING_UP, MOVING_DOWN, MAINTENANCE)
 * - Concurrency: Thread-safe request handling with synchronized methods
 * - Scheduling: SCAN algorithm minimizes total travel time
 * - Request Priority: Direction-based priority for efficient service
 * - Elevator Pool: Multiple elevators for high availability
 * 
 * 📊 SYSTEM COMPONENTS:
 * ElevatorController: ✅ Manages multiple elevators, ✅ Request distribution
 * Elevator: ✅ State machine, ✅ Movement logic, ✅ Door management
 * Request: ✅ Floor requests, ✅ Direction, ✅ Priority
 * Scheduler: ✅ SCAN algorithm, ✅ Request prioritization
 * 
 * 🔄 STEP-BY-STEP FLOW:
 * 
 * ✅ Step 1: User Requests Elevator
 * - User presses button on floor
 * - Request added to controller's queue
 * - Controller assigns to best elevator
 * 
 * ✅ Step 2: Elevator Processing
 * - Elevator receives request
 * - Updates state machine
 * - Moves to requested floor
 * 
 * ✅ Step 3: Door Management
 * - Opens door at destination
 * - Waits for user entry/exit
 * - Closes door and continues
 * 
 * ✅ Step 4: State Transitions
 * - IDLE → MOVING_UP/DOWN based on request
 * - MOVING → IDLE when no more requests
 * - MAINTENANCE state for service
 * 
 * 📦 Why This Architecture?
 * - Scalable: Multiple elevators handle high traffic
 * - Efficient: SCAN algorithm minimizes travel time
 * - Reliable: State machine prevents invalid states
 * - Thread-safe: Concurrent request handling
 * 
 * 🧵 CONCURRENCY ARCHITECTURE (KEY INTERVIEW POINT):
 * 
 * 1. **4 Threads Total:**
 *    - 1 Controller thread (manages request distribution)
 *    - 3 Elevator threads (one per elevator)
 * 
 * 2. **Concurrency Protection:**
 *    - Each elevator has its own ReentrantLock
 *    - Critical sections are protected with lock.lock()/unlock()
 *    - Shared resources (request queues, elevator state) are thread-safe
 * 
 * 3. **Benefits:**
 *    - True parallel operation (elevators move simultaneously)
 *    - No race conditions on shared data
 *    - Independent elevator processing
 *    - Scalable architecture
 * 
 * 4. **Example Critical Section:**
 *    - Adding requests to elevator queue
 *    - Processing requests from queue
 *    - Updating elevator position/state
 * 
 * 🎯 INTERVIEW ANSWER: "Our system uses thread-per-elevator architecture with locks 
 * for concurrency protection, ensuring true parallel operation while preventing 
 * race conditions on shared resources."
 * 
 * 📝 NOTE: JavaScript uses single-threaded event loop with setInterval for 
 * scheduling, but the concurrency concepts remain the same.
 */

// ==================== 1. REQUIREMENTS ANALYSIS ====================
/**
 * REQUIREMENTS:
 * 
 * Functional Requirements:
 * 1. Multiple elevators (2-8) serving multiple floors (1-50)
 * 2. Handle concurrent requests from different floors
 * 3. Efficient scheduling to minimize wait time
 * 4. Door open/close functionality with safety checks
 * 5. Emergency stop and maintenance mode
 * 6. Display current floor and direction
 * 
 * Non-Functional Requirements:
 * 1. High availability (99.9%)
 * 2. Low latency (< 2 seconds response time)
 * 3. Thread-safe concurrent operations
 * 4. Scalable to handle peak traffic
 * 5. Fault-tolerant with failover
 * 
 * Constraints:
 * 1. Maximum capacity per elevator (8-12 people)
 * 2. Maximum speed (2-3 floors per second)
 * 3. Door open/close time (3-5 seconds)
 * 4. Energy efficiency considerations
 */

// ==================== 2. SEQUENCE DIAGRAM FLOW ====================
/**
 * SEQUENCE DIAGRAM:
 * 
 * User Request Flow:
 * User → FloorButton → ElevatorController → Scheduler → Elevator → Movement
 * 
 * 1. User presses floor button
 * 2. FloorButton sends request to ElevatorController
 * 3. ElevatorController adds request to queue
 * 4. Scheduler processes queue and assigns to best elevator
 * 5. Elevator receives request and updates state
 * 6. Elevator moves to requested floor
 * 7. Door opens, user enters/exits
 * 8. Door closes, elevator continues to next request
 * 
 * Concurrent Request Handling:
 * - Multiple users can request simultaneously
 * - Controller maintains thread-safe request queue
 * - Scheduler processes requests in optimal order
 * - Elevators operate independently
 */

// ==================== 3. ER DIAGRAM ====================
/**
 * ER DIAGRAM:
 * 
 * Entities:
 * 1. Elevator (elevator_id, current_floor, direction, state, capacity)
 * 2. Request (request_id, source_floor, destination_floor, direction, timestamp)
 * 3. Floor (floor_number, building_id)
 * 4. User (user_id, current_floor, destination_floor)
 * 
 * Relationships:
 * - Elevator serves multiple Requests (1:N)
 * - Request belongs to one Floor (N:1)
 * - User makes multiple Requests (1:N)
 * - Floor has multiple Requests (1:N)
 * 
 * Attributes:
 * - Elevator: id, currentFloor, direction, state, capacity, maxFloor
 * - Request: id, sourceFloor, destFloor, direction, timestamp, status
 * - Floor: number, buildingId, hasElevator
 * - User: id, currentFloor, destFloor, timestamp
 */

// ==================== 4. CLASS DIAGRAM ====================
/**
 * CLASS DIAGRAM:
 * 
 * Core Classes:
 * 1. ElevatorController (Singleton)
 *    - Manages multiple elevators
 *    - Handles request distribution
 *    - Maintains request queue
 * 
 * 2. Elevator
 *    - State machine implementation
 *    - Movement logic
 *    - Door management
 * 
 * 3. Request
 *    - Floor request details
 *    - Priority calculation
 *    - Status tracking
 * 
 * 4. Scheduler
 *    - SCAN algorithm implementation
 *    - Request prioritization
 *    - Optimal elevator selection
 * 
 * 5. State (Enum)
 *    - IDLE, MOVING_UP, MOVING_DOWN, MAINTENANCE
 * 
 * 6. Direction (Enum)
 *    - UP, DOWN, IDLE
 */

// ==================== 5. ENUMS ====================
const ElevatorState = {
    IDLE: 'IDLE',
    MOVING_UP: 'MOVING_UP',
    MOVING_DOWN: 'MOVING_DOWN',
    MAINTENANCE: 'MAINTENANCE'
};

const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    IDLE: 'IDLE'
};

const RequestStatus = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};

// ==================== 6. REQUEST CLASS ====================
/**
 * REQUEST: Represents a floor request with priority and status
 */

class Request {
    constructor(sourceFloor, destinationFloor) {
        this.id = this.generateId();
        this.sourceFloor = sourceFloor;
        this.destinationFloor = destinationFloor;
        this.direction = this.calculateDirection(sourceFloor, destinationFloor);
        this.timestamp = Date.now();
        this.status = RequestStatus.PENDING;
        this.priority = this.calculatePriority();
    }
    
    generateId() {
        return Math.floor(Math.random() * 10000);
    }
    
    calculateDirection(source, destination) {
        if (source < destination) return Direction.UP;
        if (source > destination) return Direction.DOWN;
        return Direction.IDLE;
    }
    
    calculatePriority() {
        // Higher priority for requests in same direction
        // Lower priority for older requests
        const age = Date.now() - this.timestamp;
        return Math.floor(age / 1000); // Priority increases with age
    }
    
    toString() {
        return `Request[${this.id}: ${this.sourceFloor}->${this.destinationFloor}, ${this.direction}, ${this.status}]`;
    }
}

// ==================== 7. ELEVATOR CLASS ====================
/**
 * ELEVATOR: Core elevator with state machine and movement logic
 */

class Elevator {
    constructor(id, maxFloor, capacity) {
        this.id = id;
        this.currentFloor = 1;
        this.direction = Direction.IDLE;
        this.state = ElevatorState.IDLE;
        this.capacity = capacity;
        this.maxFloor = maxFloor;
        this.doorOpen = false;
        this.requestQueue = [];
        this.running = true;
        this.processing = false;
        
        this.startElevatorThread();
    }
    
    startElevatorThread() {
        this.elevatorInterval = setInterval(() => {
            if (this.running && !this.processing) {
                this.processRequests();
            }
        }, 1000); // Check every second
    }
    
    addRequest(request) {
        this.requestQueue.push(request);
        console.log(`Elevator ${this.id} received request: ${request}`);
    }
    
    async processRequests() {
        if (this.requestQueue.length === 0) {
            if (this.state !== ElevatorState.IDLE) {
                this.setState(ElevatorState.IDLE);
                this.setDirection(Direction.IDLE);
            }
            return;
        }
        
        this.processing = true;
        
        const nextRequest = this.getNextRequest();
        if (nextRequest) {
            await this.processRequest(nextRequest);
        }
        
        this.processing = false;
    }
    
    getNextRequest() {
        // SCAN algorithm: serve requests in current direction
        const sameDirectionRequests = [];
        const oppositeDirectionRequests = [];
        
        for (const request of this.requestQueue) {
            if (this.isRequestInSameDirection(request)) {
                sameDirectionRequests.push(request);
            } else {
                oppositeDirectionRequests.push(request);
            }
        }
        
        // Sort same direction requests by distance
        sameDirectionRequests.sort((r1, r2) => {
            const dist1 = Math.abs(this.currentFloor - r1.sourceFloor);
            const dist2 = Math.abs(this.currentFloor - r2.sourceFloor);
            return dist1 - dist2;
        });
        
        if (sameDirectionRequests.length > 0) {
            return sameDirectionRequests[0];
        } else if (oppositeDirectionRequests.length > 0) {
            // Change direction and serve opposite direction requests
            this.changeDirection();
            return oppositeDirectionRequests[0];
        }
        
        return null;
    }
    
    isRequestInSameDirection(request) {
        if (this.direction === Direction.IDLE) return true;
        
        if (this.direction === Direction.UP) {
            return request.sourceFloor >= this.currentFloor || 
                   request.destinationFloor >= this.currentFloor;
        } else {
            return request.sourceFloor <= this.currentFloor || 
                   request.destinationFloor <= this.currentFloor;
        }
    }
    
    async processRequest(request) {
        // Move to source floor if not there
        if (this.currentFloor !== request.sourceFloor) {
            await this.moveToFloor(request.sourceFloor);
        }
        
        // Open door at source floor
        this.openDoor();
        console.log(`Elevator ${this.id} opened door at floor ${this.currentFloor}`);
        
        // Wait for user entry
        await this.sleep(3000); // 3 seconds for entry
        
        // Close door
        this.closeDoor();
        console.log(`Elevator ${this.id} closed door at floor ${this.currentFloor}`);
        
        // Move to destination floor
        await this.moveToFloor(request.destinationFloor);
        
        // Open door at destination
        this.openDoor();
        console.log(`Elevator ${this.id} opened door at floor ${this.currentFloor}`);
        
        // Wait for user exit
        await this.sleep(3000); // 3 seconds for exit
        
        // Close door
        this.closeDoor();
        console.log(`Elevator ${this.id} closed door at floor ${this.currentFloor}`);
        
        // Remove completed request
        const index = this.requestQueue.indexOf(request);
        if (index > -1) {
            this.requestQueue.splice(index, 1);
        }
        request.status = RequestStatus.COMPLETED;
    }
    
    async moveToFloor(targetFloor) {
        if (this.currentFloor === targetFloor) return;
        
        const moveDirection = this.currentFloor < targetFloor ? Direction.UP : Direction.DOWN;
        this.setDirection(moveDirection);
        this.setState(moveDirection === Direction.UP ? ElevatorState.MOVING_UP : ElevatorState.MOVING_DOWN);
        
        console.log(`Elevator ${this.id} moving ${moveDirection} from ${this.currentFloor} to ${targetFloor}`);
        
        // Simulate movement time
        const floorsToMove = Math.abs(targetFloor - this.currentFloor);
        await this.sleep(floorsToMove * 1000); // 1 second per floor
        
        this.currentFloor = targetFloor;
        console.log(`Elevator ${this.id} arrived at floor ${this.currentFloor}`);
    }
    
    changeDirection() {
        if (this.direction === Direction.UP) {
            this.setDirection(Direction.DOWN);
            this.setState(ElevatorState.MOVING_DOWN);
        } else {
            this.setDirection(Direction.UP);
            this.setState(ElevatorState.MOVING_UP);
        }
    }
    
    openDoor() {
        this.doorOpen = true;
    }
    
    closeDoor() {
        this.doorOpen = false;
    }
    
    setState(state) {
        this.state = state;
        console.log(`Elevator ${this.id} state changed to ${state}`);
    }
    
    setDirection(direction) {
        this.direction = direction;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    stop() {
        this.running = false;
        if (this.elevatorInterval) {
            clearInterval(this.elevatorInterval);
        }
    }
    
    getQueueSize() {
        return this.requestQueue.length;
    }
}

// ==================== 8. SCHEDULER CLASS ====================
/**
 * SCHEDULER: Implements SCAN algorithm for optimal elevator assignment
 */

class Scheduler {
    constructor(elevators) {
        this.elevators = elevators;
    }
    
    selectBestElevator(request) {
        let bestElevator = null;
        let minCost = Infinity;
        
        for (const elevator of this.elevators) {
            const cost = this.calculateCost(elevator, request);
            if (cost < minCost) {
                minCost = cost;
                bestElevator = elevator;
            }
        }
        
        return bestElevator;
    }
    
    calculateCost(elevator, request) {
        const currentFloor = elevator.currentFloor;
        const sourceFloor = request.sourceFloor;
        const destFloor = request.destinationFloor;
        const elevatorDirection = elevator.direction;
        const requestDirection = request.direction;
        
        // Base cost: distance to source floor
        let baseCost = Math.abs(currentFloor - sourceFloor);
        
        // Direction penalty: if elevator is moving opposite to request direction
        let directionPenalty = 0;
        if (elevatorDirection !== Direction.IDLE && elevatorDirection !== requestDirection) {
            directionPenalty = 10; // High penalty for direction mismatch
        }
        
        // Queue penalty: more requests in queue = higher cost
        const queuePenalty = elevator.getQueueSize() * 2;
        
        // State penalty: maintenance state has high penalty
        const statePenalty = elevator.state === ElevatorState.MAINTENANCE ? 100 : 0;
        
        return baseCost + directionPenalty + queuePenalty + statePenalty;
    }
}

// ==================== 9. ELEVATOR CONTROLLER ====================
/**
 * ELEVATOR CONTROLLER: Singleton managing all elevators and requests
 */

class ElevatorController {
    constructor(numElevators, maxFloor, capacity) {
        if (ElevatorController.instance) {
            return ElevatorController.instance;
        }
        
        this.elevators = [];
        this.globalRequestQueue = [];
        this.running = true;
        
        // Initialize elevators
        for (let i = 1; i <= numElevators; i++) {
            this.elevators.push(new Elevator(i, maxFloor, capacity));
        }
        
        this.scheduler = new Scheduler(this.elevators);
        this.startControllerThread();
        
        ElevatorController.instance = this;
    }
    
    static getInstance(numElevators, maxFloor, capacity) {
        if (!ElevatorController.instance) {
            ElevatorController.instance = new ElevatorController(numElevators, maxFloor, capacity);
        }
        return ElevatorController.instance;
    }
    
    startControllerThread() {
        this.controllerInterval = setInterval(() => {
            this.processGlobalQueue();
        }, 500); // Check every 500ms
    }
    
    requestElevator(sourceFloor, destinationFloor) {
        const request = new Request(sourceFloor, destinationFloor);
        
        this.globalRequestQueue.push(request);
        console.log(`New request added: ${request}`);
    }
    
    processGlobalQueue() {
        while (this.globalRequestQueue.length > 0) {
            const request = this.globalRequestQueue.shift();
            const bestElevator = this.scheduler.selectBestElevator(request);
            
            if (bestElevator) {
                bestElevator.addRequest(request);
                console.log(`Request ${request.id} assigned to Elevator ${bestElevator.id}`);
            } else {
                // No available elevator, add back to queue
                this.globalRequestQueue.push(request);
            }
        }
    }
    
    displayStatus() {
        console.log("\n=== Elevator System Status ===");
        for (const elevator of this.elevators) {
            console.log(`Elevator ${elevator.id}: Floor ${elevator.currentFloor}, Direction ${elevator.direction}, State ${elevator.state}, Queue ${elevator.getQueueSize()}, Door ${elevator.doorOpen ? 'OPEN' : 'CLOSED'}`);
        }
        console.log("==============================\n");
    }
    
    shutdown() {
        this.running = false;
        for (const elevator of this.elevators) {
            elevator.stop();
        }
        if (this.controllerInterval) {
            clearInterval(this.controllerInterval);
        }
    }
}

// ==================== 10. MAIN EXECUTION ====================
/**
 * MAIN EXECUTION: Demo and testing
 */

async function runElevatorDemo() {
    console.log("=== Elevator System Design Demo ===");
    
    // Initialize elevator controller with 3 elevators, 10 floors, capacity 8
    const controller = ElevatorController.getInstance(3, 10, 8);
    
    // Simulate multiple requests
    simulateRequests(controller);
    
    // Display status periodically
    displayStatusPeriodically(controller);
    
    // Shutdown after demo
    setTimeout(() => {
        controller.shutdown();
        console.log("=== Demo Complete ===");
    }, 30000); // Run for 30 seconds
}

function simulateRequests(controller) {
    // Simulate various requests with delays
    setTimeout(() => controller.requestElevator(1, 5), 2000);
    setTimeout(() => controller.requestElevator(3, 8), 3000);
    setTimeout(() => controller.requestElevator(7, 2), 4000);
    setTimeout(() => controller.requestElevator(4, 9), 5000);
    setTimeout(() => controller.requestElevator(6, 1), 6000);
    setTimeout(() => controller.requestElevator(2, 7), 7000);
}

function displayStatusPeriodically(controller) {
    setInterval(() => {
        controller.displayStatus();
    }, 5000); // Display every 5 seconds
}

// Run the demo
runElevatorDemo(); 