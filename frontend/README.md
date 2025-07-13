# Creova Technologies - Frontend

React.js frontend application for the Creova Technologies website.

## 🛠 Tech Stack

- **React.js** - Modern UI framework
- **Bootstrap 5** - Responsive design system
- **React Router** - Client-side routing
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Poppins, Montserrat)

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   └── favicon.ico         # Site favicon
├── src/
│   ├── components/         # Reusable components
│   │   ├── Header.js       # Navigation header
│   │   └── Footer.js       # Site footer
│   ├── pages/              # Page components
│   │   ├── Home.js         # Homepage
│   │   ├── About.js        # About page
│   │   ├── Services.js     # Services page
│   │   ├── Careers.js      # Careers page
│   │   ├── Products.js     # Products page
│   │   ├── Blog.js         # Blog page
│   │   ├── Contact.js      # Contact page
│   │   └── Admin.js        # Admin dashboard
│   ├── assets/             # Images, logos, etc.
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   └── index.js            # App entry point
└── package.json            # Dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## 📱 Pages & Features

### Home Page (`/`)
- Hero section with company tagline
- Services overview with cards
- Testimonials carousel
- Call-to-action sections
- Company statistics

### About Page (`/about`)
- Company introduction
- Timeline of milestones
- Vision, mission, and core values
- Leadership team photo cards

### Services Page (`/services`)
- Service cards with icons
- Expandable accordions for details
- AI & Automation, Web & Mobile Development, UI/UX Design, Cloud Solutions, Tech Consulting

### Careers Page (`/careers`)
- Dynamic job listings from API
- Resume upload form with file handling
- Internship opportunities
- Job detail modals

### Products Page (`/products`)
- Product showcase (CreovaCRM, CreovaPay, CreovaDesk)
- Feature comparisons
- Demo request forms
- Product cards with pricing

### Blog Page (`/blog`)
- Blog post listings
- Individual post views with routing
- Tag system
- Author and date information

### Contact Page (`/contact`)
- Contact form with API integration
- Google Maps embed
- Contact information
- Social media links
- FAQ section

### Admin Dashboard (`/admin`)
- Secure admin login system
- Content management (blog posts, services, products)
- User management and role assignment
- Website analytics and launch metrics
- Launch system configuration
- System settings and maintenance

## 🎨 Design System

### Colors
- **Primary:** #0FC2C0 (Teal)
- **Secondary:** #2B2D42 (Dark Gray)
- **White:** #FFFFFF
- **Light Gray:** #F8F9FA
- **Dark Gray:** #6C757D

### Typography
- **Headings:** Montserrat (300, 400, 500, 600, 700)
- **Body:** Poppins (300, 400, 500, 600, 700)

### Components
- **Buttons:** Custom styled with hover effects
- **Cards:** Bootstrap cards with custom shadows
- **Forms:** Bootstrap forms with custom validation
- **Navigation:** Responsive navbar with mobile menu

## 🔧 Configuration

### API Configuration

Update the API base URL in components that make API calls:

```javascript
// Default: http://localhost:5000
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile:** < 576px
- **Tablet:** 576px - 991px
- **Desktop:** > 992px

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Vercel Deployment

1. **Connect GitHub repository to Vercel**
2. **Set build settings:**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Set environment variables in Vercel dashboard**

### Netlify Deployment

1. **Drag and drop the `build` folder to Netlify**
2. **Or connect GitHub repository**
3. **Set build settings:**
   - Build Command: `npm run build`
   - Publish Directory: `build`

### GitHub Pages Deployment

1. **Add homepage to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/creova-frontend"
   }
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

## 🔗 API Integration

### Contact Form
```javascript
const response = await fetch('http://localhost:5000/api/contact/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

### Job Listings
```javascript
const response = await fetch('http://localhost:5000/api/careers/jobs');
const data = await response.json();
```

### Resume Upload
```javascript
const formData = new FormData();
formData.append('resume', file);
formData.append('name', name);
// ... other fields

const response = await fetch('http://localhost:5000/api/careers/apply', {
  method: 'POST',
  body: formData
});
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

## 📦 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🔒 Security

- Input validation on all forms
- XSS protection via React's built-in escaping
- CORS handling for API calls
- Secure file upload restrictions

## 📞 Support

For frontend support:
- **Email:** frontend@creova.com
- **Documentation:** https://docs.creova.com/frontend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Creova Technologies Frontend** - Building beautiful, responsive web experiences.
