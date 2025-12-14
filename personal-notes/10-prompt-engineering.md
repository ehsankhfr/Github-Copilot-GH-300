# Prompt Engineering for GitHub Copilot

## What is Prompt Engineering?

Prompt engineering is the practice of crafting effective comments and code context to get the best possible suggestions from GitHub Copilot. Well-crafted prompts lead to more accurate, relevant, and useful code suggestions.

## Core Principles

### 1. Be Specific and Clear

**Poor Example:**
```python
# do something
```

**Good Example:**
```python
# Calculate the compound interest for a given principal amount,
# annual interest rate, number of times interest is compounded per year,
# and total number of years. Return the final amount rounded to 2 decimal places.
```

### 2. Provide Context

**Poor Example:**
```javascript
// validate
```

**Good Example:**
```javascript
// Validate user registration input:
// - Email must be valid format and not already registered
// - Password must be at least 8 characters with uppercase, lowercase, and number
// - Username must be alphanumeric and 3-20 characters
// Return validation result with specific error messages
```

### 3. Specify Expected Behavior

**Poor Example:**
```python
# send email
```

**Good Example:**
```python
# Send email notification using SendGrid API
# Parameters: recipient_email, subject, html_content
# Include retry logic (max 3 attempts) for transient failures
# Log all send attempts
# Return success status and message_id or error details
```

### 4. Include Examples

**Poor Example:**
```python
# format date
```

**Good Example:**
```python
# Format datetime object to string
# Input: datetime(2023, 12, 25, 14, 30, 0)
# Output: "December 25, 2023 at 2:30 PM"
# Handle timezone conversion to user's local time
```

## Prompt Patterns

### Pattern 1: Function Specification

**Template:**
```
# [Action] [what] with [specific requirements]
# Parameters: [list parameters with types]
# Returns: [return type and description]
# Raises: [possible exceptions]
```

**Example:**
```python
# Calculate the factorial of a number using recursion
# Parameters: n (int) - non-negative integer
# Returns: int - factorial of n
# Raises: ValueError if n is negative
def factorial(n: int) -> int:
    # Copilot generates implementation
```

### Pattern 2: Class Design

**Template:**
```
# [Class name] for [purpose]
# Attributes:
#   - [attribute1]: [type and description]
#   - [attribute2]: [type and description]
# Methods:
#   - [method1]: [description]
#   - [method2]: [description]
```

**Example:**
```python
# ShoppingCart class for managing user shopping cart
# Attributes:
#   - items: list of CartItem objects
#   - user_id: unique user identifier
#   - total: calculated total price
# Methods:
#   - add_item: add item to cart with quantity
#   - remove_item: remove item by product_id
#   - update_quantity: change item quantity
#   - calculate_total: compute total with discounts
#   - clear: remove all items
class ShoppingCart:
    # Copilot generates full implementation
```

### Pattern 3: Algorithm Implementation

**Template:**
```
# Implement [algorithm name] algorithm
# Purpose: [what it does]
# Approach: [high-level steps]
# Time Complexity: [Big O]
# Space Complexity: [Big O]
```

**Example:**
```python
# Implement binary search algorithm
# Purpose: Find index of target value in sorted array
# Approach: Divide array in half repeatedly, compare middle element
# Time Complexity: O(log n)
# Space Complexity: O(1)
def binary_search(arr: list[int], target: int) -> int:
    # Copilot generates implementation
```

### Pattern 4: Error Handling

**Template:**
```
# [Function description]
# Error Handling:
#   - [Error type 1]: [when it occurs] -> [how to handle]
#   - [Error type 2]: [when it occurs] -> [how to handle]
# Logging: [what to log]
```

**Example:**
```python
# Fetch user data from external API
# Error Handling:
#   - ConnectionError: retry up to 3 times with exponential backoff
#   - HTTPError (4xx): log and raise custom exception
#   - HTTPError (5xx): retry once, then fail
#   - Timeout: log warning, return None
# Logging: log all requests, responses, and errors with request_id
async def fetch_user_api(user_id: str) -> Optional[dict]:
    # Copilot generates robust implementation
```

### Pattern 5: Data Transformation

**Template:**
```
# Transform [input format] to [output format]
# Input example: [show example]
# Output example: [show example]
# Special cases: [edge cases to handle]
```

