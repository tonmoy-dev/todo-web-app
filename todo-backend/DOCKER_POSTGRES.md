# Running PostgreSQL with Docker

Using Docker is the recommended way to run your database locally. It avoids messy local installations and keeps your environment clean.

## Prerequisites
- **Docker** and **Docker Compose** installed on your Ubuntu machine.
  ```bash
  docker --version
  docker compose version
  ```

## Step 1: Start the Database Container
In the root directory of your project (where `docker-compose.yml` is located), run:
```bash
docker compose up -d
```
- `-d` runs the container in "detached" mode (in the background).
- The container name is `todo_postgres_db`.

## Step 2: Verify it's Running
```bash
docker ps
```
You should see `todo_postgres_db` in the list.

## Step 3: Update Django Settings
I have already added the PostgreSQL configuration to `todo-backend/config/settings.py`. Ensure the credentials match:
- **NAME**: `todo_db`
- **USER**: `todo_user`
- **PASSWORD**: `your_password`
- **HOST**: `localhost` (since you've mapped port 5432 to your machine)
- **PORT**: `5432`

## Step 4: Install Adapter & Migrate
In your backend terminal:
```bash
pip install psycopg2-binary
python manage.py migrate
```

---

## Helpful Commands

### Stop the database
```bash
docker compose stop
```

### Start it again
```bash
docker compose start
```

### View database logs
```bash
docker compose logs -f db
```

### Completely remove the container (Data is kept in a volume)
```bash
docker compose down
```
