# GitHub Copilot Best Practices

## General Best Practices

### 1. Review All Suggestions

**Why It Matters:**
- AI can make mistakes
- Suggestions may not fit your context
- Security vulnerabilities possible
- Logic errors can occur

**How to Review:**
```python
# Don't blindly accept this:
def process_user_input(data):
    # Review: Does this handle SQL injection?
    query = f"SELECT * FROM users WHERE id = {data}"
    
# Better with review:
def process_user_input(data):
    query = "SELECT * FROM users WHERE id = ?"
    # Use parameterized queries
```

**Checklist:**
- ✅ Code correctness
- ✅ Security implications
- ✅ Performance considerations
- ✅ Style consistency
- ✅ Edge cases handled

### 2. Provide Clear Context

**Better Prompts:**
```javascript
// ❌ Bad: Create function
// ✅ Good: Create async function to fetch user data from REST API with error handling

// ❌ Bad: Validate input
// ✅ Good: Validate email format using regex pattern, return boolean
```

**Context Elements:**
- Function purpose
- Expected inputs/outputs
- Error handling requirements
- Performance constraints
- Framework/library being used

### 3. Use Descriptive Names

**Impact on Suggestions:**
```python
# ❌ Poor naming
def f(x, y):
    # Copilot struggles to understand intent
    
# ✅ Good naming
def calculate_monthly_payment(principal, interest_rate):
    # Copilot generates accurate financial calculations
```

### 4. Write Comments First

**Comment-Driven Development:**
```python
# Calculate the Fibonacci sequence up to n terms
def fibonacci(n):
    # Copilot generates accurate implementation
    pass

# Process user registration with email validation and password hashing
def register_user(email, password):
    # Copilot includes validation and security
    pass
```

### 5. Break Down Complex Tasks

**Instead of:**
```python
# Create complete user management system
```

**Do This:**
```python
# Step 1: Create User model with validation
# Step 2: Add password hashing
# Step 3: Create registration endpoint
# Step 4: Add login functionality
# Step 5: Implement JWT token generation
```

## Security Best Practices

### 1. Never Trust Generated Code Blindly

**Security Review Checklist:**
```python
# Check for:
# - SQL injection vulnerabilities
# - XSS vulnerabilities
# - Authentication bypasses
# - Insecure data exposure
# - Security misconfiguration
# - Insecure dependencies
```

### 2. Verify External Package Usage

**Example:**
```javascript
// Copilot suggests package
import { someFunction } from 'random-package';

// ✅ Before using:
// 1. Check package reputation
// 2. Review recent updates
// 3. Check for known vulnerabilities
// 4. Verify it's the official package
```

### 3. Handle Sensitive Data Properly

**Don't Do This:**
```python
# ❌ Bad: Hardcoded credentials
api_key = "sk-1234567890abcdef"
database_url = "postgresql://user:password@localhost/db"
```

**Do This:**
```python
# ✅ Good: Environment variables
import os
api_key = os.environ.get('API_KEY')
database_url = os.environ.get('DATABASE_URL')
```

### 4. Implement Proper Error Handling

**Security Through Error Handling:**
```python
# ❌ Bad: Exposes sensitive info
try:
    execute_query(query)
except Exception as e:
    return f"Database error: {str(e)}"

# ✅ Good: Generic error messages
try:
    execute_query(query)
except DatabaseError as e:
    logger.error(f"Query failed: {e}")
    return "An error occurred. Please try again."
```

### 5. Use Content Exclusions

**Configure Exclusions:**
```
# Exclude sensitive files from Copilot context
.env
secrets.json
*.key
*.pem
config/production.yml
```

## Code Quality Best Practices

### 1. Maintain Consistent Style

**Style Guides:**
```python
# Configure Copilot to match your style
# Use linters: pylint, eslint, prettier

# Example: PEP 8 for Python
def calculate_total_price(items, tax_rate=0.08):
    """Calculate total price including tax."""
    subtotal = sum(item.price for item in items)
    tax = subtotal * tax_rate
    return subtotal + tax
```

### 2. Add Type Hints

**TypeScript:**
```typescript
// ✅ Better suggestions with types
interface User {
  id: number;
  email: string;
  name: string;
}

function processUser(user: User): Promise<void> {
  // Copilot understands the structure
}
```

**Python:**
```python
# ✅ Type hints help Copilot
def greet(name: str) -> str:
    return f"Hello, {name}"

def process_items(items: list[int]) -> int:
    return sum(items)
```

### 3. Write Unit Tests

