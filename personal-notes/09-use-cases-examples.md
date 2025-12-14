# Use Cases and Examples

## Common Use Cases

### 1. API Development

**Scenario:** Building a REST API

**Use Case:**
```python
# Create a Flask REST API for managing books
from flask import Flask, request, jsonify

app = Flask(__name__)

# Copilot generates complete CRUD operations
@app.route('/books', methods=['GET'])
def get_books():
    # GET all books with pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    books = Book.query.paginate(page=page, per_page=per_page)
    return jsonify({
        'books': [book.to_dict() for book in books.items],
        'total': books.total,
        'pages': books.pages,
        'current_page': page
    })

@app.route('/books', methods=['POST'])
def create_book():
    # POST new book with validation
    data = request.get_json()
    
    if not data or not data.get('title'):
        return jsonify({'error': 'Title is required'}), 400
    
    book = Book(
        title=data['title'],
        author=data.get('author'),
        isbn=data.get('isbn'),
        published_date=data.get('published_date')
    )
    
    db.session.add(book)
    db.session.commit()
    
    return jsonify(book.to_dict()), 201
```

### 2. Data Processing

**Scenario:** Processing CSV files

**Use Case:**
```python
# Read and process large CSV file with error handling
import pandas as pd
import logging

def process_sales_data(filename):
    """
    Process sales data from CSV file.
    Calculate totals, apply discounts, and generate report.
    """
    try:
        # Read CSV with chunking for large files
        chunks = []
        for chunk in pd.read_csv(filename, chunksize=10000):
            # Clean data
            chunk = chunk.dropna(subset=['product_id', 'amount'])
            
            # Apply business logic
            chunk['discount'] = chunk['amount'].apply(
                lambda x: 0.1 if x > 1000 else 0.05
            )
            chunk['final_price'] = chunk['amount'] * (1 - chunk['discount'])
            
            chunks.append(chunk)
        
        # Combine results
        df = pd.concat(chunks, ignore_index=True)
        
        # Generate summary
        summary = {
            'total_sales': df['final_price'].sum(),
            'average_order': df['final_price'].mean(),
            'total_orders': len(df),
            'top_products': df.groupby('product_id')['final_price'].sum().nlargest(10)
        }
        
        return summary
    
    except Exception as e:
        logging.error(f"Error processing file: {e}")
        raise

# Generate report
summary = process_sales_data('sales_2023.csv')
print(f"Total Sales: ${summary['total_sales']:,.2f}")
```

### 3. Frontend Development

**Scenario:** React component creation

**Use Case:**
```jsx
// Create a reusable user profile component with TypeScript
import React, { useState, useEffect } from 'react';
import { User, UserService } from './services';

interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, onUpdate }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await UserService.getUser(userId);
      setUser(userData);
      setError(null);
    } catch (err) {
      setError('Failed to load user profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedData: Partial<User>) => {
    try {
      const updated = await UserService.updateUser(userId, updatedData);
      setUser(updated);
      setEditing(false);
      onUpdate?.(updated);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {editing ? (
        <UserEditForm user={user} onSave={handleSave} onCancel={() => setEditing(false)} />
      ) : (
        <button onClick={() => setEditing(true)}>Edit Profile</button>
      )}
    </div>
  );
};

export default UserProfile;
```

### 4. Database Operations

**Scenario:** Database migrations and queries

**Use Case:**
```python
# Create database models and migrations with SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False, index=True)
    email = Column(String(120), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    posts = relationship('Post', back_populates='author', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.username}>'

class Post(Base):
    __tablename__ = 'posts'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    author_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    author = relationship('User', back_populates='posts')
    
    def __repr__(self):
        return f'<Post {self.title}>'

# Complex query with joins and aggregations
def get_user_post_statistics(user_id):
    """Get comprehensive statistics for a user's posts."""
    from sqlalchemy import func
    from database import session
    
    stats = session.query(
        User.username,
        func.count(Post.id).label('total_posts'),
        func.max(Post.created_at).label('last_post_date'),
        func.avg(func.length(Post.content)).label('avg_post_length')
    ).join(Post).filter(User.id == user_id).group_by(User.id).first()
    
    return {
        'username': stats.username,
        'total_posts': stats.total_posts,
        'last_post_date': stats.last_post_date,
        'avg_post_length': int(stats.avg_post_length)
    }
```

