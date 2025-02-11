import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
    return (
        <div>
            <div className=' border border-gray-300 my-5 p-1 shadow-sm rounded-lg'>
                <Table>
                    <TableCaption>A list of your applied jobs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>JobRole</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead className='text-right'>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            [1,2,3,4].map((item,index)=>
                        <TableRow key={index}>
                            <TableCell>12/8/2024</TableCell>
                            <TableCell>Backend developer</TableCell>
                            <TableCell>Google</TableCell>
                            <TableCell className='text-right'>{<Badge className='text-white  bg-gray-400' variant='outline' >pending</Badge>}</TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AppliedJobTable