**Test-Driven Approach:**
```python
# Write test first
def test_calculate_discount():
    assert calculate_discount(100, 0.1) == 90
    assert calculate_discount(0, 0.1) == 0
    assert calculate_discount(100, 0) == 100

# Then let Copilot help implement
def calculate_discount(price: float, discount: float) -> float:
    # Copilot generates implementation
    pass
```

### 4. Document Your Code

**Good Documentation:**
```python
def complex_algorithm(data: list, threshold: float) -> dict:
    """
    Process data using advanced algorithm.
    
    Args:
        data: List of numerical values to process
        threshold: Minimum value for filtering (0.0 to 1.0)
    
    Returns:
        Dictionary with 'results' and 'metadata' keys
    
    Raises:
        ValueError: If threshold is out of range
    
    Example:
        >>> result = complex_algorithm([1, 2, 3], 0.5)
        >>> print(result['results'])
        [2, 3]
    """
    # Copilot uses docstring for better suggestions
    pass
```

### 5. Follow Language Idioms

**Python Idioms:**
```python
# ✅ Pythonic
result = [x**2 for x in range(10) if x % 2 == 0]

# ❌ Not Pythonic
result = []
for x in range(10):
    if x % 2 == 0:
        result.append(x**2)
```

**JavaScript Idioms:**
```javascript
// ✅ Modern JS
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((a, b) => a + b, 0);

// ❌ Outdated
var doubled = [];
for (var i = 0; i < numbers.length; i++) {
    doubled.push(numbers[i] * 2);
}
```

## Productivity Best Practices

### 1. Use Keyboard Shortcuts

**Master These:**
- `Tab`: Accept suggestion
- `Esc`: Dismiss suggestion
- `Alt/Opt + ]`: Next suggestion
- `Alt/Opt + [`: Previous suggestion
- `Ctrl/Cmd + Enter`: Open suggestion panel
- `Ctrl/Cmd + I`: Inline chat

### 2. Leverage Chat for Exploration

**Effective Chat Usage:**
```
"How do I implement caching in Redis?"
"What's the best way to handle file uploads in Express?"
"Explain the decorator pattern with a Python example"
"Generate tests for this authentication function"
```

### 3. Use Copilot for Boilerplate

**Quick Generation:**
```python
# Create REST API CRUD endpoints for User model
# Copilot generates all CRUD operations

# Generate database migration for new column
# Copilot creates migration file

# Create Dockerfile for Node.js application
# Copilot generates optimized Dockerfile
```

### 4. Iterate on Suggestions

**Refinement Process:**
```
1. Generate initial code
2. Ask Copilot to add error handling
3. Request performance optimization
4. Add input validation
5. Generate tests
6. Add documentation
```

### 5. Use Inline Chat for Refactoring

**Quick Improvements:**
```python
# Select code, Ctrl+I, ask:
"Refactor to use list comprehension"
"Add type hints"
"Make this async"
"Improve error handling"
"Extract this into a separate function"
```

## Team Collaboration Best Practices

### 1. Establish Team Guidelines

**Create Standards:**
```markdown
# Team Copilot Guidelines

## Code Review
- Always review Copilot suggestions
- Test generated code thoroughly
- Document any issues found

## Security
- Never commit credentials
- Review for security vulnerabilities
- Use content exclusions for sensitive files

## Style
- Run linter before committing
- Follow team coding standards
- Use consistent naming conventions
```

### 2. Share Useful Prompts

**Prompt Library:**
```
// Team-specific prompts
"Create API endpoint following our REST standards"
"Implement error handling using our custom ErrorHandler class"
"Generate tests using our test utilities"
```

### 3. Train New Team Members

**Onboarding Checklist:**
- [ ] Install Copilot extension
- [ ] Review team guidelines
- [ ] Learn keyboard shortcuts
- [ ] Practice with sample tasks
- [ ] Understand security policies
- [ ] Know when to ask for help

### 4. Monitor Usage and Impact

**Track Metrics:**
- Code review findings
- Time saved
- Common issues
- Adoption rate
- Developer satisfaction

### 5. Provide Feedback

**Report Issues:**
```
// When Copilot generates incorrect code:
1. Document the issue
2. Share with team
3. Report to GitHub (if appropriate)
4. Create a workaround
```

## Performance Best Practices

### 1. Optimize Context

**Keep It Relevant:**
- Close unnecessary files
- Focus on current task
- Use clear file names
- Organize project structure

### 2. Manage Extension Load

