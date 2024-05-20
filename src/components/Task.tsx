/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineDone } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { FaInfoCircle } from 'react-icons/fa'
import { FaClockRotateLeft } from "react-icons/fa6";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Task = ({ task, onEditTask, onDeleteTask, onToggleCompleted, isCompleted, provided, index }) => {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCancel = () => {
    setEditing(false)
    setTitle(task.title)
  }

  const handleDone = () => {
    if (title.trim()) {
      onEditTask(task.id, title.trim())
      setEditing(false)
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()
    onDeleteTask(task.id)
  }

  const handleToggleCompleted = () => {
    onToggleCompleted(task.id)
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }



  return (
    <Draggable draggableId={task?.id?.toString()} index={index}>
      {provided => (
        <ul key={index} className='list-group list-group-horizontal rounded-0'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <li className='list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent'>
            <div className='form-check'>
              <input
                className='form-check-input me-0'
                type='checkbox'
                id='flexCheckChecked1'
                aria-label='...'
                checked={isCompleted}
                onChange={handleToggleCompleted}
              />
            </div>
          </li>
          <li className='list-group-item py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent'>
            {editing ? (
              <form onSubmit={handleDone} className=' flex items-center justify-between p-1 w-full'>
                <div className="input-group mb-3">
                  <input value={title} onChange={handleChange} type="text" className="form-control" placeholder="title..." aria-label="title..." aria-describedby="basic-addon2" />
                  <span className="input-group-text" id="basic-addon2">
                    <button className="btn btn-success" type='submit'>
                      <MdOutlineDone size={20} className=' hover:text-green-400 text-gray-500' />
                    </button>
                    <button type='button' className="btn btn-danger ms-4" onClick={handleCancel}>
                      <RxCross2 size={20} className=' text-gray-500 hover:text-orange-400' />
                    </button>
                  </span>
                </div>
              </form>
            ) :
              <p className={`${isCompleted ? 'text-decoration-line-through' : ''} lead fw-normal mb-0`}>{task.title}</p>}
          </li>
          <li className='list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent'>
            <div className='py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light'>
              <p className='small mb-0'>
                <a className='' href='#!' data-mdb-toggle='tooltip' title='Due on date'>
                  <FaClockRotateLeft className='me-3' />
                </a>
                28th Jun 2020
              </p>
            </div>
          </li>
          <li className='list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent'>
            <div className='d-flex flex-row justify-content-end mb-1'>
              <a href='#!' className='text-info' data-mdb-toggle='tooltip' title='Edit todo'>
                <CiEdit onClick={handleEdit} size={20} className=' text-gray-500 hover:text-yellow-500' />
              </a>
              <a href='#!' className='text-danger' data-mdb-toggle='tooltip' title='Delete todo'>
                <AiOutlineDelete onClick={handleDelete} size={18} className=' text-gray-500 hover:text-red-500' />
              </a>
            </div>
            <div className='text-end text-muted'>
              <a href='#!' className='text-muted' data-mdb-toggle='tooltip' title='Created date'>
                <p className='small mb-0'>
                  <FaInfoCircle />28th Jun 2020
                </p>
              </a>
            </div>
          </li>
        </ul>)}
    </Draggable>
  )
}

export default Task
