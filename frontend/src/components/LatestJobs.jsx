import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Skeleton } from './ui/skeleton'


const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    let jobs = allJobs;
    const renderJobCards = () => {
        if (!jobs) {
            return Array(6).fill(0).map((_, idx) => (
                <JobCardSkeleton key={idx} />
            ))
        }

        if (!jobs || jobs.length === 0) {
            return (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12">
                    <h3 className="text-xl font-medium text-gray-700">No jobs available</h3>
                    <p className="text-gray-500 mt-2">Check back later for new opportunities</p>
                </div>
            )
        }

        return jobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
        ))
    }
    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h2 className='text-3xl sm:text-4xl font-bold'>
                        <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
                    </h2>
                    <p className="text-gray-600 mt-3">Explore the most recent opportunities from top companies</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {renderJobCards()}
                </div>

                <div className="text-center mt-12">
                    <Link to="/browse">
                        <Button variant="outline" className="gap-2 border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white">
                            View All Jobs
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

const JobCardSkeleton = () => (
    <div className='rounded-md shadow-lg p-5 border bg-white border-gray-100'>
        <div className='mb-4'>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
        </div>
        <div className='my-2'>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6" />
        </div>
        <div className='flex gap-2 mt-4'>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-24" />
        </div>
    </div>
)


export default LatestJobs