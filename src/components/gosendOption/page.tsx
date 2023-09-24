'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import axios from 'axios'
import useSWR from 'swr'
import { gosendOrder, totalOrder } from '@/types/types'
import { futimes } from 'fs'
import OrderFooter from '../orderFooter/orderFooter'


    function hitungOngkir(jarak:number) : number {
        if (jarak < 10) {
            return 15000
        }else if(jarak > 5 && jarak < 10){
            const jarakTambahan = jarak - 10;
            const totalOngkir = (jarakTambahan * 1500) + 18000;
            return totalOngkir;
        }else if(jarak > 10 && jarak < 20){
            if (jarak <= 11) {
                return 15000
            }
            const totalOngkir = (1500 * jarak) + 3000
            return totalOngkir;
        }else {
            console.log("masuk sini coy");
            console.log(jarak); // 21.01
            const totalOngkir = (2000 * jarak) 
            console.log(totalOngkir); //61525.00000000001
            
            return totalOngkir;
        }
    }
    
    const schedules : Date[]= [new Date(2023,8,19,12,15,0,0),
        new Date(2023,8,29,12,15,0,0),
        new Date(2023,8,18,12,15,0,0),
        new Date(2023,8,17,12,15,0,0),
    ]

    const totalOrderDefault:totalOrder ={
        total: 30000,
        paketBundel: 30000,
        opsiPengambilan: {
            alamatPenerima : null,
            ongkir: 0,
            jadwalPengiriman : null
        }
    }

 function GosendOption() {


    // const alamat = "Jl. Pahlawan No.9, Jati, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61211"
    // const fetcher = (url: string) => axios.post(url,{destination: alamat}).then(res => res.data)
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    //     const {data,  error, isLoading} = useSWR("/api/get-distance",fetcher)

    //     if (error) console.log(error);
    //     if (isLoading) return <p>Loading..</p>;

    //     console.log(data);

        const [jadwalPengiriman, setJadwalPengiriman] = useState("")
        const [totalOrder,setTotal] = useState<totalOrder>(totalOrderDefault)

        async function handleSubmit(e:React.FormEvent<HTMLFormElement>) { 
            e.preventDefault();
            const alamat: string = (`${e.target[0].value}, ${e.target[1].value}, Kec. ${e.target[2].value}, ${e.target[3].value}`)

            
            // const schedulePengiriman : Date = new Date(e.target[4].value)
            const {data} = await axios.post("/api/get-distance",{destination:alamat})

            const ongkir = hitungOngkir(data.jarak)
            const tempOpsiPengambilan: gosendOrder = {
                alamatPenerima : alamat,
                ongkir : ongkir,
                jadwalPengiriman : new Date(e.target[4].value)
            }
            const newTotal = {...totalOrder}
            newTotal.opsiPengambilan = tempOpsiPengambilan
            setTotal(newTotal)
            console.log('JSON.stringify(totalOrder)');
            console.log(JSON.stringify(totalOrder));
        }

        function handleSetPengiriman(e:React.FormEvent<HTMLOptionElement>) {
            e.preventDefault()
            setJadwalPengiriman(e.currentTarget.value)
        }
        
        

    return (
    <div className={styles.container}>
        <div className={styles.formAddressMap}>
        <h1>Address form</h1>
        <p className={styles.eg}>Layanan gosend hanya berlaku untuk surabaya dan sekitarnya</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.fieldName}>Alamat</p>
            <input className={styles.input}></input>
            <p className={styles.eg}>eg.Citraland Waterfront WP 1 No.16</p>
            <p className={styles.fieldName}>Detail alamat</p>
            <input className={styles.input}></input>
            <p className={styles.eg}>Apartment,Rt/Rw, unit, suite, atau floor</p>
            <p className={styles.fieldName}>Kecamatan</p>
            <input className={styles.input}></input>
            <p className={styles.eg}>Lakarsantri, Lidah kulon, Taman</p>
            <p className={styles.fieldName}>Kota</p>
            <select className={styles.city}>
                <option>Surabaya</option>
                <option>Sidoarjo</option>
                <option>Gresik</option>
            </select>
            <p className={styles.eg}>Kota yang dapat menggunakan Gosend</p>
        <p className={styles.fieldName}>Jadwal pengiriman</p>
        <select className={styles.schedule}>
            <option value={''}>Pilih-</option>
            {schedules.map((schedule) => 
            <option key={schedule.toISOString()} 
            value={schedule.toISOString()}
            onChange={handleSetPengiriman}
            >{`${schedule.getDate()}/${schedule.getMonth()}/2023 - ${schedule.getHours()}:${schedule.getMinutes()}`}</option>)}
        </select>
        <p className={styles.eg}>Waktu dikirimkan pesanan</p>

            <button className={styles.insert} type='submit'>Tambahkan</button>
        </form>
      </div>

      {totalOrder.opsiPengambilan.alamatPenerima && <div className={styles.footer}>
        <div className={styles.alamatContainer}>
                <p className={styles.alamatBox}>{totalOrder.opsiPengambilan.alamatPenerima}</p>
        </div>
        <div className={styles.totalPembelian}>
            <div className={styles.totalPembelianLine}>
                <p className={styles.info}>Ongkir: </p>
                <p className={styles.value}>{totalOrder.opsiPengambilan.ongkir.
                toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                })}
                </p>
            </div>
            <div className={styles.totalPembelianLine}>
                <p className={styles.info}>Paket Bundle: </p>
                <p className={styles.value}>{totalOrder.paketBundel.
                toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                })}
                </p>
            </div>
            <div className={styles.totalPembelianLine}>
                <p className={styles.info}>Total: </p>
                <p className={styles.value}>{(totalOrder.paketBundel + totalOrder.opsiPengambilan.ongkir).
                toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                })}

                </p>
            </div>
        </div>
      </div>}

      {totalOrder.opsiPengambilan.alamatPenerima !== null &&
      <OrderFooter opsi={{
                opsi: "gosend"
            }} totalOrder={totalOrder} />
      }
    </div>
  )
}

export default GosendOption