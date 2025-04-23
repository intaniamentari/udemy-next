import PageTitle from '@/components/ui/page-title'
import React from 'react'
import SalonSpaForm from '../../_components/salon-spa-form'
import { getSalonSpaById } from '@/actions/salon-spas'
import ErrorMessage from '@/components/ui/error-message'

interface Props {
    params: Promise<{ id: number }>
}

async function EditSalonSpa({ params }: Props) {
    const { id } = await params
    const response:any = await getSalonSpaById(id!)

    if (!response.success) {
        return <ErrorMessage error={response.message} />
    }

    return (
        <div>
            <PageTitle title="Edit Salon/Spa" />
            <SalonSpaForm initialValues={response.data} formType='edit' />
        </div>
    )
}

export default EditSalonSpa
