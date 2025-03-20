import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'

const filterData = [
  {
    filterType: "location",
    array: ["Cairo", "Sharqia", "Alex", "Tanta"]
  },
  {
    filterType: "industry",
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

  const changeHandler = (value)=>{
    setSelectedValue(value);
  };
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue])

  return (
    <div className='flex flex-col gap-4 bg-white  p-3 w-full rounded-md'>
      <div className=''>
        <h1 className='font-bold text-lg'>Filter Card</h1>
        <hr className='my-3' />
        <div>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
              filterData.map((data, index) => (
                <div>
                  <h1 className='text-lg font-bold'>{data.filterType}</h1>

                  {
                    data.array.map((arr, idx) => {
                      const itemId = `id${index}-${idx}`
                      return(
                      <div className='flex items-center space-x-2 '>
                        <RadioGroupItem value={arr} id={itemId} />
                        <Label htmlFor={itemId} className='ml-1 text-sm text-gray-700'> {arr}</Label>
                      </div>
                    )})
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