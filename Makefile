.PHONY: help dev dev:web dev:worker build test clean db:reset db:seed db:migrate docker:up docker:down

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start development environment
	@echo "Starting development environment..."
	pnpm install
	pnpm dev

dev:web: ## Start web development server
	@echo "Starting web development server..."
	pnpm --filter @tribal/web dev

dev:worker: ## Start worker development server
	@echo "Starting worker development server..."
	cd apps/worker && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8001

build: ## Build all applications
	@echo "Building applications..."
	pnpm build

test: ## Run all tests
	@echo "Running tests..."
	pnpm test

test:e2e: ## Run end-to-end tests
	@echo "Running E2E tests..."
	pnpm test:e2e

clean: ## Clean all build artifacts
	@echo "Cleaning build artifacts..."
	pnpm clean
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules

db:reset: ## Reset database and run migrations
	@echo "Resetting database..."
	pnpm --filter @tribal/db reset

db:seed: ## Seed database with sample data
	@echo "Seeding database..."
	pnpm --filter @tribal/db seed

db:migrate: ## Run database migrations
	@echo "Running database migrations..."
	pnpm --filter @tribal/db migrate

docker:up: ## Start Docker services
	@echo "Starting Docker services..."
	docker-compose up -d

docker:down: ## Stop Docker services
	@echo "Stopping Docker services..."
	docker-compose down

docker:logs: ## Show Docker logs
	@echo "Showing Docker logs..."
	docker-compose logs -f

setup: ## Initial setup
	@echo "Setting up WTTT Operator Dashboard..."
	pnpm install
	cp apps/web/.env.example apps/web/.env
	cp apps/worker/.env.example apps/worker/.env
	@echo "Setup complete! Edit .env files and run 'make docker:up' to start services."
