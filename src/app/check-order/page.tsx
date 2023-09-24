'use client'
import React from 'react';
import styles from './page.module.css'
import { useRouter } from 'next/navigation';




function Page() {
    
    const router = useRouter();
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const id = event.target[0].value
        router.push(`/check-order/${id}`)
    }

  return (
    <div className={styles.container} >
        <h1>Track order</h1>
        <form className={styles.trackForm} onSubmit={handleSubmit}>
            <p>ID transaksi</p>
            <input type='text' name='transactionId' />
            <button className={styles.button}
            type='submit'> Check order</button>
        </form>
    </div>
  )
}

export default Page