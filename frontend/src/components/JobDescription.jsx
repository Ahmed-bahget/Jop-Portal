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
        <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <div className='p-6 md:p-8'>
                    <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                        <div className='flex-1'>
                            <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-3'>{singleJob?.title}</h1>
                            <div className='flex flex-wrap items-center gap-2 mb-4'>
                                <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-100'>{singleJob?.position} Positions</Badge>
                                <Badge className='bg-red-100 text-red-700 hover:bg-red-100'>{singleJob?.jobType}</Badge>
                                <Badge className='bg-purple-100 text-purple-700 hover:bg-purple-100'>{singleJob?.salary} $</Badge>
                            </div>
                            {singleJob?.company && (
                                <p className='text-gray-600 font-medium'>{singleJob.company.name}</p>
                            )}
                        </div>
                        <Button 
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied} 
                        size='lg'
                        className={`rounded-lg px-8 ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6A38C2] hover:bg-[#5b30a6]'}`} >
                        {isApplied ? 'Applied' : 'Apply Now'}
                        </Button>
                    </div>
                </div>

                <div className='border-t border-gray-200'>
                    <div className='p-6 md:p-8'>
                        <h2 className='text-xl font-semibold text-gray-900 mb-6'>Job Details</h2>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                            <div className='flex items-start gap-3'>
                                <div className='w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0'>
                                    <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Location</p>
                                    <p className='font-medium text-gray-900'>{singleJob?.location}</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0'>
                                    <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Salary</p>
                                    <p className='font-medium text-gray-900'>{singleJob?.salary} $</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0'>
                                    <svg className='w-5 h-5 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Experience</p>
                                    <p className='font-medium text-gray-900'>{singleJob?.experienceLevel} years</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3'>
                                <div className='w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0'>
                                    <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>Applicants</p>
                                    <p className='font-medium text-gray-900'>{singleJob?.applications?.length || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className='mb-8'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-3'>Job Description</h3>
                            <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>{singleJob?.description}</p>
                        </div>

                        <div className='mb-8'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-3'>Requirements</h3>
                            <div className='flex flex-wrap gap-2'>
                                {Array.isArray(singleJob?.requirements) 
                                    ? singleJob.requirements.map((req, idx) => (
                                        <span key={idx} className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'>
                                            {req}
                                        </span>
                                      ))
                                    : typeof singleJob?.requirements === 'string'
                                    ? singleJob.requirements.split(',').map((req, idx) => (
                                        <span key={idx} className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'>
                                            {req.trim()}
                                        </span>
                                      ))
                                    : null
                                }
                            </div>
                        </div>

                        <div className='pt-6 border-t border-gray-200'>
                            <p className='text-sm text-gray-500'>
                                Posted on {singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default JobDescription;