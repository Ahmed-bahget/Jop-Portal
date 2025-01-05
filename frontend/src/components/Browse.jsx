import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'

const randomJobs = [1,2,3]


const Browse = () => {
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl m-auto my-10'>  
            <h1 className='text-xl font-bold my-10'>Search Results ({randomJobs.length})</h1>
            <div className='grid grid-cols-3 gap-4'>
            {
                randomJobs.map((items, index)=>{
                    return(
                        <Job/>
                    )
                })
            }
            </div>
        </div>
    </div>
  )
}

export default Browse