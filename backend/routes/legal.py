from flask import Blueprint, request, jsonify
from models import db, LegalPage

legal_bp = Blueprint('legal', __name__)

# --- Admin authentication decorator (placeholder) ---
def admin_required(f):
    def wrapper(*args, **kwargs):
        # TODO: Implement real admin authentication
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

# --- CRUD Endpoints ---

@legal_bp.route('/api/admin/legal', methods=['GET'])
@admin_required
def get_legal_pages():
    pages = LegalPage.query.order_by(LegalPage.updated_at.desc()).all()
    return jsonify([p.to_dict() for p in pages])

@legal_bp.route('/api/admin/legal', methods=['POST'])
@admin_required
def create_legal_page():
    data = request.json
    page = LegalPage(
        page_type=data.get('page_type'),
        content=data.get('content')
    )
    db.session.add(page)
    db.session.commit()
    return jsonify(page.to_dict()), 201

@legal_bp.route('/api/admin/legal/<int:page_id>', methods=['PUT'])
@admin_required
def update_legal_page(page_id):
    page = LegalPage.query.get_or_404(page_id)
    data = request.json
    page.page_type = data.get('page_type', page.page_type)
    page.content = data.get('content', page.content)
    db.session.commit()
    return jsonify(page.to_dict())

@legal_bp.route('/api/admin/legal/<int:page_id>', methods=['DELETE'])
@admin_required
def delete_legal_page(page_id):
    page = LegalPage.query.get_or_404(page_id)
    db.session.delete(page)
    db.session.commit()
    return jsonify({'message': 'Legal page deleted'}) 