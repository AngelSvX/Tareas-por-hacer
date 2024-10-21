import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useTaskContext } from "../provider/TaskProvider";
import Swal from "sweetalert2";

function FormTask() {
  const {
    setTask,
    addTask,
    task,
    edit,
    setEdit,
    updateTask,
    limitLetters,
    setLimitLetters,
  } = useTaskContext();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full h-auto flex flex-col items-center">
        <Input
          classNames={{
            description: "text-slate-400",
            label: "font-semibold text-lg ",
            input: "font-semibold text-md",
            inputWrapper:
              "hover:bg-white hover:bg-opacity-10 hover:border-gray-500",
          }}
          value={task}
          size="lg"
          type="text"
          label="Nueva Tarea"
          labelPlacement="outside"
          color="default"
          description="¿Qué hay de nuevo?"
          variant="underlined"
          maxLength={50}
          onChange={(e) => {
            const lettersInput = e.target.value;
            setTask(lettersInput);
            setLimitLetters(lettersInput.length);
          }}
          endContent={
            limitLetters === 50 ? (
              <p className="font-bold text-md text-red-400 text-opacity-100">
                {limitLetters}/50
              </p>

            ) : (
              <p className="font-bold text-md text-slate-400 text-opacity-100">
                {limitLetters}/50
              </p>
            )
          }
        />

        {edit ? (
          <div className="w-full flex items-center justify-evenly">
            <Button
              className="mt-4 font-semibold text-md"
              variant="ghost"
              color="primary"
              size="lg"
              radius="sm"
              onClick={() => {
                updateTask();
                setEdit(false);
                setTask("");
                Swal.fire({
                  title: "Completado!",
                  text: "Tarea actualizada exitosamente",
                  icon: "success",
                  confirmButtonText: "Bien!",
                  timer: 3000,
                })
              }}
            >
              Actualizar
            </Button>
            <Button
              className="mt-4 font-semibold text-md"
              variant="ghost"
              color="danger"
              size="lg"
              radius="sm"
              onClick={() => {
                setEdit(false);
                setTask("");
                setLimitLetters(0)
              }}
            >
              Cancelar
            </Button>
          </div>
        ) : (
          <Button
            className="mt-4 font-semibold text-md"
            variant="ghost"
            color="success"
            size="lg"
            radius="sm"
            onClick={() => {
              addTask();
              Swal.fire({
                title: "Completado!",
                text: "Tarea guardada exitosamente",
                icon: "success",
                confirmButtonText: "Bien!",
                timer: 3000,
              });
            }}
          >
            Agregar
          </Button>
        )}
      </div>
    </div>
  );
}

export default FormTask;
