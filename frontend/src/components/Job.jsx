import React, { useState } from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'


const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const TimeDifference = currentTime - createdAt;
        return Math.floor(TimeDifference / (1000 * 24 * 60 * 60))
    }

    const dispatch = useDispatch();
    const jobId = job._id;
    const {User} = useSelector(store=>store.auth);
    const {singleJob} = useSelector(store=>store.job);
    const user = User;
    const isIntiallyApplied = job?.applications?.some(application => application.applicant === user?.id) || false;
    const [isApplied , setIsApplied] = useState(isIntiallyApplied);
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedJob = { ...job, applications: [...job.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className='ml-5  border border-gray-100 rounded-md p-4 shadow-xl bg-white'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant='outline' className='rounded-full' size='icon'> <Bookmark /> </Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button variant='outline' className='p-6' size='icon'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
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
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline' className=''>Details</Button>
                {/* <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-800 hover:bg-lime-500'}`} >
                    {isApplied ? 'Applied' : 'Apply Now'}
                </Button> */}
                {/* <Button  className='bg-[#6A38C2]'>Save For Later</Button> */}
            </div>
        </div>
    )
}

export default Job
