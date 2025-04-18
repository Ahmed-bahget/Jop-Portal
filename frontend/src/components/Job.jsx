// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Bookmark } from 'lucide-react'
// import { Badge } from './ui/badge'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { APPLICATION_API_END_POINT } from '@/utils/constant'
// import { setSingleJob } from '@/redux/jobSlice'
// import { toast } from 'sonner'


// const Job = ({ job }) => {
//     const navigate = useNavigate();

//     const daysAgoFunction = (mongodbTime) => {
//         const createdAt = new Date(mongodbTime);
//         const currentTime = new Date();
//         const TimeDifference = currentTime - createdAt;
//         return Math.floor(TimeDifference / (1000 * 24 * 60 * 60))
//     }

//     const dispatch = useDispatch();
//     const jobId = job._id;
//     const {User} = useSelector(store=>store.auth);
//     const {singleJob} = useSelector(store=>store.job);
//     const user = User;
//     const isIntiallyApplied = job?.applications?.some(application => application.applicant === user?.id) || false;
//     const [isApplied , setIsApplied] = useState(isIntiallyApplied);
//     const applyJobHandler = async () => {
//         try {
//             const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
//             if (res.data.success) {
//                 setIsApplied(true);
//                 const updatedJob = { ...job, applications: [...job.applications, { applicant: user?._id }] };
//                 dispatch(setSingleJob(updatedJob));
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data?.message || "Something went wrong");
//         }
//     };

//     return (
//         <div className='ml-5  border border-gray-100 rounded-md p-4 shadow-xl bg-white'>
//             <div className='flex items-center justify-between'>
//                 <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
//                 <Button variant='outline' className='rounded-full' size='icon'> <Bookmark /> </Button>
//             </div>
//             <div className='flex items-center gap-2 my-2'>
//                 <Button variant='outline' className='p-6' size='icon'>
//                     <Avatar>
//                         <AvatarImage src={job?.company?.logo} />
//                     </Avatar>
//                 </Button>
//                 <div>
//                     <h1 className='text-lg '>{job?.company?.name}</h1>
//                     <p className='text-gray-400 text-sm'>{job?.location}</p>
//                 </div>  
//             </div>
//             <div className='my-3'>
//                 <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
//                 <p className='text-sm text-gray-600'>{job?.description}</p>
//             </div>
//             <div className='flex items-center gap-2 mt-4 '>
//                 <Badge variant='ghost' className='text-blue-700 font-bold '>{job?.position}</Badge>
//                 <Badge variant='ghost' className='text-red-600 font-bold'>{job?.jobType}</Badge>
//                 <Badge variant='ghost' className='text-[#6A38C2] font-bold'>{job?.salary}</Badge>
//             </div>
//             <div className='flex items-center gap-4 mt-4'>
//                 <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline' className=''>Details</Button>
//                 {/* <Button
//                     onClick={isApplied ? null : applyJobHandler}
//                     disabled={isApplied}
//                     className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-800 hover:bg-lime-500'}`} >
//                     {isApplied ? 'Applied' : 'Apply Now'}
//                 </Button> */}
//                 {/* <Button  className='bg-[#6A38C2]'>Save For Later</Button> */}
//             </div>
//         </div>
//     )
// }

// export default Job


import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { MapPin, Building, Clock, DollarSign, Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const Job = ({ job }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { User } = useSelector(store => store.auth)
    const jobId = job._id

    const isInitiallyApplied = (job?.applications || []).some(app => app.applicant === User._id);
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true
            })

            if (res.data.success) {
                const updatedJob = {
                    ...job,
                    applications: [...job.applications, { applicant: User?._id }]
                }
                setIsApplied(true)
                dispatch(setSingleJob(updatedJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }
    useEffect(() => {
        setIsApplied((job?.applications || []).some(app => app.applicant === User?._id));
    }, [job?.applications, User?._id]);


    const handleCardClick = () => {
        navigate(`/description/${job._id}`)
    }

    const getBadgeStyle = (type) => {
        switch (type?.toLowerCase()) {
            case 'full-time':
                return 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            case 'part-time':
                return 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            case 'contract':
                return 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            case 'freelance':
                return 'bg-green-50 text-green-700 hover:bg-green-100'
            case 'remote':
                return 'bg-teal-50 text-teal-700 hover:bg-teal-100'
            default:
                return ''
        }
    }
    console.log(` ${job?.applications} ++++ ${User?._id} +++++  ${job.title} ++++ ${isApplied}`);

    return (
        <div
            className='rounded-lg shadow-md p-5 border border-gray-100 bg-white cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-[#6A38C2]/30 h-full flex flex-col'
        >
            <div className='flex items-start justify-between mb-3'>
                <div className='flex gap-3'>
                    {job?.company?.logo ? (
                        <img
                            src={job.company.logo}
                            alt={job.company.name}
                            className="w-10 h-10 object-contain rounded-md border border-gray-100"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-md bg-[#f0f1ff] flex items-center justify-center text-[#464ab7] font-bold">
                            {job.company?.name?.charAt(0) || 'C'}
                        </div>
                    )}
                    <div>
                        <h3 className='font-medium line-clamp-1'>{job?.company?.name}</h3>
                        <div className='flex items-center text-sm text-gray-500'>
                            <MapPin className='w-3 h-3 mr-1 inline-block' />
                            <span className='line-clamp-1'>{job?.location}</span>
                        </div>
                    </div>
                </div>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark className="w-4 h-4" />
                </Button>
            </div>

            <div className='flex-1' onClick={handleCardClick}>
                <h2 className='text-lg font-bold mb-2 text-gray-900'>{job?.title}</h2>
                <p className='text-sm text-gray-600 line-clamp-2 mb-3'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap gap-2 mt-3'>
                <Badge variant='outline' className={cn('font-medium', getBadgeStyle(job?.jobType))}>
                    <Clock className='w-3 h-3 mr-1' />
                    {job?.jobType}
                </Badge>

                <Badge variant='outline' className='font-medium bg-gray-50 text-gray-700 hover:bg-gray-100'>
                    <Building className='w-3 h-3 mr-1' />
                    {job?.position}
                </Badge>

                <Badge variant='outline' className='font-medium bg-[#f0f1ff] text-[#6A38C2] hover:bg-[#e8eaff]'>
                    <DollarSign className='w-3 h-3 mr-1' />
                    {job?.salary}
                </Badge>
            </div>

            <div className='flex items-center gap-3 mt-4'>
                <Button
                    onClick={handleCardClick}
                    variant='outline'
                >
                    View Details
                </Button>

                {/* <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={cn(
                        'rounded-lg',
                        isApplied ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                    )}
                >
                    {isApplied ? 'Applied' : 'Apply Now'}
                </Button> */}
            </div>
        </div>
    )
}

export default Job
