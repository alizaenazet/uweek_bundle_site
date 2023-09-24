import Link from 'next/link'
import React from 'react'
import styles from "./button.module.css";



function MobileButton({url,text} : {url:string, text:string}) {
  return (
    <Link href={url}>
    <button className={styles.container}>{text}</button>
    </Link>
  )
}

export default MobileButton