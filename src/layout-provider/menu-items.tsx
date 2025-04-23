import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { IUser } from "@/interfaces"
import { Calendar, CalendarCheck, LayoutDashboard, ListPlus, LogOut, MessageSquare, ScrollText, User } from "lucide-react"
import { usePathname } from "next/navigation"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import userGlobalStore, { IUserGlobalStore } from "@/store/users-global-store"

interface MenuItemsProps {
    openMenuItems: boolean,
    setOpenMenuItems: (openMenuItems: boolean) => void, // parameter is boolean and this is a function
}

function MenuItems({ openMenuItems, setOpenMenuItems }: MenuItemsProps) {
    const {user} = userGlobalStore() as IUserGlobalStore
    const pathname = usePathname()
    const router = useRouter()

    // handle logout after user click button logout
    const onLogout = () => {
        try {
            // remove cookies
            Cookies.remove('token')
            Cookies.remove('role')
            // redirect to login page
            router.push('/login')
            toast.success('Logout successful')
        } catch (error) {
            toast.error("An error occurred while logging out. Please Try again later.")
        }
    }

    // menu items for user
    let userMenuItems = [
        {
            title: 'Dashboard',
            route: '/user/dashboard',
            icon: <LayoutDashboard size={13} />
        },
        {
            title: 'Schedule Appointments',
            route: '/user/schedule-appointments',
            icon: <CalendarCheck size={13} />
        },
        {
            title: 'My Appointments',
            route: '/user/my-appointments',
            icon: <ScrollText size={13} />
        },
        {
            title: 'Profile',
            route: '/user/profile',
            icon: <User size={13} />
        }
    ]

    // menu items for salon/spa owner
    let salonSpaOwnerMenuItems = [
        {
            title: 'Dashboard',
            route: '/salon-spa-owner/dashboard',
            icon: <LayoutDashboard size={13} />
        },
        {
            title: 'Salons & Spas',
            route: '/salon-spa-owner/salons-spas',
            icon: <ListPlus size={13} />
        },
        {
            title: 'Appointments',
            route: '/salon-spa-owner/appointments',
            icon: <Calendar size={13} />
        },
        {
            title: 'Feedback / Reviews',
            route: '/salon-spa-owner/feedback-reviews',
            icon: <MessageSquare size={13} />
        },
        {
            title: 'Profile',
            route: '/salon-spa-owner/profile',
            icon: <User size={13} />
        }
    ]

    // show based on user role
    const menuItemsToRender = user?.role === "user" ? userMenuItems : salonSpaOwnerMenuItems

    return (
        <Sheet open={openMenuItems} onOpenChange={setOpenMenuItems}>
            {/* <SheetContent className="lg:min-w-[500px]"> for custom width */}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-10 mt-20 px-7">
                    {menuItemsToRender.map((menuItem, index) => (
                        <div className={`flex gap-5 items-center p-2 rounded-md cursor-pointer
                            ${pathname === menuItem.route ? 'bg-gray-100 border border-gray-500' : ''}
                        `}
                        key={index}
                        onClick={() => {
                            router.push(menuItem.route)
                            setOpenMenuItems(false)
                        }}
                        >
                            <div className="text-black">
                                {menuItem.icon}
                            </div>
                            <span className="text-sm! text-black">{menuItem.title}</span>
                        </div>
                    ))}

                    <Button className="w-full" onClick={onLogout}><LogOut /> Logout</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MenuItems