### 5. Testing

**Scenario:** Comprehensive test suite

**Use Case:**
```python
# Generate unit tests for user authentication
import pytest
from unittest.mock import Mock, patch
from auth import AuthService, User

class TestAuthService:
    """Test suite for authentication service."""
    
    @pytest.fixture
    def auth_service(self):
        return AuthService(secret_key='test-secret')
    
    @pytest.fixture
    def mock_user(self):
        return User(
            id=1,
            username='testuser',
            email='test@example.com',
            password_hash='hashed_password'
        )
    
    def test_successful_login(self, auth_service, mock_user):
        """Test successful user login."""
        with patch('auth.User.query') as mock_query:
            mock_query.filter_by.return_value.first.return_value = mock_user
            
            token = auth_service.login('testuser', 'correct_password')
            
            assert token is not None
            assert isinstance(token, str)
    
    def test_login_with_invalid_credentials(self, auth_service):
        """Test login with invalid credentials."""
        with patch('auth.User.query') as mock_query:
            mock_query.filter_by.return_value.first.return_value = None
            
            with pytest.raises(ValueError, match='Invalid credentials'):
                auth_service.login('testuser', 'wrong_password')
    
    def test_token_validation(self, auth_service, mock_user):
        """Test token validation."""
        token = auth_service.generate_token(mock_user)
        
        decoded = auth_service.validate_token(token)
        
        assert decoded['user_id'] == mock_user.id
        assert decoded['username'] == mock_user.username
    
    def test_expired_token(self, auth_service):
        """Test that expired tokens are rejected."""
        expired_token = 'expired.token.here'
        
        with pytest.raises(ValueError, match='Token expired'):
            auth_service.validate_token(expired_token)
    
    @pytest.mark.parametrize('username,email,expected', [
        ('valid_user', 'valid@example.com', True),
        ('', 'email@example.com', False),
        ('user', '', False),
        ('user', 'invalid-email', False),
    ])
    def test_user_validation(self, auth_service, username, email, expected):
        """Test user input validation."""
        is_valid = auth_service.validate_user_input(username, email)
        assert is_valid == expected
```

### 6. DevOps and CI/CD

**Scenario:** GitHub Actions workflow

**Use Case:**
```yaml
# Create comprehensive CI/CD pipeline
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18.x'
  PYTHON_VERSION: '3.11'

jobs:
  lint:
    name: Code Linting
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run Prettier
        run: npm run format:check

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    needs: lint
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests

  security:
    name: Security Scan
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Snyk Security Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      
      - name: Run npm audit
        run: npm audit --audit-level=high

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, test, security]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Deploy to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.DEPLOY_HOST }}
          username: ${{ secrets.DEPLOY_USER }}
          key: ${{ secrets.DEPLOY_KEY }}
          source: "dist/*"
          target: "/var/www/app"
```

### 7. Microservices

**Scenario:** Microservice communication

