import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import useSearchJobs from '@/hooks/useSearchJobs'
import { Search } from 'lucide-react'

const Browse = () => {
  useSearchJobs();
  const { searchedJobs, searchedQuery } = useSelector(store => store.job);
  
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>Search Results</h1>
          {searchedQuery ? (
            <p className='text-gray-600'>
              Showing results for "<span className='font-medium text-gray-900'>{searchedQuery}</span>" 
              <span className='ml-2 text-gray-500'>({searchedJobs?.length || 0} jobs)</span>
            </p>
          ) : (
            <p className='text-gray-600'>
              {searchedJobs?.length || 0} {searchedJobs?.length === 1 ? 'job' : 'jobs'} found
            </p>
          )}
        </div>
        
        {searchedJobs?.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <Search className='w-8 h-8 text-gray-400' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>No jobs found</h3>
            <p className='text-gray-600 text-center max-w-md'>
              Try adjusting your search criteria or browse all available jobs
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {searchedJobs?.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse;