
import { writable, type Writable } from 'svelte/store';


interface SignedInUser {
    name: string
    authenticated: boolean
    userId: string
    email: string
}

export const publicUserData: Writable<SignedInUser | null> = writable(null);
