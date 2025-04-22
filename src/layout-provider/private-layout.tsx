import React from "react";

function PrivateLayout({children} : {children: React.ReactNode}) {
    return(
        <div>
            <div>Header</div>
            {children}</div>
    )
}

export default PrivateLayout
