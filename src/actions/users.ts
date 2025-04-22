'use server'
import supabase from "@/config/supabase-config"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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

export const loginUser = async ({email, password, role}: {
    email: string,
    password: string,
    role: string
}) => {
    try {
        // find the user with the email
        const {data, error} = await supabase.from('user_profiles').select('*').eq('email', email)

        if (error) {
            return {
                success: false,
                message: error.message
            }
        }

        // check if user exists
        if (!data || data.length === 0) {
            return {
                success: false,
                message: 'User not found'
            }
        }

        // check the role
        if (data[0].role !== role) {
            return {
                success: false,
                message: 'Invalid role'
            }
        }

        // compare the password
        const isPasswordValid = bcrypt.compareSync(password, data[0].password) //(plain password, hashed password)

        if(!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid password'
            }
        }

        // generate a JWT token
        const token = jwt.sign({
            id: data[0].id,
            email: data[0].email,
            role: data[0].role
        }, process.env.JWT_SECRET!, { expiresIn: '1d' })

        return {
            success: true,
            data: token
        }
    } catch (error:any) {
        return {
            success: false,
            message: error.message
        }
    }
}