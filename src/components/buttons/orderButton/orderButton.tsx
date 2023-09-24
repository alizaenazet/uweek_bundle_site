'use client'
import React from 'react'
import styles from "./orderButton.module.css";
import  { gosendOrder, insertOrder, orderInfo, pickupOptions, pilihanOpsiPengambilan, totalOrder }  from '@/types/types';
import { nanoid } from 'nanoid';
import { useOrderStore } from '@/utils/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';

    function createInsertOrderData(clientInformations: orderInfo,totalOrder: totalOrder, opsiPenambilan: string, transactionId: string) {
        const hargaBundle = 30000
        const {namaLengkap, NIM , namaKelompok, noKelompok, jurusan, idLine,image} = clientInformations

        transactionId = transactionId + '-' + noKelompok
        let orderInformations:insertOrder;

        // chect the order option  
        if (opsiPenambilan === 'pick-up'   ) {
            const opsi :pickupOptions= totalOrder.opsiPengambilan
            orderInformations = {
               _id: transactionId, // error ga tau anjer
               nama_lengkap: namaLengkap,
               nim: parseInt(NIM),
               nama_kelompok: namaKelompok,
               no_kelompok: noKelompok,
               jurusan: jurusan,
               id_line: idLine,
               total: hargaBundle,
               status: 'pending',
               created_at: new Date() ,
               opsi_pengambilan: {
                   opsi: 'pick-up',
                   tempatPengambilan: opsi.tempatPengambilan,
                   waktu: opsi.waktu,
               }
           }
        }else {
            const opsi :gosendOrder= totalOrder.opsiPengambilan
            console.log('opsi.ongkir');
            console.log(opsi.ongkir);
            
            if (!opsi.ongkir) {
                throw new Error("ongkir bernilai null");
            }
            orderInformations = {
                _id: transactionId,
               nama_lengkap: namaLengkap,
               nim: parseInt(NIM),
               nama_kelompok: namaKelompok,
               no_kelompok: noKelompok,
               jurusan: jurusan,
               id_line: idLine,
               total: (hargaBundle + opsi.ongkir),
               status: 'pending',
               created_at: new Date() ,
                opsi_pengambilan: {
                    opsi: 'gosend',
                    alamatPenerima : opsi.alamatPenerima,
                    ongkir : opsi.ongkir,
                    jadwalPengiriman : opsi.jadwalPengiriman
                }
            }
        }
        
        return orderInformations;
    }






function OrderButton({opsiPengambilan,totalOrder} :{opsiPengambilan:pilihanOpsiPengambilan,totalOrder:totalOrder}) {    
    const clientInformations = useOrderStore((state) => state.userOrderInfo)
    const router = useRouter();


    let transactionId:string = nanoid(5)
    if (opsiPengambilan.opsi === "gosend") {
        transactionId = "GS-"+ transactionId;
    }else if (opsiPengambilan.opsi === "pick-up") {
        transactionId = "PU-"+transactionId;
    }else {
        console.log("error opsi transaction");
    }
    


    async function handleClick() {
        
        // create orderData to compatible with Db requirement
       const dataToinsert:insertOrder = createInsertOrderData(clientInformations,totalOrder,opsiPengambilan.opsi,transactionId)

       // convert Json dataToinsert to string and imageFile to fromData
       const formData = new FormData();
        formData.append("orderInformation",JSON.stringify(dataToinsert))
        formData.append('imageFile',clientInformations.image);
        // post request to order api
        const {status,data} = await axios.post("/api/order",formData)
        
        // check te status 
        if (status !== 201 ) {
            throw new Error("order failed")
        }

        // continue to payment page
        router.push(`/order/invoice/${dataToinsert._id}`)
    }

  return (
        <button className={styles.container} onClick={handleClick}>Order Now</button>
  )
}

export default OrderButton