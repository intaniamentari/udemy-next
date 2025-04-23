'use server'

import supabase from "@/config/supabase-config"

// create salon/spa
export const createNewSalonSpa = async (payload: any) => {
    console.log('payload', payload)
    try {
        const { data, error } = await supabase.from('salons_spas').insert([payload]);
        if (error) throw error

        return {
            success: true,
            message: 'Salon/Spa created successfully'
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// get all salons/spas by owner
export const getSalonsByOwner = async (owner_id: number) => {
    try {
        const { data, error } = await supabase.from('salons_spas').select('*').eq('owner_id', owner_id)
        if (error) throw error

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

// get salon/spa by id
export const getSalonSpaById = async (salon_id: number) => {
    try {
        const { data, error } = await supabase.from('salons_spas').select('*').eq('id', salon_id)

        // throw error if no data found / invalid id
        if (error || data.length === 0) throw error || new Error('Salon/Spa not found')

        return {
            success: true,
            data: data[0]
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// update salon/spa by id
export const updateSalonSpaById = async ({ id, payload }: { id: number, payload: any }) => {
    try {
        const { data, error } = await supabase.from('salons_spas').update(payload).eq('id', id)
        if (error) throw error

        return {
            success: true,
            message: 'Salon/Spa updated successfully'
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }

}

// delete salon/spa by id
export const deleteSalonSpaById = async (salon_id: number) => {
    try {
        const { data, error } = await supabase.from('salons_spas').delete().eq('id', salon_id)
        if (error) throw error

        return {
            success: true,
            message: 'Salon/Spa deleted successfully'
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

// get all salons/spas data
export const getAllSalonsSpas = async () => {
    try {
        const { data, error } = await supabase.from('salons_spas').select('*')
        if (error) throw error

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