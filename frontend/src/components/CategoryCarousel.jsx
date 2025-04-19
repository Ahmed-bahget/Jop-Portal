import React, { useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
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

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  }


  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <Badge className="mb-3 bg-[#f0f1ff] text-[#464ab7] hover:bg-[#e8eaff]">
            Explore Categories
          </Badge>
          <h2 className="text-2xl font-bold text-gray-900">Browse Jobs By Category</h2>
          <p className="text-gray-500 mt-2">Find your perfect role in these specialized fields</p>
        </div>
        <div>
          <Carousel className='w-full max-w-4xl mx-auto '>
            <CarouselContent className="p-4 ">
              {
                category.map((cat, index) => (
                  <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 p-1'>
                    <Button
                      onClick={() => searchJobHandler(cat)}
                      variant='outline'
                      className='w-full h-full flex items-center rounded-full justify-center gap-2 py-3 text-gray-700 hover:text-[#464ab7] hover:border-[#464ab7] transition-all'>
                      {cat}
                    </Button>
                  </CarouselItem>
                ))
              }
            </CarouselContent>
            <div className="flex justify-center mt-4 gap-2">
            <CarouselPrevious className="relative rounded-full" />
            <CarouselNext className="relative rounded-full" />
          </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default CategoryCarousel
