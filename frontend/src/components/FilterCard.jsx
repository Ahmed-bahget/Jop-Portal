// import React, { useEffect, useState } from 'react';
// import { RadioGroup, RadioGroupItem } from './ui/radio-group';
// import { Label } from './ui/label';
// import { setSearchedQuery } from '@/redux/jobSlice';
// import { useDispatch } from 'react-redux';

// const filterData = [
//   {
//     filterType: "Location",
//     array: ["Cairo", "Sharqia", "Alex", "Tanta"]
//   },
//   {
//     filterType: "Industry",
//     array: ["Backend", "Frontend", "Fullstack"]
//   },
//   {
//     filterType: "Salary",
//     array: ["0-40$", "41-70$", ">100$"]
//   },
// ];

// const FilterCard = () => {
//   const [selectedValue, setSelectedValue] = useState("");
//   const dispatch = useDispatch();

//   const changeHandler = (value) => {
//     setSelectedValue(value);
//   };

//   useEffect(() => {
//     dispatch(setSearchedQuery(selectedValue));
//   }, [selectedValue]);

//   return (
//     <div className='flex flex-col gap-6 bg-white p-6 rounded-md w-full sm:w-80 md:w-96 lg:w-[350px] xl:w-[400px]'>
//       <div>
//         <h1 className='font-bold text-xl mb-4'>Filter Jobs</h1>
//         <hr className='my-4' />
//         <div>
//           <RadioGroup value={selectedValue} onValueChange={changeHandler}>
//             {/* All Option */}
//             <div className='flex items-center space-x-3 mb-2'>
//               <RadioGroupItem value="" id="all" />
//               <Label htmlFor="all" className='text-sm text-gray-700'>All</Label>
//             </div>

//             {/* Filters */}
//             {
//               filterData.map((data, index) => (
//                 <div key={index} className='mb-4'>
//                   <h2 className='text-lg font-semibold mb-2'>{data.filterType}</h2>
//                   {
//                     data.array.map((arr, idx) => {
//                       const itemId = `id${index}-${idx}`;
//                       return (
//                         <div key={itemId} className='flex items-center space-x-3'>
//                           <RadioGroupItem value={arr} id={itemId} />
//                           <Label htmlFor={itemId} className='ml-2 text-sm text-gray-700'>{arr}</Label>
//                         </div>
//                       );
//                     })
//                   }
//                 </div>
//               ))
//             }
//           </RadioGroup>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterCard;




// import React, { useEffect, useState } from 'react';
// import { RadioGroup, RadioGroupItem } from './ui/radio-group';
// import { Label } from './ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Separator } from './ui/separator';
// import { useDispatch } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';


// const filterData = [
//   {
//     filterType: "Location",
//     array: ["Cairo", "Sharqia", "Alex", "Tanta"]
//   },
//   {
//     filterType: "Industry",
//     array: ["Backend", "Frontend", "Fullstack"]
//   },
//   {
//     filterType: "Salary",
//     array: ["0-40$", "41-70$", ">100$"]
//   },
// ];

// const FilterCard = () => {
//   const [selectedValue, setSelectedValue] = useState("");

//   const handleChange = () => {
//     setSelectedValue(value);
//     onFilter(value);
//   };

//   // const FilterCard = () => {
//   // const [selectedValue, setSelectedValue] = useState("");
//   const dispatch = useDispatch();

//   // const changeHandler = (value) => {
//   //   setSelectedValue(value);
//   // };

//   useEffect(() => {
//     dispatch(setSearchedQuery(selectedValue));
//   }, [selectedValue]);

//   return (
//     <Card className="bg-white shadow-sm border-gray-100">
//       <CardHeader className="pb-3">
//         <CardTitle className="text-xl font-bold">Filter Jobs</CardTitle>
//       </CardHeader>
//       <Separator className="mb-4" />
//       <CardContent>
//         <RadioGroup value={selectedValue} onValueChange={handleChange}>
//           <div className="flex items-center space-x-3 mb-4 hover:bg-gray-50 p-2 rounded-md transition-colors">
//             <RadioGroupItem value="" id="all" />
//             <Label htmlFor="all" className="text-sm font-medium cursor-pointer">
//               All Jobs
//             </Label>
//           </div>

//           {filterData.map((section, index) => (
//             <div key={index} className="mb-6">
//               <h3 className="text-sm font-semibold mb-3 text-gray-700">
//                 {section.filterType}
//               </h3>
//               <div className="space-y-2">
//                 {section.array.map((option, idx) => {
//                   const itemId = `${section.filterType}-${idx}`;
//                   return (
//                     <div key={itemId} 
//                       className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md transition-colors">
//                       <RadioGroupItem value={option} id={itemId} />
//                       <Label htmlFor={itemId} className="text-sm text-gray-600 cursor-pointer">
//                         {option}
//                       </Label>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </RadioGroup>
//       </CardContent>
//     </Card>
//   );
// };

// export default FilterCard;





import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

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
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-md w-full sm:w-80 md:w-96 lg:w-[350px] xl:w-[400px] p-6">
      <div>
        <h1 className="font-bold text-xl mb-4">Filter Jobs</h1>
        <hr className="my-4" />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {/* All Option */}
          <div className="flex items-center space-x-3 mb-4 hover:bg-gray-50 p-2 rounded-md transition-colors">
            <RadioGroupItem value="" id="all" />
            <Label htmlFor="all" className="text-sm font-medium cursor-pointer">
              All Jobs
            </Label>
          </div>

          {/* Dynamic Filters */}
          {filterData.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-sm font-semibold mb-3 text-gray-700">
                {section.filterType}
              </h2>
              <div className="space-y-2">
                {section.array.map((option, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center space-x-3 hover:bg-gray-50 p-1 rounded-md transition-colors"
                    >
                      <RadioGroupItem value={option} id={itemId} />
                      <Label htmlFor={itemId} className="text-sm text-gray-600 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
