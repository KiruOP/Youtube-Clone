# K-Tube: YouTube Clone Project

K-Tube is a modular, high-fidelity YouTube Clone built with React, Redux, Express, and Node.js. It features a modern dark UI, a custom gesture-enabled video player, dynamic recommendations, user support points, static media uploads via Cloudinary, database seeding scripts, and integrated real-time WebRTC/VoIP calling.

---

## 🚀 Key Features

1. **User Points System**: Users earn points for watching videos. Points are dynamically displayed in the creator's profile.
2. **Custom Video Player**: Custom controls including single-tap pause, double-tap to seek (10s back/forward), triple-tap to scroll comments or play next, speed press gestures, and weather location widgets.
3. **VoIP Calling & Screen Share**: A real-time video conferencing dashboard running on socket connections, active daily between 6:00 PM and 12:00 AM.
4. **Cloudinary Integration**: Uploaded video assets are served via Cloudinary CDN, decoupling media storage from local database processes.
5. **Robust Seeding**: A quick database seeding utility to populate mock engagement statistics (views, likes, comments) automatically.

---

## 🛠️ Local Setup Instructions

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v16+ recommended)
* [MongoDB](https://www.mongodb.com/try/download/community) (running locally or via Atlas)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/KiruOP/Youtube-Clone.git
cd Youtube-Clone
```

---

### Step 2: Set Up Environment Variables

#### 1. Backend Server Env (`server/.env`)
Create `server/.env` using the template `server/.env.example`:
```env
PORT = 5353
DB_URL = mongodb://localhost:27017/
JWT_SECERT = your_jwt_secret

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
```

#### 2. Frontend Client Env (`client/.env`)
Create `client/.env` using the template `client/.env.example`:
```env
REACT_APP_GOOGLE_CLIENT_ID = your_google_client_id.apps.googleusercontent.com
REACT_APP_API_BASE_URL = http://localhost:5353
```

---

### Step 3: Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

### Step 4: Seed Database with Demo Content (Optional)
To quickly populate your local workspace with channels, videos, views, likes, and comments:
1. Place one or more `.mp4` video files inside the `server/uploads/` directory.
2. Ensure your MongoDB is running and Cloudinary environment variables are filled in.
3. Run the seeding script:
   ```bash
   cd ../server
   node seed.js
   ```
*(Note: Uploaded `.mp4` files are ignored by git in `uploads/` so your repository stays clean).*

---

### Step 5: Start the Development Server
Open two terminal windows:

* **Terminal 1 (Backend)**:
  ```bash
  cd server
  npm start
  ```
* **Terminal 2 (Frontend)**:
  ```bash
  cd client
  npm start
  ```

---

## ☁️ Deployment Guide

### 1. Database (MongoDB Atlas)
1. Register on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and deploy a free **M0 cluster**.
2. Under **Network Access**, add IP `0.0.0.0/0` (Allow Access from Anywhere).
3. Under **Database Access**, create a user credentials pair.
4. Retrieve your connection string.

### 2. Backend (Render)
1. Sign in to [Render](https://render.com/) and create a new **Web Service** linked to your GitHub repository.
2. Set build properties:
   * **Root Directory**: `server`
   * **Build Command**: `npm install`
   * **Start Command**: `node index.js`
3. Add your environment variables under **Settings**:
   * `DB_URL` = `mongodb+srv://<user>:<password>@cluster.mongodb.net/K-Tube?retryWrites=true&w=majority`
   * `JWT_SECERT`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
4. Deploy the service and copy your public Render URL (e.g. `https://your-app-backend.onrender.com`).

### 3. Frontend (Vercel)
1. Sign in to [Vercel](https://vercel.com/) and import your project repository.
2. Set configuration properties:
   * **Root Directory**: `client`
   * **Framework Preset**: `Create React App`
3. Under **Environment Variables**, add:
   * `REACT_APP_GOOGLE_CLIENT_ID` = `your_google_client_id`
   * `REACT_APP_API_BASE_URL` = `https://your-app-backend.onrender.com` (Render Backend URL)
   * `CI` = `false`
4. Click **Deploy**. Vercel will build and serve your app. Update the Authorized redirect origins in your Google Console to match your Vercel client URL.

## Conclusion

This YouTube clone project demonstrates full-stack development skills, incorporating user engagement features, custom video controls, and a time-restricted VoIP service. Follow the steps above to set up the project on your local machine and explore its functionalities.

For any issues or contributions, feel free to open an issue or submit a pull request!
