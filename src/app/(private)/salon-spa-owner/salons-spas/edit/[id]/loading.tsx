import Loader from '@/components/ui/loader'
import React from 'react'

// this is for loading on server when data edit is loading
function Loading() {
    return (
        <Loader parentHeight={200} />
    )
}

export default Loading