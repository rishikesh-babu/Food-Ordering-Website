# 🍽️ Food Ordering Website

A full-stack food ordering web application built with **React** on the frontend and **Node.js/Express** on the backend. Users can browse restaurants, order food, manage their cart and wishlist, and pay securely via Stripe. Admins have a dedicated dashboard to manage hotels, food items, orders, and users.

🔗 **Live Demo:** [https://food-express-frontend-yyuz.onrender.com](https://food-express-frontend-yyuz.onrender.com/)

---

## 🚀 Features

### 👤 User
- Sign up / Log in with JWT-based authentication
- Browse restaurants (hotels) and their menus
- View detailed food item pages
- Add items to **Cart** or **Wishlist**
- Place orders with **Stripe** payment integration
- View payment success/cancel pages
- Track orders and view individual order details
- View and edit user profile (including profile picture upload)

### 🛠️ Admin
- Separate admin login and protected dashboard
- Create, update, and delete **Hotels** and **Food** items
- Upload images via **Cloudinary** (Multer middleware)
- View and manage all **Users** (activate / block accounts)
- View all **Orders**

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Redux Toolkit + React-Redux | Global state management |
| Tailwind CSS + DaisyUI | Styling |
| Framer Motion | Animations |
| MUI (Material UI) | UI components & icons |
| Axios | HTTP requests |
| Stripe.js | Payment integration |
| React Hot Toast + SweetAlert2 | Notifications & alerts |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcrypt | Password hashing |
| Cloudinary | Image storage |
| Multer | File/image upload middleware |
| Stripe | Payment processing |
| Nodemailer | Email notifications |
| Cookie-Parser | Cookie-based auth tokens |
| dotenv | Environment variable management |
| Nodemon | Dev auto-reload |

---

## 📁 Project Structure

```
Food-Ordering-Website/
├── backend/
│   ├── app.js                  # Express app entry point
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/            # Route handler logic
│   ├── middlewares/
│   │   ├── adminAuth.js        # Admin JWT auth middleware
│   │   ├── userAuth.js         # User JWT auth middleware
│   │   └── multer.js           # File upload middleware
│   ├── model/                  # Mongoose schemas
│   │   ├── userModel.js
│   │   ├── adminModel.js
│   │   ├── hotelModel.js
│   │   ├── foodModel.js
│   │   ├── cartModel.js
│   │   ├── orderModel.js
│   │   └── wishlistModel.js
│   ├── routes/
│   │   ├── index.js            # Route aggregator
│   │   ├── userRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── hotelRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── wishListRouter.js
│   └── utils/                  # Helper utilities
│
└── frontend/
    ├── index.html
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── assets/
    │   ├── components/         # Reusable UI components
    │   ├── config/             # Axios instance & config
    │   ├── hooks/              # Custom React hooks
    │   ├── layout/
    │   │   ├── UserLayout.jsx
    │   │   └── AdminLayout.jsx
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── AdminLogin.jsx
    │   │   │   ├── Hotel.jsx
    │   │   │   ├── SingleHotel.jsx
    │   │   │   ├── CreateHotel.jsx
    │   │   │   ├── Food.jsx
    │   │   │   ├── CreateFood.jsx
    │   │   │   ├── ViewUser.jsx
    │   │   │   └── ViewOrder.jsx
    │   │   ├── user/
    │   │   │   ├── Home.jsx
    │   │   │   ├── UserLogin.jsx
    │   │   │   ├── UserSignup.jsx
    │   │   │   ├── SingleHotelUser.jsx
    │   │   │   ├── SingleFoodUser.jsx
    │   │   │   ├── Cart.jsx
    │   │   │   ├── Wishlist.jsx
    │   │   │   ├── Order.jsx
    │   │   │   ├── SingleOrder.jsx
    │   │   │   ├── PaymentSuccess.jsx
    │   │   │   ├── PaymentCancel.jsx
    │   │   │   ├── UserProfile.jsx
    │   │   │   └── UserProfileEdit.jsx
    │   │   └── shared/
    │   │       └── ErrorPage.jsx
    │   ├── redux/              # Redux slices & store
    │   └── routes/
    │       ├── routes.jsx
    │       ├── UserProtectedRoutes.jsx
    │       └── AdminProtectedRoutes.jsx
    └── ...config files
```

---

## 🔌 API Endpoints

### User — `/api/user`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | — | Register a new user |
| POST | `/login` | — | Log in a user |
| POST | `/logout` | ✅ User | Log out |
| GET | `/check-user` | ✅ User | Verify auth token |
| GET | `/profile` | ✅ User | Get user profile |
| PUT | `/update-profile` | ✅ User | Update profile picture |

### Admin — `/api/admin`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | — | Register admin |
| POST | `/login` | — | Admin login |
| POST | `/logout` | ✅ Admin | Admin logout |
| GET | `/check-admin` | ✅ Admin | Verify admin token |
| GET | `/get-all-user` | ✅ Admin | List all users |
| PUT | `/active-user` | ✅ Admin | Activate a user |
| PUT | `/block-user` | ✅ Admin | Block a user |
| PUT | `/update-profile-pic` | ✅ Admin | Update admin profile picture |

### Hotels & Food — `/api/hotel`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/create-hotel` | ✅ Admin | Create a new hotel |
| POST | `/create-food` | ✅ Admin | Add a food item |
| PUT | `/update-hotel` | ✅ Admin | Update hotel details |
| PUT | `/update-food` | ✅ Admin | Update food item |
| DELETE | `/delete-hotel/:hotelId` | ✅ Admin | Delete a hotel |
| DELETE | `/delete-food/:foodId` | ✅ Admin | Delete a food item |
| GET | `/get-all-hotels` | — | List all hotels |
| GET | `/get-all-food` | — | List all food items |
| GET | `/single-hotel/:hotelId` | — | Get a single hotel |
| GET | `/single-hotel-food/:hotelId` | — | Get food items of a hotel |
| GET | `/single-food/:foodId` | — | Get a single food item |

### Other Routes
| Base | Description |
|------|-------------|
| `/api/cart` | Cart management |
| `/api/order` | Order management |
| `/api/payment` | Stripe payment processing |
| `/api/wishlist` | Wishlist management |

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_DOMAIN=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)
- [Cloudinary](https://cloudinary.com/) account
- [Stripe](https://stripe.com/) account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Food-Ordering-Website.git
   cd Food-Ordering-Website
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   # Create and fill in your .env file (see Environment Variables above)
   npm start
   ```
   The backend server will start at `http://localhost:3000`.

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   # Create and fill in your .env file (see Environment Variables above)
   npm run dev
   ```
   The frontend dev server will start at `http://localhost:5173`.

---

## 🌐 Application Routes

### User-Facing
| Path | Page |
|------|------|
| `/` | Home — browse restaurants |
| `/login` | User login |
| `/signup` | User registration |
| `/hotel/:hotelId` | Single restaurant page |
| `/food/:foodId` | Single food item page |
| `/user/cart` | Shopping cart |
| `/user/wishlist` | Wishlist |
| `/user/orders` | Order history |
| `/user/order/:orderId` | Single order detail |
| `/user/profile` | User profile |
| `/user/profile/edit` | Edit profile |
| `/user/payment/success` | Payment success page |
| `/user/payment/cancel` | Payment cancelled page |

### Admin Dashboard
| Path | Page |
|------|------|
| `/admin/login` | Admin login |
| `/admin/hotel` | Manage hotels |
| `/admin/create-hotel` | Create a new hotel |
| `/admin/hotel/:hotelId` | Single hotel management |
| `/admin/food` | Manage all food items |
| `/admin/create-food` | Add a new food item |
| `/admin/create-food/:hotelId` | Add food to a specific hotel |
| `/admin/view-user` | View & manage users |
| `/admin/orders` | View all orders |

---

## 🔒 Authentication

- **Users** authenticate via JWT stored in HTTP-only cookies.
- **Admins** have a separate authentication flow with their own JWT middleware.
- Protected routes on both frontend (React Router guards) and backend (middleware) ensure proper access control.

---

## 📦 Deployment

- **Frontend**: Deploy the Vite build (`npm run build`) to services like [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
- **Backend**: Deploy to services like [Render](https://render.com/), [Railway](https://railway.app/), or any Node.js-compatible host.
- **Database**: Use [MongoDB Atlas](https://www.mongodb.com/atlas) for a managed cloud database.
- **Images**: Hosted on [Cloudinary](https://cloudinary.com/).

---

## 📄 License

This project is licensed under the **ISC License**.