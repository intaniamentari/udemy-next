'use server'
import supabase from "@/config/supabase-config"
import bcrypt from "bcryptjs"

export const registerNewUser = async({name, email, password, role}: {
    name: string, 
    email: string, 
    password: string, 
    role: string
}) => {
    try {
        // check if the user already exist
        const {data, error} = await supabase.from('user_profiles').select('email').eq('email', email)
        if(data && data.length > 0) {
            return {
                success: false,
                message: 'User already exists'
            }
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserObj = {
            name, 
            email, 
            password: hashedPassword, 
            role, 
            is_active: true
        }

        // insert the new user into the database
        const {data: userData, error: userError} = await supabase
            .from('user_profiles')
            .insert([newUserObj])

        if (userError) {
            return {
                success: false,
                message: userError.message
            }
        }

        return {
            success: true,
            message: 'User registered successfully'
        }
    } catch (error:any) {
        return {
            success: false,
            message: error.message
        }
    }
}