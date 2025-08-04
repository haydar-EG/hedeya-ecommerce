# Kido Land E-commerce Makefile
# Provides convenient commands for development and deployment

# Default target
.DEFAULT_GOAL := help

# Variables
NODE_VERSION := v20.19.4
NPM_VERSION := 10.8.2
FRONTEND_PORT := 5500
BACKEND_PORT := 3001

# Colors for output
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

.PHONY: help install install-frontend install-backend clean build dev dev-frontend dev-backend start test setup health check-deps audit

# Help target - displays available commands
help:
	@echo "$(GREEN)Kido Land E-commerce Platform$(NC)"
	@echo "Available commands:"
	@echo "  $(YELLOW)make install$(NC)         - Install all dependencies (frontend + backend)"
	@echo "  $(YELLOW)make install-frontend$(NC) - Install frontend dependencies only"
	@echo "  $(YELLOW)make install-backend$(NC)  - Install backend dependencies only"
	@echo "  $(YELLOW)make setup$(NC)           - Complete project setup (install + build)"
	@echo "  $(YELLOW)make build$(NC)           - Build the frontend for production"
	@echo "  $(YELLOW)make dev$(NC)             - Start both frontend and backend in development mode"
	@echo "  $(YELLOW)make dev-frontend$(NC)    - Start only frontend development server"
	@echo "  $(YELLOW)make dev-backend$(NC)     - Start only backend development server"
	@echo "  $(YELLOW)make start$(NC)           - Start production servers"
	@echo "  $(YELLOW)make test$(NC)            - Run tests"
	@echo "  $(YELLOW)make clean$(NC)           - Clean build artifacts and dependencies"
	@echo "  $(YELLOW)make health$(NC)          - Check system health and requirements"
	@echo "  $(YELLOW)make check-deps$(NC)      - Check for dependency vulnerabilities"
	@echo "  $(YELLOW)make audit$(NC)           - Run security audit and fix issues"
	@echo ""
	@echo "$(GREEN)Quick Start:$(NC)"
	@echo "  1. make setup     # Install dependencies and build"
	@echo "  2. make dev       # Start development servers"
	@echo "  3. Open http://localhost:$(FRONTEND_PORT) for frontend"
	@echo "  4. Open http://localhost:$(BACKEND_PORT) for backend API"

# Install all dependencies
install: install-frontend install-backend
	@echo "$(GREEN)✓ All dependencies installed successfully$(NC)"

# Install frontend dependencies
install-frontend:
	@echo "$(YELLOW)Installing frontend dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Frontend dependencies installed$(NC)"

# Install backend dependencies
install-backend:
	@echo "$(YELLOW)Installing backend dependencies...$(NC)"
	cd backend && npm install
	@echo "$(GREEN)✓ Backend dependencies installed$(NC)"

# Complete project setup
setup: install build
	@echo "$(GREEN)✓ Project setup completed successfully!$(NC)"
	@echo "$(YELLOW)Next steps:$(NC)"
	@echo "  - Run 'make dev' to start development servers"
	@echo "  - Frontend will be available at http://localhost:$(FRONTEND_PORT)"
	@echo "  - Backend API will be available at http://localhost:$(BACKEND_PORT)"

# Build frontend for production
build:
	@echo "$(YELLOW)Building frontend for production...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Frontend built successfully$(NC)"

# Start development servers (both frontend and backend)
dev:
	@echo "$(GREEN)Starting development servers...$(NC)"
	@echo "$(YELLOW)Frontend will be available at http://localhost:$(FRONTEND_PORT)$(NC)"
	@echo "$(YELLOW)Backend will be available at http://localhost:$(BACKEND_PORT)$(NC)"
	@echo "$(RED)Press Ctrl+C to stop both servers$(NC)"
	@echo ""
	@make -j2 dev-frontend dev-backend

# Start frontend development server
dev-frontend:
	@echo "$(YELLOW)Starting frontend development server...$(NC)"
	npm run dev

# Start backend development server
dev-backend:
	@echo "$(YELLOW)Starting backend development server...$(NC)"
	cd backend && npm run dev

