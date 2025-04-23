'use client'
import { Button } from '@/components/ui/button'
import { ISalonSpa } from '@/interfaces'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Checkout({salonSpa} : {salonSpa: ISalonSpa}) {
    const [date, setDate] = React.useState(new Date())
    const [time, setTime] = React.useState("09:00")

    const timeOptions = [
        {label: "09:00 AM", value: "09:00"},
        {label: "10:00 AM", value: "10:00"},
    ]

    return (
        <div className='border border-gray-400 flex flex-col gap-5 p-5'>
            {/* datepicker */}
            <div className='flex flex-col gap-1'>
                <span className='text-sm'>
                    Select Date
                </span>
                <DatePicker
                    selected={date}
                    onChange={(value) => setDate(value as Date)}
                    className='border border-gray-700 p-2'
                />
            </div>

            {/* select time */}
            <div className='flex flex-col gap-1'>
                <span className='text-sm'>
                    Select Time
                </span>
                <select name="" id=""
                    className='border border-gray-700 p-2'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                >
                    {timeOptions.map((time) => (
                        <option key={time.value} value={time.value}>{time.label}</option>
                    ))}
                </select>
            </div>
            <div className='flex justify-end'>
                <Button variant={'outline'}>Cancel</Button>
                <Button className='ml-3'>Book Appointment</Button>
            </div>
        </div>
    )
}

export default Checkout