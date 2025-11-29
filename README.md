# clinic-manager-api

This project is a Clinic Manager API, built with a clean architecture approach.

## Technologies Used

*   **Runtime:** Bun
*   **Framework:** Elysia.js
*   **Database:** PostgreSQL (based on `postgres` dependency and `drizzle-orm`)
*   **ORM:** Drizzle ORM
*   **Validation:** Zod

## Getting Started

### Prerequisites

*   Bun (v1.x.x)
*   Docker (for PostgreSQL)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/clinic-manager-api.git
    cd clinic-manager-api
    ```
2.  Install dependencies:
    ```bash
    bun install
    ```

### Database Setup

This project uses Docker for local PostgreSQL development.

1.  Start the database:
    ```bash
    docker-compose up -d
    ```
2.  Run database migrations:
    ```bash
    bun run db:migrate
    ```

### Running the Application

```bash
bun run dev
```

The API will be available at `http://localhost:3000` (or the port configured in `src/infra/http/server.ts`).

## Project Structure

The project follows a Clean Architecture pattern, separating concerns into:

*   `src/core`: Core domain concepts, entities, value objects, and generic utilities.
*   `src/domain`: Application-specific business rules and use cases.
*   `src/infra`: Infrastructure concerns like HTTP server (Elysia), database (Drizzle), environment variables, and external services.

## Testing

### Unit Tests

```bash
bun run test:unit
```

### End-to-End Tests

```bash
bun run test:e2e
```