# Google Sheets CRUD Integration

A comprehensive data entry form that integrates with Google Sheets for Create, Read, Update, and Delete (CRUD) operations.

## 🚀 Features

- **Modern Web Interface**: React-based frontend with Material-UI components
- **Google Sheets Integration**: Full CRUD operations with Google Sheets API
- **Form Validation**: Comprehensive client and server-side validation
- **Security**: Input sanitization, rate limiting, and CORS protection
- **Testing**: Unit and integration tests for both frontend and backend
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Tech Stack

### Frontend
- **React 18** with Vite
- **Material-UI (MUI)** for components
- **Axios** for API communication
- **React Hook Form** for form management

### Backend
- **Node.js** with Express
- **Google APIs** for Sheets integration
- **Express Validator** for input validation
- **Helmet** and **CORS** for security
- **Jest** and **Supertest** for testing

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Google Cloud Platform account
- Google Sheets API enabled

### 1. Google API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Create a Service Account:
   - Go to IAM & Admin > Service Accounts
   - Click "Create Service Account"
   - Give it a name and description
   - Click "Create and Continue"
   - Skip role assignment (click "Continue")
   - Click "Done"
5. Generate credentials:
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the key file

### 2. Google Sheets Setup

1. Create a new Google Sheet
2. Share the sheet with your service account email (from the JSON file)
3. Give "Editor" permissions
4. Copy the sheet ID from the URL

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

Update `.env` with your Google credentials:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id_here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

### 4. Frontend Setup

```bash
cd web

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Build Test
```bash
cd web
npm run build
```

## 🎯 Usage

### Access the Application
1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Log in to access the dashboard
4. Click on "Google Sheets" in the navigation

### Form Features
- **Add Records**: Click "New Record" to create entries
- **Edit Records**: Click the edit icon on any row
- **Delete Records**: Click the delete icon with confirmation
- **Search**: Use the search bar to filter records
- **Validation**: Real-time form validation with error messages

### Data Fields
- **Name** (required): Text, max 100 characters
- **Email** (required): Valid email format
- **Age** (optional): Number between 0-150
- **Address** (optional): Text, max 500 characters
- **Phone** (optional): Valid phone number format

## 🔒 Security Features

- **Input Validation**: Both client and server-side validation
- **Sanitization**: All inputs are sanitized to prevent injection attacks
- **Rate Limiting**: API endpoints are rate-limited (100 requests per 15 minutes)
- **CORS Protection**: Configured for specific origins
- **Error Handling**: Secure error messages without sensitive data exposure

## 🏗️ Architecture

### Frontend Structure
```
web/src/
├── hooks/              # Custom React hooks
│   └── use-sheets-data.js
├── pages/              # Page components
│   └── sheets.jsx
├── sections/sheets/    # Sheets-specific components
│   ├── view/           # Main view component
│   ├── components/     # Reusable components
│   ├── sheets-form.jsx
│   ├── sheets-table-*.jsx
│   └── utils.js
└── layouts/           # Application layout
```

### Backend Structure
```
backend/
├── controllers/        # Request handlers
├── middleware/         # Express middleware
├── routes/            # API routes
├── services/          # Business logic
├── tests/             # Test files
└── server.js          # Entry point
```

## 🚀 Deployment

### Backend Deployment (Vercel/Railway/Heroku)
1. Set environment variables in your hosting platform
2. Deploy the `backend/` directory
3. Update CORS settings for production domain

### Frontend Deployment (Vercel/Netlify)
1. Update `VITE_API_URL` to your backend URL
2. Build and deploy the `web/` directory

### Environment Variables for Production
```env
# Backend
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id_here
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com

# Frontend
VITE_API_URL=https://your-backend-domain.com/api
```

## 🔧 API Endpoints

### Sheets API Routes
- `GET /api/sheets` - Get all records
- `POST /api/sheets` - Create new record
- `GET /api/sheets/:id` - Get specific record
- `PUT /api/sheets/:id` - Update record
- `DELETE /api/sheets/:id` - Delete record

### Health Check
- `GET /health` - Server health status

## 🐛 Troubleshooting

### Common Issues

1. **Google API Errors**
   - Verify service account email has access to the sheet
   - Check that Google Sheets API is enabled
   - Ensure private key is properly formatted in .env

2. **CORS Errors**
   - Check CORS_ORIGIN in backend .env
   - Ensure frontend URL matches CORS configuration

3. **Build Errors**
   - Run `npm install` in both frontend and backend
   - Check for missing dependencies

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Run linting and tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details