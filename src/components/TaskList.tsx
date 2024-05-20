/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Task from './Task'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const TaskList = ({ tasks, onEditTask, onDeleteTask, onToggleCompleted, completedTodos }) => {
  const reversedTasks = tasks.slice().reverse()

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const quotes = reorder(tasks, result.source.index, result.destination.index)
    onToggleCompleted(quotes)
    // setState({ quotes });
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='task-list'>
        {(provided) => (
          <div className=' ' ref={provided.innerRef} {...provided.droppableProps}>
            {reversedTasks.map((todo, index) => {
              const isComplete = completedTodos.includes(todo.id)
              return (
                <Task
                  index={index}
                  provided={provided}
                  isCompleted={isComplete}
                  key={todo.id}
                  task={todo}
                  onEditTask={onEditTask}
                  onDeleteTask={onDeleteTask}
                  onToggleCompleted={onToggleCompleted}
                />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

    // <ul className=" ">
    //   {reversedTasks.map((todo) => {
    //     const isComplete = completedTodos.includes(todo.id)
    //     return (
    //       <Task
    //         isCompleted={isComplete}
    //         key={todo.id}
    //         task={todo}
    //         onEditTask={onEditTask}
    //         onDeleteTask={onDeleteTask}
    //         onToggleCompleted={onToggleCompleted}
    //       />
    //     )
    //   })}
    // </ul>
  )
}

export default TaskList
