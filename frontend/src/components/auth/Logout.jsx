import { setUser } from '@/redux/authSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setUser(""));
        navigate('/login');
    });
}

export default Logout