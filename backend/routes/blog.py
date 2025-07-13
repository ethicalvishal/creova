from flask import Blueprint, request, jsonify
from models import db, Blog, User
from datetime import datetime
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

bp = Blueprint('blog', __name__, url_prefix='/api/blog')

# Email config (reuse from user.py or define here)
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = os.environ.get('SMTP_USERNAME', 'your-email@gmail.com')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', 'your-app-password')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@example.com')

def create_slug(title):
    """Create URL-friendly slug from title"""
    slug = re.sub(r'[^\w\s-]', '', title.lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')

@bp.route('/posts', methods=['GET'])
def get_posts():
    """Get all published blog posts"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        posts = Blog.query.filter_by(is_published=True)\
                         .order_by(Blog.created_at.desc())\
                         .paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'success': True,
            'posts': [post.to_dict() for post in posts.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': posts.total,
                'pages': posts.pages,
                'has_next': posts.has_next,
                'has_prev': posts.has_prev
            }
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Error retrieving blog posts'
        }), 500

@bp.route('/posts/<slug>', methods=['GET'])
def get_post(slug):
    """Get specific blog post by slug"""
    try:
        post = Blog.query.filter_by(slug=slug, is_published=True).first()
        if not post:
            return jsonify({
                'success': False,
                'message': 'Blog post not found'
            }), 404
        
        return jsonify({
            'success': True,
            'post': post.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Error retrieving blog post'
        }), 500

@bp.route('/posts', methods=['POST'])
def create_post():
    """Create a new blog post (admin endpoint)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'content']
        for field in required_fields:
            if not data.get(field) or not data[field].strip():
                return jsonify({
                    'success': False,
                    'message': f'{field.capitalize()} is required'
                }), 400
        
        # Create slug from title
        slug = create_slug(data['title'])
        
        # Check if slug already exists
        existing_post = Blog.query.filter_by(slug=slug).first()
        if existing_post:
            return jsonify({
                'success': False,
                'message': 'A post with this title already exists'
            }), 400
        
        post = Blog(
            title=data['title'].strip(),
            slug=slug,
            content=data['content'].strip(),
            excerpt=data.get('excerpt', '').strip(),
            author=data.get('author', 'Creova Team'),
            image_url=data.get('image_url', ''),
            tags=data.get('tags', ''),
            is_published=data.get('is_published', True)
        )
        
        db.session.add(post)
        db.session.commit()

        # Send email notification to admin
        try:
            admin_msg = MIMEMultipart()
            admin_msg['From'] = SMTP_USERNAME
            admin_msg['To'] = ADMIN_EMAIL
            admin_msg['Subject'] = f'New Blog Post Created: {post.title}'
            admin_msg.attach(MIMEText(f'A new blog post has been created on Creova:\n\nTitle: {post.title}\nAuthor: {post.author}\n\nExcerpt: {post.excerpt}\n', 'plain'))
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()
                server.login(SMTP_USERNAME, SMTP_PASSWORD)
                server.sendmail(SMTP_USERNAME, ADMIN_EMAIL, admin_msg.as_string())
        except Exception as e:
            print('Admin blog post email error:', e)

        # Send email notification to all users
        try:
            users = User.query.all()
            for user in users:
                user_msg = MIMEMultipart()
                user_msg['From'] = SMTP_USERNAME
                user_msg['To'] = user.email
                user_msg['Subject'] = f'New Blog Post: {post.title}'
                blog_link = f'https://yourdomain.com/blog/{post.slug}'
                user_msg.attach(MIMEText(f'Hi {user.name},\n\nA new blog post has been published on Creova!\n\nTitle: {post.title}\n\nExcerpt: {post.excerpt}\n\nRead more: {blog_link}\n\n- Creova Team', 'plain'))
                with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                    server.starttls()
                    server.login(SMTP_USERNAME, SMTP_PASSWORD)
                    server.sendmail(SMTP_USERNAME, user.email, user_msg.as_string())
        except Exception as e:
            print('User blog post email error:', e)
        
        return jsonify({
            'success': True,
            'message': 'Blog post created successfully',
            'post': post.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Error creating blog post'
        }), 500

@bp.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    """Update existing blog post (admin endpoint)"""
    try:
        post = Blog.query.get_or_404(post_id)
        data = request.get_json()
        
        if 'title' in data and data['title'].strip():
            post.title = data['title'].strip()
            # Update slug if title changed
            new_slug = create_slug(post.title)
            if new_slug != post.slug:
                existing_post = Blog.query.filter_by(slug=new_slug).first()
                if existing_post and existing_post.id != post_id:
                    return jsonify({
                        'success': False,
                        'message': 'A post with this title already exists'
                    }), 400
                post.slug = new_slug
        
        if 'content' in data:
            post.content = data['content'].strip()
        
        if 'excerpt' in data:
            post.excerpt = data['excerpt'].strip()
        
        if 'author' in data:
            post.author = data['author'].strip()
        
        if 'image_url' in data:
            post.image_url = data['image_url'].strip()
        
        if 'tags' in data:
            post.tags = data['tags'].strip()
        
        if 'is_published' in data:
            post.is_published = data['is_published']
        
        post.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Blog post updated successfully',
            'post': post.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Error updating blog post'
        }), 500

@bp.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    """Delete blog post (admin endpoint)"""
    try:
        post = Blog.query.get_or_404(post_id)
        db.session.delete(post)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Blog post deleted successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Error deleting blog post'
        }), 500

@bp.route('/search', methods=['GET'])
def search_posts():
    """Search blog posts by title or content"""
    try:
        query = request.args.get('q', '').strip()
        if not query:
            return jsonify({
                'success': False,
                'message': 'Search query is required'
            }), 400
        
        posts = Blog.query.filter(
            Blog.is_published == True,
            (Blog.title.contains(query)) | (Blog.content.contains(query))
        ).order_by(Blog.created_at.desc()).all()
        
        return jsonify({
            'success': True,
            'posts': [post.to_dict() for post in posts],
            'query': query
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Error searching blog posts'
        }), 500 