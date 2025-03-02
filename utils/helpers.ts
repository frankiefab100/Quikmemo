// import bcrypt from "bcryptjs";

// export function saltAndHashPassword(password: string) {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
//     return hash
// }


/**
 * Public routes
 * @type {string[]}
 */
export const publicRoutes = ["/", "/login", "/register"];

export const authRoutes = ["/login", "/register"];

export const apiAuthPrefix = "/api/auth";