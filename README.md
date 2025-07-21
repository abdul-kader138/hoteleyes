# **Ororo Web**

## **📌 Project Overview**

Ororo Web is a **React Router-based web application** that serves as the front-end for the Ororo Web platform. It is built using **React 19**, **Tailwind CSS**, and **Vite** for modern, fast development. The project follows best practices for **React Router applications**.

---

## **🚀 Getting Started**

### **1️⃣ Prerequisites**

Before running this project, make sure you have installed the following:

- **Node.js** (Recommended: v18 or later)
- **NPM** (Comes with Node.js)

### **2️⃣ Clone the Repository**

```sh
  git clone <repository_url>
  cd ororo-web
```

### **3️⃣ Install Dependencies**

```sh
  npm install
```

### **4️⃣ Configure Environment Variables**

1. Copy the `.env.example` file and rename it to `.env`:
   ```sh
   cp .env.example .env
   ```
2. Edit the `.env` file and update necessary configurations:
   ```env
   VITE_API_BASE_URL=URL_WHERE_YOUR_BACKEND_API_RUNNING
   VITE_WEBSOCKET_BASE_URL=URL_WHERE_YOUR_WEBSOCKET_RUNNING
   ```

### **5️⃣ Start the Development Server**

Run the frontend in development mode:

```sh
  npm run dev
```

The app will be available at **`http://localhost:5173/`** by default.

### **6️⃣ Build for Production**

To create an optimized build for production:

```sh
  npm run build
```

This will generate the production-ready files in the `build/` directory.

### **7️⃣ Start the Production Server**

To serve the production build:

```sh
  npm run start
```

---

## **📌 Available Commands**

| Command             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Starts the app in **development mode** with hot reload |
| `npm run build`     | Builds the app for **production**                      |
| `npm run start`     | Serves the built app in **production mode**            |
| `npm run typecheck` | Runs TypeScript type checks                            |

---

## **🛠️ Project Structure**

```
ororo-web/
│── src/                  # Main source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages
│   ├── utils/            # Utility functions
│── public/               # Static assets
│── .env                  # Environment variables (ignored in Git)
│── package.json          # Project dependencies & scripts
│── README.md             # Documentation
```

---

## **📌 Troubleshooting**

### ❗ **API Connection Issues**

✅ Ensure the backend is running at same URL which your mentioned in `.env`

### ❗ **Vite Issues**

✅ Clear cache and restart the server:

```sh
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**🚀 Happy Coding!**
