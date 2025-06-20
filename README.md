<div align="center">
 <img width="60" src="./public/icons/quikmemo-mark-logo.svg" alt="quikmemo logo">
 <h1>Quikmemo</h1>
 <p>The ultimate note-taking application</p>
</div>

## Overview

Quikmemo is an easy-to-use note-taking app that helps you capture your thoughts, jot down ideas, and organize tasks. It's perfect for writers, students, professionals, and anyone who wants to stay organized.

**Live URL:** <https://quikmemo.vercel.app/>

## 🏗️ Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Auth.js (NextAuth)](https://authjs.dev/)
  - [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) for password hashing
  - [Zod](https://zod.dev/) for schema validation
  - [React Hook Form](https://react-hook-form.com/) for form state management
- **Database & ORM:** [MongoDB](https://mongodb.com/) 
  - [Prisma](https://prisma.io/) Type-safe ORM for database management
- **Animation:** [Motion (Framer Motion)](https://motion.dev/)
- **Analytics:** [Umami Analytics](https://umami.is/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Email Service:** 
  - [Resend](https://resend.com/) for sending notifications and password resets
  - [React Email](https://react.email/) for creating email templates
- **Progressive Web App:** [next-pwa](https://github.com/shadowwalker/next-pwa)
- **Text Editor:** [Tiptap](https://tiptap.dev/)
- **Testing:**
  - [Vitest](https://vitest.dev/) unit test framework
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for integration and React DOM testing 
- **Icons:** [Lucide Icons](https://lucide.dev/)


## ✨ Features

### User Authentication & Management  
- [x] User Authentication and Session Management  
- [x] Forgot Password and Password Reset 
- [x] Verify Sign Up via Email
- [x] Save Users in Database
- [ ] Edit User Profile    

### Note Management  
- [x] Create Notes  
- [x] Edit Notes  
- [x] Delete Notes  
- [x] Archive Notes  
- [x] Favorite Notes   
- [x] Restore Archived, Favorite, and Deleted Notes
- [x] Save All Notes in Database

### User Experience  
- [x] Search Notes by Title, Tag, and Content  
- [x] Toggle Theme from the dashboard  
- [x] Rich Text Editor    
- [x] Progressive Web App  
- [x] Website Analytics 
- [ ] Web Animation
- [ ] Offline Access
- [ ] Rich Media Support

> [!IMPORTANT]
>
> - [x] indicates features that are fully implemented.
> - [ ] indicates features that are planned for future development.

## 🚀 Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/frankiefab100/quikmemo.git
   cd quikmemo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
Create a `.env.local` file in the project root and fill in your credentials:

   ```env
   BASE_URL=http://localhost:3000       # Base URL of the application (change for production)
   DATABASE_URL=                        # Connection string for your database (e.g. MongoDB URI)

   AUTH_SECRET=                         # Secret key used to encrypt authentication tokens
   AUTH_GOOGLE_ID=                      # Google OAuth Client ID for social login
   AUTH_GOOGLE_SECRET=                  # Google OAuth Client Secret
   AUTH_GITHUB_ID=                      # GitHub OAuth Client ID for social login
   AUTH_GITHUB_SECRET=                  # GitHub OAuth Client Secret
   AUTH_TWITTER_ID=                     # Twitter OAuth Client ID for social login
   AUTH_TWITTER_SECRET=                 # Twitter OAuth Client Secret

   RESEND_API_KEY=                      # API key for Resend email service
   UMAMI_WEBSITE_ID=                    # Website ID for Umami analytics tracking
   ```

4. **Run database migrations (if using Prisma):**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 📁 Project Structure

```
quikmemo/
├── __tests__/            # Unit and integration tests
├── action/               # Authentication action
├── app/                  # Next.js App Router
│   ├── (auth)/           # Authentication pages
│   ├── (dashboard)/      # Main dashboard UI
│   ├── api/              # API routes (notes, auth)
│   └── fonts/            # Custom fonts
├── assets/               # Project assets (images, video)
├── components/           # Reusable React components
├── constants/            # Constants
├── context/              # Context APIs
├── emails/               # Email templates
├── hooks/                # Custom hooks
├── lib/                  # Library functions
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets (icons, images)
├── style/                # Tailwind CSS styles
├── types/                # Type definitions
├── utils/                # Utility functions
├── .env.local            # Environment variables
├── next.config.ts        # Next.js configurations
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # Postcss configurations
├── README.md             # Project documentation
├── service-worker.js     # PWA Service worker
├── tailwind.config.ts    # Tailwind CSS configurations
├── tsconfig.json         # TypeScript configurations
└── vitest.config.mts     # Vitest configurations
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

Built and maintained by [frankiefab](https://github.com/frankiefab100) — Contributions welcome!

