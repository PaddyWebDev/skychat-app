"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const RegisterSchema = z.object({
    name: z.string().min(1, "name is Required"),
    email: z.string().min(1, "Email is Required").email(),
    password: z.string().min(1, "Password is Required"),
    confirm_password: z.string()
})
export default function Register() {
    const session = useSession();
    const router = useRouter()
    const [PasswordState, SetPasswordState] = useState<boolean>(false)
    const [ConfirmPassError, SetConfirmPassError] = useState<string>("")
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterType>({ resolver: zodResolver(RegisterSchema) });


    const HandleFormSubmit: SubmitHandler<RegisterType> = async (data: RegisterType) => {
        try {
            const { name, email, password } = data;
            const response = await axios.post(`/api/register`, { name, email, password })
            if (response.status === 200) {
                toast.success("Register Success")
                reset()
                signIn('credentials', { name, email, password })
            }

        } catch (error: any) {
            if (error.response.status === 400 || error.response.status === 409)
                toast.error(error.response.data.message)

        }
    }

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
        }


    }, [session, router])



    return (
        <section className="flex flex-col items-center min-h-screen justify-center px-6 py-8 mx-auto lg:py-0 bg-gray-50 dark:bg-[#000000] ">
            <Link draggable={false} href={`/`} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image width={120} height={120} className="w-8 h-8 mr-2" src={`https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg`} alt="logo" />
                SkyChat
            </Link>
            <div className='lg:w-[55vw] sm:w-[80vw] w-[86vw] border bg-white rounded-lg shadow dark:border dark:bg-slate-900 dark:border-slate-900'>
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6  " onSubmit={handleSubmit(HandleFormSubmit)}>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => < input type="search"{...field} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />}
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.name.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => < input type="search"{...field} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />}
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.email.message}</p>}
                            </div>
                        </div>

                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <Controller
                                    name='password'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input type={PasswordState ? 'search' : 'password'} {...field} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />}
                                />
                                {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {errors.password.message}</p>}

                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <Controller
                                    name='confirm_password'
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input type={PasswordState ? 'search' : 'password'} {...field} id="confirm_password" onInput={() => {
                                        if (ConfirmPassError.length !== 0)
                                            SetConfirmPassError("")
                                    }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />}
                                />
                                {ConfirmPassError && (<p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {ConfirmPassError}</p>)}

                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="ShowPassword" aria-describedby="ShowPassword" onChange={() => SetPasswordState(!PasswordState)} type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="ShowPassword" className="font-light text-gray-500 dark:text-gray-300">Show Password</label>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create an Account</button>

                        <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link href={`/Login`} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>

        </section>
    )
}