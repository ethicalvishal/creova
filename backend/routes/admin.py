from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
import datetime
import os
from functools import wraps

admin_bp = Blueprint('admin', __name__)

# Admin authentication decorator
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not token.startswith('Bearer '):
            return jsonify({'success': False, 'message': 'Admin token required'}), 401
        
        token = token.split(' ')[1]
        try:
            payload = jwt.decode(token, os.environ.get('SECRET_KEY', 'your-secret-key'), algorithms=['HS256'])
            if payload.get('role') != 'admin':
                return jsonify({'success': False, 'message': 'Admin access required'}), 403
        except jwt.ExpiredSignatureError:
            return jsonify({'success': False, 'message': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'success': False, 'message': 'Invalid token'}), 401
        
        return f(*args, **kwargs)
    return decorated_function

# Admin credentials verification
@admin_bp.route('/verify-credentials', methods=['POST'])
def verify_credentials():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # In production, this should be stored in database
    # For demo purposes, using hardcoded admin credentials
    admin_credentials = {
        'admin': 'admin123',
        'superadmin': 'super123'
    }
    
    if username in admin_credentials and admin_credentials[username] == password:
        return jsonify({
            'success': True,
            'message': 'Credentials verified'
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid credentials'
        }), 401

# Two-factor authentication verification
@admin_bp.route('/verify-2fa', methods=['POST'])
def verify_2fa():
    data = request.get_json()
    username = data.get('username')
    two_factor_code = data.get('twoFactorCode')
    
    # In production, this should validate against a real 2FA system
    # For demo purposes, accepting any 6-digit code
    if len(two_factor_code) == 6 and two_factor_code.isdigit():
        return jsonify({
            'success': True,
            'message': '2FA verified'
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid 2FA code'
        }), 401

