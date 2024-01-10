'use client'
import Link from "next/link"

// Error components must be Client Components


export default function ErrorHandler({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <section className="bg-white dark:bg-gray-900 h-screen flex items-center justify-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 my-auto">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">There was a problem</h1>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Please try later or contact support if the problem persist </p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <button onClick={() => reset()} className="inline-flex text-white bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-sky-900 my-4">Try Again</button>
                        <Link href={`/`}>Back to Homepage</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}