import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import TextArea from '@/components/textArea/textArea'

function Gosend() {
  return (
    <div className={styles.container}>
      <h3>Informasi pengiriman</h3>
      <div className={styles.informations}>
        <div className={styles.image}>
              <Image 
                width={108}
                max-width={108}
                height={160}
                max-height={160}
                src={'https://image.dummyjson.com/108x160'} 
                alt={''}
              />
        </div>
        <div className={styles.fields}>
          <TextArea info={'Status pengiriman'} value={'Insert'} />
          <TextArea info={'Link lacak'} value={'Insert'} />
          <TextArea info={'Jadwal pengiriman'} value={'Insert'} />
        </div>
      </div>
          <TextArea info={'Alamat pengiriman'} value={'Insert'} />
    </div>
  )
}

export default Gosend