**Example:**
```python
# Transform nested JSON to flat dictionary with dot notation keys
# Input example: {"user": {"name": "John", "address": {"city": "NYC"}}}
# Output example: {"user.name": "John", "user.address.city": "NYC"}
# Special cases: handle arrays, null values, and circular references
def flatten_json(data: dict, prefix: str = '') -> dict:
    # Copilot generates implementation
```

## Language-Specific Prompting

### Python

**Type Hints:**
```python
# Type hints improve suggestions
def process_items(items: list[dict[str, Any]]) -> pd.DataFrame:
    """Convert list of dictionaries to pandas DataFrame with validation."""
    # Copilot understands types
```

**Docstring Style:**
```python
def calculate_metrics(data: np.ndarray) -> dict[str, float]:
    """
    Calculate statistical metrics for numpy array.
    
    Args:
        data: Numerical array for analysis
    
    Returns:
        Dictionary with mean, median, std, min, max
    
    Raises:
        ValueError: If data is empty or contains non-numeric values
    
    Example:
        >>> metrics = calculate_metrics(np.array([1, 2, 3, 4, 5]))
        >>> print(metrics['mean'])
        3.0
    """
    # Copilot generates complete implementation
```

### JavaScript/TypeScript

**TypeScript Interfaces:**
```typescript
// Define user data structure for API response
interface UserResponse {
  id: number;
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  metadata: {
    createdAt: Date;
    lastLogin: Date;
  };
}

// Fetch and transform user data with error handling
async function getUserData(userId: number): Promise<UserResponse> {
  // Copilot generates type-safe implementation
}
```

**JSDoc Comments:**
```javascript
/**
 * Debounce function calls to prevent excessive executions
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @param {boolean} immediate - Trigger on leading edge
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate = false) {
  // Copilot generates implementation
}
```

### Java

**JavaDoc and Annotations:**
```java
/**
 * Service for managing user authentication and authorization.
 * Implements OAuth2 with JWT tokens.
 * Thread-safe and supports concurrent access.
 *
 * @author Development Team
 * @version 2.0
 */
@Service
@Transactional
public class AuthenticationService {
    
    /**
     * Authenticate user with credentials and generate JWT token.
     *
     * @param username User's username
     * @param password User's password
     * @return JwtToken containing access and refresh tokens
     * @throws AuthenticationException if credentials are invalid
     * @throws AccountLockedException if account is locked after failed attempts
     */
    public JwtToken authenticate(String username, String password) 
            throws AuthenticationException {
        // Copilot generates implementation
    }
}
```

### Go

**Go Conventions:**
```go
// UserService provides operations for user management.
// It implements concurrent-safe caching and database operations.
// All methods return errors that should be checked.
type UserService struct {
    db    *sql.DB
    cache *redis.Client
    mu    sync.RWMutex
}

// GetUser retrieves a user by ID with caching.
// It first checks the cache, then falls back to database.
// Returns ErrUserNotFound if user doesn't exist.
//
// Example:
//   user, err := service.GetUser(ctx, 123)
//   if err != nil {
//       log.Fatal(err)
//   }
func (s *UserService) GetUser(ctx context.Context, userID int64) (*User, error) {
    // Copilot generates implementation with proper error handling
}
```

## Advanced Prompting Techniques

### Technique 1: Progressive Refinement

**Step 1: Basic Structure**
```python
# Create a caching decorator for expensive function calls
```

**Step 2: Add Requirements**
```python
# Create a caching decorator for expensive function calls
# Support TTL (time-to-live) for cache entries
# Use functools.wraps to preserve function metadata
```

**Step 3: Add Details**
```python
# Create a caching decorator for expensive function calls
# Support TTL (time-to-live) for cache entries
# Use functools.wraps to preserve function metadata
# Implement LRU eviction when cache size exceeds max_size
# Thread-safe for concurrent access
# Support cache invalidation by key pattern
```

### Technique 2: Example-Driven Development

