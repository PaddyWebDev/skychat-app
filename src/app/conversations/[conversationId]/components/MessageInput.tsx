import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface MessageInputProps {
    placeholder?: string,
    required?: boolean,
    type?: string,
    id: string,
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}
export default function MessageInput({ placeholder, required, type, id, register, errors }: MessageInputProps) {
    return (
        <div className='relative w-full  '>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type={type}
                id={id}
                placeholder={placeholder || ""}
                {...register(id, { required })}
            />
        </div>
    )
}
