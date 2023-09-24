'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import {useOrderStore} from '@/utils/store'
import { orderInfo } from "@/types/types";
import { useRouter } from 'next/navigation'



function Page() {
    const [imgPreview , setImgPreview] = useState()
    const [imgFile, setImgFile] = useState<File>()
    const orderStore = useOrderStore((state) => state.userOrderInfo)
    const createOrder = useOrderStore((state) => state.insertOrder)
    const router = useRouter();

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        const newOrderInfo : orderInfo = {
            namaLengkap: e.target[0].value,
            NIM: e.target[1].value,
            namaKelompok: e.target[2].value,
            noKelompok: parseInt(e.target[3].value),
            jurusan: e.target[4].value,
            idLine : e.target[6].value,
            image: imgFile
        }
            console.log("submit button clicked");
              createOrder(newOrderInfo)
        router.push('/order/metode-pengambilan')
    }

    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        if (e?.target?.files?.[0]) {
            const file = e.target.files[0];
            setImgFile(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result )
            }
            reader.readAsDataURL(file)        
        }
    
    }

  return (
    <div className={styles.container}>
        <h1 className={styles.heading}>Order form</h1>
        <form className={styles.orderForm} onSubmit={handleSubmit}>
            <p>Nama lengkap</p>
            <input className={styles.input} type='text'/>
            <p>NIM</p>
            <input className={styles.input} type='text'/>
            <p>Nama kelompok</p>
            <input className={styles.input} type='text'/>
            <p>No kelompok</p>
            <input className={styles.input} type='text'/>
            <p>jurusan</p>
            <select>
                <option>IMT</option>
                <option>ISB</option>
                <option>IBM</option>
                <option>VCD</option>
            </select>
            <p>Upload foto diri</p>
            <input className={styles.input} 
                accept="image/*"
                type='file'
                onChange={handleChange}/>
        {imgPreview ?
         <Image
            className={styles.img}
            max-width={200}
            width={200}
            height={200}
            max-height={200}
            src={imgPreview}
            alt=''
            /> 
            : <p>Upload your picture</p>}
        <p>Id line</p>
            <input className={styles.input} type='text'/>
        <label>
            <input type="checkbox" value="true" required></input>
            saya telah memastikan data yang dimasukan sudah benar
        </label>
            <button type='submit'>Order</button>
        </form>
    </div>
  )
}

export default Page