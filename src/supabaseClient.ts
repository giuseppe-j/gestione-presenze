import { createClient } from '@supabase/supabase-js'
import { Track } from './shared/types';

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const registerUser = async (email: string, password: string, options: object) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options
    })
    return { data, error }
}

export const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    return { data, error }
}

export const forgotPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    return { data, error }
}

export const updateUser = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
        password: password
    })
    return { data, error }
}

export const addTrack = async (track: Track) => {
    await supabase.from('tracks').insert(track);
}

export const getTracks = async (id: string) => {
    const { data, error } = await supabase.from('tracks')
        .select()
    const tracks = data as Track[];
    return { tracks, error }
}