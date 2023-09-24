import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
// import WelcomePageNavbar from '@/components/welcomePageNavbar/welcomePageNavbar'


const informations : {title:string,desc:string}[] = [
  {
    title: "Kenapa jasa kami ?",
    desc: "Tidak perlu bingung terkait semua kerpeluan  persyaratan O-week, semua barang-barang akan kami sediakan dan dipastikan sesuai dengan kriteria persyaratan O-week."
  },

  {
    title: "Bagaimana caranya ?",
    desc: "Sederhana saja, anda hanya perlu melakukan tahap-tahap pemesanan yang sudah kami sediakan termasuk memilih metode pengambilan yang tersedia, lalu anda perlu membayar tagihan dan menunggu pesanan anda selesai"
  },
  
  {
    title: "Pembayaran ?",
    desc: "Pembayaran sepenuhnya cashless menggunakan berbagai methode pembayaran, berikut metode yang kami sediakan : QRIS, Gopay, Bca-VA, Merchant indomaret/alfamaret dll"
  },

  {
    title: "Pengambilan ?",
    desc: "Pesanan memiliki 2 opsi pengambilan, yaitu  Pick-up OTS,  terdapat beberapa opsti jadwal pengambilan pesanan dan Go-send.pesanan diantar sesuai alamat yang ditentukan"
  },
]

function Page() {
return (
    <div className={styles.container}>
      <h1>O-week bundling</h1>
      <Image 
        src="https://image.dummyjson.com/372x346?text=Poster+jualan"
        alt=''
        width={372}
        height={346}
        className={styles.posterImg}
      />
        <div className={styles.informations} >
      {informations.map((element:{title:string,desc:string}) => {
        return (
      <div className={styles.item} key={element.title}>
        <h1>{element.title}</h1>
        <p>{element.desc}</p>
      </div>
      )
    })
  }
  </div>
  {/* <WelcomePageNavbar /> */}
    </div>
  )
}

export default Page