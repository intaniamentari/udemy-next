'use server'
import supabase from "@/config/supabase-config"

// create new book
export const bookNewAppointment = async (data: any) => {
    try {
        const { data: appointment, error } = await supabase.from('appointments').insert([data])
        if (error) throw new Error(error.message)
        return {
            success: true,
            data: appointment
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// get all data appointment by user_id
export const getAppointmentByUserId = async (user_id: number) => {
    try {
        const { data, error } = await supabase.from('appointments').select('*').eq('user_id', user_id)
        if (error) throw new Error(error.message)
        return {
            success: true,
            data: data
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// get all data appointment by owner_id
export const getAppointmentsByOwnerId = async (owner_id: number) => {
    try {
        const { data, error } = await supabase.from('appointments').select('*').eq('owner_id', owner_id)
        if (error) throw new Error(error.message)
        return {
            success: true,
            data: data
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}