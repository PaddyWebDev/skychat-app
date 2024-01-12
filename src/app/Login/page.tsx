"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod';


const LoginSchema = z.object({
    email: z.string().min(1, "Email is Required").email(`Invalid Email`),
    password: z.string().min(1, "Password is Required")
})

export default function Login() {
    const session = useSession()
    const router = useRouter()
    const [PasswordState, SetPasswordState] = useState<boolean>(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginType>({ resolver: zodResolver(LoginSchema) });

    const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
        try {
            await signIn('credentials', {
                ...data,
                redirect: false
            }).then((callback) => {
                if (callback?.error) {
                    toast.error("Missing Credentials")
                }
                if (callback?.ok && !callback?.error) {
                    toast.success("Login Success")
                }
            })
        } catch (error: any) {
            if (error.response.status === 404 || error.response.status === 401)
                toast.error(error.response.data.message)
        }
    }


    useEffect(() => {
        if (session.status === 'authenticated') {
            redirect('/users');
        }
    }, [session, router])

    async function Action(action: string) {
        await signIn(action, {
            redirect: false
        }).then((callback) => {
            if (callback?.error) {
                toast.error("Missing Credentials")
            }
            if (callback?.ok && !callback.error) {
                toast.success("Login Success")
                redirect('/users');

            }

        })
    }

    return (
        <main>
            <section className="bg-gray-50 dark:bg-[#000001] md:mt-0  mt-[15vh] ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 my-auto">
                    <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image width={120} height={120} className="w-8 h-8 mr-2" src={"/Images/Favicon.png"} alt="logo" />
                        SkyChat
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-900 dark:border-slate-900">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6 flex flex-col " onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => < input type="search" {...field} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />}
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.email.message}</p>}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <Controller
                                        name='password'
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => <input type={PasswordState ? 'search' : 'password'} {...field} autoComplete='new-password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />}
                                    />
                                    {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.password.message}</p>}

                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" onChange={() => SetPasswordState(!PasswordState)} autoComplete='new-password' aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Show Password</label>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
                                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                    {`Don't`} have an account yet? <Link href={`/Register`} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </form>

                            <div className='flex items-center justify-center flex-wrap gap-3'>
                                <button type="button" onClick={() => Action('github')} className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                                    </svg>
                                    Github Login
                                </button>
                                <button onClick={() => Action('google')} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                    </svg>
                                    Google Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
