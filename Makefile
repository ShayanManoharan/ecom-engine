.PHONY: help up down be fe test clean build

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Start all development services (Postgres, Redis, LocalStack)
	docker-compose up -d

down: ## Stop all development services
	docker-compose down

clean: ## Stop all services and remove volumes
	docker-compose down -v
	docker-compose rm -f

be: ## Run backend application
	cd backend && ./mvnw spring-boot:run

fe: ## Run frontend development server
	cd frontend && npm run dev

build: ## Build both backend and frontend
	cd backend && ./mvnw clean package -DskipTests
	cd frontend && npm run build

test: ## Run backend tests
	cd backend && ./mvnw test

test-it: ## Run backend integration tests
	cd backend && ./mvnw -Dtest=*IT test

test-all: ## Run all backend tests
	cd backend && ./mvnw verify

install-fe: ## Install frontend dependencies
	cd frontend && npm install

install-be: ## Install backend dependencies
	cd backend && ./mvnw dependency:resolve

install: install-be install-fe ## Install all dependencies

logs: ## Show service logs
	docker-compose logs -f

status: ## Show service status
	docker-compose ps

reset-db: ## Reset database (stop, clean, start)
	make down
	make up
	@echo "Database reset complete. Wait 10 seconds for services to be ready..."
	@sleep 10

dev: up ## Start development environment (services + backend)
	@echo "Starting development environment..."
	@echo "Backend will be available at: http://localhost:8080"
	@echo "Frontend will be available at: http://localhost:5173"
	@echo "Swagger UI: http://localhost:8080/swagger-ui.html"
	@echo "Health check: http://localhost:8080/actuator/health"
	@echo ""
	@echo "Starting backend..."
	make be
