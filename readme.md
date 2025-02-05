# Yardstick Assignment

This is a **Next.js** application that serves as a task management system. It utilizes **Next.js Server Actions** for backend operations like creating, updating, and deleting tasks. The project follows best practices to ensure efficient API handling and smooth user interactions.

## 🚀 Features

- **Full-Stack with Next.js**: Uses Next.js for both frontend and backend.
- **Next.js Server Actions**: Implements server-side logic for managing tasks.
- **Task Management**: Create, update, delete, and view tasks with due dates and statuses.
- **Form Validation**: Uses `react-hook-form` with `zod` validation.
- **UI Components**: Built with `shadcn/ui`, `radix-ui`, and `tailwindcss` for a modern UI.
- **MongoDB Integration**: Uses **MongoDB** as the database.
- **Optimized Performance**: Uses **React 19** for better rendering and performance.
- **Fully Responsive**: Works across different screen sizes.

## 💂 Tech Stack

- **Frontend & Backend**: [Next.js 15](https://nextjs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **State Management**: React **useState** & **useForm**
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Installation & Setup

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/hey-virender/yardstick-assignment.git
cd yardstick-assignment
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Set up Environment Variables**
Create a `.env` file in the root directory and add the following:

```sh
MONGODB_URI=your_mongodb_connection_string
```

### 4️⃣ **Run the Project Locally**
```sh
npm run dev
```

The application will be available at **http://localhost:3000**.

## 🔧 Available Scripts

| Command          | Description                              |
|-----------------|----------------------------------|
| `npm run dev`   | Start the development server  |
| `npm run build` | Build for production  |
| `npm run start` | Start the production server  |
| `npm run lint`  | Lint the project  |

## 📝 API Endpoints (Server Actions)

The project uses **Next.js Server Actions** instead of traditional REST APIs. The backend logic is implemented in Next.js directly under the `app/actions/` directory.

- **Create Task** → `createTask.ts`
- **Update Task** → `updateTask.ts`
- **Delete Task** → `deleteTask.ts`
- **Fetch Tasks** → `getTasks.ts`

All server actions are handled using **Next.js Server Actions**, eliminating the need for a separate backend.

## ✨ Deployment

The project is already deployed on **Vercel**.

https://yardstick-assignment-one.vercel.app/

You can redeploy using:
```sh
vercel deploy
```
Make sure to add your `MONGODB_URI` in **Vercel's environment variables**.

## 🤝 Contributing

If you want to contribute:
1. Fork the repo.
2. Create a new branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m "Added new feature"`
4. Push changes: `git push origin feature-name`
5. Open a **Pull Request**.

## 🐝 License

This project is **not** open-source but can be used for internship evaluation purposes.

---

**💌 Contact**  
For any queries, feel free to reach out:  
GitHub: [hey-virender](https://github.com/hey-virender)  

---

### 🔥 Notes:
- The project is optimized for **Next.js 15** and **React 19**.
- Uses **Server Actions** instead of APIs (like Express.js or Next.js API Routes).
- The `.env` file must contain **MONGODB_URI** to run locally.

