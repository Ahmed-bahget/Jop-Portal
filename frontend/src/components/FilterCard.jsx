import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'

const filterData = [
  {
    filterType: "Location",
    array: ["Cairo", "Sharqia", "Alex", "Tanta"]
  },
  {
    filterType: "Industry",
    array: ["Backend", "Frontend", "Fullstack"]
  },
  {
    filterType: "Salary",
    array: ["0-40$", "41-70$", ">100$"]
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  return (
    <div className='flex flex-col gap-6 bg-white p-6 rounded-md w-full sm:w-80 md:w-96 lg:w-[350px] xl:w-[400px]'>
      <div>
        <h1 className='font-bold text-xl mb-4'>Filter Jobs</h1>
        <hr className='my-4' />
        <div>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
              filterData.map((data, index) => (
                <div key={index} className='mb-4'>
                  <h2 className='text-lg font-semibold mb-2'>{data.filterType}</h2>

                  {
                    data.array.map((arr, idx) => {
                      const itemId = `id${index}-${idx}`
                      return (
                        <div key={itemId} className='flex items-center space-x-3'>
                          <RadioGroupItem value={arr} id={itemId} />
                          <Label htmlFor={itemId} className='ml-2 text-sm text-gray-700'>{arr}</Label>
                        </div>
                      )
                    })
                  }
                </div>
              ))
            }
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default FilterCard
