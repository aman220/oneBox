"use client"

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/navigation"; 
import React, { useEffect } from 'react'




export default function Page() {
  const router = useRouter();
  // Google login handler function
  const handleGoogleLogin = () => {
    try {
      const googleLoginUrl = "https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=http://localhost:3000/Dashboard";
      if (!googleLoginUrl) {
        throw new Error('Google login URL is not defined.');
      }
      window.location.href = googleLoginUrl;
    } catch (error: any) {
      console.error('Failed to initiate Google login:', error.message);
      alert('Something went wrong. Please try again later.');
    }
  };

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if (token) {
      
      router.push('/Dashboard')
    }

    const usertoken = localStorage.getItem("token");

    if (!usertoken) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">REACHINBOX</h1>
      </header>

      <Head>
        <title>Create a new account - Reachinbox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-[#1c1c1c] rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-6">Create a new account</h2>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-transparent border border-gray-700 text-white py-2 px-4 rounded-md mb-4 flex items-center justify-center hover:bg-gray-800 transition duration-300"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign Up with Google
        </button>

        {/* Normal Sign-Up Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mb-6 hover:bg-blue-700 transition duration-300">
          Create an Account
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </main>

      <footer className="mt-8 text-xs text-gray-500">
        © 2023 Reachinbox. All rights reserved.
      </footer>
    </div>
  );
}
