"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const router = useRouter();
  return (
    <div className=' flex justify-between bg-yellow-100 p-8 text-black' >
      <div className=' font-bold text-3xl cursor-pointer'><h1 onClick={() => { router.push("/") }} >TaskQueue</h1></div>
      <div className='p-2 font-bold text-center pl-10 '><button onClick={() => { router.push("/profile") }} className=' cursor-pointer'>P<span className='hover:underline underline-offset-6 decoration-3'>rofil</span>e</button></div>
    </div>
  )
}

export default Navbar