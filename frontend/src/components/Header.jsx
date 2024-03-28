import React from 'react'

export default function Header({currentUser, setShowLogin, setShowSignin}) {
  return (
    <div className='bg-transparent w-full h-auto flex justify-between fixed px-10 py-3'>
        <div className='font-montserrat text-4xl text-white font-semibold capitalize'>
            {currentUser}    
        </div>
          {currentUser ? (
            <div className='flex gap-3'>
                <button className='w-auto h-auto px-10 py-2 rounded-lg bg-orange-600 font-montserrat text-white font-semibold'>Log Out</button>      
            </div>
          ): (
            <div className='flex gap-3'>
                <button onClick={() => setShowLogin(true)} className='w-auto h-auto px-10 py-2 rounded-lg bg-orange-600 font-montserrat text-white font-semibold'>Log In</button>     
                <button onClick={() => setShowSignin(true)} className='w-auto h-auto px-10 py-2 rounded-lg bg-indigo-600 font-montserrat text-white font-semibold'>Sign In</button>       
            </div>
          )}

    </div>
  )
}
