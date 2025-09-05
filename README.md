# WELCOME TO THE TRIBE (WTTT) Operator Dashboard

A production-ready operator dashboard for WTTT wellness brand that centralizes finished goods inventory, ingredients, Amazon sales, packaging, and branding assets.

## �� Features

- **Finished Goods Inventory** - Track SKUs, lots, and FEFO/FIFO costing
- **Ingredients Management** - Recipe management with BOM and consumption tracking
- **Amazon SP-API Integration** - Automated sync of orders and inventory
- **Packaging Inventory** - Track packaging materials and consumption
- **Brand Asset Management** - Centralized brand kit and digital assets
- **Work Orders** - Production planning and execution
- **Real-time Dashboard** - KPIs, alerts, and trend analysis

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query/Table
- **Backend**: FastAPI (Python), Prisma ORM, PostgreSQL
- **Infrastructure**: Docker, Railway-ready
- **Integrations**: Amazon SP-API, S3-compatible storage

## 🏗️ Architecture

```
tribal/
├── apps/
│   ├── web/          # Next.js dashboard
│   └── worker/       # FastAPI ETL service
├── packages/
│   ├── db/           # Prisma schema & utilities
│   └── shared/       # Shared types & utilities
└── docker-compose.yml
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm
- Python 3.11+
- Docker & Docker Compose

### 1. Setup

```bash
# Clone and setup
git clone <repository>
cd tribal
make setup
```

### 2. Configure Environment

Edit the environment files:

```bash
# Web app configuration
cp apps/web/.env.example apps/web/.env
# Edit apps/web/.env with your settings

# Worker service configuration  
cp apps/worker/.env.example apps/worker/.env
# Edit apps/worker/.env with Amazon SP-API credentials
```

### 3. Start Services

```bash
# Start all services with Docker
make docker:up

# Or start individually
make dev:web    # Next.js on :3000
make dev:worker # FastAPI on :8001
```

### 4. Initialize Database

```bash
# Run migrations and seed data
make db:migrate
make db:seed
```

## 📊 Amazon SP-API Setup

### 1. Create Amazon Developer Account

1. Go to [Amazon Developer Console](https://developer.amazon.com/)
2. Create a new application
3. Note your `LWA Client ID` and `LWA Client Secret`

### 2. Get SP-API Credentials

1. Request access to Selling Partner API
2. Create IAM role with SP-API permissions
3. Get your `Seller ID`, `Role ARN`, and `Refresh Token`

### 3. Configure Environment

```bash
# apps/worker/.env
SP_API_REGION=NA
SP_API_SELLER_ID=your_seller_id
SP_API_ROLE_ARN=arn:aws:iam::account:role/your-role
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
LWA_CLIENT_ID=your_lwa_client_id
LWA_CLIENT_SECRET=your_lwa_client_secret
SP_API_REFRESH_TOKEN=your_refresh_token
MARKETPLACE_IDS=ATVPDKIKX0DER
```

## 🎨 Brand Customization

The dashboard uses WTTT's brand colors defined in `tailwind.config.ts`:

```typescript
colors: {
  tribe: {
    orange: "#F47C41", // logo orange
    leaf:   "#779C3F", // primary green
    lime:   "#9DBD5C", // light green
    earth:  "#741E21", // deep cocoa
    cream:  "#EAD4BB", // warm neutral
    white:  "#FFFFFF"
  }
}
```

## 📱 Pages & Features

### Dashboard
- KPI cards (orders, sales, inventory, reorder flags)
- Recent Amazon orders
- Low stock alerts
- Expiring lots

### Inventory Management
- SKU tracking with FEFO/FIFO costing
- Lot management and expiry tracking
- Reorder point calculations
- Inventory adjustments

### Ingredients & Recipes
- Ingredient catalog with vendor management
- Recipe management with yield calculations
- BOM (Bill of Materials) tracking
- Consumption analysis

### Work Orders
- Production planning from recipes
- Ingredient consumption tracking
- Lot creation and output management
- Work order status tracking

### Amazon Integration
- Automated order sync
- Inventory level monitoring
- Report generation and processing
- Sync status and job logs

### Packaging Management
- Packaging item catalog
- Consumption tracking per SKU
- Purchase order management
- Vendor lead time tracking

### Brand Asset Management
- Brand kit editor (colors, fonts, voice)
- Asset upload and versioning
- Brand guide export
- S3-compatible storage

## 🧪 Testing

```bash
# Run all tests
make test

# Run E2E tests
make test:e2e

# Run specific test suites
pnpm --filter @tribal/web test
cd apps/worker && pytest
```

## 🚀 Deployment

### Railway Deployment

1. **Provision Services**:
   - PostgreSQL database
   - S3-compatible storage (or AWS S3)

2. **Deploy Applications**:
   ```bash
   # Deploy web app
   railway login
   railway link
   railway up
   
   # Deploy worker service
   cd apps/worker
   railway up
   ```

3. **Configure Environment Variables**:
   - Set all required environment variables in Railway dashboard
   - Run database migrations: `railway run pnpm db:migrate`
   - Seed database: `railway run pnpm db:seed`

### Docker Production

```bash
# Build and run production containers
docker-compose -f docker-compose.prod.yml up -d
```

## 📈 Business Logic

### FIFO COGS Calculation
- Consumes from earliest receipt lots first
- Maintains weighted average cost per SKU
- Updates automatically on each transaction

### FEFO (First Expiry, First Out)
- Default picking strategy for lot selection
- Prioritizes lots with earliest expiry dates
- Prevents waste and ensures freshness

### Reorder Point Calculation
```
ROP = (Average Daily Usage × Lead Time Days) + Safety Stock
```

### Recipe Scaling
- Automatically calculates ingredient consumption
- Accounts for loss percentages
- Generates work order consumption records

## 🔒 Security

- NextAuth.js for authentication
- Role-based access control (Owner, Admin, Operator, Viewer)
- Secure API endpoints with bearer token auth
- Environment variable management
- CSRF protection

## 📚 API Documentation

### Web App (Next.js)
- RESTful API routes in `src/app/api/`
- Server actions for mutations
- TanStack Query for data fetching

### Worker Service (FastAPI)
- Interactive docs at `http://localhost:8001/docs`
- Sync endpoints: `/sync/orders`, `/sync/inventory`, `/sync/reports`
- Health checks: `/health/`

## 🛠️ Development

### Available Scripts

```bash
make help          # Show all available commands
make dev           # Start development environment
make dev:web       # Start web app only
make dev:worker    # Start worker service only
make build         # Build all applications
make test          # Run all tests
make clean         # Clean build artifacts
make db:reset      # Reset database
make db:seed       # Seed with sample data
make docker:up     # Start Docker services
make docker:down   # Stop Docker services
```

### Code Structure

```
apps/web/src/
├── app/           # Next.js app router pages
├── components/    # React components
│   ├── ui/        # shadcn/ui components
│   └── ...        # Feature components
├── lib/           # Utilities and helpers
├── hooks/         # Custom React hooks
└── types/         # TypeScript types

apps/worker/
├── app/
│   ├── routes/    # FastAPI route handlers
│   ├── services/  # Business logic services
│   ├── models/    # Pydantic models
│   └── core/      # Core utilities
└── main.py        # FastAPI application
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is proprietary software for WTTT wellness brand.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Contact the development team

---

**WELCOME TO THE TRIBE** - Building wellness products that connect people to nature and their authentic selves.
