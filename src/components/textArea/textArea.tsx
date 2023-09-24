import React from 'react'
import styles from './textArea.module.css'

function TextArea({info,value}:{info:string,value:string}) {
  return (
    <div className={styles.orderInformation}>
          <p className={styles.info}>{info}</p>
          <div className={styles.textArea}>
            <p className={styles.value}>{value}</p>
          </div>
        </div>
  )
}

export default TextArea