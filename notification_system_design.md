# Notification System Design

## Stage 1

### Approach
Priority Inbox mein notifications ko weight aur recency ke combination se sort kiya gaya hai.

### Priority Weights
- Placement: 3
- Result: 2
- Event: 1

### Algorithm
1. API se saari notifications fetch karo.
2. Har notification ke liye score calculate karo.
3. Score formula: `weight * 1e13 + timestamp`
4. Descending order mein sort karo.
5. Top N notifications return karo.

### API Used
- Endpoint: `http://4.224.186.213/evaluation-service/notifications`
- Method: `GET`
- Auth: Bearer token

### Notes
- No database is used.
- No notification data is hard-coded.
- Logging middleware is used for important events.
