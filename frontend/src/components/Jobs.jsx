import React, { useState, useEffect, useMemo } from 'react'
import FilterCard from './FilterCard'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Button } from './ui/button';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
  const { allJobs, locationFilter, industryFilter, salaryFilter } = useSelector(store => store.job);
  const [showFilters, setShowFilters] = useState(false);

  useGetAllJobs();

  const filteredJobs = useMemo(() => {
    if (!allJobs || allJobs.length === 0) {
      return [];
    }

    if (!locationFilter && !industryFilter && !salaryFilter) {
      return allJobs;
    }

    let filtered = [...allJobs];

    if (locationFilter) {
      filtered = filtered.filter(job => 
        job.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (industryFilter) {
      filtered = filtered.filter(job => 
        job.title?.toLowerCase().includes(industryFilter.toLowerCase()) ||
        job.description?.toLowerCase().includes(industryFilter.toLowerCase())
      );
    }

    if (salaryFilter) {
      if (salaryFilter.includes("-")) {
        const [min, max] = salaryFilter.split("-").map(Number);
        filtered = filtered.filter(job => job.salary >= min && job.salary <= max);
      } else if (salaryFilter.startsWith(">")) {
        const min = parseInt(salaryFilter.substring(1));
        filtered = filtered.filter(job => job.salary >= min);
      } else {
        const max = parseInt(salaryFilter);
        filtered = filtered.filter(job => job.salary <= max);
      }
    }

    return filtered;
  }, [allJobs, locationFilter, industryFilter, salaryFilter]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6'>
        <div className='mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>Find Your Dream Job</h1>
          <p className='text-gray-600 mt-1'>
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
          </p>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='lg:hidden'>
            <Button 
              onClick={toggleFilters} 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          <aside className={`lg:w-72 xl:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className='lg:sticky lg:top-6'>
              <FilterCard />
            </div>
          </aside>

          <main className='flex-1 min-w-0'>
            {
              !allJobs ? (
                <div className='h-[calc(100vh-200px)] overflow-y-auto'>
                  <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className='rounded-lg shadow-sm p-5 border border-gray-200 bg-white h-48 animate-pulse'></div>
                    ))}
                  </div>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-[calc(100vh-200px)] bg-white rounded-lg border border-gray-200'>
                  <div className='text-center px-4'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>No jobs found</h3>
                    <p className='text-gray-600'>Try adjusting your filters to find more opportunities</p>
                  </div>
                </div>
              ) : (
                <div className='h-[calc(100vh-200px)] overflow-y-auto pr-2'>
                  <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {
                      filteredJobs.map((job) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          key={job?._id}
                        >
                          <Job job={job} />
                        </motion.div>)
                      )}
                  </div>
                </div>
              )
            }
          </main>
        </div>
      </div>
    </div>
  )
}

export default Jobs