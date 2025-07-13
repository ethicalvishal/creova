from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, Resume, Job
import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

bp = Blueprint('user', __name__, url_prefix='/api/user')

# Email config (use environment variables for security)
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = os.environ.get('SMTP_USERNAME', 'your-email@gmail.com')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', 'your-app-password')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@example.com')

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not name or not email or not password:
        return jsonify({'success': False, 'message': 'Name, email, and password are required.'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'Email already registered.'}), 409
    password_hash = generate_password_hash(password)
    user = User(name=name, email=email, password_hash=password_hash)
    db.session.add(user)
    db.session.commit()

    # Send email notifications
    try:
        # Email to admin
        admin_msg = MIMEMultipart()
        admin_msg['From'] = SMTP_USERNAME
        admin_msg['To'] = ADMIN_EMAIL
        admin_msg['Subject'] = f'New User Registered: {name}'
        admin_msg.attach(MIMEText(f'User {name} ({email}) has registered on Creova.', 'plain'))

        # Email to user
        user_msg = MIMEMultipart()
        user_msg['From'] = SMTP_USERNAME
        user_msg['To'] = email
        user_msg['Subject'] = 'Welcome to Creova!'
        user_msg.attach(MIMEText(f'Thank you for registering, {name}!\n\nWe are excited to have you on board.\n\n- Creova Team', 'plain'))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_USERNAME, ADMIN_EMAIL, admin_msg.as_string())
            server.sendmail(SMTP_USERNAME, email, user_msg.as_string())
    except Exception as e:
        print('Email notification error:', e)

    return jsonify({'success': True, 'message': 'User registered successfully.'})

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password are required.'}), 400
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'success': False, 'message': 'Invalid email or password.'}), 401
    access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(days=7))
    return jsonify({'success': True, 'access_token': access_token, 'user': user.to_dict()})

@bp.route('/applications', methods=['GET'])
@jwt_required()
def get_user_applications():
    user_id = get_jwt_identity()
    resumes = Resume.query.filter_by(user_id=user_id).all()
    applications = []
    for r in resumes:
        job = Job.query.get(r.job_id)
        applications.append({
            'id': r.id,
            'job_title': job.title if job else 'N/A',
            'status': getattr(r, 'status', 'Submitted'),
            'created_at': r.created_at.isoformat()
        })
    return jsonify({'success': True, 'applications': applications})

@bp.route('/list', methods=['GET'])
def list_users():
    admin_token = request.headers.get('X-Admin-Token')
    if admin_token != 'creova-admin-2024':
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401
    users = User.query.order_by(User.id.desc()).all()
    user_list = [
        {
            'id': u.id,
            'name': u.name,
            'email': u.email,
            'created_at': u.created_at.isoformat() if hasattr(u, 'created_at') else ''
        }
        for u in users
    ]
    return jsonify({'success': True, 'users': user_list})

@bp.route('/stats', methods=['GET'])
def user_stats():
    admin_token = request.headers.get('X-Admin-Token')
    if admin_token != 'creova-admin-2024':
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401
    from datetime import datetime, timedelta
    now = datetime.utcnow()
    week_ago = now - timedelta(days=7)
    month_ago = now - timedelta(days=30)
    total = User.query.count()
    week = User.query.filter(User.created_at >= week_ago).count() if hasattr(User, 'created_at') else 0
    month = User.query.filter(User.created_at >= month_ago).count() if hasattr(User, 'created_at') else 0
    return jsonify({'success': True, 'total': total, 'week': week, 'month': month}) 