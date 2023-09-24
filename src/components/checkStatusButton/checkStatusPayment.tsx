'use client'
 import React, { useState } from 'react'
 import styles from './checkStatusPayment.module.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'

 
 function CheckStatusPayment({orderId}: {orderId: string}) {
    const [checking, setChecking] = useState<boolean>(false)
    const router = useRouter()
    
    
    async function handleCheck() {
       
        const {data} = await axios.get(`/api/order/payment/${orderId}`)
        const {isPaid} = await data
        if (isPaid) {
            router.push(`/check-order/${orderId}`)
        }
        setChecking(true)
     }


     return (
     <div>
        <button
        className={styles.container}
        onClick={handleCheck}
     >
        Cek status pembayaran
     </button>
     {checking && <p className={styles.info}>Pesanan belum terbayar</p>}
     </div>
   )
 }
 
 export default CheckStatusPayment