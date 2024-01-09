"use client"
import Input from '@/components/Inputs/Input';
import Select from '@/components/Inputs/Select';
import Modal from '@/components/Modal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface GroupChatModalProps {
    OpenModal: boolean;
    CloseModal: () => void;
    users: User[]
}
export default function GroupChatModal({ OpenModal, CloseModal, users }: GroupChatModalProps) {
    const router = useRouter()
    const [isLoading, SetisLoading] = useState<boolean>(false)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    })

    const members = watch('members')

    const Submit: SubmitHandler<FieldValues> = (data) => {
        SetisLoading(true)
        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        }).then(() => {
            router.refresh()
            CloseModal();
        }).catch(() => toast.error('Something went wrong!'))
            .finally(() => SetisLoading(false))
    }

    return (
        <Modal isOpen={OpenModal} Close={CloseModal}>
            <form onSubmit={handleSubmit(Submit)} method="post">
                <div className=' space-y-12 '>
                    <div className='border-b border-gray-900/10 pb-12  '>
                        <h2 className='text-base font-semibold leading-7 text-gray-900 dark:text-gray-100'> Create a Group Chat</h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600 dark:text-gray-500'>Create a chat with more than 2 people</p>
                        <div className='mt-10 flex flex-col gap-y-8 '>
                            <Input register={register} label='Name' id='name' disabled={isLoading} errors={errors} />
                            <Select disabled={isLoading} id='members' label='Members' options={users.map((user) => ({
                                value: user.id,
                                label: user.name
                            }))}
                                onChange={(value) => setValue('members', value, { shouldValidate: true })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <hr className="h-px bg-neutral-200 border-0 dark:bg-neutral-700" />
                <div className='mt-6 flex items-center justify-end gap-x-6 '>
                    <button type="button" disabled={isLoading} onClick={CloseModal} >Cancel</button>
                    <button type='submit' disabled={isLoading} className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800" > {isLoading ? 'Loading...' : 'Save'}</button>
                </div>
            </form>
        </Modal>
    )
}
