import { getSalonSpaById } from '@/actions/salon-spas'
import ErrorMessage from '@/components/ui/error-message'
import PageTitle from '@/components/ui/page-title'
import { ISalonSpa } from '@/interfaces'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Checkout from './_components/checkout'

interface Props {
    params: Promise<{ id: string }>
}

async function BookAppointmentPage({ params }: Props) {
    const { id }:any = await params

    const response = await getSalonSpaById(id)
    if(!response.success) {
        return <ErrorMessage error={response.message} />
    }

    const salonSpa:ISalonSpa = response.data
    const renderProperty = (label:string, value:any) => {
        return (
            <div className='flex justify-between'>
                <h1 className='text-gray-500 text-sm'>{label}</h1>
                <h1 className='text-sm font-semibold!'>{value}</h1>
            </div>
        )
    }

    return (
        <div>
            <PageTitle title='Book Appointment' />

            <div className='mt-7 grid grid-cols-3 gap-10'>
                <div className='col-span-2 p-5 border border-gray-400 flex flex-col gap-1'>

                    {renderProperty('Name', salonSpa.name)}
                    {renderProperty('Address', salonSpa.address)}
                    {renderProperty('City', salonSpa.city)}
                    {renderProperty('State', salonSpa.state)}
                    {renderProperty('Zip Code', salonSpa.zip)}
                    {renderProperty('Minimum Service Price', salonSpa.min_price)}
                    {renderProperty('Maximum Service Price', salonSpa.max_price)}
                    {renderProperty('Offer Status', salonSpa.offer_status)}

                    <hr className='border border-gray-300 my-5' />

                    <p className='text-gray-700 text-sm'>{salonSpa.description}</p>
                </div>
                <div className='col-span-1'>
                    <Checkout salonSpa={salonSpa} />
                </div>
            </div>
        </div>
    )
}

export default BookAppointmentPage