import React, { memo } from 'react';
import type { FC } from 'react';
import Spiner from './Spiner';

interface ButtonProps {
    onClick?: () => void;
    text: string;
    className?: string;
    type: "button" | "submit" | "reset" | undefined;
    loading?: boolean;
}

const Button: FC<ButtonProps> = ({ onClick, text, className, type, loading = false }) => {
    return (
        <button onClick={!loading ? onClick : () => { }} type={type} className={`bg-regal-blue text-white p-2 font-medium rounded ${className}`}>
            {!loading ? <div>{text}</div>
                : <div className='flex w-full h-full justify-center items-center'>
                    <Spiner size={12} className="mx-auto" />
                </div>}
        </button>
    )
}

export default memo(Button);