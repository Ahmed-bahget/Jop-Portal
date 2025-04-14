import React, { useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
  "Fullstack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Graphic Designer",
  "ASP.NET"
]



const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {searchedQuery, allJobs} = useSelector(store=> store.job);

  const searchJobHandler = (query)=>{
      dispatch(setSearchedQuery(query));
      console.log(`${searchedQuery} +++++++++ ${allJobs}`);
      navigate('/browse');
    }
  

  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20'>
        <CarouselContent className="flex gap-4 ">
          {
            category.map((cat, index) => (
              <CarouselItem key={index} className='flex mx-2 items-center basis-auto sm:basis-1/3 lg:basis-1/4'>
                <Button
                onClick={()=> searchJobHandler(cat)}
                variant='outline' 
                className='rounded-full px-4 py-2 text-sm sm:text-base'>
                {cat}
                </Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex"/>
        <CarouselNext className="hidden sm:flex"/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
