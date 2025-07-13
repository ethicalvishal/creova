from flask import Blueprint, request, jsonify
from models import db, TeamMember

team_bp = Blueprint('team', __name__)

# --- Admin authentication decorator (placeholder) ---
def admin_required(f):
    def wrapper(*args, **kwargs):
        # TODO: Implement real admin authentication
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

# --- CRUD Endpoints ---

@team_bp.route('/api/admin/team', methods=['GET'])
@admin_required
def get_team():
    members = TeamMember.query.order_by(TeamMember.created_at.desc()).all()
    return jsonify([m.to_dict() for m in members])

@team_bp.route('/api/admin/team', methods=['POST'])
@admin_required
def create_member():
    data = request.json
    member = TeamMember(
        name=data.get('name'),
        role=data.get('role'),
        bio=data.get('bio'),
        photo_url=data.get('photo_url'),
        social_links=data.get('social_links'),
        is_active=data.get('is_active', True)
    )
    db.session.add(member)
    db.session.commit()
    return jsonify(member.to_dict()), 201

@team_bp.route('/api/admin/team/<int:member_id>', methods=['PUT'])
@admin_required
def update_member(member_id):
    member = TeamMember.query.get_or_404(member_id)
    data = request.json
    member.name = data.get('name', member.name)
    member.role = data.get('role', member.role)
    member.bio = data.get('bio', member.bio)
    member.photo_url = data.get('photo_url', member.photo_url)
    member.social_links = data.get('social_links', member.social_links)
    member.is_active = data.get('is_active', member.is_active)
    db.session.commit()
    return jsonify(member.to_dict())

@team_bp.route('/api/admin/team/<int:member_id>', methods=['DELETE'])
@admin_required
def delete_member(member_id):
    member = TeamMember.query.get_or_404(member_id)
    db.session.delete(member)
    db.session.commit()
    return jsonify({'message': 'Team member deleted'}) 