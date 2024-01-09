"use client"
import Modal from '@/components/Modal';
import Image from 'next/image';
import React from 'react'

interface ImageModalProps {
    src: string | null,
    OpenModal: boolean
    CloseModal: () => void;
}

export default function ImageModal({ OpenModal, CloseModal, src }: ImageModalProps) {
    if (!src) {
        return null;
    }
    return (
        <Modal isOpen={OpenModal} Close={CloseModal}>
            <div className="w-80 h-80">
                <Image alt='ConversationImage' className=' object-cover ' src={src} fill />
            </div>
        </Modal>
    )
}
