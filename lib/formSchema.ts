import * as z from "zod";
const { object, string } = z;

export const signInSchema = object({
    email: string({ required_error: "Email is required" }).email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});
export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = object({
    email: string({ required_error: "Email is required" }).email("Invalid email"),
    password: string({ required_error: "Password is required" })
        // Passwords must be between 6 and 12 characters long, 
        // containing at least one letter and one number.        
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    firstName: string({ required_error: "First Name is required" })
        .min(4, "First Name is required")
        .max(32, "First Name must be less than 32 characters"),
    lastName: string({ required_error: "Last Name is required" })
        .min(4, "Last Name is required")
        .max(32, "Last Name must be less than 32 characters"),
});
export type SignUpValues = z.infer<typeof signUpSchema>;