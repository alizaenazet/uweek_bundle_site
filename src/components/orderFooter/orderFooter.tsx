import React from 'react'
import styles from './orderFooter.module.css'
import MobileButton from '../buttons/mobile/mobileButton'
import OrderButton from '../buttons/orderButton/orderButton'
import { pilihanOpsiPengambilan, totalOrder } from '@/types/types'

function OrderFooter({opsi,totalOrder}:{opsi:pilihanOpsiPengambilan,totalOrder:totalOrder}) {
  return (
    <div className={styles.container}>
        <OrderButton opsiPengambilan={{
              opsi: opsi.opsi
          }} totalOrder={totalOrder}/>
    </div>
  )
}

export default OrderFooter