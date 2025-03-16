import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import {  Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const TimeDifference = currentTime - createdAt;
        return Math.floor(TimeDifference/(1000*24*60*60))
    }

    return (
        <div className='ml-5 border border-gray-100 rounded-md p-4 shadow-xl bg-white'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" :  `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant='outline' className='rounded-full' size='icon'> <Bookmark /> </Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button variant='outline' className='p-6' size='icon'>
                    <Avatar>
                        <AvatarImage src='https://png.pngtree.com/png-vector/20220509/ourmid/pngtree-company-logo-design-trademark-design-creative-logo-png-image_4569380.png' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='text-lg '>{job?.company?.name}</h1>
                    <p className='text-gray-400 text-sm'>{job?.location}</p>
                </div>
            </div>
            <div className='my-3'>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 '>
                <Badge variant='ghost' className='text-blue-700 font-bold '>{job?.position}</Badge>
                <Badge variant='ghost' className='text-red-600 font-bold'>{job?.jobType}</Badge>
                <Badge variant='ghost' className='text-[#6A38C2] font-bold'>{job?.salary}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)} variant='outline' className=''>Details</Button>
                <Button className='bg-[#6A38C2]'>Save For Later</Button>
            </div>
        </div>
    )
}

export default Job
