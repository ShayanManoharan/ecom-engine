# E-Commerce Engine - Simplified Version

A simplified e-commerce platform with a Spring Boot backend and HTML frontend.

## 🚀 Quick Start

### Prerequisites
- Java 17+ (or Java 24 as configured)
- Maven (or use the included Maven wrapper)
- Python 3 (for serving the frontend)

### Running the Application

1. **Start the Backend**
   ```bash
   cd ecom-engine/backend
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

2. **Start the Frontend**
   ```bash
   cd ecom-engine/frontend
   python3 -m http.server 3000
   ```
   The frontend will be available at `http://localhost:3000`

## 🛠️ What's Included

### Backend (Spring Boot)
- **Health Check API**: `GET /api/health`
- **Actuator Health**: `GET /actuator/health`
- **H2 Database Console**: `http://localhost:8080/h2-console`
- **Database**: H2 in-memory database (no setup required)
- **Security**: Simplified configuration allowing all endpoints

### Frontend (HTML/JavaScript)
- Simple, responsive web interface
- Real-time health status checking
- API response display
- Clean, modern design

## 📋 Available Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Application health status |
| `/actuator/health` | GET | Detailed system health |
| `/h2-console` | GET | Database management console |

## 🔧 Configuration

The application uses H2 in-memory database by default, which means:
- No database setup required
- Data is lost on restart
- Perfect for development and testing

## 🎯 What Was Simplified

- **Database**: Switched from PostgreSQL to H2 in-memory
- **Frontend**: Replaced complex React/Angular setup with simple HTML
- **Security**: Simplified to allow all endpoints for easy testing
- **Dependencies**: Removed unnecessary complexity

## 🚀 Next Steps

To extend this simplified version, you could:
1. Add product management endpoints
2. Implement user authentication
3. Add a shopping cart feature
4. Integrate with a real database
5. Enhance the frontend with more features

## 🐛 Troubleshooting

- **Backend won't start**: Make sure Java 17+ is installed
- **Frontend won't load**: Check if Python HTTP server is running on port 3000
- **CORS issues**: Fixed! The backend now allows cross-origin requests from the frontend
- **"Failed to fetch" errors**: Make sure both backend (port 8080) and frontend (port 3000) are running

## 🧪 Testing

You can test the API communication by visiting:
- **Main Frontend**: http://localhost:3000
- **CORS Test Page**: http://localhost:3000/test.html
- **Backend Health**: http://localhost:8080/api/health
- **Backend Actuator**: http://localhost:8080/actuator/health
