# Parsa Decor - Interior Design Website

A modern, multilingual interior design website with a complete backend system and admin panel.

## 🌟 Features

- **Modern Design**: Beautiful responsive design with Parsa Decor branding
- **Multi-language**: Support for English, Turkish, and Persian
- **Complete Backend**: Full-stack solution with Supabase
- **Admin Panel**: Content management system for projects and media
- **Authentication**: Secure JWT-based admin authentication
- **File Upload**: Media management with cloud storage
- **Contact System**: Contact form with database storage
- **SEO Optimized**: Built with Next.js for optimal performance

## 🚀 Quick Start

### 1. Clone and Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/parsa-decor-website.git
cd parsa-decor-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
\`\`\`

### 2. Database Setup

\`\`\`bash
# Set up database tables and storage
npm run db:setup
\`\`\`

### 3. Create Admin Account

\`\`\`bash
# Create your first admin account
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@parsadecor.com",
    "password": "your_secure_password",
    "adminKey": "your_admin_registration_key"
  }'
\`\`\`

### 4. Start Development

\`\`\`bash
# Start the development server
npm run dev

# Visit http://localhost:3000
# Admin panel: http://localhost:3000/admin/login
\`\`\`

## 🔧 GitHub Automation

### Initial Setup

\`\`\`bash
# Set your GitHub token
export GITHUB_TOKEN=your_github_personal_access_token

# Run the automated setup
npm run git:setup
\`\`\`

### Daily Workflow

\`\`\`bash
# Commit and push changes automatically
npm run git:commit "Your commit message"

# Pull latest updates
npm run git:pull
\`\`\`

## 🌐 Deployment

### Deploy to Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
npm run deploy
\`\`\`

### Environment Variables for Production

Add these to your Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `ADMIN_REGISTRATION_KEY`

## 📁 Project Structure

\`\`\`
parsa-decor-website/
├── app/                    # Next.js app directory
│   ├── [lang]/            # Multi-language routes
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/            # Admin panel components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Database client
│   ├── auth.ts           # Authentication utilities
│   └── database.ts       # Database operations
├── scripts/              # Automation scripts
│   ├── git-setup.sh      # GitHub setup
│   ├── auto-commit.sh    # Auto commit
│   └── setup-database.js # Database setup
└── public/               # Static assets
\`\`\`

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for passwords
- **File Validation**: Type and size validation for uploads
- **SQL Injection Protection**: Parameterized queries
- **Environment Variables**: Secure configuration management

## 🛠 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create admin account

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/[id]` - Update project (admin)
- `DELETE /api/projects/[id]` - Delete project (admin)

### Media
- `GET /api/media` - Get all media files
- `POST /api/media/upload` - Upload file (admin)

### Contact
- `POST /api/contact` - Submit contact form

## 📞 Support

For support, email admin@parsadecor.com or create an issue on GitHub.

## 📄 License

This project is licensed under the MIT License.
