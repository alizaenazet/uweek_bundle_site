import React from 'react'
import styles from './page.module.css'
import Image from 'next/image';
import TextArea from '@/components/textArea/textArea';
import dbConnect from '@/utils/user-db/db';
import gosendOrder from '@/models/gosendOrder';
import pickupOrder from '@/models/pickupOrder';

async function page({params,gosend,pickup} : {
    params: {id : string},

    gosend: React.ReactNode,
    pickup: React.ReactNode 
    }) 
   
   {
  const {id} = params
  const orderOption = id.substring(0,2);
  
  if (orderOption.localeCompare("GS") !== 0 && orderOption.localeCompare("PU") !== 0) {
    return <div>
      <h2>Order not valid</h2>
    </div>
  }
  
  // let order
  // await dbConnect()
  // switch (orderOption) {
  //   case "GS":
  //     order = await gosendOrder.findById(id)
  //     break;
  //     case "PU":
  //       order = await pickupOrder.findById(id)
  //     break;
  // }

  // if (!order) {
  //   return <div>
  //     <h2>Order not found</h2>
  //   </div>
  // }

  const order = {
    _id: 'PU-NlARQ-66',
    nama_lengkap: 'antonio mewci',
    nim: 923432422243,
    nama_kelompok: 'marengge',
    no_kelompok: 66,
    jurusan: 'IMT',
    id_line: 'line aku',
    image_url: 'https://oweek-bundling-profile-img.s3.ap-southeast-3.amazonaws.com/9234324222433.png2023-08-01T15%3A20%3A27.599Z?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAWJ46WHK4HSZ35RX3%2F20230801%2Fap-southeast-3%2Fs3%2Faws4_request&X-Amz-Date=20230801T152028Z&X-Amz-Expires=900&X-Amz-Signature=dfae6f05fd47cd4dfa88bf656d757b6ee6389f09c3eaba9c4abc8b67a67d9c86&X-Amz-SignedHeaders=host&x-id=GetObject',
    total: 30000,
    status: 'pending',
    payment_url: 'https://app.sandbox.midtrans.com/snap/v3/redirection/a9048994-82e5-4faf-b30d-aa7aa439b874',
    created_at: new Date("2023-08-01T15:20:25.799Z"),
    tempat_pengambilan: 'kopte Uc walk',
    waktu: new Date("2023-09-21T06:31:00.000Z"),
    __v: 0
  }

  console.log("order");
  console.log(order);
  
  const {nama_lengkap,nama_kelompok,no_kelompok,status,image_url} = order
  
  return (
    <div className={styles.container}>
      <p>Preview</p>
      <div className={styles.informations}>
        <div className={styles.image}>
          <Image src={image_url} alt={''}
              width={150}
              max-width={174}
              height={247}
              max-height={247}
          ></Image>
        </div>
        <div className={styles.textArea}>
        <TextArea info={'Order Id'} value={id} />
        <TextArea info={'Nama lengkap'} value={nama_lengkap} />
        <TextArea info={'Nomor kelompok'} value={no_kelompok.toString()} />
        <TextArea info={'Nama kelompok'} value={nama_kelompok} />
        </div>
      </div>
        <div className={styles.bottomTextArea}>
        <TextArea info={'Status pembayaran'} value={status} />
        </div>

    </div>
  )
}

export default page