import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import useSearchJobs from '@/hooks/useSearchJobs'

const Browse = () => {
  useSearchJobs();
  const { searchedJobs } = useSelector(store => store.job);
  
  console.log("Browse component - searchedJobs:", searchedJobs);
  
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl m-auto my-10'>
        <h1 className='text-2xl sm:text-3xl font-bold my-6 text-center'>Search Results ({searchedJobs?.length || 0})</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {searchedJobs?.length === 0 ? (
            <p className="text-center col-span-full">No jobs found.</p>
          ) : (
            searchedJobs?.map((job) => <Job key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default Browse;