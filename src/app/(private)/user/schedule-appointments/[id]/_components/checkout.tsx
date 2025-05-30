'use client'
import { Button } from '@/components/ui/button'
import { ISalonSpa } from '@/interfaces'
import dayjs from 'dayjs'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Checkout({salonSpa} : {salonSpa: ISalonSpa}) {
    const [date, setDate] = React.useState(new Date())
    const [time, setTime] = React.useState("09:00")

    const timeOptions = [] // store available time slots

    // change to standard date format
    const sampleDate = dayjs(date).format("YYY-MM-DD")

    let currentSlot = dayjs(`${sampleDate} ${salonSpa.start_time}`) // start time
    const endTime = dayjs(`${sampleDate} ${salonSpa.end_time}`) // end time

    // loop available time slots starting from start_time to end_time
    while(dayjs(currentSlot).isBefore(endTime)) {
        // add current time is available
     timeOptions.push({
        label: dayjs(currentSlot).format("HH:mm"),
        value: dayjs(currentSlot).format("HH:mm")
     } as any)

     // continue to next slot by adding with slot_duration
     currentSlot = dayjs(currentSlot).add(salonSpa.slot_duration, 'minute')
    }

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
                    minDate={new Date()} // only enabled today and future dates
                    filterDate={(date) => { // enabled only in working days
                        const day = dayjs(date).format('dddd').toLowerCase()
                        return salonSpa.working_days.includes(day)
                    }}
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