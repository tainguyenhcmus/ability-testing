/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask(title.trim())
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='pb-2'>
        <div className='card'>
          <div className='card-body'>
            <div className='d-flex flex-row align-items-center'>
              <input
                type='text'
                className='form-control form-control-lg'
                id='exampleFormControlInput1'
                placeholder='Add new...'
                value={title}
                onChange={(e) => setTitle(e.target.value)}

              />
              <a href='#!' data-mdb-toggle='tooltip' title='Set due date'>
                <i className='fas fa-calendar-alt fa-lg me-3'></i>
              </a>
              <div>
                <button type='submit' className='btn btn-primary'>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <div
  //       className={` ${darkTheme ? 'bg-gray-800' : 'bg-white'} w-full  flex space-x-2 items-center  rounded-lg px-4`}
  //     >
  //       <CiCirclePlus size={28} className='px-0 text-gray-500' />
  //       <input
  //         className=' bg-transparent w-full h-fit p-1 py-4 text-lg'
  //         type='text'
  //         placeholder='Add a new task...'
  //         value={title}
  //         onChange={(e) => setTitle(e.target.value)}
  //       />
  //       <button className=' px-4 uppercase text-gray-500 primary' type='submit'>
  //         Add
  //       </button>
  //     </div>
  //   </form>
  // )
}

export default AddTaskForm
