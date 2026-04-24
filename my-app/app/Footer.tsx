import React from 'react'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className='bg-yellow-100 text-black p-6 text-center'>
            <h2>© {year} TaskQueue | All rights are reserved </h2>
        </div>
    )
}

export default Footer