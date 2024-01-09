import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <section className="bg-white dark:bg-gray-900 h-screen flex items-center justify-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 my-auto">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-sky-600 dark:text-sky-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{"Something's"} missing.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we {"can't"} find that page. {"You'll"} find lots to explore on the home page. </p>
                    <Link href="/" className="inline-flex text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-sky-900 my-4">Back to Homepage</Link>
                </div>
            </div>
        </section>
    )
}
