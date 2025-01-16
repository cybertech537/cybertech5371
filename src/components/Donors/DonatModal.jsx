'use client'
import React from 'react';
import { Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import DonateForm from './DonateForm';
// import AddCategoryForm from '../form/AddCategoryForm';

const DonateModal = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className=''>
            <button onClick={() => setIsOpen(true)} className='btn btn-primary'>Donate</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black bg-opacity-25 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-h-[90vh] max-w-96 overflow-auto space-y-4 border bg-white p-5 w-full shadow-2xl">
                        <div>
                            <DonateForm setIsOpen={setIsOpen} />
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
};

export default DonateModal;