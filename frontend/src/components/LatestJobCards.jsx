// import { Badge } from 'lucide-react'
import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate(`/description/${job._id}`)} className='rounded-md shadow-lg p-5 border bg-white border-gray-100 cursor-pointer'>
            <div className=''>
                <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div className='my-2'>
                <h1 className='pb-2 font-bold '>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 '>
                <Badge variant='ghost' className='text-blue-700 font-bold '>{job?.position}</Badge>
                <Badge variant='ghost' className='text-red-600 font-bold'>{job?.jobType}</Badge>
                <Badge variant='ghost' className='text-[#6A38C2] font-bold'>{job?.salary}</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
