import CreateTaskPopover from "@/components/CreateTaskPopover";

import TaskContainer from "@/components/TaskContainer";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex items-center justify-end px-4 py-2">
        <CreateTaskPopover />
      </div>
     
        <TaskContainer />
      
    </div>
  );
};

export default page;
