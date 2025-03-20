import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store => store.job);

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
                            allAppliedJobs?.length <= 0 ? <span>you have not applied jobs</span> : allAppliedJobs?.map((item,index)=>
                        <TableRow key={item?._id}>
                            <TableCell>{item?.job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell>{item?.job?.company?.name}</TableCell>
                            <TableCell className='text-right'>{<Badge className={`${item?.status=== "rejected" ? 'bg-red-400' : item?.status=== "pending" ? 'bg-gray-400' : 'bg-green-400'}`} >{item?.status}</Badge>}</TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AppliedJobTable