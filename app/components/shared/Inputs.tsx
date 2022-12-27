import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik';


interface PropsField {
    name: string,
    type: string,
    placeholder: string

}

const Inputs: React.FC<PropsField> = ({ name, type, placeholder }) => {
    return (
        <div>
            <Field className='my-2 p-1' name={name} type={type} placeholder={placeholder} />
            <div>
                <ErrorMessage className='text-red-700 text-left text-sm ml-1' name={name} component='a' />
            </div>
        </div>
    )
}


export default Inputs;
