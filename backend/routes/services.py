from flask import Blueprint, request, jsonify
from models import db, Service

services_bp = Blueprint('services', __name__)

# --- Admin authentication decorator (placeholder) ---
def admin_required(f):
    def wrapper(*args, **kwargs):
        # TODO: Implement real admin authentication
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

# --- CRUD Endpoints ---

@services_bp.route('/api/admin/services', methods=['GET'])
@admin_required
def get_services():
    services = Service.query.order_by(Service.created_at.desc()).all()
    return jsonify([s.to_dict() for s in services])

@services_bp.route('/api/admin/services', methods=['POST'])
@admin_required
def create_service():
    data = request.json
    service = Service(
        title=data.get('title'),
        description=data.get('description'),
        features=data.get('features'),
        icon=data.get('icon'),
        image_url=data.get('image_url'),
        status=data.get('status', 'active')
    )
    db.session.add(service)
    db.session.commit()
    return jsonify(service.to_dict()), 201

@services_bp.route('/api/admin/services/<int:service_id>', methods=['PUT'])
@admin_required
def update_service(service_id):
    service = Service.query.get_or_404(service_id)
    data = request.json
    service.title = data.get('title', service.title)
    service.description = data.get('description', service.description)
    service.features = data.get('features', service.features)
    service.icon = data.get('icon', service.icon)
    service.image_url = data.get('image_url', service.image_url)
    service.status = data.get('status', service.status)
    db.session.commit()
    return jsonify(service.to_dict())

@services_bp.route('/api/admin/services/<int:service_id>', methods=['DELETE'])
@admin_required
def delete_service(service_id):
    service = Service.query.get_or_404(service_id)
    db.session.delete(service)
    db.session.commit()
    return jsonify({'message': 'Service deleted'}) 