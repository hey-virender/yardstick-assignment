import mongoose from "mongoose";

export interface ITask {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status : "COMPLETE" | "INCOMPLETE";
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["COMPLETE", "INCOMPLETE"],
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,    
    default: Date.now,
  },  
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});   

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
