export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    role: 'user' | 'salon-spa-owner',
    isActive: boolean,
    createdAt: string
}

export interface ISalonSpa {
    id: number,
    name: string,
    description: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    min_price: number,
    max_price: number,
    offer_status: 'active' | 'inactive',
    working_days: string[],
    start_time : string,
    end_time : string,
    break_start : string,
    break_end : string,
    slot_duration : number,
    max_booking_per_slot : number,
    location_name : string,
    latitude : number,
    longitude : number,
    createdAt: string
}

export interface IAppointment {
    id: number,
    user_id: number,
    salon_spa_id: number,
    owner_id: number,
    date: string,
    time: string,
    status: 'booked' | 'completed' | 'cancelled',
    createdAt: string

    // run time properties
    user_data : IUser;
    salon_spa_data : ISalonSpa;
}