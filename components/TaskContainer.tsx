"use client";

import {
  changeStatus,
  deleteTask,
  getAllTasks,
  updateTask,
} from "@/lib/actions/task";
import React, { useEffect } from "react";
import Task from "./Task";
import { z } from "zod";
import { ITask } from "@/models/Task";
import { toast } from "@/hooks/use-toast";
import { taskSchema } from "@/lib/validations";
import { useTasks } from "@/contexts/TaskContext"; // Import the context hook

const TaskContainer = () => {
  const { tasks, setTasks } = useTasks(); // Access tasks and setTasks from context
  
  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getAllTasks();
      if (result.success) {
        setTasks(result.tasks); // Update tasks from context
      }
    };
    fetchTasks();
  }, [setTasks]); // Ensure setTasks is passed to the effect

  const handleUpdateTask = async (
    task: z.infer<typeof taskSchema>,
    id: string,
  ) => {
    try {
      const taskData = {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      };
      const response = await updateTask(id, taskData as ITask);
      if (response.success) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id.toString() === id ? { ...t, ...taskData } : t // Ensure both are strings
          )
        );
        toast({
          title: "Success",
          description: "Task updated successfully",
        });
      } else {
        toast({
          title: "Failed",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
      console.log(error);
    }
  };
  
  const handleDeleteTask = async (id: string) => {
    try {
      const response = await deleteTask(id);
      if (response.success) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id.toString() !== id) // Ensure both are strings
        );
        toast({
          title: "Success",
          description: "Task deleted successfully",
        });
      } else {
        toast({
          title: "Failed",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        description: "An error occurred",
        variant: "destructive",
      });
    }
  };
  
  const handleStatusChange = async (taskId: string) => {
    try {
      const response = await changeStatus(taskId);
      if (response.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id.toString() === taskId
              ? { ...task, status: task.status === "INCOMPLETE" ? "COMPLETE" : "INCOMPLETE" }
              : task
          )
        );
        toast({
          title: "Success",
          description: "Status updated successfully",
        });
      } else {
        toast({
          title: "Failed",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        description: "An error occurred",
        variant: "destructive",
      });
    }
  };
  

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {tasks.map((task:ITask) => (
          <Task
            key={task._id.toString()}
            _id={task._id.toString()}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            status={task.status}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskContainer;
