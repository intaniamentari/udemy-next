import { IUser } from "@/interfaces";
import { Menu, MenuIcon } from "lucide-react";
import React from "react";
import MenuItems from "./menu-items";

function Header({user}: {user: IUser}) {
    const [openMenuItems, setOpenMenuItems] = React.useState(false)

    return(
        <div className="bg-primary p-5 text-white flex justify-between items-center">
            <h1 className="font-bold! text-white text-2xl">B . E . A . U . T . Y</h1>
            <div className="flex gap-5 items-center">
                <h1 className="text-sm!">{user?.name}</h1>
                <Menu
                    className="text-violet-500 cursor-pointer"
                    size={15}
                    // 1. user click on menu icon
                    onClick={() => setOpenMenuItems(true)}
                />
            </div>
            {/* 2. if status is true, show menu items */}
            {openMenuItems && (
                <MenuItems
                    openMenuItems={openMenuItems}
                    setOpenMenuItems={setOpenMenuItems}
                    user={user}
                />)}
        </div>
    )
}

export default Header
