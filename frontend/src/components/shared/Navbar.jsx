import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

function Navbar() {
    // let user = true;
    const { User } = useSelector(store => store.auth)
    return (
        <div className='bg-white  mx-20 '>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#464ab7]'>Seeker</span></h1>
                </div>

                <div className='flex items-center gap-3'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            User?.role === "recruiter" ? (
                                <>
                                    <li><a href="/">Company</a></li>
                                    <li><a href="/admin/jobs">Jobs</a></li>
                                </>
                            ) :
                                (
                                    <>
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/jobs">Jobs</a></li>
                                        <li><a href="/browse">Browse</a></li>
                                    </>
                                )
                        }

                    </ul>
                    {
                        !User ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant='outline'>Login</Button></Link>
                                <Link to="signup"><Button className='bg-[#6A38C2] hover:bg-[#3d059d]'>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={User?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={User?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div className=''>
                                                <h4 className='font-medium'>{User?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{User?.profile?.bio} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3 my-2 text-gray-600'>
                                        {
                                            User && User.role === "student" && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link"><Link to='/profile'>view profile</Link></Button>
                                                </div>
                                            )
                                        }

                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Link to="/logout"><Button variant='outline'>Logout</Button></Link>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>

                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