**IDE Performance:**
```json
// VS Code settings.json
{
  "github.copilot.enable": {
    "*": true,
    "yaml": false,  // Disable for specific types
    "plaintext": false,
    "markdown": false  // If not needed
  }
}
```

### 3. Network Optimization

**Best Conditions:**
- Stable internet connection
- Low latency
- No proxy issues
- Proper firewall configuration

### 4. IDE Updates

**Stay Current:**
- Update IDE regularly
- Update Copilot extension
- Clear cache if needed
- Restart IDE periodically

## Language-Specific Best Practices

### Python

```python
# ✅ Use type hints
def process_data(items: list[dict]) -> dict:
    pass

# ✅ Use docstrings
def calculate(x: int) -> int:
    """Calculate something useful."""
    pass

# ✅ Follow PEP 8
MAX_RETRIES = 3
connection_timeout = 30
```

### JavaScript/TypeScript

```typescript
// ✅ Use TypeScript for better suggestions
interface Config {
  apiKey: string;
  timeout: number;
}

// ✅ Use modern syntax
const result = await fetchData();

// ✅ Use destructuring
const { name, email } = user;
```

### Java

```java
// ✅ Use proper annotations
@Service
public class UserService {
    
    @Autowired
    private UserRepository repository;
    
    // ✅ Clear method names
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }
}
```

### Go

```go
// ✅ Follow Go conventions
func ProcessUser(user User) error {
    // Clear error handling
    if user.Email == "" {
        return errors.New("email required")
    }
    return nil
}

// ✅ Use context
func FetchData(ctx context.Context) (*Data, error) {
    // Copilot understands context usage
}
```

## Common Pitfalls to Avoid

### 1. Over-Reliance

**❌ Don't:**
- Accept every suggestion without review
- Skip understanding the code
- Ignore learning fundamentals
- Bypass code review

**✅ Do:**
- Use Copilot as a tool, not a crutch
- Learn from suggestions
- Understand generated code
- Maintain critical thinking

### 2. Ignoring Context

**❌ Don't:**
```python
# Vague prompt
def process():
    pass
```

**✅ Do:**
```python
# Clear context
def process_payment_transaction(
    user_id: str,
    amount: Decimal,
    payment_method: PaymentMethod
) -> TransactionResult:
    """
    Process payment transaction with fraud detection.
    """
    pass
```

### 3. Skipping Tests

**❌ Don't:**
- Skip testing generated code
- Assume code is correct
- Deploy without verification

**✅ Do:**
- Write/generate tests
- Run test suite
- Verify edge cases
- Test error paths

### 4. Security Oversights

**❌ Don't:**
- Commit generated secrets
- Skip security review
- Trust external packages blindly
- Ignore vulnerability warnings

**✅ Do:**
- Review for security issues
- Use security scanners
- Verify dependencies
- Follow security policies

### 5. Poor Prompt Engineering

**❌ Don't:**
```
"make it better"
"fix this"
"add stuff"
```

**✅ Do:**
```
"Refactor to use async/await for better readability"
"Fix the null pointer exception in user validation"
"Add input sanitization to prevent XSS attacks"
```

## Exam Key Points

### Must Remember

1. **Always review** generated code
2. **Security first**: Check for vulnerabilities
3. **Clear prompts** lead to better suggestions
4. **Use comments** to guide Copilot
5. **Iterate**: Refine suggestions progressively

### Common Scenarios

- Best way to get good suggestions? → Clear context and comments
- How to ensure security? → Always review and test
- Improve suggestion quality? → Use descriptive names
- Handle sensitive data? → Use content exclusions
- Team adoption? → Establish guidelines and training

## Quick Reference Checklist

**Before Accepting Suggestions:**
- [ ] Code is syntactically correct
- [ ] Logic meets requirements
- [ ] No security vulnerabilities
- [ ] Follows team style guide
- [ ] Edge cases handled
- [ ] Error handling present
- [ ] Performance acceptable
- [ ] Tests exist/pass

**For Team Success:**
- [ ] Guidelines established
- [ ] Training provided
- [ ] Security policies in place
- [ ] Feedback mechanism exists
- [ ] Metrics tracked
- [ ] Regular reviews conducted

## Next Steps

- Learn [Prompt Engineering](./10-prompt-engineering.md) techniques
- Study [Security and Compliance](./07-security-compliance.md)
- Review [Enterprise Features](./08-enterprise-features.md)
- Practice with [Use Cases](./09-use-cases-examples.md)

---

**Remember**: GitHub Copilot is a powerful tool, but you remain responsible for the code you write!
