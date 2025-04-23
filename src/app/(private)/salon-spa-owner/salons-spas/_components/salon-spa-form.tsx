'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { workingDays } from '@/constants'
import { Checkbox } from "@/components/ui/checkbox"
import toast from 'react-hot-toast'

interface SalonSpaFormProps {
    initialValues?: any
    formType?: 'add' | 'edit'
}

// value select in offer status
const offerStatuses = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
]

function SalonSpaForm({ initialValues, formType }: SalonSpaFormProps) {
    const formSchema = z.object({
        name: z.string().nonempty(),
        description: z.string().nonempty(),
        address: z.string().nonempty(),
        city: z.string().nonempty(),
        state: z.string().nonempty(),
        zip: z.string().nonempty(),
        min_price: z.number(),
        max_price: z.number(),
        offer_status: z.string().nonempty(),
        working_days: z.array(z.string()),
        start_time: z.string().nonempty(),
        end_time: z.string().nonempty(),
        break_start: z.string().nonempty(),
        break_end: z.string().nonempty(),
        slot_duration: z.number(),
        max_booking_per_slot: z.number(),
        location_name: z.string().nonempty(),
        latitude: z.string(),
        longitude: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            min_price: 0,
            max_price: 0,
            offer_status: 'inactive',
            working_days: [],
            start_time: '',
            end_time: '',
            break_start: '',
            break_end: '',
            slot_duration: 0,
            max_booking_per_slot: 0,
            location_name: '',
            latitude: '',
            longitude: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    const onWorkingDaysChange = (day: string) => {
        try {
            const previousValue = form.getValues('working_days')
            if(previousValue.includes(day)) {
                form.setValue('working_days', previousValue.filter((d) => d !== day))
            } else {
                form.setValue('working_days', [...previousValue, day])
            }
        } catch (error:any) {
            toast.error(error.message)
        }
    }

    return (
        <div className='mt-7'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* city */}
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* state */}
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* zip */}
                        <FormField
                            control={form.control}
                            name="zip"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* min price */}
                        <FormField
                            control={form.control}
                            name="min_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Minimum Service Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} onChange={(e) => field.onChange('min_price', parseInt(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* max price */}
                        <FormField
                            control={form.control}
                            name="max_price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maximum Service Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} onChange={(e) => field.onChange('max_price', parseInt(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* offer status */}
                        <FormField
                            control={form.control}
                            name="offer_status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Offer Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder="Select offer status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {offerStatuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* working days */}
                    <div className='p-5 border border-gray-300 rounded-md flex flex-col gap-5'>
                        <h1 className='text-sm! font-semibold! text-gray-600'>Working Days</h1>
                        <div className='flex flex-wrap gap-10'>
                            {workingDays.map((day) => {
                                const previousValues = form.watch('working_days') // get newest value
                                const isChecked = previousValues.includes(day.value) // return boolean to check previousValues includes day.value
                                return (
                                    <div className='flex gap-2 items-center' key={day.value}>
                                        <h1 className='text-sm'>{day.label}</h1>
                                        <Checkbox
                                            checked={isChecked} // is checked if return true
                                            onCheckedChange={() => onWorkingDaysChange(day.value)}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        <div className='grid grid-cols-3 gap-5'>
                            {/* start time */}
                            <FormField
                                control={form.control}
                                name="start_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Time</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} type="time" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* end time */}
                            <FormField
                                control={form.control}
                                name="end_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Time</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} type="time" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* slot duration */}
                            <FormField
                                control={form.control}
                                name="slot_duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slot Duration</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                type="number"
                                                {...field}
                                                onChange={(e) => {
                                                    // field.setValue("slot_duration", parseInt(e.target.value))
                                                    field.onChange(parseInt(e.target.value))
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* break start */}
                            <FormField
                                control={form.control}
                                name="break_start"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Break Start Time</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} type="time" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* break end */}
                            <FormField
                                control={form.control}
                                name="break_end"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Break End Time</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} type="time" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* max booking per slot */}
                            <FormField
                                control={form.control}
                                name="max_booking_per_slot"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Booking Per Slot</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                type="number"
                                                {...field}
                                                onChange={(e) => {
                                                    // field.setValue("max_bookings_per_slot", parseInt(e.target.value))
                                                    field.onChange(parseInt(e.target.value))
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                </form>
            </Form>
        </div>
    )
}

export default SalonSpaForm