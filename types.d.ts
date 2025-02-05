import { Connection } from "mongoose";

declare global {
  var mongoose: { // eslint-disable-line no-var
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

export interface TaskParams {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}


export {};
