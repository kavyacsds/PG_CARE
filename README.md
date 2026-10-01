# 🏠 PG Care — PG Complaint Management System

A full-stack **PG Complaint Management System** built with **HTML, CSS, Vanilla JavaScript, Django, Django REST Framework, and PostgreSQL**.

PG Care allows residents to report problems in their rooms and lets management track, filter, view, and update complaints through a simple dashboard.

---

## 🌐 Live Demo

### 🚀 Frontend
**Vercel:** https://pgcare-frontend.vercel.app

### ⚙️ Backend API
**Render:** https://pg-care-backend.onrender.com

### 📦 GitHub Repository
**GitHub:** https://github.com/kavyacsds/PG_CARE

---

## ✨ Features

### 📊 Dashboard
- Total rooms
- Open issues
- Issues in progress
- Resolved issues
- Recent complaints
- Room-wise complaint counts

### 📝 Report an Issue
Residents can submit:
- Room number
- Complaint category
- Issue type
- Priority
- Description
- Photo attachment

### 🔎 Complaint Management
- View all complaints
- Search complaints
- Filter by:
  - Room
  - Category
  - Status
  - Priority
- Open detailed complaint information

### 🔄 Complaint Status
Complaints can move through:

`Submitted → Under Review → Assigned → Resolved`

### 🏠 Room Management
The system currently contains 10 PG rooms:

`101, 102, 103, 104, 105, 106, 107, 108, 109, 110`

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API
- FormData
- Responsive UI

### Backend
- Python
- Django
- Django REST Framework
- Django CORS Headers
- Gunicorn

### Database
- PostgreSQL — production
- SQLite — local development

### File Handling
- Django `ImageField`
- Pillow

### Deployment
- GitHub — source control
- Render — Django backend + PostgreSQL
- Vercel — frontend

---

## 🏗️ Architecture

```text
                    INTERNET
                       │
                       ▼
              ┌─────────────────┐
              │     Vercel      │
              │ HTML/CSS/JS     │
              │ PG Care Frontend│
              └────────┬────────┘
                       │
                    REST API
                       │
                       ▼
              ┌─────────────────┐
              │     Render      │
              │ Django + DRF    │
              │ Backend         │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   PostgreSQL    │
              │ Rooms + Issues  │
              └─────────────────┘
```

---

## 📁 Project Structure

```text
PG_CARE/
│
├── backend/
│   ├── manage.py
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── ...
│   │
│   └── complaints/
│       ├── migrations/
│       ├── management/
│       │   └── commands/
│       │       └── seed_rooms.py
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       └── ...
│
├── frontend/
│   ├── index.html
│   ├── complaints.html
│   ├── complaint-details.html
│   ├── create-complaint.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── app.js
│
├── .gitignore
└── README.md
```

---

# 🔌 API Endpoints

Base URL:

`https://pg-care-backend.onrender.com/api`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/rooms/` | Get all PG rooms |
| POST | `/rooms/` | Create a room |
| GET | `/complaints/` | Get all complaints |
| POST | `/complaints/` | Create a complaint |
| GET | `/complaints/<id>/` | Get one complaint |
| PATCH | `/complaints/<id>/` | Update complaint |
| GET | `/dashboard/` | Get dashboard statistics |

---

# 🗄️ Database Models

## Room

```text
Room
├── id
├── room_number
├── floor
└── is_occupied
```

## Complaint

```text
Complaint
├── id
├── room
├── category
├── issue_type
├── priority
├── description
├── photo
├── status
├── created_at
└── updated_at
```

A complaint has a **ForeignKey relationship** with the Room model.

---

# 📌 Complaint Categories

- Maintenance
- Cleaning
- Food
- Technical
- Plumbing
- Room
- Other

### Example Issue Types

**Maintenance**
- Fan
- Light / Switch
- Furniture
- AC
- Other

**Cleaning**
- Room Cleaning
- Bathroom Cleaning
- Common Area
- Garbage
- Other

**Food**
- Taste
- Quantity
- Too Spicy
- Too Salty
- Undercooked
- Food Hygiene
- Missing Item
- Other

**Technical**
- Wi-Fi
- Internet
- TV
- Other

**Plumbing**
- Tap Leakage
- No Water
- Drainage
- Flush Problem
- Shower Problem
- Other

**Room**
- Bed
- Mattress
- Cupboard
- Door
- Window
- Other

---

# 🚦 Priority Levels

```text
Low
Medium
High
```

# 🔄 Status Flow

```text
Submitted
    ↓
Under Review
    ↓
Assigned
    ↓
Resolved
```

---

# 💻 Local Development Setup

## 1. Clone the repository

```bash
git clone https://github.com/kavyacsds/PG_CARE.git
cd PG_CARE
```

## 2. Create a virtual environment

Windows:

```powershell
python -m venv venv
```

Activate:

```powershell
.\venv\Scripts\Activate.ps1
```

## 3. Install dependencies

```powershell
pip install django djangorestframework django-cors-headers psycopg[binary] python-dotenv
pip install Pillow
pip install gunicorn
pip install whitenoise
pip install dj-database-url
```

Generate the requirements file:

```powershell
pip freeze > requirements.txt
```

## 4. Run migrations

From the `backend` directory:

```powershell
python manage.py makemigrations
python manage.py migrate
```

## 5. Create an admin user

```powershell
python manage.py createsuperuser
```

## 6. Start Django

```powershell
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