**With Examples:**
```python
# Parse and validate phone numbers in various formats
# Examples:
#   "+1-555-123-4567" -> "+15551234567" (valid)
#   "(555) 123-4567" -> "+15551234567" (valid, assume US)
#   "123-4567" -> None (invalid, too short)
#   "+44 20 7123 4567" -> "+442071234567" (valid, UK)
# Return normalized format or None if invalid
def parse_phone_number(phone: str, default_country: str = 'US') -> Optional[str]:
    # Copilot generates comprehensive implementation
```

### Technique 3: Constraint-Based Prompting

**With Constraints:**
```python
# Implement rate limiter using token bucket algorithm
# Constraints:
#   - Must be thread-safe
#   - Support burst allowance
#   - No external dependencies (pure Python)
#   - Memory efficient for high concurrency
#   - Configurable rate and bucket size
# Return True if request allowed, False if rate limit exceeded
class TokenBucketLimiter:
    # Copilot generates implementation matching constraints
```

### Technique 4: Test-Driven Prompting

**Write Test First:**
```python
def test_calculate_shipping_cost():
    """Test shipping cost calculation with various scenarios."""
    # Free shipping for orders over $100
    assert calculate_shipping_cost(120.00, 'US') == 0.0
    
    # Standard rate for domestic orders
    assert calculate_shipping_cost(50.00, 'US') == 5.99
    
    # International shipping
    assert calculate_shipping_cost(50.00, 'UK') == 15.99
    
    # Expedited shipping
    assert calculate_shipping_cost(50.00, 'US', expedited=True) == 12.99
    
    # Heavy item surcharge (weight > 10 lbs)
    assert calculate_shipping_cost(50.00, 'US', weight=15) == 10.99

# Now write the function - Copilot will match test expectations
def calculate_shipping_cost(
    order_total: float,
    country: str,
    expedited: bool = False,
    weight: float = 1.0
) -> float:
    # Copilot generates implementation that passes tests
```

### Technique 5: Architectural Prompting

**High-Level Design:**
```python
# Implement a simple event sourcing system
# Architecture:
#   - Event Store: append-only storage for events
#   - Aggregates: rebuild state from events
#   - Event Handlers: process events asynchronously
#   - Snapshots: periodic state snapshots for performance
# Components:
#   - Event class: base event with timestamp and metadata
#   - EventStore class: persist and retrieve events
#   - Aggregate class: apply events to rebuild state
#   - EventBus class: publish/subscribe mechanism
class EventSourcingSystem:
    # Copilot generates complete architecture
```

## Context Optimization

### File-Level Context

**Import Statements:**
```python
# Copilot uses imports to understand available libraries
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from typing import List, Dict, Optional

# Now suggestions will use these libraries appropriately
```

**Existing Code Patterns:**
```python
# Copilot learns from existing patterns in your file
class UserRepository:
    def get_by_id(self, user_id: int) -> User:
        pass
    
    def get_by_email(self, email: str) -> User:
        pass

# New method suggestion will follow the same pattern
class ProductRepository:
    # Copilot suggests: def get_by_id(self, product_id: int) -> Product:
```

### Project-Level Context

**README Content:**
```markdown
# Project uses:
- FastAPI for REST API
- PostgreSQL for database
- Redis for caching
- Celery for background tasks
- Pytest for testing

# Naming conventions:
- snake_case for functions and variables
- PascalCase for classes
- UPPER_CASE for constants
```

**Configuration Files:**
```python
# pyproject.toml presence tells Copilot about project structure
# .env files indicate environment variable usage
# requirements.txt shows dependencies
```

## Common Pitfalls and Solutions

### Pitfall 1: Vague Prompts

**Problem:**
```python
# process data
```

**Solution:**
```python
# Process user registration data:
# 1. Validate email format and uniqueness
# 2. Hash password using bcrypt
# 3. Create user record in database
# 4. Send welcome email
# 5. Return user ID or validation errors
```

### Pitfall 2: Missing Error Handling

**Problem:**
```python
# fetch from API
```

**Solution:**
```python
# Fetch user data from external API with comprehensive error handling
# Handle: network timeouts (retry), 404 (return None), 500 (log and retry)
# Include request tracking with correlation ID
# Timeout: 10 seconds
```

### Pitfall 3: No Type Information

**Problem:**
```python
def transform(data):
    # transform the data
```

