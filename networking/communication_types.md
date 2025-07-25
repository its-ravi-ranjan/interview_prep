# Communication Patterns - Quick Reference

**Author:** Ravi Ranjan | **GitHub:** @its-ravi-ranjan

## 1. Pull (Client → Server)
**What:** Client requests data from server  
**Example:** Email refresh, weather app  
**Code:** `fetch('/api/data')`  
**Pros:** Simple, works everywhere  
**Cons:** High latency, wastes bandwidth  

## 2. Push (Server → Client)  
**What:** Server sends data without request  
**Example:** Mobile notifications, Firebase  
**Code:** `admin.messaging().send(message)`  
**Pros:** Real-time, efficient  
**Cons:** Complex, needs persistent connection  

## 3. Polling (Regular Check)
**What:** Client checks server every X seconds  
**Example:** Social media feed, order tracking  
**Code:** `setInterval(() => fetch('/api/updates'), 5000)`  
**Pros:** Simple, predictable  
**Cons:** High latency, server load  

## 4. Long Polling (Wait & Check)
**What:** Server holds connection until data available  
**Example:** WhatsApp Web, Gmail Chat  
**Code:** Server holds response, client retries  
**Pros:** Lower latency than polling  
**Cons:** Server resources tied up  

## 5. WebSockets (Real-time)
**What:** Bidirectional persistent connection  
**Example:** Slack, trading apps, games  
**Code:** `new WebSocket('wss://server.com')`  
**Pros:** True real-time, bidirectional  
**Cons:** Complex, needs WebSocket support  

## 6. Server-Sent Events (SSE)
**What:** One-way server to client stream  
**Example:** Live news, sports commentary  
**Code:** `new EventSource('/api/stream')`  
**Pros:** Simple, auto-reconnect  
**Cons:** One-way only, limited support  

## Quick Comparison

| Pattern | Latency | Complexity | Use Case |
|---------|---------|------------|----------|
| Pull | High | Low | Manual refresh |
| Push | Low | High | Notifications |
| Polling | Medium | Low | Regular updates |
| Long Polling | Low | Medium | Chat apps |
| WebSockets | Very Low | High | Real-time chat |
| SSE | Low | Low | Live feeds |

## Real Apps Examples

**WhatsApp:** WebSockets + Push + Long Polling fallback  
**Twitter:** Long Polling + Push + WebSockets  
**Uber:** WebSockets (driver location) + Push (updates)  
**Netflix:** Polling (recommendations) + Push (notifications)  

## Interview Quick Answers

**Q: Design real-time chat?**  
A: WebSockets + Push notifications + Long polling fallback

**Q: Polling vs Long Polling?**  
A: Polling = fixed intervals, Long Polling = wait for data

**Q: WebSockets vs SSE?**  
A: WebSockets = bidirectional, SSE = one-way server→client

**Q: Handle WebSocket failures?**  
A: Exponential backoff + heartbeat + fallback to long polling 