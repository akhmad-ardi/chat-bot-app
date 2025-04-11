import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().nonempty({ message: "Name user is required" }),
  email: z.string().email().nonempty({ message: "Email is required" }),
  password: z.string().min(6).nonempty({ message: "Password is required" }),
});

export const SignInSchema = z.object({
  email: z.string().email().nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export const AddChatSchema = z.object({
  name: z.string().nonempty({ message: "Name chat is required" }),
});

export const AddMessageSchema = z.object({
  chat_id: z.number().nonnegative(),
  message: z.string().nonempty({ message: "Please, input the message" }),
});
