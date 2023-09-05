/**
 * A store hold user authentication state from supabase
 */

import { writable } from 'svelte/store';

export const isAuthenticated = writable<boolean>(false)