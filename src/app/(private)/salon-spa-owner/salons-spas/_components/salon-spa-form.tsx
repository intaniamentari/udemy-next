'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
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
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import userGlobalStore, { IUserGlobalStore } from '@/store/users-global-store'
import { createNewSalonSpa, updateSalonSpaById } from '@/actions/salon-spas'
import LocationSelection from './location-selection'

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
    // add loading
    const [loading, setLoading] = React.useState(false)

    const router = useRouter()
    const { user } = userGlobalStore() as IUserGlobalStore

    const formSchema = z.object({
        name: z.string().nonempty(),
        description: z.string().nonempty(),
        address: z.string().nonempty(),
        city: z.string().nonempty(),
        state: z.string().nonempty(),
        zip: z.string().nonempty(),
        min_price: z.coerce.number().min(0),
        max_price: z.coerce.number().min(0),
        offer_status: z.string().nonempty(),
        working_days: z.array(z.string()),
        start_time: z.string().nonempty(),
        end_time: z.string().nonempty(),
        break_start: z.string().nonempty(),
        break_end: z.string().nonempty(),
        slot_duration: z.coerce.number().min(0),
        max_booking_per_slot: z.coerce.number().min(0),
        location_name: z.string(),
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
        try {
            setLoading(true)
            let response = null

            if (!user) {
                toast.error('User not found')
                return
            }

            // create or update salon/spa
            if (formType === 'add') {
                response = await createNewSalonSpa({
                    ...values,
                    owner_id: user.id
                })
            } else if (formType === 'edit') {
                response = await updateSalonSpaById({
                    id: initialValues?.id,
                    payload: values
                })
            }

            // check response
            if (response?.success) {
                toast.success(response.message)
                router.push('/salon-spa-owner/salons-spas')
            } else {
                toast.error(response?.message || 'Something went wrong.')
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const onWorkingDaysChange = (day: string) => {
        try {
            const previousValue = form.getValues('working_days')
            if (previousValue.includes(day)) {
                form.setValue('working_days', previousValue.filter((d) => d !== day))
            } else {
                form.setValue('working_days', [...previousValue, day])
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (initialValues) {
            Object.keys(initialValues).forEach((key: any) => {
                form.setValue(key, initialValues[key])
            })

            form.setValue('zip', initialValues.zip.toString())
        }
    }, [initialValues])

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
                                        <Input
                                            type='number'
                                            placeholder="" {...field}
                                            onChange={field.onChange}
                                            value={field.value == undefined || isNaN(field.value) ? '' : field.value}
                                        />
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
                                        <Input
                                            type='number'
                                            placeholder="" {...field}
                                            onChange={field.onChange}
                                            value={field.value == undefined || isNaN(field.value) ? '' : field.value}
                                        />
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
                                                type='number'
                                                placeholder="" {...field}
                                                onChange={field.onChange}
                                                value={field.value == undefined || isNaN(field.value) ? '' : field.value}
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
                                                type='number'
                                                placeholder="" {...field}
                                                onChange={field.onChange}
                                                value={field.value == undefined || isNaN(field.value) ? '' : field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>

                    {/* location */}
                    <div className='p-5 border border-gray-300 rounded-md flex flex-col gap-5'>
                        <h1 className='text-sm! font-semibold! text-gray-600'>Location</h1>
                        <LocationSelection
                            selectedLocationObject={{
                                lat: form.watch("latitude"),
                                lon: form.watch("longitude"),
                                display_name: form.watch("location_name"),
                            }}

                            setSelectedLocationObject={(location:any) => {
                                form.setValue("latitude", location.lat);
                                form.setValue("longitude", location.lon);
                                form.setValue("location_name", location.display_name);
                            }}
                        />
                    </div>

                    <div className='flex justify-end gap-5'>
                        <Button className='cursor-pointer' disabled={loading} type='button' variant={'outline'} onClick={() => router.push('/salon-spa-owner/salons-spas')}>Cancel</Button>
                        <Button className='cursor-pointer' disabled={loading} type='submit'>{formType === 'add' ? 'Add' : 'Update'}</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default SalonSpaForm