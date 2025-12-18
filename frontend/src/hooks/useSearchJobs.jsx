// hooks/useSearchJobs.js
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const useSearchJobs = () => {
    const dispatch = useDispatch();
    const { 
        searchedQuery,
        locationFilter,
        industryFilter,
        salaryFilter
    } = useSelector(state => state.job);

    useEffect(() => {
        const searchJobs = async () => {
            try {
                // Check if any filters are active
                const hasFilters = searchedQuery || locationFilter || industryFilter || salaryFilter;
                
                // Only search if filters are active
                if (hasFilters) {
                    // Use search endpoint with filters
                    const params = new URLSearchParams();
                    
                    // Add filters to query parameters (without encoding, as axios will handle it)
                    if (searchedQuery) {
                        params.append('keyword', searchedQuery);
                    }
                    
                    if (locationFilter) {
                        params.append('location', locationFilter);
                    }
                    
                    if (industryFilter) {
                        params.append('industry', industryFilter);
                    }
                    
                    if (salaryFilter) {
                        params.append('salary', salaryFilter);
                    }

                    const endpoint = `${JOB_API_END_POINT}/search${params.toString() ? `?${params.toString()}` : ''}`;
                    
                    const { data } = await axios.get(endpoint);
                    if (data.success) {
                        dispatch(setSearchedJobs(data.jobs || []));
                    } else {
                        dispatch(setSearchedJobs([]));
                    }
                } else {
                    // Clear search results when no filters
                    dispatch(setSearchedJobs([]));
                }
            } catch (error) {
                console.error("useSearchJobs - Error searching jobs:", error);
                // Dispatch empty array on error
                dispatch(setSearchedJobs([]));
            }
        };

        searchJobs();
    }, [searchedQuery, locationFilter, industryFilter, salaryFilter, dispatch]);
};

export default useSearchJobs;