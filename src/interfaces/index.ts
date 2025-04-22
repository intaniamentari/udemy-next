export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    role: 'user' | 'salon-spa-owner',
    isActive: boolean,
    createdAt: string
}