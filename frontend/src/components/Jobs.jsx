import React from 'react'
import FilterCard from './FilterCard'
import Navbar from './shared/Navbar'
import Job from './Job'

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8]

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className='max-w-[95%] mx-auto mt-5 flex gap-5'>
        <div className='w-[10%]'>
          <FilterCard />
        </div>

        {
          jobsArray.length < 0 ? <span>Job not found</span> :
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
              <div className='grid grid-cols-3 gap-4'>
                {
                  jobsArray.map((jobsArray, index) =>
                    <div>
                      <Job />
                    </div>)
                }
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default Jobs