**Use Case:**
```python
# Create microservice with FastAPI
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import httpx
from redis import Redis
import json

app = FastAPI(title="User Service", version="1.0.0")
redis_client = Redis(host='redis', port=6379, decode_responses=True)

class User(BaseModel):
    id: Optional[int] = None
    username: str
    email: EmailStr
    full_name: str

class UserService:
    """User service with caching and external API calls."""
    
    def __init__(self):
        self.cache = redis_client
        self.auth_service_url = "http://auth-service:8000"
    
    async def get_user(self, user_id: int) -> User:
        """Get user with caching."""
        # Check cache first
        cached = self.cache.get(f"user:{user_id}")
        if cached:
            return User(**json.loads(cached))
        
        # Fetch from database
        user = await self._fetch_from_db(user_id)
        
        # Cache for 5 minutes
        self.cache.setex(
            f"user:{user_id}",
            300,
            json.dumps(user.dict())
        )
        
        return user
    
    async def verify_user_token(self, token: str) -> dict:
        """Verify token with auth service."""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.auth_service_url}/verify",
                    json={"token": token},
                    timeout=5.0
                )
                response.raise_for_status()
                return response.json()
            except httpx.HTTPError as e:
                raise HTTPException(status_code=401, detail="Invalid token")
    
    async def _fetch_from_db(self, user_id: int) -> User:
        """Fetch user from database."""
        # Database query logic here
        pass

@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int, service: UserService = Depends()):
    """Get user by ID."""
    try:
        return await service.get_user(user_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail="User not found")

@app.get("/users", response_model=List[User])
async def list_users(skip: int = 0, limit: int = 10):
    """List users with pagination."""
    # Implementation here
    pass
```

### 8. Machine Learning Integration

**Scenario:** ML model serving

**Use Case:**
```python
# Create ML model serving API
import numpy as np
import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, validator
from typing import List

app = FastAPI()

# Load pre-trained model
model = joblib.load('models/sentiment_model.pkl')
vectorizer = joblib.load('models/vectorizer.pkl')

class PredictionInput(BaseModel):
    text: str
    
    @validator('text')
    def validate_text(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Text cannot be empty')
        if len(v) > 5000:
            raise ValueError('Text too long (max 5000 characters)')
        return v.strip()

class PredictionOutput(BaseModel):
    sentiment: str
    confidence: float
    probabilities: dict

@app.post("/predict", response_model=PredictionOutput)
async def predict_sentiment(input_data: PredictionInput):
    """
    Predict sentiment of input text.
    Returns sentiment (positive/negative/neutral) with confidence score.
    """
    try:
        # Vectorize input
        features = vectorizer.transform([input_data.text])
        
        # Get prediction
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        
        # Get confidence score
        confidence = float(np.max(probabilities))
        
        # Map to sentiment labels
        sentiment_map = {0: 'negative', 1: 'neutral', 2: 'positive'}
        sentiment = sentiment_map[prediction]
        
        # Prepare probability dict
        prob_dict = {
            sentiment_map[i]: float(prob)
            for i, prob in enumerate(probabilities)
        }
        
        return PredictionOutput(
            sentiment=sentiment,
            confidence=confidence,
            probabilities=prob_dict
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )

@app.post("/batch-predict", response_model=List[PredictionOutput])
async def batch_predict(texts: List[PredictionInput]):
    """Batch prediction for multiple texts."""
    results = []
    for text_input in texts:
        result = await predict_sentiment(text_input)
        results.append(result)
    return results
```

## Real-World Scenarios

### Scenario 1: Refactoring Legacy Code

**Problem:** Old callback-based code needs modernization

**Solution with Copilot:**
```javascript
// Old callback-based code
function fetchUserData(userId, callback) {
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results[0]);
        }
    });
}

// Ask Copilot: "Convert to async/await with error handling"
// Copilot generates:
async function fetchUserData(userId) {
    try {
        const [results] = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [userId]
        );
        return results;
    } catch (error) {
        console.error('Database query failed:', error);
        throw new Error('Failed to fetch user data');
    }
}
```

### Scenario 2: Adding Comprehensive Logging

**Problem:** Need structured logging throughout application

