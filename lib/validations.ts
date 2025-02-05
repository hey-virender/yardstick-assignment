'use client'
import {z} from 'zod'
export const taskSchema =  z.object({
  title: z.string().min(1, {message: 'Title is required'}).max(50, {message: 'Title must be less than 50 characters'}),
  description: z.string().min(1, {message: 'Description is required'}).max(200, {message: 'Description must be less than 200 characters'}),
  status: z.enum(['COMPLETE', 'INCOMPLETE']).default('INCOMPLETE'),
  dueDate: z.coerce.date().refine(
    date => date > new Date(),
    "Due date must be in the future"
  )
})