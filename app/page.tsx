'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the form data type
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        firstName: z.string().min(2).max(30),
        lastName: z.string().min(2).max(30),
        email: z.string().email(),
        age: z.number().min(18).max(70),
        password: z.string().min(5).max(15),
        confirmPassword: z.string().min(5).max(15),
      }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
    ),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <div className='title'>Form</div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" {...register("firstName")} />
          {errors.firstName && (
            <span className="error">{errors.firstName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <span className="error">{errors.lastName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="text" id="age" {...register("age", { valueAsNumber: true })} />
          {errors.age && (
            <span className="error">{errors.age.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
