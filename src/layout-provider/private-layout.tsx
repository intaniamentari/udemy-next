'use client'
import React from "react";
import Header from "./header";
import Cookies from "js-cookie";
import { getCurrentUser } from "@/actions/users";
import Loader from "@/components/ui/loader";
import ErrorMessage from "@/components/ui/error-message";
import userGlobalStore, { IUserGlobalStore } from "@/store/users-global-store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function PrivateLayout({children} : {children: React.ReactNode}) {
    const {user, setUser} = userGlobalStore() as IUserGlobalStore // call and type of IUserGlobalStore
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const router = useRouter()

    // fetch user data
    const fetchUser = async () => {
        try {
            setLoading(true)
            const token:any = Cookies.get('token')
            const response = await getCurrentUser(token)

            if(Cookies.get('token') === null) {
                Cookies.remove('token')
                Cookies.remove('role')
                router.push('/login')
                return
            }

            if(response.success) {
                setUser(response.data)
            } else {
                setError(response.message)
            }

        } catch (error:any) {
            Cookies.remove('token')
            toast.error(error.message)
            router.push('/login')
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        fetchUser()
    }, [])

    // show loading
    if(loading) {
        return <div className="flex items-center justify-center h-screen">
            <Loader />
        </div>
    }

    // show error
    if(error) {
        return <ErrorMessage error={error} />
    }

    return(
        <div>
            <Header />
            <div className="p-5">{children}</div>
        </div>
    )
}

export default PrivateLayout
