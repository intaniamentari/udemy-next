'use client'
import { getAllSalonsSpas } from '@/actions/salon-spas'
import Loader from '@/components/ui/loader'
import PageTitle from '@/components/ui/page-title'
import { ISalonSpa } from '@/interfaces'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function ScheduleAppointment() {
    const [salonsSpas, setSalonsSpas] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response:any = await getAllSalonsSpas()
            if (!response.success) throw new Error(response.message)

            setSalonsSpas(response.data)
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div className='flex justify-between'>
                <PageTitle title="Schedule Appointment" />
            </div>

            {loading && <Loader />}

            {!loading && salonsSpas.length > 0 && (
                <div className='flex flex-col gap-7 mt-7'>
                    {
                        salonsSpas.map((salonSpa: ISalonSpa) => (
                            <div key={salonSpa.id} className='border border-gray-300 p-5 rounded cursor-pointer hover:border-gray-600'
                                onClick={() => router.push(`/user/schedule-appointments/${salonSpa.id}`)}
                            >
                                <h1 className='text-sm font-bold! text-gray-800'>{salonSpa.name}</h1>
                                <p className='text-xs text-gray-600'>{salonSpa.address}, {salonSpa.city}, {salonSpa.state}</p>
                                <div className='mt-5'>
                                    <span className='text-xm font-semibold!'>
                                        Minimum Price: IDR {salonSpa.min_price}
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default ScheduleAppointment