import { ObjectId } from "mongodb"

export type orderInfo = {
    namaLengkap:string
        NIM:string
        namaKelompok:string
        noKelompok:number
        jurusan:string
        idLine: string
        image:any
}


export type pilihanOpsiPengambilan = {
    opsi: "pick-up" | "gosend" | ""
}

export type pickupOptions = {
    tempatPengambilan : string
    waktu : Date
    // new Date(year, month, date, hours, minutes, seconds, ms)
}
     type pickupOptionsInsert = {
        opsi : string
        tempatPengambilan : string
        waktu : Date
    // new Date(year, month, date, hours, minutes, seconds, ms)
}

export type gosendOrder = {
    alamatPenerima : string | null
    ongkir : number | null
    jadwalPengiriman : Date | null
}
   export type gosendOrderInsert = {
        opsi : string
        alamatPenerima : string | null
        ongkir : number | null
        jadwalPengiriman : Date | null
}



export type totalOrder = {
    total : number
    paketBundel : number
    opsiPengambilan : gosendOrder |  pickupOptions 
}

export type insertOrder = {
    _id : string
    nama_lengkap : string
    nim: number;
    nama_kelompok : string;
    no_kelompok : number;
    jurusan : string;
    id_line: string;
    image_url? : string;
    total : number;
    status: "pending" | "paid" | 'expired';
    payment_url? : string
    created_at : Date;
    opsi_pengambilan : gosendOrderInsert | pickupOptionsInsert

}


export type itemDetail = {
    id:string
    price: number
    quantity : number
    name : string
    merchantname : string
}
