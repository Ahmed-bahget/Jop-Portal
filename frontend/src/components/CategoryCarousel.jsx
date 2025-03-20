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
  "Data Science",
  "Graphic Designier",
]



const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {searchedQuery} = useSelector(store=> store.job);

  const searchJobHandler = (query)=>{
      dispatch(setSearchedQuery(query));
      navigate('/browse');
  }

  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20'>
        <CarouselContent>
          {
            category.map((cat, index) => (
              <CarouselItem key={index} className='md:basis-1/2  lg:basis-1/3'>
                <Button onClick={()=> searchJobHandler(cat)} variant='outline' className='rounded-full '>{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious></CarouselPrevious>
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
