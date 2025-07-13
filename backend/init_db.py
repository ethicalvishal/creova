from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db, Job, Blog, Contact
from datetime import datetime
import os

# Create a separate Flask app for database initialization
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///creova_new.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    return app

def init_database():
    """Initialize database with sample data"""
    app = create_app()
    
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Check if data already exists
        if Job.query.first() is None:
            # Sample job listings
            jobs = [
                Job(
                    title="Senior Full-Stack Developer",
                    department="Engineering",
                    location="Remote / Bihar",
                    type="Full-time",
                    description="We are looking for a passionate Senior Full-Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.",
                    requirements="• 5+ years of experience in full-stack development\n• Proficiency in React.js, Node.js, and Python\n• Experience with cloud platforms (AWS/Azure)\n• Strong problem-solving skills\n• Excellent communication abilities",
                    salary_range="$80,000 - $120,000"
                ),
                Job(
                    title="UI/UX Designer",
                    department="Design",
                    location="Mumbai",
                    type="Full-time",
                    description="Join our creative team as a UI/UX Designer. You will be responsible for creating beautiful, intuitive user experiences for our products.",
                    requirements="• 3+ years of experience in UI/UX design\n• Proficiency in Figma, Adobe Creative Suite\n• Strong portfolio showcasing web and mobile designs\n• Understanding of user-centered design principles\n• Experience with design systems",
                    salary_range="$60,000 - $90,000"
                ),
                Job(
                    title="AI/ML Engineer",
                    department="AI & Research",
                    location="Remote / Delhi",
                    type="Full-time",
                    description="We are seeking an AI/ML Engineer to develop cutting-edge machine learning solutions and AI-powered features for our products.",
                    requirements="• 4+ years of experience in AI/ML development\n• Proficiency in Python, TensorFlow, PyTorch\n• Experience with NLP and computer vision\n• Strong mathematical background\n• Published research is a plus",
                    salary_range="$90,000 - $140,000"
                ),
                Job(
                    title="DevOps Engineer",
                    department="Operations",
                    location="Hyderabad",
                    type="Full-time",
                    description="Join our DevOps team to build and maintain scalable infrastructure and deployment pipelines.",
                    requirements="• 3+ years of DevOps experience\n• Proficiency in Docker, Kubernetes, AWS\n• Experience with CI/CD pipelines\n• Knowledge of monitoring and logging tools\n• Strong scripting skills (Python/Bash)",
                    salary_range="$70,000 - $110,000"
                ),
                Job(
                    title="Software Development Intern",
                    department="Engineering",
                    location="Remote",
                    type="Internship",
                    description="Gain hands-on experience in software development with our internship program. Work on real projects and learn from experienced developers.",
                    requirements="• Currently pursuing Computer Science degree\n• Basic knowledge of programming languages\n• Eagerness to learn and grow\n• Good communication skills\n• Available for 6 months",
                    salary_range="Stipend: $2,000/month"
                )
            ]
            
            for job in jobs:
                db.session.add(job)
        
        if Blog.query.first() is None:
            # Sample blog posts
            blog_posts = [
                Blog(
                    title="The Future of AI in Business: 2024 Trends",
                    slug="future-ai-business-2024-trends",
                    content="""
                    <h2>The Future of AI in Business: 2024 Trends</h2>
                    
                    <p>Artificial Intelligence continues to revolutionize how businesses operate, innovate, and serve their customers. As we move through 2024, several key trends are shaping the AI landscape in the business world.</p>
                    
                    <h3>1. Generative AI Goes Mainstream</h3>
                    <p>Generative AI tools like ChatGPT, DALL-E, and others have moved beyond novelty to become essential business tools. Companies are integrating these technologies into their workflows for content creation, customer service, and product development.</p>
                    
                    <h3>2. AI-Powered Personalization</h3>
                    <p>Businesses are leveraging AI to deliver hyper-personalized experiences to their customers. From recommendation engines to dynamic pricing, AI is enabling unprecedented levels of customization.</p>
                    
                    <h3>3. Ethical AI and Responsible Development</h3>
                    <p>As AI becomes more pervasive, there's growing emphasis on ethical AI development. Companies are implementing AI governance frameworks and ensuring their AI systems are fair, transparent, and accountable.</p>
                    
                    <h3>4. Edge AI and IoT Integration</h3>
                    <p>The combination of edge computing and AI is enabling real-time processing and decision-making at the device level, reducing latency and improving efficiency.</p>
                    
                    <p>At Creova Technologies, we're at the forefront of these developments, helping businesses harness the power of AI to drive growth and innovation.</p>
                    """,
                    excerpt="Discover the key AI trends that are reshaping business operations in 2024 and beyond.",
                    author="Creova Team",
                    tags="AI, Business, Technology, Trends",
                    is_published=True
                ),
                Blog(
                    title="Building Scalable Web Applications: Best Practices",
                    slug="building-scalable-web-applications-best-practices",
                    content="""
                    <h2>Building Scalable Web Applications: Best Practices</h2>
                    
                    <p>Scalability is a critical consideration when building modern web applications. As your user base grows, your application needs to handle increased load without compromising performance.</p>
                    
                    <h3>1. Microservices Architecture</h3>
                    <p>Breaking down your application into smaller, independent services allows for better scalability, easier maintenance, and faster development cycles.</p>
                    
                    <h3>2. Database Optimization</h3>
                    <p>Implement proper indexing, use connection pooling, and consider read replicas to distribute database load effectively.</p>
                    
                    <h3>3. Caching Strategies</h3>
                    <p>Implement multiple layers of caching (application, database, CDN) to reduce response times and server load.</p>
                    
                    <h3>4. Load Balancing</h3>
                    <p>Distribute incoming traffic across multiple servers to ensure high availability and better performance.</p>
                    
                    <h3>5. Cloud-Native Development</h3>
                    <p>Leverage cloud services for auto-scaling, managed databases, and serverless computing to build resilient applications.</p>
                    
                    <p>Our team at Creova Technologies specializes in building scalable web applications that grow with your business needs.</p>
                    """,
                    excerpt="Learn the essential best practices for building web applications that can scale with your business growth.",
                    author="Creova Team",
                    tags="Web Development, Scalability, Best Practices, Architecture",
                    is_published=True
                ),
                Blog(
                    title="The Rise of Low-Code Development Platforms",
                    slug="rise-low-code-development-platforms",
                    content="""
                    <h2>The Rise of Low-Code Development Platforms</h2>
                    
                    <p>Low-code development platforms are democratizing software development, enabling businesses to build applications faster and with fewer resources.</p>
                    
                    <h3>What is Low-Code Development?</h3>
                    <p>Low-code platforms provide visual development environments that allow users to create applications through drag-and-drop interfaces and pre-built components, reducing the need for traditional coding.</p>
                    
                    <h3>Benefits for Businesses</h3>
                    <ul>
                        <li>Faster time to market</li>
                        <li>Reduced development costs</li>
                        <li>Increased productivity</li>
                        <li>Easier maintenance</li>
                        <li>Better collaboration between IT and business teams</li>
                    </ul>
                    
                    <h3>Popular Low-Code Platforms</h3>
                    <p>Platforms like OutSystems, Mendix, and Microsoft Power Apps are leading the charge in the low-code revolution.</p>
                    
                    <h3>When to Use Low-Code</h3>
                    <p>Low-code is ideal for business process automation, internal tools, and rapid prototyping. However, complex enterprise applications may still require traditional development approaches.</p>
                    
                    <p>Creova Technologies helps businesses evaluate and implement the right development approach for their specific needs.</p>
                    """,
                    excerpt="Explore how low-code platforms are transforming software development and enabling faster application delivery.",
                    author="Creova Team",
                    tags="Low-Code, Development, Business, Technology",
                    is_published=True
                )
            ]
            
            for post in blog_posts:
                db.session.add(post)
        
        # Commit all changes
        db.session.commit()
        print("Database initialized successfully with sample data!")

if __name__ == "__main__":
    init_database() 