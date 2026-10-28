import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setLocationFilter, 
  setIndustryFilter, 
  setSalaryFilter,
  setSearchedQuery
} from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Cairo", "Sharqia", "Alex", "Tanta"],
    action: setLocationFilter
  },
  {
    filterType: "Industry",
    array: ["Backend", "Frontend", "Fullstack"],
    action: setIndustryFilter
  },
  {
    filterType: "Salary",
    array: ["0-40", "41-70", ">100"],
    action: setSalaryFilter
  },
];

const FilterCard = () => {
  const [selectedValues, setSelectedValues] = useState({
    Location: "",
    Industry: "",
    Salary: ""
  });
  
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector(store => store.job);

  // Don't clear search query automatically to allow combined filters

  const changeHandler = (filterType, value) => {
    // Update selected values for this filter type
    const newSelectedValues = {
      ...selectedValues,
      [filterType]: value
    };
    
    setSelectedValues(newSelectedValues);
    
    // Find the filter config
    const filterConfig = filterData.find(f => f.filterType === filterType);
    
    // Dispatch the appropriate action
    // Don't encode the value here, let the API handle it
    if (filterConfig) {
      dispatch(filterConfig.action(value));
    }
  };

  // Handle "All Jobs" selection
  const handleAllJobs = () => {
    // Reset all filter selections
    setSelectedValues({
      Location: "",
      Industry: "",
      Salary: ""
    });
    
    // Dispatch reset actions for all filters
    dispatch(setLocationFilter(""));
    dispatch(setIndustryFilter(""));
    dispatch(setSalaryFilter(""));
    dispatch(setSearchedQuery(""));
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg w-full p-5">
      <div>
        <h1 className="font-bold text-lg mb-4">Filter Jobs</h1>
        <hr className="my-4" />
        
        {/* All Option */}
        <div 
          className="flex items-center space-x-3 mb-4 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer"
          onClick={handleAllJobs}
        >
          <div className="w-4 h-4 rounded-full border border-gray-300"></div>
          <span className="text-sm font-medium">All Jobs</span>
        </div>
        
        {/* Dynamic Filters */}
        {filterData.map((section, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <h2 className="text-sm font-semibold mb-3 text-gray-800">
              {section.filterType}
            </h2>
            <RadioGroup 
              value={selectedValues[section.filterType]} 
              onValueChange={(value) => changeHandler(section.filterType, value)}
            >
              <div className="space-y-2">
                {section.array.map((option, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center space-x-3 hover:bg-gray-50 p-1.5 rounded-md transition-colors"
                    >
                      <RadioGroupItem value={option} id={itemId} />
                      <Label htmlFor={itemId} className="text-sm text-gray-700 cursor-pointer flex-1">
                        {option}{section.filterType === "Salary" ? "$" : ""}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;