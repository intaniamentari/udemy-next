'use client'
import React from "react";
import Header from "./header";
import Cookies from "js-cookie";
import { getCurrentUser } from "@/actions/users";

function PrivateLayout({children} : {children: React.ReactNode}) {
    const [user, setUser] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)

    // fetch user data
    const fetchUser = async () => {
        try {
            const token:any = Cookies.get('token')
            const response = await getCurrentUser(token)

            if(response.success) {
                setUser(response.data)
            } else {
                setError(response.message)
            }

        } catch (error:any) {
            setError(error.message)
        }
    }
    React.useEffect(() => {
        fetchUser()
    }, [])

    // show loading
    if(loading) {
        return <div className="flex items-center justify-center h-screen">
            Loading ...
        </div>
    }

    // show error
    if(error) {
        return <div>{error}</div>
    }

    return(
        <div>
            <Header user={user} />
            <div className="p-5">{children}</div>
        </div>
    )
}

export default PrivateLayout
