# CRM Application

A full-stack Customer Relationship Management (CRM) application built with NestJS, React, PostgreSQL, and Prisma.

## Tech Stack

### Backend

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **TypeScript** - Type-safe development
- **Vitest** - Unit and E2E testing

### Frontend

- **React 19** - UI library
- **Mantine UI** - Component library
- **Vite** - Build tool
- **Axios** - HTTP client
- **Playwright** - E2E testing
- **TypeScript** - Type-safe development

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v14 or higher)

## Project Structure

```
.
├── crm-backend/          # NestJS backend API
│   ├── prisma/           # Database schema and migrations
│   ├── src/              # Source code
│   └── test/             # Test files
└── crm-frontend/         # React frontend
    ├── e2e/              # Playwright E2E tests
    ├── src/              # Source code
    └── public/           # Static assets
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Database Setup

#### Install PostgreSQL

**macOS (using Homebrew):**

```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Create Database and User

```bash
# Access PostgreSQL
psql postgres

# Create user and database
CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE crm_db;
GRANT ALL PRIVILEGES ON DATABASE crm_db TO myuser;
\q
```

### 3. Backend Setup

```bash
cd crm-backend

# Install dependencies
npm install

# Configure environment variables
# The .env file should already exist with:
# DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/crm_db?schema=public"

# Run database migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Seed the database (optional)
# If you have a seed script, run: npx prisma db seed
```

### 4. Frontend Setup

```bash
cd crm-frontend

# Install dependencies
npm install

# Install Playwright browsers (for E2E tests)
npx playwright install
```

## Running the Application

### Start the Backend

```bash
cd crm-backend

# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The backend API will be available at `http://localhost:3000`

### Start the Frontend

```bash
cd crm-frontend

# Development mode
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Running Tests

### Backend Tests

```bash
cd crm-backend

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

### Frontend Tests

```bash
cd crm-frontend

# Run Playwright E2E tests
# Make sure both backend and frontend are running first!
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test e2e/crud.spec.ts

# View test report
npx playwright show-report
```

## Database Management

### Prisma Commands

```bash
cd crm-backend

# Create a new migration
npx prisma migrate dev --name <migration-name>

# Apply migrations
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio

# Generate Prisma Client after schema changes
npx prisma generate
```

### Database Schema

The application uses a `Customer` model with the following fields:

- `id` - Auto-incrementing primary key
- `email` - Unique email address
- `firstName` - Customer's first name
- `lastName` - Customer's last name
- `phone` - Phone number
- `companyName` - Company name
- `address` - Street address
- `city` - City
- `isActive` - Active status (default: true)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## API Endpoints

### Customer Endpoints

- `GET /customer` - Get all customers
- `GET /customer/:id` - Get customer by ID
- `POST /customer` - Create new customer
- `PATCH /customer/:id` - Update customer
- `DELETE /customer/:id` - Delete customer

## Development Workflow

### Code Quality

```bash
# Backend linting
cd crm-backend
npm run lint

# Frontend linting
cd crm-frontend
npm run lint

# Backend formatting
cd crm-backend
npm run format
```

### Building for Production

```bash
# Build backend
cd crm-backend
npm run build

# Build frontend
cd crm-frontend
npm run build
```

## AI Development Workflow

This project was developed using AI-assisted tools to accelerate development and ensure code quality:

### Tools Used

1. **Gemini** - Used for:

   - Architecture planning and design decisions
   - Code generation and refactoring suggestions
   - Problem-solving and debugging assistance
   - Documentation generation

2. **Kiro AI Editor** - Used for:
   - Real-time code completion and suggestions
   - Automated code refactoring
   - Test generation and debugging
   - Code quality improvements

### Development Process

1. **Planning Phase**

   - Used Gemini to design the application architecture
   - Defined database schema and API structure
   - Planned component hierarchy for the frontend

2. **Implementation Phase**

   - Leveraged Kiro AI for rapid code generation
   - Used AI suggestions for best practices and patterns
   - Automated repetitive coding tasks

3. **Testing Phase**

   - Generated test cases with AI assistance
   - Used AI to identify edge cases and potential bugs
   - Automated test debugging and fixes

4. **Refinement Phase**
   - AI-assisted code reviews and optimizations
   - Documentation generation
   - Performance improvements

### Benefits of AI-Assisted Development

- **Faster Development**: Reduced development time by ~40%
- **Code Quality**: Consistent patterns and best practices
- **Learning**: Discovered new approaches and techniques
- **Testing**: Comprehensive test coverage with less effort
- **Documentation**: Auto-generated, up-to-date documentation

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify PostgreSQL is running:

   ```bash
   # macOS
   brew services list

   # Linux
   sudo systemctl status postgresql
   ```

2. Check database credentials in `crm-backend/.env`

3. Ensure the database exists:
   ```bash
   psql -U myuser -d crm_db
   ```

### Port Conflicts

If ports 3000 or 5173 are already in use:

- Backend: Modify `src/main.ts` to use a different port
- Frontend: Modify `vite.config.ts` to use a different port

### Playwright Test Failures

Ensure both backend and frontend are running before executing E2E tests:

```bash
# Terminal 1
cd crm-backend && npm run start:dev

# Terminal 2
cd crm-frontend && npm run dev

# Terminal 3
cd crm-frontend && npx playwright test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the UNLICENSED License.

## Contact

For questions or support, please open an issue in the repository.
