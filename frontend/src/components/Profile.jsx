import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'

// const skills = ["html", "css", "javascript", "node", "react"];
const isResume = true;

const jobName = 'Full-Stack Developer'

const Profile = () => {
  const [open, setOpen] = useState(false);
  const {User} = useSelector(store => store.auth);

  return (
    <div>
      <Navbar />
      <div className='border-black flex  border-b-4 border-l-4 border-r-4 my-9 max-w-80 items-center mx-auto hover:rounded-xl hover:border-b-[#3dd5f3] hover:border-emerald-300 rounded-lg'>
        <h1 className='text-2xl font-bold flex mx-auto items-center text-[#b65ba2] hover:text-[#f33dde] p-2 '> I'm {jobName}</h1>
      </div>
      <div className='max-w-[750px] bg-white mx-auto border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-20 w-20 '>
              <AvatarImage src="https://github.com/shadcn.png" alt='profile' />
            </Avatar>
            <div >
              <h1 className='text-xl font-medium'>{User?.fullname}</h1>
              <p>{User?.profile?.bio}</p>
            </div>
          </div>
          <Button className='text-right' onClick={() => setOpen(true)} variant='outline'><Pen /></Button>
        </div>
        <div className='my-5  flex flex-col gap-3'>
          <div className='flex items-center gap-3'>
            <Mail />
            <span>{User?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact />
            <span>{User?.phoneNumber}</span>
          </div>
        </div>
        <div id='skills' className='items-center my-5'>
          <h1 className='text-l font-bold mb-1'>Skills</h1>
          {
            User?.profile?.skills.length !== 0 ? User?.profile?.skills.map((item, index) => <Badge key={index} className='mr-1'>{item}</Badge>) : <span>NA/</span>
          }
        </div>
        <div id='resume' className='grid items-center gap-1.5'>
          <Label className='text-medium font-bold'>Resume</Label>

          {
            isResume ? <a href={User?.profile?.resume} className='text-pink-500 hover:underline w-full cursor-pointer' target='blank'> {User?.profile?.resumeOriginalName}</a> : <span>NA</span>
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