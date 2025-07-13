from flask import Blueprint, request, jsonify
from models import db, Job, Resume
import os
import re
from werkzeug.utils import secure_filename
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('careers', __name__, url_prefix='/api/careers')

# Configure upload settings
UPLOAD_FOLDER = 'uploads/resumes'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

# Simple admin authentication (replace with secure method in production)
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'creova-admin-secret')

# Email config (set these in your environment for production)
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USERNAME = os.environ.get('SMTP_USERNAME', 'your-email@gmail.com')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', 'your-email-password')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@creova.com')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_email(email):
    """Simple email validation"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def is_admin(request):
    return request.headers.get('X-Admin-Token') == ADMIN_TOKEN

@bp.route('/jobs', methods=['GET'])
def get_jobs():
    """Get all active job listings"""
    try:
        jobs = Job.query.filter_by(is_active=True).order_by(Job.created_at.desc()).all()
        return jsonify({
            'success': True,
            'jobs': [job.to_dict() for job in jobs]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Error retrieving job listings'
        }), 500

@bp.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    """Get specific job details"""
    try:
        job = Job.query.get_or_404(job_id)
        return jsonify({
            'success': True,
            'job': job.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Job not found'
        }), 404

@bp.route('/jobs', methods=['POST'])
def create_job():
    """Create a new job listing (admin endpoint)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'department', 'location', 'type', 'description']
        for field in required_fields:
            if not data.get(field) or not data[field].strip():
                return jsonify({
                    'success': False,
                    'message': f'{field.capitalize()} is required'
                }), 400
        
        job = Job(
            title=data['title'].strip(),
            department=data['department'].strip(),
            location=data['location'].strip(),
            type=data['type'].strip(),
            description=data['description'].strip(),
            requirements=data.get('requirements', '').strip(),
            salary_range=data.get('salary_range', '').strip(),
            benefits=data.get('benefits', '').strip(),
            work_mode=data.get('work_mode', '').strip()
        )
        
        db.session.add(job)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Job listing created successfully',
            'job': job.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Error creating job listing'
        }), 500

@bp.route('/apply', methods=['POST'])
@jwt_required()
def submit_resume():
    try:
        user_id = get_jwt_identity()
        # Ensure upload directory exists
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        # Get form data
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()
        position = request.form.get('position', '').strip()
        experience = request.form.get('experience', '').strip()
        cover_letter = request.form.get('cover_letter', '').strip()
        job_id = request.form.get('job_id')
        # Validate required fields
        if not all([name, email, position]):
            return jsonify({
                'success': False,
                'message': 'Name, email, and position are required'
            }), 400
        # Validate email
        if not validate_email(email):
            return jsonify({
                'success': False,
                'message': 'Please enter a valid email address'
            }), 400
        # Handle file upload
        resume_file = request.files.get('resume')
        resume_filename = None
        if resume_file and resume_file.filename:
            if not allowed_file(resume_file.filename):
                return jsonify({
                    'success': False,
                    'message': 'Please upload a PDF, DOC, or DOCX file'
                }), 400
            filename = secure_filename(resume_file.filename)
            resume_filename = f"{name.replace(' ', '_')}_{filename}"
            filepath = os.path.join(UPLOAD_FOLDER, resume_filename)
            resume_file.save(filepath)
        # Create resume entry
        resume = Resume(
            job_id=job_id if job_id else None,
            user_id=user_id,
            name=name,
            email=email.lower(),
            phone=phone,
            position=position,
            experience=experience,
            resume_file=resume_filename,
            cover_letter=cover_letter
        )
        db.session.add(resume)
        db.session.commit()
        # Send email notification to admin
        subject = f"New Job Application: {position} - {name}"
        body = f"A new job application has been submitted.\n\nName: {name}\nEmail: {email}\nPhone: {phone}\nPosition: {position}\nExperience: {experience}\nCover Letter: {cover_letter}\nResume File: {resume_filename or 'N/A'}\n\nCheck the admin panel for more details."
        send_email(subject, body, ADMIN_EMAIL)
        return jsonify({
            'success': True,
            'message': 'Your application has been submitted successfully! We will review and get back to you soon.',
            'resume_id': resume.id
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'An error occurred while submitting your application. Please try again.'
        }), 500

@bp.route('/applications', methods=['GET'])
def list_applications():
    """Admin endpoint to list all applications"""
    try:
        resumes = Resume.query.order_by(Resume.created_at.desc()).all()
        return jsonify({
            'success': True,
            'applications': [resume.to_dict() for resume in resumes]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Error retrieving applications'
        }), 500

@bp.route('/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    if not is_admin(request):
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401
    try:
        job = Job.query.get_or_404(job_id)
        data = request.get_json()
        for field in ['title', 'department', 'location', 'type', 'description', 'requirements', 'salary_range', 'benefits', 'work_mode', 'is_active']:
            if field in data:
                setattr(job, field, data[field])
        db.session.commit()
        return jsonify({'success': True, 'message': 'Job updated successfully', 'job': job.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': 'Error updating job'}), 500

@bp.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    if not is_admin(request):
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401
    try:
        job = Job.query.get_or_404(job_id)
        db.session.delete(job)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Job deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': 'Error deleting job'}), 500

# Helper to send email
def send_email(subject, body, to_email):
    msg = MIMEMultipart()
    msg['From'] = SMTP_USERNAME
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.sendmail(SMTP_USERNAME, to_email, msg.as_string())
        return True
    except Exception as e:
        print('Error sending email:', e)
        return False 