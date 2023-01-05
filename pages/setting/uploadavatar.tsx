import React, { ChangeEvent, useEffect, useState } from 'react';
import MainLayout from '../../src/layouts/MainLayout';
import SettingLayout from '../../src/layouts/SettingLayout';
import appAxios from '../../src/middelwares/appAxios';
import { useCookies } from 'react-cookie';

import type { NextPageWithLayout } from '../_app';

const AploadAvatar: NextPageWithLayout = () => {

  const [file, setFile] = useState<File | undefined>();
  const [fileAsString, setFileAsString] = useState<string | undefined>();
  const [cookies, setCookies] = useCookies(['username']);
  const OnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setFile(event.target.files[0])
    }
  }
  const OnSubmit = async () => {
    try {
      if (file) {
        const data = new FormData();
        data.append("image", file);
        const responce = await appAxios.post('/user/profile-image', data ,
          {
            headers: {
              authorization:
                "Bearer " + cookies.username,
            },
          })
        console.log(responce);
      }


    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (event.target) {
          setFileAsString(event.target.result as string);
        }
      }
    }
  }, [file])
  return (
    <SettingLayout>
      <>
        <div>
          <input onChange={OnInputChange} type='file' accept='image/*' />
          <button type='submit' onClick={OnSubmit}>upload</button>
          {fileAsString ? <img src={fileAsString} className='w-36 h-36' /> : <></>}
        </div>
      </>
    </SettingLayout>
  )
}


AploadAvatar.getLayout = (page) => <MainLayout>{page}</MainLayout>
export default AploadAvatar;