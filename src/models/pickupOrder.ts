import mongoose from "mongoose";

const {Schema} = mongoose

    interface PickUp {
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
        tempat_pengambilan:string,
        waktu:Date
    }

const pickupOrderSchema = new Schema<PickUp>(
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
        tempat_pengambilan : {
            type: String,
            required: true,
        },
        waktu : {
            type: Date,
            required: true,
        }
        
    }
)

export default mongoose.models.PickupOrder || mongoose.model("PickupOrder",pickupOrderSchema)