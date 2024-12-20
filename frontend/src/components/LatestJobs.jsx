import React from 'react'
import LatestJobCards from './LatestJobCards'

const randomJob = [1, 2, 3, 4, 5, 6, 7]

const LatestJobs = () => {
    return (
        <div className=' max-w-[90%] mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Jop Openings</h1>
            <div className='grid grid-cols-3 gap-3 my-5'>
                {
                    randomJob.map((item, index) => <LatestJobCards />)
                }
            </div>
        </div>
    )
}

export default LatestJobs