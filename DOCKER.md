# Docker Setup for RealWorld NestJS Microservices

This document provides instructions for running the RealWorld NestJS Microservices application using Docker.

## Prerequisites

- Docker
- Docker Compose
- Node.js 18+ (for local development)

## Quick Start

### 1. Start Only Databases (Recommended for Local Development)

If you want to run your microservices locally but use Docker containers for databases:

```bash
# Start Redis and PostgreSQL databases
pnpm docker:db:up

# Stop databases
pnpm docker:db:down

# View database logs
pnpm docker:db:logs

# Restart databases
pnpm docker:db:restart

# Clean up databases (removes volumes)
pnpm docker:db:clean
```

### 2. Run Full Stack in Docker

#### Development Environment

```bash
# Build and start all services
pnpm docker:build
pnpm docker:up

# View logs
pnpm docker:logs

# Stop services
pnpm docker:down

# Restart services
pnpm docker:restart

# Clean up (removes volumes)
pnpm docker:clean
```

#### QA Environment

```bash
# Build and start QA environment
pnpm docker:build:qa
pnpm docker:up:qa

# View QA logs
pnpm docker:logs:qa

# Stop QA services
pnpm docker:down:qa

# Clean up QA environment
pnpm docker:clean:qa
```

#### Production Environment

```bash
# Build and start production environment
pnpm docker:build:prod
pnpm docker:up:prod

# View production logs
pnpm docker:logs:prod

# Stop production services
pnpm docker:down:prod

# Clean up production environment
pnpm docker:clean:prod
```

## Service Ports

### Development Environment

- API Gateway: http://localhost:3000
- Orders Service: http://localhost:3001
- Product Service: http://localhost:3002
- Users Service: http://localhost:3003
- Redis: localhost:6379
- Redis Insight: http://localhost:8001
- PostgreSQL (API Gateway): localhost:5432
- PostgreSQL (Orders): localhost:5433
- PostgreSQL (Products): localhost:5434
- PostgreSQL (Users): localhost:5435

### QA Environment

- API Gateway: http://localhost:4000
- Orders Service: http://localhost:4001
- Product Service: http://localhost:4002
- Users Service: http://localhost:4003
- Redis: localhost:6380
- Redis Insight: http://localhost:8002
- PostgreSQL (API Gateway): localhost:5442
- PostgreSQL (Orders): localhost:5443
- PostgreSQL (Products): localhost:5444
- PostgreSQL (Users): localhost:5445

### Production Environment

- API Gateway: http://localhost:5000
- Orders Service: http://localhost:5001
- Product Service: http://localhost:5002
- Users Service: http://localhost:5003
- Redis: localhost:6381
- Redis Insight: http://localhost:8003
- PostgreSQL (API Gateway): localhost:5452
- PostgreSQL (Orders): localhost:5453
- PostgreSQL (Products): localhost:5454
- PostgreSQL (Users): localhost:5455

## Database Configuration

### Redis

- **Shared**: All microservices use the same Redis instance
- **Persistence**: Data is persisted using Redis AOF (Append Only File)
- **Port**: Varies by environment (see above)

### Redis Insight

- **GUI Tool**: Web-based interface for Redis management and visualization
- **Features**:
  - Browse and edit Redis data
  - Monitor Redis performance
  - Execute Redis commands
  - View Redis logs
- **Access**: Available at the URLs listed in the Service Ports section above
- **Connection**: Automatically connects to the Redis instance in the same environment

### PostgreSQL

- **Separate Databases**: Each microservice has its own PostgreSQL database
- **Databases**:
  - `api_gateway_{env}` - API Gateway database
  - `orders_{env}` - Orders service database
  - `products_{env}` - Product service database
  - `users_{env}` - Users service database
- **Credentials**:
  - Username: `postgres`
  - Password: `postgres`
- **Initialization**: SQL scripts in `./docker/postgres/init/` are automatically executed

## Environment Variables

Each service is configured with the following environment variables:

- `NODE_ENV`: Environment (development, qa, production)
- `REDIS_URL`: Redis connection URL
- `POSTGRES_HOST`: PostgreSQL host
- `POSTGRES_PORT`: PostgreSQL port
- `POSTGRES_DB`: Database name
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password

## Volumes

### Development

- `redis_data_dev`: Redis data
- `redis_insight_dev`: Redis Insight configuration and data
- `postgres_api_gateway_dev`: API Gateway PostgreSQL data
- `postgres_orders_dev`: Orders PostgreSQL data
- `postgres_products_dev`: Products PostgreSQL data
- `postgres_users_dev`: Users PostgreSQL data

### QA

- `redis_data_qa`: Redis data
- `redis_insight_qa`: Redis Insight configuration and data
- `postgres_api_gateway_qa`: API Gateway PostgreSQL data
- `postgres_orders_qa`: Orders PostgreSQL data
- `postgres_products_qa`: Products PostgreSQL data
- `postgres_users_qa`: Users PostgreSQL data

### Production

- `redis_data_prod`: Redis data
- `redis_insight_prod`: Redis Insight configuration and data
- `postgres_api_gateway_prod`: API Gateway PostgreSQL data
- `postgres_orders_prod`: Orders PostgreSQL data
- `postgres_products_prod`: Products PostgreSQL data
- `postgres_users_prod`: Users PostgreSQL data

## Networks

Each environment uses its own Docker network:

- Development: `realworld-network`
- QA: `realworld-network-qa`
- Production: `realworld-network-prod`
- Databases only: `realworld-db-network`

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure the required ports are not in use by other services
2. **Permission issues**: Ensure Docker has proper permissions to create volumes
3. **Memory issues**: Increase Docker memory allocation if needed

### Useful Commands

```bash
# Check running containers
docker ps

# Check container logs
docker logs <container-name>

# Access PostgreSQL database
docker exec -it <postgres-container-name> psql -U postgres -d <database-name>

# Access Redis CLI
docker exec -it <redis-container-name> redis-cli

# Remove all unused containers, networks, and images
docker system prune -a

# Remove all volumes
docker volume prune
```

## Development Workflow

1. Start databases: `pnpm docker:db:up`
2. Run microservices locally: `pnpm dev`
3. Access services at their respective ports
4. Stop databases when done: `pnpm docker:db:down`

## Production Deployment

For production deployment, consider:

- Using external managed databases (AWS RDS, Google Cloud SQL, etc.)
- Using external Redis services (AWS ElastiCache, Google Cloud Memorystore, etc.)
- Implementing proper secrets management
- Setting up monitoring and logging
- Configuring proper backup strategies
