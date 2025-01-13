import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
    
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center min-h-screen justify-center gap-2'>
            <div className='text-4xl font-semibold text-red-400'> 404 Error </div>
            <div className='text-red-400'> Page not Exist </div>
            <button onClick={() => navigate(-1)} className="btn btn-active btn-ghost">Go Back </button>
        </div>
    )
}

export default ErrorPage
