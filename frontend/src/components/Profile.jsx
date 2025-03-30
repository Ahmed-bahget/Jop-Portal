import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { User } = useSelector(store => store.auth);
  const [user, setUser] = useState(User);

  useEffect(() => {
    setUser(User);
    console.log(User);
  }, [User]); 

  return (
    <div>
      <Navbar />
      <div className='max-w-[750px] bg-white mx-auto border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-20 w-20 '>
              <AvatarImage src={user?.profile?.profilePhoto} alt='profile' />
            </Avatar>
            <div>
              <h1 className='text-xl font-medium'>{user?.fullname}</h1>
              <p className='text-gray-600 '>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button className='text-right' onClick={() => setOpen(true)} variant='outline'><Pen /></Button>
        </div>
        <div className='my-5 flex flex-col gap-3'>
          <div className='flex items-center gap-3'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div id='skills' className='items-center my-5'>
          <h1 className='text-l font-bold mb-1'>Skills</h1>
          {user?.profile?.skills.length !== 0 
            ? user?.profile?.skills.map((item, index) => <Badge key={index} className='mr-1'>{item}</Badge>) 
            : <span>NA</span>
          }
        </div>
        <div id='resume' className='grid items-center gap-1.5'>
          <Label className='text-medium font-bold'>Resume</Label>
          {user?.profile?.resume 
            ? <a href={user?.profile?.resume} className='text-red-600 hover:underline w-full cursor-pointer' target='_blank'> {user?.profile?.resumeOriginalName}</a> 
            : <span>NA</span>
          }
        </div>
      </div>

      <div className='max-w-3xl mx-auto '>
        <h1 className='text-lg font-bold'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
