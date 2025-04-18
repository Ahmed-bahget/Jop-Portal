import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin, Building, Clock, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/description/${job._id}`)
  }

  const getBadgeStyle = (job) => {
    switch (job.toLowerCase()) {
      case 'full-time':
        return 'bg-blue-50 text-blue-700 hover:bg-blue-100'
      case 'part-time':
        return 'bg-amber-50 text-amber-700 hover:bg-amber-100'
      case 'contract':
        return 'bg-purple-50 text-purple-700 hover:bg-purple-100'
      case 'freelance':
        return 'bg-green-50 text-green-700 hover:bg-green-100'
      case 'remote':
        return 'bg-teal-50 text-teal-700 hover:bg-teal-100'
      default:
        return ''
    }
  }

  return (
    <div 
      onClick={handleCardClick}
      className='rounded-lg shadow-md p-5 border border-gray-100 bg-white cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-[#6A38C2]/30 h-full flex flex-col'
    >
      <div className='flex items-start justify-between mb-3'>
        <div className='flex gap-3'>
          {job?.company?.logo ? (
            <img 
              src={job.company.logo} 
              alt={job.company.name} 
              className="w-10 h-10 object-contain rounded-md border border-gray-100"
            />
          ) : (
            <div className="w-10 h-10 rounded-md bg-[#f0f1ff] flex items-center justify-center text-[#464ab7] font-bold">
              {job.company?.name?.charAt(0) || 'C'}
            </div>
          )}
          <div>
            <h3 className='font-medium line-clamp-1'>{job?.company?.name}</h3>
            <div className='flex items-center text-sm text-gray-500'>
              <MapPin className='w-3 h-3 mr-1 inline-block' />
              <span className='line-clamp-1'>{job?.location}</span>
            </div>
          </div>
        </div>

        {job?.posted && (
          <span className='text-xs text-gray-500'>
            Posted {job.posted}
          </span>
        )}
      </div>

      <div className='flex-1'>
        <h2 className='text-lg font-bold mb-2 text-gray-900'>{job?.title}</h2>
        <p className='text-sm text-gray-600 line-clamp-2 mb-3'>{job?.description}</p>
      </div>

      <div className='flex flex-wrap gap-2 mt-3'>
        <Badge variant='outline' className={cn('font-medium', getBadgeStyle(job?.jobType))}>
          <Clock className='w-3 h-3 mr-1' />
          {job?.jobType}
        </Badge>

        <Badge variant='outline' className='font-medium bg-gray-50 text-gray-700 hover:bg-gray-100'>
          <Building className='w-3 h-3 mr-1' />
          {job?.position}
        </Badge>

        <Badge variant='outline' className='font-medium bg-[#f0f1ff] text-[#6A38C2] hover:bg-[#e8eaff]'>
          <DollarSign className='w-3 h-3 mr-1' />
          {job?.salary}
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
