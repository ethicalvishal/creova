# Creova Technologies - Full Stack Website

A complete, responsive, professional-grade full-stack dynamic website for Creova Technologies, a global tech startup company.

## 🏢 Company Overview

- **Name:** Creova Technologies
- **Tagline:** "Creating the Future, One Idea at a Time."
- **Sector:** IT Services, Software Development, AI Solutions, Web & Mobile Apps, Cloud, Tech Consulting
- **Style:** Clean, Corporate, Modern, TCS/Wipro-level UI

## 🛠 Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Bootstrap 5** - Responsive design system
- **React Router** - Client-side routing
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Poppins, Montserrat)

### Backend
- **Python Flask** - RESTful API
- **SQLAlchemy** - Database ORM
- **SQLite** - Database (can be upgraded to PostgreSQL)
- **Flask-CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
CREOVA/
├── frontend/          # React.js application
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── assets/      # Images, logos
│   │   ├── App.js       # Main app component
│   │   └── App.css      # Global styles
│   └── package.json
├── backend/           # Flask API
│   ├── app.py         # Main Flask application
│   ├── models.py      # Database models
│   ├── routes/        # API routes
│   ├── init_db.py     # Database initialization
│   └── requirements.txt
└── README.md
```

## 🚀 Features

### Frontend Pages
1. **Home** - Hero section, services overview, testimonials, CTA
2. **About** - Company intro, timeline, vision/mission, leadership team
3. **Services** - AI & Automation, Web & Mobile Development, UI/UX Design, Cloud Solutions, Tech Consulting
4. **Careers** - Dynamic job listings, resume upload form, internship info
5. **Products** - CreovaCRM, CreovaPay, CreovaDesk with demo requests
6. **Blog** - Static blog posts with detail views
7. **Contact** - Contact form, Google Maps, social links

### Backend API Endpoints
- `POST /api/contact/submit` - Contact form submission
- `GET /api/careers/jobs` - Job listings
- `POST /api/careers/apply` - Resume upload
- `GET /api/blog/posts` - Blog posts
- `GET /api/health` - Health check

## 🎨 Design & Styling

- **Colors:** Teal (#0FC2C0), Dark Gray (#2B2D42), White
- **Fonts:** Poppins (body), Montserrat (headings)
- **Responsive:** Mobile-first design with Bootstrap 5
- **Animations:** CSS transitions and hover effects

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Initialize database:**
   ```bash
   python init_db.py
   ```

6. **Run the Flask server:**
   ```bash
   python app.py
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `build`

3. **Deploy to Netlify:**
   - Drag and drop the `build` folder to Netlify
   - Or connect your GitHub repository

### Backend Deployment (Render/Railway)

1. **Create a `render.yaml` file in the backend directory:**
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
   ```

2. **Deploy to Render:**
   - Connect your GitHub repository
   - Set environment variables
   - Deploy

3. **Update CORS settings in `app.py`:**
   ```python
   CORS(app, origins=['https://your-frontend-domain.com'])
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
FLASK_ENV=production
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///creova.db
```

### Database Configuration

The application uses SQLite by default. To use PostgreSQL:

1. Update `DATABASE_URL` in environment variables
2. Install PostgreSQL adapter: `pip install psycopg2-binary`
3. Update `app.py` database configuration

## 📱 Social Media Links

- **LinkedIn:** https://www.linkedin.com/company/creova-technologies
- **Twitter:** https://twitter.com/creovatech
- **Facebook:** https://www.facebook.com/creovatechnologies
- **Instagram:** https://www.instagram.com/creovatech
- **GitHub:** https://github.com/creovatech
- **YouTube:** https://www.youtube.com/@creovatechnologies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and inquiries:
- **Email:** info@creova.com
- **Phone:** +91 80 1234 5678
- **Address:** Motihari, Bihar, 845401, India

---

**Creova Technologies** - Creating the Future, One Idea at a Time. 