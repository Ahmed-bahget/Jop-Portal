import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useGetAllCompanies();
    const [input, setInput] = useState("");

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input)); 
    },[input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder='Filter by Name'
                        onChange={(e)=> setInput(e.target.value)}
                    />
                    <Button onClick={()=> navigate('/admin/companies/create')}> New Company </Button>
                </div>
                <CompanyTable/>
            </div>
        </div>
    )
}

export default Companies