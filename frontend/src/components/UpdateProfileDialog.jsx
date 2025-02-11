import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';


const UpdateProfileDialog = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false);
    const {User} = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname:User?.fullname,
        email:User?.email,
        phoneNumber:User?.phoneNumber,
        bio:User?.profile?.bio,
        skills:User?.profile?.skills?.map(skill => skill),
        file:User?.profile?.resume,
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    const changeFileHandler =(e)=>{
        const file = e.target.files?.[0];
        setInput({...input, file});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(User);
        if (!input.phoneNumber || input.phoneNumber.trim() === "") {
            toast.error("Phone number is required");
            return;
        }
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        
        if(input.file){
            formData.append("file", input.file)
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setUser(res.data.User));
                console.log(User);
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        }
        setOpen(false);
        console.log(input);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={()=>setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>
                            UpdateProfile
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className='text-right'>Name</Label>
                                <Input
                                    id="name"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className='text-right'>Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className='text-right'>Number</Label>
                                <Input
                                    id="number"
                                    name="phoneNumber"
                                    value={input.phoneNumber}                                    
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className='text-right'>Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className='text-right'>Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    type="text"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className='text-right'>Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type='file'
                                    accept="application/pdf"
                                    onChange={changeFileHandler}
                                    className='col-span-3'
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button> <Loader2 className='mr-2 h-4 animate-spin' /> please wait </Button> : <Button type='submit' className='w-full my-4'>Update</Button>
                            }
                        </DialogFooter>   
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog