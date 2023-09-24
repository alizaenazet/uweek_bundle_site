import { NextResponse } from 'next/server'
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {getSignedUrl}  from '@aws-sdk/s3-request-presigner'
import { gosendOrderInsert, insertOrder, itemDetail } from '@/types/types';
import { url } from 'inspector';
import axios from 'axios';
import {dbConnect,dbDisconnect} from '@/utils/admin-db/db';
import fs from 'fs'
import { headers } from 'next/dist/client/components/headers';
import gosendOrder from '@/models/gosendOrder';
import pickupOrder from '@/models/pickupOrder';





    async function insertS3(image:any,nim:string) {
        
        let file;
        if (!image.path) {
            file = Buffer.from(await image.arrayBuffer())
        }else {
             file = fs.readFileSync(image.path);
        }

        // const file = Buffer.from(image);
        const key:string = nim+image.name+ (new Date().toISOString())
        const command = new PutObjectCommand({
            Bucket : "oweek-bundling-profile-img",
            Key : key,
            Body : file,
            ContentType : image.type
        })
        
        try {
            const client =  new S3Client({region:"ap-southeast-3"});
            const response = await client.send(command)
            if (response.$metadata.httpStatusCode !== 200) {
                console.log("gagal s3 e");
                console.log(response);
                throw new Error("upload gambar gagal")
            }
            const url = await getPresignedUrl(key);
            console.log("url");
            console.log(url);
            
            return url
        } catch (error) {
            console.log("error s3");
            console.log(error);
            throw new Error("Upload failed")
        }

    }


        
    async function getPresignedUrl(key:string){
        const client =  new S3Client({region:"ap-southeast-3"});
        const params = {
          Bucket: 'oweek-bundling-profile-img',
          Key: key
        };
      
        try {
          const command = new GetObjectCommand(params);
          const url = await getSignedUrl(client, command);
          return url;
        } catch (error) {
          console.log(error);
          return null;
        }
      }


      async function snapPayment(item:itemDetail[],orderId:string, total:number) {
        
        console.log("Snappayment item");
        console.log(item);
        
        const baseUrl = process.env.DEV_MIDTRANS_BASE_URL
        const serverKey = process.env.DEV_MIDTRANS_SK
        if (!baseUrl || !serverKey) {
            throw new Error("Env variabel not detected")
        }
        try {
            const {data} = await axios.post(baseUrl,{
                transaction_details: {
                    order_id : orderId,
                    gross_amount : total
                },
                item_details : item,
                page_expiry : {
                    duration : 24,
                    unit : "hour"
                }
            },{
                headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                auth:{
                    username: serverKey,
                    password:""
                }
            })
            
            console.log("response midtrans");
            
            console.log(data);
            
            return data.redirect_url
            
        } catch (error) {
            console.log(error);
            throw new Error("snap payment failed")

        }
      }

      async function insertDb(orderInformations:insertOrder) {
        const {_id,nama_lengkap,nim,nama_kelompok,no_kelompok,
            jurusan,id_line,image_url,total,status,payment_url,
            created_at,opsi_pengambilan} = orderInformations
            
            let bodyOrder:any = {
                _id: _id,
                nama_lengkap: nama_lengkap,
                nim: nim,
                nama_kelompok: nama_kelompok,
                no_kelompok: no_kelompok,
                jurusan: jurusan,
                id_line: id_line,
                image_url: image_url,
                total: total,
                status: status,
                payment_url: payment_url,
                created_at: created_at
            }

            // input opsi pengambilan properties
            try {
                if (opsi_pengambilan.opsi === "gosend" ) {
                    const {alamatPenerima, ongkir, jadwalPengiriman} = opsi_pengambilan
                    bodyOrder.ongkir = ongkir;
                    bodyOrder.jadwal_pengiriman = jadwalPengiriman,
                    bodyOrder.alamat_penerima = alamatPenerima
                    
                    // make new object for the module
                    const newOrder = new gosendOrder(bodyOrder)
                    await dbConnect()
                    await newOrder.save()
                    await dbDisconnect()
                }else {
                    const {tempatPengambilan,waktu} = opsi_pengambilan
                    bodyOrder.tempat_pengambilan = tempatPengambilan;
                    bodyOrder.waktu = waktu;
                    
                    // make new object for the module
                    const newOrder = new pickupOrder(bodyOrder)
                    await dbConnect()
                    await newOrder.save()
                    await dbDisconnect()
                }
            } catch (error) {
                console.log("insert Db failed");
                console.log(error);
                throw new Error("insert Db fail")
                
            }
      }


export async function POST(request:Request) {
    const headersList = headers()
  const referer = headersList.get('referer')
  console.log("requestHeaders");
  console.log(referer);
  
 
    const formData = await request.formData()
    const tempOrderInformation =  formData.get("orderInformation")
    const imageFile = formData.get("imageFile");
    console.log("hited");

    
    if (typeof tempOrderInformation !== "string") {
        const response = {
            status : 400,
            message : "order information not required",
        }
    return NextResponse.json(response)
    }

    const orderInformation : insertOrder = JSON.parse(tempOrderInformation)

    try {

        const {nim} = orderInformation


        // insert image to S3 and get the image url
        const url  = await insertS3(imageFile,nim.toFixed()) 
        if (url === null) throw new Error("Image uploading fail");
        
        // insert image url to order Object property
        orderInformation.image_url = url
        
        if ( typeof orderInformation._id !== 'string') {
            throw new Error("id not included")
        }
        // generate payment url and get the url page of payment
        let baseItem: itemDetail[];
        if (orderInformation.opsi_pengambilan.opsi === "gosend") {
            const opsi :gosendOrderInsert = orderInformation.opsi_pengambilan
            const {ongkir} = opsi
            
            if (ongkir === null) {
                throw new Error("ongkir is null");
            }
        
            
            baseItem =[
                {
                    id:orderInformation._id,
                    price : 30000,
                    quantity : 1,
                    name : "U-week requirement bundling",
                    merchantname :"U-week bundling"
                },{
                    id: "02",
                    price : ongkir,
                    quantity : 1,
                    name: "biaya ongkir",
                    merchantname :"U-week bundling"
                }
            ] 
        }else{
        baseItem = [{
            id:orderInformation._id,
            price : 30000,
            quantity : 1,
            name : "U-week requirement bundling",
            merchantname :"U-week bundling"
        }]}
        const paymentUrl =  await snapPayment(baseItem,orderInformation._id,orderInformation.total)
        // insert payment page url to order object propery
        orderInformation.payment_url = paymentUrl

        // insert order infromations to Db

        await insertDb(orderInformation)
        console.log("order created ");
     
    } catch (error) {
        const response = {
            message : "something wrong",
            body: error
        }
        console.log(error);
    return NextResponse.json(response,{status : 500})
    }
    const response = {
        url : url
    }
    return NextResponse.json(response,{status: 201})
}


