 #!/usr/bin/env python3
"""
Simple API test script for Creova Technologies backend
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check error: {e}")

def test_jobs_endpoint():
    """Test the jobs endpoint"""
    print("\n🔍 Testing jobs endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/careers/jobs")
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                jobs = data.get('jobs', [])
                print(f"✅ Jobs endpoint passed - Found {len(jobs)} jobs")
                for job in jobs[:2]:  # Show first 2 jobs
                    print(f"   - {job['title']} ({job['department']})")
            else:
                print(f"❌ Jobs endpoint failed: {data.get('message')}")
        else:
            print(f"❌ Jobs endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Jobs endpoint error: {e}")

def test_contact_form():
    """Test the contact form submission"""
    print("\n🔍 Testing contact form...")
    try:
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "company": "Test Company",
            "message": "This is a test message from the API test script."
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact/submit",
            json=contact_data,
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 201:
            data = response.json()
            if data.get('success'):
                print("✅ Contact form test passed")
                print(f"   Contact ID: {data.get('contact_id')}")
            else:
                print(f"❌ Contact form failed: {data.get('message')}")
        else:
            print(f"❌ Contact form failed: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Contact form error: {e}")

def test_blog_posts():
    """Test the blog posts endpoint"""
    print("\n🔍 Testing blog posts...")
    try:
        response = requests.get(f"{BASE_URL}/api/blog/posts")
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                posts = data.get('posts', [])
                print(f"✅ Blog posts endpoint passed - Found {len(posts)} posts")
                for post in posts[:2]:  # Show first 2 posts
                    print(f"   - {post['title']}")
            else:
                print(f"❌ Blog posts endpoint failed: {data.get('message')}")
        else:
            print(f"❌ Blog posts endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Blog posts endpoint error: {e}")

def main():
    """Run all API tests"""
    print("🚀 Starting Creova Technologies API Tests")
    print("=" * 50)
    
    test_health_check()
    test_jobs_endpoint()
    test_contact_form()
    test_blog_posts()
    
    print("\n" + "=" * 50)
    print("✨ API testing completed!")

if __name__ == "__main__":
    main() 