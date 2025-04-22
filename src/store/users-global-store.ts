import { IUser } from "@/interfaces";
import {create} from "zustand";

const userGlobalStore = create((set) => ({
    user: null, // initial value
    setUser: (user:IUser) => set({user}),
}))

export default userGlobalStore

export interface IUserGlobalStore {
    user: IUser | null;
    setUser: (user: IUser) => void; // set to object parameter
}