**Solution:**
```python
def transform(data: List[Dict[str, Any]]) -> pd.DataFrame:
    """
    Transform list of dictionaries to pandas DataFrame.
    Handles missing values and type conversion.
    """
```

### Pitfall 4: Unclear Requirements

**Problem:**
```javascript
// sort array
```

**Solution:**
```javascript
// Sort array of user objects by multiple criteria:
// 1. Primary: by 'lastActive' date (descending)
// 2. Secondary: by 'username' (ascending, case-insensitive)
// 3. Handle null lastActive dates (put at end)
// Return new sorted array without mutating original
```

## Prompt Templates

### Template 1: API Endpoint

```python
# [HTTP Method] /api/[resource]/[action]
# Purpose: [what it does]
# Authentication: [required/optional/none]
# Request Body: [structure]
# Response: [structure]
# Errors: [possible error codes]
# Rate Limit: [if applicable]
```

### Template 2: Database Query

```python
# Query [table/collection] to [action]
# Filters: [list of filters]
# Joins: [related tables]
# Sorting: [sort criteria]
# Pagination: [page/limit]
# Indexes: [relevant indexes]
# Performance: [expected query time]
```

### Template 3: Utility Function

```python
# [Function name]: [one-line purpose]
# Input: [type and constraints]
# Output: [type and format]
# Edge Cases: [list edge cases]
# Performance: [time/space complexity]
# Thread-Safe: [yes/no]
```

### Template 4: Class Design

```python
# [ClassName] - [purpose]
# Responsibilities:
#   - [responsibility 1]
#   - [responsibility 2]
# Collaborators: [other classes it works with]
# Patterns: [design patterns used]
# Thread-Safety: [thread-safe/not thread-safe]
```

## Measuring Prompt Effectiveness

### Metrics to Track

1. **Acceptance Rate**: How often do you accept suggestions?
2. **Modification Rate**: How much do you edit accepted suggestions?
3. **Time Saved**: How much faster are you coding?
4. **Code Quality**: Are suggestions meeting your standards?

### Iteration Process

```
1. Write prompt
2. Review suggestion
3. If good → Accept and note what worked
4. If poor → Refine prompt and try again
5. Build a library of effective prompts
```

## Best Practices Summary

### Do's ✅

- Use clear, specific language
- Provide context and examples
- Specify types and interfaces
- Include error handling requirements
- Mention performance needs
- Reference frameworks/libraries
- Break complex tasks into steps

### Don'ts ❌

- Use vague or generic comments
- Skip error handling
- Ignore edge cases
- Forget to specify types
- Omit performance requirements
- Assume Copilot knows your conventions
- Accept suggestions blindly

## Practice Exercises

### Exercise 1: Improve This Prompt

**Before:**
```python
# create validator
```

**After:**
```python
# Create input validator for user registration form
# Validate: email (RFC 5322), password (8+ chars, mixed case, numbers),
# age (13-120), username (3-20 alphanumeric chars)
# Return dict with field-level error messages
# Use dataclasses for validation rules
```

### Exercise 2: Add Context

**Before:**
```javascript
// sort function
```

**After:**
```javascript
// Sort array of product objects for e-commerce display
// Primary sort: featured products first (featured: true)
// Secondary sort: in-stock items before out-of-stock
// Tertiary sort: by price (ascending)
// Handle undefined values gracefully
// Return new array without mutating input
```

## Key Exam Points

### Must Remember

1. **Specificity**: More specific prompts = better suggestions
2. **Context**: Include type hints, imports, examples
3. **Error Handling**: Always specify how to handle errors
4. **Examples**: Show input/output examples
5. **Patterns**: Use consistent patterns for similar tasks

### Common Scenarios

- "How to get better suggestions?" → Write clearer prompts
- "Copilot generates wrong code?" → Add more context
- "Improve accuracy?" → Include type hints and examples
- "Handle edge cases?" → Specify them in prompts
- "Framework-specific code?" → Mention framework explicitly

## Next Steps

- Practice with [Use Cases and Examples](./09-use-cases-examples.md)
- Review [Best Practices](./06-best-practices.md)
- Study [IDE Integration](./11-ide-integration.md)
- Try [Practice Questions](./13-practice-questions.md)

---

**Remember**: Great prompts are the key to great code suggestions!
