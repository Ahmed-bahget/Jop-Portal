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
                const endpoint = `${JOB_API_END_POINT}/get?limit=100`;               
                const { data } = await axios.get(endpoint);
                if (data.success) {
                    dispatch(setAllJobs(data.jobs || []));
                } else {
                    console.log("Something went wrong while geting jobs");
                    dispatch(setAllJobs([]));
                }
            } catch (error) {
                console.error("Error fetching all jobs:", error);
                dispatch(setAllJobs([]));
            }
        };

        fetchAllJobs();
    }, [dispatch]);
};

export default useGetAllJobs;