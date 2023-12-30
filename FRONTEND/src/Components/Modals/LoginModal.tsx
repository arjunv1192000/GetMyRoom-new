import React from 'react'
import Login from './Login'

const LoginModal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 ">
      <div className="bg-white w-[800px] h-auto border-gray-200 shadow-lg rounded-lg flex flex-row overflow-hidden">
        <Login onClose={onClose} />
      </div>
    </div>
  )
}

export default LoginModal