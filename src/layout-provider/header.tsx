import { Menu, MenuIcon } from "lucide-react";
import React from "react";

function Header({user}: {user: any}) {
    return(
        <div className="bg-primary p-5 text-white flex justify-between items-center">
            <h1 className="font-bold! text-white text-2xl">B . E . A . U . T . Y</h1>
            <div className="flex gap-5 items-center">
                <h1 className="text-sm!">{user?.name}</h1>
                <Menu className="text-violet-500 cursor-pointer" size={15} />
            </div>
        </div>
    )
}

export default Header