**Solution with Copilot:**
```python
# Ask Copilot: "Add structured logging with contextual information"

import logging
import json
from datetime import datetime
from functools import wraps

class StructuredLogger:
    """Structured logging utility with context."""
    
    def __init__(self, name):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)
        
        # JSON formatter
        handler = logging.StreamHandler()
        handler.setFormatter(self._json_formatter())
        self.logger.addHandler(handler)
    
    def _json_formatter(self):
        class JsonFormatter(logging.Formatter):
            def format(self, record):
                log_data = {
                    'timestamp': datetime.utcnow().isoformat(),
                    'level': record.levelname,
                    'message': record.getMessage(),
                    'module': record.module,
                    'function': record.funcName,
                    'line': record.lineno
                }
                if hasattr(record, 'extra'):
                    log_data.update(record.extra)
                return json.dumps(log_data)
        return JsonFormatter()
    
    def log_function_call(self, func):
        """Decorator to log function calls."""
        @wraps(func)
        async def wrapper(*args, **kwargs):
            self.logger.info(
                f"Calling {func.__name__}",
                extra={'args': str(args), 'kwargs': str(kwargs)}
            )
            try:
                result = await func(*args, **kwargs)
                self.logger.info(
                    f"Completed {func.__name__}",
                    extra={'result': str(result)[:100]}
                )
                return result
            except Exception as e:
                self.logger.error(
                    f"Error in {func.__name__}",
                    extra={'error': str(e)},
                    exc_info=True
                )
                raise
        return wrapper
```

### Scenario 3: Building Configuration Management

**Problem:** Need centralized configuration with validation

**Solution with Copilot:**
```python
# Ask Copilot: "Create configuration manager with environment variable support and validation"

from pydantic import BaseSettings, validator, PostgresDsn, RedisDsn
from typing import Optional
import os

class Settings(BaseSettings):
    """Application settings with validation."""
    
    # Application
    app_name: str = "MyApp"
    environment: str = "development"
    debug: bool = False
    
    # Database
    database_url: PostgresDsn
    db_pool_size: int = 10
    db_max_overflow: int = 20
    
    # Redis
    redis_url: RedisDsn
    redis_ttl: int = 300
    
    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_key: str
    
    # Security
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # AWS
    aws_access_key_id: Optional[str] = None
    aws_secret_access_key: Optional[str] = None
    aws_region: str = "us-east-1"
    
    @validator('environment')
    def validate_environment(cls, v):
        allowed = ['development', 'staging', 'production']
        if v not in allowed:
            raise ValueError(f'Environment must be one of {allowed}')
        return v
    
    @validator('api_port')
    def validate_port(cls, v):
        if not 1024 <= v <= 65535:
            raise ValueError('Port must be between 1024 and 65535')
        return v
    
    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'
        case_sensitive = False

# Singleton instance
settings = Settings()

# Usage
print(f"Running {settings.app_name} in {settings.environment} mode")
```

## Prompt Engineering Examples

### Example 1: Specific Context

**Poor Prompt:**
```
# Create function
```

**Good Prompt:**
```python
# Create async function to fetch user profile from PostgreSQL database
# Include error handling, logging, and connection pooling
# Return User model or raise UserNotFoundError
```

### Example 2: Including Requirements

**Poor Prompt:**
```
# Validate email
```

**Good Prompt:**
```python
# Validate email address using comprehensive regex pattern
# Check for: valid format, domain existence, no special characters
# Return tuple of (is_valid: bool, error_message: str)
# Support international domains and plus addressing
```

### Example 3: Specifying Framework

**Poor Prompt:**
```
# Create web server
```

**Good Prompt:**
```python
# Create FastAPI web server with:
# - CORS middleware
# - Request logging
# - Rate limiting
# - Health check endpoint
# - OpenAPI documentation
# - Graceful shutdown handling
```

## Tips for Success

### Do's

✅ Provide clear context
✅ Specify programming language/framework
✅ Mention error handling requirements
✅ Include expected input/output
✅ Specify performance requirements
✅ Mention security considerations

### Don'ts

❌ Use vague comments
❌ Skip requirements
❌ Ignore error handling
❌ Accept without review
❌ Skip testing
❌ Forget documentation

## Next Steps

- Study [Prompt Engineering](./10-prompt-engineering.md)
- Review [Best Practices](./06-best-practices.md)
- Practice [IDE Integration](./11-ide-integration.md)
- Try [Practice Questions](./13-practice-questions.md)

---

**Practice Makes Perfect**: Use these examples as templates for your own projects!
