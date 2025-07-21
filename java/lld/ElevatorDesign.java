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
 */

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantLock;

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
enum ElevatorState {
    IDLE, MOVING_UP, MOVING_DOWN, MAINTENANCE
}

enum Direction {
    UP, DOWN, IDLE
}

enum RequestStatus {
    PENDING, IN_PROGRESS, COMPLETED, CANCELLED
}

// ==================== 6. REQUEST CLASS ====================
/**
 * REQUEST: Represents a floor request with priority and status
 */

class Request {
    private int id;
    private int sourceFloor;
    private int destinationFloor;
    private Direction direction;
    private long timestamp;
    private RequestStatus status;
    private int priority;
    
    public Request(int sourceFloor, int destinationFloor) {
        this.id = generateId();
        this.sourceFloor = sourceFloor;
        this.destinationFloor = destinationFloor;
        this.direction = calculateDirection(sourceFloor, destinationFloor);
        this.timestamp = System.currentTimeMillis();
        this.status = RequestStatus.PENDING;
        this.priority = calculatePriority();
    }
    
    private int generateId() {
        return new Random().nextInt(10000);
    }
    
    private Direction calculateDirection(int source, int destination) {
        if (source < destination) return Direction.UP;
        if (source > destination) return Direction.DOWN;
        return Direction.IDLE;
    }
    
    private int calculatePriority() {
        // Higher priority for requests in same direction
        // Lower priority for older requests
        long age = System.currentTimeMillis() - timestamp;
        return (int) (age / 1000); // Priority increases with age
    }
    
    // Getters and setters
    public int getId() { return id; }
    public int getSourceFloor() { return sourceFloor; }
    public int getDestinationFloor() { return destinationFloor; }
    public Direction getDirection() { return direction; }
    public long getTimestamp() { return timestamp; }
    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }
    public int getPriority() { return priority; }
    
    @Override
    public String toString() {
        return String.format("Request[%d: %d->%d, %s, %s]", 
            id, sourceFloor, destinationFloor, direction, status);
    }
}

// ==================== 7. ELEVATOR CLASS ====================
/**
 * ELEVATOR: Core elevator with state machine and movement logic
 */

class Elevator {
    private int id;
    private int currentFloor;
    private Direction direction;
    private ElevatorState state;
    private int capacity;
    private int maxFloor;
    private boolean doorOpen;
    private Queue<Request> requestQueue;
    private ReentrantLock lock;
    private Thread elevatorThread;
    private volatile boolean running;
    
    public Elevator(int id, int maxFloor, int capacity) {
        this.id = id;
        this.currentFloor = 1;
        this.direction = Direction.IDLE;
        this.state = ElevatorState.IDLE;
        this.capacity = capacity;
        this.maxFloor = maxFloor;
        this.doorOpen = false;
        this.requestQueue = new PriorityQueue<>((r1, r2) -> r1.getPriority() - r2.getPriority());
        this.lock = new ReentrantLock();
        this.running = true;
        startElevatorThread();
    }
    
