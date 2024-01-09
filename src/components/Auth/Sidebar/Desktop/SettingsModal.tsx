"use client"
import Input from '@/components/Inputs/Input';
import Modal from '@/components/Modal';
import { User } from '@prisma/client';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface SettingsModalProps {
    OpenModal: boolean
    CloseModal: () => void;
    currentUser: User
}

export default function SettingsModal({ OpenModal, CloseModal, currentUser }: SettingsModalProps) {
    const router = useRouter();
    const [Loading, SetLoading] = useState<boolean>(false)
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    })

    const image = watch('image')

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, { shouldValidate: true })
    }

    const Submit: SubmitHandler<FieldValues> = (data) => {
        SetLoading(true);
        axios.post(`/api/settings`, data)
            .then(() => {
                router.refresh();
                CloseModal();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => SetLoading(false))
    }
    return (
        <Modal isOpen={OpenModal} Close={CloseModal}>
            <form onSubmit={handleSubmit(Submit)} method="post">
                <div className='space-y-12   '>
                    <div className='border-b border-gray-900/10 pb-12 '>
                        <h2 className=' text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 '>Profile</h2>
                        <p className=' mt-1 text-sm leading-6 text-gray-600 dark:text-gray-500 '>Edit your profile</p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={Loading}
                                label='Name'
                                id='name'
                                errors={errors}
                                required
                                register={register}
                            />
                            <div>
                                <label htmlFor="" className='text-sm leading-6 text-left text-gray-900 dark:text-gray-100 block'>
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3 ">
                                    <Image width={50} height={50} src={image || currentUser.image || '/Images/NoProfilePic.png'} className=' h-14 w-14 object-cover rounded-full' alt='UserProfile' />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset='ignl1cjx'
                                    >
                                        <button disabled={Loading} type='button'>Change</button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6 flex items-center justify-end gap-x-6'>
                        <button type="button" disabled={Loading} onClick={CloseModal}> Cancel</button>
                        <button type="submit">{Loading ? 'Loading...' : 'Save'}</button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
