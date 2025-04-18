import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const Browse = () => {

    useGetAllJobs();
    const dispatch = useDispatch();
    const { allJobs,searchedQuery } = useSelector(store => store.job);
    useEffect(()=>{
        if(searchedQuery){
            dispatch(setSearchedQuery(""))
        }
    },[allJobs,dispatch])

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl m-auto my-10'>
                <h1 className='text-2xl sm:text-3xl font-bold my-6 text-center'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {allJobs?.length === 0 ? (
                        <p className="text-center col-span-full">No jobs found.</p>
                    ) : (
                        allJobs?.map((job) => <Job key={job._id} job={job} />)
                    )}
                </div>
            </div>
        </div>
    )
}

export default Browse;