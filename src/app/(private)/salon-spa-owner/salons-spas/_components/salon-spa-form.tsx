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
        working_days: z.array(z.string()).nonempty(),
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
                </form>
            </Form>
        </div>
    )
}

export default SalonSpaForm