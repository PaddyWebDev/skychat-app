"use client"
import useConversation from '@/hooks/useConversation'
import axios from 'axios';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Img from './Img';
import MessageInput from './MessageInput';
import { SendHorizontal } from 'lucide-react';
import { CldUploadButton } from 'next-cloudinary';
export default function Form() {
    const { conversationId } = useConversation();
    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true })
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

    function HandleUpload(result: any) {
        axios.post(`/api/messages`, {
            image: result?.info?.secure_url,
            conversationId
        })
    }
    return (
        <div
            className='py-4 px-4  bg-white dark:bg-neutral-800 border-t border-neutral-200  dark:border-neutral-700 flex items-center gap-2 lg:gap-4 w-full'
        >
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={HandleUpload}
                uploadPreset='ignl1cjx'
            >
                <Img />
            </CldUploadButton>
            <form className='flex items-center gap-2 lg:gap-4 w-full' onSubmit={handleSubmit(onSubmit)} method="post">
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Message"
                />
                <button
                    className=' rounded-full p-2 bg-sky-500 hover:bg-sky-600 cursor-pointer'
                    type="submit">
                    <SendHorizontal size={18} className='text-white' />
                </button>
            </form>
        </div>
    )
}
