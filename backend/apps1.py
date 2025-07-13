from flask import Flask, jsonify
from flask_cors import CORS
import os
from datetime import datetime
from models import db, Contact, Job, Resume, Blog
from flask_jwt_extended import JWTManager

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///creova.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')

# Initialize extensions
CORS(app, origins=['http://localhost:3000', 'http://localhost:3002', 'https://creova.vercel.app'])
db.init_app(app)
jwt = JWTManager(app)

# Import routes after extensions are initialized
from routes.contact import bp as contact_bp
from routes.careers import bp as careers_bp
from routes.blog import bp as blog_bp
from routes.user import bp as user_bp
from routes.services import services_bp
from routes.team import team_bp
from routes.legal import legal_bp
from routes.admin import admin_bp

# Register blueprints
app.register_blueprint(contact_bp)
app.register_blueprint(careers_bp)
app.register_blueprint(blog_bp)
app.register_blueprint(user_bp)
app.register_blueprint(services_bp)
app.register_blueprint(team_bp)
app.register_blueprint(legal_bp)
app.register_blueprint(admin_bp, url_prefix='/api/admin')

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'service': 'Creova Technologies API'
    })

@app.route('/')
def index():
    """Root endpoint"""
    return jsonify({
        'message': 'Welcome to Creova Technologies API',
        'version': '1.0.0',
        'endpoints': {
            'health': '/api/health',
            'contact': '/api/contact',
            'careers': '/api/careers',
            'blog': '/api/blog'
        }
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Create database tables
    with app.app_context():
        db.create_all()
    
    # Run the app
    app.run(debug=True, host='0.0.0.0', port=5000)
