"use client";
import React, { JSX, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TaskParams } from "@/types";
import { format } from "date-fns";
import { Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import TaskForm from "./TaskForm";
import { taskSchema } from "@/lib/validations";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogClose, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";

type StatusType = "INCOMPLETE" | "COMPLETE";

interface Props extends TaskParams {
  onUpdate: (
    taskData: z.infer<typeof taskSchema>,
    _id: string,
  ) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onStatusChange: (id: string) => Promise<void>;
}

const Task = ({
  _id,
  title,
  description,
  status,
  dueDate,
  onDelete,
  onStatusChange,
  onUpdate,
}: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const statusConfig: Record<StatusType, { color: string; icon: JSX.Element }> =
    {
      INCOMPLETE: {
        color: "bg-rose-500 text-white",
        icon: <AlertCircle className="w-4 h-4 mr-1" />,
      },
      COMPLETE: {
        color: "bg-emerald-500 text-white",
        icon: <CheckCircle2 className="w-4 h-4 mr-1" />,
      },
    };

  const handleUpdate = async (data: z.infer<typeof taskSchema>) => {
    await onUpdate(data, _id!);
    setIsEditOpen(false);
  };

  return (
    <Card
      key={_id}
      className="group relative col-span-1 h-60 md:h-72 w-full max-w-md sm:max-w-lg mx-auto border border-gray-700 rounded-xl transition-all hover:border-gray-500 hover:shadow-2xl hover:-translate-y-1"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold tracking-tight truncate pr-6">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-3 h-60">
        <div className="flex justify-between items-start gap-2">
          <p className="text-sm mb-4 leading-relaxed">{description}</p>
          <span
            className={`${
              statusConfig[status as StatusType].color
            } px-2.5 py-1 rounded-full text-xs font-medium flex items-center`}
          >
            {statusConfig[status as StatusType].icon}
            {status.toLowerCase()}
          </span>
        </div>

        <div className="flex items-center justify-start gap-2 pt-3 border-t border-gray-800">
          <div className="flex items-center gap-2 text-sm text-rose-400">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400">
              {format(new Date(dueDate), "MMM dd, yyyy")}
            </span>
          </div>
        </div>
      </CardContent>

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a 1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => onStatusChange(_id)}>
                Mark as {status === "INCOMPLETE" ? "Complete" : "Incomplete"}
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => setIsEditOpen(true)}>
                Edit
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                className="text-red-500"
                onClick={() => setIsDeleting(true)}
              >
                Delete
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogTrigger asChild>
          <div />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>

            <DialogDescription>
              Do you really want to delete this task ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => {
                onDelete(_id);
                setIsDeleting(false);
              }}
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogTrigger asChild>
          <div />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            type="Update"
            title={title}
            description={description}
            dueDate={dueDate}
            status={status}
            onCancel={() => setIsEditOpen(false)}
            onSubmit={handleUpdate}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Task;
