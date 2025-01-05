import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

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
  return (
    <div className='flex flex-col gap-4 bg-white  p-3 w-full rounded-md'>
      <div className=''>
        <h1 className='font-bold text-lg'>Filter Card</h1>
        <hr className='my-3' />
        <div>
          <RadioGroup className=''>
            {
              filterData.map((data, index) => (
                <div>
                  <h1 className='text-lg font-bold'>{data.filterType}</h1>

                  {
                    data.array.map((arr, index) => {
                      return(
                      <div className='flex items-center space-x-2 '>
                        <RadioGroupItem value={arr} id={arr} />
                        <Label htmlFor={arr} className='ml-1 text-sm text-gray-700'> {arr}</Label>
                      </div>
                    )})
                  }
                </div>
              ))
            }
            {/* <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div> */}
          </RadioGroup>

        </div>
      </div>
    </div>
  )
}

export default FilterCard