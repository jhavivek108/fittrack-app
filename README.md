# fittrack-app
🌩 Cloud-Powered Fitness Tracking
FitTrack is a modern fitness tracking application that leverages multiple cloud computing services to deliver a scalable, secure, and reliable experience.

🔧 Cloud Technologies Used
1. Firebase Hosting (PaaS)
Usage: Deployed frontend assets (HTML, CSS, JS)

Benefits:
Global CDN delivery
Automatic SSL certificates
One-command deployments
Version rollback capability

2. Firebase Authentication (BaaS)
Usage: User signup/login functionality

Cloud Features:
Email/password authentication
Session management
Secure token handling
Built-in security protections

3. Cloud Firestore (NoSQL Database)
Usage: Stores user workouts and activity data

Cloud Advantages:
Real-time data synchronization
Automatic scaling
Multi-region redundancy
Offline-first capabilities

4. Firebase Functions (Serverless)
Usage: Backend logic (when expanded)

Cloud Benefits:
Pay-per-execution model
Automatic scaling
No server management


🚀 Key Cloud Features Implemented
1. Real-time Data Sync

   Cloud Firestore's real-time listeners update the UI instantly when data changes

2. Serverless Architecture

   No backend servers to manage

   Authentication and database fully handled by Firebase services

3. Global Availability

   Hosted on Firebase's global infrastructure

   Data stored in Asia-south1 region (configurable)

4. Automatic Scaling

   Handles traffic spikes without manual intervention

   Database scales seamlessly with user growth

📁 Project Structure
fittrack-app/
├── public/               # Hosted on Firebase CDN
│   ├── index.html        # Main app interface
│   ├── style.css         # Cloud-delivered styles
│   └── app.js            # Cloud-optimized frontend logic
├── firebase.json         # Cloud deployment config
├── firestore.rules       # Cloud database security rules
└── firestore.indexes.json # Cloud database indexes
