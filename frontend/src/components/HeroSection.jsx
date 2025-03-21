import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedQuery } = useSelector(store => store.job)

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');

  }
  return (
    <div className='text-center '>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#464ab7] font-bold'>No. 1 Job Hunt Website</span>
        <h2 className='text-5xl font-bold '>Search, Apply & <br /> Get Your <span className='text-[#464ab7]'>Dream Jobs</span></h2>
        <p>Here you will find your dream job for sure just search!</p>
      </div>
      <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto '>
        <input
          className='outline-none border-none w-full'
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search For your Job' />

        <Button onClick={searchJobHandler} className='rounded-r-full '>
          <Search className='h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}

export default HeroSection
