// 'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import CheckStatusPayment from "@/components/checkStatusButton/checkStatusPayment";

async function getData(orderId:string) {
    const res = await fetch(`${process.env.BASE_URL}/api/order/${orderId}`)
    if (res.status !== 201) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }


export default async function Page({ params }: { params: { orderId: string } }) {
    const {orderId} = params

    const data = await getData(orderId)
    
    if (!data) {
            return <div className={styles.container}>
            <h1>Loading...</h1>
        </div>
    }

    const {imageUrl,name,total,paymentUrl,statusPembayaran} = await data

    if (statusPembayaran === "expired") {
        
    }

    if (statusPembayaran === "paid") {
        
    }

    return <div className={styles.container}>
            <Image 
                className={styles.image}
                src={imageUrl}
                width={107}
                height={107}
                alt={""} ></Image>
            <div className={styles.orderInformations}>
                <div className={styles.paragraf}>
                    <p className={styles.rubric}>Order Id:</p>
                    <p className={styles.value}>{orderId}</p>
                </div>
                <div className={styles.paragraf}>
                    <p className={styles.rubric}>nama:</p>
                    <p className={styles.value}>{name}</p>
                </div>
                <div className={styles.paragraf}>
                    <p className={styles.rubric}>Total pembayaran:</p>
                    <p className={styles.value}>{total}</p>
                </div>
            </div>
            <div>
            <a href={paymentUrl} target="_blank"
                className={styles.payBtnContainer} >
            <button className={styles.payBtn} >Bayar sekarang!</button>
            </a>
            <br></br>
            <p className={styles.info}>Jika merasa telah berhasil melakukan pembayaran, cek status pembayaran: </p>

            <CheckStatusPayment orderId={orderId} />
            </div>

        </div>
  }