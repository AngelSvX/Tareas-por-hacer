import React from "react";
import FormTask from "./FormTask";
import TaskItem from "./TaskItem";

function TaskList() {
  return (
    <div className="flex flex-col bg-slate-950 w-full h-screen items-center justify-center">
      <div className="w-2/3 h-3/4  flex flex-col">
        <div>
          <FormTask />
        </div>
        <div className="bg-slate-900 bg-opacity-30 w-full h-full mt-6 flex justify-start rounded-lg border-5 border-white border-opacity-10 flex-col">
          <TaskItem/>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
