# Creova Technologies - Backend API

Flask-based RESTful API for the Creova Technologies website.

## 🛠 Tech Stack

- **Python Flask** - Web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database (production: PostgreSQL)
- **Flask-CORS** - Cross-origin resource sharing
- **Werkzeug** - File upload handling

## 📁 Project Structure

```
backend/
├── app.py              # Main Flask application
├── models.py           # Database models
├── routes/             # API route blueprints
│   ├── __init__.py
│   ├── contact.py      # Contact form endpoints
│   ├── careers.py      # Job listings & resume upload
│   └── blog.py         # Blog post management
├── init_db.py          # Database initialization
├── requirements.txt    # Python dependencies
├── creova.db          # SQLite database (auto-generated)
└── uploads/           # File upload directory
    └── resumes/       # Resume files
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip

### Installation

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

2. **Activate virtual environment:**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize database:**
   ```bash
   python init_db.py
   ```

5. **Run the server:**
   ```bash
   python apps.py
   ```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Contact Management

#### Submit Contact Form
```
POST /api/contact/submit
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "message": "Hello, I'm interested in your services."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "contact_id": 1
}
```

#### List All Contacts (Admin)
```
GET /api/contact/list
```

### Careers Management

#### Get Job Listings
```
GET /api/careers/jobs
```

**Response:**
```json
{
  "success": true,
  "jobs": [
    {
      "id": 1,
      "title": "Senior Full-Stack Developer",
      "department": "Engineering",
      "location": "Remote / Bangalore",
      "type": "Full-time",
      "description": "We are looking for...",
      "requirements": "• 5+ years of experience...",
      "salary_range": "$80,000 - $120,000",
      "is_active": true,
      "created_at": "2024-01-15T10:30:00"
    }
  ]
}
```

#### Get Specific Job
```
GET /api/careers/jobs/{job_id}
```

#### Submit Resume Application
```
POST /api/careers/apply
Content-Type: multipart/form-data

Form fields:
- name: "John Doe"
- email: "john@example.com"
- phone: "+1234567890"
- position: "Senior Developer"
- experience: "3-5"
- cover_letter: "I'm excited to apply..."
- resume: [file upload]
- job_id: 1 (optional)
```

**Response:**
```json
{
  "success": true,
  "message": "Your application has been submitted successfully!",
  "resume_id": 1
}
```

#### List Applications (Admin)
```
GET /api/careers/applications
```

### Blog Management

#### Get Blog Posts
```
GET /api/blog/posts?page=1&per_page=10
```

#### Get Specific Post
```
GET /api/blog/posts/{slug}
```

#### Search Posts
```
GET /api/blog/search?q=artificial intelligence
```

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00"
}
```

## 🗄 Database Models

### Contact
- `id` - Primary key
- `name` - Contact name
- `email` - Email address
- `phone` - Phone number
- `company` - Company name
- `message` - Contact message
- `created_at` - Timestamp

### Job
- `id` - Primary key
- `title` - Job title
- `department` - Department
- `location` - Job location
- `type` - Job type (Full-time, Part-time, Internship)
- `description` - Job description
- `requirements` - Job requirements
- `salary_range` - Salary range
- `is_active` - Active status
- `created_at` - Timestamp

### Resume
- `id` - Primary key
- `job_id` - Related job (optional)
- `name` - Applicant name
- `email` - Email address
- `phone` - Phone number
- `position` - Applied position
- `experience` - Years of experience
- `resume_file` - File path
- `cover_letter` - Cover letter text
- `created_at` - Timestamp

### Blog
- `id` - Primary key
- `title` - Post title
- `slug` - URL slug
- `content` - Post content
- `excerpt` - Post excerpt
- `author` - Author name
- `image_url` - Featured image
- `tags` - Post tags
- `is_published` - Published status
- `created_at` - Created timestamp
- `updated_at` - Updated timestamp

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///creova.db
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
```

### Database Configuration

**SQLite (Development):**
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///creova.db'
```

**PostgreSQL (Production):**
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/creova'
```

## 🚀 Deployment

### Render Deployment

1. **Create `render.yaml`:**
   ```yaml
   services:
     - type: web
       name: creova-backend
       env: python
       buildCommand: pip install -r requirements.txt
       startCommand: python app.py
       envVars:
         - key: PYTHON_VERSION
           value: 3.9.0
         - key: FLASK_ENV
           value: production
   ```

2. **Update CORS settings:**
   ```python
   CORS(app, origins=['https://your-frontend-domain.com'])
   ```

### Railway Deployment

1. **Connect GitHub repository**
2. **Set environment variables**
3. **Deploy automatically**

### Local Production Setup

1. **Install production dependencies:**
   ```bash
   pip install gunicorn
   ```

2. **Run with Gunicorn:**
   ```bash
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

## 🔒 Security Considerations

- Input validation on all endpoints
- File upload restrictions (PDF, DOC, DOCX only)
- CORS configuration for production
- SQL injection protection via SQLAlchemy
- XSS protection via proper content handling

## 📝 File Upload

Resume files are stored in `uploads/resumes/` with the following restrictions:
- **Allowed formats:** PDF, DOC, DOCX
- **Max file size:** 16MB
- **Naming convention:** `{name}_{original_filename}`

## 🧪 Testing

Run the API tests:
```bash
python -m pytest tests/
```

## 📞 Support

For API support:
- **Email:** api@creova.com
- **Documentation:** https://api.creova.com/docs

---

**Creova Technologies Backend API** - Powering the future of business technology. 