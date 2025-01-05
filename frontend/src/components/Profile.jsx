import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'

const Profile = () => {
  return (
    <div>
        <Navbar/>
        <div className='max-w-[750px] bg-white mx-auto border border-gray-200 rounded-2xl my-5 p-8'>
            <Avatar className='h-20 w-20 '>
                <AvatarImage src="https://github.com/shadcn.png" alt='profile'/>
                <h1>Full Name</h1>
                <p>Experienced in do ..</p>
            </Avatar>

        </div>
        <div className='max-w-[750px] mx-auto'>
            <h1>Applied Jobs</h1>
            <div className=' border border-gray-300 my-5 p-8'>

            </div>
        </div>
    </div>
  )
}

export default Profile