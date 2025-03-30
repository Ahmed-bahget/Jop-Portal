import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Menu, User2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

function Navbar() {

    const { User } = useSelector(store => store.auth)
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handelLogout = () => {
        navigate("/logout")
    }

    return (
        <div className='bg-white shadow-md w-full'>
            <div className='flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-16'>
                <Link to="/home">
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#464ab7]'>Portal</span></h1>
                </Link>

                <div className='flex items-center gap-3'>
                    <div className="hidden md:flex items-center gap-5 font-medium">
                        {User?.role === "recruiter" ? (
                            <>
                                <Link to="/" className="hover:text-[#464ab7]">Company</Link>
                                <Link to="/admin/jobs" className="hover:text-[#464ab7]">Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="hover:text-[#464ab7]">Home</Link>
                                <Link to="/jobs" className="hover:text-[#464ab7]">Jobs</Link>
                                <Link to="/browse" className="hover:text-[#464ab7]">Browse</Link>
                            </>
                        )}
                    </div>
                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        <Menu className="w-6 h-6" />
                    </button>
                    {
                        !User ? (
                            <div className='hidden md:flex items-center gap-3'>
                                <Link to="/login"><Button variant='outline'>Login</Button></Link>
                                <Link to="signup"><Button className='bg-[#6A38C2] hover:bg-[#3d059d]'>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild className='hidden md:block'>
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
            {menuOpen && (
                <div className="md:hidden absolute bg-white w-full left-0 shadow-md p-4">
                    <div className="flex flex-col gap-3">
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={User?.profile?.profilePhoto} alt="@shadcn" />
                        </Avatar>
                        {User?.role === "recruiter" ? (
                            <>
                                <Link to="/" className="hover:text-[#464ab7]">Company</Link>
                                <Link to="/admin/jobs" className="hover:text-[#464ab7]">Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="hover:text-[#464ab7]">Home</Link>
                                <Link to="/jobs" className="hover:text-[#464ab7]">Jobs</Link>
                                <Link to="/browse" className="hover:text-[#464ab7]">Browse</Link>
                            </>
                        )}

                        {!User ? (
                            <>
                                <Link to="/login">
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#3d059d] w-full">Signup</Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                {User?.role === "student" && (
                                    <Link to="/profile" className="flex items-center gap-2">
                                        <User2 />
                                        <span>View Profile</span>
                                    </Link>
                                )}
                                <button onClick={handelLogout} className="flex items-center gap-2">
                                    <LogOut />
                                    <span>Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