API:

```text
http://127.0.0.1:8000/api/
```

---

# 🌱 Seed the Default Rooms

PG Care uses a custom Django management command to create the 10 default rooms.

Command:

```powershell
python manage.py seed_rooms
```

The command creates:

```text
101 - Floor 1
102 - Floor 1
103 - Floor 1
104 - Floor 1
105 - Floor 1
106 - Floor 2
107 - Floor 2
108 - Floor 2
109 - Floor 2
110 - Floor 2
```

It uses `get_or_create()` so running the command again does not create duplicate rooms.

---

# 🧪 Useful Development Commands

### Check Django configuration

```powershell
python manage.py check
```

### Create migrations

```powershell
python manage.py makemigrations
```

### Apply migrations

```powershell
python manage.py migrate
```

### Start development server

```powershell
python manage.py runserver
```

### Create admin user

```powershell
python manage.py createsuperuser
```

### Seed rooms

```powershell
python manage.py seed_rooms
```

### Git status

```powershell
git status
```

### Initialize Git

```powershell
git init
```

### Add files

```powershell
git add .
```

### Commit

```powershell
git commit -m "Initial PG Care project"
```

### Push to GitHub

```powershell
git push
```

---

# 🚀 Production Deployment

## Backend — Render

The Django backend is deployed on Render.

### Build Command

```bash
pip install -r requirements.txt && python manage.py migrate && python manage.py seed_rooms
```

### Start Command

```bash
gunicorn config.wsgi:application
```

### Root Directory

```text
backend
```

### Production Environment Variables

```text
SECRET_KEY=<your-secret-key>
DEBUG=False
ALLOWED_HOSTS=pg-care-backend.onrender.com
DATABASE_URL=<Render PostgreSQL Internal Database URL>
```

> Never commit `SECRET_KEY`, `DATABASE_URL`, or `.env` files to GitHub.

---

## Frontend — Vercel

The frontend is deployed as a static website.

### Root Directory

```text
frontend
```

No Node.js build process is required because the project uses plain HTML, CSS, and JavaScript.

The frontend communicates with the production backend through:

```javascript
const API_URL = "https://pg-care-backend.onrender.com/api";
```

---

# 🔐 CORS

During development, Django allows frontend requests using:

```python
CORS_ALLOW_ALL_ORIGINS = True
```

This allowed the local frontend and deployed frontend to communicate with the Django API.

For a larger production application, this should be restricted to trusted frontend origins.

---

# 🧠 How the Application Works

### 1. User opens PG Care

The frontend is served by Vercel.

### 2. JavaScript requests data

For example:

```javascript
fetch(`${API_URL}/dashboard/`)
```

### 3. Django receives the request

Django REST Framework processes the API request.

### 4. Django queries PostgreSQL

The backend reads rooms and complaints from the production database.

### 5. Django returns JSON

Example:

```json
{
  "total_rooms": 10,
  "open_issues": 1,
  "in_progress": 0,
  "resolved": 0
}
```

### 6. JavaScript updates the UI

The frontend receives the JSON and dynamically updates the dashboard.

---

# 📸 Complaint Photo Flow

When a resident submits a complaint with a photo:

```text
HTML Form
   ↓
JavaScript FormData
   ↓
POST /api/complaints/
   ↓
Django REST Framework
   ↓
Complaint + ImageField
   ↓
Database / Media Storage
```

The current implementation uses Django's media configuration for uploaded files.

For a production application with persistent image storage, a cloud object/image-storage service such as Cloudinary or S3-compatible storage should be added.

---

# 🎯 What This Project Demonstrates

This project demonstrates practical knowledge of:

- Frontend development
- REST API development
- Django
- Django REST Framework
- CRUD operations
- PostgreSQL
- Database relationships
- Form handling
- File uploads
- JavaScript Fetch API
- JSON
- CORS
- Environment variables
- Git and GitHub
- Cloud deployment
- Render
- Vercel
- Production frontend-backend communication

---

# 📚 Technologies Used

```text
HTML5
CSS3
JavaScript
Python
Django
Django REST Framework
PostgreSQL
Pillow
Gunicorn
django-cors-headers
dj-database-url
python-dotenv
Git
GitHub
Render
Vercel
```

---

# 👩‍💻 Author

**Kavya G V**

Computer Science & Engineering Graduate

---

## ⭐ Project Links

- 🌐 Live Application: https://pgcare-frontend.vercel.app
- ⚙️ Backend API: https://pg-care-backend.onrender.com
- 💻 GitHub: https://github.com/kavyacsds/PG_CARE

---

## 🚀 Future Improvements

- Authentication and role-based access
- Admin/manager dashboard
- Persistent cloud image storage
- Email notifications
- Complaint assignment to staff
- Room occupancy management
- Complaint analytics
- Pagination
- API authentication
- Production CORS restriction
- Automated tests
- CI/CD pipeline

---

> PG Care was built as a practical full-stack project to demonstrate how a frontend application communicates with a Django REST API and a production PostgreSQL database.
