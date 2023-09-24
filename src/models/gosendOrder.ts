import mongoose from "mongoose";

const {Schema} = mongoose

    interface Gosend {
        _id : string,
        nama_lengkap: string,
        nim: number,
        nama_kelompok: String,
        no_kelompok: number,
        jurusan:string,
        id_line:string,
        image_url:string,
        total:number,
        status: "pending" | "paid" | 'expired',
        payment_url:string,
        created_at:Date,
        alamat_penerima: string,
        ongkir: number,
        jadwal_pengiriman: Date
    }

const gosendOrderSchema = new Schema<Gosend>(
    {
        _id:{
            type: String,
            unique: true,
            required: true,
        },
        nama_lengkap: {
            type: String,
            required: true,
        },
        nim: {
            type: Number,
            required: true,
        },
        nama_kelompok: {
            type: String,
            required: true,
        },
        no_kelompok: {
            type: Number,
            required: true,
        },
        jurusan: {
            type: String,
            required: true,
        },
        id_line: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        payment_url: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            required: true,
        },
        alamat_penerima: {
            type: String,
            required: true,
        },
        ongkir: {
            type: Number,
            required: true,
        },
        jadwal_pengiriman: {
            type: Date,
            required: true,
        },


        
    }
)

export default mongoose.models.GosendOrder || mongoose.model("GosendOrder",gosendOrderSchema)