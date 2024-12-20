import React from 'react'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2 } from 'lucide-react'

function Navbar() {
    let user = false;
    return (
        <div className='bg-white  mx-20 '>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
                </div>

                <div className='flex items-center gap-2'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/jobs">Jobs</a></li>
                        <li><a href="/browse">Browse</a></li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant='outline'>Login</Button></Link>
                                <Link to="signup"><Button className='bg-[#6A38C2] hover:bg-[#3d059d]'>Signup</Button></Link>
                            </div>
                        ): (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className='w-80'>
                            <div className=''>
                                <div className='flex gap-2 space-y-2'>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                    <div className=''>
                                        <h4 className='font-medium'>Mern Stack</h4>
                                        <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet  </p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 my-2 text-gray-600'>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <User2 />
                                    <Button variant="link">view profile</Button>
                                </div>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                    <LogOut />
                                    <Button variant="link">logout</Button>
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
