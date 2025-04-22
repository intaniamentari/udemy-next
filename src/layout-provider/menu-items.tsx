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
import { Calendar, CalendarCheck, LayoutDashboard, ListPlus, MessageSquare, ScrollText, User } from "lucide-react"

interface MenuItemsProps {
    openMenuItems: boolean,
    setOpenMenuItems: (openMenuItems: boolean) => void, // parameter is boolean and this is a function
    user: IUser
}

function MenuItems({ openMenuItems, setOpenMenuItems, user }: MenuItemsProps) {
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
    let salonSpaOwnerMenuItems = [
        {
            title: 'Dashboard',
            route: '/salon-spa-owner/dashboard',
            icon: <LayoutDashboard size={13} />
        },
        {
            title: 'Register or View Salon/Spa',
            route: '/salon-spa-owner/salon-spas',
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
    const menuItemsToRender = user.role === "user" ? userMenuItems : salonSpaOwnerMenuItems

    return (
        <Sheet open={openMenuItems} onOpenChange={setOpenMenuItems}>
            {/* <SheetContent className="lg:min-w-[500px]"> for custom width */}
            <SheetContent>
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default MenuItems
