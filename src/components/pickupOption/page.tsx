'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import { pickupOptions, totalOrder } from '@/types/types'
import OrderFooter from '../orderFooter/orderFooter'


const listOfPickupSchedule : pickupOptions[] = [
    {
        tempatPengambilan : "kopte Uc walk",
        waktu : new Date(2023, 8, 21, 13, 31, 0)
    },
    {
        tempatPengambilan : "kopte2 Uc-walk",
        waktu : new Date(2023, 8, 18, 13, 11, 0)
    },
    {
        tempatPengambilan : "kopte3",
        waktu : new Date(2023, 8, 24, 13, 18, 0)
    },
]

function PickupOption() {
    const defaultOrder : totalOrder = {
        total: 3000,
        paketBundel: 3000,
        opsiPengambilan: {
            tempatPengambilan : "",
            waktu : new Date(0,0,0)
        }
    }

    const [order, setOrder] = useState<totalOrder>(defaultOrder)
    
  return (
    <div className={styles.container}>
        <h2>Jadwal pengambilan</h2>
        <br></br>
        <div className={styles.tables}>
            <table className={styles.table}>
                <tr>
                    <th className={styles.th}> </th>
                    <th className={styles.th}>Tempat pengambilan</th>
                    <th className={styles.th}>Waktu</th>
                    <th className={styles.th}>Tanggal</th>
                </tr>

            {listOfPickupSchedule.map((schedule) => (
                <tr 
                    className={styles.schedule}
                    key={schedule.waktu.toISOString()+schedule.tempatPengambilan}>
                    <td className={styles.selectSchedule} >
                        <input type='radio' name="selectSchedule"  onClick={()=> {
                        let newOrder = {...order}
                        newOrder.opsiPengambilan = schedule
                        setOrder(newOrder)
                            }
                        } value={JSON.stringify(schedule)}/>
                        </td>
                    <td className={styles.td}>{schedule.tempatPengambilan}</td>
                    <td className={styles.td}>{schedule.waktu.getHours()}.{schedule.waktu.getMinutes()}</td>
                    <td className={styles.td}>{schedule.waktu.getMonth()}/{schedule.waktu.getDate()}/{schedule.waktu.getFullYear()}</td>
                </tr>
            ))}
            </table>
        </div>
            {order.opsiPengambilan.tempatPengambilan != "" && <div className={styles.pickUpOptionDisplay}>
                        <p>{order.opsiPengambilan.tempatPengambilan}</p>
                        <p>{order.opsiPengambilan.waktu.getHours()} : {order.opsiPengambilan.waktu.getMinutes()}</p>
                        <p>{order.opsiPengambilan.waktu.getMonth()}/{order.opsiPengambilan.waktu.getDate()}/{order.opsiPengambilan.waktu.getFullYear()}</p>
            </div> || <p className={styles.instruction}>Pilih jadwal</p>}
            <div className={styles.totalContainer}>
                <div className={styles.totalContainerLine}>
                <p className={styles.info}>Paket bundle: </p>
                <p>{order.paketBundel}</p>
                </div>
                <div className={styles.totalContainerLine}>
                <p className={styles.info}>Total: </p>
                <p>{order.total}</p>
                </div>
            </div>
            <br></br>
            {order.opsiPengambilan.tempatPengambilan !== "" &&
            <OrderFooter opsi={{
              opsi: "pick-up"
          }} totalOrder={order} />
            }
    </div>
  )
}

export default PickupOption