# Start production servers
start: build
	@echo "$(YELLOW)Starting production servers...$(NC)"
	@echo "$(GREEN)Frontend built and ready$(NC)"
	@echo "$(YELLOW)Starting backend server...$(NC)"
	cd backend && npm start

# Run tests
test:
	@echo "$(YELLOW)Running tests...$(NC)"
	@echo "$(RED)No tests configured yet$(NC)"
	@echo "Frontend tests:"
	-npm test
	@echo "Backend tests:"
	-cd backend && npm test

# Clean build artifacts and dependencies
clean:
	@echo "$(YELLOW)Cleaning build artifacts and dependencies...$(NC)"
	rm -rf node_modules
	rm -rf backend/node_modules
	rm -rf dist
	rm -rf backend/dist
	rm -f package-lock.json
	rm -f backend/package-lock.json
	@echo "$(GREEN)✓ Cleanup completed$(NC)"

# Check system health and requirements
health:
	@echo "$(GREEN)System Health Check$(NC)"
	@echo "===================="
	@echo -n "Node.js version: "
	@node --version || echo "$(RED)Node.js not found!$(NC)"
	@echo -n "npm version: "
	@npm --version || echo "$(RED)npm not found!$(NC)"
	@echo ""
	@echo "$(YELLOW)Required versions:$(NC)"
	@echo "  Node.js: >= 16.0.0 (recommended: $(NODE_VERSION))"
	@echo "  npm: >= 8.0.0 (current: $(NPM_VERSION))"
	@echo ""
	@echo "$(YELLOW)Project status:$(NC)"
	@if [ -d "node_modules" ]; then echo "$(GREEN)✓ Frontend dependencies installed$(NC)"; else echo "$(RED)✗ Frontend dependencies missing$(NC)"; fi
	@if [ -d "backend/node_modules" ]; then echo "$(GREEN)✓ Backend dependencies installed$(NC)"; else echo "$(RED)✗ Backend dependencies missing$(NC)"; fi
	@if [ -d "dist" ]; then echo "$(GREEN)✓ Frontend built$(NC)"; else echo "$(YELLOW)! Frontend not built$(NC)"; fi

# Check for dependency vulnerabilities
check-deps:
	@echo "$(YELLOW)Checking frontend dependencies...$(NC)"
	npm audit
	@echo ""
	@echo "$(YELLOW)Checking backend dependencies...$(NC)"
	cd backend && npm audit

# Run security audit and fix issues
audit:
	@echo "$(YELLOW)Running security audit and fixing issues...$(NC)"
	@echo "Frontend audit:"
	npm audit fix
	@echo ""
	@echo "Backend audit:"
	cd backend && npm audit fix
	@echo "$(GREEN)✓ Security audit completed$(NC)"

# Development helpers
.PHONY: logs status ports

# Show running processes and ports
status:
	@echo "$(GREEN)Process Status$(NC)"
	@echo "=============="
	@echo "$(YELLOW)Checking for running Node.js processes:$(NC)"
	@ps aux | grep -E "(node|npm)" | grep -v grep || echo "No Node.js processes running"
	@echo ""
	@echo "$(YELLOW)Checking ports $(FRONTEND_PORT) and $(BACKEND_PORT):$(NC)"
	@lsof -i :$(FRONTEND_PORT) || echo "Port $(FRONTEND_PORT) is free"
	@lsof -i :$(BACKEND_PORT) || echo "Port $(BACKEND_PORT) is free"

# Show available ports
ports:
	@echo "$(GREEN)Port Information$(NC)"
	@echo "=================="
	@echo "Frontend (Vite): http://localhost:$(FRONTEND_PORT)"
	@echo "Backend API: http://localhost:$(BACKEND_PORT)"
	@echo "Backend Health: http://localhost:$(BACKEND_PORT)/api/health"
	@echo ""
	@echo "$(YELLOW)Currently used ports:$(NC)"
	@lsof -i -P -n | grep LISTEN | grep -E ":($(FRONTEND_PORT)|$(BACKEND_PORT))" || echo "Target ports are free"

# Quick restart
restart:
	@echo "$(YELLOW)Restarting services...$(NC)"
	@pkill -f "vite" || true
	@pkill -f "node.*server" || true
	@sleep 2
	@make dev