"use client"
import React from 'react'

const Home = () => {
  return (
    <div className='flex justify-center bg-transparent mt-20 mb-20 text-black' >
      <div className='bg-yellow-100 w-2/6 min-h-90.5 max-h-full border-black rounded-2xl'>

        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
          }} >
            <div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home;