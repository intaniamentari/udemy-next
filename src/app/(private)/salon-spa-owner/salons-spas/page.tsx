'use client'

import { getSalonsByOwner, getSalonSpaById } from "@/actions/salon-spas";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import userGlobalStore, { IUserGlobalStore } from "@/store/users-global-store";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ISalonSpa } from "@/interfaces";
import dayjs from "dayjs";
import { Trash2, Edit2 } from "lucide-react";

function SalonsSpasList() {
    const { user } = userGlobalStore() as IUserGlobalStore
    const [salonsSpas, setSalonsSpas] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    // get data salons/spas
    const fetchData = async () => {
        try {
            setLoading(true)
            const response: any = await getSalonsByOwner(user?.id!)
            if (!response.success) throw new Error(response.message)

            console.log(response.data)

            setSalonsSpas(response.data)

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    // get data salons/spas
    React.useEffect(() => {
        if(user) {
            fetchData()
        }
    }, [user])

    const columns = [
        'Id',
        'Name',
        'City',
        'State',
        'Zip',
        'Min Service Price',
        'Max Service Price',
        'Offer Status',
        'Created At',
        'Action'
    ]

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle title="Salons & Spas" />
                <Button>
                    <Link href="/salon-spa-owner/salons-spas/add">Add Salon/Spa</Link>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        {
                            columns.map((column, index) => (
                                <TableHead key={index}>{column}</TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {salonsSpas.map((item:ISalonSpa) => (
                        <TableRow key={item.id} className="p-2">
                            <TableCell data-label="Id">{item.id}</TableCell>
                            <TableCell data-label="Name">{item.name}</TableCell>
                            <TableCell data-label="City">{item.city}</TableCell>
                            <TableCell data-label="State">{item.state}</TableCell>
                            <TableCell data-label="Zip">{item.zip}</TableCell>
                            <TableCell data-label="Min Service Price">{item.min_price}</TableCell>
                            <TableCell data-label="Max Service Price">{item.max_price}</TableCell>
                            <TableCell data-label="Offer Status">{item.offer_status}</TableCell>
                            <TableCell data-label="Created At">{dayjs(item.createdAt).format('MMM DD, YYYY hh:mm A')}</TableCell>
                            <TableCell data-label="Action" className="flex gap-4 items-center">
                                <Button className="border border-gray-500" variant={'outline'} size={'icon'}>
                                    <Trash2 size={14} />
                                </Button>
                                <Button className="border border-gray-500" variant={'outline'} size={'icon'}>
                                    <Edit2 size={14} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default SalonsSpasList