# Headless E-Commerce Engine

A production-quality, backend-heavy e-commerce engine built with Spring Boot 3.3, PostgreSQL, Redis, S3, and Stripe, featuring a minimal React frontend for demonstration.

## 🏗️ Architecture

- **Backend**: Java 21, Spring Boot 3.3, PostgreSQL, Redis, AWS S3, Stripe
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Dev Infrastructure**: Docker Compose, LocalStack, Testcontainers

## 📋 Prerequisites

- Docker & Docker Compose
- JDK 21
- Node.js 18+
- Maven 3.8+

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Clone and navigate to project
cd ecom-engine

# Copy environment variables
cp .env.example .env

# Start infrastructure services
make up
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Build and run
./mvnw clean package -DskipTests
./mvnw spring-boot:run
```

**Backend URLs:**
- API Documentation: http://localhost:8080/swagger-ui.html
- Health Check: http://localhost:8080/actuator/health
- API Base: http://localhost:8080/api

### 3. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies and start
npm install
npm run dev
```

**Frontend URL:** http://localhost:5173

## 🔑 Demo Credentials

### Admin User
- **Email:** admin@ecom.test
- **Password:** Admin!234

### Stripe Test Cards
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Expiry:** Any future date
- **CVC:** Any 3 digits
- **ZIP:** Any 5 digits

## 🔄 Key API Flows

### 1. User Registration & Authentication

```bash
# Register new user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "Password123!"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "Password123!"
  }'
```

### 2. Product Catalog

```bash
# List products
curl http://localhost:8080/api/products

# Get product details
curl http://localhost:8080/api/products/{product-id}

# Get product variants
curl http://localhost:8080/api/products/{product-id}/variants
```

### 3. Shopping Cart

```bash
# Create cart
curl -X POST http://localhost:8080/api/carts

# Add item to cart
curl -X POST http://localhost:8080/api/carts/{cart-id}/items \
  -H "Content-Type: application/json" \
  -d '{
    "variantId": "variant-uuid",
    "qty": 2
  }'

# Apply promotion
curl -X POST http://localhost:8080/api/carts/{cart-id}/apply-promo \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE10"
  }'
```

### 4. Checkout & Payment

```bash
# Create checkout session
curl -X POST http://localhost:8080/api/checkout/session \
  -H "Content-Type: application/json" \
  -d '{
    "cartId": "cart-uuid",
    "currency": "USD",
    "shippingAddress": {
      "line1": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001",
      "country": "US"
    }
  }'
```

### 5. Webhook Testing

For local development, you can either:

**Option A: Simulate webhook in code (dev mode)**
The application will automatically simulate successful payments in development.

**Option B: Use Stripe CLI**
```bash
# Install Stripe CLI and run
stripe listen --forward-to localhost:8080/api/webhooks/stripe --events payment_intent.succeeded
```

Update `STRIPE_WEBHOOK_SECRET` in your `.env` file with the webhook secret provided by Stripe CLI.

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test                    # Unit tests
./mvnw -Dtest=*IT test        # Integration tests
./mvnw verify                  # All tests
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🛠️ Development

### Available Make Commands

```bash
make up          # Start all services (Postgres, Redis, LocalStack)
make down        # Stop all services
make be          # Run backend
make fe          # Run frontend
make test        # Run backend tests
make clean       # Clean all containers and volumes
```

### Database Migrations

Migrations are automatically applied on startup via Flyway. To reset:

```bash
make down
make up
```

### S3 Storage (LocalStack)

- **Endpoint:** http://localhost:4566
- **Bucket:** ecom-dev-bucket (auto-created)
- **Region:** us-east-1

## 📁 Project Structure

```
ecom-engine/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/ecom/engine/
│   │       ├── config/      # Configuration classes
│   │       ├── controller/  # REST controllers
│   │       ├── dto/         # Data transfer objects
│   │       ├── entity/      # JPA entities
│   │       ├── mapper/      # MapStruct mappers
│   │       ├── repository/  # Data repositories
│   │       ├── service/     # Business logic
│   │       └── security/    # JWT security
│   ├── src/main/resources/
│   │   ├── db/migration/    # Flyway migrations
│   │   └── application.yml  # Configuration
│   └── pom.xml
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml       # Development services
├── Makefile                 # Development commands
├── .env.example            # Environment template
└── README.md
```

## 🔒 Security Features

- JWT-based authentication
- BCrypt password hashing
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection

## 🚀 Production Considerations

This is a demonstration project. For production use, consider:

- **Security**: Rotating JWT keys, mTLS for webhooks, rate limiting
- **Scalability**: Database connection pooling, Redis clustering
- **Monitoring**: Application metrics, distributed tracing
- **Deployment**: Container orchestration, CI/CD pipelines
- **Compliance**: PCI DSS for payment processing, GDPR for data protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
