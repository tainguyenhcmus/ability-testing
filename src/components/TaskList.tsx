import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onEditTask, onDeleteTask, onToggleCompleted, completedTodos }) => {
  const reversedTasks = tasks.slice().reverse();
  return (
    <ul className=" ">
      {reversedTasks.map((todo) => {
        const isComplete = completedTodos.includes(todo.id)
        return (
          <Task
            isCompleted={isComplete}
            key={todo.id}
            task={todo}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onToggleCompleted={onToggleCompleted}
          />
        )
      })}
    </ul>
  );
};

export default TaskList;