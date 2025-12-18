import React, { useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';


const JobDescription = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;
    const {User} = useSelector(store=>store.auth);
    console.log(User);
    const {singleJob} = useSelector(store=>store.job);
    console.log(singleJob);
    const user = User;

    const isApplied = singleJob?.applications?.some(app => app.applicant === user?.id);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                const updatedJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Error applying to job');
        }
    };
    
    useEffect(()=>{
        const fetchSingleJob = async()=>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`);
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    },[jobId,dispatch,user?._id]);


    return (
        <>
        <Navbar />
        <div className='max-w-4xl lg:mx-auto my-10 mx-8'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h1 className='text-xl font-bold'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4 '>
                        <Badge variant='ghost' className='text-blue-700 font-bold '>{singleJob?.position}</Badge>
                        <Badge variant='ghost' className='text-red-600 font-bold'>{singleJob?.jobType}</Badge>
                        <Badge variant='ghost' className='text-[#6A38C2] font-bold'>{singleJob?.salary}</Badge>
                    </div>
                </div>
                <Button 
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied} 
                className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-800 hover:bg-lime-500'}`} >
                {isApplied ? 'Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className='border-b-2 border-b-gray-400 py-4 my-4 font-medium'>Job Description</h1>

            <div className='my-4'>
                <h1 className='font-bold my-1.5'>Role: <span className='pl-2 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1.5'>Location: <span className='pl-2 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1.5'>Description: <span className='pl-2 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1.5'>Experience: <span className='pl-2 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
                <h1 className='font-bold my-1.5'>Salary: <span className='pl-2 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1.5'>Total Applicants: <span className='pl-2 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1.5'>Posted Date: <span className='pl-2 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
        </>
    )
}

export default JobDescription;