import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

// Dummy data for demonstration; replace with real data fetching as needed
const blogArticles = [
  {
    id: '1',
    title: 'The Future of AI in Rural Startups',
    image: 'https://www.orangemantra.com/wp-content/uploads/2023/06/AI-in-India.jpg',
    author: 'Vishal Singh',
    date: '2024-06-01',
    content: `Artificial Intelligence (AI) is transforming rural startups by enabling access to global markets, automating processes, and providing data-driven insights. Rural entrepreneurs can now leverage AI tools to optimize agriculture, improve supply chains, and create innovative products that compete on a global scale.\n\nFrom smart farming to AI-powered logistics, the possibilities are endless. As technology becomes more accessible, the gap between urban and rural innovation is shrinking, paving the way for a new era of rural entrepreneurship.\n\nIn rural India, AI is being used to revolutionize traditional industries. Farmers are using AI-powered apps to predict weather patterns, optimize crop yields, and connect directly with markets. Small businesses are leveraging AI for inventory management, customer service, and marketing automation.\n\nThe democratization of AI tools means that even startups in small towns can now access the same powerful technologies that were once only available to large corporations. This is creating unprecedented opportunities for rural entrepreneurs to build global businesses from their local communities.\n\nAs we look to the future, the integration of AI in rural startups will only accelerate. The key to success lies in understanding how to effectively implement these technologies while maintaining the human touch that makes rural businesses special.`
  },
  {
    id: '2',
    title: 'Building Scalable Web Applications',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    author: 'Vishal Singh',
    date: '2025-08-22',
    content: `Scalability is the secret sauce behind every successful web application. Learn how to build for growth from day one.\n\nBuilding scalable web applications requires careful planning and architecture decisions from the very beginning. It's not just about handling more users—it's about creating a system that can grow gracefully without compromising performance or user experience.\n\nThe key principles of scalable web development include:\n\n• Microservices Architecture: Breaking down your application into smaller, independent services that can be scaled individually\n• Database Optimization: Using proper indexing, caching strategies, and database design patterns\n• Load Balancing: Distributing traffic across multiple servers to prevent bottlenecks\n• Caching: Implementing multiple layers of caching (application, database, CDN) to reduce response times\n• Monitoring and Analytics: Building comprehensive monitoring to identify performance bottlenecks before they become problems\n\nFor rural startups, scalability is especially important because it allows you to serve customers globally while maintaining low operational costs. The right architecture can make the difference between a successful global business and one that struggles to grow beyond its local market.\n\nRemember, scalability isn't just about technology—it's about building a business model that can scale. Your application architecture should support your business goals and growth strategy.`
  },
  {
    id: '3',
    title: 'MVP Development: From Idea to Launch',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    author: 'Vishal Singh',
    date: '2025-09-05',
    content: `Turn your startup idea into a working MVP in weeks, not months. Our proven roadmap for rural founders.\n\nMVP (Minimum Viable Product) development is the art of building just enough to validate your business idea without wasting time and resources on features that might not matter. For rural entrepreneurs, this approach is particularly valuable because it allows you to test your ideas quickly and cost-effectively.\n\nThe MVP development process involves several key steps:\n\n1. Idea Validation: Before writing any code, validate your idea through market research, customer interviews, and competitor analysis\n2. Feature Prioritization: Identify the core features that solve your primary customer problem\n3. Rapid Prototyping: Build a simple prototype to test your assumptions\n4. User Testing: Get feedback from real users as early as possible\n5. Iteration: Use feedback to improve your product before investing in full development\n\nFor rural startups, the MVP approach offers several advantages:\n\n• Lower Risk: Test ideas before making significant investments\n• Faster Time to Market: Launch quickly and start generating revenue\n• Better Product-Market Fit: Learn from real users what they actually want\n• Investor Appeal: A working MVP is much more attractive to investors than just an idea\n\nRemember, an MVP doesn't mean low quality—it means focused quality. Every feature should serve a clear purpose and provide value to your users.`
  },
  {
    id: '4',
    title: 'Cloud Computing for Startups',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    author: 'Vishal Singh',
    date: '2025-09-18',
    content: `Cloud is the great equalizer—now every startup can build like a tech giant. See how rural India is leading the way.\n\nCloud computing has democratized technology infrastructure, making it possible for startups in rural areas to access the same powerful tools and services that were once only available to large corporations. This technological democratization is creating unprecedented opportunities for rural entrepreneurs.\n\nThe benefits of cloud computing for rural startups include:\n\n• Cost Efficiency: Pay only for what you use, with no upfront infrastructure costs\n• Global Reach: Serve customers worldwide from anywhere in the world\n• Scalability: Automatically scale your infrastructure as your business grows\n• Reliability: Enterprise-grade reliability and security without the complexity\n• Innovation: Access to cutting-edge technologies like AI, machine learning, and IoT\n\nRural startups are using cloud computing in innovative ways:\n\n• Agricultural Technology: Using cloud-based platforms to connect farmers with markets and provide real-time crop monitoring\n• E-commerce: Building online marketplaces that connect rural artisans with global customers\n• Education: Creating online learning platforms that bring quality education to remote areas\n• Healthcare: Developing telemedicine solutions that connect rural patients with urban specialists\n\nThe cloud has eliminated geographical barriers to entrepreneurship. Now, a startup in a small village can compete with companies in major cities on equal footing. The key is understanding how to leverage cloud services effectively to create value for your customers.\n\nAs cloud technology continues to evolve, rural startups will have access to even more powerful tools and capabilities. The future of rural entrepreneurship is bright, and cloud computing is lighting the way.`
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = blogArticles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="container py-5 text-center">
        <h2>Article Not Found</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  return (
    <div className="blog-detail-page" style={{ minHeight: '100vh', background: 'var(--bg-secondary, #f5f7fa)' }}>
      <HeroSection 
        title={article.title}
        subtitle={`By ${article.author} | ${new Date(article.date).toLocaleDateString()}`}
        height="40vh"
      />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="glass-card p-4 shadow-lg position-relative" style={{ borderRadius: 24, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '2px solid #e0e7ef' }}>
              <img src={article.image} alt={article.title} className="img-fluid rounded mb-4 w-100" style={{ maxHeight: 340, objectFit: 'cover', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }} />
              <div className="d-flex align-items-center mb-3">
                <img src="/images/vishal-singh.jpg" alt={article.author} className="rounded-circle me-3" style={{ width: 48, height: 48, objectFit: 'cover', border: '2px solid #1976d2' }} />
                <div>
                  <div className="fw-bold">{article.author}</div>
                  <div className="text-muted" style={{ fontSize: 14 }}>{new Date(article.date).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="divider my-3" style={{ height: 2, background: 'linear-gradient(90deg, #1976d2, #40a9ff)', borderRadius: 2 }} />
              <div className="article-content" style={{ fontSize: 18, lineHeight: 1.7, color: '#222' }}>
                {article.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <button className="btn btn-outline-primary mt-4" onClick={() => navigate(-1)}>
                ← Back to Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 