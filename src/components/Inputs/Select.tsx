import React from 'react'
import makeAnimated from 'react-select/animated'
import ReactSelect from 'react-select';

interface SelectProps {
    label: string;
    id: string;
    // required?: boolean;
    // register: UseFormRegister<FieldValues>,
    // errors: FieldErrors
    disabled?: boolean;
    options: Record<string, any>[];
    value: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
}

export default function Select({ disabled, label, options, value, onChange }: SelectProps) {
    const animatedComponents = makeAnimated()
    return (
        <div className='z-[100] '>
            <label htmlFor="" className='block text-sm text-gray-900 font-medium leading-6 dark:text-gray-100 '>{label}</label>
            <div className='mt-2'>
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    components={animatedComponents}
                    isMulti
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 999
                        }),
                    }}
                    classNames={{
                        control: () => 'text-sm'
                    }}
                />
            </div>
        </div>
    )
}
