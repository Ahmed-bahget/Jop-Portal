// hooks/useGetAllJobs.js
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                // Always use get all jobs endpoint
                const endpoint = `${JOB_API_END_POINT}/get`;
                
                console.log("Fetching all jobs from endpoint:", endpoint);
                const { data } = await axios.get(endpoint);
                console.log("All jobs data:", data);
                if (data.success) {
                    console.log("Setting all jobs in Redux:", data.jobs);
                    dispatch(setAllJobs(data.jobs));
                } else {
                    console.log("API returned success=false");
                }
            } catch (error) {
                console.error("Error fetching all jobs:", error);
                // Dispatch empty array on error to prevent infinite loading
                dispatch(setAllJobs([]));
            }
        };

        fetchAllJobs();
    }, [dispatch]);
};

export default useGetAllJobs;