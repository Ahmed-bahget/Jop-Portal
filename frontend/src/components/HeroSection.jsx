import React, { useState, useCallback } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');

  }
  const handleSearchChange = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      searchJobHandler()
    }
  }, [searchJobHandler])

  return (
    <section className='bg-gradient-to-b from-white to-slate-50 py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 text-center'>
        <div className='flex flex-col gap-5 mb-10'>
          <span className='mx-auto px-4 py-2 rounded-full bg-[#f0f1ff] text-[#464ab7] font-bold inline-block animate-fade-in'>
            No. 1 Job Hunt Website
          </span>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            Search, Apply & <br className='md:hidden' /> 
            Get Your <span className='text-[#464ab7] relative'>
              Dream Jobs
              <span className='absolute bottom-0 left-0 w-full h-[5px] bg-[#464ab7]/20 rounded'></span>
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Find the perfect job that matches your skills and career goals. Thousands of opportunities await!
          </p>
        </div>

        <div className='relative w-full sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-3xl mx-auto'>
          <div className='flex shadow-lg border border-gray-200 px-4 py-3 rounded-full items-center gap-3 bg-white focus-within:ring-2 focus-within:ring-[#464ab7]/30 transition-all'>
            <Search className='h-5 w-5 text-gray-400' />
            <input
              className='outline-none border-none w-full text-base placeholder:text-gray-400'
              type="text"
              value={query}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder='Search for your dream job...'
              aria-label="Search jobs"
            />
            <Button 
              onClick={searchJobHandler} 
              disabled={!query.trim()}
              className='rounded-full bg-[#464ab7] hover:bg-[#3d059d] transition-all px-5 py-2'
            >
              <span className="hidden sm:inline mr-2">Search</span>
              <Search className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
