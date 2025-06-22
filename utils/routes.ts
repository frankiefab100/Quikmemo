// Routes that are publicly accessible (no authentication required)
export const publicRoutes = ["/", "/login", "/register", "/forgot-password", "/reset-password"];

// Routes used for authentication (login, register, etc.)
export const authRoutes = ["/login", "/register"];

// Prefix for NextAuth API authentication routes
export const apiAuthPrefix = "/api/auth";