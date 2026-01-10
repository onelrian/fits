'use client'

import { createClient } from '@/utils/supabase/client'


export default function LoginPage() {
    const supabase = createClient()

    const handleLogin = async (provider: 'google' | 'github') => {
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <div className="flex w-full max-w-md flex-col space-y-8 px-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Sign in to your account
                </p>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => handleLogin('google')}
                        className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        Sign in with Google
                    </button>
                    <button
                        onClick={() => handleLogin('github')}
                        className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                        Sign in with GitHub
                    </button>
                </div>
            </div>
        </div>
    )
}
