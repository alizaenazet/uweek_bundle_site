'use client'
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
import {useOrderStore,useOpsiPengambilan} from '@/utils/store';
import { stringify } from 'querystring';
import Link from 'next/link';



function Page() {
    const [choosedOpsiPengambilan,setChoosedOpsiPengambilan] = useState<"pick-up" | "gosend" | "" >("")
    const orderInformations = useOrderStore((state) => state.userOrderInfo)
    const setOpsiPengambilan = useOpsiPengambilan((state) => state.setPengambilan)
    console.log("stringify(orderInformations)");
    console.log(stringify(orderInformations));
    console.log(orderInformations.image);
    
    useEffect(()=> {
        setOpsiPengambilan(choosedOpsiPengambilan)
    },[choosedOpsiPengambilan])
    
    if (!orderInformations.jurusan) {
        return <p>Restriced page not allowed</p>
    }
    
    function buttonDisplay() {
        if (choosedOpsiPengambilan === "pick-up") {
            return <div className={styles.buttons}>
                <button className={styles.disableButton} disabled>Pick-up</button>
                <button className={styles.button} onClick={() => setChoosedOpsiPengambilan("gosend")} >Gosend</button>
            </div>
        }else if(choosedOpsiPengambilan === "gosend") {
            return <div className={styles.buttons}>
                <button className={styles.button} onClick={() => setChoosedOpsiPengambilan("pick-up")}>Pick-up</button>
                <button className={styles.disableButton} disabled>Gosend</button>
            </div>
        }else {
            return <div className={styles.buttons}>
                <button className={styles.button} onClick={() => setChoosedOpsiPengambilan("pick-up")}>Pick-up</button>
                <button className={styles.button} onClick={() => setChoosedOpsiPengambilan("gosend")} >Gosend</button>
            </div>
        }
    }
    
    return (
    <div className={styles.container}>
        <h2>Tipe pengiriman</h2>
            {
            buttonDisplay()
            }
        {choosedOpsiPengambilan === "" && <h2>Pilih opsi pengambilan</h2>}
    </div>
  )
}

export default Page