import axios from "axios"
import { NextResponse } from "next/server"


export async function GET(request: Request,{params}:{params:{transactionId:string}|null}) {
    
    if (!params) {
        const response = {
            message : "orderId must be required",
        }
        return NextResponse.json(response,{status : 400})
      }
  
    
    const {transactionId} = params
    
    const baseUrl = process.env.DEV_MIDTRANS_BASE_URL
    const serverKey = process.env.DEV_MIDTRANS_SK 
    if (!baseUrl || !serverKey) {
        throw new Error("Env variabel not detected")
    }
    const url = `https://api.sandbox.midtrans.com/v2/${transactionId}/status`
        const {data} = await axios.get(url,{
            auth:{
                username: serverKey,
                password:""
            }
        })
        const {status_code, transaction_status} = data

        if (status_code == 200 && transaction_status === "settlement") {    
            const response = {
                isPaid:true
            }
            return NextResponse.json(response,{status : 200})
        }

        const response = {
            isPaid:false
        }
    return NextResponse.json(response,{status : 200})
        }
