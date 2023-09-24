import { NextResponse } from "next/server";
import gosendOrder from '@/models/gosendOrder';
import pickupOrder from '@/models/pickupOrder';
import { dbConnect,dbDisconnect } from "@/utils/user-db/db";



export async function GET(request: Request,{params}:{params:{transactionId:string}|null}) {
    
    
    if (!params) {
      const response = {
          message : "orderId must be required",
      }
      return NextResponse.json(response,{status : 400})
    }


    const {transactionId} = params
    console.log(transactionId);
    

    const idCode = transactionId.substring(0, 2);
    let order;


    await dbConnect()
    if (idCode === "GS") {
        order = await gosendOrder.findById(transactionId);
    }else{
        order = await pickupOrder.findById(transactionId);
    }
    await dbDisconnect()


    if (!order) {
        const response = {
            message:"order not found"
        }
        return NextResponse.json(response,{status: 200})
    }
    
    const {total,nama_lengkap,payment_url,image_url,status} = order
    const response = {
        name: nama_lengkap,
        total: total,
        paymentUrl: payment_url,
        imageUrl: image_url,
        statusPembayaran: status
    }
    return NextResponse.json(response,{status: 201})
  }