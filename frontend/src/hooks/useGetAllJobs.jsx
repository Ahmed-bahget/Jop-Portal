// hooks/useGetAllJobs.js
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(state => state.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const endpoint = searchedQuery
                    ? `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`
                    : `${JOB_API_END_POINT}/get`;

                const { data } = await axios.get(endpoint, { withCredentials: true });
                if (data.success) {
                    dispatch(setAllJobs(data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;
