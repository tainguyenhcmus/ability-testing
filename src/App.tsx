/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import './scss/styles.scss';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { Todo } from './tytpe'
import { getTodos, addTodo, updateTodo, deleteTodo, getCompletedTodos, addCompleted, clearLocalStorage, removeAll } from './api';
function App() {
  const { data: lists, mutate } = useSWR<Todo[]>('/api/todos', getTodos);
  const { data: completedTodos, mutate: mutateCompleted } = useSWR<number[]>('/api/completed', getCompletedTodos);

  const updateCompleted = async (updatedCompletedTodos) => {
    try {
      await mutateCompleted(addCompleted(updatedCompletedTodos), {
        rollbackOnError: true,
        populateCache: true,
        revalidate: false
      })
      toast.success('Successfully updated.')
    } catch (e) {
      toast.error('Failed to updated.')
    }
  }

  const handleAddTodo = async (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    }
    console.log("🚀 ~ file: App.tsx:41 ~ handleAddTodo ~ lists:", lists)

    try {
      await mutate(addTodo(newTodo), {
        optimisticData: lists ? [...lists, newTodo] : [newTodo],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false
      })
      toast.success('Successfully added the new item.')
    } catch (e) {
      toast.error('Failed to add the new item.')
    }
  }

  const handleToggleCompletion = (todoId: number) => {
    const updatedCompletedTodos = completedTodos.includes(todoId)
      ? (
        completedTodos.filter((id) => id !== todoId)
      )
      : [...completedTodos, todoId]
    updateCompleted(updatedCompletedTodos)

    // Show toast notification when a checkbox is checked or unchecked
    const todo = lists?.find((item) => item.id === todoId)
    if (todo) {
      const message = completedTodos.includes(todoId)
        ? 'Todo marked as incomplete!'
        : 'Todo marked as completed!'
      toast.success(message, {
        icon: '🎉'
      })
    }
  }


  const handleUpdateTodo = async (todoId: number, newTitle: string) => {
    try {
      const updatedTodo = { ...lists.find((item) => item.id === todoId), title: newTitle }
      await mutate(updateTodo(updatedTodo), {
        optimisticData: lists?.map((item) => (item.id === todoId ? updatedTodo : item)),
        rollbackOnError: true,
        revalidate: false
      })
      toast.success('Successfully updated the item.')
    } catch (e) {
      toast.error('Failed to update the item.')
    }
  }

 
  const handleDeleteTodo = async (todoId: number) => {
    try {
      await mutate(deleteTodo(todoId), {
        optimisticData: lists?.filter((item) => item.id !== todoId),
        rollbackOnError: true,
        revalidate: false
      })
      toast.success('Successfully deleted the item.')
    } catch (e) {
      toast.error('Failed to delete the item.')
    }
  }

  const clearTasks = async () => {
    clearLocalStorage()
    try {
      await mutate(removeAll(), {
        rollbackOnError: true,
        populateCache: true,
        revalidate: false
      })
      toast.success('Successfully added the new item.')
    } catch (e) {
      toast.error('Failed to add the new item.')
    }
  }



  // const getCompletedTasks = () => tasks.filter((task) => task.completed)
  const getRemainingTasks = () => lists?.filter((task) => !task.completed)

  // const toggleTheme = () => {
  //   setDarkTheme((prevTheme) => !prevTheme)
  // }

  return (
    <div className='container'>
      <div
        className={`hero h-screen md:min-h-[700px]  w-full m-auto flex flex-col items-center mt-14 transition-all duration-500`}
      >
        <p className='h1 text-center mt-3 mb-4 pb-3 text-primary'>
          <i className='fas fa-check-square me-1'></i>
          <u>My Todo-s</u>
        </p>
        <div
          className={`flex flex-col space-y-6 w-[600px] md:w-[100%] z-10 p-4 `}
        >
          <div className='mx-auto'>
            <AddTaskForm onAddTask={handleAddTodo} />
          </div>
          <div>
            {/* // filter */}
            <div className='d-flex justify-content-end align-items-center mb-4 pt-2 pb-3'>
              <p className='small mb-0 me-2 text-muted'>Filter</p>
              <select className='select'>
                <option value='1'>All</option>
                <option value='2'>Completed</option>
                <option value='3'>Active</option>
                <option value='4'>Has due date</option>
              </select>
              <p className='small mb-0 ms-4 me-2 text-muted'>Sort</p>
              <select className='select'>
                <option value='1'>Added date</option>
                <option value='2'>Due date</option>
              </select>
              {/* <a href='#!' style='color: #23af89;' data-mdb-toggle='tooltip' title='Ascending'>
                <i className='fas fa-sort-amount-down-alt ms-2'></i>
              </a> */}
            </div>
          </div>
          <div
            className={`scroll w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-md shadow-lg relative transition-all duration-500`}
          >
            <div
              className={`w-full overflow-hidden mb- sticky top-0  flex items-center justify-between text-gray-500 border-b`}
            >
              <p className=' text-gray-500 px-2 py-3'>{getRemainingTasks()?.length} tasks left </p>
              <button type="button" className="btn btn-danger" onClick={clearTasks}>Clear all tasks</button>
            </div>

            {lists?.length ? (
              <TaskList
                completedTodos={completedTodos}
                tasks={lists}
                onEditTask={handleUpdateTodo}
                onDeleteTask={handleDeleteTodo}
                onToggleCompleted={handleToggleCompletion}
              />
            ) : (
              <div className=' w-full h-[80%] flex items-center justify-center overflow-hidden'>
                <p className=' text-gray-500 text-center z-10'>Empty task</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
