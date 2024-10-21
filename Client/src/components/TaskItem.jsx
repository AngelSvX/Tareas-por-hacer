import React, { useRef } from "react";
import { Button } from "@nextui-org/react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useTaskContext } from "../provider/TaskProvider";
import { ScrollShadow } from "@nextui-org/react";

function TaskItem() {
  const { taskList, getTask, taskEdit, deleteTask } = useTaskContext();

  getTask();

  return (
    <ScrollShadow size={25} className="w-auto h-[400px]">
      {taskList.map((task, key) => (
        <div
          key={key}
          className="w-full h-16 mt-2 border-b-3 border-slate-600 border-opacity-80 flex flex-row bg-white bg-opacity-10 hover:bg-slate-500 hover:bg-opacity-30 hover:border-slate-400 transition-all duration-700 ease-soft-spring"
        >
          <div className="bg-opacity-40 w-5/6 h-full flex items-center justify-start pl-3 overflow-hidden whitespace-pre-wrap">
            <p className="w-full h-full flex items-center font-medium text-slate-300 text-md">{task.tareas}</p>
          </div>

          <div className="w-2/6 h-full flex items-center justify-around md:w-2/6 sm:w-2/6 xl:w-1/6 lg:w-1/6 ">
            <button>
              <FaEdit
                className="hover:scale-125 transition-all duration-300 ease-linear"
                size={"1.5em"}
                color="#ABD6E9"
                onClick={() =>{
                  taskEdit(task)
                }}
              />
            </button>
            <button>
              <FaTrashAlt
                className="hover:scale-125 transition-all duration-300 ease-linear"
                size={"1.4em"}
                color="#EA7F76"
                onClick={() =>{
                  deleteTask(task.id)
                }}
              />
            </button>
          </div>
        </div>
      ))}
    </ScrollShadow>
  );
}

export default TaskItem;
