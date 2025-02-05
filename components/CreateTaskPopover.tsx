"use client";

import React, { useState } from "react";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import TaskForm from "./TaskForm";
import { createTask } from "@/lib/actions/task";
import { taskSchema } from "@/lib/validations";
import { z } from "zod";
import { ITask } from "@/models/Task";
import { toast } from "@/hooks/use-toast";
import { useTasks } from "@/contexts/TaskContext"; // Import context

const CreateTaskPopover = () => {
  const [open, setOpen] = useState(false);
  const { setTasks } = useTasks(); // Access setTasks from context

  const handleCreateTask = async (task: z.infer<typeof taskSchema>) => {
    try {
      const taskData = {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      };

      // Create a new task
      const response = await createTask(taskData as ITask);
      if (response.success) {
        setTasks((prevTasks) => [response.taskData, ...prevTasks]); // Add new task to state
        toast({
          title: "Task Created",
          description: "Task created successfully",
        });
      } else {
        toast({
          title: "Failed",
          description: response.message,
          variant: "destructive",
        });
      }
      setOpen(false);
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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button>New Task</Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="top"
          className="portal z-50 w-auto p-0 bg-background border rounded-lg shadow-lg"
        >
          <TaskForm
            type="Create"
            onSubmit={handleCreateTask}
            onCancel={() => setOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CreateTaskPopover;
