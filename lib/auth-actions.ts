'use server'
import {signIn, signOut} from "@/auth"

export async function loginWithGithub() {
    await signIn("github", { redirectTo: "/" })
}

export async function loginWithGoogle() {
    await signIn("google", { redirectTo: "/" })
}

export async function logout() {
    await signOut({ redirectTo: "/" })
}