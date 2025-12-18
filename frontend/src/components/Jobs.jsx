import React, { useState, useEffect } from 'react'
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
  const [filteredJobs, setFilteredJobs] = useState([]);

  useGetAllJobs();

  useEffect(() => {
    if (!allJobs || allJobs.length === 0) {
      setFilteredJobs([]);
      return;
    }

    if (!locationFilter && !industryFilter && !salaryFilter) {
      setFilteredJobs(allJobs);
      return;
    }

    let filtered = [...allJobs];

    if (locationFilter) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (industryFilter) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(industryFilter.toLowerCase()) ||
        job.description.toLowerCase().includes(industryFilter.toLowerCase())
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

    setFilteredJobs(filtered);
  }, [allJobs, locationFilter, industryFilter, salaryFilter]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5 flex flex-wrap gap-5'>
        <div className='w-full sm:hidden mb-4'>
          <Button 
            onClick={toggleFilters} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className={`w-full sm:w-1/4 ${showFilters ? 'block' : 'hidden'} sm:block`}>
          <FilterCard />
        </div>

        {
          !allJobs ? (
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className='rounded-lg shadow-md p-5 border border-gray-100 bg-white h-48 animate-pulse'></div>
                ))}
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <span>No jobs found matching your filters</span>
          ) : (
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                  filteredJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
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
      </div>
    </div>
  )
}

export default Jobs