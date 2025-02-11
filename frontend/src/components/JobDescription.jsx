import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

const JobDescription = () => {
    const isAplied = true;
    return (
        <div className='max-w-4xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h1 className='text-xl font-bold'>Fullstack developer</h1>
                    <div className='flex items-center gap-2 mt-4 '>
                        <Badge variant='ghost' className='text-blue-700 font-bold '>12 position</Badge>
                        <Badge variant='ghost' className='text-red-600 font-bold'>Full Time</Badge>
                        <Badge variant='ghost' className='text-[#6A38C2] font-bold'>1200$</Badge>
                    </div>
                </div>
                <Button 
                disabled={isAplied} 
                className={`rounded-lg ${isAplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-800 hover:bg-lime-500'}`} >
                {isAplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className='border-b-2 border-b-gray-400 py-4 my-4 font-medium'>Job Description</h1>

            <div className='my-4'>
                <h1 className='font-bold my-1.5'>Role: <span className='pl-4 font-normal text-gray-800'>Fullstack developer</span></h1>
                <h1 className='font-bold my-1.5'>Location: <span className='pl-4 font-normal text-gray-800'>Egypt</span></h1>
                <h1 className='font-bold my-1.5'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio error impedit id.</span></h1>
                <h1 className='font-bold my-1.5'>Experience: <span className='pl-4 font-normal text-gray-800'>3</span></h1>
                <h1 className='font-bold my-1.5'>Salary: <span className='pl-4 font-normal text-gray-800'>1000$</span></h1>
                <h1 className='font-bold my-1.5'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>5</span></h1>
                <h1 className='font-bold my-1.5'>Posted Date: <span className='pl-4 font-normal text-gray-800'>Fullstack developer</span></h1>
            </div>
        </div>
    )
}

export default JobDescription