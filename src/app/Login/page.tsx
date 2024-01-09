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

const Login: React.FC = () => {
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
            // router.push("/users")
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
            <section className="bg-gray-50 dark:bg-[#000001]">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image width={120} height={120} className="w-8 h-8 mr-2" src={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"} alt="logo" />
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

                            <div className='flex gap-3'>
                                <button type="button" onClick={() => Action('github')}>Github</button><button type="button" onClick={() => Action('google')}>Google</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login