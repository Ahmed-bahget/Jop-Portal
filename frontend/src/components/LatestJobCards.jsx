// import { Badge } from 'lucide-react'
import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = () => {
    return (
        <div className='rounded-md shadow-lg p-5 border bg-white border-gray-100 cursor-pointer'>
            <div className=''>
                <h1 className='text-lg font-medium'>Google</h1>
                <p className='text-sm text-gray-500'>Egypt</p>
            </div>
            <div className='my-2'>
                <h1 className='pb-2 font-bold '>Job Title</h1>
                <p className='text-sm text-gray-600'>Description</p>
            </div>
            <div className='flex items-center gap-2 mt-4 '>
                <Badge variant='ghost' className='text-blue-700 font-bold '>12 position</Badge>
                <Badge variant='ghost' className='text-red-600 font-bold'>full time</Badge>
                <Badge variant='ghost' className='text-[#6A38C2] font-bold'>salary</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