# Final authentication and token generation
@admin_bp.route('/final-auth', methods=['POST'])
def final_auth():
    data = request.get_json()
    username = data.get('username')
    biometric_data = data.get('biometricData')
    biometric_type = data.get('biometricType', 'fingerprint')
    
    # In production, this should validate biometric data
    # For demo purposes, accepting any biometric data
    if biometric_data:
        # Generate admin token
        payload = {
            'username': username,
            'role': 'admin',
            'biometric_type': biometric_type,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        token = jwt.encode(payload, os.environ.get('SECRET_KEY', 'your-secret-key'), algorithm='HS256')
        
        admin_user = {
            'username': username,
            'name': 'Administrator',
            'role': 'admin',
            'biometric_type': biometric_type,
            'permissions': ['all']
        }
        
        return jsonify({
            'success': True,
            'message': f'{biometric_type.title()} authentication successful',
            'adminToken': token,
            'adminUser': admin_user
        })
    else:
        return jsonify({
            'success': False,
            'message': f'{biometric_type.title()} verification failed'
        }), 401

# Get admin statistics
@admin_bp.route('/stats', methods=['GET'])
@admin_required
def get_stats():
    try:
        from models import db, User, Application, Contact, BlogPost, Job
        
        stats = {
            'totalUsers': User.query.count(),
            'totalApplications': Application.query.count(),
            'pendingApplications': Application.query.filter_by(status='pending').count(),
            'totalContacts': Contact.query.count(),
            'totalBlogPosts': BlogPost.query.count(),
            'totalJobs': Job.query.count(),
            'totalServices': 8,  # Hardcoded for demo
            'totalProducts': 12   # Hardcoded for demo
        }
        
        return jsonify({
            'success': True,
            'stats': stats
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Get recent activity
@admin_bp.route('/recent-activity', methods=['GET'])
@admin_required
def get_recent_activity():
    try:
        from models import db, Application, Contact, User
        
        activities = []
        
        # Recent applications
        recent_apps = Application.query.order_by(Application.applied_at.desc()).limit(5).all()
        for app in recent_apps:
            activities.append({
                'id': app.id,
                'type': 'application',
                'title': f'New application from {app.name}',
                'description': f'Applied for {app.position} position',
                'timestamp': app.applied_at.isoformat(),
                'status': app.status,
                'icon': 'file-alt',
                'color': 'success'
            })
        
        # Recent contacts
        recent_contacts = Contact.query.order_by(Contact.created_at.desc()).limit(5).all()
        for contact in recent_contacts:
            activities.append({
                'id': contact.id,
                'type': 'contact',
                'title': f'New message from {contact.name}',
                'description': contact.subject,
                'timestamp': contact.created_at.isoformat(),
                'status': 'new',
                'icon': 'envelope',
                'color': 'info'
            })
        
        # Recent users
        recent_users = User.query.order_by(User.created_at.desc()).limit(3).all()
        for user in recent_users:
            activities.append({
                'id': user.id,
                'type': 'user',
                'title': f'New user registration: {user.name}',
                'description': f'Email: {user.email}',
                'timestamp': user.created_at.isoformat(),
                'status': 'active',
                'icon': 'user-plus',
                'color': 'primary'
            })
        
        # Sort by timestamp
        activities.sort(key=lambda x: x['timestamp'], reverse=True)
        
        return jsonify({
            'success': True,
            'activities': activities[:10]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Get system status
@admin_bp.route('/system-status', methods=['GET'])
@admin_required
def get_system_status():
    try:
        status = {
            'server': 'online',
            'database': 'online',
            'cache': 'online'
        }
        
        return jsonify({
            'success': True,
            'status': status
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Get system metrics
@admin_bp.route('/system-metrics', methods=['GET'])
@admin_required
def get_system_metrics():
    try:
        import psutil
        
        metrics = {
            'cpuUsage': round(psutil.cpu_percent(interval=1)),
            'memoryUsage': round(psutil.virtual_memory().percent),
            'diskUsage': round(psutil.disk_usage('/').percent),
            'activeUsers': 24  # This would be calculated from active sessions
        }
        
        return jsonify({
            'success': True,
            'metrics': metrics
        })
    except ImportError:
        # Fallback if psutil is not available
        metrics = {
            'cpuUsage': 45,
            'memoryUsage': 62,
            'diskUsage': 38,
            'activeUsers': 24
        }
        
        return jsonify({
            'success': True,
            'metrics': metrics
        })

# Get notifications
@admin_bp.route('/notifications', methods=['GET'])
@admin_required
def get_notifications():
    try:
        from models import db, Application, Contact
        
        notifications = []
        
        # Pending applications
        pending_apps = Application.query.filter_by(status='pending').count()
        if pending_apps > 0:
            notifications.append({
                'id': 1,
                'type': 'application',
                'message': f'{pending_apps} pending applications require review',
                'icon': 'file-alt',
                'timestamp': datetime.datetime.utcnow().isoformat()
            })
        
        # Unread contacts
        unread_contacts = Contact.query.filter_by(read=False).count()
        if unread_contacts > 0:
            notifications.append({
                'id': 2,
                'type': 'contact',
                'message': f'{unread_contacts} unread contact messages',
                'icon': 'envelope',
                'timestamp': datetime.datetime.utcnow().isoformat()
            })
        
        return jsonify({
            'success': True,
            'notifications': notifications
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Get admin settings
@admin_bp.route('/settings', methods=['GET'])
@admin_required
def get_settings():
    try:
        # In production, this would be stored in database
        settings = {
            'website': {
                'siteName': 'Creova',
                'siteDescription': 'Leading technology solutions provider',
                'siteUrl': 'https://creova.com',
                'contactEmail': 'admin@creova.com',
                'phoneNumber': '+91 1234567890',
                'address': 'Patna, Bihar, India',
                'timezone': 'Asia/Kolkata',
                'language': 'en',
                'maintenanceMode': False
            },
            'security': {
                'sessionTimeout': 30,
                'maxLoginAttempts': 5,
                'lockoutDuration': 15,
                'requireTwoFactor': True,
                'passwordMinLength': 8,
                'passwordComplexity': True,
                'enableRecaptcha': True,
                'recaptchaSiteKey': '',
                'recaptchaSecretKey': ''
            },
            'email': {
                'smtpHost': 'smtp.gmail.com',
                'smtpPort': 587,
                'smtpUsername': '',
                'smtpPassword': '',
                'fromEmail': 'noreply@creova.com',
                'fromName': 'Creova Admin'
            },
            'notifications': {
                'emailNotifications': True,
                'applicationAlerts': True,
                'contactAlerts': True,
                'systemAlerts': True,
                'weeklyReports': True,
                'monthlyReports': True
            },
            'backup': {
                'autoBackup': True,
                'backupFrequency': 'daily',
                'backupRetention': 30,
                'backupLocation': 'local',
                'cloudBackup': False,
                'cloudProvider': 'aws'
            },
            'analytics': {
                'googleAnalytics': True,
                'gaTrackingId': '',
                'enableHeatmaps': True,
                'enableUserTracking': True,
                'privacyCompliant': True
            }
        }
        
        return jsonify({
            'success': True,
            'settings': settings
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Update admin settings
@admin_bp.route('/settings/<category>', methods=['PUT'])
@admin_required
def update_settings(category):
    try:
        data = request.get_json()
        
        # In production, this would save to database
        # For demo purposes, just return success
        
        return jsonify({
            'success': True,
            'message': f'{category} settings updated successfully'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Test email configuration
@admin_bp.route('/test-email', methods=['POST'])
@admin_required
def test_email():
    try:
        email_config = request.get_json()
        
        # In production, this would actually send a test email
        # For demo purposes, just return success
        
        return jsonify({
            'success': True,
            'message': 'Test email sent successfully'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Create backup
@admin_bp.route('/backup', methods=['POST'])
@admin_required
def create_backup():
    try:
        # In production, this would create an actual backup
        # For demo purposes, just return success
        
        return jsonify({
            'success': True,
            'message': 'Backup created successfully',
            'backupId': f'backup_{datetime.datetime.utcnow().strftime("%Y%m%d_%H%M%S")}'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Get analytics data
@admin_bp.route('/analytics', methods=['GET'])
@admin_required
def get_analytics():
    try:
        date_range = request.args.get('range', '30')
        
        # In production, this would fetch real analytics data
        # For demo purposes, returning mock data
        analytics = {
            'overview': {
                'totalVisitors': 15420,
                'uniqueVisitors': 8920,
                'pageViews': 45680,
                'bounceRate': 42.5,
                'avgSessionDuration': 245,
                'conversionRate': 3.2
            },
            'traffic': {
                'daily': [],
                'weekly': [],
                'monthly': []
            },
            'pages': [
                {'url': '/', 'title': 'Home', 'views': 12500, 'uniqueViews': 8900, 'bounceRate': 35, 'avgTime': 180},
                {'url': '/about', 'title': 'About Us', 'views': 8200, 'uniqueViews': 6500, 'bounceRate': 45, 'avgTime': 120},
                {'url': '/services', 'title': 'Services', 'views': 6800, 'uniqueViews': 5200, 'bounceRate': 38, 'avgTime': 200},
                {'url': '/blog', 'title': 'Blog', 'views': 5400, 'uniqueViews': 4200, 'bounceRate': 55, 'avgTime': 300},
                {'url': '/contact', 'title': 'Contact', 'views': 3200, 'uniqueViews': 2800, 'bounceRate': 60, 'avgTime': 90}
            ],
            'sources': [
                {'name': 'Direct', 'visitors': 4500, 'percentage': 35, 'color': 'primary', 'icon': 'link'},
                {'name': 'Google', 'visitors': 3800, 'percentage': 30, 'color': 'success', 'icon': 'search'},
                {'name': 'Social Media', 'visitors': 2800, 'percentage': 22, 'color': 'info', 'icon': 'share-alt'},
                {'name': 'Referral', 'visitors': 1200, 'percentage': 9, 'color': 'warning', 'icon': 'external-link-alt'},
                {'name': 'Email', 'visitors': 720, 'percentage': 4, 'color': 'secondary', 'icon': 'envelope'}
            ],
            'devices': [
                {'name': 'Desktop', 'visitors': 7200, 'percentage': 55, 'color': 'primary', 'icon': 'desktop'},
                {'name': 'Mobile', 'visitors': 4500, 'percentage': 35, 'color': 'success', 'icon': 'mobile-alt'},
                {'name': 'Tablet', 'visitors': 1220, 'percentage': 10, 'color': 'info', 'icon': 'tablet-alt'}
            ],
            'locations': [
                {'country': 'India', 'city': 'Patna', 'visitors': 4500, 'percentage': 35},
                {'country': 'India', 'city': 'Delhi', 'visitors': 3200, 'percentage': 25},
                {'country': 'India', 'city': 'Mumbai', 'visitors': 2800, 'percentage': 22},
                {'country': 'India', 'city': 'Bangalore', 'visitors': 1800, 'percentage': 14},
                {'country': 'India', 'city': 'Chennai', 'visitors': 720, 'percentage': 4}
            ]
        }
        
        return jsonify({
            'success': True,
            'analytics': analytics
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Get recent applications for admin dashboard
@admin_bp.route('/recent-applications', methods=['GET'])
@admin_required
def get_recent_applications():
    try:
        from models import db, Application
        
        recent_apps = Application.query.order_by(Application.applied_at.desc()).limit(5).all()
        
        applications = []
        for app in recent_apps:
            applications.append({
                'id': app.id,
                'name': app.name,
                'position': app.position,
                'status': app.status,
                'applied_at': app.applied_at.isoformat()
            })
        
        return jsonify({
            'success': True,
            'applications': applications
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

# Get recent contacts for admin dashboard
@admin_bp.route('/recent-contacts', methods=['GET'])
@admin_required
def get_recent_contacts():
    try:
        from models import db, Contact
        
        recent_contacts = Contact.query.order_by(Contact.created_at.desc()).limit(5).all()
        
        contacts = []
        for contact in recent_contacts:
            contacts.append({
                'id': contact.id,
                'name': contact.name,
                'email': contact.email,
                'subject': contact.subject,
                'created_at': contact.created_at.isoformat()
            })
        
        return jsonify({
            'success': True,
            'contacts': contacts
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500 