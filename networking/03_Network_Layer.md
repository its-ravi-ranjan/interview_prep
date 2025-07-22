# OSI Layer 3: Network Layer

**Author:** Ravi Ranjan  
**GitHub:** [@its-ravi-ranjan](https://github.com/its-ravi-ranjan)  
**Email:** contact70raviranjan@gmail.com  
**Created:** 2024  
**Purpose:** Interview preparation and networking knowledge sharing

---

### **🔄 Complete Network Layer Flow Example**

When you search "Amazon AWS":

```
1. Laptop → WiFi Router
   - Packet: IP packet with source 192.168.1.100
   - Dest: 8.8.8.8 (Google DNS) or direct to Google
   - Protocol: HTTP over TCP
   - TTL: 64 (Time To Live)
   - Routing: Local network routing

2. WiFi Router → Modem
   - Packet: Same IP packet
   - Source: 192.168.1.1 (router's internal IP)
   - Dest: 8.8.8.8 or Google's IP
   - NAT: Network Address Translation
   - TTL: 63 (decremented)

3. Modem → ISP
   - Packet: Same IP packet
   - Source: Public IP (e.g., 203.0.113.45)
   - Dest: Google's IP address
   - Routing: ISP's routing table
   - TTL: 62

4. ISP → Internet Backbone
   - Packet: Same IP packet
   - Source: ISP's public IP
   - Dest: Google's IP (e.g., 142.250.190.78)
   - Routing: BGP routing protocol
   - TTL: 61

5. Internet Backbone → Google Edge
   - Packet: Same IP packet
   - Source: Various backbone routers
   - Dest: Google's edge router
   - Routing: Internet routing tables
   - TTL: 60

6. Google Edge → Google Data Center
   - Packet: Same IP packet
   - Source: Edge router IP
   - Dest: Load balancer IP
   - Routing: Google's internal routing
   - TTL: 59

7. Load Balancer → Web Server
   - Packet: Same IP packet
   - Source: Load balancer IP
   - Dest: Web server IP (e.g., 10.0.1.100)
   - Routing: Data center internal routing
   - TTL: 58

8. Web Server → Response
   - Packet: Response IP packet
   - Source: Web server IP
   - Dest: User's public IP
   - Protocol: HTTP response
   - TTL: 64 (new packet)
```

### **📊 Example Breakdown: Network Layer Data Flow**

**Sender Side (Your Laptop):**
| Step | OSI Layer | What Happens |
|------|-----------|--------------|
| 1️⃣ | Layer 3 | Application data encapsulated in IP packet |
| 2️⃣ | Layer 3 | Source IP (192.168.1.100) and destination IP added |
| 3️⃣ | Layer 3 | TTL (Time To Live) set to 64 |
| 4️⃣ | Layer 3 | Packet routed to WiFi router |
| 5️⃣ | Layer 3 | Router performs NAT and forwards packet |

**Receiver Side (Google Server):**
| Step | OSI Layer | What Happens |
|------|-----------|--------------|
| 1️⃣ | Layer 3 | Router receives IP packet |
| 2️⃣ | Layer 3 | TTL decremented and checked |
| 3️⃣ | Layer 3 | Destination IP address validated |
| 4️⃣ | Layer 3 | Packet header stripped |
| 5️⃣ | Layer 3 | Data payload passed to Transport Layer |

**🔄 Summary**
| Perspective | Flow Order |
|-------------|------------|
| OSI Model View | Layer 1 → Layer 7 |
| Real Data Flow (Sender) | Layer 7 → Layer 1 |
| Real Data Flow (Receiver) | Layer 1 → Layer 7 |

---

### **Purpose & Function**
- **End-to-end** packet delivery across networks
- **Logical addressing** (IP addresses)
- **Routing** and path determination
- **Packet fragmentation** and reassembly
- **Network-to-network** communication

### **Key Technologies**
- **IPv4/IPv6** - Internet Protocol versions
- **Routing protocols** (OSPF, BGP, RIP)
- **ICMP** - Internet Control Message Protocol
- **NAT** - Network Address Translation
- **Subnetting** and **CIDR**

### **Amazon Interview Focus**
- **VPC design** and subnet planning
- **Route tables** and routing strategies
- **Internet connectivity** and NAT
- **Cross-region** and **cross-account** networking

---

## 📋 DETAILED EXPLANATION

### **1. Purpose and Responsibilities**

The Network Layer is responsible for **end-to-end packet delivery** across multiple networks. It provides **logical addressing** and **routing** capabilities, allowing packets to traverse different network segments. Key responsibilities include:

- **Logical addressing** (IP addresses)
- **Routing** and path determination
- **Packet fragmentation** and reassembly
- **Quality of Service** (QoS)
- **Network congestion** control

### **2. IP Addressing**

#### **A. IPv4 Address Structure**
- **32-bit** address (4 bytes)
- **Dotted decimal** notation: `192.168.1.1`
- **Network portion** + **Host portion**
- **Subnet mask** determines network boundaries

#### **B. IPv6 Address Structure**
- **128-bit** address (16 bytes)
- **Hexadecimal** notation: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`
- **Global routing prefix** + **Subnet ID** + **Interface ID**
- **No subnet masks** (prefix length used instead)

#### **C. Address Classes (IPv4)**
- **Class A**: 1.0.0.0 - 126.255.255.255 (8-bit network)
- **Class B**: 128.0.0.0 - 191.255.255.255 (16-bit network)
- **Class C**: 192.0.0.0 - 223.255.255.255 (24-bit network)
- **Class D**: 224.0.0.0 - 239.255.255.255 (multicast)
- **Class E**: 240.0.0.0 - 255.255.255.255 (reserved)

### **3. Subnetting and CIDR**

#### **A. Subnetting**
- **Dividing** large networks into smaller subnets
- **Subnet mask** determines network boundaries
- **Example**: 192.168.1.0/24 = 192.168.1.0 - 192.168.1.255

#### **B. CIDR (Classless Inter-Domain Routing)**
- **Flexible** subnet sizes
- **Prefix notation**: /24, /16, /8, etc.
- **Efficient** address allocation
- **Reduces** routing table size

#### **C. Subnet Calculation Example**
```
Network: 192.168.1.0/24
Subnet Mask: 255.255.255.0
Network Address: 192.168.1.0
Broadcast Address: 192.168.1.255
Usable Hosts: 192.168.1.1 - 192.168.1.254 (254 hosts)
```

### **4. IP Packet Structure**

#### **IPv4 Header**
```
┌─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│Version  │IHL      │Type of  │Total    │Identification│Flags │
│(4 bits) │(4 bits) │Service  │Length   │(16 bits)     │(3 bits)│
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│Fragment │Time to  │Protocol │Header   │Source IP      │Dest IP │
│Offset   │Live     │(8 bits) │Checksum │(32 bits)      │(32 bits)│
│(13 bits)│(8 bits) │         │(16 bits)│               │        │
└─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
```

**Key Fields:**
- **Version**: IP version (4 for IPv4)
- **IHL**: Internet Header Length
- **Total Length**: Packet size in bytes
- **TTL**: Time to Live (hop count)
- **Protocol**: Upper layer protocol (TCP=6, UDP=17)
- **Source/Destination IP**: Logical addresses

### **5. Routing**

#### **A. Routing Table**
- **Destination network** and next hop
- **Interface** for packet forwarding
- **Metric** for path selection
- **Administrative distance** for protocol preference

#### **B. Routing Process**
1. **Receive** packet with destination IP
2. **Look up** destination in routing table
3. **Find** longest matching prefix
4. **Forward** to next hop or local interface
5. **Update** TTL and checksum

#### **C. Routing Protocols**

**Interior Gateway Protocols (IGP)**
- **OSPF**: Link-state routing, fast convergence
- **RIP**: Distance-vector, simple but limited
- **EIGRP**: Cisco proprietary, hybrid approach

**Exterior Gateway Protocols (EGP)**
- **BGP**: Border Gateway Protocol, internet routing
- **AS** (Autonomous System) routing
- **Policy-based** routing decisions

### **6. Network Address Translation (NAT)**

#### **A. NAT Types**
- **Static NAT**: One-to-one mapping
- **Dynamic NAT**: Pool-based mapping
- **PAT/NAPT**: Port Address Translation (many-to-one)

#### **B. NAT Process**
```
Private IP: 192.168.1.100:3000
↓
NAT Translation: 203.0.113.1:4000
↓
Public Internet
```

#### **C. NAT Benefits**
- **Address conservation**: Multiple private IPs share public IP
- **Security**: Hides internal network structure
- **Flexibility**: Easy network renumbering

### **7. ICMP (Internet Control Message Protocol)**

#### **A. ICMP Functions**
- **Error reporting**: Destination unreachable, time exceeded
- **Diagnostic tools**: Ping, traceroute
- **Flow control**: Source quench
- **Redirect**: Better route notification

#### **B. Common ICMP Messages**
- **Type 0**: Echo Reply (ping response)
- **Type 3**: Destination Unreachable
- **Type 8**: Echo Request (ping)
- **Type 11**: Time Exceeded (traceroute)

### **8. Quality of Service (QoS)**

#### **A. QoS Mechanisms**
- **Traffic classification**: Identify packet types
- **Queuing**: Priority-based packet handling
- **Policing**: Rate limiting
- **Shaping**: Smooth traffic flow

#### **B. QoS Marking**
- **DSCP**: Differentiated Services Code Point
- **ToS**: Type of Service (legacy)
- **802.1p**: VLAN priority marking

---

## 🔍 PRACTICAL EXAMPLE: Web Search Request

### **Scenario**: User searches "Amazon AWS" on Google

### **Network Layer Perspective Only**

When a user types "Amazon AWS" in their browser, here's what happens at the **Network Layer**:

#### **1. User's Device (Laptop)**

**IP Packet Creation**
```
Application Data: HTTP GET request
↓
Network Layer creates IP packet:
┌─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│Version  │IHL      │Type of  │Total    │TTL      │Protocol │
│  4      │  5      │  0      │ 1500    │  64     │   6     │
├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│Source IP: 192.168.1.100     │Destination IP: 8.8.8.8    │
└─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
```

**Routing Decision**
```
Laptop routing table:
Destination     Gateway         Interface
0.0.0.0/0       192.168.1.1    eth0 (default route)
192.168.1.0/24  0.0.0.0        eth0 (local network)
127.0.0.0/8     0.0.0.0        lo (loopback)

Decision: Use default route (192.168.1.1) for 8.8.8.8
```

#### **2. Local Network (Home/Office)**

**Router Processing**
```
Router receives packet:
1. Check destination IP: 8.8.8.8
2. Look up in routing table
3. Find route to internet via ISP
4. Decrement TTL: 64 → 63
5. Recalculate checksum
6. Forward to ISP gateway
```

**NAT Translation**
```
Private IP: 192.168.1.100:3000
↓
NAT Translation: 203.0.113.1:4000
↓
Packet rewritten with new source IP/port
```

#### **3. ISP Network**

**ISP Routing**
```
ISP Router → ISP Core → Internet Gateway
1. ISP router receives packet
2. Routing table lookup for 8.8.8.8
3. BGP routing decision
4. Forward to appropriate upstream provider
5. TTL decremented at each hop
```

**BGP Routing**
```
ISP routing table:
Network          Next Hop        AS Path
8.8.8.0/24       10.1.1.1       15169 (Google)
0.0.0.0/0        10.1.1.2       701 (Tier 1 ISP)

Decision: Route to Google's network (AS 15169)
```

#### **4. Internet Backbone**

**Tier 1 ISP Routing**
```
ISP → Tier 1 ISP → Google Network
1. Multiple AS hops through internet
2. BGP path selection based on:
   - AS path length
   - Local preference
   - MED (Multi-Exit Discriminator)
   - Origin type
3. Each router decrements TTL
4. Packet follows best path to destination
```

**Path Selection**
```
Possible paths to Google:
Path 1: AS 701 → AS 15169 (Google)
Path 2: AS 701 → AS 3356 → AS 15169
Path 3: AS 701 → AS 174 → AS 15169

Selected: Path 1 (shortest AS path)
```

#### **5. Google Network**

**Google's Edge Router**
```
Internet → Google Edge Router → Google Data Center
1. Google edge router receives packet
2. Internal routing to appropriate data center
3. Load balancing decision
4. Forward to load balancer
5. TTL check: if 0, send ICMP Time Exceeded
```

**Load Balancer Routing**
```
Edge Router → Load Balancer → Web Server
1. Load balancer receives packet
2. Health check: Is target server healthy?
3. Load balancing algorithm:
   - Round robin
   - Least connections
   - IP hash
   - Geographic location
4. Forward to selected web server
```

### **Network Layer Challenges in This Example**

#### **1. Routing Failures**
- **Link failure**: Router detects down link, recalculates routes
- **Routing loop**: TTL prevents infinite loops
- **Black hole**: Packet dropped without notification
- **Convergence time**: Time for network to stabilize after failure

#### **2. Address Resolution**
- **ARP delays**: IP to MAC resolution
- **DNS resolution**: Domain name to IP (upper layer)
- **Reverse DNS**: IP to domain name lookup

#### **3. NAT Issues**
- **Port exhaustion**: Limited ports for PAT
- **Application compatibility**: Some apps don't work with NAT
- **Troubleshooting complexity**: Hard to trace connections

#### **4. QoS and Congestion**
- **Network congestion**: Queues fill up, packets dropped
- **QoS marking**: Priority handling for different traffic types
- **Bandwidth management**: Rate limiting and shaping

### **Amazon-Specific Considerations**

#### **1. AWS VPC Design**
- **Subnet planning**: Public, private, database subnets
- **Route tables**: Control traffic flow between subnets
- **Internet Gateway**: Public internet access
- **NAT Gateway**: Private subnet internet access

#### **2. Cross-Region Networking**
- **VPC peering**: Direct connection between VPCs
- **Transit Gateway**: Hub-and-spoke architecture
- **VPN connections**: Secure cross-region communication
- **Direct Connect**: Dedicated network connection

#### **3. Load Balancing**
- **Application Load Balancer**: Layer 7 load balancing
- **Network Load Balancer**: Layer 4 load balancing
- **Target groups**: Health checks and routing
- **Sticky sessions**: Session affinity

#### **4. Security**
- **Security groups**: Stateful firewall rules
- **Network ACLs**: Stateless filtering
- **VPC endpoints**: Private AWS service access
- **WAF**: Web application firewall

---

## 🎯 INTERVIEW TIPS

### **Common Questions**
1. **"How does routing work in a network?"**
2. **"What's the difference between static and dynamic routing?"**
3. **"How do you troubleshoot network connectivity issues?"**
4. **"What are the benefits and drawbacks of NAT?"**

### **Key Concepts to Remember**
- **Network layer = logical addressing + routing**
- **IP addresses are logical, MAC addresses are physical**
- **Routers forward packets based on routing tables**
- **NAT conserves IP addresses and provides security**
- **BGP is the protocol of the internet**

### **Amazon Context**
- **VPC design** requires understanding of subnetting and routing
- **Load balancing** involves network layer considerations
- **Cross-region networking** uses routing and peering
- **Security** includes network ACLs and security groups 