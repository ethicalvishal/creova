from flask import Blueprint, request, jsonify
from models import db, Contact
import re

bp = Blueprint('contact', __name__, url_prefix='/api/contact')

def validate_email(email):
    """Simple email validation"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@bp.route('/submit', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field) or not data[field].strip():
                return jsonify({
                    'success': False,
                    'message': f'{field.capitalize()} is required'
                }), 400
        
        # Validate email format
        if not validate_email(data['email']):
            return jsonify({
                'success': False,
                'message': 'Please enter a valid email address'
            }), 400
        
        # Create new contact entry
        contact = Contact(
            name=data['name'].strip(),
            email=data['email'].strip().lower(),
            phone=data.get('phone', '').strip(),
            company=data.get('company', '').strip(),
            message=data['message'].strip()
        )
        
        db.session.add(contact)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your message! We will get back to you soon.',
            'contact_id': contact.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'An error occurred while submitting your message. Please try again.'
        }), 500

@bp.route('/list', methods=['GET'])
def list_contacts():
    """Admin endpoint to list all contacts (for future admin panel)"""
    try:
        contacts = Contact.query.order_by(Contact.created_at.desc()).all()
        return jsonify({
            'success': True,
            'contacts': [contact.to_dict() for contact in contacts]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Error retrieving contacts'
        }), 500 