# 🚀 GigFlow – Mini Freelance Marketplace Platform

GigFlow is a simplified freelance marketplace platform where users can post gigs (jobs), bid on gigs, and hire freelancers using an intuitive workflow.

✔ Built with MERN (MongoDB, Express, React, Node)  
✔ Secure authentication using JWT + HttpOnly cookies  
✔ Fully functional bidding and hiring logic  
✔ Deployed backend on Render & frontend on Vercel

---

## 📌 Features Overview

### 🔐 1. User Authentication
- Signup & Login using JWT
- HttpOnly cookies for secure session management
- `/auth/me` auto-fetches logged-in user
- Any user can act as both **Client** and **Freelancer**

---

### 📁 2. Gig Management
- Post a gig with title, description, budget
- Browse all open gigs
- Search gigs by title
- View gig details with associated bids

---

### 💬 3. Bidding Flow
- Logged-in users can bid on any gig
- Bid includes: message + price
- Client who created the gig sees all bids

---

### 🔥 4. Hiring Logic (Core Requirement)
When a client hires a freelancer:
- Gig status changes from **open → assigned**
- Selected bid becomes **hired**
- Other bids automatically become **rejected**

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit (Auth only)
- Axios (withCredentials)
- TailwindCSS

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Auth (HttpOnly Cookies)

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 📂 Project Structure

```bash
frontend/
  ├── src/
  │   ├── redux/
  │   ├── pages/
  │   ├── components/
  │   ├── api/
  │   ├── App.jsx
  │   └── main.jsx

backend/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── index.js
  └── .env.example
````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/gigflow.git
cd gigflow
```

---

## 🖥 Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Start server:

```bash
npm start
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
```

Update axios baseURL in `axiosClient.js`:

```js
baseURL: "https://your-backend-url.onrender.com/api",
withCredentials: true
```

Start frontend:

```bash
npm run dev
```

---

## 📌 API Endpoints Summary

### Auth

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| POST   | /auth/register | Register user      |
| POST   | /auth/login    | Login user         |
| GET    | /auth/me       | Get logged-in user |

---

### Gigs

| Method | Endpoint  | Description     |
| ------ | --------- | --------------- |
| GET    | /gigs     | Fetch all gigs  |
| POST   | /gigs     | Create a gig    |
| GET    | /gigs/:id | Get gig details |

---

### Bids

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| POST   | /bids             | Create a bid       |
| GET    | /bids/:gigId      | Get bids for a gig |
| PATCH  | /bids/:bidId/hire | Hire a freelancer  |

---

## 🎥 Demo Video

Loom Recording:
👉 [Video](https://www.loom.com/share/59771c7a8a2b4ae2acf5ea358a784057)

---

## 🌐 Live Links

* **Frontend:** [https://gigflow-amit.vercel.app](https://gigflow-amit.vercel.app)
* **Backend:** [https://gigflow-l5jw.onrender.com](https://gigflow-l5jw.onrender.com)

---

## 🛡 Security Notes

* HttpOnly cookies prevent XSS
* Passwords hashed using bcrypt
* No tokens stored in localStorage
* Backend protected routes validated using middleware

---

## 🚀 Future Enhancements

* Real-time updates (Socket.io)
* Chat system
* Dashboard analytics
* Notifications

---

## 👨‍💻 Author

**Amit Kumar Gupta**
- Full Stack Developer 
- LinkedIn: [amitguptadev](https://www.linkedin.com/in/amitguptadev)  
- GitHub: [amit-gupta18](https://github.com/amit-gupta18)

---

