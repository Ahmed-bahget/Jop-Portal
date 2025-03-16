import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllCompanies } from '@/redux/companySlice'; // Assuming setAllCompanies is an action in your redux slice
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                console.log(res);

                if (res.data.success) {
                    dispatch(setAllCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllCompanies();
    })
,[dispatch]}

export default useGetAllCompanies;