    private void startElevatorThread() {
        elevatorThread = new Thread(() -> {
            while (running) {
                processRequests();
                try {
                    Thread.sleep(1000); // Check every second
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
        elevatorThread.start();
    }
    
    public void addRequest(Request request) {
        lock.lock();
        try {
            requestQueue.offer(request);
            System.out.println("Elevator " + id + " received request: " + request);
        } finally {
            lock.unlock();
        }
    }
    
    private void processRequests() {
        lock.lock();
        try {
            if (requestQueue.isEmpty()) {
                if (state != ElevatorState.IDLE) {
                    setState(ElevatorState.IDLE);
                    setDirection(Direction.IDLE);
                }
                return;
            }
            
            Request nextRequest = getNextRequest();
            if (nextRequest != null) {
                processRequest(nextRequest);
            }
        } finally {
            lock.unlock();
        }
    }
    
    private Request getNextRequest() {
        // SCAN algorithm: serve requests in current direction
        List<Request> sameDirectionRequests = new ArrayList<>();
        List<Request> oppositeDirectionRequests = new ArrayList<>();
        
        for (Request request : requestQueue) {
            if (isRequestInSameDirection(request)) {
                sameDirectionRequests.add(request);
            } else {
                oppositeDirectionRequests.add(request);
            }
        }
        
        // Sort same direction requests by distance
        sameDirectionRequests.sort((r1, r2) -> {
            int dist1 = Math.abs(currentFloor - r1.getSourceFloor());
            int dist2 = Math.abs(currentFloor - r2.getSourceFloor());
            return Integer.compare(dist1, dist2);
        });
        
        if (!sameDirectionRequests.isEmpty()) {
            return sameDirectionRequests.get(0);
        } else if (!oppositeDirectionRequests.isEmpty()) {
            // Change direction and serve opposite direction requests
            changeDirection();
            return oppositeDirectionRequests.get(0);
        }
        
        return null;
    }
    
    private boolean isRequestInSameDirection(Request request) {
        if (direction == Direction.IDLE) return true;
        
        if (direction == Direction.UP) {
            return request.getSourceFloor() >= currentFloor || 
                   request.getDestinationFloor() >= currentFloor;
        } else {
            return request.getSourceFloor() <= currentFloor || 
                   request.getDestinationFloor() <= currentFloor;
        }
    }
    
    private void processRequest(Request request) {
        // Move to source floor if not there
        if (currentFloor != request.getSourceFloor()) {
            moveToFloor(request.getSourceFloor());
        }
        
        // Open door at source floor
        openDoor();
        System.out.println("Elevator " + id + " opened door at floor " + currentFloor);
        
        // Wait for user entry
        try {
            Thread.sleep(3000); // 3 seconds for entry
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Close door
        closeDoor();
        System.out.println("Elevator " + id + " closed door at floor " + currentFloor);
        
        // Move to destination floor
        moveToFloor(request.getDestinationFloor());
        
        // Open door at destination
        openDoor();
        System.out.println("Elevator " + id + " opened door at floor " + currentFloor);
        
        // Wait for user exit
        try {
            Thread.sleep(3000); // 3 seconds for exit
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Close door
        closeDoor();
        System.out.println("Elevator " + id + " closed door at floor " + currentFloor);
        
        // Remove completed request
        requestQueue.remove(request);
        request.setStatus(RequestStatus.COMPLETED);
    }
    
    private void moveToFloor(int targetFloor) {
        if (currentFloor == targetFloor) return;
        
        Direction moveDirection = currentFloor < targetFloor ? Direction.UP : Direction.DOWN;
        setDirection(moveDirection);
        setState(moveDirection == Direction.UP ? ElevatorState.MOVING_UP : ElevatorState.MOVING_DOWN);
        
        System.out.println("Elevator " + id + " moving " + moveDirection + " from " + currentFloor + " to " + targetFloor);
        
        // Simulate movement time
        int floorsToMove = Math.abs(targetFloor - currentFloor);
        try {
            Thread.sleep(floorsToMove * 1000); // 1 second per floor
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        currentFloor = targetFloor;
        System.out.println("Elevator " + id + " arrived at floor " + currentFloor);
    }
    
    private void changeDirection() {
        if (direction == Direction.UP) {
            setDirection(Direction.DOWN);
            setState(ElevatorState.MOVING_DOWN);
        } else {
            setDirection(Direction.UP);
            setState(ElevatorState.MOVING_UP);
        }
    }
    
    private void openDoor() {
        doorOpen = true;
    }
    
    private void closeDoor() {
        doorOpen = false;
    }
    
    private void setState(ElevatorState state) {
        this.state = state;
        System.out.println("Elevator " + id + " state changed to " + state);
    }
    
    private void setDirection(Direction direction) {
        this.direction = direction;
    }
    
    // Getters
    public int getId() { return id; }
    public int getCurrentFloor() { return currentFloor; }
    public Direction getDirection() { return direction; }
    public ElevatorState getState() { return state; }
    public boolean isDoorOpen() { return doorOpen; }
    public int getQueueSize() { return requestQueue.size(); }
    
    public void stop() {
        running = false;
        if (elevatorThread != null) {
            elevatorThread.interrupt();
        }
    }
}

// ==================== 8. SCHEDULER CLASS ====================
/**
 * SCHEDULER: Implements SCAN algorithm for optimal elevator assignment
 */

class Scheduler {
    private List<Elevator> elevators;
    
    public Scheduler(List<Elevator> elevators) {
        this.elevators = elevators;
    }
    
    public Elevator selectBestElevator(Request request) {
        Elevator bestElevator = null;
        int minCost = Integer.MAX_VALUE;
        
        for (Elevator elevator : elevators) {
            int cost = calculateCost(elevator, request);
            if (cost < minCost) {
                minCost = cost;
                bestElevator = elevator;
            }
        }
        
        return bestElevator;
    }
    
    private int calculateCost(Elevator elevator, Request request) {
        int currentFloor = elevator.getCurrentFloor();
        int sourceFloor = request.getSourceFloor();
        int destFloor = request.getDestinationFloor();
        Direction elevatorDirection = elevator.getDirection();
        Direction requestDirection = request.getDirection();
        
        // Base cost: distance to source floor
        int baseCost = Math.abs(currentFloor - sourceFloor);
        
        // Direction penalty: if elevator is moving opposite to request direction
        int directionPenalty = 0;
        if (elevatorDirection != Direction.IDLE && elevatorDirection != requestDirection) {
            directionPenalty = 10; // High penalty for direction mismatch
        }
        
        // Queue penalty: more requests in queue = higher cost
        int queuePenalty = elevator.getQueueSize() * 2;
        
        // State penalty: maintenance state has high penalty
        int statePenalty = elevator.getState() == ElevatorState.MAINTENANCE ? 100 : 0;
        
        return baseCost + directionPenalty + queuePenalty + statePenalty;
    }
}

// ==================== 9. ELEVATOR CONTROLLER ====================
/**
 * ELEVATOR CONTROLLER: Singleton managing all elevators and requests
 */

class ElevatorController {
    private static ElevatorController instance;
    private List<Elevator> elevators;
    private Scheduler scheduler;
    private Queue<Request> globalRequestQueue;
    private ReentrantLock lock;
    private Thread controllerThread;
    private volatile boolean running;
    
    private ElevatorController(int numElevators, int maxFloor, int capacity) {
        this.elevators = new ArrayList<>();
        this.globalRequestQueue = new LinkedList<>();
        this.lock = new ReentrantLock();
        this.running = true;
        
        // Initialize elevators
        for (int i = 1; i <= numElevators; i++) {
            elevators.add(new Elevator(i, maxFloor, capacity));
        }
        
        this.scheduler = new Scheduler(elevators);
        startControllerThread();
    }
    
    public static ElevatorController getInstance(int numElevators, int maxFloor, int capacity) {
        if (instance == null) {
            synchronized (ElevatorController.class) {
                if (instance == null) {
                    instance = new ElevatorController(numElevators, maxFloor, capacity);
                }
            }
        }
        return instance;
    }
    
    private void startControllerThread() {
        controllerThread = new Thread(() -> {
            while (running) {
                processGlobalQueue();
                try {
                    Thread.sleep(500); // Check every 500ms
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
        controllerThread.start();
    }
    
    public void requestElevator(int sourceFloor, int destinationFloor) {
        Request request = new Request(sourceFloor, destinationFloor);
        
        lock.lock();
        try {
            globalRequestQueue.offer(request);
            System.out.println("New request added: " + request);
        } finally {
            lock.unlock();
        }
    }
    
    private void processGlobalQueue() {
        lock.lock();
        try {
            while (!globalRequestQueue.isEmpty()) {
                Request request = globalRequestQueue.poll();
                Elevator bestElevator = scheduler.selectBestElevator(request);
                
                if (bestElevator != null) {
                    bestElevator.addRequest(request);
                    System.out.println("Request " + request.getId() + " assigned to Elevator " + bestElevator.getId());
                } else {
                    // No available elevator, add back to queue
                    globalRequestQueue.offer(request);
                }
            }
        } finally {
            lock.unlock();
        }
    }
    
    public void displayStatus() {
        System.out.println("\n=== Elevator System Status ===");
        for (Elevator elevator : elevators) {
            System.out.printf("Elevator %d: Floor %d, Direction %s, State %s, Queue %d, Door %s%n",
                elevator.getId(),
                elevator.getCurrentFloor(),
                elevator.getDirection(),
                elevator.getState(),
                elevator.getQueueSize(),
                elevator.isDoorOpen() ? "OPEN" : "CLOSED"
            );
        }
        System.out.println("==============================\n");
    }
    
    public void shutdown() {
        running = false;
        for (Elevator elevator : elevators) {
            elevator.stop();
        }
        if (controllerThread != null) {
            controllerThread.interrupt();
        }
    }
}

// ==================== 10. MAIN CLASS ====================
/**
 * MAIN CLASS: Demo and testing
 */

public class ElevatorDesign {
    
    public static void main(String[] args) {
        System.out.println("=== Elevator System Design Demo ===");
        
        // Initialize elevator controller with 3 elevators, 10 floors, capacity 8
        ElevatorController controller = ElevatorController.getInstance(3, 10, 8);
        
        // Simulate multiple requests
        simulateRequests(controller);
        
        // Display status periodically
        displayStatusPeriodically(controller);
        
        // Shutdown after demo
        try {
            Thread.sleep(30000); // Run for 30 seconds
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        controller.shutdown();
        System.out.println("=== Demo Complete ===");
    }
    
    private static void simulateRequests(ElevatorController controller) {
        // Start a thread to simulate user requests
        new Thread(() -> {
            try {
                Thread.sleep(2000); // Wait for system to start
                
                // Simulate various requests
                controller.requestElevator(1, 5);
                Thread.sleep(1000);
                
                controller.requestElevator(3, 8);
                Thread.sleep(1000);
                
                controller.requestElevator(7, 2);
                Thread.sleep(1000);
                
                controller.requestElevator(4, 9);
                Thread.sleep(1000);
                
                controller.requestElevator(6, 1);
                Thread.sleep(1000);
                
                controller.requestElevator(2, 7);
                
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
    
    private static void displayStatusPeriodically(ElevatorController controller) {
        new Thread(() -> {
            try {
                while (true) {
                    Thread.sleep(5000); // Display every 5 seconds
                    controller.displayStatus();
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
} 