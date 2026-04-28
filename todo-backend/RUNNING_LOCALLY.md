# Running the Todo Backend Locally

Follow these steps to set up and run the Django DRF backend project on your local machine.

## Prerequisites
- Python 3.10 or higher (Current: 3.12.3)
- `pip` (Python package installer)

## Step-by-Step Setup

### 1. Navigate to the Backend Directory
Open your terminal and ensure you are in the `todo-backend` directory:
```bash
cd todo-backend
```

### 2. Create a Virtual Environment
It's recommended to use a virtual environment to keep dependencies isolated.
```bash
python3 -m venv venv
```

### 3. Activate the Virtual Environment
- **On Linux/macOS:**
  ```bash
  source venv/bin/activate
  ```
- **On Windows:**
  ```bash
  venv\Scripts\activate
  ```

### 4. Install Dependencies
Install the required Python packages using the `requirements.txt` file:
```bash
pip install -r requirements.txt
```

### 5. Run Database Migrations
Set up the SQLite database and create the necessary tables:
```bash
python manage.py migrate
```

### 6. Create a Superuser (Optional)
If you want to access the Django Admin interface (`/admin/`), create an admin account:
```bash
python manage.py createsuperuser
```

### 7. Start the Development Server
Run the following command to start the server:
```bash
python manage.py runserver
```

## Accessing the API
Once the server is running, you can access the following:
- **API Todos:** [http://127.0.0.1:8000/api/todos/](http://127.0.0.1:8000/api/todos/)
- **Swagger Documentation:** [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/)
- **API Schema (JSON):** [http://127.0.0.1:8000/api/schema](http://127.0.0.1:8000/api/schema)
- **Django Admin:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---
**Note:** Ensure the frontend is configured to point to `http://127.0.0.1:8000` for API requests.
