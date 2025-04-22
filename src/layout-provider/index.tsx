'use client'
import { usePathname } from "next/navigation";
import React from "react";
import PublicLayout from "./public-layout";
import PrivateLayout from "./private-layout";

function LayoutProvider({children} : {children: React.ReactNode}) {
    const pathname = usePathname()
    const isPrivate = pathname.startsWith('/user') || pathname.startsWith('/salon-spa-owner')

    // use private layout
    if(isPrivate) {
        return <PrivateLayout>{children}</PrivateLayout>
    }

    // use public layout
    return <PublicLayout>{children}</PublicLayout>
}

export default LayoutProvider