'use server';
import { revalidatePath } from 'next/cache';
import Task from '@/models/Task';
import { connectToDatabase } from '@/lib/db';
import { ITask } from '@/models/Task';
import mongoose from 'mongoose';

// Create Task
export async function createTask(taskData: ITask) {
  try {
    await connectToDatabase();
  
    // Validate required fields
    if (!taskData.title || !taskData.dueDate) {
      throw new Error('Title and due date are required');
    }

    const newTask = new Task({
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || 'INCOMPLETE',
      dueDate: new Date(taskData.dueDate)
    });

    await newTask.save();
    revalidatePath('/'); 
    return { success: true, taskData: JSON.parse(JSON.stringify(newTask)) };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// Get All Tasks
export async function getAllTasks() {
  try {
    await connectToDatabase();
    const tasks = await Task.find().sort({ createdAt: -1 }).lean();
    return { success: true, tasks: JSON.parse(JSON.stringify(tasks)) };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// Get Single Task
export async function getTaskById(taskId: string) {
  try {
    await connectToDatabase();
    
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new Error('Invalid taskData ID');
    }

    const taskData = await Task.findById(taskId).lean();
    
    if (!taskData) {
      throw new Error('Task not found');
    }

    return { success: true, taskData: JSON.parse(JSON.stringify(taskData)) };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// Update Task
export async function updateTask(taskId: string, taskData: ITask) {
  try {
    await connectToDatabase();

    

    const updateData: Partial<ITask> = {
      title: taskData.title as string,
      description: taskData.description as string,
      status: taskData.status as "COMPLETE" | "INCOMPLETE",
      dueDate: new Date(taskData.dueDate),
      updatedAt: new Date()
    };

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updateData,
      { new: true }
    ).lean();

    if (!updatedTask) {
      throw new Error('Task not found');
    }

    revalidatePath('/');
    return { success: true, taskData: JSON.parse(JSON.stringify(updatedTask)) };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// Delete Task
export async function deleteTask(taskId: string) {
  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new Error('Invalid taskData ID');
    }

    const deletedTask = await Task.findByIdAndDelete(taskId).lean();
    
    if (!deletedTask) {
      throw new Error('Task not found');
    }

    revalidatePath('/');
    return { success: true, message: 'Task deleted successfully' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function changeStatus(taskId:string){
 try {
  await connectToDatabase()
  const task = await Task.findById(taskId)
  if(!task){
    return {
      success:false,
      error:"Task not found"
    }
  }
  if(task.status == "INCOMPLETE"){
    task.status = "COMPLETE"
  }else{
    task.status="INCOMPLETE"
  }
  await task.save()
  revalidatePath("/")
  return {
    success:true,
  }
 } catch (error) {
  return { success: false, message: (error as Error).message };
 }
}