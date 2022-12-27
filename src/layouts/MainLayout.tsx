import React, { ReactElement, useState } from 'react';
import { useAppSelector } from '../hooks/useRedux';
import { useAppDispatch } from '../hooks/useRedux';
import { setIsOpen } from '../redux/slices/cartSlice';
import { NextPage } from 'next';
import Link from 'next/link';
import useUser from '../hooks/useUser';

interface mainLayoutProps {
  children: ReactElement,
}

const MainLayout: NextPage<mainLayoutProps> = ({ children }) => {
  const cartState = useAppSelector((state) => state.cartReducer);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data, error } = useUser();


  return (
    <div>
      <div className='header bg-regal-blue text-white font-bold py-2 px-4'>
        <Link href={"/"} className='hover:text-hover-blue'>Home</Link>
        <div className='top-menu float-right flex'>
          <div className='relative'>
            <button onClick={() => { dispatch(setIsOpen(true)) }} className='hover:text-hover-blue'>Cart</button>
            {cartState.IsOpen &&
              <>
                <div className='z-50 absolute overflow-y-auto min-w-[300px] min-h-[500px] max-h-[500px] bg-[#d4c8ff] mt-2 right-0 top-full'>
                  <div className='max-h-full'>
                    <ul>
                      {cartState.carts.map((item) => {
                        return <li key={item._id} className='w-full flex p-4'>
                          <img src={item.image} className='w-12 h-12 object-contain' />
                          <div className='w-full flex justify-between items-center'>
                            <h2 className='text-black text-base'>{item.name}</h2>
                            <h4 className='text-black text-base'>{item.price}$</h4>
                          </div>
                          <div>{item.count}</div>
                        </li>
                      })}
                    </ul>
                  </div>
                </div>
              </>
            }

          </div>
          {data && !error ?
            <div className='relative'>
              <button onClick={() => { setOpen(true) }} className='hover:text-hover-blue ml-2'>{data.user.email}</button>
              {open &&
                <>
                  <div className='menu z-50 absolute top-8 overflow-y-auto text-regal-blue p-2 min-w-[110px] min-h-[120px] max-h-[120px] bg-[#d4c8ff] left-0'>
                    <div className='border-b-[1px] border-[#b4a8df]'>
                      <Link href='/profile' className='hover:text-hover-blue'>Profile</Link>
                    </div>
                    <div className='border-b-[1px] border-[#b4a8df]'>
                      <Link href='#' className='hover:text-hover-blue'>Orders</Link>
                    </div>
                    <div className='border-b-[1px] border-[#b4a8df]'>
                      <Link href='#' className='hover:text-hover-blue'>Setting</Link>
                    </div>
                    <div>
                      <Link href='#' className='hover:text-hover-blue'>Log Out</Link>
                    </div>
                  </div>
                </>
              }
            </div>
            : <Link href='/auth/signin' className='hover:text-hover-blue pl-3'>Login</Link>}

        </div>
      </div>
      <div className='main bg-[#fbfbfb] font-bold py-2 px-4'>{children}</div>
      {cartState.IsOpen || open ?
        <div onClick={() => { dispatch(setIsOpen(false)); setOpen(false) }} className=' fixed left-0 right-0 top-0 button-0 w-full h-full z-10'></div>
        : <></>
      }
    </div>
  )
}

export default MainLayout;
